"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useUserStore } from "@/store/user-store";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings, LogOut, Info, ShieldAlert, FileText, Crown } from "lucide-react";

export function HeaderMenu() {
    const t = useTranslations('dashboard');
    const tFooter = useTranslations('footer');
    const tDisclaimer = useTranslations('disclaimer');
    const { user, signOut } = useAuth();
    const { isPremium } = useUserStore();

    // State for dialogs to ensure they work within dropdown
    const [activeDialog, setActiveDialog] = useState<string | null>(null);

    return (
        <Dialog open={!!activeDialog} onOpenChange={(open) => !open && setActiveDialog(null)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-white/60 hover:text-white hover:bg-white/10 rounded-full"
                    >
                        <Settings className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-xl border-slate-100 bg-white/95 backdrop-blur-md">
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none text-slate-800">
                                {user?.email?.split('@')[0]}
                            </p>
                            <p className="text-xs leading-none text-slate-500">
                                {user?.email}
                            </p>
                            {isPremium && (
                                <div className="flex items-center gap-1 mt-1 text-amber-500 text-[10px] font-bold uppercase tracking-wider">
                                    <Crown size={10} className="fill-current" />
                                    Premium
                                </div>
                            )}
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem onSelect={() => setActiveDialog('about')} className="cursor-pointer">
                        <Info className="mr-2 h-4 w-4 text-indigo-500" />
                        <span>{tFooter('about')}</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem onSelect={() => setActiveDialog('legal')} className="cursor-pointer">
                        <ShieldAlert className="mr-2 h-4 w-4 text-amber-500" />
                        <span>{tFooter('legal')}</span>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem
                        className="text-red-600 focus:text-red-600 focus:bg-red-50 cursor-pointer"
                        onSelect={signOut}
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>{t('logout')}</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Dialog Content based on Active State */}
            <DialogContent className="sm:max-w-[500px] rounded-3xl border-none shadow-2xl">
                {activeDialog === 'about' && (
                    <>
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
                    </>
                )}

                {activeDialog === 'legal' && (
                    <>
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
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
