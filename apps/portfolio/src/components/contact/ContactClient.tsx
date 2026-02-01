'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitContactForm } from '@/app/actions/contact';

type Selection = 'none' | 'architecture' | 'energy';

export default function ContactClient() {
    const [selection, setSelection] = useState<Selection>('none');
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[] | undefined>>({});

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("Submitting form...");

        setFormStatus('submitting');
        setErrorMessage(null);
        setFieldErrors({});

        const formData = new FormData(e.currentTarget);

        try {
            const result = await submitContactForm(formData);

            if (!result) {
                throw new Error("Empty response from server");
            }

            if (result.success) {
                setFormStatus('success');
            } else {
                setFormStatus('error');
                if (result.errors) {
                    setFieldErrors(result.errors);
                    setErrorMessage('Please check the highlighted fields.');
                } else {
                    setErrorMessage(result.message || 'Validation failed. Please check your inputs.');
                }
            }
        } catch (e) {
            console.error(e);
            setFormStatus('error');
            // Show the actual client-side error to debug (e.g. "Failed to fetch" or "500")
            setErrorMessage(`System Error: ${e instanceof Error ? e.message : String(e)}`);
        }
    }

    return (
        <div
            onClick={() => setSelection('none')}
            className="container-wide py-12 md:py-24 min-h-screen flex flex-col lg:flex-row gap-12 lg:gap-24 relative z-10 overflow-hidden"
        >
            {/* Premium Background Accents - Exclusive for Light Mode feel */}
            <div className="absolute inset-0 z-[-1] pointer-events-none opacity-30 dark:opacity-0 transition-opacity duration-1000">
                <div className="absolute top-[-5%] right-[-5%] w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-100/40 rounded-full blur-[100px]" />
            </div>

            {/* Left Side: Authority */}
            <div className="flex-1 flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.9] text-slate-950 dark:text-white">
                        Let's build <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-400 to-slate-600 dark:from-slate-500 dark:to-slate-400">exceptional.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-14 max-w-lg leading-relaxed font-light">
                        Based in Germany, operating globally. I bridge the gap between heavy industry and digital intelligence.
                    </p>

                    <div className="flex gap-8 mb-12">
                        <SocialLink href="https://linkedin.com/in/mustafakanmaz" label="LinkedIn" />
                        <SocialLink href="https://github.com/mustafakanmaz" label="GitHub" />
                        <SocialLink href="mailto:hello@mustafakanmaz.com" label="Email" />
                    </div>
                </motion.div>
            </div>

            {/* Right Side: Interaction Router */}
            <div className="flex-1 flex flex-col justify-center gap-6 max-w-xl mx-auto lg:mx-0 w-full">

                {/* Architecture Card */}
                <ServiceCard
                    title="Software Architecture"
                    subtitle="High-Performance Systems & AI"
                    isActive={selection === 'architecture' || selection === 'none'}
                    isDimmed={selection === 'energy'}
                    onClick={() => setSelection('architecture')}
                    expanded={selection === 'architecture'}
                >
                    <AnimatePresence mode="wait">
                        {selection === 'architecture' ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="mt-8"
                            >
                                {formStatus === 'success' ? (
                                    <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-center">
                                        <p className="font-semibold">Message Sent</p>
                                        <p className="text-sm mt-1">I will review your inquiry and respond shortly.</p>
                                        <button
                                            onClick={() => setFormStatus('idle')}
                                            className="mt-4 text-xs underline hover:text-white"
                                        >
                                            Send another
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-4">
                                            <Input
                                                name="name"
                                                label="Name"
                                                error={fieldErrors.name?.[0]}
                                            />
                                            <Input
                                                name="email"
                                                type="email"
                                                label="Email"
                                                error={fieldErrors.email?.[0]}
                                            />
                                            <Textarea
                                                name="message"
                                                label="Project Details"
                                                error={fieldErrors.message?.[0]}
                                            />
                                        </div>

                                        {formStatus === 'error' && errorMessage && (
                                            <p className="text-red-400 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                                                {errorMessage}
                                            </p>
                                        )}

                                        <SubmitButton isSubmitting={formStatus === 'submitting'} />
                                    </form>
                                )}
                            </motion.div>
                        ) : (
                            <div className="mt-4 flex items-center text-indigo-400 text-sm font-semibold tracking-wide uppercase group-hover:translate-x-2 transition-transform">
                                Contact Form <span className="ml-2">→</span>
                            </div>
                        )}
                    </AnimatePresence>
                </ServiceCard>

                {/* Energy Consultancy Card */}
                <ServiceCard
                    title="Energy Consultancy"
                    subtitle="Best Berater Ecosystem"
                    isActive={selection === 'energy' || selection === 'none'}
                    isDimmed={selection === 'architecture'}
                    onClick={() => setSelection('energy')}
                    expanded={selection === 'energy'}
                >
                    <AnimatePresence>
                        {selection === 'energy' ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-8"
                            >
                                <p className="text-slate-400 mb-6 leading-relaxed">
                                    For energy subscription audits, tariff optimization, and industrial consultancy, please visit my specialized platform.
                                </p>
                                <a
                                    href="https://bestberater.de"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex w-full items-center justify-center py-4 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-200 transition-colors"
                                >
                                    Visit BestBerater.de ↗
                                </a>
                            </motion.div>
                        ) : (
                            <div className="mt-4 flex items-center text-indigo-400 text-sm font-semibold tracking-wide uppercase group-hover:translate-x-2 transition-transform">
                                Go to Platform <span className="ml-2">→</span>
                            </div>
                        )}
                    </AnimatePresence>
                </ServiceCard>

                {/* Reset Selection */}
                {selection !== 'none' && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={(e) => { e.stopPropagation(); setSelection('none'); }}
                        className="text-slate-500 hover:text-foreground dark:hover:text-white text-sm text-center py-2 transition-colors"
                    >
                        Cancel / Go Back
                    </motion.button>
                )}
            </div>
        </div>
    );
}

function SocialLink({ href, label }: { href: string; label: string }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-5 bg-white/5 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-full hover:bg-white dark:hover:bg-white/10 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/10 hover:scale-110 transition-all group"
        >
            <span className="sr-only">{label}</span>
            <div className="w-6 h-6 flex items-center justify-center text-slate-900 dark:text-white text-sm font-bold">
                {label[0]}
            </div>
        </a>
    )
}

function ServiceCard({ title, subtitle, children, isActive, isDimmed, onClick, expanded }: any) {
    return (
        <motion.div
            layout
            onClick={(e) => {
                e.stopPropagation();
                if (!expanded && onClick) onClick();
            }}
            className={`
                relative overflow-hidden rounded-[2.5rem] border transition-all duration-500 cursor-pointer
                ${expanded
                    ? 'bg-[var(--card-bg)] border-indigo-500/50 p-10 shadow-2xl shadow-indigo-900/20'
                    : 'bg-white/40 dark:bg-[var(--card-bg)] border-slate-200 dark:border-[var(--card-border)] p-8 hover:border-indigo-500/30 hover:bg-white hover:shadow-2xl hover:shadow-slate-200 dark:hover:shadow-none'}
                ${isDimmed ? 'opacity-40 scale-95 pointer-events-none grayscale' : 'opacity-100'}
            `}
        >
            <div className="flex justify-between items-start">
                <div>
                    <motion.h3 layout="position" className={`font-bold mb-2 tracking-tight ${expanded ? 'text-3xl text-white' : 'text-2xl text-slate-900 dark:text-white'}`}>
                        {title}
                    </motion.h3>
                    <motion.p layout="position" className="text-slate-500 dark:text-slate-400 text-base font-light">{subtitle}</motion.p>
                </div>
                {!expanded && (
                    <div className="w-10 h-10 rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                        <span className="text-xl">↓</span>
                    </div>
                )}
            </div>
            {children}
        </motion.div>
    )
}

function Input({ name, label, type = 'text', error }: { name: string; label: string; type?: string; error?: string }) {
    return (
        <div className="relative group">
            <input
                type={type}
                name={name}
                className={`peer w-full bg-[#020617] border rounded-xl px-4 pt-6 pb-2 text-white outline-none transition-all placeholder-transparent
                ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-indigo-500'}`}
                placeholder={label}
                required
            />
            <label className={`absolute left-4 top-4 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs pointer-events-none
                ${error ? 'text-red-400' : 'text-slate-500 peer-focus:text-indigo-400'}`}>
                {label}
            </label>
            {error && <span className="absolute right-4 top-4 text-xs text-red-400 font-medium">{error}</span>}
        </div>
    )
}

function Textarea({ name, label, error }: { name: string; label: string; error?: string }) {
    return (
        <div className="relative group">
            <textarea
                name={name}
                rows={4}
                className={`peer w-full bg-[#020617] border rounded-xl px-4 pt-6 pb-2 text-white outline-none transition-all placeholder-transparent resize-none
                ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-indigo-500'}`}
                placeholder={label}
            />
            <label className={`absolute left-4 top-4 text-xs transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-xs pointer-events-none
                ${error ? 'text-red-400' : 'text-slate-500 peer-focus:text-indigo-400'}`}>
                {label}
            </label>
            {error && <span className="absolute right-4 top-4 text-xs text-red-400 font-medium">{error}</span>}
        </div>
    )
}

function SubmitButton({ isSubmitting }: { isSubmitting: boolean }) {
    return (
        <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
            {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : "Send Message"}
        </button>
    )
}
