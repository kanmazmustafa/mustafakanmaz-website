'use client';
import React from 'react';
import { motion } from 'framer-motion';

const ProjectsSection = () => {

    const projects = [
        {
            title: "Nebula Protocol",
            cat: "Web3 / Architecture",
            img: "bg-gradient-to-br from-blue-900 to-slate-900"
        },
        {
            title: "Hyper-Agent",
            cat: "AI / Systems",
            img: "bg-gradient-to-br from-violet-900 to-slate-900"
        },
        {
            title: "Void Analytics",
            cat: "Data / Mobile",
            img: "bg-gradient-to-br from-emerald-900 to-slate-900"
        }
    ];

    return (
        <section id="projects" className="py-32 bg-[#020617] relative">
            <div className="container-wide">

                <div className="flex overflow-hidden pb-12 items-end justify-between border-b border-white/5 mb-20">
                    <h2 className="text-[8vw] lg:text-[6vw] font-black uppercase text-foreground leading-[0.8]">Selected<br />Works</h2>
                    <span className="hidden md:block text-slate-500 font-mono text-sm">( 2024 - 2026 )</span>
                </div>

                <div className="grid gap-y-32">
                    {projects.map((p, i) => (
                        <div key={i} className="group relative">
                            <div className={`aspect-video w-full rounded-sm ${p.img} opacity-80 group-hover:opacity-100 transition-opacity duration-700 relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

                                {/* Simulated Content in Project Card */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="px-8 py-3 border border-white/20 bg-black/50 backdrop-blur-md rounded-full text-white uppercase tracking-widest text-sm">View Case Study</div>
                                </div>
                            </div>

                            <div className="flex justify-between items-start mt-8">
                                <div>
                                    <h3 className="text-4xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                                    <p className="text-slate-500 text-lg">{p.cat}</p>
                                </div>
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white group-hover:rotate-45 transition-transform duration-500">
                                    ↗
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-32 text-center">
                    <a href="/coming-soon" className="inline-block border-b border-primary pb-1 text-primary hover:text-white transition-colors uppercase tracking-widest text-sm">View All Projects</a>
                </div>

            </div>
        </section>
    );
};

export default ProjectsSection;
