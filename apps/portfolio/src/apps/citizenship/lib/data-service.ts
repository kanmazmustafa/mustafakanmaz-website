import questionsData from "@/apps/citizenship/data/questions.json";
import questionsStatesData from "@/apps/citizenship/data/questions_states.json";
import { Question, ParsedQuestion } from "@/apps/citizenship/types/question";

export interface DataService {
    getAllQuestions(): Question[];
    getQuestionsByState(state: string): Question[];
    getCategories(): string[];
}

// Since the JSONs are imported, they are available at build time.
// In a real app, you might fetch this from an API or Firestore.

// Explanation storage
let currentExplanations: Record<string, any> = {};
let currentLocale: string = '';

async function loadExplanations(locale: string, retryCount = 0) {
    if (currentLocale === locale) return;
    try {
        // Use a more predictable path for dynamic imports in production
        const data = await import(`../data/explanations/${locale}.json`);
        currentExplanations = data.default || data;
        currentLocale = locale;
    } catch (e) {
        console.error(`Failed to load explanations for ${locale} (Attempt ${retryCount + 1})`, e);

        if (retryCount < 2) {
            await new Promise(r => setTimeout(r, 1000));
            return loadExplanations(locale, retryCount + 1);
        }

        // Fallback to German if all retries fail
        if (locale !== 'de') {
            try {
                const deData = await import(`../data/explanations/de.json`);
                currentExplanations = deData.default || deData;
                currentLocale = 'de';
            } catch (deError) {
                console.error("Failed to load fallback German explanations", deError);
                currentExplanations = {};
            }
        } else {
            currentExplanations = {};
        }
    }
}

// Internal cache for parsed questions to improve performance
const parsedCache: Record<string, Record<number, ParsedQuestion>> = {};

export const dataService = {
    getAllQuestions: (): Question[] => {
        return questionsData as Question[];
    },

    getQuestionsByState: (state: string): Question[] => {
        return (questionsStatesData as Question[]).filter(
            (q) => q.state === state
        );
    },

    // Optimized helper with internal memoization
    parseQuestion: (raw: Question, locale: string = 'de'): ParsedQuestion => {
        const cacheKey = `${locale}_${currentLocale}`;
        if (!parsedCache[cacheKey]) parsedCache[cacheKey] = {};

        if (parsedCache[cacheKey][raw.id]) {
            return parsedCache[cacheKey][raw.id];
        }

        const qText = (raw as any)[`question_${locale}`] || raw.question_de || "";
        const optionsMap = (raw as any)[`options_${locale}`] || raw.options_de || {};

        const options = [
            optionsMap['a'] || "",
            optionsMap['b'] || "",
            optionsMap['c'] || "",
            optionsMap['d'] || ""
        ];

        const correctLetter = raw.correct_option_id.toLowerCase();
        const correctIndex = correctLetter.charCodeAt(0) - 'a'.charCodeAt(0);
        const explanation = currentExplanations[raw.id.toString()] || "";

        const parsed: ParsedQuestion = {
            id: raw.id,
            text: qText,
            options,
            correctIndex,
            category: raw.category,
            image: raw.image_url,
            explanation
        };

        parsedCache[cacheKey][raw.id] = parsed;
        return parsed;
    },

    loadExplanations
};
