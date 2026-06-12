import os
from PIL import Image

# 1. Update layout.tsx
layout_path = 'C:/xampp/htdocs/webtoolkit-pro/app/layout.tsx'
with open(layout_path, 'r', encoding='utf-8') as f:
    layout = f.read()

old_desc = "'Access Web Toolkit Pro: 130+ secure, free client-side developer tools. Offline-first utilities for bulk UUID generation, secure local data conversion, and technical SEO.'"
new_desc = "'Access 130+ secure, free client-side developer tools. Offline-first utilities for bulk UUID generation, secure local data conversion, and SEO.'"

layout = layout.replace(old_desc, new_desc)

with open(layout_path, 'w', encoding='utf-8') as f:
    f.write(layout)

# 2. Update page.tsx
page_path = 'C:/xampp/htdocs/webtoolkit-pro/app/page.tsx'
with open(page_path, 'r', encoding='utf-8') as f:
    page = f.read()

page = page.replace(
    '<h2 className="text-[var(--font-size-3xl)] font-black text-gray-900 dark:text-white mb-4">Popular Utilities</h2>',
    '<h2 className="text-[var(--font-size-3xl)] font-black text-gray-900 dark:text-white mb-4">What are our most popular developer utilities?</h2>'
)

page = page.replace(
    'Engineered for the <br/>\n                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Modern Web Ecosystem</span>',
    'Why do software engineers choose <br/>\n                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">WebToolkit Pro?</span>'
)

old_p = """                <p>
                  Unlike legacy toolkits that send your sensitive data to remote servers for processing, WebToolkit Pro leverages WebAssembly, Web Workers, and modern browser APIs to execute everything directly on your local machine. This guarantees zero latency and ensures that your API keys, JSON payloads, and source code are never compromised.
                </p>"""

new_p = """                <div className="mt-4">
                  Unlike legacy toolkits that send your sensitive data to remote servers, WebToolkit Pro executes directly on your local machine. This delivers three core advantages:
                  <ul className="list-disc pl-6 mt-4 space-y-2 text-gray-900 dark:text-white font-medium">
                    <li><strong>Zero Latency:</strong> Instant processing leveraging WebAssembly and Web Workers.</li>
                    <li><strong>Complete Privacy:</strong> Your API keys, JSON payloads, and source code never leave your browser.</li>
                    <li><strong>RFC Compliance:</strong> Every utility is strictly aligned with industry standards.</li>
                  </ul>
                </div>"""

page = page.replace(old_p, new_p)

# Inject FAQ Schema
schema_script = """
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [{
              "@type": "Question",
              "name": "Are the tools on WebToolkit Pro safe for enterprise use?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, WebToolkit Pro is built entirely on client-side execution using JS Workers. Your sensitive data, JSON payloads, and API keys never leave your local machine."
              }
            }, {
              "@type": "Question",
              "name": "Do the tools work completely offline?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, many of the core utilities in WebToolkit Pro utilize Progressive Web App (PWA) technologies and WebAssembly to run perfectly offline."
              }
            }, {
              "@type": "Question",
              "name": "Is WebToolkit Pro entirely free?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, all 130+ developer tools in our directory are 100% free. There are no sign-ups, no paywalls, and no hidden subscriptions."
              }
            }]
          })
        }}
      />
"""
# Insert right before </> at the very end
page = page.replace('    </>\n  )\n}\n', schema_script + '    </>\n  )\n}\n')

with open(page_path, 'w', encoding='utf-8') as f:
    f.write(page)


# 3. Compress images
public_dir = 'C:/xampp/htdocs/webtoolkit-pro/public'
images_to_compress = [
    'og-image.png',
    'blog-og-image.png',
    'world-map-bg.png'
]

for img_name in images_to_compress:
    path = os.path.join(public_dir, img_name)
    if os.path.exists(path):
        try:
            img = Image.open(path)
            if img.mode != 'RGB' and path.endswith('.jpg'):
                img = img.convert('RGB')
            elif img.mode != 'RGBA' and path.endswith('.png'):
                img = img.convert('RGBA')
            
            # Save compressed
            if path.endswith('.png'):
                img.save(path, 'PNG', optimize=True, compress_level=9)
            else:
                img.save(path, 'JPEG', quality=65, optimize=True)
            
            size = os.path.getsize(path) / 1024
            print(f"Compressed {img_name} to {size:.2f} KB")
        except Exception as e:
            print(f"Error compressing {img_name}: {e}")
