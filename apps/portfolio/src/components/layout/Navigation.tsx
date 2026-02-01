'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useState } from 'react';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Philosophy', path: '/about' },
    { name: 'Work', path: '/projects' },
    { name: 'Contact', path: '/contact' },
];

const Navigation = () => {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:py-8"
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo Area */}
                    <Link href="/" className="text-xl font-bold tracking-tighter text-white z-50 relative mix-blend-difference">
                        MK.
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 bg-black/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/5">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`relative text-sm font-medium transition-colors duration-300 ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}`}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-pill"
                                            className="absolute inset-0 -z-10 bg-white/10 rounded-full -m-2 opacity-100"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setIsMobileOpen(!isMobileOpen)}
                        className="md:hidden z-50 relative w-10 h-10 flex flex-col items-end justify-center gap-1.5 focus:outline-none"
                    >
                        <motion.span animate={isMobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="w-8 h-0.5 bg-white origin-center transition-transform" />
                        <motion.span animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }} className="w-6 h-0.5 bg-white transition-opacity" />
                        <motion.span animate={isMobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="w-4 h-0.5 bg-white origin-center transition-transform" />
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <motion.div
                initial={{ opacity: 0, pointerEvents: "none" }}
                animate={isMobileOpen ? { opacity: 1, pointerEvents: "auto" } : { opacity: 0, pointerEvents: "none" }}
                className="fixed inset-0 bg-background z-40 flex items-center justify-center md:hidden"
            >
                <div className="flex flex-col items-center gap-8">
                    {navItems.map((item, idx) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            onClick={() => setIsMobileOpen(false)}
                            className="text-4xl font-bold text-white hover:text-primary transition-colors"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            </motion.div>
        </>
    );
};

export default Navigation;
