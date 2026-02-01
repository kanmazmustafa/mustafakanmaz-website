import os
import json

def add_generic_error_key():
    translations_dir = r"c:\Users\musta\Desktop\software\devam_eden_projeler\einburgeringtest_app\assets\translations"
    
    local_data = {
        "ui_tr.json": "Bir hata oluştu. Lütfen tekrar deneyin.",
        "ui_en.json": "An error occurred. Please try again.",
        "ui_de.json": "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
        "ui_nl.json": "Er is bir fout opgetreden. Probeer het opnieuw.",
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
        
        # Determine translation
        error_text = local_data.get(filename, local_data["ui_en.json"])
        
        # Add key
        data["auth"]["error_generic"] = error_text
            
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        print(f"Updated {filename}")

if __name__ == "__main__":
    add_generic_error_key()
