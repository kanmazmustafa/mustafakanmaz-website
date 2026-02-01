'use client';

import { motion, Variants } from 'framer-motion';
import Link from 'next/link';

const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.8, ease: "easeOut" }
    })
};

export default function AboutContent() {
    return (
        <div className="container-wide py-24 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    custom={0}
                    variants={fadeIn}
                    className="mb-16"
                >
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
                        The intersection of <span className="text-indigo-400">Business Strategy</span> and <span className="text-blue-400">Software Architecture</span>.
                    </h1>
                </motion.div>

                <div className="space-y-16 text-lg md:text-xl text-slate-400 leading-relaxed font-light">
                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={1}
                        variants={fadeIn}
                    >
                        <h2 className="text-2xl text-white font-medium mb-4">Philosophy</h2>
                        <p>
                            We are entering an era where software is no longer just a tool, but an extension of business intent. My work focuses on
                            <strong className="text-white font-normal"> Agentic Workflows</strong> and <strong className="text-white font-normal">Industrial Optimization</strong> — systems that don't just execute commands, but anticipate needs and drive specialized workflows.
                        </p>
                    </motion.section>

                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={2}
                        variants={fadeIn}
                    >
                        <h2 className="text-2xl text-white font-medium mb-4">Domain Expertise: Energy Sector</h2>
                        <p className="mb-6">
                            As the founder of <a href="https://bestberater.de" target="_blank" className="text-indigo-400 hover:text-indigo-300 transition-colors">Best Berater</a>, I don't just write code; I navigate the complexities of the German energy market.
                            I bridge the gap between <strong>Energy Subscription Consulting</strong> and <strong>High-Performance Software</strong>.
                        </p>
                        <p className="mb-6">
                            This dual perspective allows me to architect systems that are not only technically superior but are fundamentally aligned with business KPIs.
                            I build the automated engines that power modern consultancy.
                        </p>
                    </motion.section>


                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={2}
                        variants={fadeIn}
                    >
                        <h2 className="text-2xl text-white font-medium mb-4">Craftsmanship</h2>
                        <p className="mb-6">
                            I believe in "Digital Heavy Industry." Building robust, scalable, and aesthetically perfect systems requires easier said than done discipline.
                            From the byte-level optimization of database queries to the sub-millisecond physics of a UI interaction, every detail matters.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-base">
                            <Link
                                href="/projects"
                                className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-white font-semibold group-hover:text-indigo-400 transition-colors">Software Portfolio</h3>
                                    <span className="text-slate-500 group-hover:text-white transition-colors">→</span>
                                </div>
                                <p className="text-slate-500 group-hover:text-slate-400 transition-colors">
                                    Explore high-performance applications, agentic AI workflows, and distributed system architectures.
                                </p>
                            </Link>

                            <a
                                href="https://bestberater.de"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-6 rounded-2xl bg-slate-900/50 border border-white/5 hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all group"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-white font-semibold group-hover:text-indigo-400 transition-colors">Best Berater</h3>
                                    <span className="text-slate-500 group-hover:text-white transition-colors">↗</span>
                                </div>
                                <p className="text-slate-500 group-hover:text-slate-400 transition-colors">
                                    Strategic energy consultancy and subscription optimization platform for the German market.
                                </p>
                            </a>
                        </div>
                    </motion.section>

                    <motion.section
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={3}
                        variants={fadeIn}
                    >
                        <h2 className="text-2xl text-white font-medium mb-4">Global Impact</h2>
                        <p>
                            Working as an Independent Software Architect, I partner with forward-thinking companies to build the impossible.
                            My goal is to elevate the standard of digital products globally.
                        </p>
                    </motion.section>
                </div>
            </div>
        </div>
    );
}
