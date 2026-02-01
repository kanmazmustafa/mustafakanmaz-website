"use client";

import { useLocale, useTranslations } from "next-intl";
import { Question } from "@/types/question";
import { CheckCircle, XCircle, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { dataService } from "@/lib/data-service";
import { SideAd } from "@/components/ads/SideAd";

interface QuizReviewProps {
    questions: Question[];
    answers: Record<number, number>;
    onHome: () => void;
}

export function QuizReview({ questions, answers, onHome }: QuizReviewProps) {
    const t = useTranslations('review');
    const tCommon = useTranslations('common');
    const locale = useLocale();

    // Filter only wrong answers ? Or show all? 
    // Flutter logic: "failedIndices.isEmpty ? success : list".
    // Let's show all or just failed? Flutter shows FAILED indices.

    const failedQuestions = questions.filter(q => {
        // Standardize correct index derivation
        let correctIdx = -1;
        if (q.correct_option_id) {
            correctIdx = q.correct_option_id.toLowerCase().charCodeAt(0) - 97;
        } else {
            correctIdx = 0;
        }

        const userAns = answers[q.id];
        return userAns !== correctIdx;
    });

    if (failedQuestions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
                <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
                <h2 className="text-2xl font-bold text-slate-800 mb-2">{t('perfect_title')}</h2>
                <p className="text-slate-500 mb-8">{t('perfect_desc')}</p>
                <Button onClick={onHome} className="bg-primary">
                    <Home className="mr-2 h-4 w-4" /> {tCommon('back_home')}
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-[1400px] mx-auto flex justify-center items-start py-4">
            <SideAd side="left" />

            <div className="flex-1 w-full max-w-3xl px-4 pb-20">
                <div className="flex items-center justify-between mb-6">
                    <Button variant="ghost" onClick={onHome} className="text-slate-500">
                        <ArrowLeft className="mr-2 h-4 w-4" /> {tCommon('back')}
                    </Button>
                    <h1 className="text-xl font-bold text-slate-800">{t('app_bar_title')}</h1>
                    <div className="w-20" /> {/* Spacer */}
                </div>

                <div className="space-y-6">
                    {failedQuestions.map((q, idx) => {
                        const parsed = dataService.parseQuestion(q, locale);
                        const userAns = answers[q.id];
                        const correctIdx = parsed.correctIndex;
                        const options = parsed.options;

                        return (
                            <div key={q.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                                {/* Question Text */}
                                <h3 className="font-bold text-slate-800 mb-4 text-lg">
                                    {parsed.text}
                                </h3>

                                <div className="space-y-3">
                                    {options.map((opt, optIdx) => {
                                        const isCorrect = optIdx === correctIdx;
                                        const isSelected = optIdx === userAns;

                                        let styles = "border-slate-200 bg-white";
                                        if (isCorrect) styles = "border-green-500 bg-green-50 ring-1 ring-green-500";
                                        else if (isSelected) styles = "border-red-500 bg-red-50 ring-1 ring-red-500";

                                        return (
                                            <div
                                                key={optIdx}
                                                className={cn(
                                                    "p-4 rounded-xl border flex items-center justify-between transition-all",
                                                    styles
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className={cn(
                                                        "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border",
                                                        isCorrect ? "bg-green-100 text-green-700 border-green-200" :
                                                            isSelected ? "bg-red-100 text-red-700 border-red-200" : "bg-slate-50 text-slate-500 border-slate-200"
                                                    )}>
                                                        {String.fromCharCode(65 + optIdx)}
                                                    </span>
                                                    <span className={cn(
                                                        "text-sm font-medium",
                                                        isCorrect ? "text-green-800" : isSelected ? "text-red-800" : "text-slate-600"
                                                    )}>
                                                        {opt}
                                                    </span>
                                                </div>

                                                {isCorrect && <CheckCircle className="h-5 w-5 text-green-600" />}
                                                {isSelected && !isCorrect && <XCircle className="h-5 w-5 text-red-600" />}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Explanation Section */}
                                {parsed.explanation && (
                                    <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-0.5">
                                                <div className="w-5 h-5 rounded-full bg-blue-200 flex items-center justify-center text-[10px] font-bold text-blue-700">
                                                    i
                                                </div>
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-blue-700 uppercase mb-1 tracking-wider">
                                                    {t('explanation')}
                                                </h4>
                                                <p className="text-sm text-blue-800 leading-relaxed">
                                                    {parsed.explanation}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-slate-200 flex justify-center z-20">
                    <Button className="w-full max-w-sm h-12 text-lg rounded-xl" onClick={onHome}>
                        <Home className="mr-2 h-5 w-5" /> {tCommon('back_home')}
                    </Button>
                </div>
            </div>

            <SideAd side="right" />
        </div>
    );
}
