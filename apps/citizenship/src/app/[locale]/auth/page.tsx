"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInAnonymously } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { FooterLinks } from "@/components/dashboard/FooterLinks";

export default function AuthPage() {
    const t = useTranslations('auth');
    const tHome = useTranslations('home');
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        setError("");
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            // Save user to Firestore if new
            const userRef = doc(db, "users", result.user.uid);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                await setDoc(userRef, {
                    email: result.user.email,
                    createdAt: new Date(),
                    platform: 'web'
                });
            }

            router.push('/');
        } catch (e: any) {
            console.error(e);
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleGuestSignIn = async () => {
        setIsLoading(true);
        setError("");
        try {
            await signInAnonymously(auth);
            // No need to save to "users" collection necessarily, or we can save with a flag.
            // But let's keep it simple as dashboard handles "user" object existence.
            router.push('/');
        } catch (e: any) {
            console.error(e);
            setError(e.message);
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
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                const result = await createUserWithEmailAndPassword(auth, email, password);
                // Save new user
                await setDoc(doc(db, "users", result.user.uid), {
                    email: email,
                    createdAt: new Date(),
                    platform: 'web'
                });
            }
            router.push('/');
        } catch (e: any) {
            console.error(e);
            // Simple error mapping (in a real app, use t(error.code))
            setError(e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">{t('login_title')}</CardTitle>
                    <CardDescription>{t('welcome_back')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="login" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-4">
                            <TabsTrigger value="login">{t('login_btn')}</TabsTrigger>
                            <TabsTrigger value="register">{t('register_btn')}</TabsTrigger>
                        </TabsList>

                        {/* Login Tab */}
                        <TabsContent value="login">
                            <form action={(fd) => handleEmailAuth(true, fd)} className="space-y-4">
                                <div className="space-y-2">
                                    <Input name="email" type="email" placeholder={t('email')} required />
                                    <Input name="password" type="password" placeholder={t('password')} required />
                                </div>
                                {error && <p className="text-sm text-red-500">{error}</p>}
                                <Button className="w-full" type="submit" disabled={isLoading}>
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {t('login_btn')}
                                </Button>
                            </form>
                        </TabsContent>

                        {/* Register Tab */}
                        <TabsContent value="register">
                            <form action={(fd) => handleEmailAuth(false, fd)} className="space-y-4">
                                <div className="space-y-2">
                                    <Input name="email" type="email" placeholder={t('email')} required />
                                    <Input name="password" type="password" placeholder={t('password')} required />
                                </div>
                                {error && <p className="text-sm text-red-500">{error}</p>}
                                <Button className="w-full" type="submit" disabled={isLoading}>
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {t('register_btn')}
                                </Button>
                            </form>
                        </TabsContent>
                    </Tabs>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                {t('no_account')} {/* Or similar "Or continue with" */}
                            </span>
                        </div>
                    </div>

                    <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading}>
                        {/* SVG Logo for Google */}
                        <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                        {t('google_sign_in')}
                    </Button>

                    <div className="mt-4">
                        <Button variant="ghost" className="w-full text-slate-500 hover:text-slate-800" onClick={handleGuestSignIn} disabled={isLoading}>
                            {t('guest_login') || "Giriş Yapmadan Devam Et"}
                        </Button>
                    </div>

                </CardContent>
            </Card>

            <div className="fixed bottom-8 w-full max-w-md px-4 pointer-events-none">
                <div className="pointer-events-auto">
                    <FooterLinks />
                </div>
            </div>
        </div>
    );
}
