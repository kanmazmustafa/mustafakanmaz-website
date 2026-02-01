"use client";

import { useTranslations } from 'next-intl';
import { Button } from "@/apps/citizenship/components/ui/button"; // Adjust path if needed
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/apps/citizenship/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useRouter } from "@/apps/citizenship/i18n/routing";
import { useEffect } from 'react';
import { useUserStore } from "@/apps/citizenship/store/user-store";

export default function SuccessPage() {
    const t = useTranslations('premium');
    const router = useRouter();
    const { setPremium } = useUserStore(); // Assume this action exists or similar

    useEffect(() => {
        // Mock successful activation since we don't have webhooks yet
        setPremium(true);
    }, [setPremium]);

    return (
        <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full text-center border-green-200 shadow-xl">
                <CardHeader>
                    <div className="mx-auto mb-4 h-16 w-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                        <CheckCircle className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl text-green-800">{t('restore_success') || "Payment Successful!"}</CardTitle>
                    <CardDescription>
                        Thank you for your purchase. Your premium features are now active.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button
                        className="w-full bg-green-600 hover:bg-green-700"
                        onClick={() => router.push('/einbuergerungstest/app')}
                    >
                        {t('member') || "Go to Dashboard"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
