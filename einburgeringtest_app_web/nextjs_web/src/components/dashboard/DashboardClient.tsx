"use client";

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, Timer, AlertTriangle, BookOpen, Crown, Star, MapPin } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useUserStore } from '@/store/user-store';
import { GermanyMap } from '@/components/dashboard/GermanyMap';
import { LanguageSelector } from '@/components/dashboard/LanguageSelector';
import { useEffect } from 'react';
import { cn } from "@/lib/utils";
import { AdBanner } from '@/components/ads/AdBanner';
import { SideAd } from '@/components/ads/SideAd';
import { RewardedAdButton } from '@/components/ads/RewardedAdButton';
import { DeleteAccountDialog } from '@/components/auth/DeleteAccountDialog';
import { AD_CONFIG } from '@/config/ads';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const ALL_STATES = [
    "Baden-Württemberg", "Bayern", "Berlin", "Brandenburg", "Bremen",
    "Hamburg", "Hessen", "Mecklenburg-Vorpommern", "Niedersachsen",
    "Nordrhein-Westfalen", "Rheinland-Pfalz", "Saarland", "Sachsen",
    "Sachsen-Anhalt", "Schleswig-Holstein", "Thüringen"
];

export default function DashboardClient() {
    const t = useTranslations('dashboard');
    const tHome = useTranslations('home');
    const { user, loading, signOut } = useAuth();
    const router = useRouter();
    const { selectedState, setSelectedState, progress, isPremium, bookmarks, dailyStreak, checkDailyStreak } = useUserStore();

    useEffect(() => {
        if (!loading && !user) router.push('/auth');
        // Check for daily streak on mount
        checkDailyStreak();
    }, [user, loading, router, checkDailyStreak]);

    if (loading || !user) return <div className="flex h-screen items-center justify-center">{t('loading') || "Loading..."}</div>;

    const categories = [
        { id: 'democracy', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-50' },
        { id: 'history', icon: BookOpen, color: 'text-amber-700', bg: 'bg-amber-50' },
        { id: 'society', icon: BookOpen, color: 'text-orange-500', bg: 'bg-orange-50' },
        { id: 'state_questions', icon: BookOpen, color: 'text-teal-600', bg: 'bg-teal-50', isState: true },
    ];

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Premium Header Section */}
            <div className="relative overflow-hidden bg-slate-900 rounded-b-[3rem] shadow-2xl mb-12">
                {/* Mesh Gradient Background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-500 via-slate-900 to-slate-900 opacity-80" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent" />

                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-8 opacity-5 mix-blend-overlay">
                    <Crown size={200} />
                </div>

                <div className="relative max-w-5xl mx-auto px-6 pt-12 pb-28">
                    {/* Top Bar */}
                    <div className="flex justify-between items-center mb-12">
                        {/* Left: User Welcome */}
                        <div className="flex flex-col">
                            <div className="text-blue-200/80 mb-1 flex items-center gap-2 font-medium tracking-wide text-xs uppercase">
                                {t('welcome', { name: user.email?.split('@')[0] || 'User' })}
                                {isPremium && <Crown className="h-3 w-3 text-amber-400 fill-amber-300 drop-shadow-md" />}
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-sm leading-tight">
                                {tHome('app_title')}
                            </h1>
                        </div>

                        {/* Right: Actions */}
                        <div className="flex gap-3 items-center">
                            {/* Daily Streak Badge */}
                            <div className="hidden sm:flex items-center gap-1.5 bg-orange-500/10 border border-orange-500/20 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg shadow-orange-900/20">
                                <div className="text-orange-500 animate-pulse">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-flame"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.243-2.151.7-3.1 1.8 1.8 2.8 2.7 2.8 3.6Z" /></svg>
                                </div>
                                <span className="text-orange-100 font-bold text-sm tracking-wide">{dailyStreak || 0}</span>
                            </div>

                            <LanguageSelector />

                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-white/60 hover:text-white hover:bg-white/10 rounded-full"
                                onClick={signOut}
                            >
                                <LogOut className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats / Hero Card - Floating Glass Effect (Moved OUTSIDE to avoid clipping) */}
            <div className="relative -mt-24 max-w-5xl mx-auto px-6 z-20">
                <div className="bg-white/95 backdrop-blur-xl border border-white/20 text-slate-900 rounded-3xl p-6 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)] flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden group">

                    {/* Subtle Pro Pattern on Hero Card */}
                    <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

                    <div className="flex items-center gap-8 relative z-10 w-full md:w-auto">
                        {/* Circular Progress */}
                        <div className="relative h-28 w-28 flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                            <svg className="h-full w-full -rotate-90 drop-shadow-lg">
                                <circle cx="56" cy="56" r="46" className="stroke-slate-100" strokeWidth="10" fill="none" />
                                <circle
                                    cx="56" cy="56" r="46"
                                    className="stroke-indigo-600 transition-all duration-1000 ease-out"
                                    strokeWidth="10"
                                    fill="none"
                                    strokeDasharray={289}
                                    strokeDashoffset={289 - (289 * progress)}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="font-extrabold text-3xl text-slate-800 tracking-tighter">{Math.round(progress * 100)}%</span>
                                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Done</span>
                            </div>
                        </div>

                        {/* Text Info */}
                        <div className="flex flex-col gap-1">
                            <h3 className="font-bold text-2xl text-slate-800 tracking-tight">{t('stats')}</h3>
                            <p className="text-slate-500 text-sm font-medium">{tHome('overall_success')}</p>

                            {/* Mobile Streak Display (visible only on small screens) */}
                            <div className="flex sm:hidden items-center gap-1.5 mt-2 bg-orange-50 w-fit px-2 py-1 rounded-md border border-orange-100">
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-orange-500"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.243-2.151.7-3.1 1.8 1.8 2.8 2.7 2.8 3.6Z" /></svg>
                                <span className="text-orange-800 font-bold text-xs">{dailyStreak || 0} Day Streak</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions Right Side */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full md:w-auto mt-4 md:mt-0">
                        {/* Only show upgrade button if NOT premium */}
                        {!isPremium && (
                            <Button
                                onClick={() => router.push('/premium')}
                                className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 font-extrabold rounded-xl px-6 py-6 shadow-[0_10px_20px_-5px_rgba(251,191,36,0.4)] hover:shadow-lg transition-all border border-amber-300/50"
                            >
                                <Crown className="h-5 w-5 mr-2" />
                                <div className="text-left leading-tight">
                                    <div className="text-xs opacity-80 font-bold uppercase tracking-wider">{t('upgrade_caps') || "UPGRADE"}</div>
                                    <div className="text-sm">{t('remove_ads') || "Remove Ads"}</div>
                                </div>
                            </Button>
                        )}

                        {/* Rewarded / Free Hint */}
                        <div className="flex-shrink-0">
                            <RewardedAdButton />
                        </div>
                    </div>

                </div>
            </div>

            {/* Spacer (Adjusted for margin) */}
            <div className="mb-12"></div>

            <div className="max-w-[1400px] mx-auto flex justify-center items-start">
                <SideAd side="left" />

                <main className="max-w-5xl mx-auto px-6 space-y-8 flex-shrink">

                    {/* Main Actions Grid */}
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            {tHome('main_modes')}
                            <div className="h-1 w-12 bg-indigo-500 rounded-full ml-4 opacity-20"></div>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Exam Simulation - Premium Indigo Gradient */}
                            <div
                                onClick={() => router.push('/quiz?mode=exam')}
                                className="group relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-600 to-blue-700 rounded-[2rem] p-8 text-white cursor-pointer shadow-[0_10px_30px_-10px_rgba(79,70,229,0.4)] hover:shadow-[0_20px_40px_-5px_rgba(79,70,229,0.5)] transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="absolute right-[-20px] top-[-20px] opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-500">
                                    <Timer size={140} />
                                </div>
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 ring-1 ring-white/20 group-hover:bg-white/20 transition-all">
                                        <Timer className="h-7 w-7 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 tracking-tight">{tHome('quiz_simulation')}</h3>
                                    <p className="text-indigo-100/80 text-sm leading-relaxed font-medium">{tHome('quiz_simulation_sub')}</p>
                                </div>
                            </div>

                            {/* My Mistakes - Premium Coral/Red Gradient */}
                            <div
                                onClick={() => router.push('/quiz?mode=mistakes')}
                                className="group relative overflow-hidden bg-gradient-to-br from-rose-500 via-rose-500 to-red-600 rounded-[2rem] p-8 text-white cursor-pointer shadow-[0_10px_30px_-10px_rgba(244,63,94,0.4)] hover:shadow-[0_20px_40px_-5px_rgba(244,63,94,0.5)] transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="absolute right-[-20px] top-[-20px] opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-500">
                                    <AlertTriangle size={140} />
                                </div>
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 ring-1 ring-white/20 group-hover:bg-white/20 transition-all">
                                        <AlertTriangle className="h-7 w-7 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 tracking-tight">{tHome('my_errors')}</h3>
                                    <p className="text-rose-100/80 text-sm leading-relaxed font-medium">{tHome('my_errors_sub')}</p>
                                </div>
                            </div>

                            {/* My Bookmarks - Premium Amber/Gold Gradient */}
                            <div
                                onClick={() => router.push('/quiz?mode=bookmarks')}
                                className="group relative overflow-hidden bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 rounded-[2rem] p-8 text-white cursor-pointer shadow-[0_10px_30px_-10px_rgba(245,158,11,0.4)] hover:shadow-[0_20px_40px_-5px_rgba(245,158,11,0.5)] transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="absolute right-[-20px] top-[-20px] opacity-[0.15] group-hover:opacity-[0.25] transition-opacity duration-500">
                                    <Star size={140} />
                                </div>
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 ring-1 ring-white/20 group-hover:bg-white/20 transition-all">
                                        <Star className="h-7 w-7 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 tracking-tight">{tHome('my_bookmarks') || "Bookmarks"}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="bg-white/20 px-2 py-0.5 rounded-md text-xs font-bold text-white shadow-sm">
                                            {bookmarks.length}
                                        </span>
                                        <p className="text-amber-100 text-sm font-medium">
                                            {tHome('my_bookmarks_sub') || "Saved Questions"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Ad Banner */}
                    {!isPremium && AD_CONFIG.ENABLED.BANNER && (
                        <div className="py-4">
                            <AdBanner
                                dataAdSlot={AD_CONFIG.SLOTS.DASHBOARD_BANNER}
                                dataAdFormat="auto"
                                dataFullWidthResponsive={true}
                                className="w-full rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white"
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Categories Section */}
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                {tHome('categories_label')}
                                <div className="h-1 w-12 bg-indigo-500 rounded-full ml-4 opacity-20"></div>
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {categories.map((cat) => (
                                    <div
                                        key={cat.id}
                                        onClick={() => router.push(`/quiz?mode=practice&category=${cat.id}&state=${cat.isState ? selectedState : ''}`)}
                                        className="group bg-white p-5 rounded-[1.5rem] border border-slate-100 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_30px_-5px_rgba(0,0,0,0.08)] transition-all cursor-pointer flex items-center gap-5 hover:border-indigo-100 hover:bg-slate-50/50"
                                    >
                                        <div className={cn("p-4 rounded-2xl transition-transform duration-300 group-hover:scale-110 shadow-sm", cat.bg)}>
                                            <cat.icon className={cn("h-7 w-7", cat.color)} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-slate-800 group-hover:text-indigo-700 transition-colors">
                                                {cat.isState ? selectedState : tHome(`categories.${cat.id}`)}
                                            </h4>
                                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mt-1">
                                                {tHome('practice')}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Map Section */}
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                                {t('exam_mode')} State
                                <div className="h-1 w-12 bg-indigo-500 rounded-full ml-4 opacity-20"></div>
                            </h2>
                            <Card className="p-6 bg-white border-0 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)] rounded-[2rem] overflow-hidden relative">
                                {/* Decorative blur */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -z-10 opacity-60"></div>

                                <div className="text-center mb-6">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t('selected_state')}</p>
                                    <h3 className="text-2xl font-extrabold text-indigo-700">{selectedState}</h3>
                                </div>

                                <div className="mb-6">
                                    <Select value={selectedState || undefined} onValueChange={setSelectedState}>
                                        <SelectTrigger className="w-full h-12 rounded-xl border-slate-200 bg-slate-50 hover:bg-white hover:border-indigo-300 transition-all font-medium">
                                            <SelectValue placeholder={t('select_state_placeholder')} />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                                            {ALL_STATES.map((state) => (
                                                <SelectItem key={state} value={state} className="rounded-lg py-3 my-1 cursor-pointer focus:bg-indigo-50 focus:text-indigo-700">
                                                    {state}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="relative">
                                    <GermanyMap />
                                </div>

                                <p className="text-xs text-center text-slate-400 mt-6 font-medium flex items-center justify-center gap-2">
                                    <MapPin size={12} />
                                    {t('map_hint')}
                                </p>
                            </Card>
                        </div>
                    </div>
                </main>
                <SideAd side="right" />
            </div>

            {/* Account Settings / Privacy Section */}
            <div className="max-w-5xl mx-auto px-6 mt-12 pt-8 border-t border-slate-200">
                <div className="flex flex-col items-center gap-4 text-center">
                    <p className="text-sm text-slate-400 max-w-md">
                        {tHome('privacy_notice', { name: tHome('app_title') })}
                    </p>
                    <DeleteAccountDialog />
                </div>
            </div>
        </div>
    );
}
