"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUserStore } from "@/store/user-store";
import { AdBanner } from "./AdBanner";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { AD_CONFIG } from "@/config/ads";

interface Props {
    isVisible: boolean;
    onClose: () => void;
    duration?: number;
}

export function InterstitialOverlay({ isVisible, onClose, duration = 3000 }: Props) {
    const t = useTranslations('dashboard');
    const { isPremium, rewardedUntil, lastInterstitialTime, updateInterstitialTime } = useUserStore();
    const [canProceed, setCanProceed] = useState(false);

    // Check if ads should be hidden
    const isAdFree = isPremium || (rewardedUntil && rewardedUntil > Date.now());

    // Frequency cap: 3 minutes (180,000 ms)
    const isCapped = Date.now() - lastInterstitialTime < 180000;

    useEffect(() => {
        if (isVisible) {
            if (isAdFree || isCapped) {
                // Skip if premium or capped
                onClose();
                return;
            }

            setCanProceed(false);
            const timer = setTimeout(() => {
                setCanProceed(true);
                updateInterstitialTime();
                onClose();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, isAdFree, isCapped, duration, onClose, updateInterstitialTime]);

    if (isAdFree || isCapped) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-6 text-center"
                >
                    <div className="mb-8">
                        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">
                            {t('loading') || "Loading results..."}
                        </h2>
                        <p className="text-slate-500">
                            Preparing your performance report
                        </p>
                    </div>

                    <div className="w-full max-w-lg border-2 border-dashed border-slate-200 rounded-3xl p-4 bg-slate-50 relative overflow-hidden">
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-slate-200 rounded text-[10px] uppercase font-bold text-slate-500">
                            Advertisement
                        </div>
                        <div className="min-h-[250px] flex items-center justify-center">
                            <AdBanner
                                dataAdSlot={AD_CONFIG.SLOTS.RESULT_BANNER}
                                dataAdFormat="rectangle"
                                dataFullWidthResponsive={true}
                                className="w-full"
                            />
                        </div>
                    </div>

                    <div className="mt-8 text-xs text-slate-400">
                        {canProceed ? "Redirecting..." : "Please wait a moment"}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
