// Set up environment variables for testing
process.env.NODE_ENV = 'test';
process.env.NEXTAUTH_URL = 'http://localhost:3000';
process.env.NEXTAUTH_SECRET = 'test-secret-key';
process.env.JWT_SECRET = 'test-jwt-secret';
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test_db';

// OAuth provider test credentials
process.env.GOOGLE_CLIENT_ID = 'test-google-client-id';
process.env.GOOGLE_CLIENT_SECRET = 'test-google-client-secret';
process.env.GITHUB_CLIENT_ID = 'test-github-client-id';
process.env.GITHUB_CLIENT_SECRET = 'test-github-client-secret';
process.env.APPLE_CLIENT_ID = 'test-apple-client-id';
process.env.APPLE_CLIENT_SECRET = 'test-apple-client-secret';

// Application settings
process.env.SITE_NAME = 'Test BackOffice App';
process.env.SITE_DESCRIPTION = 'Test Secure SSR BackOffice Application';
process.env.CONTACT_EMAIL = 'test@example.com';
process.env.CONTACT_PHONE = '+1234567890';

// Security settings
process.env.MAINTENANCE_MODE = 'false';
process.env.ALLOW_REGISTRATION = 'true';
process.env.REQUIRE_EMAIL_VERIFICATION = 'true';
process.env.REQUIRE_PHONE_VERIFICATION = 'false';
process.env.MAX_LOGIN_ATTEMPTS = '5';
process.env.SESSION_TIMEOUT = '60';

// Email and SMS test configuration
process.env.SMTP_HOST = 'smtp.test.com';
process.env.SMTP_PORT = '587';
process.env.SMTP_USER = 'test@test.com';
process.env.SMTP_PASS = 'test-password';

process.env.TWILIO_ACCOUNT_SID = 'test-twilio-account-sid';
process.env.TWILIO_AUTH_TOKEN = 'test-twilio-auth-token';
process.env.TWILIO_PHONE_NUMBER = '+1234567890';

// File upload settings
process.env.MAX_FILE_SIZE = '5242880';
process.env.ALLOWED_FILE_TYPES = 'image/jpeg,image/png,image/gif,image/webp';

// Rate limiting
process.env.RATE_LIMIT_WINDOW = '900000';
process.env.RATE_LIMIT_MAX_REQUESTS = '100';

// Logging
process.env.LOG_LEVEL = 'error';
process.env.ENABLE_AUDIT_LOGS = 'true';
process.env.ENABLE_REQUEST_LOGS = 'false';

// Development
process.env.DEBUG = 'false';