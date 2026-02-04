import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/einbuergerungstest/app',
    images: {
        unoptimized: true,
    },
    output: 'standalone',
};

export default withNextIntl(nextConfig);
