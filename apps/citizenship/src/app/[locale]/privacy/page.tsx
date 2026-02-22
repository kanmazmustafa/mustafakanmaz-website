"use client";

import { useTranslations } from 'next-intl';

export default function PrivacyPage() {
    const t = useTranslations('privacy');

    return (
        <div className="min-h-screen bg-slate-50 py-20 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-slate-100">
                <h1 className="text-4xl font-bold text-slate-900 mb-8 border-b pb-4">Privacy Policy</h1>

                <section className="space-y-6 text-slate-600 leading-relaxed">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-2">1. Introduction & Disclaimer</h2>
                        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4 text-red-800 rounded-r-xl">
                            <strong>Disclaimer:</strong> This app is not an official application of any government agency. The questions are based on the official question catalogue of the Federal Office for Migration and Refugees (BAMF).
                        </div>
                        <p>
                            Welcome to <strong>Einbürgerungstest Deutschland 2026</strong>. This application is an independent educational platform designed to help you prepare for the naturalization test.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-2">2. GDPR Compliance (EU Users)</h2>
                        <p>
                            As we target users in Germany and the EU, we comply with the <strong>General Data Protection Regulation (GDPR)</strong>.
                        </p>
                        <p className="mt-2">
                            <strong>Data Retention & Deletion:</strong> You have the right to access, rectify, or erase any data stored locally on your device or in our secure Firestore database. You can permanently delete your account and all associated data at any time through the app settings.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-2">3. Information Collection and Services</h2>
                        <h3 className="font-bold text-slate-700 mt-4">AdMob (Advertising)</h3>
                        <p>
                            We use <strong>Google AdMob</strong> to display advertisements. To provide relevant ads, AdMob may collect and process data such as device identifiers, approximate location data, and app usage data.
                        </p>

                        <h3 className="font-bold text-slate-700 mt-4">Firebase (Backend)</h3>
                        <p>
                            We use <strong>Google Firebase</strong> for user authentication and progress synchronization. This involves storing your email address and test scores securely on Google's servers.
                        </p>

                        <h3 className="font-bold text-slate-700 mt-4">In-App Purchases</h3>
                        <p>
                            Our application offers in-app purchases processed securely via the <strong>Google Play Store</strong>. We do not have access to your payment details (credit card info, etc.).
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-slate-800 mb-2">4. Contact Us</h2>
                        <p>
                            If you have any questions, suggestions, or privacy concerns, please contact us at:
                        </p>
                        <p className="mt-2 font-bold">
                            <a href="mailto:mustafakanmaz90@gmail.com" className="text-indigo-600 hover:underline">mustafakanmaz90@gmail.com</a>
                        </p>
                    </div>
                </section>

                <footer className="mt-12 pt-8 border-t text-center text-slate-400 text-sm">
                    &copy; 2026 Mustafa Kanmaz. All rights reserved.
                </footer>
            </div>
        </div>
    );
}
