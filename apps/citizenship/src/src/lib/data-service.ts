import questionsData from "@/data/questions.json";
import questionsStatesData from "@/data/questions_states.json";
import { Question, ParsedQuestion } from "@/types/question";

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

async function loadExplanations(locale: string) {
    if (currentLocale === locale) return;
    try {
        const data = await import(`@/data/explanations/${locale}.json`);
        currentExplanations = data.default || data;
        currentLocale = locale;
    } catch (e) {
        console.error(`Failed to load explanations for ${locale}`, e);
        // Fallback to German if not found
        if (locale !== 'de') {
            const deData = await import(`@/data/explanations/de.json`);
            currentExplanations = deData.default || deData;
            currentLocale = 'de';
        }
    }
}

export const dataService = {
    getAllQuestions: (): Question[] => {
        return questionsData as Question[];
    },

    getQuestionsByState: (state: string): Question[] => {
        const stateQuestions = (questionsStatesData as Question[]).filter(
            (q) => q.state === state
        );
        return stateQuestions;
    },

    // Helper to parse the standardized Question object into a UI-friendly format
    parseQuestion: (raw: Question, locale: string = 'de'): ParsedQuestion => {
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

        return {
            id: raw.id,
            text: qText,
            options,
            correctIndex,
            category: raw.category,
            image: raw.image_url,
            explanation
        };
    },

    loadExplanations
};
