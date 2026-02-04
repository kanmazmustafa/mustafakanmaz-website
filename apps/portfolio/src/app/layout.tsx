import type { Metadata } from 'next';
import { Inter, Roboto_Mono, Playfair_Display } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const robotoMono = Roboto_Mono({ subsets: ['latin'], variable: '--font-roboto-mono' });
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });

export const metadata: Metadata = {
    metadataBase: new URL('https://mustafakanmaz.com'),
    title: 'Mustafa Kanmaz | Independent Software Architect',
    description: 'Independent Software Architect specializing in high-performance mobile application design, scalable architectures, and advanced agentic workflows.',
    keywords: ['Software Architect', 'Mobile App Development', 'AI Systems', 'Next.js', 'Antigravity', 'High Performance'],
    openGraph: {
        title: 'Mustafa Kanmaz | Independent Software Architect',
        description: 'Designing high-performance mobile systems through modern agentic engineering.',
        type: 'profile',
        locale: 'en_US',
    },
};

import { ThemeProvider } from '@/components/ThemeProvider';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Mustafa Kanmaz',
        jobTitle: 'Independent Software Architect',
        description: 'Expert in High-Performance Mobile Systems and AI Agent Workflows',
        url: 'https://mustafakanmaz.com',
        knowsAbout: [
            'Software Architecture',
            'Mobile App Development',
            'AI Agent Systems',
            'Antigravity Workflows',
            'Cloud Computing',
            'Scalable Systems'
        ],
    };

    return (
        <html lang="en" className="scroll-smooth">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <Script
                {...({
                    src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7011720768538565",
                    crossOrigin: "anonymous",
                    strategy: "afterInteractive"
                } as any)}
            />
            <body className={`${inter.variable} ${robotoMono.variable} ${playfair.variable} bg-background text-foreground antialiased selection:bg-primary/30 selection:text-white`}>
                <ThemeProvider>
                    <Navigation />
                    <main className="min-h-screen pt-20">
                        {children}
                    </main>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
