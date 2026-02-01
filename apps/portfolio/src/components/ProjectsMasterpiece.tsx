'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useTheme } from './ThemeProvider';

export default function ProjectsMasterpiece() {
    const { theme } = useTheme();
    const projects = [
        {
            title: "Einbürgerungstest",
            category: "German Citizenship",
            description: "The most comprehensive preparation guide for the German naturalization test. Now available as a seamless web experience.",
            link: "/einbuergerungstest",
            gradient: "from-amber-500/20 to-orange-600/20",
            accentColor: "amber-500",
            stats: [
                { label: "Questions", value: "300+" },
                { label: "States", value: "16" }
            ],
            links: [
                { label: "Android", url: "https://play.google.com/store/apps/details?id=com.kanmazmustafa.einbuergerungstest", type: "android", active: true },
                { label: "iOS", url: "/coming-soon", type: "ios" },
                { label: "Web App", url: "/einbuergerungstest", type: "web", active: true }
            ]
        },
        {
            title: "Ham Radio Exam",
            category: "Featured Application",
            description: "Master your amateur radio license exam with our comprehensive study tool. Supporting multiple countries and regulations.",
            link: "/ham-radio-exam-prep",
            gradient: "from-indigo-500/20 to-purple-600/20",
            accentColor: "indigo-500",
            stats: [
                { label: "Languages", value: "29+" },
                { label: "Coverage", value: "Global" }
            ],
            links: [
                { label: "Android", url: "https://play.google.com/store/apps/details?id=com.kanmazmustafa.ushamradio", type: "android", active: true },
                { label: "iOS", url: "/coming-soon", type: "ios" },
                { label: "Web App", url: "/ham-radio-exam-prep", type: "web", active: true }
            ]
        },
        {
            title: "CCSE 2026",
            category: "Spanish Nationality",
            description: "Comprehensive preparation guide for the Spanish knowledge and constitutional test (CCSE). Updated for 2026 requirements.",
            link: "/ccse-2026-test-nacionalidad",
            gradient: "from-red-500/20 to-yellow-500/20",
            accentColor: "red-500",
            stats: [
                { label: "Updated", value: "2026" },
                { label: "Questions", value: "300" }
            ],
            links: [
                { label: "Android", url: "/coming-soon", type: "android" },
                { label: "iOS", url: "/coming-soon", type: "ios" },
                { label: "Web App", url: "/ccse-2026-test-nacionalidad", type: "web", active: true }
            ]
        },
        {
            title: "Selecho App",
            category: "AI & Distributed",
            description: "A distributed operating system layer for agentic AI clusters. Managing complex task distribution and agent communication.",
            link: "/selecho",
            gradient: "from-blue-600/20 to-indigo-600/20",
            accentColor: "blue-500",
            stats: [
                { label: "Latency", value: "Ultra-low" },
                { label: "Agents", value: "Unlimited" }
            ],
            links: [
                { label: "Android", url: "https://play.google.com/store/apps/details?id=com.selecho.app", type: "android", active: true },
                { label: "iOS", url: "/coming-soon", type: "ios" },
                { label: "Docs", url: "/selecho", type: "web", active: true }
            ]
        },
        {
            title: "Best Berater",
            category: "Energy Management",
            description: "Strategic energy consultancy and subscription optimization platform for industrial and commercial consumers.",
            link: "https://bestberater.de",
            gradient: "from-emerald-600/20 to-teal-600/20",
            accentColor: "emerald-500",
            stats: [
                { label: "Savings", value: "Up to 30%" },
                { label: "Platform", value: "Live" }
            ],
            links: [
                { label: "Visit Platform", url: "https://bestberater.de", type: "web", active: true }
            ]
        }
    ];

    return (
        <section className="min-h-screen py-32 bg-background transition-colors duration-500 relative overflow-hidden">

            {/* Premium Background Accents - Exclusive for Light Mode feel */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30 dark:opacity-0 transition-opacity duration-1000">
                <div className="absolute top-[0%] left-[-10%] w-[700px] h-[700px] bg-indigo-200/40 rounded-full blur-[130px]" />
                <div className="absolute top-[30%] right-[-10%] w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-[110px]" />
                <div className="absolute bottom-[0%] left-[20%] w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-[120px]" />
            </div>

            <div className="container-wide relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-24"
                >
                    <h2 className="text-sm font-mono text-indigo-500 dark:text-indigo-400 tracking-[0.3em] uppercase mb-6 font-semibold">The Portfolio</h2>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-950 dark:text-white leading-[0.9] mb-8">
                        Expertise <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-slate-600 dark:from-slate-500 dark:to-slate-400">in Action.</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-xl font-light leading-relaxed">
                        A curated selection of applications and platforms I've architected, ranging from high-traffic consumer tools to industrial AI solutions.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {projects.map((p, i) => (
                        <ProjectCard key={i} project={p} index={i} />
                    ))}
                </div>

                <div className="mt-48 text-center">
                    <p className="text-slate-400 dark:text-slate-600 text-xs font-mono tracking-widest uppercase opacity-40 italic">© 2026 Mustafa Kanmaz • Software Architect • Independent Solutions</p>
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
    const router = useRouter();
    const { theme } = useTheme();
    const animationProps = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { delay: index * 0.1 },
    };

    const accentClass = project.accentColor || 'indigo-500';

    const handleCardClick = () => {
        if (!project.link) return;
        if (project.link.startsWith('http')) {
            window.open(project.link, '_blank', 'noopener,noreferrer');
        } else {
            router.push(project.link);
        }
    };

    return (
        <motion.div
            {...animationProps}
            className="relative rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-[var(--card-border)] bg-white dark:bg-[var(--card-bg)] group h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200 dark:hover:shadow-indigo-500/5"
        >
            {/* Extremely subtle gradient in light mode, stronger in dark */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10 dark:opacity-40 group-hover:opacity-100 transition-opacity duration-700`} />

            <div className="relative p-10 md:p-12 flex-1 flex flex-col">
                <div className="mb-10">
                    <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-${accentClass}/10 border border-slate-200 dark:border-${accentClass}/20 mb-8`}>
                        <span className={`flex h-2 w-2 rounded-full bg-${accentClass} animate-pulse`}></span>
                        <span className={`text-[10px] font-bold text-slate-600 dark:text-${accentClass} uppercase tracking-[0.2em]`}>{project.category}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight transition-colors">{project.title}</h2>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base md:text-lg font-light">
                        {project.description}
                    </p>
                </div>

                <div className="mt-auto">
                    {/* Stats Section - Premium Light Contrast */}
                    {project.stats && (
                        <div className="h-24 mb-8 rounded-2xl bg-slate-50 dark:bg-gradient-to-br dark:from-slate-950 dark:to-slate-900 border border-slate-100 dark:border-[var(--card-border)] flex items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-5 dark:opacity-20" />
                            <div className="text-center relative z-10 flex items-center gap-8">
                                {project.stats.map((s: any, si: number) => (
                                    <React.Fragment key={si}>
                                        <div>
                                            <div className="text-2xl font-bold text-slate-900 dark:text-white mb-0.5">{s.value}</div>
                                            <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">{s.label}</div>
                                        </div>
                                        {si < project.stats.length - 1 && <div className="w-px h-8 bg-slate-200 dark:bg-white/10"></div>}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Action Links Grid */}
                    <div className={`grid ${project.links.length === 1 ? 'grid-cols-1' : 'grid-cols-3'} gap-3`}>
                        {project.links.map((link: any, li: number) => (
                            <a
                                key={li}
                                href={link.url}
                                target={link.url.startsWith('http') ? "_blank" : "_self"}
                                rel={link.url.startsWith('http') ? "noopener noreferrer" : ""}
                                onClick={(e) => e.stopPropagation()}
                                className={`
                                    px-3 py-4 border rounded-xl transition-all flex flex-col items-center justify-center gap-1.5 group/btn
                                    ${link.active
                                        ? `bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-lg shadow-slate-200 dark:shadow-white/10`
                                        : 'bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/10 hover:bg-white dark:hover:bg-white/10 hover:border-slate-200 dark:hover:border-white/20'}
                                `}
                            >
                                <IconByType type={link.type} accentClass={link.active ? (theme === 'dark' ? 'slate-900' : 'white') : (theme === 'dark' ? 'slate-400' : 'slate-500')} />
                                <span className={`text-[10px] font-bold uppercase tracking-wider ${link.active ? 'text-inherit' : (theme === 'dark' ? 'text-slate-400' : 'text-slate-500')}`}>{link.label}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function IconByType({ type, accentClass }: { type: string, accentClass: string }) {
    if (type === 'android') {
        return <svg className={`w-5 h-5 text-${accentClass} transition-colors`} viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.17,10.68 19.88,10.5 19.66,10.32L18.73,9.5L16.23,12L18.73,14.5L19.42,13.84C19.78,13.75 20.04,13.62 20.17,13.13L20.89,12.72L21,12L20.89,11.28L20.17,10.87M16.81,8.88L14.54,11.15L6.05,2.66L16.81,8.88Z" /></svg>;
    }
    if (type === 'ios') {
        return <svg className={`w-5 h-5 text-${accentClass} transition-colors`} viewBox="0 0 24 24" fill="currentColor"><path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.95C10.1,6.97 11.13,7.82 11.94,7.82C12.73,7.82 13.97,6.85 15.5,6.85C16.14,6.85 17.92,7.09 18.9,8.5C18.82,8.55 16.61,9.84 16.69,12.81C16.77,16.35 19.73,17.54 19.78,17.56C19.75,17.71 19.3,19.26 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.03,3.19 15.55,4.61 14.69,5.63C13.85,6.61 12.6,7.23 11.59,7.15C11.45,5.86 12.12,4.44 13,3.5Z" /></svg>;
    }
    return <svg className={`w-5 h-5 text-${accentClass} transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>;
}
