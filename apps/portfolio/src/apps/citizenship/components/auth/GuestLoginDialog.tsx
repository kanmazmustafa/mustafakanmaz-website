"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/apps/citizenship/context/AuthContext";
import { useRouter } from "@/apps/citizenship/i18n/routing";
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
import { UserCircle, Loader2 } from "lucide-react";

export function GuestLoginDialog() {
    const t = useTranslations('auth');
    const tCommon = useTranslations('common');
    const { guestSignIn } = useAuth();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleGuestLogin = async () => {
        setIsLoading(true);
        try {
            await guestSignIn();
            router.push('/einbuergerungstest/app/dashboard');
        } catch (error) {
            console.error("Guest login error:", error);
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="w-full h-12 rounded-xl font-bold text-slate-700 hover:bg-slate-50"
                    disabled={isLoading}
                >
                    <UserCircle className="mr-2 h-5 w-5" />
                    {t('guest_login')}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-3xl border-none shadow-2xl">
                <DialogHeader className="items-center text-center">
                    <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4">
                        <UserCircle className="text-amber-600" size={32} />
                    </div>
                    <DialogTitle className="text-2xl font-bold text-slate-900">
                        {t('guest_warning_title')}
                    </DialogTitle>
                    <DialogDescription className="text-slate-500 pt-2 leading-relaxed">
                        {t('guest_warning_body')}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold flex-1 order-2 sm:order-1"
                        disabled={isLoading}
                    >
                        {tCommon('cancel')}
                    </Button>
                    <Button
                        onClick={handleGuestLogin}
                        className="rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold flex-1 order-1 sm:order-2 h-11"
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="animate-spin" /> : t('guest_login')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
