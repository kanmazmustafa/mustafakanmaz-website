import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/apps/citizenship/i18n/routing';
import { AuthProvider } from '@/apps/citizenship/context/AuthContext';
import { AdSense } from '@/apps/citizenship/components/ads/AdSense';
import { ClientSideProviders } from '@/apps/citizenship/components/providers/ClientSideProviders';

import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import "@/app/globals.css";

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
        <div className={`${outfit.variable} ${jakarta.variable} font-sans antialiased text-slate-900 bg-slate-50 min-h-screen`}>
            {/* <AdSense pId={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || ""} /> */}
            <NextIntlClientProvider messages={messages}>
                <AuthProvider>
                    <ClientSideProviders />
                    {children}
                </AuthProvider>
            </NextIntlClientProvider>
        </div>
    );
}
