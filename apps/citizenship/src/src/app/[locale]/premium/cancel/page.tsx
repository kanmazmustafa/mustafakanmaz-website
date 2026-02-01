"use client";

import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { XCircle } from "lucide-react";
import { useRouter } from '@/i18n/routing';

export default function CancelPage() {
    const t = useTranslations('common');
    const router = useRouter();

    return (
        <div className="min-h-screen bg-red-50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full text-center border-red-200 shadow-xl">
                <CardHeader>
                    <div className="mx-auto mb-4 h-16 w-16 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                        <XCircle className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl text-red-800">Payment Cancelled</CardTitle>
                    <CardDescription>
                        You have cancelled payment process. No charges were made.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => router.push('/premium')}
                    >
                        Try Again
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
