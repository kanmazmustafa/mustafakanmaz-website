import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip middleware for citizenship app paths
    if (pathname.includes('/einbuergerungstest/app')) {
        return;
    }

    if (pathname === '/') {
        return;
    }
    // @ts-ignore
    return intlMiddleware(request);
}

export const config = {
    // Match all pathnames except for
    // - /api (API routes)
    // - /(_next|assets|favicon.ico|sitemap.xml|robots.txt) (static files)
    matcher: ['/((?!api|_next|assets|favicon.ico|sitemap.xml|robots.txt).*)']
};
