"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    User,
    signOut as firebaseSignOut,
    GoogleAuthProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    OAuthProvider
} from "firebase/auth";
import { auth } from "@/apps/citizenship/lib/firebase";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
    deleteAccount: () => Promise<void>;
    googleSignIn: () => Promise<void>;
    appleSignIn: () => Promise<void>;
    guestSignIn: () => Promise<void>;
    signInWithEmail: (email: string, pass: string) => Promise<void>;
    signUpWithEmail: (email: string, pass: string) => Promise<User>;
    sendPasswordReset: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signOut: async () => { },
    deleteAccount: async () => { },
    googleSignIn: async () => { },
    appleSignIn: async () => { },
    guestSignIn: async () => { },
    signInWithEmail: async () => { },
    signUpWithEmail: async () => { return {} as User },
    sendPasswordReset: async () => { },
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

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error signing in with Google", error);
            throw error;
        }
    };

    const appleSignIn = async () => {
        const provider = new OAuthProvider('apple.com');
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error("Error signing in with Apple", error);
            throw error;
        }
    };

    const guestSignIn = async () => {
        const { signInAnonymously } = await import("firebase/auth");
        try {
            await signInAnonymously(auth);
        } catch (error) {
            console.error("Error signing in anonymously", error);
            throw error;
        }
    };

    const signInWithEmail = async (email: string, pass: string) => {
        await signInWithEmailAndPassword(auth, email, pass);
    };

    const signUpWithEmail = async (email: string, pass: string) => {
        const result = await createUserWithEmailAndPassword(auth, email, pass);
        return result.user;
    };

    const sendPasswordReset = async (email: string) => {
        const { sendPasswordResetEmail } = await import("firebase/auth");
        await sendPasswordResetEmail(auth, email);
    };

    const deleteAccount = async () => {
        if (!user) return;
        const { deleteUser } = await import("firebase/auth");
        const { deleteFirestoreUserData } = await import("@/apps/citizenship/lib/sync-service");

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
        <AuthContext.Provider value={{
            user,
            loading,
            signOut,
            deleteAccount,
            googleSignIn,
            appleSignIn,
            guestSignIn,
            signInWithEmail,
            signUpWithEmail,
            sendPasswordReset
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
