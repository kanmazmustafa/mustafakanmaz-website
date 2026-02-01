"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user-store";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function DisclaimerOverlay() {
    const t = useTranslations('disclaimer');
    const { hasAcceptedDisclaimer, setAcceptedDisclaimer } = useUserStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted || hasAcceptedDisclaimer) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="max-w-md w-full"
                >
                    <Card className="border-none shadow-2xl overflow-hidden rounded-3xl">
                        <div className="bg-amber-500 p-6 flex justify-center text-white">
                            <AlertTriangle size={48} />
                        </div>
                        <CardHeader className="text-center pt-8">
                            <CardTitle className="text-2xl font-bold text-slate-800">
                                {t('title')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="px-8 pb-4">
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 italic text-slate-600 text-center leading-relaxed">
                                "{t('content')}"
                            </div>
                            <p className="text-xs text-amber-600 mt-4 text-center font-medium">
                                <AlertTriangle size={12} className="inline mr-1 mb-0.5" />
                                {t('required')}
                            </p>
                        </CardContent>
                        <CardFooter className="px-8 pb-8">
                            <Button
                                onClick={() => setAcceptedDisclaimer(true)}
                                className="w-full h-14 text-lg rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <CheckCircle2 size={20} className="mr-2" />
                                {t('accept')}
                            </Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
