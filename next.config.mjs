/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    async rewrites() {
        return [
            {
                source: '/einburgeringtest',
                destination: 'http://localhost:3001/einburgeringtest/de',
            },
            {
                source: '/einburgeringtest/:path*',
                destination: 'http://localhost:3001/einburgeringtest/:path*',
            },
        ];
    },
};

export default nextConfig;
