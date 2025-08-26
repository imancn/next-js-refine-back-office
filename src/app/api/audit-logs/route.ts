import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest, canAccessResource } from '@/lib/auth';
import { logAuditEvent } from '@/lib/audit';
import { paginationSchema } from '@/lib/validations';

// GET /api/audit-logs - Get audit logs with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    // Check authentication and permissions
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Only admins and super admins can view audit logs
    if (!canAccessResource(user.role, 'admin', 'read')) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const action = searchParams.get('action') || '';
    const resource = searchParams.get('resource') || '';
    const userId = searchParams.get('userId') || '';
    const startDate = searchParams.get('startDate') || '';
    const endDate = searchParams.get('endDate') || '';
    const sortBy = searchParams.get('sortBy') || 'timestamp';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Validate pagination parameters
    const validatedParams = paginationSchema.parse({
      page,
      limit,
      sortBy,
      sortOrder: sortOrder as 'asc' | 'desc',
    });

    // Build where clause
    const where: any = {};
    if (action) {
      where.action = { contains: action, mode: 'insensitive' };
    }
    if (resource) {
      where.resource = { contains: resource, mode: 'insensitive' };
    }
    if (userId) {
      where.userId = userId;
    }
    if (startDate || endDate) {
      where.timestamp = {};
      if (startDate) {
        where.timestamp.gte = new Date(startDate);
      }
      if (endDate) {
        where.timestamp.lte = new Date(endDate);
      }
    }

    // Get total count
    const total = await prisma.auditLog.count({ where });

    // Get audit logs with pagination
    const auditLogs = await prisma.auditLog.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
          },
        },
      },
      orderBy: {
        [validatedParams.sortBy as keyof typeof prisma.auditLog.fields]: validatedParams.sortOrder,
      },
      skip: (validatedParams.page - 1) * validatedParams.limit,
      take: validatedParams.limit,
    });

    // Log audit event (meta-audit)
    await logAuditEvent(
      user.id,
      'READ_AUDIT_LOGS',
      'AuditLogs',
      { 
        page: validatedParams.page, 
        limit: validatedParams.limit, 
        filters: { action, resource, userId, startDate, endDate } 
      },
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
      request.headers.get('user-agent') || undefined
    );

    const totalPages = Math.ceil(total / validatedParams.limit);

    return NextResponse.json({
      success: true,
      data: auditLogs,
      pagination: {
        page: validatedParams.page,
        limit: validatedParams.limit,
        total,
        totalPages,
        hasNext: validatedParams.page < totalPages,
        hasPrev: validatedParams.page > 1,
      },
    });
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/audit-logs - Create a manual audit log entry (for system events)
export async function POST(request: NextRequest) {
  try {
    // Check authentication and permissions
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Only admins and super admins can create manual audit logs
    if (!canAccessResource(user.role, 'admin', 'write')) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { action, resource, resourceId, details, targetUserId } = body;

    if (!action || !resource) {
      return NextResponse.json(
        { error: 'Action and resource are required' },
        { status: 400 }
      );
    }

    // Create audit log entry
    const auditLog = await prisma.auditLog.create({
      data: {
        userId: targetUserId || user.id,
        action,
        resource,
        resourceId,
        details: details ? JSON.parse(JSON.stringify(details)) : null,
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            role: true,
          },
        },
      },
    });

    // Log the creation of this audit log
    await logAuditEvent(
      user.id,
      'CREATE_AUDIT_LOG',
      'AuditLog',
      { 
        resourceId: auditLog.id,
        action, 
        resource
      },
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
      request.headers.get('user-agent') || undefined
    );

    return NextResponse.json({
      success: true,
      message: 'Audit log created successfully',
      data: auditLog,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating audit log:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}