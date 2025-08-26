# Secure SSR BackOffice Application

A comprehensive, secure Server-Side Rendered back-office application built with Next.js 15, featuring advanced authentication, role-based access control, and comprehensive security measures.

## 🚀 Features

### Authentication & Authorization
- **NextAuth.js Integration**: Supports multiple authentication providers
  - Credentials (email/password)
  - Google OAuth 2.0
  - GitHub OAuth 2.0
  - Apple OAuth 2.0
- **Role-Based Access Control (RBAC)**: Five user roles with granular permissions
  - SUPER_ADMIN: Full system access
  - ADMIN: Administrative access
  - MANAGER: Management-level access
  - USER: Standard user access
  - GUEST: Limited access
- **JWT-based Sessions**: Secure session management with configurable timeouts
- **Two-Factor Authentication**: Optional 2FA support for enhanced security

### Security Features
- **Comprehensive Security Headers**: CSP, X-Frame-Options, HSTS, and more
- **Input Validation**: Zod schema validation for all API endpoints
- **Audit Logging**: Complete audit trail for all user actions
- **Rate Limiting**: Configurable rate limiting for API endpoints
- **CORS Protection**: Secure cross-origin request handling
- **SQL Injection Prevention**: Prisma ORM with parameterized queries
- **XSS Protection**: Content Security Policy and input sanitization

### Data Protection
- **Password Hashing**: bcrypt with configurable salt rounds
- **Secure Cookies**: HttpOnly, Secure, and SameSite attributes
- **Environment Variable Security**: Secure configuration management
- **Database Security**: PostgreSQL with encrypted connections

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js v4
- **Validation**: Zod
- **Security**: bcrypt, jose (JWT), helmet
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with accessibility features

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 12+
- npm, yarn, or pnpm
- Git

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backoffice-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   - Database connection string
   - OAuth provider credentials
   - JWT secrets
   - Application settings

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 🔐 Security Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/backoffice_db"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secure-secret-key"

# JWT
JWT_SECRET="your-jwt-secret-key"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Security Settings
MAINTENANCE_MODE="false"
ALLOW_REGISTRATION="true"
REQUIRE_EMAIL_VERIFICATION="true"
MAX_LOGIN_ATTEMPTS="5"
SESSION_TIMEOUT="60"
```

### OAuth Provider Setup

#### Google OAuth 2.0
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client IDs
5. Set authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env.local`

#### GitHub OAuth
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret to `.env.local`

## 🗄️ Database Schema

The application uses Prisma with the following key models:

- **User**: User accounts with roles and permissions
- **Account**: OAuth account connections
- **Session**: User sessions
- **VerificationToken**: Email/phone verification tokens
- **RefreshToken**: JWT refresh tokens
- **AuditLog**: Comprehensive audit trail

## 🔒 Security Features Deep Dive

### 1. Role-Based Access Control (RBAC)

The application implements a hierarchical role system:

```typescript
export const ROLE_HIERARCHY = {
  SUPER_ADMIN: 4,
  ADMIN: 3,
  MANAGER: 2,
  USER: 1,
  GUEST: 0,
};
```

Each role has specific permissions:
- **SUPER_ADMIN**: Full system access
- **ADMIN**: Administrative functions
- **MANAGER**: Management and reporting
- **USER**: Standard operations
- **GUEST**: Read-only access

### 2. Input Validation with Zod

All API endpoints use Zod schemas for validation:

```typescript
export const userCreateSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'MANAGER', 'USER', 'GUEST']).default('USER'),
});
```

### 3. Audit Logging

Every user action is logged with detailed information:

```typescript
await logAuditEvent(
  userId,
  'CREATE_USER',
  'User',
  newUserId,
  { email: userEmail, role: userRole },
  ipAddress,
  userAgent
);
```

### 4. Security Headers

Comprehensive security headers are configured in `next.config.ts`:

- **Content Security Policy (CSP)**: Prevents XSS attacks
- **X-Frame-Options**: Prevents clickjacking
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **Strict-Transport-Security**: Enforces HTTPS
- **Referrer Policy**: Controls referrer information

## 🚦 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh JWT token
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users` - List users (with pagination)
- `POST /api/users` - Create user
- `GET /api/users/[id]` - Get user details
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

### Settings
- `GET /api/settings` - Get application settings
- `PUT /api/settings` - Update settings
- `PATCH /api/settings` - Partial update

### Audit Logs
- `GET /api/audit-logs` - View audit trail
- `POST /api/audit-logs` - Create manual audit entry

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run security tests
npm run test:security
```

## 📊 Monitoring & Logging

### Audit Logs
- All user actions are logged
- Includes IP address, user agent, and timestamp
- Searchable and filterable
- Exportable for compliance

### Security Monitoring
- Failed login attempts
- Permission violations
- Suspicious activity patterns
- Rate limiting violations

## 🚨 Security Best Practices

1. **Regular Updates**: Keep dependencies updated
2. **Secret Rotation**: Rotate JWT secrets regularly
3. **Access Reviews**: Regular review of user permissions
4. **Security Headers**: Monitor security header compliance
5. **Audit Reviews**: Regular review of audit logs
6. **Penetration Testing**: Regular security assessments

## 🔧 Customization

### Adding New Roles
1. Update `ROLE_HIERARCHY` in `src/lib/auth.ts`
2. Add role to Prisma schema
3. Update permission functions
4. Add role to protected routes

### Adding New Permissions
1. Extend `UserPermissions` interface
2. Update permission functions
3. Add permission checks to API routes

### Custom OAuth Providers
1. Add provider to NextAuth configuration
2. Update environment variables
3. Configure provider-specific settings

## 📚 Additional Resources

- [Next.js Security Documentation](https://nextjs.org/docs/advanced-features/security-headers)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Security](https://www.prisma.io/docs/guides/security)
- [OWASP Security Guidelines](https://owasp.org/www-project-top-ten/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For security issues, please email security@example.com instead of using the issue tracker.

For general support and questions:
- Create an issue in the repository
- Check the documentation
- Review the security FAQ

---

**⚠️ Security Notice**: This application implements industry-standard security practices. However, security is an ongoing process. Regularly review and update security measures based on your specific requirements and threat landscape.