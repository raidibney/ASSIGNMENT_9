import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
// Import your auth instance here
import { auth } from "@/lib/auth"; 

export default async function middleware(request) {
    // Now 'auth' is defined and can be used
    const session = await auth.api.getSession({
        headers: await headers()
    });

    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard',
        '/all-pets/:path*'
    ]
};