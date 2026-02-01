import os
import json

def add_drawer_keys():
    translations_dir = r"c:\Users\musta\Desktop\software\devam_eden_projeler\einburgeringtest_app\assets\translations"
    
    local_data = {
        "ui_ar.json": {"settings": "إعدادات", "other": "أخرى"},
        "ui_bg.json": {"settings": "НАСТРОЙКИ", "other": "ДРУГИ"},
        "ui_bs.json": {"settings": "POSTAVKE", "other": "OSTALO"},
        "ui_de.json": {"settings": "EINSTELLUNGEN", "other": "SONSTIGES"},
        "ui_el.json": {"settings": "ΡΥΘΜΙΣΕΙΣ", "other": "ΑΛΛΑ"},
        "ui_en.json": {"settings": "SETTINGS", "other": "OTHER"},
        "ui_es.json": {"settings": "AJUSTES", "other": "OTROS"},
        "ui_fa.json": {"settings": "تنظیمات", "other": "سایر"},
        "ui_fr.json": {"settings": "PARAMÈTRES", "other": "AUTRES"},
        "ui_he.json": {"settings": "הגדרות", "other": "אחר"},
        "ui_hi.json": {"settings": "सेटिंग्स", "other": "अन्य"},
        "ui_hr.json": {"settings": "POSTAVKE", "other": "OSTALO"},
        "ui_hu.json": {"settings": "BEÁLLÍTÁSOK", "other": "EGYEBEK"},
        "ui_it.json": {"settings": "IMPOSTAZIONI", "other": "ALTRO"},
        "ui_ja.json": {"settings": "設定", "other": "その他"},
        "ui_ku.json": {"settings": "SAZKARÎ", "other": "YÊN DIN"},
        "ui_nl.json": {"settings": "INSTELLINGEN", "other": "OVERIG"},
        "ui_pl.json": {"settings": "USTAWIENIA", "other": "INNE"},
        "ui_ps.json": {"settings": "ترتیبات", "other": "نور"},
        "ui_pt.json": {"settings": "AJUSTES", "other": "OUTROS"},
        "ui_ro.json": {"settings": "SETĂRI", "other": "ALTELE"},
        "ui_ru.json": {"settings": "НАСТРОЙКИ", "other": "ДРУГОЕ"},
        "ui_sq.json": {"settings": "CILËSIMET", "other": "TË TJERA"},
        "ui_sr.json": {"settings": "PODEŠAVANJA", "other": "OSTALO"},
        "ui_th.json": {"settings": "การตั้งค่า", "other": "อื่นๆ"},
        "ui_tr.json": {"settings": "AYARLAR", "other": "DİĞER"},
        "ui_uk.json": {"settings": "НАЛАШТУВАННЯ", "other": "ІНШЕ"},
        "ui_vi.json": {"settings": "CÀI ĐẶT", "other": "KHÁC"},
        "ui_zh.json": {"settings": "设置", "other": "其他"}
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
        
        if "drawer" not in data:
            data["drawer"] = {}
        
        # Determine translations
        settings_text = local_data.get(filename, {}).get("settings", "SETTINGS")
        other_text = local_data.get(filename, {}).get("other", "OTHER")
        
        # Add/Update keys
        data["drawer"]["settings"] = settings_text
        data["drawer"]["other"] = other_text
            
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=4)
        print(f"Updated {filename} with specific translations")

if __name__ == "__main__":
    add_drawer_keys()
