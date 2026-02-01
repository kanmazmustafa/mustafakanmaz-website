import { useLocale, useTranslations } from "next-intl";

import { ParsedQuestion } from "@/types/question";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import Image from "next/image";
import { useUserStore } from "@/store/user-store";
import { motion, AnimatePresence } from "framer-motion";

interface QuestionCardProps {
    question: ParsedQuestion;
    selectedOptionIndex?: number;
    showCorrectness?: boolean; // New: show green/red colors immediately
    onOptionSelect: (index: number) => void;
    onNext: () => void;
    onPrev: () => void;
    isFirst: boolean;
    isLast: boolean;
}

export function QuestionCard({
    question,
    selectedOptionIndex,
    showCorrectness,
    onOptionSelect,
    onNext,
    onPrev,
    isFirst,
    isLast
}: QuestionCardProps) {
    const t = useTranslations('practice');
    const { bookmarks, toggleBookmark } = useUserStore();
    const isBookmarked = bookmarks.includes(question.id);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            key={question.id}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <Card className="w-full max-w-2xl mx-auto shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border-0 rounded-[2.5rem] overflow-hidden bg-white/95 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-white pb-6 pt-8 px-8 border-b border-slate-100">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-indigo-600 tracking-wider uppercase mb-1">{question.category}</span>
                            <span className="text-xs font-medium text-slate-400">ID: {question.id}</span>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-amber-400 hover:text-amber-500 hover:bg-amber-50 rounded-full h-10 w-10 transition-transform hover:scale-110"
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(question.id);
                            }}
                        >
                            {isBookmarked ? (
                                <Star className="h-6 w-6 fill-amber-400 drop-shadow-sm" />
                            ) : (
                                <Star className="h-6 w-6" />
                            )}
                        </Button>
                    </div>
                    <CardTitle className="text-2xl md:text-3xl leading-snug font-bold text-slate-800">{question.text}</CardTitle>
                </CardHeader>

                <CardContent className="p-8 space-y-6">
                    {question.image && (
                        <div className="relative w-full h-56 mb-6 rounded-2xl overflow-hidden border border-slate-100 shadow-inner bg-slate-50">
                            <Image
                                src={`/${question.image}`}
                                alt={t('image_alt')}
                                fill
                                className="object-contain p-2"
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-4">
                        {question.options.map((text, idx) => {
                            const isSelected = selectedOptionIndex === idx;
                            const isCorrect = idx === question.correctIndex;

                            let cardClass = "border-slate-200 bg-white hover:border-indigo-200 hover:bg-slate-50";
                            let circleClass = "border-slate-300 text-slate-500 bg-slate-50";

                            if (isSelected) {
                                cardClass = "border-indigo-500 bg-indigo-50/50 shadow-md ring-1 ring-indigo-500/20";
                                circleClass = "border-indigo-600 bg-indigo-600 text-white shadow-sm";
                            }

                            if (showCorrectness && selectedOptionIndex !== undefined) {
                                if (isCorrect) {
                                    cardClass = "border-green-500 bg-green-50 shadow-md ring-1 ring-green-500/20";
                                    circleClass = "border-green-600 bg-green-500 text-white shadow-sm";
                                } else if (isSelected) {
                                    cardClass = "border-rose-500 bg-rose-50 shadow-md ring-1 ring-rose-500/20";
                                    circleClass = "border-rose-600 bg-rose-500 text-white shadow-sm";
                                }
                            }

                            const letter = String.fromCharCode(65 + idx); // A, B, C, D

                            return (
                                <motion.div
                                    key={idx}
                                    whileTap={!showCorrectness ? { scale: 0.98 } : {}}
                                    onClick={() => !showCorrectness && onOptionSelect(idx)}
                                    className={cn(
                                        "p-5 rounded-2xl border-2 transition-all duration-200 group relative",
                                        !showCorrectness && "cursor-pointer active:scale-[0.99]",
                                        cardClass
                                    )}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={cn(
                                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-2 text-sm font-extrabold transition-colors duration-200",
                                            circleClass
                                        )}>
                                            {letter}
                                        </div>
                                        <span className="text-base md:text-lg font-medium text-slate-700 pt-0.5 leading-relaxed">{text}</span>

                                        <AnimatePresence>
                                            {showCorrectness && selectedOptionIndex !== undefined && (
                                                <motion.div
                                                    initial={{ scale: 0, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    className="ml-auto flex-shrink-0"
                                                >
                                                    {isCorrect && <div className="text-green-600 bg-green-100 p-1 rounded-full">✓</div>}
                                                    {isSelected && !isCorrect && <div className="text-rose-600 bg-rose-100 p-1 rounded-full">✗</div>}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {showCorrectness && selectedOptionIndex !== undefined && question.explanation && (
                        <div className="mt-8 p-6 bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl animate-in fade-in slide-in-from-top-4 duration-500 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-200/20 rounded-full blur-2xl -mr-8 -mt-8"></div>
                            <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2 relative z-10">
                                <span className="text-xl">💡</span> {t('explanation')}
                            </h4>
                            <p className="text-indigo-800 leading-relaxed relative z-10 font-medium ml-8">
                                {question.explanation}
                            </p>
                        </div>
                    )}
                </CardContent>

                <CardFooter className="flex justify-between px-8 pb-8 bg-transparent">
                    <Button
                        variant="ghost"
                        onClick={onPrev}
                        disabled={isFirst}
                        className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl px-6"
                    >
                        {t('prev')}
                    </Button>

                    <Button
                        onClick={onNext}
                        className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-8 shadow-lg shadow-slate-900/20 transition-all hover:scale-105 active:scale-95"
                    >
                        {isLast ? t('finish') : t('next')}
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
