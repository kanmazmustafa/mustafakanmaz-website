import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !routing.locales.includes(locale as any)) {
        locale = routing.defaultLocale;
    }

    let messages;
    try {
        messages = (await import(`../../messages/${locale}.json`)).default;
    } catch (error) {
        console.error(`Failed to load messages for locale: ${locale}`, error);
        // Fallback to default locale if requested locale fails
        messages = (await import(`../../messages/${routing.defaultLocale}.json`)).default;
    }

    return {
        locale,
        messages
    };
});
