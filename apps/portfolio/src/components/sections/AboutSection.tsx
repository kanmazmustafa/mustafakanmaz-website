'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutSection = () => {

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

    const crafts = [
        {
            number: "01",
            title: "High-Performance Engineering",
            desc: "Optimizing for the millisecond. Ensuring 60fps+ on mobile and virtually zero latency on the edge."
        },
        {
            number: "02",
            title: "Scalable AI Architecture",
            desc: "Designing self-healing swarms and agentic workflows that adapt to complex data streams in real-time."
        },
        {
            number: "03",
            title: "Modern Craftsmanship",
            desc: "Code as art. Meticulous attention to type safety, clean abstractions, and maintainable project structures."
        }
    ];

    return (
        <section ref={containerRef} id="about" className="py-32 bg-background relative z-10">
            <div className="container-wide">

                <div className="flex flex-col md:flex-row gap-16 lg:gap-32">

                    {/* Sticky Header */}
                    <div className="md:w-1/3">
                        <div className="sticky top-32">
                            <h2 className="text-sm font-mono text-primary tracking-widest uppercase mb-6">The Craft</h2>
                            <h3 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                                Redefining what's possible in <span className="text-transparent bg-clip-text bg-gradient-cinematic">digital architecture</span>.
                            </h3>
                        </div>
                    </div>

                    {/* Scrollable Content */}
                    <motion.div style={{ y }} className="md:w-2/3 space-y-24">
                        {crafts.map((item, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                key={idx}
                                className="group border-t border-slate-800 pt-12"
                            >
                                <span className="text-6xl font-black text-slate-800 group-hover:text-slate-700 transition-colors duration-500 select-none block mb-6">{item.number}</span>
                                <h4 className="text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{item.title}</h4>
                                <p className="text-xl text-slate-400 leading-relaxed max-w-lg">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>

            </div>
        </section>
    );
};

export default AboutSection;
