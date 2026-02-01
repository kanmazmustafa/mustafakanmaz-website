'use client';
import { motion } from 'framer-motion';

const Marquee = ({ text, direction = 'left', speed = 20 }: { text: string, direction?: 'left' | 'right', speed?: number }) => {
    return (
        <div className="flex overflow-hidden bg-accent py-4 border-y border-black">
            <motion.div
                initial={{ x: direction === 'left' ? 0 : '-100%' }}
                animate={{ x: direction === 'left' ? '-100%' : 0 }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: speed
                }}
                className="flex whitespace-nowrap"
            >
                {[...Array(4)].map((_, i) => (
                    <span key={i} className="text-4xl font-black uppercase tracking-wider mx-8 text-black">
                        {text}
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export default Marquee;
