"use client";

import { useEffect, useState } from "react";
import { useQuizStore } from "@/store/quiz-store";
import { dataService } from "@/lib/data-service";
import { useUserStore } from "@/store/user-store";
import { QuestionCard } from "./QuestionCard";
import { QuizResult } from "./QuizResult";
import { QuizReview } from "./QuizReview";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "@/i18n/routing";
import { Loader2, ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

import { AdBanner } from "@/components/ads/AdBanner";
import { SideAd } from "@/components/ads/SideAd";
import { InterstitialOverlay } from "@/components/ads/InterstitialOverlay";
import { MasteryBadge } from "./MasteryBadge";

import { useLocale, useTranslations } from "next-intl";
import { AD_CONFIG } from "@/config/ads";


export default function QuizRunner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode') || 'exam';
    const categoryId = searchParams.get('category');
    const stateFilter = searchParams.get('state');

    const locale = useLocale();
    const tQuiz = useTranslations('quiz');
    const tHome = useTranslations('home');

    const { selectedState, isPremium, recordStreak } = useUserStore();

    const {
        questions,
        currentIndex,
        answers,
        setQuestions,
        answerQuestion,
        nextQuestion,
        prevQuestion,
        finishQuiz,
        isFinished
    } = useQuizStore();

    const { lastIndices, setLastIndex } = useUserStore();

    const [isLoading, setIsLoading] = useState(true);
    const [isExplanationsLoading, setIsExplanationsLoading] = useState(true);
    const [viewState, setViewState] = useState<'quiz' | 'result' | 'review'>('quiz');
    const [showInterstitial, setShowInterstitial] = useState(false);
    const [showMasteryBadge, setShowMasteryBadge] = useState(false);

    useEffect(() => {
        if (isFinished && !isLoading) {
            setShowInterstitial(true);
        }
    }, [isFinished, isLoading]);

    useEffect(() => {
        async function load() {
            setIsExplanationsLoading(true);
            await (dataService as any).loadExplanations(locale);
            setIsExplanationsLoading(false);
        }
        load();
    }, [locale]);

    useEffect(() => {
        if (isFinished) {
            const wrongIds: number[] = [];
            questions.forEach(q => {
                const parsed = dataService.parseQuestion(q, locale);
                if (answers[q.id] !== parsed.correctIndex) {
                    wrongIds.push(q.id);
                }
            });

            if (wrongIds.length > 0) {
                wrongIds.forEach(id => recordStreak(id, false));
            }
        }
    }, [isFinished, questions, answers, recordStreak, locale]);

    useEffect(() => {
        async function init() {
            setIsLoading(true);
            await (dataService as any).loadExplanations(locale);

            const allData = dataService.getAllQuestions();
            let filtered: any[] = [];

            const stateToUse = stateFilter || selectedState || 'Berlin';

            if (mode === 'exam') {
                const general = allData.slice(0, 300);
                const stateQs = dataService.getQuestionsByState(stateToUse);

                const randomGeneral = general.sort(() => 0.5 - Math.random()).slice(0, 30);
                const randomState = stateQs.sort(() => 0.5 - Math.random()).slice(0, 3);

                filtered = [...randomGeneral, ...randomState];

            } else if (mode === 'practice') {
                if (categoryId === 'state_questions') {
                    filtered = dataService.getQuestionsByState(stateToUse);
                } else if (categoryId === 'mastered') {
                    const masteredIds = useUserStore.getState().mastered;
                    filtered = allData.filter(q => masteredIds.includes(q.id));
                } else {
                    if (categoryId) {
                        filtered = allData.filter(q => q.category?.toLowerCase().includes(categoryId.toLowerCase()));
                        if (filtered.length === 0) filtered = allData.slice(0, 20);
                    } else {
                        filtered = allData;
                    }
                }
            } else if (mode === 'mistakes') {
                const currentMistakes = useUserStore.getState().mistakes;
                if (currentMistakes.length > 0) {
                    filtered = allData.filter(q => currentMistakes.includes(q.id));
                } else {
                    filtered = [];
                }
            } else if (mode === 'bookmarks') {
                const currentBookmarks = useUserStore.getState().bookmarks;
                if (currentBookmarks.length > 0) {
                    filtered = allData.filter(q => currentBookmarks.includes(q.id));
                } else {
                    filtered = [];
                }
            }

            setQuestions(filtered.length > 0 ? filtered : (mode === 'mistakes' || mode === 'bookmarks' ? [] : allData.slice(0, 10)));

            // Resume Logic: Load last index
            if (mode !== 'exam') {
                let resumeKey = `practice_${categoryId}`;
                if (mode === 'mistakes') resumeKey = 'mistakes';
                if (mode === 'bookmarks') resumeKey = 'bookmarks';

                const savedIndex = useUserStore.getState().lastIndices[resumeKey];
                if (savedIndex !== undefined && savedIndex < filtered.length) {
                    useQuizStore.setState({ currentIndex: savedIndex });
                    console.log(`QuizRunner: Resumed at index ${savedIndex} for ${resumeKey}`);
                } else {
                    useQuizStore.setState({ currentIndex: 0 }); // Reset if out of bounds or new
                }
            } else {
                useQuizStore.setState({ currentIndex: 0 }); // Exam always starts at 0
            }

            setIsLoading(false);
        }

        init();
    }, [mode, categoryId, stateFilter, selectedState, setQuestions]);

    // Save Last Index on Change
    useEffect(() => {
        if (mode === 'exam' || isLoading || questions.length === 0) return;

        if (mode === 'exam' || isLoading || questions.length === 0) return;

        let resumeKey = `practice_${categoryId}`;
        if (mode === 'mistakes') resumeKey = 'mistakes';
        if (mode === 'bookmarks') resumeKey = 'bookmarks';

        setLastIndex(resumeKey, currentIndex);
    }, [currentIndex, mode, categoryId, isLoading, questions.length, setLastIndex]);

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;
    }

    if (viewState === 'result') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 py-10">
                {!isPremium && (
                    <AdBanner
                        dataAdSlot="9876543210"
                        dataAdFormat="auto"
                        dataFullWidthResponsive={true}
                        className="w-full max-w-lg mb-6"
                    />
                )}
                <QuizResult
                    questions={questions}
                    answers={answers}
                    onRetry={() => {
                        window.location.reload();
                    }}
                    onHome={() => router.push('/dashboard')}
                    onReview={() => setViewState('review')}
                    mode={mode}
                />
            </div>
        );
    }

    if (viewState === 'review') {
        return (
            <div className="min-h-screen bg-slate-50">
                <QuizReview
                    questions={questions}
                    answers={answers}
                    onHome={() => router.push('/dashboard')}
                />
            </div>
        );
    }

    if (questions.length === 0) return <div className="p-8 text-center">{tHome('no_questions')}</div>;

    const rawQuestion = questions[currentIndex];
    if (!rawQuestion) return <div>{tHome('no_questions')}...</div>;

    const currentQuestion = dataService.parseQuestion(rawQuestion, locale);
    const progressValue = ((currentIndex + 1) / questions.length) * 100;
    const isImmediateMode = mode === 'practice' || mode === 'mistakes' || mode === 'bookmarks';
    const currentAnswer = answers[currentQuestion.id];
    const hasAnswered = currentAnswer !== undefined;

    const handleAnswer = (idx: number) => {
        if (isImmediateMode && hasAnswered) return;

        answerQuestion(currentQuestion.id, idx);

        if (isImmediateMode) {
            const isCorrect = idx === currentQuestion.correctIndex;
            const result = recordStreak(currentQuestion.id, isCorrect);
            if (result.mastered) {
                setShowMasteryBadge(true);
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col" style={{ zoom: "0.8" }}>
            <InterstitialOverlay
                isVisible={showInterstitial}
                onClose={() => {
                    setShowInterstitial(false);
                    setViewState('result');
                }}
            />
            {/* Mastery Badge - Only for Practice/Mistakes modes */}
            {mode !== 'exam' && (
                <MasteryBadge
                    isVisible={showMasteryBadge}
                    onClose={() => setShowMasteryBadge(false)}
                />
            )}
            {/* Premium Top Bar */}
            <div className="bg-white/80 backdrop-blur-xl border-b border-indigo-100/50 px-4 py-3 sticky top-0 z-20 shadow-sm transition-all">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => router.push('/dashboard')}
                                className="hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 rounded-xl transition-all"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>

                            {/* Mode Text styled nicely */}
                            <div className="hidden sm:flex flex-col">
                                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-indigo-400">
                                    {mode === 'exam' ? tHome('quiz_simulation') : tHome(mode)}
                                </span>
                                <span className="text-sm font-bold text-slate-700 font-mono">
                                    {String(currentIndex + 1).padStart(2, '0')} <span className="text-slate-300">/</span> {questions.length}
                                </span>
                            </div>
                        </div>

                        {/* Centered Progress Text for Mobile */}
                        <div className="sm:hidden text-xs font-bold text-slate-600 font-mono bg-slate-100 px-3 py-1 rounded-full">
                            {currentIndex + 1} / {questions.length}
                        </div>

                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-rose-500 hover:text-rose-600 hover:bg-rose-50 font-bold tracking-wide text-xs rounded-full px-4 border border-transparent hover:border-rose-100 transition-all"
                                onClick={finishQuiz}
                            >
                                {tQuiz('exit_confirm')}
                            </Button>
                        </div>
                    </div>

                    {/* Premium Number Navigation Strip */}
                    <div className="flex overflow-x-auto pb-2 gap-2 hide-scrollbar mask-linear-fade">
                        {questions.map((q, idx) => {
                            const isCurrent = idx === currentIndex;
                            const ansIdx = answers[q.id];
                            const isAnswered = ansIdx !== undefined;

                            let dotClass = "bg-white text-slate-400 border-slate-200 hover:border-indigo-200 hover:bg-indigo-50";

                            if (isCurrent) {
                                dotClass = "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-100 scale-105 border-transparent font-extrabold";
                            } else if (isAnswered) {
                                if (isImmediateMode) {
                                    const parsed = dataService.parseQuestion(q, locale);
                                    dotClass = ansIdx === parsed.correctIndex
                                        ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                                        : "bg-rose-100 text-rose-700 border-rose-200";
                                } else {
                                    dotClass = "bg-indigo-50 text-indigo-600 border-indigo-200";
                                }
                            }

                            return (
                                <button
                                    key={idx}
                                    onClick={() => useQuizStore.setState({ currentIndex: idx })}
                                    className={cn(
                                        "flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-300 border",
                                        dotClass
                                    )}
                                >
                                    {idx + 1}
                                </button>
                            );
                        })}
                    </div>

                    {/* Slim Gradient Progress Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-slate-100">
                        <div
                            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 transition-all duration-500 ease-out"
                            style={{ width: `${progressValue}%` }}
                        />
                    </div>
                </div>
            </div>

            <div className="flex-1 max-w-[1400px] mx-auto w-full flex justify-center items-start py-8 px-4">
                <SideAd side="left" />

                <div className="flex-1 max-w-3xl w-full">
                    <QuestionCard
                        question={currentQuestion}
                        selectedOptionIndex={currentAnswer}
                        showCorrectness={isImmediateMode && hasAnswered}
                        onOptionSelect={handleAnswer}
                        onNext={() => {
                            if (currentIndex === questions.length - 1) {
                                finishQuiz();
                            } else {
                                nextQuestion();
                            }
                        }}
                        onPrev={prevQuestion}
                        isFirst={currentIndex === 0}
                        isLast={currentIndex === questions.length - 1}
                    />
                </div>

                <SideAd side="right" />
            </div>

            {/* Bottom Banner Placeholders */}
            {!isPremium && (
                <div className="mt-auto px-4 pb-4">
                    <AdBanner
                        dataAdSlot="1122334455"
                        dataAdFormat="horizontal"
                        dataFullWidthResponsive={true}
                        className="w-full max-w-2xl mx-auto"
                    />
                </div>
            )}
        </div>
    );
}
