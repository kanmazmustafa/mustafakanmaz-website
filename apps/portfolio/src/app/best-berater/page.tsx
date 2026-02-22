'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function BestBeraterPage() {
    return (
        <main className="min-h-screen bg-background text-foreground transition-colors duration-300">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/10 dark:bg-emerald-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-500/10 dark:bg-teal-600/10 rounded-full blur-[120px]" />
            </div>

            <section className="relative pt-40 pb-24 container-wide">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 backdrop-blur-md">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-bold">Energy Management</span>
                    </div>

                    <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9] text-slate-900 dark:text-white">
                        Best <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-600">Berater.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-light leading-relaxed mb-12 max-w-2xl">
                        Strategic energy consultancy and subscription optimization platform for industrial and commercial consumers.
                        Focusing on cost reduction and sustainability through intelligent analysis.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6">
                        <a
                            href="https://bestberater.de"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:shadow-xl hover:shadow-emerald-500/20 transition-all flex items-center gap-3"
                        >
                            <span>Visit Platform</span>
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </a>
                    </div>
                </motion.div>
            </section>

            <section className="py-24 container-wide">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Invoice Analysis", desc: "Automated analysis of energy invoices to identify potential savings." },
                        { title: "Contract Optimization", desc: "Algorithms to find the best energy contracts based on consumption patterns." },
                        { title: "Sustainability", desc: "Tracking carbon footprint and suggesting green energy alternatives." }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-8 rounded-3xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10"
                        >
                            <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">{feature.title}</h3>
                            <p className="text-slate-600 dark:text-slate-400 font-light">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </main>
    );
}
