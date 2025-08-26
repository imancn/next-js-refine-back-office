import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const sendOtpSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phone } = sendOtpSchema.parse(body);

    // Validate that at least email or phone is provided
    if (!email && !phone) {
      return NextResponse.json(
        { error: 'Email or phone is required' },
        { status: 400 }
      );
    }

    // Check if user exists
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: email || undefined },
          { phone: phone || undefined },
        ],
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Generate OTP
    const otp = Math.random().toString(36).substring(2, 8).toUpperCase();
    const identifier = email || phone!;
    
    // Store OTP in database
    await prisma.verificationToken.upsert({
      where: {
        identifier_token: {
          identifier,
          token: otp,
        },
      },
      update: {
        token: otp,
        expires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      },
      create: {
        identifier,
        token: otp,
        expires: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      },
    });

    // For local development, we just log the OTP
    // In production, you would send email/SMS here
    if (email) {
      console.log(`OTP sent to email ${email}: ${otp}`);
    } else if (phone) {
      console.log(`OTP sent to phone ${phone}: ${otp}`);
    }

    return NextResponse.json({
      message: 'OTP sent successfully',
      // In production, don't return the OTP
      // For local development, we return it for testing
      otp: process.env.NODE_ENV === 'development' ? otp : undefined,
    });
  } catch (error) {
    console.error('Send OTP error:', error);
    
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