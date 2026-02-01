import type { Metadata } from 'next';
import AboutMasterpiece from '@/components/AboutMasterpiece';

export const metadata: Metadata = {
    title: 'About | Mustafa Kanmaz',
    description: 'The intersection of Software Architecture and Industrial Energy Strategy. Agentic workflows and scalable systems.',
};

export default function AboutPage() {
    return <AboutMasterpiece />;
}
