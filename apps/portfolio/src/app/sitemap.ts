import { MetadataRoute } from 'next';

/* filepath: apps/portfolio/src/app/sitemap.ts */

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://mustafakanmaz.com';

    // Core routes
    const routes = [
        '',
        '/about',
        '/projects',
        '/contact',
        '/einbuergerungstest',
        '/ham-radio-exam-prep',
        '/selecho',
        '/ccse-2026-test-nacionalidad',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    return routes;
}
