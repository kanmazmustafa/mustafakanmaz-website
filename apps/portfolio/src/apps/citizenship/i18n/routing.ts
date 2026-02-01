import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
    locales: [
        'ar', 'bg', 'bs', 'de', 'el', 'en', 'es', 'fa', 'fr', 'he',
        'hi', 'hr', 'hu', 'it', 'ja', 'ku', 'nl', 'pl', 'ps', 'pt',
        'ro', 'ru', 'sq', 'sr', 'th', 'tr', 'uk', 'vi', 'zh'
    ],
    defaultLocale: 'en'
});

export const { Link, redirect, usePathname, useRouter } =
    createNavigation(routing);
