export interface Question {
    id: number;
    question_de: string;
    category: string;
    state: string | null;
    options_de: {
        a: string;
        b: string;
        c: string;
        d: string;
    };
    correct_option_id: string;
    image_url?: string | null;
}

export interface ParsedQuestion {
    id: number;
    text: string;
    options: string[];
    correctIndex: number;
    category: string;
    image?: string | null;
    explanation?: string;
}

export type QuestionState = Question & {
    // Extended properties if needed
};
