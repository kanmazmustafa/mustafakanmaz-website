import type { Metadata } from 'next';
import ContactClient from '@/components/contact/ContactClient';

export const metadata: Metadata = {
    title: 'Contact | Mustafa Kanmaz',
    description: 'Get in touch for high-performance architectural consulting and agentic workflow systems.',
};

export default function ContactPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ContactPoint',
        'contactType': 'customer support',
        'email': 'hello@mustafakanmaz.com',
        'availableLanguage': ['English', 'German', 'Turkish']
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ContactClient />
        </>
    );
}
