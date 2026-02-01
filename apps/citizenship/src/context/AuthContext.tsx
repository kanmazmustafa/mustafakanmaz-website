"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut as firebaseSignOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
    deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signOut: async () => { },
    deleteAccount: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signOut = async () => {
        await firebaseSignOut(auth);
    };

    const deleteAccount = async () => {
        if (!user) return;
        const { deleteUser } = await import("firebase/auth");
        const { deleteFirestoreUserData } = await import("@/lib/sync-service");

        try {
            // 1. Delete data from Firestore
            await deleteFirestoreUserData(user.uid);
            // 2. Delete user from Firebase Auth
            await deleteUser(user);
            console.log("User account deleted successfully");
        } catch (error) {
            console.error("Error deleting user account:", error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, signOut, deleteAccount }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
