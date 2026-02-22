import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    output: 'standalone',
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    async rewrites() {
        return [
            {
                source: '/einbuergerungstest/app',
                destination: 'http://localhost:3001/einbuergerungstest/app',
            },
            {
                source: '/einbuergerungstest/app/:path*',
                destination: 'http://localhost:3001/einbuergerungstest/app/:path*',
            },
        ];
    },
};

export default nextConfig;
