import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

// Define interfaces for better type organization
interface AuthToken {
    role?: string;
    [key: string]: unknown;
}

export async function middleware(request: NextRequest) {
    // Get the pathname
    const path: string = request.nextUrl.pathname;
    
    // Define public paths that don't require authentication
    const publicPaths: string[] = ['/sign-in', '/sign-up', '/forgot-password', '/reset-password'];
    const isPublicPath: boolean = publicPaths.includes(path);
    
    // Check if the user is authenticated
    const token: AuthToken | null = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET
    });
    
    // Redirect logic
    if (!token && !isPublicPath) {
        // User is not authenticated and trying to access a protected route
        const signInUrl: URL = new URL('/sign-in', request.url);
        signInUrl.searchParams.set('callbackUrl', path);
        return NextResponse.redirect(signInUrl);
    }
    
    if (token && isPublicPath) {
        // User is authenticated but trying to access login page
        return NextResponse.redirect(new URL('/', request.url));
    }
    
    // Admin paths protection
    if (path.startsWith('/admin') && token?.role !== 'ADMIN') {
        // User is not an admin but trying to access admin routes
        return NextResponse.redirect(new URL('/', request.url));
    }
    
    return NextResponse.next();
}

// Apply middleware to all routes except static files
export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. /examples (inside /public)
     * 5. all root files inside /public (favicon.ico, robots.txt, manifest.json etc.)
     */
    '/((?!api|_next|fonts|images|[\\w-]+\\.\\w+).*)',
  ],
};