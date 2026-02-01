"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
            aria-label="Toggle Theme"
        >
            <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                    {theme === 'dark' ? (
                        <motion.svg
                            key="moon"
                            initial={{ y: 20, opacity: 0, rotate: -45 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: -20, opacity: 0, rotate: 45 }}
                            transition={{ duration: 0.3, ease: "circOut" }}
                            className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </motion.svg>
                    ) : (
                        <motion.svg
                            key="sun"
                            initial={{ y: 20, opacity: 0, rotate: 45 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: -20, opacity: 0, rotate: -45 }}
                            transition={{ duration: 0.3, ease: "circOut" }}
                            className="w-5 h-5 text-amber-500 group-hover:text-amber-400 transition-colors"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l.707-.707M6.343 6.343l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                        </motion.svg>
                    )}
                </AnimatePresence>
            </div>
        </button>
    );
}
