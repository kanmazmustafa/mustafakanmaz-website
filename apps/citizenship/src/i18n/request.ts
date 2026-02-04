import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

// Static imports so messages are bundled and work in standalone deployment.
// Dynamic import(`../../messages/${locale}.json`) fails in Firebase/Cloud Run standalone.
import ar from '../../messages/ar.json';
import bg from '../../messages/bg.json';
import bs from '../../messages/bs.json';
import de from '../../messages/de.json';
import el from '../../messages/el.json';
import en from '../../messages/en.json';
import es from '../../messages/es.json';
import fa from '../../messages/fa.json';
import fr from '../../messages/fr.json';
import he from '../../messages/he.json';
import hi from '../../messages/hi.json';
import hr from '../../messages/hr.json';
import hu from '../../messages/hu.json';
import it from '../../messages/it.json';
import ja from '../../messages/ja.json';
import ku from '../../messages/ku.json';
import nl from '../../messages/nl.json';
import pl from '../../messages/pl.json';
import ps from '../../messages/ps.json';
import pt from '../../messages/pt.json';
import ro from '../../messages/ro.json';
import ru from '../../messages/ru.json';
import sq from '../../messages/sq.json';
import sr from '../../messages/sr.json';
import th from '../../messages/th.json';
import tr from '../../messages/tr.json';
import uk from '../../messages/uk.json';
import vi from '../../messages/vi.json';
import zh from '../../messages/zh.json';

const messageMaps: Record<string, Record<string, unknown>> = {
    ar, bg, bs, de, el, en, es, fa, fr, he, hi, hr, hu, it, ja, ku,
    nl, pl, ps, pt, ro, ru, sq, sr, th, tr, uk, vi, zh
};

export default getRequestConfig(async ({ requestLocale }) => {
    try {
        let locale = await requestLocale;

        if (!locale || !routing.locales.includes(locale as any)) {
            locale = routing.defaultLocale;
        }

        const messages = messageMaps[locale] ?? messageMaps[routing.defaultLocale];
        if (!messages) {
            console.error(`[next-intl] No messages for locale: ${locale}`);
        }

        return {
            locale,
            messages: messages ?? {}
        };
    } catch (err) {
        console.error('[next-intl] getRequestConfig failed:', err);
        return {
            locale: routing.defaultLocale,
            messages: messageMaps[routing.defaultLocale] ?? {}
        };
    }
});
