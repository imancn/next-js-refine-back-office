import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const signupSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
  password: z.string().min(8).optional(),
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
  provider: z.enum(['google', 'apple']).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phone, password, firstName, lastName, provider } = signupSchema.parse(body);

    // Validate that at least email or phone is provided
    if (!email && !phone) {
      return NextResponse.json(
        { error: 'Email or phone is required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email || undefined },
          { phone: phone || undefined },
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email or phone' },
        { status: 409 }
      );
    }

    // Hash password if provided
    let hashedPassword: string | undefined;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 12);
    }

    // Create user data object with only defined fields
    const userData: any = {
      role: 'USER', // Default role
      status: 'PENDING_VERIFICATION', // Require verification
    };

    if (email) userData.email = email;
    if (phone) userData.phone = phone;
    if (hashedPassword) userData.password = hashedPassword;
    if (firstName) userData.firstName = firstName;
    if (lastName) userData.lastName = lastName;

    // Create user
    const user = await prisma.user.create({
      data: userData,
    });

    // Generate tokens
    const accessToken = jwt.sign(
      { 
        userId: user.id, 
        email: user.email, 
        role: user.role,
        status: user.status 
      },
      process.env.JWT_SECRET!,
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET!,
      { expiresIn: '30d' }
    );

    // Store refresh token in database
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        userId: user.id,
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      },
    });

    // Send verification email/SMS if not OAuth
    if (!provider) {
      if (email) {
        await sendEmailVerification(user.id, email);
      }
      if (phone) {
        await sendPhoneVerification(user.id, phone);
      }
    }

    // Set cookies
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
        emailVerified: user.emailVerified,
        phoneVerified: user.phoneVerified,
        twoFactorEnabled: user.twoFactorEnabled,
        role: user.role,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      accessToken,
      refreshToken,
      userId: user.id,
    });

    // Set secure cookies
    response.cookies.set('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60, // 1 hour
    });

    response.cookies.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    response.cookies.set('user_id', user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });

    return response;
  } catch (error) {
    console.error('Signup error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function to send email verification
async function sendEmailVerification(userId: string, email: string) {
  const token = Math.random().toString(36).substring(2, 8).toUpperCase();
  
  await prisma.verificationToken.create({
    data: {
      identifier: email,
      token,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
    },
  });

  // In a real application, you would send an email here
  // For now, we'll just log it
  console.log(`Verification email sent to ${email} with token: ${token}`);
}

// Helper function to send phone verification
async function sendPhoneVerification(userId: string, phone: string) {
  const token = Math.random().toString(36).substring(2, 8).toUpperCase();
  
  await prisma.verificationToken.create({
    data: {
      identifier: phone,
      token,
      expires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    },
  });

  // In a real application, you would send an SMS here
  // For now, we'll just log it
  console.log(`Verification SMS sent to ${phone} with token: ${token}`);
}