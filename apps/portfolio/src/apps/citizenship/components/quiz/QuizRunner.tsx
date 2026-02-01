"use client";

import { useEffect, useState, useCallback } from "react";
import { useQuizStore } from "@/apps/citizenship/store/quiz-store";
import { dataService } from "@/apps/citizenship/lib/data-service";
import { useUserStore } from "@/apps/citizenship/store/user-store";
import { QuestionCard } from "./QuestionCard";
import { QuizResult } from "./QuizResult";
import { QuizReview } from "./QuizReview";
import { Button } from "@/apps/citizenship/components/ui/button";
import { Progress } from "@/apps/citizenship/components/ui/progress";
import { useRouter } from "@/apps/citizenship/i18n/routing";
import { Loader2, ArrowLeft } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { cn } from "@/apps/citizenship/lib/utils";

import { AdBanner } from "@/apps/citizenship/components/ads/AdBanner";
import { SideAd } from "@/apps/citizenship/components/ads/SideAd";
import { InterstitialOverlay } from "@/apps/citizenship/components/ads/InterstitialOverlay";
import { MasteryBadge } from "./MasteryBadge";

import { useLocale, useTranslations } from "next-intl";
import { AD_CONFIG } from "@/apps/citizenship/config/ads";


export default function QuizRunner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode') || 'exam';
    const categoryId = searchParams.get('category');
    const stateFilter = searchParams.get('state');

    const locale = useLocale();
    const tQuiz = useTranslations('quiz');
    const tHome = useTranslations('home');

    const { isPremium, rewardedUntil, lastInterstitialTime, selectedState, recordStreak } = useUserStore();
    const { lastIndices, setLastIndex } = useUserStore();

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

    const [isLoading, setIsLoading] = useState(true);
    const [isExplanationsLoading, setIsExplanationsLoading] = useState(true);
    const [viewState, setViewState] = useState<'quiz' | 'result' | 'review'>('quiz');
    const [showInterstitial, setShowInterstitial] = useState(false);
    const [showMasteryBadge, setShowMasteryBadge] = useState(false);

    const handleFinish = useCallback(() => {
        finishQuiz();

        // Ad Logic Check
        const isAdFree = isPremium || (rewardedUntil && rewardedUntil > Date.now());
        const isCapped = Date.now() - lastInterstitialTime < 180000;

        if (isAdFree || isCapped) {
            setViewState('result');
        } else {
            setShowInterstitial(true);
        }
    }, [finishQuiz, isPremium, rewardedUntil, lastInterstitialTime]);

    // useEffect(() => {
    //     if (isFinished && !isLoading) {
    //         setShowInterstitial(true);
    //     }
    // }, [isFinished, isLoading]);

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
                // Exam Mode Resume also enabled
                const savedIndex = useUserStore.getState().lastIndices['exam_session'];
                if (savedIndex !== undefined && savedIndex < filtered.length) {
                    useQuizStore.setState({ currentIndex: savedIndex });
                } else {
                    useQuizStore.setState({ currentIndex: 0 });
                }
            }

            setIsLoading(false);
        }

        init();
    }, [mode, categoryId, stateFilter, selectedState, setQuestions]);

    // Save Last Index on Change
    useEffect(() => {
        if (mode === 'exam' || isLoading || questions.length === 0) return;

        let resumeKey = `practice_${categoryId}`;
        if (mode === 'mistakes') resumeKey = 'mistakes';
        if (mode === 'bookmarks') resumeKey = 'bookmarks';
        if (mode === 'exam') resumeKey = 'exam_session';

        setLastIndex(resumeKey, currentIndex);
    }, [currentIndex, mode, categoryId, isLoading, questions.length, setLastIndex]);

    // Exit Warning: Warn user before leaving active quiz
    useEffect(() => {
        if (isLoading || questions.length === 0 || isFinished) return;

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = ''; // Required for Chrome
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [isLoading, questions.length, isFinished]);

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin" /></div>;
    }

    if (viewState === 'result') {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 py-10">
                <QuizResult
                    questions={questions}
                    answers={answers}
                    onRetry={() => {
                        window.location.reload();
                    }}
                    onHome={() => router.push('/einbuergerungstest/app/dashboard')}
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
                    onHome={() => router.push('/einbuergerungstest/app/dashboard')}
                />
            </div>
        );
    }

    if (questions.length === 0) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-8 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-bold text-slate-700 mb-8">{tHome('no_questions')}</h2>
            <Button
                onClick={() => router.push('/einbuergerungstest/app/dashboard')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {tQuiz('exit_confirm') || 'Geri Dön'}
            </Button>
        </div>
    );

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

    // FAQ Schema for SEO
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [{
            "@type": "Question",
            "name": currentQuestion.text,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": currentQuestion.options[currentQuestion.correctIndex]
            }
        }]
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c').replace(/>/g, '\\u003e')
                }}
            />
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
            {/* Premium Top Bar - Floating Island Design */}
            <header className="sticky top-0 z-[100] px-4 pt-4 pointer-events-none">
                <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-xl border border-indigo-100/50 shadow-xl shadow-indigo-500/5 rounded-[2rem] px-6 py-3 pointer-events-auto overflow-visible">
                    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
                        {/* Left Side: Back Button */}
                        <div className="flex-shrink-0 z-[101]">
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => router.push('/einbuergerungstest/app/dashboard')}
                                className="hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 rounded-xl transition-all h-12 w-12 cursor-pointer relative"
                            >
                                <ArrowLeft className="h-6 w-6 pointer-events-none" />
                            </Button>
                        </div>

                        {/* Middle: Text (Centered) - CLICK THROUGH ENABLED */}
                        <div className="min-w-0 text-center pointer-events-none px-2 select-none">
                            <div className="flex flex-col">
                                <span className="text-xs sm:text-sm md:text-base uppercase font-black tracking-wide text-indigo-400 truncate">
                                    {mode === 'exam' ? tHome('quiz_simulation') :
                                        mode === 'bookmarks' ? tHome('my_bookmarks') :
                                            mode === 'mistakes' ? tHome('my_errors') :
                                                mode === 'practice' ? tHome('practice') : mode}
                                </span>
                                <span className="text-base sm:text-lg md:text-xl font-bold text-slate-700 font-mono">
                                    {String(currentIndex + 1).padStart(2, '0')} <span className="text-slate-300">/</span> {questions.length}
                                </span>
                            </div>
                        </div>

                        {/* Right Side: Finish Button */}
                        <div className="flex-shrink-0 relative z-[101]">
                            <Button
                                type="button"
                                variant="default"
                                size="lg"
                                className="bg-indigo-600 hover:bg-indigo-700 text-white font-black py-2 px-6 rounded-xl transition-all shadow-xl active:scale-95 hover:animate-pulse hover:ring-4 hover:ring-indigo-300/50 min-w-[100px] cursor-pointer relative"
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleFinish();
                                }}
                            >
                                <span className="pointer-events-none">{tQuiz('exit_confirm')}</span>
                            </Button>
                        </div>
                    </div>

                    {/* Slim Gradient Progress Bar - Integrated into pill bottom */}
                    <div className="absolute bottom-0 left-6 right-6 h-[3px] bg-slate-100/50 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 transition-all duration-500 ease-out"
                            style={{ width: `${progressValue}%` }}
                        />
                    </div>
                </div>
            </header>

            <div className="flex-1 max-w-[1400px] mx-auto w-full flex justify-center items-start pt-8 md:pt-12 pb-12 px-4">
                <SideAd side="left" />

                <div className="flex-1 max-w-3xl w-full">
                    <QuestionCard
                        question={currentQuestion}
                        selectedOptionIndex={currentAnswer}
                        showCorrectness={isImmediateMode && hasAnswered}
                        onOptionSelect={handleAnswer}
                        onNext={nextQuestion}
                        onFinish={handleFinish}
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
                        dataAdSlot={AD_CONFIG.SLOTS.QUIZ_BOTTOM_BANNER}
                        dataAdFormat="horizontal"
                        dataFullWidthResponsive={true}
                        className="w-full max-w-2xl mx-auto"
                    />
                </div>
            )}
        </div>
    );
}
