import createMiddleware from 'next-intl/middleware';
import { routing } from './apps/citizenship/i18n/routing';
import { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === '/') {
        return;
    }
    // @ts-ignore
    return intlMiddleware(request);
}

export const config = {
    // Match only paths starting with a locale or the specific app path
    // This allows the root "/" to be handled by the normal Next.js router (English portfolio)
    matcher: [
        // Match all pathnames except for
        // - /api (API routes)
        // - /(_next|assets|favicon.ico|sitemap.xml|robots.txt) (static files)
        '/((?!api|_next|assets|favicon.ico|sitemap.xml|robots.txt).*)',
        // Match only paths starting with a locale
        '/(de|en|tr|ar|bg|bs|el|es|fa|fr|he|hi|hr|hu|it|ja|ku|nl|pl|ps|pt|ro|ru|sq|sr|th|uk|vi|zh)/:path*'
    ]
};
