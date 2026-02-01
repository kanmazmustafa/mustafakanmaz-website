import { setRequestLocale } from 'next-intl/server';
import QuizRunner from '@/apps/citizenship/components/quiz/QuizRunner';

export default async function QuizPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;
    setRequestLocale(locale);

    return <QuizRunner />;
}
