import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { AuthProvider } from '@/context/AuthContext';
import { SyncManager } from '@/components/auth/SyncManager';
import { AdSense } from '@/components/ads/AdSense';
import { DisclaimerOverlay } from '@/components/common/DisclaimerOverlay';

import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import "../globals.css";

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-outfit',
    display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
    subsets: ['latin'],
    variable: '--font-jakarta',
    display: 'swap',
});

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!routing.locales.includes(locale as any)) notFound();

    setRequestLocale(locale);

    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={`${outfit.variable} ${jakarta.variable} font-sans antialiased text-slate-900 bg-slate-50`}>
                <AdSense pId={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || ""} />
                <NextIntlClientProvider messages={messages}>
                    <AuthProvider>
                        <SyncManager />
                        <DisclaimerOverlay />
                        {children}
                    </AuthProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
