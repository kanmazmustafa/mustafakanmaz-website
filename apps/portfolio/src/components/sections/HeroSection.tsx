'use client';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const HeroSection = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const yText = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]); // Reduced parallax movement
    const opacityText = useTransform(scrollYProgress, [0, 0.8], [1, 0]); // Fades out much later

    return (
        <section ref={targetRef} className="min-h-screen bg-background relative flex flex-col justify-center overflow-hidden py-24 md:py-0 transition-colors duration-300">

            {/* Parallax Background */}
            <motion.div style={{ y: yBackground }} className="absolute inset-0 z-0 transition-opacity duration-1000">
                <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-indigo-200/20 dark:bg-indigo-600/20 rounded-full blur-[140px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[800px] h-[800px] bg-blue-100/30 dark:bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slower" />
            </motion.div>

            {/* Content */}
            <div className="container-wide relative z-10">
                <motion.div
                    style={{ y: yText, opacity: opacityText }}
                    className="flex flex-col"
                >
                    {/* Massive Typography */}
                    <div className="relative mb-8 md:mb-12">
                        <motion.h1
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="text-7xl md:text-[10rem] font-black tracking-[-0.05em] text-slate-950 dark:text-white leading-[0.8] select-none"
                        >
                            MUSTAFA
                        </motion.h1>
                        <motion.h1
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="text-7xl md:text-[10rem] font-black tracking-[-0.05em] text-slate-200 dark:text-slate-500/20 leading-[0.8] select-none ml-10 md:ml-24"
                        >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 dark:from-slate-500/20 dark:to-slate-500/10">KANMAZ</span>
                        </motion.h1>
                    </div>

                    {/* Subtext & CTA */}
                    <div className="mt-8 md:mt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8 md:gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="max-w-2xl"
                        >
                            <div className="h-px w-12 bg-indigo-500 mb-6" />
                            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-4 leading-tight">
                                Architecting High-Performance Systems and Agentic AI Workflows
                            </h2>
                            <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed mb-6">
                                Defining the next generation of software craftsmanship through strategic AI integration and scalable system design. Specializing in the development of autonomous agent workflows that optimize complex business operations and high-performance mobile architectures.
                            </p>
                            <p className="text-slate-500 font-mono text-xs md:text-sm">
                                Engineering the future of intelligent systems. Let’s architect your next-generation solution.
                            </p>
                        </motion.div>

                        <div className="flex flex-col sm:flex-row items-center gap-6 mb-4 h-fit">
                            <MagneticButton href="/projects">
                                Explore Portfolio
                            </MagneticButton>
                            <Link
                                href="/contact"
                                className="px-8 py-4 rounded-full border border-slate-200 dark:border-white/10 text-sm font-bold tracking-[0.2em] uppercase text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5 transition-all shadow-sm hover:shadow-md"
                            >
                                Let's Talk
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
    const ySpring = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const posX = e.clientX - left - width / 2;
        const posY = e.clientY - top - height / 2;
        x.set(posX * 0.3);
        y.set(posY * 0.3);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: xSpring, y: ySpring }}
            className="relative inline-flex mb-2"
        >
            <Link
                href={href}
                ref={ref}
                className="relative inline-flex items-center justify-center px-10 py-4 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-bold overflow-hidden group cursor-pointer shadow-xl shadow-indigo-500/10 transition-all hover:scale-105"
            >
                <span className="relative z-10 group-hover:text-indigo-200 dark:group-hover:text-indigo-600 transition-colors duration-300">{children}</span>
                <div className="absolute inset-0 bg-indigo-50/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
        </motion.div>
    );
}

export default HeroSection;
