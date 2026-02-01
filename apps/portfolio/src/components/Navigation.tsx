'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
];

import ThemeToggle from './ThemeToggle';

export default function Navigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [mobileMenuOpen]);

    return (
        <>
            {/* Desktop & Mobile Header Container */}
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
            >
                {/* Floating Glass Capsule */}
                <nav className="relative flex items-center p-2 rounded-full bg-[var(--nav-bg)] backdrop-blur-xl border border-[var(--nav-border)] shadow-2xl shadow-indigo-500/10">

                    {/* Logo Area */}
                    <Link href="/" className="px-4 py-2 flex items-center gap-2 group">
                        <span className="text-2xl font-display font-medium tracking-tight text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                            MK
                        </span>
                    </Link>

                    {/* Divider */}
                    <div className="w-px h-6 bg-slate-900/10 dark:bg-white/10 mx-2 hidden md:block" />

                    {/* Desktop Menu Items */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={clsx(
                                        'relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300',
                                        isActive ? 'text-slate-900 dark:text-white' : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                                    )}
                                >
                                    <span className="relative z-10">{item.name}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-slate-900/10 dark:bg-white/10 rounded-full border border-slate-900/5 dark:border-white/5"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Divider & Theme Toggle */}
                    <div className="w-px h-6 bg-slate-900/10 dark:bg-white/10 mx-2" />
                    <div className="flex items-center gap-2 pr-1">
                        <ThemeToggle />

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(true)}
                            className="md:hidden p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-900/5 dark:hover:bg-white/10 transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                </nav>
            </motion.header>

            {/* Mobile Fullscreen Menu Overlay */}
            <motion.div
                initial={false}
                animate={mobileMenuOpen ? 'open' : 'closed'}
                variants={{
                    open: { opacity: 1, pointerEvents: 'auto' },
                    closed: { opacity: 0, pointerEvents: 'none' }
                }}
                className="fixed inset-0 z-50 bg-background/95 backdrop-blur-2xl flex flex-col items-center justify-center md:hidden"
            >
                {/* Close Button */}
                <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="absolute top-8 right-8 p-3 rounded-full bg-black/5 dark:bg-white/5 text-slate-500 hover:text-foreground dark:text-slate-400 dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <nav className="flex flex-col items-center gap-8">
                    {navItems.map((item, i) => (
                        <motion.div
                            key={item.path}
                            variants={{
                                open: { opacity: 1, y: 0, transition: { delay: 0.1 + i * 0.1 } },
                                closed: { opacity: 0, y: 20 }
                            }}
                        >
                            <Link
                                href={item.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={clsx(
                                    'text-4xl font-black tracking-tight transition-colors',
                                    pathname === item.path ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                                )}
                            >
                                {item.name}
                            </Link>
                        </motion.div>
                    ))}
                </nav>

                <div className="absolute bottom-12 text-slate-500 text-sm font-mono">
                    mustafakanmaz.com
                </div>
            </motion.div>
        </>
    );
}
