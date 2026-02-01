import os
import json
import re

# Configuration
PROJECT_ROOT = r"c:\Users\musta\Desktop\software\devam_eden_projeler\einburgeringtest_app_web\nextjs_web"
MESSAGES_DIR = os.path.join(PROJECT_ROOT, "messages")
SRC_DIR = os.path.join(PROJECT_ROOT, "src")
BASE_LANG = "tr"  # Using Turkish as the source of truth for keys

def load_json(path):
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
    for key, value in flat_data.items():
        parts = key.split(".")
        d = nested
        for part in parts[:-1]:
            if part not in d:
                d[part] = {}
            d = d[part]
        d[parts[-1]] = value
    return nested

def scan_files_for_keys(directory):
    """
    Scans typical usage like t('key') or t("key")
    """
    found_keys = set()
    regex = r"t\(['\"]([a-zA-Z0-9_.]+)['\"]\)"
    
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith((".tsx", ".ts", ".js", ".jsx")):
                path = os.path.join(root, file)
                with open(path, "r", encoding="utf-8") as f:
                    content = f.read()
                    matches = re.findall(regex, content)
                    found_keys.update(matches)
    return found_keys

def main():
    print("--- i18n Auditor & Fixer ---")

    # 1. Load Base Language
    base_path = os.path.join(MESSAGES_DIR, f"{BASE_LANG}.json")
    if not os.path.exists(base_path):
        print(f"Error: Base language file {base_path} not found.")
        return

    base_data = load_json(base_path)
    base_keys = flatten_keys(base_data)
    print(f"Loaded base ({BASE_LANG}) keys: {len(base_keys)}")

    # 2. Scan Code for Used Keys
    used_keys = scan_files_for_keys(SRC_DIR)
    print(f"Found {len(used_keys)} usage of t('...') in code.")

    # 3. Check for Missing Keys in Base
    missing_in_base = [k for k in used_keys if k not in base_keys]
    if missing_in_base:
        print(f"\n[WARNING] The following keys are used in code but missing in {BASE_LANG}.json:")
        for k in missing_in_base:
            print(f"  - {k}")
    else:
        print(f"\n[OK] All keys used in code exist in {BASE_LANG}.json.")

    # 4. Sync All Languages
    print("\n--- Syncing Languages ---")
    files = [f for f in os.listdir(MESSAGES_DIR) if f.endswith(".json")]
    
    for file in files:
        if file == f"{BASE_LANG}.json":
            continue
            
        lang_path = os.path.join(MESSAGES_DIR, file)
        try:
            lang_data = load_json(lang_path)
            lang_keys = flatten_keys(lang_data)
        except Exception as e:
            print(f"Error loading {file}: {e}")
            continue
        
        added_count = 0
        
        # Add missing keys from base
        for key in base_keys: # Iterate over keys, not items
            if key not in lang_keys:
                print(f"  [{file}] Adding missing key: {key}")
                # We can try to use a placeholder or the Turkish value
                # Using Turkish value with a prefix clearly indicates it needs translation
                lang_keys[key] = f"[MISSING] {base_keys[key]}" 
                added_count += 1
                
        if added_count > 0:
            # Reconstruct the nested dictionary
            new_nested = unflatten_keys(lang_keys)
            save_json(lang_path, new_nested)
            print(f"  -> Updated {file} with {added_count} new keys.")
        else:
            print(f"  -> {file} is already in sync.")

    print("\nDone.")

if __name__ == "__main__":
    main()
