"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/store/user-store";
import { Button } from "@/components/ui/button";
import { Timer, Play, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";

import { RewardedAdOverlay } from "./RewardedAdOverlay";

interface RewardedAdButtonProps {
    compact?: boolean;
}

export function RewardedAdButton({ compact }: RewardedAdButtonProps) {
    const t = useTranslations('premium');
    const router = useRouter();
    const { rewardedUntil, setRewarded, isPremium } = useUserStore();
    const [timeLeft, setTimeLeft] = useState<string>("");
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    useEffect(() => {
        if (!rewardedUntil) return;

        const interval = setInterval(() => {
            const now = Date.now();
            const diff = rewardedUntil - now;

            if (diff <= 0) {
                setTimeLeft("");
                clearInterval(interval);
            } else {
                const hours = Math.floor(diff / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                setTimeLeft(`${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [rewardedUntil]);

    if (isPremium) return null;

    const handleComplete = () => {
        setRewarded(2); // 2 hours
        router.refresh();
    };

    const handleWatchAd = () => {
        setIsOverlayVisible(true);
    };

    // Active State (Green Timer)
    if (timeLeft) {
        if (compact) {
            return (
                <div className="flex items-center gap-1.5 bg-green-500/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-green-500/20 shadow-sm animate-pulse cursor-default">
                    <Timer size={12} className="text-green-500" />
                    <span className="text-[10px] font-bold text-green-400 font-mono tracking-tighter">{timeLeft}</span>
                </div>
            );
        }
        return (
            <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="bg-green-500 rounded-full p-2 text-white shadow-sm">
                        <CheckCircle size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-green-800 text-sm leading-tight">Ad-Free Mode Active</h4>
                        <p className="text-green-600 text-xs font-mono font-medium">{timeLeft} remaining</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {compact ? (
                <Button
                    onClick={handleWatchAd}
                    className="bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-white shadow-[0_4px_12px_-4px_rgba(79,70,229,0.4)] hover:shadow-lg transition-all rounded-full h-8 px-3 text-[10px] font-bold uppercase tracking-wider border-none ring-1 ring-white/10"
                >
                    <Play size={10} className="mr-1.5 fill-white" />
                    Reklamsız Mod
                </Button>
            ) : (
                <Button
                    onClick={handleWatchAd}
                    variant="outline"
                    className="w-full h-16 border-2 border-dashed border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all group bg-white/50"
                >
                    <div className="flex items-center gap-2 text-indigo-600 font-bold">
                        <Play size={18} className="fill-indigo-600" />
                        <span>{t('temp_title')}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 group-hover:text-indigo-400">
                        {t('temp_sub')}
                    </span>
                </Button>
            )}

            <RewardedAdOverlay
                isVisible={isOverlayVisible}
                onClose={() => setIsOverlayVisible(false)}
                onComplete={handleComplete}
            />
        </>
    );
}
