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
import { AlertTriangle, Trash2, Loader2 } from "lucide-react";

export function DeleteAccountDialog() {
    const t = useTranslations('auth');
    const tCommon = useTranslations('common');
    const { deleteAccount } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        setIsDeleting(true);
        setError(null);
        try {
            await deleteAccount();
            // Auth change will trigger redirect automatically via Dashboard's useEffect
        } catch (err: any) {
            console.error("Deletion error:", err);
            if (err.code === 'auth/requires-recent-login') {
                setError(t('error_requires_recent_login') + " " + tCommon('re_auth_help'));
            } else {
                setError(t('error_generic'));
            }
            setIsDeleting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors gap-2 text-xs"
                >
                    <Trash2 size={14} />
                    {t('delete_account')}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-3xl border-none shadow-2xl">
                <DialogHeader className="items-center text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <AlertTriangle className="text-red-600" size={32} />
                    </div>
                    <DialogTitle className="text-2xl font-bold text-slate-900">
                        {t('delete_confirm_title')}
                    </DialogTitle>
                    <DialogDescription className="text-slate-500 pt-2 leading-relaxed">
                        {t('delete_confirm_body')}
                    </DialogDescription>
                </DialogHeader>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm border border-red-100 mt-2">
                        {error}
                    </div>
                )}

                <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        className="rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold flex-1 order-2 sm:order-1"
                        disabled={isDeleting}
                    >
                        {tCommon('cancel')}
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        className="rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold flex-1 order-1 sm:order-2 h-11"
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Trash2 className="mr-2 h-4 w-4" />
                        )}
                        {t('delete_btn')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
