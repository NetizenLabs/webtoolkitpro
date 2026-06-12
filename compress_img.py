from PIL import Image
import os

paths = [
    'C:/xampp/htdocs/webtoolkit-pro/abusufyan-xyz/abu-sufyan-profile.jpg',
    'C:/xampp/htdocs/webtoolkit-pro/abusufyan-xyz/og-image.jpg'
]

for path in paths:
    if os.path.exists(path):
        img = Image.open(path)
        if img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Save compressed versions
        img.save(path, 'JPEG', quality=60, optimize=True)
        size = os.path.getsize(path) / 1024
        print(f"Compressed {os.path.basename(path)} to {size:.2f} KB")
