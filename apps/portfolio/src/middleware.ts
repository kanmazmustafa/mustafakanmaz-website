import createMiddleware from 'next-intl/middleware';
import { routing } from '@/i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Ham Radio Subdomain Handling
    const hostname = request.headers.get('host') ?? '';
    if (hostname.startsWith('hamradio.')) {
        const url = request.nextUrl.clone();
        // Map root of subdomain to ham-radio-exam-prep
        if (pathname === '/') {
            url.pathname = '/en/ham-radio-exam-prep';
            return NextResponse.rewrite(url);
        }
        // Map other paths relative to ham-radio-exam-prep (e.g. /privacy-policy)
        if (!pathname.startsWith('/ham-radio-exam-prep')) {
            url.pathname = `/en/ham-radio-exam-prep${pathname}`;
            return NextResponse.rewrite(url);
        }
    }

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
