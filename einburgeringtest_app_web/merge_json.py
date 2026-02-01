
import json
import os

def merge_json():
    try:
        # Read the main file
        with open(r"c:\Users\Mustafa\Desktop\android_apps\einburgeringtest_app\assets\data\lang\nl.json", "r", encoding="utf-8") as f:
            main_data = json.load(f)
        
        # Remove placeholder if exists
        if "PLACEHOLDER" in main_data:
            del main_data["PLACEHOLDER"]
        
        # Read the batch 3 file
        with open(r"c:\Users\Mustafa\Desktop\android_apps\einburgeringtest_app\temp_batch3.json", "r", encoding="utf-8") as f:
            batch3_data = json.load(f)
            
        # Merge batch 3 into main data
        main_data.update(batch3_data)
        
        # Write back to main file
        with open(r"c:\Users\Mustafa\Desktop\android_apps\einburgeringtest_app\assets\data\lang\nl.json", "w", encoding="utf-8") as f:
            json.dump(main_data, f, ensure_ascii=False, indent=4)
            
        print("Successfully merged files.")
        
    except Exception as e:
        print(f"Error merging files: {e}")

if __name__ == "__main__":
    merge_json()
