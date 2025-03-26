import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    console.log('======= MIDDLEWARE EXECUTED =======');
    console.log(`Path: ${request.nextUrl.pathname}`);
    const token = request.cookies.get('token')?.value;

    // Korumalı rotaları tanımlama
    const isProtectedRoute =
        request.nextUrl.pathname.startsWith('/dashboard') ||
        request.nextUrl.pathname.startsWith('/profile');

    // Auth sayfalarını tanımlama
    const isAuthRoute =
        request.nextUrl.pathname.startsWith('/auth/signin') ||
        request.nextUrl.pathname.startsWith('/auth/signup') ||
        request.nextUrl.pathname.startsWith('/auth/reset-password');

    // 1. Kullanıcı giriş yapmış ve auth sayfalarına erişmeye çalışıyor
    if (token && isAuthRoute) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // 2. Kullanıcı giriş yapmamış ve korumalı sayfalara erişmeye çalışıyor
    if (!token && isProtectedRoute) {
        // Kullanıcıyı giriş sayfasına yönlendir ve dönüş URL'sini parametre olarak ekle
        const url = new URL('/auth/signin', request.url);
        url.searchParams.set('redirect', request.nextUrl.pathname);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

// Middleware'in çalışacağı rotaları belirt
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/profile/:path*',
        '/auth/signin',
        '/auth/signup',
        '/auth/reset-password'
    ],
};