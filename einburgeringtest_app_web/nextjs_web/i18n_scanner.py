import os
import json
import re

# Configuration
PROJECT_ROOT = r"c:\Users\musta\Desktop\software\devam_eden_projeler\einburgeringtest_app_web\nextjs_web"
MESSAGES_PATH = os.path.join(PROJECT_ROOT, "messages", "tr.json")
SRC_DIR = os.path.join(PROJECT_ROOT, "src")

def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)

def flatten_keys(data, prefix=""):
    keys = set()
    for k, v in data.items():
        if isinstance(v, dict):
            keys.update(flatten_keys(v, f"{prefix}{k}."))
        else:
            keys.add(f"{prefix}{k}")
    return keys

def scan_file(path, valid_keys):
    issues = []
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
        lines = content.splitlines()

    # 1. Check for Missing Keys in t('key')
    # Regex for t('key') or t("key") or tHome('key') etc.
    t_regex = r"\b(?:t|t[A-Z][a-zA-Z0-9]*)\(['\"]([a-zA-Z0-9_.]+)['\"]\)"
    
    for i, line in enumerate(lines):
        matches = re.finditer(t_regex, line)
        for m in matches:
            key = m.group(1)
            # Basic validation: ignore dynamic keys (containing ${} or +) which regex might miss but just in case
            if "{" in key or "$" in key: 
                continue
                
            if key not in valid_keys:
                 # Check if it's a known false positive or sub-namespace check (simplified)
                 # Assumption: keys are fully qualified
                 issues.append({
                     "file": path,
                     "line": i + 1,
                     "type": "MISSING_KEY",
                     "text": key,
                     "snippet": line.strip()
                 })

    # 2. Check for Hardcoded Text in JSX
    # Very basic heuristic: Text between > and < that has letters and is not just whitespace
    # Excludes: {variables}, &nbsp;, only numbers/symbols
    jsx_text_regex = r">([^<>{}\n\r]*[a-zA-Z]{2,}[^<>{}\n\r]*)<"
    
    # 3. Check for Hardcoded Attributes
    # placeholder="Text", title="Text", alt="Text"
    attr_regex = r'(?:placeholder|title|alt|aria-label)=["\']([^"\'{}]*[a-zA-Z]{2,}[^"\'{}])["\']'

    for i, line in enumerate(lines):
        # JSX Text content
        text_matches = re.finditer(jsx_text_regex, line)
        for m in text_matches:
            text = m.group(1).strip()
            # Filter out likely code artifacts or class names (though class names usually inside className="")
            if text and not text.startswith("{") and "className" not in line:
                issues.append({
                    "file": path,
                    "line": i + 1,
                    "type": "HARDCODED_TEXT",
                    "text": text,
                    "snippet": line.strip()
                })

        # Attribute content
        attr_matches = re.finditer(attr_regex, line)
        for m in attr_matches:
            text = m.group(1).strip()
            issues.append({
                "file": path,
                "line": i + 1,
                "type": "HARDCODED_ATTR",
                "text": text,
                "snippet": line.strip()
            })

    return issues

def main():
    print("--- i18n Scanner: Missing Keys & Hardcoded Text ---")
    
    if not os.path.exists(MESSAGES_PATH):
        print(f"Error: Translation file not found at {MESSAGES_PATH}")
        return

    tr_data = load_json(MESSAGES_PATH)
    valid_keys = flatten_keys(tr_data)
    print(f"Loaded {len(valid_keys)} valid translation keys from tr.json.\n")

    all_issues = []

    for root, _, files in os.walk(SRC_DIR):
        for file in files:
            if file.endswith((".tsx", ".ts", ".js", ".jsx")):
                path = os.path.join(root, file)
                rel_path = os.path.relpath(path, PROJECT_ROOT)
                file_issues = scan_file(path, valid_keys)
                all_issues.extend(file_issues)

    # Calculate Results
    missing_keys = [i for i in all_issues if i['type'] == 'MISSING_KEY']
    hardcoded = [i for i in all_issues if i['type'] in ('HARDCODED_TEXT', 'HARDCODED_ATTR')]

    # Write Report to File
    report_path = os.path.join(PROJECT_ROOT, "i18n_report.txt")
    with open(report_path, "w", encoding="utf-8") as f:
        f.write("--- i18n Scanner Report ---\n")
        f.write(f"Missing Keys: {len(missing_keys)}\n")
        f.write(f"Potential Hardcoded Text: {len(hardcoded)}\n")
        f.write("-" * 30 + "\n")

        if missing_keys:
            f.write("\n[MISSING TRANSLATION KEYS]\n")
            for item in missing_keys:
                f.write(f"{item['text']} \n  -> {item['file']}:{item['line']}\n")

        if hardcoded:
            f.write("\n[POTENTIAL HARDCODED TEXT]\n")
            for item in hardcoded:
                if item['text'] in ['div', 'span', 'p']: continue
                f.write(f"\"{item['text']}\" \n  -> {item['file']}:{item['line']} \n  -> {item['snippet']}\n\n")

    print(f"Report saved to {report_path}")

if __name__ == "__main__":
    main()
