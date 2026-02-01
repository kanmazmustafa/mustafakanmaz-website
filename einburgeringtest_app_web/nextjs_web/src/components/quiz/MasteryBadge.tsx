"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Star } from "lucide-react";

interface MasteryBadgeProps {
    isVisible: boolean;
    onClose: () => void;
}

export function MasteryBadge({ isVisible, onClose }: MasteryBadgeProps) {
    const t = useTranslations('practice');
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setShow(true);
            const timer = setTimeout(() => {
                setShow(false);
                onClose();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black/20 animate-in fade-in duration-300" />

            {/* Badge Container */}
            <div className="relative z-10 flex flex-col items-center animate-in zoom-in-50 fade-in duration-500">
                {/* Glow Effect */}
                <div className="absolute w-40 h-40 bg-yellow-400/30 rounded-full blur-3xl animate-pulse" />

                {/* Star Icon */}
                <div className="relative bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 p-6 rounded-full shadow-2xl ring-4 ring-yellow-200/50">
                    <Star className="w-16 h-16 text-white fill-white drop-shadow-lg" />
                </div>

                {/* Text */}
                <div className="mt-6 text-center">
                    <h2 className="text-3xl font-black text-white drop-shadow-lg tracking-tight">
                        {t('mastered_title') || "MASTERED!"}
                    </h2>
                    <p className="mt-2 text-lg font-medium text-white/90 drop-shadow">
                        {t('mastered_desc') || "3x Correct Streak!"}
                    </p>
                </div>

                {/* Confetti-like particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-3 h-3 rounded-full animate-bounce"
                            style={{
                                backgroundColor: ['#FFD700', '#FFA500', '#FF6347', '#7B68EE', '#00CED1'][i % 5],
                                left: `${10 + (i * 8)}%`,
                                top: `${20 + (i % 3) * 25}%`,
                                animationDelay: `${i * 0.1}s`,
                                animationDuration: `${0.8 + (i * 0.1)}s`
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
