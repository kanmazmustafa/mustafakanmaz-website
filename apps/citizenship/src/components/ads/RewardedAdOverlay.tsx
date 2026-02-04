"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, X, Play, Trophy, ShieldCheck, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdBanner } from "./AdBanner";
import { AD_CONFIG } from "@/config/ads";

interface RewardedAdOverlayProps {
    isVisible: boolean;
    onClose: () => void;
    onComplete: () => void;
}

export function RewardedAdOverlay({ isVisible, onClose, onComplete }: RewardedAdOverlayProps) {
    const [timeLeft, setTimeLeft] = useState(30);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (!isVisible) {
            setTimeLeft(30);
            setIsFinished(false);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsFinished(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isVisible]);

    const handleClaimReward = () => {
        onComplete();
        onClose();
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] bg-slate-950 flex flex-col items-center justify-center p-4 md:p-8"
                >
                    {/* Background Decorative Elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
                        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
                    </div>

                    <div className="w-full max-w-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative flex flex-col items-center p-8 text-center">

                        {/* Header Link/Icon */}
                        <div className="absolute top-6 left-8 flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Sponsored Video</span>
                        </div>

                        {/* Top Right Close Button (Enabled only when finished) */}
                        <button
                            onClick={onClose}
                            className={`absolute top-6 right-8 p-2 rounded-xl transition-all ${isFinished ? 'bg-white/10 text-white hover:bg-white/20' : 'text-slate-700 cursor-not-allowed'}`}
                            disabled={!isFinished}
                        >
                            <X size={20} />
                        </button>

                        {/* Ad Content Placeholder */}
                        <div className="w-full aspect-video bg-black rounded-3xl mb-8 flex flex-col items-center justify-center relative group overflow-hidden border border-white/5 ring-4 ring-black/50 shadow-inner">
                            {!isFinished ? (
                                <>
                                    <div className="relative z-10 flex flex-col items-center gap-4 w-full h-full justify-center">
                                        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                                            <div className="h-32 w-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 border-t-indigo-500 animate-spin" />
                                        </div>

                                        {/* REAL AD INTEGRATION */}
                                        <div className="w-full max-w-[336px] min-h-[280px] bg-slate-900/40 rounded-xl overflow-hidden shadow-inner border border-white/5 flex flex-col items-center justify-center">
                                            <AdBanner
                                                dataAdSlot={AD_CONFIG.SLOTS.RESULT_BANNER}
                                                dataAdFormat="rectangle"
                                                dataFullWidthResponsive={true}
                                                className="w-full"
                                            />
                                            <div className="p-2 bg-slate-950/80 w-full flex items-center justify-center gap-2 border-t border-white/5">
                                                <Info size={10} className="text-slate-500" />
                                                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Ad helps support the app</span>
                                            </div>
                                        </div>

                                        <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mt-2 animate-pulse">Loading Sponsored Content...</p>
                                    </div>

                                    {/* Simulated video progress bar */}
                                    <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full">
                                        <motion.div
                                            className="h-full bg-indigo-500"
                                            initial={{ width: "0%" }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 30, ease: "linear" }}
                                        />
                                    </div>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="flex flex-col items-center gap-4 py-8"
                                >
                                    <div className="h-20 w-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20">
                                        <ShieldCheck size={40} className="text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white uppercase tracking-tight">Video Completed!</h3>
                                    <p className="text-slate-400 text-sm">Reward is ready to be claimed.</p>
                                </motion.div>
                            )}
                        </div>

                        {/* Text and Counter */}
                        <div className="space-y-4 mb-8">
                            <h2 className="text-2xl font-black text-white uppercase tracking-tighter sm:text-3xl">
                                {isFinished ? "Premium Reward Reached" : "Watch for Reward"}
                            </h2>
                            <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                                Complete the short video to unlock **2 hours** of ad-free premium access across the entire app.
                            </p>
                        </div>

                        {/* Action Area */}
                        {!isFinished ? (
                            <div className="flex flex-col items-center gap-4">
                                <div className="h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                                    <span className="text-2xl font-black text-indigo-400 font-mono italic">{timeLeft}s</span>
                                </div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] animate-pulse">
                                    Countdown to Unlock Reward...
                                </p>
                            </div>
                        ) : (
                            <Button
                                onClick={handleClaimReward}
                                size="lg"
                                className="h-16 w-full sm:w-64 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-widest shadow-xl shadow-indigo-900/40 border-t border-white/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                <Trophy className="mr-2 h-5 w-5 fill-white/20" />
                                Claim Reward
                            </Button>
                        )}

                        <div className="mt-8">
                            <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">Einbürgerungstest APP • Secures Ad-Free Sessions</p>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
