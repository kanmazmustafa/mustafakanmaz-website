import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export interface SyncData {
    mistakes: number[];
    mastered: number[];
    selectedState: string;
    selectedLanguage: string;
    rewardedUntil: number | null;
    hasAcceptedDisclaimer: boolean;
    isPremium?: boolean; // Read-only from server point of view during upload
    lastIndices: Record<string, number>;
    streaks: Record<number, number>;
    bookmarks: number[];
    updatedAt: number;
}

/**
 * Uploads user data to Firestore. 
 * Path: users/{uid}/sync/progress
 */
export async function uploadUserData(uid: string, data: SyncData) {
    try {
        // Update progress in subcollection
        const progressRef = doc(db, "users", uid, "sync", "progress");
        await setDoc(progressRef, {
            ...data,
            updatedAt: serverTimestamp(),
        }, { merge: true });

        // Update last login on main user doc
        const userRef = doc(db, "users", uid);
        await setDoc(userRef, {
            lastLogin: serverTimestamp(),
        }, { merge: true });

        return Date.now();
    } catch (error) {
        console.error("Error uploading user data:", error);
        throw error;
    }
}

/**
 * Downloads user data from Firestore.
 */
export async function downloadUserData(uid: string): Promise<Partial<SyncData> | null> {
    try {
        const progressRef = doc(db, "users", uid, "sync", "progress");
        const docSnap = await getDoc(progressRef);

        if (docSnap.exists()) {
            return docSnap.data() as Partial<SyncData>;
        }

        // Fallback to main doc if sync/progress doesn't exist yet
        const userRef = doc(db, "users", uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            return {
                isPremium: userSnap.data().isPremium,
            };
        }

        return null;
    } catch (error) {
        console.error("Error downloading user data:", error);
        throw error;
    }
}

/**
 * Deletes all user data from Firestore.
 */
export async function deleteFirestoreUserData(uid: string) {
    try {
        const { deleteDoc } = await import("firebase/firestore");
        const progressRef = doc(db, "users", uid, "sync", "progress");
        const userRef = doc(db, "users", uid);

        await deleteDoc(progressRef);
        await deleteDoc(userRef);

        console.log("Firestore data deleted for user:", uid);
    } catch (error) {
        console.error("Error deleting Firestore user data:", error);
        throw error;
    }
}
