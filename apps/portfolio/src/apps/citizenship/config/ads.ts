export const AD_CONFIG = {
    // Client ID is loaded from environment variable .env.local
    // Format: "ca-pub-XXXXXXXXXXXXXXXX"
    CLIENT_ID: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "",

    // Ad Slot IDs - You must create these in your Google AdSense Dashboard
    // Dashboard -> Ads -> Overview -> By ad unit
    SLOTS: {
        // Shown on the main dashboard page
        DASHBOARD_BANNER: "8773580651",

        // Shown on the side of pages on desktop
        SIDEBAR_RIGHT: "9560048710",
        SIDEBAR_LEFT: "9560048710",

        // Shown inside the quiz runner at the bottom
        QUIZ_BOTTOM_BANNER: "1893806528",

        // Shown on the result page
        RESULT_BANNER: "7506716540",

        // Use this for any specialized ad units
        IN_ARTICLE: "8773580651"
    },

    // Toggle different ad types globally
    ENABLED: {
        SIDEBAR: true,
        BANNER: true,
        INTERSTITIAL: true
    }
};
