import os
import re

TOOLS_YAML = 'C:/xampp/htdocs/webtoolkit-pro/config/tools.yaml'
BLOG_DIR = 'C:/xampp/htdocs/webtoolkit-pro/content/blog/'

# High-intent long-tail modifiers that perfectly align with our product value
MODIFIERS = [
    "secure offline",
    "client-side",
    "without backend",
    "free no signup",
    "privacy-first"
]

def inject_yaml_keywords():
    print("Injecting long-tail keywords into tools.yaml...")
    with open(TOOLS_YAML, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find every slug and its name to generate long-tails
    tools = re.findall(r'name:\s*(.*?)\n\s*slug:\s*(.*?)\n', content)
    
    for name, slug in tools:
        # Strip quotes if any
        clean_name = name.replace("'", "").replace('"', '').strip()
        
        # Generate 2 highly specific long-tails
        long_tail_1 = f"secure offline {clean_name.lower()}"
        long_tail_2 = f"client-side {clean_name.lower()} without backend"
        
        # We need to find the `seo.keywords:` block for this specific tool.
        # This regex looks for the tool's definition, then the keywords array.
        pattern = re.compile(rf"(slug:\s*{slug}\b.*?seo:.*?keywords:\n)", re.DOTALL)
        
        def insert_keywords(match):
            block = match.group(1)
            # Only inject if not already there
            if long_tail_1 not in block:
                injection = f"        - {long_tail_1}\n        - {long_tail_2}\n"
                return block + injection
            return block

        content = pattern.sub(insert_keywords, content, count=1)

    with open(TOOLS_YAML, 'w', encoding='utf-8') as f:
        f.write(content)
    print("tools.yaml updated successfully.")

def inject_blog_keywords():
    print("Injecting long-tail keywords into blog posts...")
    for filename in os.listdir(BLOG_DIR):
        if not filename.endswith('.md'):
            continue
            
        path = os.path.join(BLOG_DIR, filename)
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Extract title or related tool to build keywords
        title_match = re.search(r'title:\s*["\']?(.*?)["\']?\n', content)
        if not title_match:
            continue
            
        title = title_match.group(1)
        base_topic = title.split('|')[0].replace("Guide", "").replace("Complete", "").strip()
        
        long_tail_1 = f"secure offline {base_topic.lower()}"
        long_tail_2 = f"client-side {base_topic.lower()}"
        
        # Look for existing keywords array or meta-keywords in frontmatter
        if 'keywords: [' in content:
            # Array format
            def update_array(match):
                existing = match.group(1)
                if long_tail_1 not in existing:
                    return f"keywords: [{existing}, '{long_tail_1}', '{long_tail_2}']"
                return match.group(0)
            content = re.sub(r'keywords:\s*\[(.*?)\]', update_array, content)
        elif 'meta-keywords:' in content:
            # Comma separated format
            def update_meta(match):
                existing = match.group(1)
                if long_tail_1 not in existing:
                    return f"meta-keywords: \"{existing}, {long_tail_1}, {long_tail_2}\""
                return match.group(0)
            content = re.sub(r'meta-keywords:\s*["\']?(.*?)["\']?\n', update_meta, content)
        elif 'keywords:' in content:
            # Multiline array format
            def update_multiline(match):
                block = match.group(1)
                if long_tail_1 not in block:
                    return block + f"  - {long_tail_1}\n  - {long_tail_2}\n"
                return block
            content = re.sub(r'(keywords:\n(?:  - .*?\n)+)', update_multiline, content)
        else:
            # No keywords found, inject after title
            injection = f"keywords: ['{long_tail_1}', '{long_tail_2}']\n"
            content = re.sub(r'(title:.*?\n)', r'\1' + injection, content, count=1)
            
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
            
    print("Blog posts updated successfully.")

if __name__ == "__main__":
    inject_yaml_keywords()
    inject_blog_keywords()
