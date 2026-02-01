"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/apps/citizenship/context/AuthContext";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger
} from "@/apps/citizenship/components/ui/dialog";
import { Button } from "@/apps/citizenship/components/ui/button";
import { LogOut } from "lucide-react";

export function LogoutDialog() {
    const tAuth = useTranslations('auth');
    const tDash = useTranslations('dashboard');
    const tCommon = useTranslations('common');
    const { signOut } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut();
            setIsOpen(false);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-white/60 hover:text-white hover:bg-white/10 rounded-full"
                >
                    <LogOut className="h-5 w-5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-3xl border-none shadow-2xl">
                <DialogHeader className="items-center text-center">
                    <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                        <LogOut className="text-indigo-600" size={32} />
                    </div>
                    <DialogTitle className="text-2xl font-bold text-slate-900">
                        {tDash('logout_title')}
                    </DialogTitle>
                    <DialogDescription className="text-slate-500 pt-2 leading-relaxed">
                        {tAuth('logout_confirm')}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold flex-1 order-2 sm:order-1"
                    >
                        {tCommon('cancel')}
                    </Button>
                    <Button
                        onClick={handleLogout}
                        className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex-1 order-1 sm:order-2 h-11"
                    >
                        {tAuth('logout')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
