"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import DeviceMockup from '@/components/DeviceMockup';

export default function ChroniclePage() {
    return (
        <main className="min-h-screen bg-background text-foreground selection:bg-amber-500/30 overflow-hidden transition-colors duration-300">
            {/* Premium Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-500/10 dark:bg-amber-600/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-violet-500/10 dark:bg-violet-600/10 rounded-full blur-[120px] animate-pulse delay-1000" />
            </div>

            {/* Hero Section */}
            <section className="relative pt-40 pb-24 border-b border-[var(--nav-border)]">
                <div className="container-wide relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-left"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8 backdrop-blur-md">
                                <span className="flex h-2 w-2 rounded-full bg-amber-500 animate-ping"></span>
                                <span className="text-xs font-mono text-amber-600 dark:text-amber-500 uppercase tracking-widest font-bold">Now in Beta</span>
                            </div>

                            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9]">
                                Chronicle <br />
                                <span className="bg-clip-text text-transparent bg-gradient-to-br from-amber-500 via-orange-600 to-violet-600">LitRPG Tracker</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-light leading-relaxed mb-12 max-w-xl">
                                The ultimate companion for LitRPG authors and readers. 
                                Track stats, evolution, and inventory with a state-of-the-art interface.
                            </p>

                            <div className="flex flex-wrap gap-6">
                                <Link
                                    href="/coming-soon"
                                    className="group px-10 py-5 bg-foreground text-background rounded-2xl font-black hover:scale-[1.02] transition-all flex items-center gap-4 shadow-2xl shadow-primary/5"
                                >
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.17,10.87C20.07,10.68 19.88,10.5 19.66,10.32L18.73,9.5L16.23,12L18.73,14.5L19.42,13.84C19.78,13.75 20.04,13.62 20.17,13.13L20.89,12.72L21,12L20.89,11.28L20.17,10.87M16.81,8.88L14.54,11.15L6.05,2.66L16.81,8.88Z" /></svg>
                                    <div className="text-left">
                                        <div className="text-[10px] uppercase tracking-widest opacity-60">Get it on</div>
                                        <div className="text-lg leading-none">Google Play</div>
                                    </div>
                                </Link>

                                <Link
                                    href="/coming-soon"
                                    className="group px-10 py-5 bg-black/5 dark:bg-white/5 text-foreground dark:text-white border border-[var(--nav-border)] rounded-2xl font-black hover:bg-black/10 dark:hover:bg-white/10 transition-all flex items-center gap-4 hover:scale-[1.02]"
                                >
                                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.95C10.1,6.97 11.13,7.82 11.94,7.82C12.73,7.82 13.97,6.85 15.5,6.85C16.14,6.85 17.92,7.09 18.9,8.5C18.82,8.55 16.61,9.84 16.69,12.81C16.77,16.35 19.73,17.54 19.78,17.56C19.75,17.71 19.3,19.26 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.03,3.19 15.55,4.61 14.69,5.63C13.85,6.61 12.6,7.23 11.59,7.15C11.45,5.86 12.12,4.44 13,3.5Z" /></svg>
                                    <div className="text-left">
                                        <div className="text-[10px] uppercase tracking-widest opacity-60">Coming to</div>
                                        <div className="text-lg leading-none">App Store</div>
                                    </div>
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative"
                        >
                            <DeviceMockup type="iphone">
                                <div className="relative w-full h-full">
                                    <Image 
                                        src="/projects/chronicle/mockup.png" 
                                        alt="Chronicle App Mockup" 
                                        fill 
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            </DeviceMockup>
                            
                            {/* Floating decorative elements */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl animate-pulse" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl animate-pulse delay-700" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="py-32 container-wide">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Character Engine",
                            desc: "Deep stat tracking with support for complex RPG systems, automatic calculations, and leveling logic.",
                            accent: "from-amber-500 to-orange-700"
                        },
                        {
                            title: "Evolution Path",
                            desc: "Visualize your character's journey with a detailed timeline of stat changes, ability unlocks, and milestones.",
                            accent: "from-violet-500 to-purple-700"
                        },
                        {
                            title: "Inventory Vault",
                            desc: "Manage loot, enchantments, and item sets with a dedicated system designed for high-fantasy settings.",
                            accent: "from-blue-500 to-indigo-700"
                        }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 rounded-[2.5rem] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 relative group overflow-hidden"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.accent} opacity-5 group-hover:opacity-20 blur-3xl transition-opacity`} />
                            <h3 className="text-2xl font-bold mb-4 group-hover:text-amber-500 transition-colors uppercase tracking-tight">{feature.title}</h3>
                            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-light">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Stats Breakdown */}
            <section className="py-24 bg-slate-50 dark:bg-white/5 border-y border-[var(--nav-border)]">
                <div className="container-wide">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center text-slate-500 dark:text-white/80 uppercase tracking-widest font-mono text-[10px]">
                        <div><div className="text-4xl font-black text-slate-900 dark:text-white mb-2">∞</div>Characters</div>
                        <div><div className="text-4xl font-black text-slate-900 dark:text-white mb-2">Sync</div>Real-time</div>
                        <div><div className="text-4xl font-black text-slate-900 dark:text-white mb-2">PRO</div>Author Tools</div>
                        <div><div className="text-4xl font-black text-slate-900 dark:text-white mb-2">10+</div>Systems</div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 container-wide">
                <div className="relative rounded-[3rem] overflow-hidden bg-slate-900 p-12 md:p-24 text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-violet-600/20 opacity-50" />
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8">Ready to start your adventure?</h2>
                        <p className="text-slate-400 text-lg mb-12">Join the waitlist to get early access to Chronicle and revolutionize your LitRPG experience.</p>
                        <Link
                            href="/contact"
                            className="inline-block px-12 py-6 bg-amber-500 text-black font-black rounded-2xl hover:bg-amber-400 transition-all hover:scale-105"
                        >
                            Register Interest
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 text-center text-slate-500 font-mono text-[10px] uppercase tracking-[0.4em]">
                <div className="container-wide flex flex-col md:flex-row justify-between items-center gap-6">
                    <span>© 2026 Mustafa Kanmaz</span>
                    <div className="flex gap-8">
                        <Link href="/chronicle-litrpg-tracker/privacy-policy" className="hover:text-amber-500 transition-colors">Privacy</Link>
                        <Link href="/projects" className="hover:text-amber-500 transition-colors">More Projects</Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}
