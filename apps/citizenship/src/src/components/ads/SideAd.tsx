"use client";

import { useUserStore } from "@/store/user-store";
import { AdBanner } from "./AdBanner";
import { cn } from "@/lib/utils";

import { AD_CONFIG } from "@/config/ads";

interface SideAdProps {
    side: "left" | "right";
    className?: string;
}

export function SideAd({ side, className }: SideAdProps) {
    const { isPremium, rewardedUntil } = useUserStore();
    const isRewarded = rewardedUntil ? Date.now() < rewardedUntil : false;

    if (isPremium || isRewarded || !AD_CONFIG.ENABLED.SIDEBAR) return null;

    return (
        <aside
            className={cn(
                "hidden xl:flex flex-col items-center sticky top-24 w-48 h-[600px] bg-slate-100/50 rounded-2xl border border-dashed border-slate-200 p-2 overflow-hidden",
                side === "left" ? "mr-4" : "ml-4",
                className
            )}
        >
            <div className="text-[10px] text-slate-400 mb-2 uppercase tracking-widest font-bold">
                ADVERTISEMENT
            </div>
            <AdBanner
                dataAdSlot={side === "left" ? AD_CONFIG.SLOTS.SIDEBAR_LEFT : AD_CONFIG.SLOTS.SIDEBAR_RIGHT}
                dataAdFormat="vertical"
                dataFullWidthResponsive={false}
                className="w-full h-full"
            />
        </aside>
    );
}
