'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutMasterpiece() {
    return (
        <section className="min-h-screen py-32 bg-background text-foreground transition-colors duration-500 relative overflow-hidden">

            {/* Premium Background Accents - Exclusive for Light Mode feel */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-30 dark:opacity-0 transition-opacity duration-1000">
                <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[100px]" />
            </div>

            <div className="container-wide relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <h2 className="text-sm font-mono text-indigo-500 dark:text-indigo-400 tracking-[0.3em] uppercase mb-6 font-semibold">The Narrative</h2>
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter max-w-5xl leading-[1.1] text-slate-950 dark:text-white">
                        Architecting the future of <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-slate-600 dark:from-slate-500 dark:to-slate-400">Industry & Intelligence.</span>
                    </h1>
                </motion.div>

                {/* Dual Identity Narrative */}
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 mb-24">
                    {/* Identity 1: Technical Core */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        <div className="h-1.5 w-12 bg-indigo-500 mb-10 rounded-full shadow-lg shadow-indigo-500/20" />
                        <h3 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white tracking-tight">Technical Core</h3>
                        <ul className="space-y-8 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                            <li className="flex flex-col gap-1">
                                <strong className="text-slate-900 dark:text-white font-semibold text-xl">Systems Architecture</strong>
                                <span className="font-light">Scalable Cloud Infrastructures, Microservices, and Enterprise-grade Design Patterns.</span>
                            </li>
                            <li className="flex flex-col gap-1">
                                <strong className="text-slate-900 dark:text-white font-semibold text-xl">AI & Automation</strong>
                                <span className="font-light">Agentic Workflows, Autonomous LLM Integrations, and Intelligent Process Automation.</span>
                            </li>
                            <li className="flex flex-col gap-1">
                                <strong className="text-slate-900 dark:text-white font-semibold text-xl">Engineering Excellence</strong>
                                <span className="font-light">Advanced Software Craftsmanship, High-Performance Mobile Development, and Secure Data Orchestration.</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Identity 2: Strategic Founder (BestBerater) */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className="h-1.5 w-12 bg-emerald-500 mb-10 rounded-full shadow-lg shadow-emerald-500/20" />
                        <h3 className="text-4xl font-bold mb-8 text-slate-900 dark:text-white tracking-tight">Strategy & Vision</h3>
                        <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed mb-10 font-light">
                            Architected and currently managing an autonomous energy consultancy ecosystem for the German market at
                            <Link href="https://bestberater.de" target="_blank" className="mx-2 text-slate-900 dark:text-white font-bold underline decoration-emerald-500/30 decoration-4 underline-offset-8 hover:decoration-emerald-500 transition-all">BestBerater.de</Link>
                        </p>
                        <p className="text-slate-500 dark:text-slate-500 text-lg leading-relaxed font-light italic border-l-2 border-emerald-500/20 pl-6">
                            "By leveraging high-performance automated workflows and deep domain expertise, I bridge the gap between complex energy regulations and streamlined digital subscription management."
                        </p>
                    </motion.div>
                </div>

                {/* Link Cards - Enhanced with Premium Depth */}
                <div className="grid lg:grid-cols-2 gap-10 mb-32">
                    {/* Card 1: Software Portfolio */}
                    <Link
                        href="/projects"
                        className="group relative flex items-center justify-between p-8 rounded-[2.5rem] bg-indigo-50/5 dark:bg-[var(--card-bg)] border border-indigo-500/5 dark:border-[var(--card-border)] hover:bg-white dark:hover:bg-slate-900/80 shadow-2xl shadow-transparent hover:shadow-indigo-500/10 transition-all duration-500"
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">Explore the Artifacts</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-light">Curated high-performance software systems.</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-indigo-500/5 flex items-center justify-center text-indigo-500 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500">
                            <span className="text-2xl">→</span>
                        </div>
                    </Link>

                    {/* Card 2: Best Berater */}
                    <a
                        href="https://bestberater.de"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-between p-8 rounded-[2.5rem] bg-emerald-50/5 dark:bg-[var(--card-bg)] border border-emerald-500/5 dark:border-[var(--card-border)] hover:bg-white dark:hover:bg-slate-900/80 shadow-2xl shadow-transparent hover:shadow-emerald-500/10 transition-all duration-500"
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">Venture: Best Berater</h3>
                            <p className="text-slate-500 dark:text-slate-400 font-light">Premium energy consultancy platform.</p>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-emerald-500/5 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-500">
                            <span className="text-2xl">↗</span>
                        </div>
                    </a>
                </div>

            </div>
        </section>
    );
}


