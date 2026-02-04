import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: [
        'ar', 'bg', 'bs', 'de', 'el', 'en', 'es', 'fa', 'fr', 'he',
        'hi', 'hr', 'hu', 'it', 'ja', 'ku', 'nl', 'pl', 'ps', 'pt',
        'ro', 'ru', 'sq', 'sr', 'th', 'tr', 'uk', 'vi', 'zh'
    ],
    // Used when no locale matches
    defaultLocale: 'tr'
});

// Lightweight wrappers around Next.js navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);
