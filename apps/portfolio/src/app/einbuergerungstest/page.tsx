"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import DeviceMockup from '@/components/DeviceMockup';

export default function EinbuergerungstestPage() {
    const { scrollYProgress } = useScroll();
    const rotate = useTransform(scrollYProgress, [0, 0.2], [0, -10]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

    const catalogItems = [
        {
            title: "Smart Learning Hub",
            tag: "CORE EXPERIENCE",
            desc: "A beautifully crafted dashboard that adapts to your learning pace. Access all 16 federal states and practice modes from a single, intuitive interface.",
            image: "/projects/einbuergerungstest/dashboard.jpg",
            features: ["Personalized Dashboard", "Quick Resume", "Score Overview"]
        },
        {
            title: "Smart Explanations",
            tag: "LEARNING QUALITY",
            desc: "Don't just memorize — understand. Every question in the official 2025 BAMF catalog comes with detailed, easy-to-grasp explanations in your chosen language.",
            image: "/projects/einbuergerungstest/explanations.jpg",
            features: ["Easy-to-Understand", "BAMF-Aligned", "Available in 29+ Languages"]
        },
        {
            title: "29+ Languages Support",
            tag: "LOCALIZATION",
            desc: "Break the language barrier. Prepare for the German citizenship test in your native tongue. Switch between German and 29+ other languages instantly.",
            image: "/projects/einbuergerungstest/languages.jpg",
            features: ["Turkish, Arabic, English & more", "29+ Native Languages", "Instant Translation"]
        },
        {
            title: "The Red Zone (Error Review)",
            tag: "MASTERY",
            desc: "Master your mistakes. Every wrong answer is automatically saved here, allowing you to focus on the topics that need the most attention until you're 100% ready.",
            image: "/projects/einbuergerungstest/mistakes.jpg",
            features: ["Smart Question Bank", "Progress Tracking", "Targeted Learning"]
        },
        {
            title: "Real Exam Simulator",
            tag: "SIMULATION",
            desc: "Experience the real thing before the big day. Our simulator mimics the actual exam conditions, timing, and structure used in official testing centers.",
            image: "/projects/einbuergerungstest/quiz.jpg",
            features: ["Official Timer", "33 Original Questions", "Pass/Fail Indicator"]
        },
        {
            title: "State-Specific Preparation",
            tag: "SPECIALIZATION",
            desc: "Master the regional questions. Choose your state and access the specific set of questions that will appear in your local citizenship exam.",
            image: "/projects/einbuergerungstest/states.jpg",
            features: ["All 16 Federal States", "Regional Question Sets", "Updated 2025 Catalog"]
        }
    ];

    const features = [
        {
            title: "Cross-Platform Sync",
            desc: "Start on your phone, continue on the web. Progress is synced across iOS, Android, and Web.",
            icon: "🔄",
            gradient: "from-blue-500/20 to-indigo-500/20"
        },
        {
            title: "Ad-Supported Premium",
            desc: "Unlock premium features! Watch a 30-second ad for 2 hours of unrestricted access.",
            icon: "💎",
            gradient: "from-purple-500/20 to-pink-500/20"
        }
    ];

    const PlatformButtons = ({ className = "" }: { className?: string }) => (
        <div className={`flex flex-wrap items-center justify-center lg:justify-start gap-4 ${className}`}>
            <a
                href="https://play.google.com/store/apps/details?id=com.kanmazmustafa.einbuergerungstest"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-4 bg-white text-black rounded-2xl font-bold hover:scale-105 transition-all flex items-center gap-3 shadow-2xl shadow-primary/5"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.17,10.87C20.07,10.68 19.88,10.5 19.66,10.32L18.73,9.5L16.23,12L18.73,14.5L19.42,13.84C19.78,13.75 20.04,13.62 20.17,13.13L20.89,12.72L21,12L20.89,11.28L20.17,10.87M16.81,8.88L14.54,11.15L6.05,2.66L16.81,8.88Z" /></svg>
                <div className="text-left font-sans">
                    <div className="text-[8px] uppercase tracking-widest opacity-60 font-black">Google Play</div>
                    <div className="text-sm leading-none">Android</div>
                </div>
            </a>

            <a
                href="https://apps.apple.com/us/app/lid-einburgerungstest/id6759058355"
                target="_blank"
                rel="noopener noreferrer"
                className="group px-6 py-4 bg-black/5 dark:bg-[#0b0f19] text-foreground dark:text-white border border-white/10 rounded-2xl font-bold hover:bg-white/5 transition-all flex items-center gap-3 hover:scale-105"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.95C10.1,6.97 11.13,7.82 11.94,7.82C12.73,7.82 13.97,6.85 15.5,6.85C16.14,6.85 17.92,7.09 18.9,8.5C18.82,8.55 16.61,9.84 16.69,12.81C16.77,16.35 19.73,17.54 19.78,17.56C19.75,17.71 19.3,19.26 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.03,3.19 15.55,4.61 14.69,5.63C13.85,6.61 12.6,7.23 11.59,7.15C11.45,5.86 12.12,4.44 13,3.5Z" /></svg>
                <div className="text-left font-sans">
                    <div className="text-[8px] uppercase tracking-widest opacity-60 font-black">App Store</div>
                    <div className="text-sm leading-none">iPhone</div>
                </div>
            </a>

            <a
                href="/einbuergerungstest/app"
                className="group px-6 py-4 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-2xl font-bold hover:bg-amber-500/20 transition-all flex items-center gap-3 hover:scale-105"
            >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                <div className="text-left font-sans">
                    <div className="text-[8px] uppercase tracking-widest opacity-60 font-black">Access link</div>
                    <div className="text-sm leading-none">Web App</div>
                </div>
            </a>
        </div>
    );

    return (
        <main className="min-h-screen bg-[#050510] text-slate-200 selection:bg-amber-500/30 overflow-hidden font-sans">
            {/* Background elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-amber-600/10 rounded-full blur-[160px]" />
                <div className="absolute bottom-[20%] right-[-5%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[140px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(white,transparent_85%)] opacity-[0.05]" />
            </div>

            {/* Hero Section */}
            <section className="relative z-10 pt-32 pb-20">
                <div className="container-wide">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            className="flex-1 text-center lg:text-left"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-xl">
                                <span className="flex h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></span>
                                <span className="text-[10px] font-bold uppercase tracking-[3px] text-amber-500">Edition 2026</span>
                            </div>

                            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.9] mb-8 text-white">
                                German <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600">Citizenship Test.</span>
                            </h1>

                            <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed mb-12 max-w-2xl mx-auto lg:mx-0">
                                Premium preparation for the "Leben in Deutschland" exam. Learn in your own language, sync progress across all platforms, and prepare with confidence using our BAMF-aligned catalog.
                            </p>

                            <PlatformButtons />
                        </motion.div>

                        <motion.div
                            style={{ rotate, scale }}
                            initial={{ opacity: 0, scale: 0.8, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 1.2 }}
                            className="flex-1"
                        >
                            <DeviceMockup className="scale-75 md:scale-100">
                                <div className="p-8 h-full flex flex-col justify-center items-center text-center font-sans">
                                    <div className="w-20 h-20 bg-amber-500/20 rounded-3xl flex items-center justify-center mb-8 border border-amber-500/30">
                                        <span className="text-4xl">🇩🇪</span>
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-white">Welcome</h3>
                                    <p className="text-slate-400 text-sm">Select your federal state to begin.</p>
                                    <div className="mt-12 w-full space-y-3">
                                        <div className="h-10 bg-white/5 rounded-xl border border-white/10 flex items-center px-4 text-[10px] text-slate-500 uppercase font-bold tracking-widest">Berlin</div>
                                        <div className="h-10 bg-amber-500/10 rounded-xl border border-amber-500/20 flex items-center px-4 text-[10px] text-amber-500 uppercase font-bold tracking-widest">Bavaria</div>
                                        <div className="h-10 bg-white/5 rounded-xl border border-white/10 flex items-center px-4 text-[10px] text-slate-500 uppercase font-bold tracking-widest">Hamburg</div>
                                    </div>
                                </div>
                            </DeviceMockup>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CATALOG SECTION: The Visual Experience */}
            <section className="relative z-10 py-32 bg-white/[0.01] border-y border-white/5 overflow-hidden">
                <div className="container-wide">
                    <div className="text-center mb-32">
                        <h2 className="text-sm font-bold uppercase tracking-[4px] text-amber-500 mb-6">Interactive Catalog</h2>
                        <h3 className="text-4xl md:text-7xl font-black text-white tracking-tight">The Visual Experience.</h3>
                    </div>

                    <div className="space-y-40">
                        {catalogItems.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-32`}
                            >
                                <div className="flex-1 space-y-8">
                                    <div className="inline-block px-4 py-2 bg-amber-500/10 text-amber-500 rounded-xl font-mono text-[10px] font-bold tracking-widest">
                                        {item.tag}
                                    </div>
                                    <h4 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none">{item.title}</h4>
                                    <p className="text-xl text-slate-400 font-light leading-relaxed">
                                        {item.desc}
                                    </p>
                                    <ul className="space-y-4 pt-4">
                                        {item.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-3 text-slate-300 font-medium">
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex-1 relative group">
                                    <div className="absolute inset-0 bg-amber-500/10 blur-[100px] rounded-full group-hover:bg-amber-500/20 transition-colors" />
                                    <DeviceMockup containerClassName="relative z-10" className="scale-90 lg:scale-100 group-hover:rotate-1 transition-transform duration-500">
                                        <div className="relative w-full h-full bg-[#0a0a0f] flex items-center justify-center overflow-hidden">
                                            {/* Actual Image Tag */}
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                                }}
                                            />
                                            <div className="hidden text-center text-slate-700 font-mono text-[10px] uppercase tracking-[4px] p-8">
                                                [ Ready for ]<br />{item.title}
                                            </div>
                                        </div>
                                    </DeviceMockup>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SYLLABUS Section (Kept as high-quality info) */}
            <section className="relative z-10 py-32 bg-[#08081a]">
                <div className="container-wide">
                    <div className="text-center mb-24">
                        <h2 className="text-sm font-bold uppercase tracking-[4px] text-amber-500 mb-6">Official Catalog Structure</h2>
                        <h3 className="text-4xl md:text-6xl font-black text-white tracking-tight">100% Alignment</h3>
                        <p className="mt-8 text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
                            Prepared based on the official BAMF question catalog dated <strong className="text-white">May 26, 2025</strong>.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                topic: "Political System",
                                info: "Constitutional structure, basic rights, civil duties, political parties, and the democratic process."
                            },
                            {
                                topic: "History & Post-War",
                                info: "The Third Reich, the split of Germany, Reunification, and the development of the European Union."
                            },
                            {
                                topic: "Integration & Society",
                                info: "Education systems, social security, religious diversity, and co-existence in modern Germany."
                            }
                        ].map((item, i) => (
                            <div key={i} className="relative p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[2.5rem]">
                                <div className="h-full bg-[#050510] p-10 rounded-[2.4rem] flex flex-col font-sans">
                                    <h4 className="text-2xl font-bold text-white mb-6 leading-tight">{item.topic}</h4>
                                    <p className="text-slate-500 text-sm leading-relaxed font-light">{item.info}</p>
                                    <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
                                        <span>BAMF CATALOG</span>
                                        <span className="text-amber-500">310 QUESTIONS</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* EXAM INFO & CTAs */}
            <section className="relative z-10 py-32 border-b border-white/5">
                <div className="container-wide">
                    <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-20 items-center">
                        <div>
                            <h2 className="text-sm font-bold uppercase tracking-[4px] text-amber-500 mb-6">About the Exam</h2>
                            <h3 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight uppercase">BAMF Standardised Testing.</h3>
                            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
                                {[
                                    { title: "33 Total Questions", desc: "30 general questions + 3 federal state questions." },
                                    { title: "60 Minute Limit", desc: "Sufficient time for the 33 multiple-choice questions." },
                                    { title: "BAMF Resources", desc: "Based on official May 2025 publication guidelines." },
                                    { title: "Access Everywhere", desc: "Cross-platform progress sync across all your devices." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                                        <div>
                                            <h4 className="text-white font-bold text-sm uppercase tracking-wide">{item.title}</h4>
                                            <p className="text-slate-500 text-xs mt-1">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-6">
                            <h4 className="text-white font-bold text-xl mb-4">Official Links</h4>
                            <a
                                href="https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Einbuergerung/gesamtfragenkatalog-lebenindeutschland.html?nn=282388"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors group"
                            >
                                <span className="text-xs font-bold text-slate-400 group-hover:text-white">BAMF Catalog PDF</span>
                                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative z-10 py-40 overflow-hidden">
                <div className="absolute inset-0 bg-amber-500 opacity-[0.02]" />
                <div className="container-wide text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-5xl md:text-7xl font-black mb-10 text-white tracking-tight leading-none uppercase">Start Preparing <br /> <span className="text-amber-500">Your Way.</span></h2>
                        <PlatformButtons className="lg:justify-center" />
                        <div className="mt-12">
                            <Link href="/projects" className="text-slate-400 hover:text-white transition-colors underline underline-offset-8 uppercase text-[10px] font-bold tracking-[3px]">
                                Back to Architecture Portfolio
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Minimal Footer */}
            <footer className="relative z-10 py-16 border-t border-white/5 uppercase">
                <div className="container-wide flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 font-mono text-[10px] tracking-[4px]">
                    <div className="flex items-center gap-4">
                        <span>© 2026 Mustafa Kanmaz</span>
                        <div className="w-1 h-1 rounded-full bg-slate-800" />
                        <span>Preparation Specialist</span>
                    </div>
                    <div className="flex gap-8">
                        <Link href="/einbuergerungstest/impressum" className="hover:text-white transition-colors">Impressum</Link>
                        <Link href="/einbuergerungstest/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
                        <a href="mailto:kontakt@mustafakanmaz.com" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </footer>
        </main>
    );
}
