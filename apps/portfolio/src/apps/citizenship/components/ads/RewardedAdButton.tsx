"use client";

import { useState, useEffect } from "react";
import { useUserStore } from "@/apps/citizenship/store/user-store";
import { Button } from "@/apps/citizenship/components/ui/button";
import { Timer, Play, CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/apps/citizenship/i18n/routing";

export function RewardedAdButton() {
    const t = useTranslations('premium');
    const router = useRouter();
    const { rewardedUntil, setRewarded, isPremium } = useUserStore();
    const [timeLeft, setTimeLeft] = useState<string>("");

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
                setTimeLeft(`${hours}s ${minutes}d ${seconds}sn`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [rewardedUntil]);

    if (isPremium) return null;

    const handleWatchAd = () => {
        // Simulate watching an ad
        alert(t('restore_started') || "Ad is starting...");
        setTimeout(() => {
            setRewarded(2); // 2 hours
            alert(t('restore_success') || "Access granted!");
            router.push('/einbuergerungstest/app/dashboard');
        }, 2000);
    };

    if (timeLeft) {
        return (
            <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="bg-green-500 rounded-full p-2 text-white">
                        <CheckCircle size={20} />
                    </div>
                    <div>
                        <h4 className="font-bold text-green-800 text-sm">{t('temp_title')} Aktif</h4>
                        <p className="text-green-600 text-xs font-mono">{timeLeft}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Button
            onClick={handleWatchAd}
            variant="outline"
            className="w-full h-16 border-2 border-dashed border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all group"
        >
            <div className="flex items-center gap-2 text-indigo-600 font-bold">
                <Play size={18} className="fill-indigo-600" />
                <span>{t('temp_title')}</span>
            </div>
            <span className="text-[10px] text-slate-400 group-hover:text-indigo-400">
                {t('temp_sub')}
            </span>
        </Button>
    );
}
