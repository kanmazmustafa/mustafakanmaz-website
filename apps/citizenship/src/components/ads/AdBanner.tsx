"use client";

import { useEffect, useRef } from "react";
import { useUserStore } from "@/store/user-store";

type AdBannerProps = {
    dataAdSlot: string;
    dataAdFormat: string;
    dataFullWidthResponsive: boolean;
    className?: string;
};

export const AdBanner = ({
    dataAdSlot,
    dataAdFormat,
    dataFullWidthResponsive,
    className,
}: AdBannerProps) => {
    const { isPremium, rewardedUntil } = useUserStore();
    const isRewarded = rewardedUntil ? Date.now() < rewardedUntil : false;
    const adRef = useRef<HTMLModElement>(null);

    useEffect(() => {
        if (isPremium || isRewarded) return;
        if (!adRef.current) return;

        // Prevent duplicate ad requests
        if (adRef.current.getAttribute("data-adsbygoogle-status")) return;

        const pushAd = () => {
            try {
                if (typeof window !== "undefined") {
                    // Check if element is visible
                    const isVisible = adRef.current?.offsetParent !== null;
                    if (!isVisible) return;

                    // @ts-ignore
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                }
            } catch (error: any) {
                const msg = error?.message || "";
                if (msg.includes("already have ads") || msg.includes("No slot size")) return;
                console.error("AdSense push error:", error);
            }
        };

        // Small delay to ensure layout is settled
        const timeout = setTimeout(pushAd, 500);
        return () => clearTimeout(timeout);
    }, [isPremium, isRewarded]);

    if (isPremium || isRewarded) return null;

    return (
        <div className={`${className} min-h-[100px] bg-slate-50 relative`} style={{ minHeight: '100px' }}>
            {process.env.NODE_ENV === 'development' && (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-slate-400 font-mono border border-dashed border-slate-300 rounded-lg pointer-events-none">
                    AD PLACEHOLDER ({dataAdSlot})
                </div>
            )}
            <ins
                ref={adRef}
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
                data-ad-slot={dataAdSlot}
                data-ad-format={dataAdFormat}
                data-full-width-responsive={dataFullWidthResponsive.toString()}
                data-adtest={process.env.NODE_ENV === 'development' ? "on" : undefined}
            />
        </div>
    );
};
