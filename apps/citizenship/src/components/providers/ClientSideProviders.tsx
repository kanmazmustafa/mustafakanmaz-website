"use client";

import dynamic from 'next/dynamic';

/* filepath: apps/citizenship/src/components/providers/ClientSideProviders.tsx */

const SyncManager = dynamic(() => import('@/components/auth/SyncManager').then(mod => mod.SyncManager), { ssr: false });
const DisclaimerOverlay = dynamic(() => import('@/components/common/DisclaimerOverlay').then(mod => mod.DisclaimerOverlay), { ssr: false });

export function ClientSideProviders() {
    return (
        <>
            <SyncManager />
            <DisclaimerOverlay />
        </>
    );
}
