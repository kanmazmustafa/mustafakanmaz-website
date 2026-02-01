'use client';
import React from 'react';

const ContactSection = () => {
    return (
        <section id="contact" className="py-32 bg-black text-white relative overflow-hidden">
            <div className="container-wide relative z-10">

                <div className="max-w-4xl">
                    <h2 className="text-5xl md:text-7xl font-bold mb-12 leading-tight">
                        Ready to architect the <span className="text-primary">next generation</span> of digital systems?
                    </h2>
                    <a href="mailto:hello@mustafakanmaz.com" className="text-2xl md:text-3xl border-b border-white/20 pb-2 hover:text-primary hover:border-primary transition-all inline-block">
                        hello@mustafakanmaz.com
                    </a>
                </div>

                <div className="mt-40 flex flex-col md:flex-row justify-between items-end border-t border-white/10 pt-8">
                    <div className="text-slate-500 text-sm">
                        <p>&copy; 2026 Mustafa Kanmaz.</p>
                        <p>Designed & Engineered in Istanbul.</p>
                    </div>

                    <div className="flex gap-8 mt-8 md:mt-0">
                        {['LinkedIn', 'GitHub', 'Twitter', 'Instagram'].map((social) => (
                            <a key={social} href="/coming-soon" className="text-slate-400 hover:text-white uppercase tracking-wider text-xs font-bold transition-colors">
                                {social}
                            </a>
                        ))}
                    </div>
                </div>

            </div>

            {/* Background Glow */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[150px] rounded-full pointer-events-none"></div>
        </section>
    );
};

export default ContactSection;
