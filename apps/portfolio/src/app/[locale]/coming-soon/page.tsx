"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ComingSoonPage() {
    return (
        <main className="min-h-screen bg-[#020617] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-[120px] animate-pulse delay-700" />

            <div className="max-w-2xl w-full text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                        <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-ping"></span>
                        <span className="text-sm font-mono text-slate-400 uppercase tracking-widest">Masterpiece in Progress</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                        Something <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-amber-400">Exceptional</span> is coming.
                    </h1>

                    <p className="text-lg md:text-xl text-slate-400 font-light leading-relaxed mb-12 max-w-xl mx-auto">
                        I am currently architecting this experience. I believe in quality over speed, and this module is receiving the attention it deserves.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/"
                            className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-200 transition-all shadow-xl shadow-white/5 w-full sm:w-auto text-center"
                        >
                            Return to Home
                        </Link>
                        <Link
                            href="/projects"
                            className="px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all backdrop-blur-md w-full sm:w-auto text-center"
                        >
                            View Other Works
                        </Link>
                    </div>
                </motion.div>

                {/* Aesthetic Grid Mask */}
                <div className="absolute inset-0 -z-10 opacity-10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none">
                    <div className="absolute inset-0 bg-slate-900/20 brightness-100" />
                </div>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em] opacity-50">
                Architectural Excellence • 2026
            </div>
        </main>
    );
}
