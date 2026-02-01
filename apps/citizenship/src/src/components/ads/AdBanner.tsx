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
        // Only push if NOT in development and if window is available
        if (process.env.NODE_ENV === 'development') return;

        try {
            if (typeof window !== "undefined") {
                // @ts-ignore
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            }
        } catch (error) {
            console.error("AdSense error:", error);
        }
    }, [isPremium, isRewarded]);

    if (isPremium || isRewarded) return null;

    if (process.env.NODE_ENV === 'development') {
        return (
            <div className={`${className} bg-gray-200 border-2 border-dashed border-gray-400 flex items-center justify-center text-gray-500 font-bold p-4`}>
                [AdSense Banner: {dataAdSlot}]
            </div>
        );
    }

    return (
        <div className={className}>
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
                data-ad-slot={dataAdSlot}
                data-ad-format={dataAdFormat}
                data-full-width-responsive={dataFullWidthResponsive.toString()}
            />
        </div>
    );
};
