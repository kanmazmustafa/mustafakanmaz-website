import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyADPoEcawQirCgAPah89H_E5X8SDnOmFpQ",
    authDomain: "einburgeringtest-2026.firebaseapp.com",
    projectId: "einburgeringtest-2026",
    storageBucket: "einburgeringtest-2026.firebasestorage.app",
    messagingSenderId: "800048961892",
    appId: "1:800048961892:web:2c6047d4ffb73350830271"
};

// Initialize Firebase (Singleton pattern)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
