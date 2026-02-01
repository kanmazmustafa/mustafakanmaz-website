import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/einburgeringtest',
};

export default withNextIntl(nextConfig);
