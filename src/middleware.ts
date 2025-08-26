import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Define protected routes and their required roles
const protectedRoutes = {
  '/admin': ['SUPER_ADMIN', 'ADMIN'],
  '/users': ['SUPER_ADMIN', 'ADMIN', 'MANAGER'],
  '/settings': ['SUPER_ADMIN', 'ADMIN'],
  '/analytics': ['SUPER_ADMIN', 'ADMIN', 'MANAGER'],
  '/reports': ['SUPER_ADMIN', 'ADMIN', 'MANAGER'],
};

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/auth',
  '/api/auth',
  '/_next',
  '/favicon.ico',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check if route requires authentication
  const requiresAuth = Object.keys(protectedRoutes).some(route => 
    pathname.startsWith(route)
  );

  if (!requiresAuth) {
    return NextResponse.next();
  }

  // Get access token from cookies
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  if (!accessToken) {
    // No access token, redirect to login or show auth modal
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // For non-API routes, redirect to home page (auth modal will be triggered)
    return NextResponse.redirect(new URL('/', request.url));
  }

  try {
    // Verify access token
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(accessToken, secret);
    
    const userRole = payload.role as string;
    const userStatus = payload.status as string;

    // Check if user is active
    if (userStatus !== 'ACTIVE') {
      throw new Error('User account is not active');
    }

    // Check role-based access
    const requiredRoles = protectedRoutes[pathname as keyof typeof protectedRoutes];
    if (requiredRoles && !requiredRoles.includes(userRole)) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Insufficient permissions' },
          { status: 403 }
        );
      }
      
      // Redirect to unauthorized page or home
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Add user info to headers for API routes
    if (pathname.startsWith('/api/')) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('x-user-id', payload.userId as string);
      requestHeaders.set('x-user-role', userRole);
      requestHeaders.set('x-user-email', payload.email as string);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    return NextResponse.next();
  } catch (error) {
    // Token is invalid or expired
    if (refreshToken) {
      try {
        // Try to refresh the token
        const refreshResponse = await fetch(`${request.nextUrl.origin}/api/auth/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refreshToken }),
        });

        if (refreshResponse.ok) {
          const { accessToken: newAccessToken } = await refreshResponse.json();
          
          // Create new response with updated cookies
          const response = NextResponse.next();
          response.cookies.set('access_token', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60, // 1 hour
          });

          return response;
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
      }
    }

    // Clear invalid cookies
    const response = pathname.startsWith('/api/')
      ? NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      : NextResponse.redirect(new URL('/', request.url));

    response.cookies.set('access_token', '', { maxAge: 0 });
    response.cookies.set('refresh_token', '', { maxAge: 0 });
    response.cookies.set('user_id', '', { maxAge: 0 });

    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};