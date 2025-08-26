import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from './prisma';
import { NextRequest } from 'next/server';

export interface UserPermissions {
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
  canManageUsers: boolean;
  canAccessAdmin: boolean;
  canViewAnalytics: boolean;
  canManageSettings: boolean;
}

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  status: string;
  firstName?: string;
  lastName?: string;
}

// Role hierarchy for permission checking
export const ROLE_HIERARCHY = {
  SUPER_ADMIN: 4,
  ADMIN: 3,
  MANAGER: 2,
  USER: 1,
  GUEST: 0,
} as const;

export type UserRole = keyof typeof ROLE_HIERARCHY;

// Check if user has minimum required role
export function hasMinimumRole(userRole: string, requiredRole: UserRole): boolean {
  const userRoleLevel = ROLE_HIERARCHY[userRole as UserRole] ?? 0;
  const requiredRoleLevel = ROLE_HIERARCHY[requiredRole];
  return userRoleLevel >= requiredRoleLevel;
}

// Get user permissions based on role
export function getUserPermissions(role: string): UserPermissions {
  switch (role) {
    case 'SUPER_ADMIN':
      return {
        canRead: true,
        canWrite: true,
        canDelete: true,
        canManageUsers: true,
        canAccessAdmin: true,
        canViewAnalytics: true,
        canManageSettings: true,
      };
    case 'ADMIN':
      return {
        canRead: true,
        canWrite: true,
        canDelete: true,
        canManageUsers: true,
        canAccessAdmin: true,
        canViewAnalytics: true,
        canManageSettings: true,
      };
    case 'MANAGER':
      return {
        canRead: true,
        canWrite: true,
        canDelete: false,
        canManageUsers: false,
        canAccessAdmin: false,
        canViewAnalytics: true,
        canManageSettings: false,
      };
    case 'USER':
      return {
        canRead: true,
        canWrite: false,
        canDelete: false,
        canManageUsers: false,
        canAccessAdmin: false,
        canViewAnalytics: false,
        canManageSettings: false,
      };
    case 'GUEST':
      return {
        canRead: false,
        canWrite: false,
        canDelete: false,
        canManageUsers: false,
        canAccessAdmin: false,
        canViewAnalytics: false,
        canManageSettings: false,
      };
    default:
      return {
        canRead: false,
        canWrite: false,
        canDelete: false,
        canManageUsers: false,
        canAccessAdmin: false,
        canViewAnalytics: false,
        canManageSettings: false,
      };
  }
}

// Check if user can access a specific resource
export function canAccessResource(userRole: string, resource: string, action: 'read' | 'write' | 'delete'): boolean {
  const permissions = getUserPermissions(userRole);
  
  switch (resource) {
    case 'users':
      return action === 'read' ? permissions.canRead : permissions.canManageUsers;
    case 'settings':
      return action === 'read' ? permissions.canRead : permissions.canManageSettings;
    case 'analytics':
      return permissions.canViewAnalytics;
    case 'admin':
      return permissions.canAccessAdmin;
    default:
      return action === 'read' ? permissions.canRead : permissions.canWrite;
  }
}

// Get current authenticated user from session
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) return null;
    
    return {
      id: session.user.id,
      email: session.user.email!,
      role: session.user.role,
      status: session.user.status,
      firstName: session.user.firstName,
      lastName: session.user.lastName,
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Get user from request headers (for API routes)
export function getUserFromRequest(request: NextRequest): AuthUser | null {
  const userId = request.headers.get('x-user-id');
  const userRole = request.headers.get('x-user-role');
  const userEmail = request.headers.get('x-user-email');
  
  if (!userId || !userRole || !userEmail) return null;
  
  return {
    id: userId,
    email: userEmail,
    role: userRole,
    status: 'ACTIVE', // Default to active for API requests
  };
}

// Audit logging function
export async function logAuditEvent(
  userId: string,
  action: string,
  resource: string,
  resourceId?: string,
  details?: any,
  ipAddress?: string,
  userAgent?: string
): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId,
        action,
        resource,
        resourceId,
        details: details ? JSON.parse(JSON.stringify(details)) : null,
        ipAddress,
        userAgent,
      },
    });
  } catch (error) {
    console.error('Failed to log audit event:', error);
    // Don't throw error as audit logging shouldn't break main functionality
  }
}

// Validate user session and permissions
export async function validateUserSession(requiredRole?: UserRole): Promise<{ user: AuthUser; permissions: UserPermissions } | null> {
  const user = await getCurrentUser();
  if (!user) return null;
  
  if (user.status !== 'ACTIVE') {
    throw new Error('User account is not active');
  }
  
  if (requiredRole && !hasMinimumRole(user.role, requiredRole)) {
    throw new Error('Insufficient permissions');
  }
  
  const permissions = getUserPermissions(user.role);
  return { user, permissions };
}

// Middleware helper for checking route access
export function checkRouteAccess(userRole: string, pathname: string): boolean {
  const routePermissions: Record<string, UserRole[]> = {
    '/admin': ['SUPER_ADMIN', 'ADMIN'],
    '/users': ['SUPER_ADMIN', 'ADMIN', 'MANAGER'],
    '/settings': ['SUPER_ADMIN', 'ADMIN'],
    '/analytics': ['SUPER_ADMIN', 'ADMIN', 'MANAGER'],
    '/reports': ['SUPER_ADMIN', 'ADMIN', 'MANAGER'],
  };
  
  for (const [route, allowedRoles] of Object.entries(routePermissions)) {
    if (pathname.startsWith(route)) {
      return allowedRoles.includes(userRole as UserRole);
    }
  }
  
  // Default to allowing access for authenticated users
  return true;
}