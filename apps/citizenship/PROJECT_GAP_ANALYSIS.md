# Flutter vs. Next.js Feature Parity Report

An overview of implemented features and identified gaps in the Next.js (Web) version compared to the original Flutter (Mobile/Web) application.

## ✅ Implemented in Next.js
*   **Core Quiz Engine:** Random question selection, timer (60 min), success/fail logic (17/33 baseline).
*   **Authentication:** Firebase Auth (Email/Google) with state management via Zustand.
*   **Localization:** Support for 29 languages with dynamic explanation loading.
*   **State Selection:** Interactive Germany map for choosing the relevant state (Eyalet).
*   **Basic Dashboard:** Progress cards and success rate calculation.
*   **Responsive UI:** Tailwind CSS, Framer Motion, and Side Ad layouts for wide screens.
*   **Monetization (Part 1):** Google AdSense integration (Banners & Sidebars) with responsive hiding for Premium users.
*   **Monetization (Part 2):** Stripe Payment Gateway integration for Lifetime Premium purchases.
*   **Premium System:** "Premium Member" badges and ad-removal logic.
*   **Rewarded Access:** 2-hour ad-free mode after "watching" a rewarded ad with auto-redirection.
*   **Disclaimer Screen:** Persistent legal warning overlay with 29-language support.

## ❌ Missing or Incomplete in Next.js

*   **Interstitial Ads:** Transition ads between screens are not yet implemented.
*   **Bookmarking:** Ability to "star" or bookmark specific questions for later.
*   **Filtered Practice:** More granular filtering (e.g., by specific sub-categories or state vs. general).
*   **First-Run Flow:** The splash-to-setup sequence (selecting language/state before the dashboard) is not yet formalized in Next.js.
*   **Sync Service:** Explicit logic for handling local data sync with Firestore during offline/online transitions.
*   **Sharing:** No "Share App" functionality implemented for the web environment yet.

## 🛠️ Recommended Next Steps
1.  **Sync Service:** Ensure user progress (mistakes, mastered questions) is fully synced with Firestore. (Phase 7)
2.  **Bookmarking:** Add the ability to star questions.
3.  **Interstitial Ads:** Implement full-screen ads for page transitions.
4.  **First-Run Flow:** Formalize the onboarding experience.
