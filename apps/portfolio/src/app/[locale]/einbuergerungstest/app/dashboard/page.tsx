import { setRequestLocale } from 'next-intl/server';
import DashboardClient from '@/apps/citizenship/components/dashboard/DashboardClient';

export default async function DashboardPage(props: { params: Promise<{ locale: string }> }) {
    const params = await props.params;
    const { locale } = params;
    setRequestLocale(locale);

    return <DashboardClient />;
}
