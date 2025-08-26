// Mock NextAuth
export const NextAuth = jest.fn(() => ({
  handlers: {
    GET: jest.fn(),
    POST: jest.fn(),
  },
  auth: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

// Mock providers
export const GoogleProvider = jest.fn(() => ({}));
export const GitHubProvider = jest.fn(() => ({}));
export const AppleProvider = jest.fn(() => ({}));
export const CredentialsProvider = jest.fn(() => ({}));

// Mock PrismaAdapter
export const PrismaAdapter = jest.fn(() => ({}));

export default NextAuth;