'use client';
import HeroSection from '@/components/sections/HeroSection';
import VenturesSection from '@/components/sections/VenturesSection';
import { motion } from 'framer-motion';
import Link from 'next/link';
export default function Home() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'Mustafa Kanmaz',
        'jobTitle': 'Software Architect',
        'url': 'https://mustafakanmaz.com',
        'sameAs': [
            'https://linkedin.com/in/mustafakanmaz',
            'https://github.com/mustafakanmaz',
            'https://bestberater.de'
        ]
    };

    return (
        <main className="flex flex-col bg-background text-foreground transition-colors duration-300">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <HeroSection />


            {/* Featured Project Section */}
            <section className="py-48 relative overflow-hidden bg-background transition-colors duration-500">

                {/* Background Accents for Light Mode */}
                <div className="absolute inset-0 z-0 pointer-events-none opacity-20 dark:opacity-0 transition-opacity duration-1000">
                    <div className="absolute top-[10%] right-[-5%] w-[800px] h-[800px] bg-amber-100/30 rounded-full blur-[130px]" />
                    <div className="absolute bottom-[10%] left-[-5%] w-[700px] h-[700px] bg-indigo-100/30 rounded-full blur-[120px]" />
                </div>

                <div className="container-wide relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-24"
                    >
                        <h2 className="text-sm font-mono text-amber-600 dark:text-amber-500 tracking-[0.3em] uppercase mb-6 font-semibold">Portfolio</h2>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-950 dark:text-white leading-[0.9]">
                            Featured <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-orange-600">Applications.</span>
                        </h1>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Einbürgerungstest Card */}
                        <div className="relative group block h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.1 }}
                                className="relative rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 backdrop-blur-md h-full flex flex-col hover:shadow-2xl hover:shadow-slate-200 dark:hover:shadow-amber-500/5 transition-all duration-500 cursor-pointer"
                            >
                                <Link
                                    href="/einbuergerungstest"
                                    className="absolute inset-0 z-0"
                                    aria-label="View Einbürgerungstest details"
                                />

                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-600/10 dark:from-amber-500/20 dark:to-orange-600/20 opacity-30 dark:opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                <div className="relative p-10 md:p-12 flex-1 flex flex-col z-10 pointer-events-none">
                                    <div className="mb-10">
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-amber-500/10 border border-slate-200 dark:border-amber-500/20 mb-8">
                                            <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
                                            <span className="text-[10px] font-bold text-slate-600 dark:text-amber-500 uppercase tracking-[0.2em]">Featured Application</span>
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">Einbürgerungstest</h2>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-lg font-light">
                                            The most comprehensive preparation guide for the German naturalization test.
                                            Now available as a seamless web experience.
                                        </p>
                                    </div>

                                    <div className="mt-auto pointer-events-auto">
                                        <div className="h-24 mb-10 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-white/5 flex items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 opacity-5 dark:opacity-10" />
                                            <div className="text-center relative z-10 flex items-center gap-10">
                                                <div>
                                                    <div className="text-2xl font-bold text-slate-950 dark:text-white mb-0.5">300+</div>
                                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Questions</div>
                                                </div>
                                                <div className="w-px h-8 bg-slate-200 dark:bg-white/10"></div>
                                                <div>
                                                    <div className="text-2xl font-bold text-slate-950 dark:text-white mb-0.5">16</div>
                                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">States</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-3 relative z-20">
                                            <a
                                                href="https://play.google.com/store/apps/details?id=com.kanmazmustafa.einbuergerungstest"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="px-3 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl hover:bg-white dark:hover:bg-white/10 hover:shadow-md transition-all flex flex-col items-center justify-center gap-1.5 group/btn"
                                            >
                                                <svg className="w-5 h-5 text-slate-400 group-hover/btn:text-amber-600 transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.17,10.68 19.88,10.5 19.66,10.32L18.73,9.5L16.23,12L18.73,14.5L19.42,13.84C19.78,13.75 20.04,13.62 20.17,13.13L20.89,12.72L21,12L20.89,11.28L20.17,10.87M16.81,8.88L14.54,11.15L6.05,2.66L16.81,8.88Z" /></svg>
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Android</span>
                                            </a>
                                            <a
                                                href="https://apps.apple.com/us/app/lid-einburgerungstest/id6759058355"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="px-3 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl hover:bg-white dark:hover:bg-white/10 hover:shadow-md transition-all flex flex-col items-center justify-center gap-1.5 group/btn"
                                            >
                                                <svg className="w-5 h-5 text-slate-400 group-hover/btn:text-slate-950 dark:group-hover/btn:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.95C10.1,6.97 11.13,7.82 11.94,7.82C12.73,7.82 13.97,6.85 15.5,6.85C16.14,6.85 17.92,7.09 18.9,8.5C18.82,8.55 16.61,9.84 16.69,12.81C16.77,16.35 19.73,17.54 19.78,17.56C19.75,17.71 19.3,19.26 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.03,3.19 15.55,4.61 14.69,5.63C13.85,6.61 12.6,7.23 11.59,7.15C11.45,5.86 12.12,4.44 13,3.5Z" /></svg>
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">iOS</span>
                                            </a>
                                            <a
                                                href="/einbuergerungstest/app"
                                                onClick={(e) => e.stopPropagation()}
                                                className="px-3 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl shadow-lg shadow-slate-200 dark:shadow-white/5 transition-all flex flex-col items-center justify-center gap-1.5 group/btn"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                                                <span className="text-[10px] font-black uppercase tracking-widest">Web App</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Ham Radio Exam Prep Card */}
                        <div className="relative group block h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="relative rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 backdrop-blur-md h-full flex flex-col hover:shadow-2xl hover:shadow-slate-200 dark:hover:shadow-indigo-500/5 transition-all duration-500 cursor-pointer"
                            >
                                <Link
                                    href="/ham-radio-exam-prep"
                                    className="absolute inset-0 z-0"
                                    aria-label="View Ham Radio Exam details"
                                />

                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 dark:from-indigo-500/20 dark:to-purple-600/20 opacity-30 dark:opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                <div className="relative p-10 md:p-12 flex-1 flex flex-col z-10 pointer-events-none">
                                    <div className="mb-10">
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-indigo-500/10 border border-slate-200 dark:border-indigo-500/20 mb-8">
                                            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                                            <span className="text-[10px] font-bold text-slate-600 dark:text-indigo-400 uppercase tracking-[0.2em]">Featured Application</span>
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">Ham Radio Exam</h2>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-lg font-light">
                                            Master your amateur radio license exam with our comprehensive study tool.
                                            Supporting multiple countries.
                                        </p>
                                    </div>

                                    <div className="mt-auto pointer-events-auto">
                                        <div className="h-24 mb-10 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-white/5 flex items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 opacity-5 dark:opacity-10" />
                                            <div className="text-center relative z-10 flex items-center gap-10">
                                                <div>
                                                    <div className="text-2xl font-bold text-slate-950 dark:text-white mb-0.5">29+</div>
                                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Languages</div>
                                                </div>
                                                <div className="w-px h-8 bg-slate-200 dark:bg-white/10"></div>
                                                <div>
                                                    <div className="text-2xl font-bold text-slate-950 dark:text-white mb-0.5">Global</div>
                                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Coverage</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-3 relative z-20">
                                            <a
                                                href="https://play.google.com/store/apps/details?id=com.kanmazmustafa.ushamradio"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="px-3 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl hover:bg-white dark:hover:bg-white/10 hover:shadow-md transition-all flex flex-col items-center justify-center gap-1.5 group/btn"
                                            >
                                                <svg className="w-5 h-5 text-slate-400 group-hover/btn:text-indigo-600 transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.17,10.68 19.88,10.5 19.66,10.32L18.73,9.5L16.23,12L18.73,14.5L19.42,13.84C19.78,13.75 20.04,13.62 20.17,13.13L20.89,12.72L21,12L20.89,11.28L20.17,10.87M16.81,8.88L14.54,11.15L6.05,2.66L16.81,8.88Z" /></svg>
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Android</span>
                                            </a>
                                            <a
                                                href="/coming-soon"
                                                onClick={(e) => e.stopPropagation()}
                                                className="px-3 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl hover:bg-white dark:hover:bg-white/10 hover:shadow-md transition-all flex flex-col items-center justify-center gap-1.5 group/btn"
                                            >
                                                <svg className="w-5 h-5 text-slate-400 group-hover/btn:text-slate-950 dark:group-hover/btn:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.95C10.1,6.97 11.13,7.82 11.94,7.82C12.73,7.82 13.97,6.85 15.5,6.85C16.14,6.85 17.92,7.09 18.9,8.5C18.82,8.55 16.61,9.84 16.69,12.81C16.77,16.35 19.73,17.54 19.78,17.56C19.75,17.71 19.3,19.26 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.03,3.19 15.55,4.61 14.69,5.63C13.85,6.61 12.6,7.23 11.59,7.15C11.45,5.86 12.12,4.44 13,3.5Z" /></svg>
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">iOS</span>
                                            </a>
                                            <a
                                                href="https://hamradio.mustafakanmaz.com/"
                                                onClick={(e) => e.stopPropagation()}
                                                className="px-3 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl shadow-lg shadow-slate-200 dark:shadow-white/5 transition-all flex flex-col items-center justify-center gap-1.5 group/btn"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                                                <span className="text-[10px] font-black uppercase tracking-widest">Web App</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* CCSE 2026 Card */}
                        <div className="relative group block h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.3 }}
                                className="relative rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 backdrop-blur-md h-full flex flex-col hover:shadow-2xl hover:shadow-slate-200 dark:hover:shadow-red-500/5 transition-all duration-500 cursor-pointer"
                            >
                                <Link
                                    href="/ccse-2026-test-nacionalidad"
                                    className="absolute inset-0 z-0"
                                    aria-label="View CCSE 2026 details"
                                />

                                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-yellow-500/10 dark:from-red-500/20 dark:to-yellow-500/20 opacity-30 dark:opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                <div className="relative p-10 md:p-12 flex-1 flex flex-col z-10 pointer-events-none">
                                    <div className="mb-10">
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-red-500/10 border border-slate-200 dark:border-red-500/20 mb-8">
                                            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse"></span>
                                            <span className="text-[10px] font-bold text-slate-600 dark:text-red-400 uppercase tracking-[0.2em]">Spanish Nationality</span>
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">CCSE 2026</h2>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-lg font-light">
                                            Comprehensive preparation guide for the Spanish knowledge and constitutional test (CCSE).
                                            Updated for 2026 requirements.
                                        </p>
                                    </div>

                                    <div className="mt-auto pointer-events-auto">
                                        <div className="h-24 mb-10 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-white/5 flex items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 opacity-5 dark:opacity-10" />
                                            <div className="text-center relative z-10 flex items-center gap-10">
                                                <div>
                                                    <div className="text-2xl font-bold text-slate-950 dark:text-white mb-0.5">2026</div>
                                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Updated</div>
                                                </div>
                                                <div className="w-px h-8 bg-slate-200 dark:bg-white/10"></div>
                                                <div>
                                                    <div className="text-2xl font-bold text-slate-950 dark:text-white mb-0.5">300</div>
                                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Questions</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-3 relative z-20">
                                            <a
                                                href="/coming-soon"
                                                onClick={(e) => e.stopPropagation()}
                                                className="px-3 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl hover:bg-white dark:hover:bg-white/10 hover:shadow-md transition-all flex flex-col items-center justify-center gap-1.5 group/btn"
                                            >
                                                <svg className="w-5 h-5 text-slate-400 group-hover/btn:text-red-600 transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.17,10.68 19.88,10.5 19.66,10.32L18.73,9.5L16.23,12L18.73,14.5L19.42,13.84C19.78,13.75 20.04,13.62 20.17,13.13L20.89,12.72L21,12L20.89,11.28L20.17,10.87M16.81,8.88L14.54,11.15L6.05,2.66L16.81,8.88Z" /></svg>
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Android</span>
                                            </a>
                                            <a
                                                href="/coming-soon"
                                                onClick={(e) => e.stopPropagation()}
                                                className="px-3 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl hover:bg-white dark:hover:bg-white/10 hover:shadow-md transition-all flex flex-col items-center justify-center gap-1.5 group/btn"
                                            >
                                                <svg className="w-5 h-5 text-slate-400 group-hover/btn:text-slate-950 dark:group-hover/btn:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.95C10.1,6.97 11.13,7.82 11.94,7.82C12.73,7.82 13.97,6.85 15.5,6.85C16.14,6.85 17.92,7.09 18.9,8.5C18.82,8.55 16.61,9.84 16.69,12.81C16.77,16.35 19.73,17.54 19.78,17.56C19.75,17.71 19.3,19.26 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.03,3.19 15.55,4.61 14.69,5.63C13.85,6.61 12.6,7.23 11.59,7.15C11.45,5.86 12.12,4.44 13,3.5Z" /></svg>
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">iOS</span>
                                            </a>
                                            <a
                                                href="https://ccse.mustafakanmaz.com/"
                                                onClick={(e) => e.stopPropagation()}
                                                className="px-3 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl shadow-lg shadow-slate-200 dark:shadow-white/5 transition-all flex flex-col items-center justify-center gap-1.5 group/btn"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                                                <span className="text-[10px] font-black uppercase tracking-widest">Web App</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Selecho App Card */}
                        <div className="relative group block h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.4 }}
                                className="relative rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 backdrop-blur-md h-full flex flex-col hover:shadow-2xl hover:shadow-slate-200 dark:hover:shadow-blue-500/5 transition-all duration-500 cursor-pointer"
                            >
                                <Link
                                    href="/selecho"
                                    className="absolute inset-0 z-0"
                                    aria-label="View Selecho details"
                                />

                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 dark:from-blue-600/20 dark:to-indigo-600/20 opacity-30 dark:opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                <div className="relative p-10 md:p-12 flex-1 flex flex-col z-10 pointer-events-none">
                                    <div className="mb-10">
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-blue-500/10 border border-slate-200 dark:border-blue-500/20 mb-8">
                                            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
                                            <span className="text-[10px] font-bold text-slate-600 dark:text-blue-400 uppercase tracking-[0.2em]">AI & Distributed</span>
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">Selecho App</h2>
                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-lg font-light">
                                            A distributed operating system layer for agentic AI clusters.
                                            Managing complex task distribution and agent communication.
                                        </p>
                                    </div>

                                    <div className="mt-auto pointer-events-auto">
                                        <div className="h-24 mb-10 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-100 dark:border-white/5 flex items-center justify-center relative overflow-hidden">
                                            <div className="absolute inset-0 opacity-5 dark:opacity-10" />
                                            <div className="text-center relative z-10 flex items-center gap-10">
                                                <div>
                                                    <div className="text-2xl font-bold text-slate-950 dark:text-white mb-0.5">Ultra-low</div>
                                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Latency</div>
                                                </div>
                                                <div className="w-px h-8 bg-slate-200 dark:bg-white/10"></div>
                                                <div>
                                                    <div className="text-2xl font-bold text-slate-950 dark:text-white mb-0.5">Unlimited</div>
                                                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Agents</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-3 relative z-20">
                                            <a
                                                href="https://play.google.com/store/apps/details?id=com.selecho.app"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={(e) => e.stopPropagation()}
                                                className="px-3 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl hover:bg-white dark:hover:bg-white/10 hover:shadow-md transition-all flex flex-col items-center justify-center gap-1.5 group/btn"
                                            >
                                                <svg className="w-5 h-5 text-slate-400 group-hover/btn:text-blue-600 transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.17,10.68 19.88,10.5 19.66,10.32L18.73,9.5L16.23,12L18.73,14.5L19.42,13.84C19.78,13.75 20.04,13.62 20.17,13.13L20.89,12.72L21,12L20.89,11.28L20.17,10.87M16.81,8.88L14.54,11.15L6.05,2.66L16.81,8.88Z" /></svg>
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Android</span>
                                            </a>
                                            <a
                                                href="/coming-soon"
                                                onClick={(e) => e.stopPropagation()}
                                                className="px-3 py-4 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-xl hover:bg-white dark:hover:bg-white/10 hover:shadow-md transition-all flex flex-col items-center justify-center gap-1.5 group/btn"
                                            >
                                                <svg className="w-5 h-5 text-slate-400 group-hover/btn:text-slate-950 dark:group-hover/btn:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.95C10.1,6.97 11.13,7.82 11.94,7.82C12.73,7.82 13.97,6.85 15.5,6.85C16.14,6.85 17.92,7.09 18.9,8.5C18.82,8.55 16.61,9.84 16.69,12.81C16.77,16.35 19.73,17.54 19.78,17.56C19.75,17.71 19.3,19.26 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.03,3.19 15.55,4.61 14.69,5.63C13.85,6.61 12.6,7.23 11.59,7.15C11.45,5.86 12.12,4.44 13,3.5Z" /></svg>
                                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">iOS</span>
                                            </a>
                                            <a
                                                href="/selecho"
                                                onClick={(e) => e.stopPropagation()}
                                                className="px-3 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl shadow-lg shadow-slate-200 dark:shadow-white/5 transition-all flex flex-col items-center justify-center gap-1.5 group/btn"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                                                <span className="text-[10px] font-black uppercase tracking-widest">Docs</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <VenturesSection />
        </main>
    );
}
