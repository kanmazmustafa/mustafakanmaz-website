"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from '@/i18n/routing';
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, RotateCcw, Home, ListChecks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Question } from "@/types/question";
import { SideAd } from "@/components/ads/SideAd";
import { AdBanner } from "@/components/ads/AdBanner";
import { AD_CONFIG } from "@/config/ads";
import { useUserStore } from "@/store/user-store";

interface QuizResultProps {
    questions: Question[];
    answers: Record<number, number>; // qId -> selectedIndex
    onRetry: () => void;
    onHome: () => void;
    onReview: () => void;
    mode: string;
}

export function QuizResult({ questions, answers, onRetry, onHome, onReview, mode }: QuizResultProps) {
    const t = useTranslations('result');
    const tHome = useTranslations('home');
    const tCommon = useTranslations('common');
    // For now using hardcoded or generic keys if specific 'result' namespace missing in some langs, 
    // but plan implies we should have them.

    const [score, setScore] = useState(0);
    const [displayScore, setDisplayScore] = useState(0);
    const total = questions.length;

    useEffect(() => {
        let correct = 0;
        questions.forEach(q => {
            const selected = answers[q.id];

            // Standardize correct index derivation
            let correctIdx = -1;
            if (q.correct_option_id) {
                correctIdx = q.correct_option_id.toLowerCase().charCodeAt(0) - 97; // 'a' -> 0
            } else {
                // Fallback attempt (should not happen with generic data type)
                correctIdx = 0;
            }

            if (selected === correctIdx) correct++;
        });
        setScore(correct);

        // Animated counter for score
        const duration = 1500; // ms
        const startTime = Date.now();
        const startValue = 0;
        const endValue = Math.round((correct / total) * 100);

        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(startValue + (endValue - startValue) * easedProgress);

            setDisplayScore(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);

        if (correct >= 17) {
            const duration = 3 * 1000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

            const interval: any = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
                confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
            }, 250);
        }
    }, [questions, answers]);

    const isPassed = score >= 17;
    const percentage = Math.round((score / total) * 100);

    return (
        <div className="max-w-[1400px] mx-auto flex justify-center items-start py-8 px-4 md:px-0">
            <SideAd side="left" />
            <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">

                {/* Main Result Card */}
                <div className="w-full bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 md:p-12 text-center border border-white/40 relative overflow-hidden">
                    {/* Background Gradients */}
                    <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${isPassed ? 'from-green-400 to-emerald-500' : 'from-rose-400 to-red-600'}`} />
                    <div className="absolute top-0 right-0 w-64 h-64 bg-slate-100 rounded-full blur-3xl -z-10 -mr-16 -mt-16 opacity-50"></div>

                    {/* Score Circle */}
                    <div className="relative w-48 h-48 mx-auto mb-8">
                        <svg className="w-full h-full -rotate-90">
                            {/* Background Circle */}
                            <circle
                                cx="96" cy="96" r="88"
                                className="stroke-slate-100"
                                strokeWidth="12"
                                fill="none"
                            />
                            {/* Progress Circle */}
                            <motion.circle
                                initial={{ strokeDashoffset: 553 }}
                                animate={{ strokeDashoffset: 553 - (553 * (score / total)) }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                cx="96" cy="96" r="88"
                                className={isPassed ? "stroke-green-500" : "stroke-rose-500"}
                                strokeWidth="12"
                                fill="none"
                                strokeDasharray="553"
                                strokeLinecap="round"
                            />
                        </svg>

                        {/* Inner Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-center"
                            >
                                <span className={`text-5xl font-black tracking-tighter ${isPassed ? 'text-slate-800' : 'text-slate-800'}`}>
                                    {displayScore}<span className="text-2xl align-top">%</span>
                                </span>
                            </motion.div>
                        </div>

                        {/* Status Icon Badge */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1, type: "spring" }}
                            className={`absolute -bottom-2 bg-white rounded-full p-2 shadow-lg border-4 ${isPassed ? 'border-green-100' : 'border-rose-100'} left-1/2 -translate-x-1/2`}
                        >
                            {isPassed ? (
                                <CheckCircle2 className="w-8 h-8 text-green-500" />
                            ) : (
                                <XCircle className="w-8 h-8 text-rose-500" />
                            )}
                        </motion.div>
                    </div>

                    <h1 className={`text-3xl font-extrabold mb-3 ${isPassed ? 'text-green-600' : 'text-rose-600'}`}>
                        {isPassed ? t('congrats') : t('failed')}
                    </h1>

                    <p className="text-slate-500 font-medium mb-8 leading-relaxed px-4">
                        {isPassed
                            ? t('success_msg')
                            : t('failed_msg')}
                    </p>

                    <div className="flex items-center justify-center gap-4 mb-8 bg-slate-50 py-3 px-6 rounded-2xl">
                        <div className="text-center">
                            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider">{t('score_label')}</span>
                            <span className="text-xl font-bold text-slate-800">{score} <span className="text-slate-400">/ {total}</span></span>
                        </div>
                    </div>

                    {/* Ad Banner - Result Page */}
                    {!useUserStore.getState().isPremium && AD_CONFIG.ENABLED.BANNER && (
                        <div className="py-6 w-full">
                            <AdBanner
                                dataAdSlot={AD_CONFIG.SLOTS.RESULT_BANNER}
                                dataAdFormat="auto"
                                dataFullWidthResponsive={true}
                                className="w-full overflow-hidden rounded-xl border border-slate-100 shadow-sm"
                            />
                        </div>
                    )}

                    {/* Actions */}
                    <div className="space-y-3">
                        {score < total && (
                            <Button
                                variant="outline"
                                className="w-full h-14 text-base font-bold rounded-xl border-2 border-slate-200 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 transition-all"
                                onClick={onReview}
                            >
                                <ListChecks className="mr-2 h-5 w-5" /> {t('review_errors')}
                            </Button>
                        )}

                        <Button
                            className="w-full h-14 text-base font-bold rounded-xl bg-slate-900 hover:bg-slate-800 shadow-xl shadow-slate-900/10 transition-transform active:scale-95"
                            onClick={onRetry}
                        >
                            <RotateCcw className="mr-2 h-5 w-5" /> {mode === 'exam' ? t('retake_exam') : t('retry')}
                        </Button>

                        <Button
                            variant="ghost"
                            className="w-full h-12 text-slate-400 hover:text-slate-600 hover:bg-transparent"
                            onClick={onHome}
                        >
                            <Home className="mr-2 h-4 w-4" /> {t('home_btn')}
                        </Button>
                    </div>
                </div>

            </div>
            <SideAd side="right" />
        </div>
    );
}
