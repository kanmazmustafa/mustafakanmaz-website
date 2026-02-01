import os
import shutil
import json

def migrate_data():
    base_dir = r"c:\Users\musta\Desktop\software\devam_eden_projeler\einburgeringtest_app"
    source_data_dir = os.path.join(base_dir, "assets", "data")
    source_images_dir = os.path.join(base_dir, "assets", "images")
    
    # Destination paths
    # We put JSONs in src/data so we can import them server-side easily
    dest_data_dir = os.path.join(base_dir, "nextjs_web", "src", "data")
    # Images must go to public to be served
    dest_images_dir = os.path.join(base_dir, "nextjs_web", "public", "assets", "images")

    if not os.path.exists(dest_data_dir):
        os.makedirs(dest_data_dir)
        
    if not os.path.exists(dest_images_dir):
        os.makedirs(dest_images_dir)

    # 1. Copy JSON files
    json_files = ["questions.json", "questions_states.json"]
    for f in json_files:
        src = os.path.join(source_data_dir, f)
        dst = os.path.join(dest_data_dir, f)
        if os.path.exists(src):
            shutil.copy2(src, dst)
            print(f"Copied {f}")
        else:
            print(f"Warning: {f} not found in source.")

    # 2. Copy Images
    if os.path.exists(source_images_dir):
        # We walk through just to be safe, or direct copy
        for root, dirs, files in os.walk(source_images_dir):
            for file in files:
                if file.lower().endswith(('.png', '.jpg', '.jpeg', '.svg')):
                    src_file = os.path.join(root, file)
                    # Keep structure if any, though usually flat in this app
                    rel_path = os.path.relpath(src_file, source_images_dir)
                    dst_file = os.path.join(dest_images_dir, rel_path)
                    
                    os.makedirs(os.path.dirname(dst_file), exist_ok=True)
                    shutil.copy2(src_file, dst_file)
        print("Images copied.")
    else:
        print("Warning: assets/images source not found.")

if __name__ == "__main__":
    migrate_data()
