'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface DeviceMockupProps {
    type?: 'iphone' | 'android';
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
}

export default function DeviceMockup({
    type = 'iphone',
    children,
    className = '',
    containerClassName = ''
}: DeviceMockupProps) {
    if (type === 'iphone') {
        return (
            <div className={`relative mx-auto ${containerClassName}`}>
                {/* Physical Frame */}
                <div className={`relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[8px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl overflow-hidden ${className}`}>
                    {/* Top Notch/Dynamic Island */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-24 bg-gray-800 rounded-b-xl z-20"></div>

                    {/* Side Buttons (Visual Only) */}
                    <div className="absolute -left-[10px] top-24 h-12 w-[3px] bg-gray-700 rounded-l-md"></div>
                    <div className="absolute -left-[10px] top-40 h-16 w-[3px] bg-gray-700 rounded-l-md"></div>
                    <div className="absolute -right-[10px] top-32 h-16 w-[3px] bg-gray-700 rounded-r-md"></div>

                    {/* Internal Screen */}
                    <div className="relative w-full h-full bg-slate-900 overflow-hidden">
                        {children}

                        {/* Realistic Glass Reflection Overlay */}
                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 via-transparent to-transparent z-10"></div>
                    </div>
                </div>

                {/* Glow/Shadow beneath device */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-10 bg-black/20 blur-2xl rounded-full z-0"></div>
            </div>
        );
    }

    // Simplified Android Frame
    return (
        <div className={`relative mx-auto ${className}`}>
            <div className="relative mx-auto border-gray-900 border-[6px] rounded-[2rem] h-[600px] w-[300px] shadow-2xl overflow-hidden bg-gray-900">
                {/* Camera Punch Hole */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 h-3 w-3 bg-black rounded-full z-20"></div>

                {/* Internal Screen */}
                <div className="relative w-full h-full bg-slate-900 overflow-hidden">
                    {children}
                </div>
            </div>
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-10 bg-black/20 blur-2xl rounded-full z-0"></div>
        </div>
    );
}
