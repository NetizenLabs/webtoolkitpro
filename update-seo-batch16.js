const fs = require('fs');
const yaml = require('js-yaml');

const path = 'config/tools.yaml';
let doc;
try {
  doc = yaml.load(fs.readFileSync(path, 'utf8'));
} catch (e) {
  console.error('Error loading YAML:', e);
  process.exit(1);
}

const updates = {
  'base64-to-image': {
    seo: {
      title: 'Base64 to Image Decoder — Instantly View Base64 Strings',
      description: 'Decode Base64 strings back into standard images (PNG, JPG, SVG) instantly. Preview the decoded image and download it securely in your browser.',
      keywords: ['base64 to image', 'decode base64 image', 'base64 decoder', 'base64 to png', 'base64 viewer'],
      tldr: 'Paste a Base64 string to instantly preview and download the decoded image.',
      entity_definition: 'The Base64 to Image Decoder is a media conversion utility that reverses Base64 encoding. Base64 is often used by developers to embed small images directly into HTML or CSS files (via Data URIs) to reduce HTTP requests. This tool parses the raw ASCII string, identifies the MIME type, and dynamically reconstructs the binary image data so it can be viewed visually or saved to the filesystem.'
    },
    faqs: [
      {
        question: 'Do I need to include the "data:image/..." prefix?',
        answer: 'No. The tool automatically detects if the Data URI scheme prefix is missing and will safely attempt to decode the raw string as a PNG by default.'
      },
      {
        question: 'Is my Base64 string sent to a server for decoding?',
        answer: 'No. The decoding process happens entirely on your local machine using your browser\'s native rendering engine. No data is ever uploaded or stored.'
      },
      {
        question: 'Why would someone encode an image in Base64?',
        answer: 'Base64 encoding converts binary data into ASCII text. This allows developers to embed small graphics (like icons or logos) directly into CSS or HTML files, preventing the browser from having to make a separate HTTP network request to fetch the image.'
      }
    ]
  },
  'image-to-base64': {
    seo: {
      title: 'Image to Base64 Encoder — Convert Images to Data URIs',
      description: 'Encode images (PNG, JPG, WEBP, SVG) into Base64 strings. Generate ready-to-use Data URIs to embed images directly into your HTML, CSS, or JSON.',
      keywords: ['image to base64', 'base64 encoder', 'convert image to base64', 'data uri generator', 'image base64 string'],
      tldr: 'Convert any image into a Base64 string for direct embedding into code.',
      entity_definition: 'The Image to Base64 Encoder is a frontend optimization utility. It reads a standard binary image file (such as a PNG or JPEG) and converts it into a Base64-encoded ASCII string. The resulting string is formatted as a valid Data URI (`data:image/png;base64,...`), allowing the image to be embedded directly into web code, thereby eliminating an external network request.'
    },
    faqs: [
      {
        question: 'Does Base64 encoding increase the file size?',
        answer: 'Yes. Base64 encoding generally increases the size of the original file by roughly 33%. For this reason, it is only recommended for very small images, like icons or tiny logos.'
      },
      {
        question: 'How do I use the generated Base64 string in CSS?',
        answer: 'You can use it as a background image exactly like a normal URL. Example: `background-image: url("data:image/png;base64,...");`'
      },
      {
        question: 'Is the image uploaded to your servers?',
        answer: 'No. We use the HTML5 FileReader API to process the image directly inside your browser. The file never leaves your device.'
      }
    ]
  },
  'favicon-generator': {
    seo: {
      title: 'Favicon Generator — Create Text & Letter Icons',
      description: 'Generate beautiful text-based favicons instantly. Customize colors, shapes, and fonts, and download all standard sizes for modern web apps and PWAs.',
      keywords: ['favicon generator', 'text favicon', 'letter favicon', 'icon generator', 'pwa icon generator'],
      tldr: 'Design a beautiful lettermark favicon and generate all standard dimensions instantly.',
      entity_definition: 'The Favicon Generator is a brand identity and web configuration utility. A favicon (favorite icon) is the small icon displayed in browser tabs, bookmarks, and mobile home screens. Instead of requiring complex graphic design software, this tool utilizes the HTML5 Canvas API to programmatically draw text-based (lettermark) logos, automatically exporting them into every standard dimension required by modern browsers and Progressive Web Apps (PWAs).'
    },
    faqs: [
      {
        question: 'What are the standard favicon sizes?',
        answer: 'Modern web standards require multiple sizes: 16x16 (standard tabs), 32x32 (taskbar shortcuts), 180x180 (Apple Touch Icon), and 192x192 / 512x512 (Android/Chrome PWAs). Our tool generates all of these automatically.'
      },
      {
        question: 'Do I still need an .ico file?',
        answer: 'Usually, no. Almost all modern browsers perfectly support standard `.png` files for favicons, which offer better transparency and file sizes than legacy `.ico` formats.'
      },
      {
        question: 'How do I install the favicon on my website?',
        answer: 'Place the generated images in your website\'s root directory, and copy the provided `manifest.json` or HTML `<link>` tags into the `<head>` of your website.'
      }
    ]
  },
  'image-resizer': {
    seo: {
      title: 'Image Resizer — Smart Aspect Ratio & Target KB Resizer',
      description: 'Resize images in your browser instantly. Lock aspect ratios, define exact pixel dimensions, or dynamically compress images to hit a specific target KB size.',
      keywords: ['image resizer', 'resize image online', 'reduce image size', 'target kb image', 'change image dimensions'],
      tldr: 'Precisely resize images by exact pixel dimensions or target file size.',
      entity_definition: 'The Image Resizer is a client-side media manipulation tool. It utilizes the browser\'s HTML5 Canvas API to redraw images at altered dimensions. Beyond simple pixel adjustments, this tool features an advanced binary search algorithm that recursively adjusts JPEG compression ratios until the output file matches a specific target size (in Kilobytes), a common requirement for strict web forms and profile picture uploads.'
    },
    faqs: [
      {
        question: 'How does the Target File Size feature work?',
        answer: 'If you set a target size (e.g., 100 KB), the tool runs a binary search algorithm. It repeatedly compresses the image in the background, testing different quality levels until it finds the maximum possible quality that stays under your requested file size limit.'
      },
      {
        question: 'Are my images uploaded for processing?',
        answer: 'No. The image resizing engine runs entirely within your browser using JavaScript and HTML5 Canvas. This guarantees zero latency and 100% privacy.'
      },
      {
        question: 'Why did my PNG turn into a JPG?',
        answer: 'If you request a specific Target File Size, the tool must use a format that supports variable compression (like JPG or WEBP). PNG is a lossless format, meaning its file size cannot be heavily reduced without changing the pixel dimensions.'
      }
    ]
  },
  'image-compressor-pro': {
    seo: {
      title: 'Image Compressor Pro — Reduce File Size Instantly',
      description: 'Compress JPG and PNG images directly in your browser. Adjust compression quality in real-time to save bandwidth without sacrificing visual quality.',
      keywords: ['image compressor', 'compress image online', 'reduce jpg size', 'image optimization', 'lossy compression'],
      tldr: 'Optimize images to significantly reduce file size while maintaining visual quality.',
      entity_definition: 'The Image Compressor Pro is a media optimization utility designed to reduce the storage and bandwidth footprint of images. It performs lossy compression by recalculating the image data on an HTML5 Canvas and exporting it at a lower quality ratio. This allows web developers and designers to significantly reduce page load times (improving Core Web Vitals and SEO) by stripping unnoticeable graphical data from large photos.'
    },
    faqs: [
      {
        question: 'What is lossy compression?',
        answer: 'Lossy compression permanently removes minor graphical data (like subtle color variations) that the human eye struggles to perceive. This results in massive file size reductions with almost unnoticeable drops in visual quality.'
      },
      {
        question: 'What compression quality should I use?',
        answer: 'A quality level of 80% (0.8) is generally considered the "sweet spot" for web images, offering an excellent balance between sharp visuals and small file sizes.'
      },
      {
        question: 'Is it safe to compress sensitive photos?',
        answer: 'Yes, 100% safe. The tool processes the image locally on your device. We do not transmit or save any photos to our servers.'
      }
    ]
  }
};

let updatedCount = 0;
doc.tools.forEach(tool => {
  if (updates[tool.slug]) {
    const data = updates[tool.slug];
    tool.seo = tool.seo || {};
    tool.seo.title = data.seo.title;
    tool.seo.description = data.seo.description;
    tool.seo.keywords = data.seo.keywords;
    tool.seo.tldr = data.seo.tldr;
    tool.seo.entity_definition = data.seo.entity_definition;
    
    // Add FAQs
    tool.faqs = data.faqs;
    updatedCount++;
  }
});

fs.writeFileSync(path, yaml.dump(doc, { lineWidth: -1 }), 'utf8');
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 16');
