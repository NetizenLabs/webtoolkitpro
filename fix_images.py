import os
from PIL import Image

public_dir = 'C:/xampp/htdocs/webtoolkit-pro/public'
png_files = ['og-image.png', 'blog-og-image.png']

for png in png_files:
    png_path = os.path.join(public_dir, png)
    jpg_path = os.path.join(public_dir, png.replace('.png', '.jpg'))
    
    if os.path.exists(png_path):
        try:
            img = Image.open(png_path)
            # Fill transparency with white if necessary
            if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                background = Image.new('RGB', img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[3]) # 3 is the alpha channel
                img = background
            elif img.mode != 'RGB':
                img = img.convert('RGB')
            
            img.save(jpg_path, 'JPEG', quality=65, optimize=True)
            size = os.path.getsize(jpg_path) / 1024
            print(f"Converted {png} to JPG: {size:.2f} KB")
            
            # Delete old png
            os.remove(png_path)
        except Exception as e:
            print(f"Error converting {png}: {e}")

# Restore world-map-bg.png
os.system(f"cd {public_dir} && git restore world-map-bg.png")

# Update references in layout.tsx
layout_path = 'C:/xampp/htdocs/webtoolkit-pro/app/layout.tsx'
if os.path.exists(layout_path):
    with open(layout_path, 'r', encoding='utf-8') as f:
        layout = f.read()
    layout = layout.replace('og-image.png', 'og-image.jpg')
    with open(layout_path, 'w', encoding='utf-8') as f:
        f.write(layout)
