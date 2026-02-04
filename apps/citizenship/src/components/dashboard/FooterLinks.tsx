"use client";

import { useTranslations } from "next-intl";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Info, ShieldAlert, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface FooterLinksProps {
    variant?: "footer" | "menu";
    className?: string;
}

export function FooterLinks({ variant = "footer", className }: FooterLinksProps) {
    const tFooter = useTranslations('footer');
    const tDisclaimer = useTranslations('disclaimer');
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
                {/* About Item */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start gap-4 h-12 px-2 hover:bg-white/5 text-slate-300 hover:text-white rounded-xl transition-all group">
                            <div className="h-9 w-9 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                <Info size={18} />
                            </div>
                            <span className="font-semibold text-sm">{tFooter('about')}</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] rounded-3xl border-none shadow-2xl bg-slate-900 text-white">
                        <DialogHeader className="items-center text-center">
                            <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-4">
                                <Info className="text-indigo-400" size={24} />
                            </div>
                            <DialogTitle className="text-xl font-bold text-white">
                                {tFooter('about_title')}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="text-slate-300 text-sm leading-relaxed text-center whitespace-pre-wrap">
                            {tFooter('about_content')}
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Legal Item */}
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start gap-4 h-12 px-2 hover:bg-white/5 text-slate-300 hover:text-white rounded-xl transition-all group">
                            <div className="h-9 w-9 bg-amber-500/10 rounded-xl flex items-center justify-center text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all">
                                <ShieldAlert size={18} />
                            </div>
                            <span className="font-semibold text-sm">{tFooter('legal')}</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px] rounded-3xl border-none shadow-2xl bg-slate-900 text-white">
                        <DialogHeader className="items-center text-center">
                            <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center mb-4">
                                <ShieldAlert className="text-amber-500" size={24} />
                            </div>
                            <DialogTitle className="text-xl font-bold text-white">
                                {tDisclaimer('title')}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap bg-white/5 p-4 rounded-2xl border border-white/5 max-h-[300px] overflow-y-auto custom-scrollbar">
                            {tDisclaimer('content')}
                        </div>
                    </DialogContent>
                </Dialog>

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
            {/* About Dialog (Default Footer Style) */}
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="link" className="text-slate-600 hover:text-indigo-600 text-base font-normal">
                        {tFooter('about')}
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] rounded-3xl border-none shadow-2xl">
                    <DialogHeader className="items-center text-center">
                        <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                            <Info className="text-indigo-600" size={24} />
                        </div>
                        <DialogTitle className="text-xl font-bold text-slate-800">
                            {tFooter('about_title')}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="text-slate-600 text-sm leading-relaxed text-center whitespace-pre-wrap">
                        {tFooter('about_content')}
                    </div>
                </DialogContent>
            </Dialog>

            <span className="text-slate-300 select-none hidden sm:inline">•</span>

            {/* Legal Disclaimer Dialog (Default Footer Style) */}
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="link" className="text-slate-600 hover:text-indigo-600 text-base font-normal">
                        {tFooter('legal')}
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] rounded-3xl border-none shadow-2xl">
                    <DialogHeader className="items-center text-center">
                        <div className="w-12 h-12 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                            <ShieldAlert className="text-amber-500" size={24} />
                        </div>
                        <DialogTitle className="text-xl font-bold text-slate-800">
                            {tDisclaimer('title')}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap bg-slate-50 p-4 rounded-xl border border-slate-100 max-h-[300px] overflow-y-auto">
                        {tDisclaimer('content')}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
