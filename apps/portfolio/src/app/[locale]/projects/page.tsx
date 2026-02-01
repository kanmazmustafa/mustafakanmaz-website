import type { Metadata } from 'next';
import ProjectsMasterpiece from '@/components/ProjectsMasterpiece';

export const metadata: Metadata = {
    title: 'Projects | Mustafa Kanmaz',
    description: 'A showcase of high-performance mobile systems, AI data platforms, and secure infrastructure.',
};

export default function ProjectsPage() {
    return <ProjectsMasterpiece />;
}
