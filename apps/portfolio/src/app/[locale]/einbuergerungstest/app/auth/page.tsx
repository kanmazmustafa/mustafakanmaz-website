import { setRequestLocale } from 'next-intl/server';
import LoginPage from '@/apps/citizenship/components/auth/LoginPage';

export default async function AuthPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;
    setRequestLocale(locale);

    return <LoginPage />;
}
