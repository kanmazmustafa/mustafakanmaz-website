import os
import json
import re

# Configuration
PROJECT_ROOT = r"c:\Users\musta\Desktop\software\devam_eden_projeler\einburgeringtest_app_web\nextjs_web"
MESSAGES_DIR = os.path.join(PROJECT_ROOT, "messages")
SRC_DIR = os.path.join(PROJECT_ROOT, "src")
BASE_LANG = "en" 

def load_json(path):
    if not os.path.exists(path):
        return {}
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def save_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def flatten_keys(data, prefix=""):
    keys = {}
    for k, v in data.items():
        if isinstance(v, dict):
            keys.update(flatten_keys(v, f"{prefix}{k}."))
        else:
            keys[f"{prefix}{k}"] = v
    return keys

def unflatten_keys(flat_data):
    nested = {}
    # Sort keys to ensure deterministic output
    for key in sorted(flat_data.keys()):
        value = flat_data[key]
        parts = key.split(".")
        d = nested
        for part in parts[:-1]:
            if part not in d:
                d[part] = {}
            if isinstance(d[part], str): # Conflict handling: key exists as string but now needs to be object
                 # Rename leaf to preserve it (optional, but handling conflict)
                 d[part + "_val"] = d[part]
                 d[part] = {}
            d = d[part]
        d[parts[-1]] = value
    return nested

def scan_files_for_keys(directory):
    found_keys = set()
    
    # regex to find: const t = useTranslations('NAMESPACE');
    # and variations: const tHome = useTranslations('home');
    hook_regex = r"const\s+(\w+)\s*=\s*useTranslations\(['\"]?([a-zA-Z0-9_]*)['\"]?\)"
    
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith((".tsx", ".ts", ".js", ".jsx")):
                path = os.path.join(root, file)
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                    
                # 1. Identity Translators in File
                # map: variable_name -> namespace (empty string if global)
                translators = {}
                for match in re.finditer(hook_regex, content):
                    var_name = match.group(1)
                    namespace = match.group(2)
                    translators[var_name] = namespace
                
                # If no explicit hooks found, maybe it imports a global t? (Unlikely in next-intl usage here)
                # But we can look for usage directly.
                
                # 2. Find usages: t('KEY'), tHome('KEY')
                # Regex: (\w+)\(['"]([a-zA-Z0-9_.]+)['"]\)
                usage_regex = r"(\w+)\(['\"]([a-zA-Z0-9_.]+)['\"]\)"
                
                for match in re.finditer(usage_regex, content):
                    func_name = match.group(1)
                    key_part = match.group(2)
                    
                    if func_name in translators:
                        ns = translators[func_name]
                        full_key = f"{ns}.{key_part}" if ns else key_part
                        found_keys.add(full_key)
                        
    return found_keys

def main():
    print(f"--- Master i18n Sync ({BASE_LANG.upper()} Base) ---")

    # 1. Scan Codebase
    print("Scanning code for keys...")
    code_keys = scan_files_for_keys(SRC_DIR)
    print(f"Found {len(code_keys)} unique keys in code.")

    # 2. Load Base Language (EN)
    base_path = os.path.join(MESSAGES_DIR, f"{BASE_LANG}.json")
    base_data = load_json(base_path)
    base_flat = flatten_keys(base_data)
    
    # 3. Add Missing Keys to Base
    # keys existing in code but not in en.json
    added_to_base = 0
    for key in code_keys:
        if key not in base_flat:
            print(f"  [BASE] Adding missing key from code: {key}")
            # Use the last part of the key as a placeholder value, readable
            base_flat[key] = key.split('.')[-1].replace('_', ' ').title()
            added_to_base += 1
            
    if added_to_base > 0:
        base_data = unflatten_keys(base_flat)
        save_json(base_path, base_data)
        print(f"Updated {BASE_LANG}.json with {added_to_base} new keys.")
    else:
        print(f"{BASE_LANG}.json has all keys found in code.")

    # 4. Sync All Other Languages
    all_files = [f for f in os.listdir(MESSAGES_DIR) if f.endswith(".json")]
    print(f"\nSyncing {len(all_files)-1} other languages...")

    for file in all_files:
        if file == f"{BASE_LANG}.json":
            continue
            
        lang_path = os.path.join(MESSAGES_DIR, file)
        try:
            lang_data = load_json(lang_path)
            lang_flat = flatten_keys(lang_data)
        except:
            lang_flat = {}
            
        added_in_lang = 0
        
        # Iterate over BASE keys (Source of Truth)
        for key, base_val in base_flat.items():
            should_update = False
            
            if key not in lang_flat:
                should_update = True
            elif isinstance(lang_flat[key], str) and lang_flat[key].startswith("[MISSING]"):
                # If it's already marked missing (possibly with Turkish text), overwrite it with English fallback
                should_update = True
            
            if should_update:
                # Use clean English value without [MISSING] prefix for better UX
                lang_flat[key] = base_val
                added_in_lang += 1
        
        if added_in_lang > 0:
            new_data = unflatten_keys(lang_flat)
            save_json(lang_path, new_data)
            print(f"  -> {file}: Added {added_in_lang} keys.")
        else:
            print(f"  -> {file}: In sync.")

    print("\nMaster Sync Complete.")

if __name__ == "__main__":
    main()
