"use client";

import { useState } from "react";
import { useAuth } from "@/apps/citizenship/context/AuthContext";
import { useRouter } from "@/apps/citizenship/i18n/routing";
import { useTranslations } from "next-intl";
import { Button } from "@/apps/citizenship/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/apps/citizenship/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/apps/citizenship/components/ui/tabs";
import { Input } from "@/apps/citizenship/components/ui/input";
import { Loader2, ArrowLeft, Mail } from "lucide-react";
import { Link } from '@/apps/citizenship/i18n/routing';
import { mapAuthCodeToKey } from "@/apps/citizenship/lib/auth-errors";
import { GuestLoginDialog } from "@/apps/citizenship/components/auth/GuestLoginDialog";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
    const t = useTranslations('auth');
    const tCommon = useTranslations('common');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const { googleSignIn, appleSignIn, guestSignIn, signInWithEmail, signUpWithEmail, sendPasswordReset } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [resetEmail, setResetEmail] = useState("");
    const callbackUrl = searchParams.get('callbackUrl') || '/einbuergerungstest/app/dashboard';

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError("");
        try {
            await googleSignIn();
            router.push(callbackUrl);
        } catch (e: any) {
            console.error(e);
            setError(t('error_generic') || "An error occurred during sign in.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAppleSignIn = async () => {
        setIsLoading(true);
        setError("");
        try {
            await appleSignIn();
            router.push(callbackUrl);
        } catch (e: any) {
            console.error(e);
            setError(t('error_generic') || "An error occurred during sign in.");
        } finally {
            setIsLoading(false);
        }
    };


    const handleForgotPassword = async () => {
        if (!resetEmail) {
            setError(t('enter_valid_email'));
            return;
        }
        setIsLoading(true);
        setError("");
        setSuccessMessage("");
        try {
            await sendPasswordReset(resetEmail);
            setSuccessMessage(t('forgot_password_success'));
        } catch (e: any) {
            console.error(e);
            const errorKey = mapAuthCodeToKey ? mapAuthCodeToKey(e.code) : 'error_generic';
            setError(t(errorKey));
        } finally {
            setIsLoading(false);
        }
    };

    const handleEmailAuth = async (isLogin: boolean, formData: FormData) => {
        setIsLoading(true);
        setError("");
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            if (isLogin) {
                await signInWithEmail(email, password);
            } else {
                await signUpWithEmail(email, password);
            }
            router.push(callbackUrl);
        } catch (e: any) {
            console.error(e);
            // Assuming mapAuthCodeToKey exists or fallback to generic
            const errorKey = mapAuthCodeToKey ? mapAuthCodeToKey(e.code) : 'error_generic';
            setError(t(errorKey) || e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[100px]" />
            </div>

            <Link
                href="/"
                className="absolute top-8 left-8 text-slate-500 hover:text-slate-800 flex items-center gap-2 transition-colors z-10"
            >
                <ArrowLeft className="h-4 w-4" />
                {tCommon('back') || "Back"}
            </Link>

            <Card className="w-full max-w-md border-slate-200 shadow-xl bg-white/95 backdrop-blur-xl">
                <CardHeader className="text-center pb-6 pt-8">
                    <CardTitle className="text-3xl font-black text-slate-900 mb-2">{t('login_title') || "Welcome"}</CardTitle>
                    <CardDescription className="text-base text-slate-500">
                        {t('login_subtitle') || "Sign in to access your dashboard."}
                    </CardDescription>
                </CardHeader>
                <CardContent className="pb-8 px-8">
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                            <TabsTrigger value="login">{t('login_btn') || "Login"}</TabsTrigger>
                            <TabsTrigger value="register">{t('register_btn') || "Register"}</TabsTrigger>
                        </TabsList>

                        {/* Login Tab */}
                        <TabsContent value="login">
                            <form action={(fd) => handleEmailAuth(true, fd)} className="space-y-4">
                                <div className="space-y-3">
                                    <Input
                                        name="email"
                                        type="email"
                                        placeholder={t('email') || "Email"}
                                        required
                                        className="h-12"
                                        onChange={(e) => setResetEmail(e.target.value)}
                                    />
                                    <Input name="password" type="password" placeholder={t('password') || "Password"} required className="h-12" />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleForgotPassword}
                                        className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                                        disabled={isLoading}
                                    >
                                        {t('forgot_password') || "Forgot Password?"}
                                    </button>
                                </div>
                                {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
                                {successMessage && <p className="text-sm text-green-600 font-medium">{successMessage}</p>}
                                <Button className="w-full h-12 text-base font-bold bg-indigo-600 hover:bg-indigo-700 text-white" type="submit" disabled={isLoading}>
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {t('login_btn') || "Login"}
                                </Button>
                            </form>
                        </TabsContent>

                        {/* Register Tab */}
                        <TabsContent value="register">
                            <form action={(fd) => handleEmailAuth(false, fd)} className="space-y-4">
                                <div className="space-y-3">
                                    <Input name="email" type="email" placeholder={t('email') || "Email"} required className="h-12" />
                                    <Input name="password" type="password" placeholder={t('password') || "Password"} required className="h-12" />
                                </div>
                                {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
                                <Button className="w-full h-12 text-base font-bold bg-indigo-600 hover:bg-indigo-700 text-white" type="submit" disabled={isLoading}>
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {t('register_btn') || "Create Account"}
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-slate-400 font-medium">
                                {t('or_continue_with') || "Or continue with"}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Button
                            className="w-full h-12 text-base font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center gap-3 rounded-xl border-none"
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                        >
                            <svg className="h-5 w-5 bg-white rounded-full p-0.5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="#3b82f6" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                            {t('google_sign_in') || "Google"}
                        </Button>

                        <Button
                            className="w-full h-12 text-base font-bold bg-slate-900 hover:bg-black text-white flex items-center justify-center gap-3 rounded-xl border-none"
                            onClick={handleAppleSignIn}
                            disabled={isLoading}
                        >
                            <svg className="h-5 w-5" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z"></path></svg>
                            {t('apple_sign_in') || "Apple"}
                        </Button>
                    </div>

                    <div className="mt-8 text-center">
                        <GuestLoginDialog />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
