import os

search_dirs = [
    'C:/xampp/htdocs/webtoolkit-pro/app',
    'C:/xampp/htdocs/webtoolkit-pro/components',
    'C:/xampp/htdocs/webtoolkit-pro/lib',
    'C:/xampp/htdocs/webtoolkit-pro' # for next.config.js
]

extensions = ('.tsx', '.ts', '.js', '.md')
exclude_dirs = set(['node_modules', '.next', '.git'])

for d in search_dirs:
    if os.path.isfile(d) and d.endswith(extensions):
        files = [d]
    else:
        files = []
        for root, dirs, filenames in os.walk(d):
            # Exclude directories in-place
            dirs[:] = [dir_name for dir_name in dirs if dir_name not in exclude_dirs]
            
            for f in filenames:
                if f.endswith(extensions):
                    files.append(os.path.join(root, f))
    
    for path in files:
        if path.endswith('replace_refs.py') or path.endswith('fix_images.py') or path.endswith('wtkpro_seo_fix.py'):
            continue
            
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        if 'og-image.png' in content or 'blog-og-image.png' in content:
            new_content = content.replace('og-image.png', 'og-image.jpg').replace('blog-og-image.png', 'blog-og-image.jpg')
            with open(path, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated references in {path}")
