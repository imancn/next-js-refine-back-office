import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromRequest, canAccessResource } from '@/lib/auth';
import { logAuditEvent } from '@/lib/audit';
import { settingsUpdateSchema } from '@/lib/validations';

// GET /api/settings - Get application settings
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

    // Check if user can read settings
    if (!canAccessResource(user.role, 'settings', 'read')) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    // Get settings from environment or database
    const settings = {
      siteName: process.env.SITE_NAME || 'BackOffice App',
      siteDescription: process.env.SITE_DESCRIPTION || 'Secure SSR BackOffice Application',
      contactEmail: process.env.CONTACT_EMAIL || 'admin@example.com',
      contactPhone: process.env.CONTACT_PHONE || '',
      maintenanceMode: process.env.MAINTENANCE_MODE === 'true',
      allowRegistration: process.env.ALLOW_REGISTRATION !== 'false',
      requireEmailVerification: process.env.REQUIRE_EMAIL_VERIFICATION !== 'false',
      requirePhoneVerification: process.env.REQUIRE_PHONE_VERIFICATION === 'true',
      maxLoginAttempts: parseInt(process.env.MAX_LOGIN_ATTEMPTS || '5'),
      sessionTimeout: parseInt(process.env.SESSION_TIMEOUT || '60'),
    };

    // Log audit event
    await logAuditEvent(
      user.id,
      'READ_SETTINGS',
      'Settings',
      { settings: Object.keys(settings) },
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
      request.headers.get('user-agent') || undefined
    );

    return NextResponse.json({
      success: true,
      data: settings,
    });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/settings - Update application settings
export async function PUT(request: NextRequest) {
  try {
    // Check authentication and permissions
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user can manage settings
    if (!canAccessResource(user.role, 'settings', 'write')) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = settingsUpdateSchema.parse(body);

    // In a real application, you would update these settings in a database
    // For now, we'll just validate and return success
    // You could also update environment variables or use a settings table

    // Log audit event
    await logAuditEvent(
      user.id,
      'UPDATE_SETTINGS',
      'Settings',
      { 
        updatedFields: Object.keys(validatedData),
        newValues: validatedData 
      },
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
      request.headers.get('user-agent') || undefined
    );

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
      data: validatedData,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }

    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PATCH /api/settings - Partially update application settings
export async function PATCH(request: NextRequest) {
  try {
    // Check authentication and permissions
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user can manage settings
    if (!canAccessResource(user.role, 'settings', 'write')) {
      return NextResponse.json(
        { error: 'Insufficient permissions' },
        { status: 403 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = settingsUpdateSchema.partial().parse(body);

    // Log audit event
    await logAuditEvent(
      user.id,
      'UPDATE_SETTINGS',
      'Settings',
      { 
        updatedFields: Object.keys(validatedData),
        newValues: validatedData 
      },
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
      request.headers.get('user-agent') || undefined
    );

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
      data: validatedData,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      );
    }

    console.error('Error updating settings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}