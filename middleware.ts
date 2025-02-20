import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;

    const session = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });
    if (!session) {
        return NextResponse.redirect(new URL('/login', req.url))
    } else if (!session && path !== "/sign-in" || path === '/sign-up') {
        return NextResponse.redirect(new URL('/', req.url))
    }
    return NextResponse.next()
}