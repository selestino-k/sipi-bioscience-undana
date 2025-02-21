import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth'; // Assume you have a function to verify JWT

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  // Check if the token is valid
  const isValidToken = token && await verifyToken(token);

  const { pathname } = req.nextUrl;

  // If the user is not authenticated and trying to access a protected route, redirect to sign-in
  if (!isValidToken && pathname !== '/sign-in') {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // If the user is authenticated and trying to access the sign-in page, redirect to home
  if (isValidToken && pathname === '/sign-in') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};