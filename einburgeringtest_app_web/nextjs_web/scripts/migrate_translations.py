import os
import shutil
import json

def migrate_translations():
    # Paths (relative to script location, assumed to be in nextjs_web/scripts or similar, but running from nextjs_web root)
    # Using absolute paths based on knowledge
    base_dir = r"c:\Users\musta\Desktop\software\devam_eden_projeler\einburgeringtest_app"
    source_dir = os.path.join(base_dir, "assets", "translations")
    dest_dir = os.path.join(base_dir, "nextjs_web", "messages")

    if not os.path.exists(dest_dir):
        os.makedirs(dest_dir)

    files = [f for f in os.listdir(source_dir) if f.startswith("ui_") and f.endswith(".json")]

    print(f"Found {len(files)} translation files.")

    for filename in files:
        # Extract lang code: ui_en.json -> en
        lang_code = filename.split('_')[1].split('.')[0]
        
        # New filename: en.json
        new_filename = f"{lang_code}.json"
        
        src_path = os.path.join(source_dir, filename)
        dest_path = os.path.join(dest_dir, new_filename)
        
        try:
            shutil.copy2(src_path, dest_path)
            print(f"Migrated: {filename} -> {new_filename}")
        except Exception as e:
            print(f"Error copying {filename}: {e}")

if __name__ == "__main__":
    migrate_translations()
