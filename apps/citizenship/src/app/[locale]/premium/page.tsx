"use client";

import { useTranslations } from 'next-intl';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Check, Star, Crown, Smartphone, ArrowRight } from "lucide-react";
import { RewardedAdButton } from '@/components/ads/RewardedAdButton';

export default function PremiumPage() {
    const t = useTranslations('premium');
    const tFeatures = useTranslations('premium_features');

    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden">
            {/* Background Decorative Mesh */}
            <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

            <div className="relative py-20 px-4 flex flex-col items-center justify-center">
                <div className="max-w-5xl w-full">
                    <div className="text-center mb-16 space-y-4">
                        <div className="inline-block p-4 rounded-2xl bg-indigo-50 mb-4">
                            <Star className="w-8 h-8 text-indigo-600 fill-indigo-600" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 tracking-tight">
                            {t('selection_title')}
                        </h1>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">
                            {t('unlock_potential')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start max-w-4xl mx-auto">

                        {/* Free / Watch Ad Card */}
                        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-md rounded-[2rem] p-4 hover:shadow-xl transition-shadow relative overflow-hidden h-full flex flex-col">
                            <CardHeader className="p-8 pb-4">
                                <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                                    {t('temp_title')}
                                </CardTitle>
                                <CardDescription className="text-base font-medium text-slate-500">{t('temp_sub')}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 pt-4 space-y-6 flex-grow">
                                <ul className="space-y-4">
                                    <li className="flex items-center gap-3">
                                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                            <Check className="h-4 w-4 text-green-600" />
                                        </div>
                                        <span className="text-slate-600 font-medium">{tFeatures('ad_free_2h')}</span>
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                            <Check className="h-4 w-4 text-green-600" />
                                        </div>
                                        <span className="text-slate-600 font-medium">{tFeatures('all_questions')}</span>
                                    </li>
                                </ul>
                            </CardContent>
                            <div className="p-8 pt-0 mt-auto">
                                <RewardedAdButton />
                            </div>
                        </Card>

                        {/* Lifetime Premium Info Card */}
                        <div className="relative h-full">
                            {/* Glowing Backdrop */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2.5rem] blur-lg opacity-40 translate-y-4"></div>

                            <Card className="border-0 relative overflow-hidden rounded-[2.5rem] bg-slate-900 text-white shadow-2xl h-full flex flex-col">
                                <CardHeader className="p-10 pb-2">
                                    <div className="mb-6 h-16 w-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-amber-400 ring-1 ring-white/20 shadow-inner">
                                        <Crown className="h-8 w-8 fill-amber-400" />
                                    </div>
                                    <CardTitle className="text-3xl font-bold tracking-tight">{t('lifetime_title')}</CardTitle>
                                    <CardDescription className="text-indigo-200 text-lg font-medium mt-2">
                                        Available on Mobile
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="p-10 pt-6 space-y-8 flex-grow">
                                    <p className="text-slate-300 leading-relaxed font-medium">
                                        Purchase Premium once on our iOS or Android app, and use it everywhere. Login to sync your status.
                                    </p>

                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-3">
                                            <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 ring-1 ring-amber-500/50">
                                                <Check className="h-4 w-4 text-amber-400" />
                                            </div>
                                            <span className="font-medium text-slate-100">{tFeatures('remove_ads_forever')}</span>
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 ring-1 ring-amber-500/50">
                                                <Check className="h-4 w-4 text-amber-400" />
                                            </div>
                                            <span className="font-medium text-slate-100">{tFeatures('unlimited_sims')}</span>
                                        </li>
                                    </ul>
                                </CardContent>

                                <div className="p-10 pt-0 mt-auto">
                                    <div className="bg-white/10 rounded-xl p-4 flex items-center gap-4 backdrop-blur-md border border-white/5">
                                        <Smartphone className="h-8 w-8 text-indigo-300" />
                                        <div className="text-sm text-indigo-100">
                                            <strong className="block text-white mb-0.5">Already purchased?</strong>
                                            Just login to activate.
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
