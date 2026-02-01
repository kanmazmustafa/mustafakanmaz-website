import os
import json

def add_translations():
    messages_dir = r"c:\Users\musta\Desktop\software\devam_eden_projeler\einburgeringtest_app\nextjs_web\messages"
    
    # Define English defaults for new keys
    new_keys = {
        "auth": {
            "login_title": "Login",
            "welcome_back": "Welcome back! Please enter your details.",
            "email": "Email",
            "password": "Password",
            "login_btn": "Sign In",
            "register_btn": "Sign Up",
            "google_sign_in": "Sign in with Google",
            "no_account": "Don't have an account?"
        },
        "dashboard": {
            "welcome": "Welcome, {name}",
            "subtitle": "Track your progress and prepare for the exam.",
            "logout": "Log out",
            "exam_mode": "Exam Simulation",
            "exam_mode_desc": "Real exam conditions",
            "exam_mode_detail": "33 random questions, 60 minutes. Pass: 17/33.",
            "start_exam": "Start Exam",
            "practice_mode": "Practice",
            "practice_mode_desc": "Learn at your own pace",
            "practice_mode_detail": "Browse all 300+ questions by category.",
            "start_practice": "Start Practice",
            "stats": "Your Statistics",
            "stats_desc": "Overview of your performance",
            "passed_exams": "Passed Exams",
            "success_rate": "Success Rate"
        },
        "home": {
           "app_title": "Einbürgerungstest 2026",
           "welcome": "Prepare for your German Citizenship Test",
           "quiz_simulation": "Start Quiz Simulation"
        }
    }

    # Iterate all json files
    for filename in os.listdir(messages_dir):
        if filename.endswith(".json"):
            filepath = os.path.join(messages_dir, filename)
            
            try:
                with open(filepath, "r", encoding="utf-8") as f:
                    data = json.load(f)
                
                # Merge new keys (shallow merge of top level, deep merge would be better but this is sufficient for new sections)
                # Since existing data is just "1": "Question...", "2": "..." etc.
                # We can safely add "auth": {...}
                
                modified = False
                
                # Check and add specific sections
                for section, keys in new_keys.items():
                    if section not in data:
                        data[section] = keys
                        modified = True
                        print(f"Added section '{section}' to {filename}")
                
                if modified:
                    with open(filepath, "w", encoding="utf-8") as f:
                        json.dump(data, f, ensure_ascii=False, indent=2)
                else:
                    print(f"Skipped {filename} (all sections present)")
                    
            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    add_translations()
