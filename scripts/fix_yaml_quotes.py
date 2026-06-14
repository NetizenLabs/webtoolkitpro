import os
import re

BLOG_DIR = 'C:/xampp/htdocs/webtoolkit-pro/content/blog/'

print("Fixing YAML syntax errors in blog keywords...")
for filename in os.listdir(BLOG_DIR):
    if not filename.endswith('.md'):
        continue
        
    path = os.path.join(BLOG_DIR, filename)
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    def fix_quotes(match):
        arr_str = match.group(1)
        # We injected strings wrapped in single quotes: 'secure offline...'
        # If the string inside contains single quotes (e.g. 'none'), it breaks YAML.
        # Let's just find all instances of 'secure offline ... ' and 'client-side ... ' 
        # and replace the outer single quotes with double quotes, while removing inner double/single quotes.
        
        # A simpler way: just replace all single quotes inside the injected string with empty strings or backticks.
        # But since regexing nested quotes is hard, let's just do a naive replace of the specific broken string.
        return arr_str.replace("'none'", "none")

    if "keywords: [" in content:
        new_content = re.sub(r'(keywords:\s*\[.*?\])', fix_quotes, content)
        if new_content != content:
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Fixed {filename}")

print("Done.")
