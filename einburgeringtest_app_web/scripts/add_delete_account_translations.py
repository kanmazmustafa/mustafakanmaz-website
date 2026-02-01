import os
import json

def add_delete_account_keys():
    translations_dir = r"c:\Users\musta\Desktop\software\devam_eden_projeler\einburgeringtest_app\assets\translations"
    
    local_data = {
        "ui_tr.json": {
            "delete_account": "Hesabı Sil",
            "delete_confirm_title": "Hesabı Kalıcı Olarak Sil?",
            "delete_confirm_body": "Tüm ilerlemeniz ve verileriniz kalıcı olarak silinecektir. Bu işlem geri alınamaz.",
            "delete_btn": "HESABI SİL"
        },
        "ui_en.json": {
            "delete_account": "Delete Account",
            "delete_confirm_title": "Permanently Delete Account?",
            "delete_confirm_body": "All your progress and data will be permanently deleted. This action cannot be undone.",
            "delete_btn": "DELETE ACCOUNT"
        },
        "ui_de.json": {
            "delete_account": "Konto löschen",
            "delete_confirm_title": "Konto dauerhaft löschen?",
            "delete_confirm_body": "Ihr gesamter Fortschritt und Ihre Daten werden dauerhaft gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.",
            "delete_btn": "KONTO LÖSCHEN"
        },
        "ui_nl.json": {
            "delete_account": "Account verwijderen",
            "delete_confirm_title": "Account permanent verwijderen?",
            "delete_confirm_body": "Al je voortgang en gegevens worden permanent verwijderd. Deze actie kan niet ongedaan worden gemaakt.",
            "delete_btn": "ACCOUNT VERWIJDEREN"
        },
    }

    files = [f for f in os.listdir(translations_dir) if f.startswith("ui_") and f.endswith(".json")]
    
    for filename in files:
        filepath = os.path.join(translations_dir, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError:
                print(f"Error decoding {filename}")
                continue
        
        if "auth" not in data:
            data["auth"] = {}
        
        # Determine translations
        lang_data = local_data.get(filename, local_data["ui_en.json"])
        
        # Add keys
        data["auth"]["delete_account"] = lang_data["delete_account"]
        data["auth"]["delete_confirm_title"] = lang_data["delete_confirm_title"]
        data["auth"]["delete_confirm_body"] = lang_data["delete_confirm_body"]
        data["auth"]["delete_btn"] = lang_data["delete_btn"]
        
        # Also ensure error_requires_recent_login is there from previous step or add it now
        if "error_requires_recent_login" not in data["auth"]:
             if filename == "ui_tr.json":
                 data["auth"]["error_requires_recent_login"] = "Bu hassas işlem son zamanlarda giriş yapmanızı gerektirir. Lütfen çıkış yapıp tekrar girin ve hesabı silmeyi tekrar deneyin."
             else:
                 data["auth"]["error_requires_recent_login"] = "This sensitive operation requires a recent login. Please log out and log in again, then try deleting your account."
            
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        print(f"Updated {filename}")

if __name__ == "__main__":
    add_delete_account_keys()
