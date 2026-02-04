"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, UserX } from "lucide-react";

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
                setError(t('error_requires_recent_login'));
            } else {
                setError(t('error_generic'));
            }
            setIsDeleting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-4 h-12 px-2 hover:bg-red-500/10 text-slate-300 hover:text-red-400 rounded-xl transition-all group">
                    <div className="h-9 w-9 bg-red-500/10 rounded-xl flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                        <Trash2 size={18} />
                    </div>
                    <span className="font-semibold text-sm">{t('delete_account')}</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-3xl border-none shadow-2xl bg-slate-900 text-white">
                <DialogHeader className="items-center text-center">
                    <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center mb-4">
                        <UserX className="text-red-500" size={24} />
                    </div>
                    <DialogTitle className="text-xl font-bold text-white uppercase tracking-tight">
                        {t('delete_confirm_title')}
                    </DialogTitle>
                    <DialogDescription className="text-slate-400 text-sm mt-2">
                        {t('delete_confirm_body')}
                    </DialogDescription>
                </DialogHeader>

                {error && (
                    <div className="bg-red-500/10 text-red-400 p-3 rounded-xl text-sm border border-red-500/20 mt-2">
                        {error}
                    </div>
                )}

                <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-4 my-2">
                    <p className="text-xs text-red-400/80 leading-relaxed text-center font-medium">
                        Bu işlem geri alınamaz. Hesabınıza bağlı tüm çalışma verileri ve premium status kalıcı olarak silinecektir.
                    </p>
                </div>

                <DialogFooter className="flex gap-3 mt-4">
                    <Button
                        variant="ghost"
                        className="flex-1 h-12 rounded-xl border border-white/5 hover:bg-white/5 text-slate-400"
                        onClick={() => setIsOpen(false)}
                        disabled={isDeleting}
                    >
                        {tCommon('cancel')}
                    </Button>
                    <Button
                        variant="destructive"
                        className="flex-1 h-12 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold shadow-lg shadow-red-900/30"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : t('delete_btn')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
