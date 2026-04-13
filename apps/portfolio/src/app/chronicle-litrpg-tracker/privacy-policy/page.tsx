import React from 'react';

export default function ChroniclePrivacyPage() {
    return (
        <main className="flex-grow pt-32 pb-24 px-4 min-h-screen bg-background text-foreground transition-colors duration-300">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl md:text-5xl font-black mb-12 tracking-tight">Privacy Policy</h1>
                <div className="prose prose-invert max-w-none text-slate-400 font-light leading-relaxed">
                    <p className="mb-8"><strong>Last Updated:</strong> April 12, 2026</p>

                    <p className="mb-8">
                        This Privacy Policy explains our policies regarding the collection, use, and disclosure of your personal data by <strong>Chronicle: LitRPG Tracker</strong> ("the App"). By downloading, installing, or using the App, you agree to the terms outlined in this Privacy Policy.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">1. Data Collection and Methods</h2>
                    <p className="mb-4">Our App collects the minimum amount of data necessary to provide you with a seamless experience and manage features:</p>
                    <ul className="list-disc pl-6 mb-8 space-y-4">
                        <li>
                            <strong className="text-slate-900 dark:text-slate-200">Authentication Information:</strong> Basic authentication data such as your name, email address, and profile picture may be collected through integrated third-party login systems (e.g., Google Sign-In) to grant access to the App. Your passwords are never seen or stored by us.
                        </li>
                        <li>
                            <strong className="text-slate-900 dark:text-slate-200">Usage and Transaction Data:</strong> Anonymized transaction data is processed via our in-app purchase infrastructure (RevenueCat) to manage account limits (e.g., story and character limits under the free tier) and verify "Freemium" subscription statuses. We do not collect your financial information (credit cards, etc.); this data is processed directly and securely by the respective app stores (Google Play Store, Apple App Store).
                        </li>
                        <li>
                            <strong className="text-slate-900 dark:text-slate-200">In-App Content:</strong> Your generated character statistics, timeline records, and story data may be stored on your device and on secure cloud servers for backup purposes.
                        </li>
                    </ul>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">2. Purpose of Data Use</h2>
                    <p className="mb-4">The collected data is used exclusively to improve the service provided to you, for the following purposes:</p>
                    <ul className="list-disc pl-6 mb-8 space-y-2">
                        <li>To create and manage your user account.</li>
                        <li>To ensure cross-device data synchronization.</li>
                        <li>To ensure the smooth operation of core App features, such as the "Timeline" and shareable "Stat Cards".</li>
                        <li>To monitor and manage user limits (free/premium tiers).</li>
                        <li>To detect bugs and improve the overall performance of the App.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">3. Third-Party Services and Data Sharing</h2>
                    <p className="mb-4">
                        Under no circumstances is your personal data sold to third parties for marketing or advertising purposes. However, to fulfill the core functions of the App, your data may be securely shared with the following infrastructure providers:
                    </p>
                    <ul className="list-disc pl-6 mb-8 space-y-2">
                        <li><strong>Authentication Services:</strong> Google LLC (Google Sign-In).</li>
                        <li><strong>Subscription and Purchase Management:</strong> RevenueCat Inc.</li>
                    </ul>
                    <p className="mb-8 italic">These third-party providers have their own privacy policies, which also apply to the processing of your data.</p>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">4. Data Security</h2>
                    <p className="mb-8">
                        We implement industry-standard security measures to protect your personal data against unauthorized access, alteration, or destruction. However, no method of transmission over the internet is 100% secure; therefore, by using the App, you acknowledge and accept the inherent security risks.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">5. User Rights and Data Deletion</h2>
                    <p className="mb-8">
                        Users have the right to access, correct, or request the complete deletion of their collected data. To permanently delete your account and all associated data (characters, stories, statistics), you can use the account settings menu within the App or contact us directly.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">6. Changes to This Policy</h2>
                    <p className="mb-8">
                        This Privacy Policy may be updated from time to time based on legal or operational requirements. In the event of any changes, the new policy will be posted on this page, and the "Last Updated" date will be revised. Your continued use of the App constitutes your acceptance of the revised policy.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-6">7. Contact Us</h2>
                    <p className="mb-8">
                        If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us via our official channels.
                    </p>
                </div>
            </div>
        </main>
    );
}
