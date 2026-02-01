'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function VenturesSection() {
    return (
        <section className="py-48 relative overflow-hidden bg-background transition-colors duration-500">
            {/* Premium Background Accents */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30 dark:opacity-0 transition-opacity duration-1000">
                <div className="absolute top-[20%] right-[-5%] w-[600px] h-[600px] bg-emerald-100/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-[100px]" />
            </div>

            <div className="container-wide relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-24"
                >
                    <span className="text-indigo-500 dark:text-indigo-400 font-mono text-sm tracking-[0.3em] uppercase mb-6 block font-semibold">
                        Technical Ecosystem
                    </span>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-950 dark:text-white leading-[0.9] mb-8">
                        The Ventures.
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-2xl text-xl font-light leading-relaxed">
                        Beyond architecture, I build and scale digital businesses. Applying deep technical expertise to solve real-world industrial challenges.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Venture 1: Architecture Consulting */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="group relative rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 backdrop-blur-md h-full flex flex-col cursor-pointer hover:shadow-2xl hover:shadow-slate-200 dark:hover:shadow-indigo-500/5 transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-indigo-600/10 dark:from-indigo-500/20 dark:to-indigo-600/20 opacity-30 dark:opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative p-10 md:p-12 flex-1 flex flex-col">
                            <div className="mb-10">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-indigo-500/10 border border-slate-200 dark:border-indigo-500/20 mb-8">
                                    <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
                                    <span className="text-[10px] font-bold text-slate-600 dark:text-indigo-400 uppercase tracking-[0.2em]">Strategic Consulting</span>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">Software Architecture</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed font-light">
                                    Architecting high-performance systems and agentic AI clusters for global industry leaders.
                                </p>
                            </div>

                            <div className="mt-auto">
                                <Link href="/projects" className="w-full px-6 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg shadow-slate-200 dark:shadow-white/10 transition-all hover:scale-[1.02]">
                                    <span>Explore Architecture</span>
                                    <span>→</span>
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* Venture 2: Best Berater */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="group relative rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/40 backdrop-blur-md h-full flex flex-col cursor-pointer hover:shadow-2xl hover:shadow-slate-200 dark:hover:shadow-emerald-500/5 transition-all duration-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 dark:from-emerald-500/20 dark:to-emerald-600/20 opacity-30 dark:opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative p-10 md:p-12 flex-1 flex flex-col">
                            <div className="mb-10">
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-emerald-500/10 border border-slate-200 dark:border-emerald-500/20 mb-8">
                                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                    <span className="text-[10px] font-bold text-slate-600 dark:text-emerald-400 uppercase tracking-[0.2em]">Energy Consultancy</span>
                                </div>
                                <h3 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">Best Berater</h3>
                                <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed font-light">
                                    Germany's leading autonomous energy consultancy ecosystem, optimized through agentic automation.
                                </p>
                            </div>

                            <div className="mt-auto">
                                <a href="https://bestberater.de" target="_blank" className="w-full px-6 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg shadow-slate-200 dark:shadow-white/10 transition-all hover:scale-[1.02]">
                                    <span>Visit Venture</span>
                                    <span>↗</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
