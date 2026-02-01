import os
import json

def add_iap_keys():
    translations_dir = r"c:\Users\musta\Desktop\software\devam_eden_projeler\einburgeringtest_app\assets\translations"
    
    keys_to_add = {
        "store_unavailable": {
            "tr": "Google Play Store'a bağlanılamadı.",
            "en": "Could not connect to Google Play Store."
        },
        "product_not_found": {
            "tr": "Ürün bilgisi bulunamadı.",
            "en": "Product not found."
        }
    }

    files = [f for f in os.listdir(translations_dir) if f.startswith("ui_") and f.endswith(".json")]
    
    for filename in files:
        lang_code = filename.split('_')[1].split('.')[0]
        filepath = os.path.join(translations_dir, filename)
        
        with open(filepath, 'r', encoding='utf-8') as f:
            try:
                data = json.load(f)
            except json.JSONDecodeError:
                continue
        
        if "premium" not in data:
            data["premium"] = {}
        
        for key, vals in keys_to_add.items():
            # Use English as fallback for other languages for now, or the specific TR/EN value
            val = vals.get(lang_code, vals["en"])
            data["premium"][key] = val
            
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        print(f"Updated {filename}")

if __name__ == "__main__":
    add_iap_keys()
