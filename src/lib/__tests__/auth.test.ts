import {
  hasMinimumRole,
  getUserPermissions,
  canAccessResource,
  ROLE_HIERARCHY,
  UserRole,
} from '../auth';

describe('Auth Utilities', () => {
  describe('hasMinimumRole', () => {
    it('should return true when user has higher role than required', () => {
      expect(hasMinimumRole('ADMIN', 'USER')).toBe(true);
      expect(hasMinimumRole('SUPER_ADMIN', 'MANAGER')).toBe(true);
      expect(hasMinimumRole('MANAGER', 'GUEST')).toBe(true);
    });

    it('should return true when user has equal role to required', () => {
      expect(hasMinimumRole('ADMIN', 'ADMIN')).toBe(true);
      expect(hasMinimumRole('USER', 'USER')).toBe(true);
      expect(hasMinimumRole('SUPER_ADMIN', 'SUPER_ADMIN')).toBe(true);
    });

    it('should return false when user has lower role than required', () => {
      expect(hasMinimumRole('USER', 'ADMIN')).toBe(false);
      expect(hasMinimumRole('MANAGER', 'SUPER_ADMIN')).toBe(false);
      expect(hasMinimumRole('GUEST', 'USER')).toBe(false);
    });

    it('should handle invalid roles gracefully', () => {
      expect(hasMinimumRole('INVALID_ROLE', 'USER')).toBe(false);
      expect(hasMinimumRole('USER', 'INVALID_ROLE' as UserRole)).toBe(false);
    });
  });

  describe('getUserPermissions', () => {
    it('should return correct permissions for SUPER_ADMIN', () => {
      const permissions = getUserPermissions('SUPER_ADMIN');
      expect(permissions.canRead).toBe(true);
      expect(permissions.canWrite).toBe(true);
      expect(permissions.canDelete).toBe(true);
      expect(permissions.canManageUsers).toBe(true);
      expect(permissions.canAccessAdmin).toBe(true);
      expect(permissions.canViewAnalytics).toBe(true);
      expect(permissions.canManageSettings).toBe(true);
    });

    it('should return correct permissions for ADMIN', () => {
      const permissions = getUserPermissions('ADMIN');
      expect(permissions.canRead).toBe(true);
      expect(permissions.canWrite).toBe(true);
      expect(permissions.canDelete).toBe(true);
      expect(permissions.canManageUsers).toBe(true);
      expect(permissions.canAccessAdmin).toBe(true);
      expect(permissions.canViewAnalytics).toBe(true);
      expect(permissions.canManageSettings).toBe(true);
    });

    it('should return correct permissions for MANAGER', () => {
      const permissions = getUserPermissions('MANAGER');
      expect(permissions.canRead).toBe(true);
      expect(permissions.canWrite).toBe(true);
      expect(permissions.canDelete).toBe(false);
      expect(permissions.canManageUsers).toBe(false);
      expect(permissions.canAccessAdmin).toBe(false);
      expect(permissions.canViewAnalytics).toBe(true);
      expect(permissions.canManageSettings).toBe(false);
    });

    it('should return correct permissions for USER', () => {
      const permissions = getUserPermissions('USER');
      expect(permissions.canRead).toBe(true);
      expect(permissions.canWrite).toBe(false);
      expect(permissions.canDelete).toBe(false);
      expect(permissions.canManageUsers).toBe(false);
      expect(permissions.canAccessAdmin).toBe(false);
      expect(permissions.canViewAnalytics).toBe(false);
      expect(permissions.canManageSettings).toBe(false);
    });

    it('should return correct permissions for GUEST', () => {
      const permissions = getUserPermissions('GUEST');
      expect(permissions.canRead).toBe(false);
      expect(permissions.canWrite).toBe(false);
      expect(permissions.canDelete).toBe(false);
      expect(permissions.canManageUsers).toBe(false);
      expect(permissions.canAccessAdmin).toBe(false);
      expect(permissions.canViewAnalytics).toBe(false);
      expect(permissions.canManageSettings).toBe(false);
    });

    it('should return restrictive permissions for invalid roles', () => {
      const permissions = getUserPermissions('INVALID_ROLE');
      expect(permissions.canRead).toBe(false);
      expect(permissions.canWrite).toBe(false);
      expect(permissions.canDelete).toBe(false);
      expect(permissions.canManageUsers).toBe(false);
      expect(permissions.canAccessAdmin).toBe(false);
      expect(permissions.canViewAnalytics).toBe(false);
      expect(permissions.canManageSettings).toBe(false);
    });
  });

  describe('canAccessResource', () => {
    it('should allow ADMIN to manage users', () => {
      expect(canAccessResource('ADMIN', 'users', 'read')).toBe(true);
      expect(canAccessResource('ADMIN', 'users', 'write')).toBe(true);
      expect(canAccessResource('ADMIN', 'users', 'delete')).toBe(true);
    });

    it('should allow MANAGER to read users but not manage them', () => {
      expect(canAccessResource('MANAGER', 'users', 'read')).toBe(true);
      expect(canAccessResource('MANAGER', 'users', 'write')).toBe(false);
      expect(canAccessResource('MANAGER', 'users', 'delete')).toBe(false);
    });

    it('should allow USER to read but not write', () => {
      expect(canAccessResource('USER', 'users', 'read')).toBe(true);
      expect(canAccessResource('USER', 'users', 'write')).toBe(false);
      expect(canAccessResource('USER', 'users', 'delete')).toBe(false);
    });

    it('should deny GUEST access to all resources', () => {
      expect(canAccessResource('GUEST', 'users', 'read')).toBe(false);
      expect(canAccessResource('GUEST', 'users', 'write')).toBe(false);
      expect(canAccessResource('GUEST', 'users', 'delete')).toBe(false);
    });

    it('should handle settings access correctly', () => {
      expect(canAccessResource('ADMIN', 'settings', 'read')).toBe(true);
      expect(canAccessResource('ADMIN', 'settings', 'write')).toBe(true);
      expect(canAccessResource('MANAGER', 'settings', 'read')).toBe(true);
      expect(canAccessResource('MANAGER', 'settings', 'write')).toBe(false);
    });

    it('should handle analytics access correctly', () => {
      expect(canAccessResource('ADMIN', 'analytics', 'read')).toBe(true);
      expect(canAccessResource('MANAGER', 'analytics', 'read')).toBe(true);
      expect(canAccessResource('USER', 'analytics', 'read')).toBe(false);
    });

    it('should handle admin access correctly', () => {
      expect(canAccessResource('ADMIN', 'admin', 'read')).toBe(true);
      expect(canAccessResource('MANAGER', 'admin', 'read')).toBe(false);
      expect(canAccessResource('USER', 'admin', 'read')).toBe(false);
    });

    it('should handle unknown resources with default permissions', () => {
      expect(canAccessResource('ADMIN', 'unknown', 'read')).toBe(true);
      expect(canAccessResource('ADMIN', 'unknown', 'write')).toBe(true);
      expect(canAccessResource('USER', 'unknown', 'read')).toBe(true);
      expect(canAccessResource('USER', 'unknown', 'write')).toBe(false);
    });
  });

  describe('ROLE_HIERARCHY', () => {
    it('should have correct role hierarchy values', () => {
      expect(ROLE_HIERARCHY.SUPER_ADMIN).toBe(4);
      expect(ROLE_HIERARCHY.ADMIN).toBe(3);
      expect(ROLE_HIERARCHY.MANAGER).toBe(2);
      expect(ROLE_HIERARCHY.USER).toBe(1);
      expect(ROLE_HIERARCHY.GUEST).toBe(0);
    });

    it('should be readonly', () => {
      expect(Object.isFrozen(ROLE_HIERARCHY)).toBe(true);
    });
  });
});