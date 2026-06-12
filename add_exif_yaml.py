import os

file_path = "C:/xampp/htdocs/webtoolkit-pro/config/tools.yaml"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

new_tool_yaml = """  - name: "EXIF Metadata Viewer & Stripper"
    slug: "exif-metadata-viewer"
    category: "Security Tools"
    icon: "Camera"
    tags: ["exif", "metadata", "image", "photo", "privacy", "strip"]
    priority: 8
    releaseDate: "2026-06-12"
    function:
      primary: "View hidden EXIF metadata and securely strip it from photos offline."
    technical:
      input_formats: ["jpg", "png", "webp", "heic"]
      output_formats: ["jpg", "png", "webp"]
      processing: "client-side"
    meta:
      title: "EXIF Metadata Viewer & Stripper | Free Offline Privacy Tool"
      description: "View hidden EXIF data (GPS location, camera model) in your photos. Instantly strip and remove all metadata locally in your browser for 100% privacy."
    content:
      title: "EXIF Metadata Viewer & Privacy Stripper"
      description: "Every photo you take with your smartphone contains hidden EXIF data, including exact GPS coordinates, timestamps, and device serial numbers. Use this zero-knowledge tool to securely view and permanently delete that metadata before sharing your photos online."
      keywords: ["exiftool online", "remove exif data online", "strip metadata from photo", "view exif data", "photo privacy tool"]
      tldr: "Drag and drop a photo to instantly reveal hidden EXIF GPS and camera data, then securely strip it all out with one click."
      entity_definition: "The EXIF Metadata Viewer & Stripper is a zero-knowledge, client-side utility built for digital privacy. It utilizes browser-native file processing and the HTML5 Canvas API to extract and permanently wipe Exchangeable Image File Format (EXIF) metadata. This guarantees that your sensitive location history and device fingerprints are neutralized without your private photos ever being uploaded to a remote server."
      how_it_works: "When an image is loaded, our tool reads the binary file header to extract the EXIF directories. To strip the data, the image is painted onto a hidden HTML5 Canvas element. Because the Canvas only cares about pixel color data and ignores metadata, re-exporting the image from the Canvas yields a mathematically clean, sanitized image file."
      use_cases:
        - "Sanitizing personal photos to remove GPS coordinates before uploading them to social media or forums."
        - "Forensic analysis of images to determine the exact camera model, lens, ISO, and exposure settings used."
        - "Stripping bloated thumbnail and metadata caches from JPEGs to slightly reduce file size for web optimization."
        - "Verifying if a photo has been manipulated by checking the Software/Firmware EXIF tags."
      features:
        - "Detailed EXIF Extraction: View GPS Location, Camera Make/Model, Exposure Time, F-Stop, and ISO."
        - "One-Click Stripper: Safely re-encode your image to destroy all tracking metadata instantly."
        - "Zero-Knowledge Architecture: Your photos never leave your device. All processing is 100% local."
        - "Drag and Drop Support: Works instantly with JPG, WEBP, and PNG files."
      faq:
        - question: "Is it safe to use online EXIF tools?"
          answer: "Most online EXIF tools require you to upload your image to their server. If the photo contains sensitive GPS data, you are actively exposing your location to a third party. Our tool is different: it runs entirely within your browser's memory, ensuring absolute privacy."
        - question: "Why do photos have EXIF data?"
          answer: "Cameras and smartphones embed EXIF (Exchangeable Image File Format) data to help organize photos. It includes the date/time, camera settings (aperture, ISO), and often the exact GPS coordinates where the photo was taken so your phone can map them."
        - question: "Does stripping EXIF data reduce image quality?"
          answer: "Stripping EXIF data simply removes the text-based metadata headers from the file. However, because our tool repaints the image using an HTML5 Canvas to ensure a complete wipe, the image is re-encoded. We default to a 100% quality target to ensure no visible loss of fidelity."
      technical_specs:
        - label: "Engine"
          value: "Client-Side EXIFR"
        - label: "Sanitization"
          value: "Canvas Re-encoding"
        - label: "Privacy"
          value: "Zero-Knowledge"
    seo:
      title: "Remove EXIF Data Online | Secure Metadata Stripper"
      description: "View and strip EXIF data (GPS, Camera Model) from your photos securely offline. 100% private, client-side processing."
      keywords: ["exiftool online", "strip image metadata", "remove exif data", "photo privacy"]
      tldr: "Securely view and remove hidden GPS and camera data from your photos."
      entity_definition: "A digital privacy utility that leverages client-side processing to safely parse and obliterate EXIF metadata from image files without requiring server-side transmission."
    faqs:
      - question: "Can anyone see the location of my photos?"
        answer: "Yes, if your camera or smartphone has Location Services enabled, anyone who downloads the original photo can extract the exact GPS coordinates using an EXIF viewer."
      - question: "How do I remove metadata from a photo?"
        answer: "Simply upload your photo to this tool and click 'Strip Metadata & Download'. We will generate a sanitized version of the image stripped of all identifying EXIF information."
      - question: "Are my photos uploaded to a server?"
        answer: "No. This is a Zero-Knowledge tool. The EXIF extraction and metadata stripping happen entirely within your computer's browser."

"""

if "slug: \"exif-metadata-viewer\"" not in content:
    with open(file_path, "a", encoding="utf-8") as f:
        f.write(new_tool_yaml)
    print("Added exif-metadata-viewer to tools.yaml")
else:
    print("exif-metadata-viewer already exists in tools.yaml")
