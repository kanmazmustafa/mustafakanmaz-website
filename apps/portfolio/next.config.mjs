import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    output: 'standalone',
    transpilePackages: ['firebase', '@firebase/app', '@firebase/auth', '@firebase/firestore'],
};

const withNextIntl = createNextIntlPlugin(
    './src/i18n/request.ts'
);

export default withNextIntl(nextConfig);
