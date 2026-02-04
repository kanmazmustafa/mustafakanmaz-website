"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function EinbuergerungstestPage() {
    const params = useParams();
    const locale = params?.locale || 'tr';

    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-amber-500/30 overflow-hidden transition-colors duration-300">
            {/* Premium Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-500/10 dark:bg-amber-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
            </div>

            {/* Hero Section */}
            <section className="relative pt-40 pb-24 border-b border-[var(--nav-border)]">
                <div className="container-wide relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8 backdrop-blur-md">
                            <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-ping"></span>
                            <span className="text-xs font-mono text-amber-500 uppercase tracking-widest font-bold">Trusted Preparation Tool</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9]">
                            German <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-br from-foreground via-slate-500 dark:from-white dark:via-slate-200 to-amber-500">Citizenship</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl mx-auto">
                            The most trusted platform for mastering the German naturalization test.
                            Architecture-driven preparation for your future.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <a
                                href="https://play.google.com/store/apps/details?id=com.kanmazmustafa.einbuergerungstest"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group px-10 py-5 bg-foreground text-background rounded-2xl font-black hover:scale-[1.02] transition-all flex items-center gap-4 shadow-2xl shadow-primary/5"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.17,10.87C20.07,10.68 19.88,10.5 19.66,10.32L18.73,9.5L16.23,12L18.73,14.5L19.42,13.84C19.78,13.75 20.04,13.62 20.17,13.13L20.89,12.72L21,12L20.89,11.28L20.17,10.87M16.81,8.88L14.54,11.15L6.05,2.66L16.81,8.88Z" /></svg>
                                <div className="text-left">
                                    <div className="text-[10px] uppercase tracking-widest opacity-60">Get it on</div>
                                    <div className="text-lg leading-none">Google Play</div>
                                </div>
                            </a>

                            <Link
                                href="/coming-soon"
                                className="group px-10 py-5 bg-black/5 dark:bg-[#0b0f19] text-foreground dark:text-white border border-[var(--nav-border)] rounded-2xl font-black hover:bg-black/10 dark:hover:bg-white/5 transition-all flex items-center gap-4 hover:scale-[1.02]"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.95C10.1,6.97 11.13,7.82 11.94,7.82C12.73,7.82 13.97,6.85 15.5,6.85C16.14,6.85 17.92,7.09 18.9,8.5C18.82,8.55 16.61,9.84 16.69,12.81C16.77,16.35 19.73,17.54 19.78,17.56C19.75,17.71 19.3,19.26 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.03,3.19 15.55,4.61 14.69,5.63C13.85,6.61 12.6,7.23 11.59,7.15C11.45,5.86 12.12,4.44 13,3.5Z" /></svg>
                                <div className="text-left">
                                    <div className="text-[10px] uppercase tracking-widest opacity-60">Download on</div>
                                    <div className="text-lg leading-none">App Store</div>
                                </div>
                            </Link>

                            <a
                                href={`/einbuergerungstest/app${locale === 'en' ? '' : '/' + locale}`}
                                className="group px-10 py-5 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-2xl font-black hover:bg-amber-500/20 transition-all flex items-center gap-4 hover:scale-[1.02]"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                                <div className="text-left">
                                    <div className="text-[10px] uppercase tracking-widest opacity-60">Access link</div>
                                    <div className="text-lg leading-none">Web App</div>
                                </div>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="py-32 container-wide">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Complete Bank",
                            desc: "300 general questions + state-specific modules for all 16 federal states.",
                            accent: "from-amber-500 to-amber-700"
                        },
                        {
                            title: "Smart Insights",
                            desc: "Real-time performance tracking and focused learning on your weak points.",
                            accent: "from-indigo-500 to-indigo-700"
                        },
                        {
                            title: "Exam Engine",
                            desc: "Simulation mode that replicates the official test conditions perfectly.",
                            accent: "from-emerald-500 to-emerald-700"
                        }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 rounded-[2.5rem] bg-[var(--card-bg)] border border-[var(--card-border)] relative group overflow-hidden"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.accent} opacity-10 blur-3xl group-hover:opacity-30 transition-opacity`} />
                            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-amber-400 transition-colors uppercase tracking-tight">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed font-light">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Content Enrichment for AdSense */}
            <section className="py-24 container-wide">
                <div className="max-w-4xl mx-auto space-y-16">
                    <div>
                        <h2 className="text-4xl font-black mb-6 tracking-tight">Understanding the German Citizenship Test</h2>
                        <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                            The "Leben in Deutschland" test is a mandatory examination for most applicants seeking naturalization in Germany. It assesses your knowledge of the country's legal and social order, as well as living conditions in Germany. To pass, you must answer at least 17 out of 33 questions correctly within 60 minutes.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-4xl font-black mb-6 tracking-tight">Why Choose Our Platform?</h2>
                        <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-6">
                            Preparing for the exam requires more than just memorizing answers. Our platform offers a comprehensive study experience featuring:
                        </p>
                        <ul className="list-disc pl-6 space-y-4 text-slate-500 dark:text-slate-400 font-light text-lg">
                            <li><strong className="text-foreground font-medium">Official Question Bank:</strong> Access all 300 general questions and 10 state-specific questions for every federal state (Bundesland).</li>
                            <li><strong className="text-foreground font-medium">Multi-Language Support:</strong> View questions in German, Turkish, English, Arabic, and Russian to better understand complex terminology.</li>
                            <li><strong className="text-foreground font-medium">Smart Analytics:</strong> Our system tracks your progress and highlights weak areas, ensuring efficient preparation.</li>
                        </ul>
                    </div>

                    <div>
                        <h2 className="text-4xl font-black mb-6 tracking-tight">Exam Structure & Tips</h2>
                        <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                            The exam consists of 33 multiple-choice questions. 30 questions cover core topics like "Living in a Democracy", "History and Responsibility", and "People and Society". The remaining 3 questions are specific to the federal state where you reside. Regular practice with our simulation mode helps you get comfortable with the format and time constraints.
                        </p>
                    </div>
                </div>
            </section>

            {/* AI-Optimized FAQ Section for SEO */}
            <section className="py-24 border-t border-[var(--nav-border)]">
                <div className="container-wide">
                    <div className="mb-16">
                        <h2 className="text-sm font-mono text-amber-500 tracking-widest uppercase mb-4">Common Queries</h2>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">Frequently Asked Questions</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-12">
                            <article>
                                <h3 className="text-xl font-bold text-foreground mb-4">Was ist der Einbürgerungstest?</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                                    Der Einbürgerungstest ist eine wesentliche Voraussetzung für die deutsche Staatsbürgerschaft.
                                    Er besteht aus <strong className="text-foreground font-medium">33 Fragen</strong>, von denen 17 richtig beantwortet werden müssen.
                                    Unsere App deckt alle <strong className="text-foreground font-medium">310 offiziellen Fragen</strong> (300 allgemeine + 10 bundeslandspezifische) ab.
                                </p>
                            </article>
                            <article>
                                <h3 className="text-xl font-bold text-foreground mb-4">Hangi dillerde destek sunuyorsunuz?</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                                    Uygulamamız çok dilli bir yapıya sahiptir. Soruların tamamı <strong className="text-foreground font-medium">Almanca, Türkçe, İngilizce, Arapça ve Rusça</strong> dillerinde görüntülenebilir.
                                    Bu özellik, özellikle dil bariyeri yaşayan adaylar için "Leben in Deutschland" sınavına hazırlığı kolaylaştırır.
                                </p>
                            </article>
                        </div>
                        <div className="space-y-12">
                            <article>
                                <h3 className="text-xl font-bold text-foreground mb-4">Is the platform really free?</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                                    Yes, our "Einbürgerungstest Online 2026" platform is <strong className="text-foreground font-medium">100% free</strong>.
                                    We believe that access to citizenship preparation should be open to everyone without cost barriers.
                                </p>
                            </article>
                            <article>
                                <h3 className="text-xl font-bold text-foreground mb-4">Wie bereite ich mich am besten vor?</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                                    Der effektivste Weg ist die Nutzung unseres <strong className="text-foreground font-medium">Smart Insights</strong> Systems.
                                    Es erkennt automatisch Ihre Schwachstellen und erstellt personalisierte Wiederholungslisten, damit Sie die Prüfung beim ersten Versuch bestehen.
                                </p>
                            </article>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Breakdown */}
            <section className="py-24 bg-black/5 dark:bg-white/5 border-y border-[var(--nav-border)]">
                <div className="container-wide">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center text-white/80 uppercase tracking-widest font-mono text-[10px]">
                        <div><div className="text-4xl font-black text-white mb-2">300+</div>Questions</div>
                        <div><div className="text-4xl font-black text-white mb-2">16</div>Federal States</div>
                        <div><div className="text-4xl font-black text-white mb-2">100%</div>Accurate Data</div>
                        <div><div className="text-4xl font-black text-white mb-2">Active</div>Development</div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 text-center text-slate-600 font-mono text-[10px] uppercase tracking-[0.4em]">
                <div className="container-wide flex flex-col md:flex-row justify-between items-center gap-6">
                    <span>© 2026 Mustafa Kanmaz</span>
                    <div className="flex gap-8">
                        <Link href="/einbuergerungstest/impressum" className="hover:text-white transition-colors">Impressum</Link>
                        <Link href="/einbuergerungstest/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/projects" className="hover:text-white transition-colors">More Projects</Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}
