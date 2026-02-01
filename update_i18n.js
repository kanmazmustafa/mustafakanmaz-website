const fs = require('fs');
const path = require('path');

const messagesDir = 'c:/Users/musta/Desktop/software/mustafakanmaz.com/apps/portfolio/messages';
const excludedFiles = ['en.json', 'tr.json', 'de.json'];

const newKeys = {
    auth: {
        forgot_password_success: "Password reset email sent!",
        guest_warning_title: "Guest Access Warning",
        guest_warning_body: "In guest mode, your progress will not be saved and you will not be able to continue from where you left off in your next session. Do you still want to continue?"
    },
    dashboard: {
        logout_title: "Confirm Logout",
        day_streak: "{count} Day Streak",
        login_btn: "Login",
        exam_mode: "Exam Mode",
        exam_mode_desc: "Real exam conditions",
        language_placeholder: "Language",
        logout: "Logout",
        select_state_placeholder: "Select State",
        subtitle: "Track your progress and prepare for the exam."
    },
    common: {
        re_auth_help: "To perform this sensitive action, you need to have logged in recently. Please logout and login again, then try once more.",
        cancel: "Cancel",
        confirm: "Confirm"
    },
    premium: {
        available_on_mobile: "Available on Mobile",
        already_purchased: "Already purchased?",
        login_to_activate: "Just login to activate."
    }
};

fs.readdirSync(messagesDir).forEach(file => {
    if (file.endsWith('.json') && !excludedFiles.includes(file)) {
        const filePath = path.join(messagesDir, file);
        let data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Inject new keys
        data.auth = { ...data.auth, ...newKeys.auth };
        data.dashboard = { ...data.dashboard, ...newKeys.dashboard };
        data.common = { ...data.common, ...newKeys.common };
        data.premium = { ...data.premium, ...newKeys.premium };

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`Updated ${file}`);
    }
});
