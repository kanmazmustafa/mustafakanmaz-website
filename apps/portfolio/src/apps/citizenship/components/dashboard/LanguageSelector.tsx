"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/apps/citizenship/i18n/routing';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/apps/citizenship/components/ui/select";
import { useTransition } from 'react';

const LANGUAGES = [
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "bg", name: "Български", flag: "🇧🇬" },
    { code: "bs", name: "Bosanski", flag: "🇧🇦" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "el", name: "Ελληνικά", flag: "🇬🇷" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fa", name: "فارسی", flag: "🇮🇷" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "he", name: "עברית", flag: "🇮🇱" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
    { code: "hr", name: "Hrvatski", flag: "🇭🇷" },
    { code: "hu", name: "Magyar", flag: "🇭🇺" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ku", name: "Kurdî", flag: "☀️" },
    { code: "nl", name: "Nederlands", flag: "🇳🇱" },
    { code: "pl", name: "Polski", flag: "🇵🇱" },
    { code: "ps", name: "پښتو", flag: "🇦🇫" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "ro", name: "Română", flag: "🇷🇴" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "sq", name: "Shqip", flag: "🇦🇱" },
    { code: "sr", name: "Српски", flag: "🇷🇸" },
    { code: "th", name: "ไทย", flag: "🇹🇭" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    { code: "uk", name: "Українська", flag: "🇺🇦" },
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "zh", name: "中文", flag: "🇨🇳" }
];

export function LanguageSelector() {
    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale();
    const [isPending, startTransition] = useTransition();

    const handleCreateRequest = (nextLocale: string) => {
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    };

    return (
        <Select value={locale} onValueChange={handleCreateRequest} disabled={isPending}>
            <SelectTrigger className="w-[140px] bg-white text-slate-900 border-white/20 hover:bg-white/90 z-50 relative">
                <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] z-[100] bg-white border border-slate-200 shadow-xl rounded-xl">
                {LANGUAGES.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code} className="text-slate-900 focus:bg-slate-100 focus:text-slate-900 cursor-pointer">
                        <span className="mr-2">{lang.flag}</span>
                        {lang.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
