import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    console.log('======= MIDDLEWARE EXECUTED =======');
    console.log(`Path: ${request.nextUrl.pathname}`);
    console.log(`request: ${JSON.stringify(request.url)}`);
    const token = request.cookies.get('token')?.value;
    console.log(`Token: ${token}`);

    // Auth sayfalarını tanımlama
    const isAuthRoute =
        request.nextUrl.pathname.startsWith('/auth/signin') ||
        request.nextUrl.pathname.startsWith('/auth/signup') ||
        request.nextUrl.pathname.startsWith('/auth/reset-password');

    // Korumalı rotaları tanımlama - ana sayfayı özel olarak ele alıyoruz
    const isProtectedRoute =
        request.nextUrl.pathname.startsWith('/dashboard') ||
        request.nextUrl.pathname.startsWith('/add-story') ||
        (request.nextUrl.pathname === '/' && !isAuthRoute);

    // 1. Kullanıcı giriş yapmış ve auth sayfalarına erişmeye çalışıyor
    if (token && isAuthRoute) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // 2. Kullanıcı giriş yapmamış ve korumalı sayfalara erişmeye çalışıyor
    if (!token && isProtectedRoute) {
        console.log('User is not authenticated');
        // Kullanıcıyı giriş sayfasına yönlendir ve dönüş URL'sini parametre olarak ekle
        const url = new URL('/auth/signin', request.url);
        url.searchParams.set('redirect', request.nextUrl.pathname);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

// Middleware'in çalışacağı rotaları belirt - format düzeltildi
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/add-story/:path*',
        '/auth/signin',
        '/auth/signup',
        '/auth/reset-password',
        '/'
    ]
};