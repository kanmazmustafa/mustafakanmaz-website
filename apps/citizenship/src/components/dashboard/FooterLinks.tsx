"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { Info, ShieldAlert, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterLinksProps {
    variant?: "footer" | "menu";
    className?: string;
}

export function FooterLinks({ variant = "footer", className }: FooterLinksProps) {
    const tFooter = useTranslations('footer');
    const tDrawer = useTranslations('drawer');

    const handleShare = async () => {
        if (typeof window !== 'undefined' && navigator.share) {
            try {
                await navigator.share({
                    title: 'Einbürgerungstest APP',
                    text: 'Citizenship Test 2026 - Hazırlık Uygulaması!',
                    url: window.location.origin,
                });
            } catch (err) {
                console.log('Sharing failed', err);
            }
        }
    };

    if (variant === "menu") {
        return (
            <div className={cn("flex flex-col gap-2 w-full", className)}>
                {/* About Item - Now Links to External or internal page if needed, but keeping simple for menu */}
                <Link href="/privacy" className="w-full">
                    <Button variant="ghost" className="w-full justify-start gap-4 h-12 px-2 hover:bg-white/5 text-slate-300 hover:text-white rounded-xl transition-all group">
                        <div className="h-9 w-9 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                            <Info size={18} />
                        </div>
                        <span className="font-semibold text-sm">{tFooter('about')}</span>
                    </Button>
                </Link>

                {/* Legal Item */}
                <Link href="/legal" className="w-full">
                    <Button variant="ghost" className="w-full justify-start gap-4 h-12 px-2 hover:bg-white/5 text-slate-300 hover:text-white rounded-xl transition-all group">
                        <div className="h-9 w-9 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all">
                            <ShieldAlert size={18} />
                        </div>
                        <span className="font-semibold text-sm">{tFooter('legal')}</span>
                    </Button>
                </Link>

                {/* Share Item */}
                <Button
                    variant="ghost"
                    onClick={handleShare}
                    className="w-full justify-start gap-4 h-12 px-2 hover:bg-white/5 text-slate-300 hover:text-white rounded-xl transition-all group"
                >
                    <div className="h-9 w-9 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all">
                        <Share2 size={18} />
                    </div>
                    <span className="font-semibold text-sm">{tDrawer('share') || "Uygulamayı Paylaş"}</span>
                </Button>
            </div>
        );
    }

    return (
        <div className={cn("flex flex-wrap justify-center gap-6 mt-4 mb-2", className)}>
            <Link href="/privacy" className="text-slate-600 hover:text-indigo-600 text-base font-normal">
                {tFooter('about')}
            </Link>

            <span className="text-slate-300 select-none hidden sm:inline">•</span>

            <Link href="/legal" className="text-slate-600 hover:text-indigo-600 text-base font-normal">
                {tFooter('legal')}
            </Link>
        </div>
    );
}
