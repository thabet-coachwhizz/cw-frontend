// middleware.ts
/*
    This protects:
    - All routes except /auth/...
    - Static assets (/_next/*, favicon.ico) are excluded
*/

import { NextRequest, NextResponse } from 'next/server';
import { jwtDecode } from 'jwt-decode';

const PUBLIC_PATHS = ['/auth/login', '/auth/reset-password', '/api/auth'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public routes
  if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }
  const token =
    req.cookies.get('access_token')?.value ||
    req.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
  try {
    const decoded: any = jwtDecode(token);

    const isExpired = decoded.exp * 1000 < Date.now();
    if (isExpired) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    // Optional: add user info to request headers if needed
    const res = NextResponse.next();
    res.headers.set('x-user-email', decoded.email || '');
    return res;
  } catch {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
