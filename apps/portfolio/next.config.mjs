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
            // Match locale-prefixed paths (e.g., /en/einbuergerungstest/app)
            {
                source: '/:locale(ar|bg|bs|de|el|en|es|fa|fr|he|hi|hr|hu|it|ja|ku|nl|pl|ps|pt|ro|ru|sq|sr|th|tr|uk|vi|zh)/einbuergerungstest/app',
                destination: 'http://localhost:3001/einbuergerungstest/app',
            },
            {
                source: '/:locale(ar|bg|bs|de|el|en|es|fa|fr|he|hi|hr|hu|it|ja|ku|nl|pl|ps|pt|ro|ru|sq|sr|th|tr|uk|vi|zh)/einbuergerungstest/app/:path*',
                destination: 'http://localhost:3001/einbuergerungstest/app/:path*',
            },
        ];
    },
};

export default nextConfig;
