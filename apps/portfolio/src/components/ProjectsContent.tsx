'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const projects = [
    {
        id: 1,
        title: "Selecho App",
        category: "Mobile Application",
        description: "A distributed operating system layer for agentic AI clusters.", // User didn't ask to change description, but title change seems appropriate given the link. I'll keep description unless obvious. Actually "Selecho" implies selection/echo? I'll stick to USER REQUEST: "just add link". I will NOT change title unless I know what it is.
        // Wait, "Nebula OS" with a Play Store link might be weird. 
        // User said: projeler kısmındaki birinci bölüme bunu ekle "..."
        // I will add the link property. I will optionally wrapping the card.
        link: "https://play.google.com/store/apps/details?id=com.selecho.app",
        gradient: "from-blue-600 to-indigo-600"
    },
    {
        id: 2,
        title: "Ham Radio Exam Prep: 29+ Langs",
        category: "Education & Utility",
        description: "Comprehensive preparation tool for Ham Radio exams supporting 29+ languages.",
        gradient: "from-indigo-500 to-purple-500",
        link: "/ham-radio-exam-prep"
    },
    {
        id: 5,
        title: "CCSE 2026: Test Nacionalidad",
        category: "Education & Utility",
        description: "Official preparation guide for the Spanish constitutional and sociocultural knowledge test.",
        gradient: "from-red-500 to-yellow-500",
        link: "/ccse-2026-test-nacionalidad"
    },
    {
        id: 3,
        title: "Aether Health",
        category: "Healthcare AI",
        description: "Patient diagnostic dashboard powered by generative medical models.",
        gradient: "from-teal-500 to-emerald-500"
    },
    {
        id: 4,
        title: "Flux Commerce",
        category: "E-Commerce",
        description: "Headless commerce engine capable of handling 100k requests/second.",
        gradient: "from-orange-500 to-red-500"
    }
];

export default function ProjectsContent() {
    return (
        <div className="container-wide py-24 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-16"
            >
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Selected Work</h1>
                <p className="text-xl text-slate-400">A curation of high-impact engineering.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="group relative h-[400px] rounded-3xl overflow-hidden bg-slate-900 border border-white/5 hover:border-white/10 transition-colors"
                    >
                        {/* Link Overlay */}
                        {(project as any).link && (
                            (project as any).link.startsWith('/') ? (
                                <Link
                                    href={(project as any).link}
                                    className="absolute inset-0 z-20 focus:outline-none"
                                    aria-label={`View ${project.title}`}
                                />
                            ) : (
                                <a
                                    href={(project as any).link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 z-20 focus:outline-none"
                                    aria-label={`View ${project.title}`}
                                />
                            )
                        )}

                        {/* Background Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />

                        <div className="absolute bottom-0 left-0 right-0 p-8 pointer-events-none">
                            <span className="text-xs font-mono uppercase tracking-widest text-white/50 mb-2 block">{project.category}</span>
                            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{project.title}</h3>
                            <p className="text-slate-400 line-clamp-2 mb-6">{project.description}</p>

                            <div className="flex items-center gap-2 text-sm font-medium text-white opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                <span>View Case Study</span>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>

                        {/* Interactive Spotlight Effect (Simplified) */}
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
