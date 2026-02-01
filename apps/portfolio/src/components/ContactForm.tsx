'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export function ContactForm() {
    const [focusedField, setFocusedField] = useState<string | null>(null);

    return (
        <form className="space-y-6">
            <div className="relative">
                <label
                    htmlFor="name"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'name' || true ? 'top-2 text-xs text-indigo-400' : 'top-4 text-slate-500'}`}
                >
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-white outline-none focus:border-indigo-500 transition-colors"
                />
            </div>

            <div className="relative">
                <label
                    htmlFor="email"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'email' || true ? 'top-2 text-xs text-indigo-400' : 'top-4 text-slate-500'}`}
                >
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-white outline-none focus:border-indigo-500 transition-colors"
                />
            </div>

            <div className="relative">
                <label
                    htmlFor="message"
                    className={`absolute left-4 transition-all duration-300 pointer-events-none ${focusedField === 'message' || true ? 'top-2 text-xs text-indigo-400' : 'top-4 text-slate-500'}`}
                >
                    Message
                </label>
                <textarea
                    id="message"
                    name="message"
                    rows={4}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-white outline-none focus:border-indigo-500 transition-colors resize-none"
                />
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="w-full py-4 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-500/20"
            >
                Send Message
            </motion.button>
        </form>
    );
}
