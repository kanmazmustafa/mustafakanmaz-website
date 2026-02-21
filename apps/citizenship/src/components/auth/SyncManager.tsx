"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { useUserStore } from "@/store/user-store";
import { uploadUserData, downloadUserData, SyncData } from "@/lib/sync-service";

export function SyncManager() {
    const { user } = useAuth();
    const store = useUserStore();
    const { isHydrated, setSyncStatus, setAllData } = store;
    const initialFetchDone = useRef(false);
    const lastUploadedData = useRef<string>("");

    // 1. Initial Fetch on Login
    useEffect(() => {
        if (!user || !isHydrated || initialFetchDone.current) return;

        const performInitialFetch = async () => {
            setSyncStatus(true);
            try {
                const cloudData = await downloadUserData(user.uid);
                if (cloudData) {
                    console.log("SyncManager: Cloud data found, merging...");
                    // Merge logic: Simple merge for now
                    // In a real app, you might compare timestamps
                    setAllData(cloudData);
                }
                initialFetchDone.current = true;
                setSyncStatus(false, Date.now());
            } catch (error) {
                console.error("SyncManager: Initial fetch failed", error);
                setSyncStatus(false);
            }
        };

        performInitialFetch();
    }, [user, isHydrated, setSyncStatus, setAllData]);

    // 2. Debounced Upload on Store Changes
    useEffect(() => {
        if (!user || !isHydrated || !initialFetchDone.current) return;

        // Extract only the data we want to sync
        const dataToSync: SyncData = {
            mistakes: store.mistakes,
            mastered: store.mastered,
            selectedState: store.selectedState || "",
            selectedLanguage: store.selectedLanguage,
            rewardedUntil: store.rewardedUntil,
            hasAcceptedDisclaimer: store.hasAcceptedDisclaimer,
            isPremium: store.isPremium,
            lastIndices: store.lastIndices,
            streaks: store.streaks,
            bookmarks: store.bookmarks,
        };

        const dataString = JSON.stringify(dataToSync);

        // Only upload if data actually changed
        if (dataString === lastUploadedData.current) return;

        const timeoutId = setTimeout(async () => {
            setSyncStatus(true);
            try {
                await uploadUserData(user.uid, dataToSync);
                lastUploadedData.current = dataString;
                setSyncStatus(false, Date.now());
                console.log("SyncManager: Data synced to cloud");
            } catch (error) {
                console.error("SyncManager: Upload failed", error);
                setSyncStatus(false);
            }
        }, 3000); // 3-second debounce

        return () => clearTimeout(timeoutId);
    }, [
        user,
        isHydrated,
        store.mistakes,
        store.mastered,
        store.selectedState,
        store.selectedLanguage,
        store.rewardedUntil,
        store.hasAcceptedDisclaimer,
        store.isPremium,
        store.lastIndices,
        store.streaks,
        store.bookmarks,
        setSyncStatus
    ]);

    return null; // Headless component
}
