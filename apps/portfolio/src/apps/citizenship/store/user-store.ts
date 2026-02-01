import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
    selectedState: string | null;
    selectedLanguage: string;
    progress: number;
    mistakes: number[]; // Array of question IDs
    mastered: number[]; // Array of question IDs
    isPremium: boolean;
    rewardedUntil: number | null; // Timestamp until which ads are hidden
    hasAcceptedDisclaimer: boolean;
    lastSynced: number | null; // Timestamp of last successful sync
    isSyncing: boolean;
    isHydrated: boolean; // Flag to check if store is loaded from storage
    lastInterstitialTime: number; // Timestamp of last interstitial shown
    lastIndices: Record<string, number>; // Last viewed question index per mode/category
    streaks: Record<number, number>; // Consecutive correct answers per question ID
    bookmarks: number[]; // Array of bookmarked question IDs
    dailyStreak: number;
    lastVisitDate: string | null;
    updatedAt: number;

    setSelectedState: (state: string) => void;
    setSelectedLanguage: (lang: string) => void;
    setProgress: (progress: number) => void;
    setPremium: (isPremium: boolean) => void;
    addMistakes: (ids: number[]) => void;
    removeMistake: (id: number) => void;
    addMastered: (ids: number[]) => void;
    removeMastered: (id: number) => void;
    setRewarded: (hours: number) => void;
    setAcceptedDisclaimer: (accepted: boolean) => void;
    setSyncStatus: (syncing: boolean, timestamp?: number) => void;
    setHydrated: () => void;
    setAllData: (data: Partial<UserState>) => void;
    mergeData: (data: Partial<UserState>) => void;
    updateInterstitialTime: () => void;
    clearMistakes: () => void;
    setLastIndex: (key: string, index: number) => void;
    recordStreak: (questionId: number, isCorrect: boolean) => { mastered: boolean };
    toggleBookmark: (questionId: number) => void;
    checkDailyStreak: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            selectedState: 'Berlin', // Default
            selectedLanguage: 'de',
            progress: 0,
            mistakes: [], // Array of question IDs
            mastered: [],
            isPremium: false,
            rewardedUntil: null,
            hasAcceptedDisclaimer: false,
            lastSynced: null,
            isSyncing: false,
            isHydrated: false,
            lastInterstitialTime: 0,
            lastIndices: {},
            streaks: {},
            bookmarks: [],
            dailyStreak: 0,
            lastVisitDate: null,
            updatedAt: 0,

            setSelectedState: (state) => set({ selectedState: state, updatedAt: Date.now() }),
            setSelectedLanguage: (lang) => set({ selectedLanguage: lang, updatedAt: Date.now() }),
            setProgress: (progress) => set({ progress, updatedAt: Date.now() }),
            setPremium: (isPremium) => set({ isPremium, updatedAt: Date.now() }),

            addMistakes: (ids) => set((state) => {
                const newMistakes = new Set([...state.mistakes, ...ids]);
                // If a question is a mistake, it can't be mastered
                const newMastered = state.mastered.filter(id => !ids.includes(id));
                return {
                    mistakes: Array.from(newMistakes),
                    mastered: newMastered,
                    updatedAt: Date.now()
                };
            }),

            removeMistake: (id) => set((state) => ({
                mistakes: state.mistakes.filter((m) => m !== id),
                updatedAt: Date.now()
            })),

            addMastered: (ids) => set((state) => {
                const newMastered = new Set([...state.mastered, ...ids]);
                // If a question is mastered, remove from mistakes
                const newMistakes = state.mistakes.filter(id => !ids.includes(id));
                return {
                    mastered: Array.from(newMastered),
                    mistakes: newMistakes,
                    updatedAt: Date.now()
                };
            }),

            removeMastered: (id) => set((state) => ({
                mastered: state.mastered.filter((m) => m !== id),
                updatedAt: Date.now()
            })),
            setRewarded: (hours) => set({
                rewardedUntil: Date.now() + (hours * 60 * 60 * 1000),
                updatedAt: Date.now()
            }),
            setAcceptedDisclaimer: (accepted) => set({ hasAcceptedDisclaimer: accepted, updatedAt: Date.now() }),
            setSyncStatus: (syncing, timestamp) => set({
                isSyncing: syncing,
                ...(timestamp && { lastSynced: timestamp })
            }),
            setHydrated: () => set({ isHydrated: true }),
            setAllData: (data) => set((state) => ({ ...state, ...data, updatedAt: data.updatedAt || Date.now() })),
            mergeData: (incoming) => set((state) => {
                const cloudIsNewer = (incoming.updatedAt || 0) > state.updatedAt;

                if (cloudIsNewer) {
                    // Cloud is newer, trust its arrays to allow deletions/clears
                    return {
                        ...state,
                        ...incoming,
                        updatedAt: incoming.updatedAt || state.updatedAt,
                        isPremium: state.isPremium || incoming.isPremium || false,
                    };
                }

                // Local is newer or same, keep local arrays but merge incoming single values
                return {
                    ...incoming,
                    ...state,
                    updatedAt: state.updatedAt,
                    isPremium: state.isPremium || incoming.isPremium || false,
                };
            }),
            updateInterstitialTime: () => set({ lastInterstitialTime: Date.now() }),
            clearMistakes: () => set({ mistakes: [], updatedAt: Date.now() }),
            setLastIndex: (key, index) => set((state) => ({
                lastIndices: { ...state.lastIndices, [key]: index },
                updatedAt: Date.now()
            })),
            recordStreak: (questionId, isCorrect) => {
                const state = get();
                const currentStreak = state.streaks[questionId] || 0;

                if (isCorrect) {
                    const newStreak = currentStreak + 1;
                    if (newStreak >= 3) {
                        // Mastered! Remove from mistakes, add to mastered, reset streak
                        set({
                            streaks: { ...state.streaks, [questionId]: 0 },
                            mistakes: state.mistakes.filter(id => id !== questionId),
                            mastered: state.mastered.includes(questionId)
                                ? state.mastered
                                : [...state.mastered, questionId],
                            updatedAt: Date.now()
                        });
                        return { mastered: true };
                    } else {
                        // Increment streak
                        set({
                            streaks: { ...state.streaks, [questionId]: newStreak },
                            updatedAt: Date.now()
                        });
                        return { mastered: false };
                    }
                } else {
                    // Wrong answer: reset streak, add to mistakes, remove from mastered
                    set({
                        streaks: { ...state.streaks, [questionId]: 0 },
                        mistakes: state.mistakes.includes(questionId)
                            ? state.mistakes
                            : [...state.mistakes, questionId],
                        mastered: state.mastered.filter(id => id !== questionId),
                        updatedAt: Date.now()
                    });
                    return { mastered: false };
                }
            },
            toggleBookmark: (questionId) => set((state) => ({
                bookmarks: state.bookmarks.includes(questionId)
                    ? state.bookmarks.filter(id => id !== questionId)
                    : [...state.bookmarks, questionId],
                updatedAt: Date.now()
            })),

            // Daily Streak Logic
            checkDailyStreak: () => {
                const state = get();
                const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
                const lastVisit = state.lastVisitDate;

                if (!lastVisit) {
                    // First visit ever
                    set({ dailyStreak: 1, lastVisitDate: today });
                    return;
                }

                if (lastVisit === today) {
                    // Already visited today, do nothing
                    return;
                }

                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = yesterday.toISOString().split('T')[0];

                if (lastVisit === yesterdayStr) {
                    // Continued streak
                    set({ dailyStreak: (state.dailyStreak || 0) + 1, lastVisitDate: today });
                } else {
                    // Broken streak
                    set({ dailyStreak: 1, lastVisitDate: today });
                }
            },
        }),
        {
            name: 'user-storage',
            onRehydrateStorage: (state) => {
                return () => {
                    useUserStore.getState().setHydrated();
                };
            },
        }
    )
);
