import os

file_path = "C:/xampp/htdocs/webtoolkit-pro/next.config.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

redirects = [
    ('json-to-pydantic-model-generator', 'what-is-json-complete-guide'),
    ('json-to-typescript-interface-converter', 'what-is-json-complete-guide'),
    ('css-box-shadow-generator-examples', '25-free-developer-tools-bookmark'),
    ('css-gradient-generator-linear-radial', '25-free-developer-tools-bookmark'),
    ('generate-jwt-token-online-free', 'what-is-jwt-complete-guide')
]

insert_block = "\n      // Content Audit Thin Article Merges (June 2026)\n"
for source, dest in redirects:
    insert_block += f"      {{ source: '/blog/{source}', destination: '/blog/{dest}/', permanent: true }},\n"
    insert_block += f"      {{ source: '/blog/{source}/', destination: '/blog/{dest}/', permanent: true }},\n"

# Inject before SEO Audit 2026 Merged Thin Content Redirects
target_marker = "// SEO Audit 2026: Merged Thin Content Redirects"
if target_marker in content:
    new_content = content.replace(target_marker, insert_block + "      " + target_marker)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Injected thin content redirects!")
else:
    print("Target marker not found!")
