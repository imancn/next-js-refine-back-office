# OAuth2 Authentication System Setup Guide

This guide will help you set up the comprehensive OAuth2 authentication system with role-based access control, email/phone verification, and SSO integration.

## Features

### Authentication Methods
- **Email/Password**: Traditional email and password authentication
- **Phone/Password**: Phone number and password authentication
- **Email/OTP**: Email-based one-time password authentication
- **Phone/OTP**: SMS-based one-time password authentication
- **Google SSO**: Google OAuth2 integration
- **Apple SSO**: Apple Sign-In integration
- **2FA**: Two-factor authentication support

### Security Features
- JWT access tokens with 1-hour expiration
- Refresh tokens with 30-day expiration
- Secure HTTP-only cookies
- Role-based access control
- Email and phone verification
- Password hashing with bcrypt
- Automatic token refresh
- Non-closeable authentication modal

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Google OAuth2 credentials (for Google SSO)
- Apple Developer account (for Apple SSO)
- Twilio account (for SMS verification)
- SMTP server (for email verification)

## Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` with your configuration:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/backoffice_db"
   
   # JWT Secrets (generate secure random strings)
   JWT_SECRET="your-super-secret-jwt-key-here"
   JWT_REFRESH_SECRET="your-super-secret-refresh-jwt-key-here"
   
   # OAuth Providers
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   APPLE_CLIENT_ID="your-apple-client-id"
   APPLE_CLIENT_SECRET="your-apple-client-secret"
   
   # Email Configuration
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT=587
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-app-password"
   
   # SMS Configuration
   TWILIO_ACCOUNT_SID="your-twilio-account-sid"
   TWILIO_AUTH_TOKEN="your-twilio-auth-token"
   TWILIO_PHONE_NUMBER="+1234567890"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-nextauth-secret"
   
   # API Configuration
   NEXT_PUBLIC_API_URL="http://localhost:3000/api"
   ```

3. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## OAuth Provider Setup

### Google OAuth2 Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create an OAuth 2.0 Client ID
5. Set the authorized redirect URI to: `http://localhost:3000/api/auth/callback/google`
6. Copy the Client ID and Client Secret to your `.env.local`

### Apple Sign-In Setup

1. Go to [Apple Developer Console](https://developer.apple.com/)
2. Create a new App ID or use an existing one
3. Enable "Sign In with Apple" capability
4. Create a Services ID for your domain
5. Configure the redirect URL: `http://localhost:3000/api/auth/callback/apple`
6. Generate a private key and download it
7. Copy the Client ID and create a Client Secret using the private key

## SMS Verification Setup (Twilio)

1. Sign up for a [Twilio account](https://www.twilio.com/)
2. Get your Account SID and Auth Token from the console
3. Purchase a phone number for SMS verification
4. Add the credentials to your `.env.local`

## Email Verification Setup

For Gmail:
1. Enable 2-factor authentication on your Google account
2. Generate an App Password
3. Use the App Password in your SMTP configuration

For other providers, use their SMTP settings.

## Usage

### Authentication Flow

1. **User visits protected route**: Middleware checks for valid access token
2. **Token missing/expired**: Auth modal automatically opens
3. **User authenticates**: Choose from available methods (email, phone, Google, Apple)
4. **Verification required**: Email/SMS verification if needed
5. **Success**: User is redirected to original destination with valid tokens

### Role-Based Access

The system includes predefined roles:
- `SUPER_ADMIN`: Full access to all features
- `ADMIN`: Administrative access
- `MANAGER`: Management-level access
- `USER`: Standard user access
- `GUEST`: Limited access

### API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user info

#### Verification
- `POST /api/auth/verify-email` - Verify email address
- `POST /api/auth/verify-phone` - Verify phone number
- `POST /api/auth/send-email-verification` - Send email verification
- `POST /api/auth/send-phone-verification` - Send SMS verification

#### 2FA
- `POST /api/auth/enable-2fa` - Enable two-factor authentication
- `POST /api/auth/disable-2fa` - Disable two-factor authentication
- `POST /api/auth/verify-2fa` - Verify 2FA token

### React Components

#### AuthModal
The main authentication modal component that handles all authentication methods:

```tsx
import { useAuth } from '@/app/contexts/AuthContext';

function MyComponent() {
  const { showAuthModal, isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <button onClick={showAuthModal}>Sign In</button>;
  }
  
  return <div>Welcome, {user?.firstName}!</div>;
}
```

#### useAuth Hook
Provides authentication state and methods:

```tsx
const {
  user,                    // Current user object
  isAuthenticated,         // Boolean authentication status
  isLoading,              // Loading state
  login,                  // Login function
  signup,                 // Signup function
  logout,                 // Logout function
  showAuthModal,          // Show auth modal
  hideAuthModal,          // Hide auth modal
  isAuthModalOpen,        // Modal open state
  verifyEmail,            // Verify email
  verifyPhone,            // Verify phone
  sendEmailVerification,  // Send email verification
  sendPhoneVerification,  // Send SMS verification
  resetPassword,          // Reset password
  updatePassword,         // Update password
  enable2FA,              // Enable 2FA
  disable2FA,             // Disable 2FA
  verify2FA,              // Verify 2FA
} = useAuth();
```

## Customization

### Adding New Authentication Methods

1. **Add provider to AuthModal**: Update the modal component to include new tabs/buttons
2. **Create API route**: Add new authentication endpoint
3. **Update validation schemas**: Add validation for new fields
4. **Configure OAuth provider**: Set up new OAuth application

### Modifying Role Permissions

1. **Update middleware**: Modify the `protectedRoutes` object in `middleware.ts`
2. **Update database**: Add new roles to the Prisma schema
3. **Update components**: Add role-based UI rendering

### Styling Customization

The AuthModal uses Tailwind CSS classes. You can customize the appearance by:
1. Modifying the component styles
2. Adding custom CSS classes
3. Using CSS-in-JS solutions

## Security Considerations

1. **Environment Variables**: Never commit sensitive credentials to version control
2. **JWT Secrets**: Use strong, randomly generated secrets
3. **HTTPS**: Always use HTTPS in production
4. **Rate Limiting**: Implement rate limiting for authentication endpoints
5. **Input Validation**: All inputs are validated using Zod schemas
6. **Password Security**: Passwords are hashed using bcrypt with salt rounds of 12
7. **Token Security**: Tokens are stored in HTTP-only cookies
8. **CORS**: Configure CORS properly for production

## Troubleshooting

### Common Issues

1. **Database Connection**: Ensure PostgreSQL is running and accessible
2. **Environment Variables**: Verify all required variables are set
3. **OAuth Redirect URIs**: Ensure redirect URIs match exactly
4. **CORS Issues**: Check CORS configuration for API routes
5. **Token Expiration**: Verify JWT secret and expiration settings

### Debug Mode

Enable debug logging by setting:
```env
DEBUG=true
```

### Testing

The system includes comprehensive error handling and validation. Test all authentication flows:
1. Email/password login
2. Phone/password login
3. OAuth login
4. Email verification
5. Phone verification
6. 2FA setup and verification
7. Token refresh
8. Role-based access

## Production Deployment

1. **Database**: Use a managed PostgreSQL service
2. **Environment**: Set all production environment variables
3. **HTTPS**: Ensure SSL certificates are configured
4. **Domain**: Update OAuth redirect URIs for production domain
5. **Monitoring**: Set up error monitoring and logging
6. **Backup**: Configure database backups
7. **CDN**: Use a CDN for static assets

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check the database schema
4. Verify environment configuration
5. Test with different authentication methods