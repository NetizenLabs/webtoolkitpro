import os

file_path = "C:/xampp/htdocs/webtoolkit-pro/next.config.js"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

redirects = [
    ('sql-injection-sanitizer', 'xss-scanner'),
    ('image-resizer', 'image-compressor-pro'),
    ('css-color-extractor', 'color-converter'),
    ('binary-to-hex', 'binary-hex-decimal-converter'),
    ('xml-to-json', 'csv-json-xml-converter'),
    ('password-generator', 'bulk-uuid-v4-v7-generator'),
    ('json-formatter', 'json-to-code-generator'),
    ('cdn-finder', 'cdn-readiness-tester'),
    ('alt-text-audit', 'alt-text-auditor'),
    ('json-to-jsonl', 'json-yaml-jsonl-converter'),
    ('password-auditor', 'password-entropy-tester'),
    ('px-to-rem', 'px-rem-converter'),
    ('robots-txt-templates', 'robots-txt-toolkit'),
    ('contrast-checker', 'color-contrast'),
    ('json-to-markdown', 'json-to-code-generator')
]

insert_block = "\n      // GSC 404 Renamed Tool Mappings (June 2026)\n"
for source, dest in redirects:
    insert_block += f"      {{ source: '/tools/{source}', destination: '/tools/{dest}/', permanent: true }},\n"
    insert_block += f"      {{ source: '/tools/{source}/', destination: '/tools/{dest}/', permanent: true }},\n"

target_marker = "// SEO Audit 2026: Merged Thin Content Redirects"
new_content = content.replace(target_marker, insert_block + "      " + target_marker)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Injected GSC 404 tool redirects!")
