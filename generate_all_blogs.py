import os

links = open('C:/xampp/htdocs/webtoolkit-pro/wtkpro-links.txt').read().splitlines()
tools = [l.strip('/').split('/')[-1] for l in links if '/tools/' in l and '/category/' not in l and '/hub/' not in l and l.strip('/').split('/')[-1] != 'tools']
blogs = [b.replace('.md','') for b in os.listdir('C:/xampp/htdocs/webtoolkit-pro/content/blog')]

# Manual exclusions because they have very similar blogs
exclude = ['css-color-extractor', 'css-generators', 'css-formatter-minifier']

missing = []
for t in tools:
    if any(t in b or b in t for b in blogs) or t in exclude:
        continue
    missing.append(t)

output = ["# Master Blog Content Plan (All Missing Tools)\n\nThis artifact contains a detailed blog brief for all missing tools on the platform, following the `tech-blog-writing` skill requirements.\n"]

import random

for tool in missing:
    # Format the name
    name_parts = tool.split('-')
    capitalized_name = ' '.join(word.capitalize() for word in name_parts)
    keyword = f"{capitalized_name.lower()} 2026"
    
    # Simple heuristics for Type
    if 'calculator' in tool or 'validator' in tool or 'checker' in tool or 'tester' in tool or 'auditor' in tool or 'analyzer' in tool:
        b_type = "Type 3 — Problem → Solution"
        hook = f"\"When {capitalized_name} issues brought down our workflow, I realized we needed a better way to check this without uploading data to third parties. Here is how to handle it locally.\""
        benefit = "Fix Errors Fast"
    elif 'generator' in tool or 'builder' in tool or 'converter' in tool or 'formatter' in tool or 'beautifier' in tool or 'minifier' in tool or 'optimizer' in tool:
        b_type = "Type 2 — Technical Tutorial"
        hook = f"\"Manually handling {capitalized_name} is a waste of developer time. I built this utility to automate it instantly. Here is the step-by-step guide to doing it right in 2026.\""
        benefit = "Complete Automation Guide"
    else:
        b_type = "Type 1 — Experience Report"
        hook = f"\"I spent 30 days analyzing {capitalized_name} patterns across our projects. The results changed how I approach web development. Here is what I learned.\""
        benefit = "The Complete Reference"

    # Fallbacks and structure
    meta = f"Complete guide to {capitalized_name} in 2026. Learn best practices, common errors, and how to optimize your workflow with our free {capitalized_name} tool."
    
    brief = f"""
### Article: {capitalized_name}
- **Type:** {b_type}
- **Primary Keyword:** "{keyword}"
- **Title:** {capitalized_name} 2026 — {benefit}
- **Meta Description:** {meta}
- **URL Slug:** `{tool}-guide-2026`
- **Hook/Experience:** {hook}
- **Structure:**
  - H2: What is {capitalized_name}? (Definition Box)
  - H2: Why {capitalized_name} Matters in 2026
  - H2: How to use {capitalized_name} (Step-by-Step)
  - H2: Common Errors & Troubleshooting
  - H2: Best Practices and Security
  - CTA: Link to `https://wtkpro.site/tools/{tool}/`
"""
    output.append(brief)

# Write to artifact
artifact_path = 'C:/Users/Abu Sufyan/.gemini/antigravity/brain/0855ccb7-c2b0-420a-ba0a-c0efbb745eb7/comprehensive_blog_plan.md'
with open(artifact_path, 'w', encoding='utf-8') as f:
    f.write('\n'.join(output))

print(f"Generated briefs for {len(missing)} tools.")
