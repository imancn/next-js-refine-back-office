import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import AppleProvider from 'next-auth/providers/apple';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID!,
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        phone: { label: 'Phone', type: 'text' },
        password: { label: 'Password', type: 'password' },
        otp: { label: 'OTP', type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, phone, password, otp } = credentials;

        // Find user by email or phone
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: email || undefined },
              { phone: phone || undefined },
            ],
          },
        });

        if (!user) return null;

        // If OTP is provided, verify it
        if (otp) {
          // Verify OTP logic here
          const isValidOtp = await verifyOTP(email || phone!, otp);
          if (!isValidOtp) return null;
        } else if (password) {
          // Verify password
          const isValidPassword = await bcrypt.compare(password, user.password!);
          if (!isValidPassword) return null;
        } else {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          phone: user.phone || undefined,
          firstName: user.firstName || undefined,
          lastName: user.lastName || undefined,
          role: user.role,
          status: user.status,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.status = user.status;
      }
      if (account) {
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.status = token.status as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
});

export { handler as GET, handler as POST };

// Helper function to verify OTP
async function verifyOTP(identifier: string, otp: string): Promise<boolean> {
  // This is a placeholder implementation
  // In a real application, you would verify the OTP against your database
  // or external service (Twilio, etc.)
  
  const verificationToken = await prisma.verificationToken.findFirst({
    where: {
      identifier,
      token: otp,
      expires: {
        gt: new Date(),
      },
    },
  });

  if (verificationToken) {
    // Delete the used token
    await prisma.verificationToken.delete({
      where: { 
        identifier_token: {
          identifier: verificationToken.identifier,
          token: verificationToken.token
        }
      },
    });
    return true;
  }

  return false;
}