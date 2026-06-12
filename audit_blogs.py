import os
import re
import json

blog_dir = 'content/blog'
results = []

for f in os.listdir(blog_dir):
    if f.endswith('.md') and f != '_template.md':
        path = os.path.join(blog_dir, f)
        with open(path, 'r', encoding='utf-8') as file:
            content = file.read()
            
        match = re.search(r'---\n(.*?)\n---', content, re.DOTALL)
        if match:
            fm = match.group(1)
            title = re.search(r'title:\s*["\']?(.*?)["\']?\n', fm)
            cat = re.search(r'category:\s*["\']?(.*?)["\']?\n', fm)
            slug = re.search(r'slug:\s*["\']?(.*?)["\']?\n', fm)
            
            results.append({
                'file': f,
                'title': title.group(1) if title else '',
                'category': cat.group(1) if cat else '',
                'slug': slug.group(1) if slug else ''
            })

with open('blog_audit.json', 'w') as out:
    json.dump(results, out, indent=2)

print("Saved to blog_audit.json")
