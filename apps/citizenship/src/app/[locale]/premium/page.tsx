"use client";

import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Check, Loader2, Star, XCircle, Crown } from "lucide-react";
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from '@/i18n/routing';
import { RewardedAdButton } from '@/components/ads/RewardedAdButton';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function PremiumPage() {
    const t = useTranslations('premium');
    const tFeatures = useTranslations('premium_features');
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleCheckout = async (priceId: string) => {
        if (!user) {
            router.push('/auth');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    priceId, // "price_12345"
                    userId: user.uid,
                    successUrl: `${window.location.origin}/premium/success`,
                    cancelUrl: `${window.location.origin}/premium/cancel`,
                }),
            });

            const { sessionId, url, error } = await response.json();
            if (error) throw new Error(error);

            if (url) {
                window.location.href = url;
            } else {
                const stripe = await stripePromise;
                if (stripe) {
                    // @ts-ignore - Fallback for older types or missing session link
                    const result = await stripe.redirectToCheckout({ sessionId });
                    if (result.error) throw new Error(result.error.message);
                }
            }
        } catch (err) {
            console.error(err);
            alert("Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

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
                        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-md rounded-[2rem] p-2 hover:shadow-xl transition-shadow relative overflow-hidden group">
                            <CardHeader className="p-8 pb-4">
                                <CardTitle className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                                    <Loader2 className="h-6 w-6 text-slate-400 group-hover:rotate-180 transition-transform duration-700" />
                                    {t('temp_title')}
                                </CardTitle>
                                <CardDescription className="text-base font-medium text-slate-500">{t('temp_sub')}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-8 pt-4 space-y-6">
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
                                    <li className="flex items-center gap-3 opacity-50">
                                        <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                                            <XCircle className="h-4 w-4 text-slate-400" />
                                        </div>
                                        <span className="text-slate-400 line-through">{tFeatures('remove_ads_forever')}</span>
                                    </li>
                                </ul>
                            </CardContent>
                            <CardFooter className="p-8 pt-0">
                                <RewardedAdButton />
                            </CardFooter>
                        </Card>

                        {/* Lifetime Premium Card - Styled as HERO */}
                        <div className="relative transform hover:-translate-y-2 transition-transform duration-300">
                            {/* Glowing Backdrop */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2.5rem] blur-lg opacity-40 translate-y-4"></div>

                            <Card className="border-0 relative overflow-hidden rounded-[2.5rem] bg-slate-900 text-white shadow-2xl">
                                {/* Best Value Badge */}
                                <div className="absolute top-0 right-0">
                                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-6 py-2 text-sm font-extrabold rounded-bl-3xl shadow-lg flex items-center gap-2">
                                        <Star className="h-4 w-4 fill-white" />
                                        {t('best_value')}
                                    </div>
                                </div>

                                <CardHeader className="p-10 pb-2">
                                    <div className="mb-6 h-16 w-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-amber-400 ring-1 ring-white/20 shadow-inner">
                                        <Crown className="h-8 w-8 fill-amber-400" />
                                    </div>
                                    <CardTitle className="text-3xl font-bold tracking-tight">{t('lifetime_title')}</CardTitle>
                                    <CardDescription className="text-indigo-200 text-lg font-medium mt-2">{t('lifetime_sub')}</CardDescription>
                                </CardHeader>

                                <CardContent className="p-10 pt-6 space-y-8">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-black tracking-tight text-white">€4.99</span>
                                        <span className="text-indigo-300 font-medium text-lg">/ once</span>
                                    </div>

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
                                        <li className="flex items-center gap-3">
                                            <div className="h-6 w-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 ring-1 ring-amber-500/50">
                                                <Check className="h-4 w-4 text-amber-400" />
                                            </div>
                                            <span className="font-medium text-slate-100">{tFeatures('priority_support')}</span>
                                        </li>
                                    </ul>
                                </CardContent>

                                <CardFooter className="p-10 pt-0">
                                    <Button
                                        className="w-full h-14 text-base font-bold bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white rounded-xl shadow-lg shadow-amber-500/25 border-0 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                        onClick={() => handleCheckout('price_1Q...')} // Replace with real Price ID
                                        disabled={loading}
                                    >
                                        {loading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                                        {t('upgrade_btn')}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
