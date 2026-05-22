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
  'rgba-to-hex': {
    seo: {
      title: 'RGBA to HEX Converter — CSS Color Code Translation',
      description: 'Convert RGBA color values to 8-digit HEX codes instantly. Translate CSS transparency and opacity perfectly across all design tools and stylesheets.',
      keywords: ['rgba to hex converter', 'css color converter', 'convert transparent hex', '8 digit hex code', 'rgba to hex code'],
      tldr: 'Convert CSS RGBA color values into 8-digit HEX codes to preserve transparency.',
      entity_definition: 'The RGBA to HEX Converter is a frontend design utility. In CSS, colors are traditionally written in RGBA (Red, Green, Blue, Alpha) where the Alpha channel controls transparency (0.0 to 1.0). Modern web browsers and design tools (like Figma) now support 8-digit Hexadecimal codes (e.g., `#FF573380`), where the final two digits represent the alpha transparency. This tool mathematically translates the decimal RGBA values into a perfectly equivalent 8-digit base-16 HEX string.'
    },
    faqs: [
      {
        question: 'What do the last two digits of an 8-digit hex code mean?',
        answer: 'The final two digits represent the "Alpha" (transparency) channel. For example, in `#000000FF`, the `FF` equals 100% opacity, while `00` equals 0% (fully transparent).'
      },
      {
        question: 'Is 8-digit hex supported everywhere?',
        answer: 'Yes. All modern browsers (Chrome, Firefox, Safari) fully support 8-digit HEX codes in CSS. However, very old legacy browsers may ignore the transparency digits.'
      },
      {
        question: 'How is Alpha calculated in hex?',
        answer: 'The alpha percentage is multiplied by 255 and then converted to base-16. For example, 50% opacity (0.5) is `0.5 * 255 = 127.5`. Rounded to 128, the hexadecimal conversion is `80`.'
      }
    ]
  },
  'px-to-rem': {
    seo: {
      title: 'PX to REM Converter — Accessible CSS Typography',
      description: 'Convert standard CSS Pixels (px) into Root EM (rem) units. Build responsive, highly accessible typography systems that scale with user browser settings.',
      keywords: ['px to rem converter', 'convert pixels to rem', 'css rem calculator', 'accessible typography scaling', 'root em converter'],
      tldr: 'Convert standard CSS Pixels (px) into relative Root EM (rem) units for scalable typography.',
      entity_definition: 'The PX to REM Converter is a web accessibility and styling utility. While CSS Pixels (px) are absolute units, `rem` (Root EM) is a relative unit tied directly to the browser\'s root `<html>` font size (defaulting to 16px). Using `rem` instead of `px` for font sizes and padding ensures that a website automatically scales up or down if a visually impaired user increases their browser\'s default text size. This tool mathematically translates static pixel values into fluid rem ratios based on a configurable base size.'
    },
    faqs: [
      {
        question: 'What is the default base font size?',
        answer: 'In nearly all modern web browsers, the default root font size is `16px`. Therefore, `1rem` equals `16px` by default.'
      },
      {
        question: 'Why not just use pixels?',
        answer: 'Pixels are absolute. If you hardcode `font-size: 16px`, it completely overrides the user\'s personal browser settings. Using `1rem` respects their preferences, making your site WCAG accessible.'
      },
      {
        question: 'What is the difference between EM and REM?',
        answer: '`em` is relative to the font size of its direct parent element, which can cause chaotic compounding issues if deeply nested. `rem` (Root EM) bypasses parents and strictly references the root `<html>` element, providing consistent scaling.'
      }
    ]
  },
  'rem-to-px': {
    seo: {
      title: 'REM to PX Converter — CSS Typography Calculator',
      description: 'Convert CSS Root EM (rem) values back into absolute Pixels (px). Quickly translate responsive CSS frameworks like Tailwind back into hard pixel dimensions.',
      keywords: ['rem to px converter', 'convert rem to pixels', 'css pixel calculator', 'tailwind rem to px', 'root em to pixels'],
      tldr: 'Convert relative CSS Root EM (rem) units back into absolute Pixel (px) values.',
      entity_definition: 'The REM to PX Converter is a frontend layout diagnostic utility. Modern CSS frameworks (like Tailwind CSS or Bootstrap) almost exclusively use `rem` units for margins, padding, and typography to ensure accessibility. However, developers and designers often need to translate these fluid `rem` values back into hard pixels to match exact Figma designs or raster image dimensions. This tool calculates the absolute pixel equivalent by multiplying the `rem` value by the root document font size.'
    },
    faqs: [
      {
        question: 'How do you calculate REM to PX?',
        answer: 'The formula is simply `remValue * baseFontSize`. If your base font size is the default 16px, then `2.5rem` multiplied by `16` equals `40px`.'
      },
      {
        question: 'Can I change the base font size?',
        answer: 'Yes. While 16px is standard, some developers use a CSS trick setting the root html font-size to `62.5%` (which makes 1rem = 10px). The tool allows you to adjust the base size to match your codebase.'
      },
      {
        question: 'Why do Figma designs use pixels?',
        answer: 'Design tools like Figma are fundamentally vector graphic engines, operating on an absolute pixel grid. It is up to the frontend developer to translate those static pixels into responsive CSS units like rems and percentages.'
      }
    ]
  },
  'aspect-ratio-calc': {
    seo: {
      title: 'Aspect Ratio Calculator — Image & Video Dimensions',
      description: 'Calculate exact Aspect Ratios for images, video, and CSS layouts. Instantly find the missing width or height to maintain perfect 16:9 or 4:3 proportions.',
      keywords: ['aspect ratio calculator', '16:9 calculator', 'calculate image dimensions', 'video resolution calculator', 'css aspect ratio tool'],
      tldr: 'Calculate the exact width or height required to maintain a specific aspect ratio.',
      entity_definition: 'The Aspect Ratio Calculator is a graphic design and CSS layout utility. An aspect ratio describes the proportional relationship between the width and height of an image or screen (e.g., 16:9 for HD video). When resizing images for web optimization or generating CSS `aspect-ratio` padding boxes, developers must maintain these exact mathematical proportions to prevent visual stretching or squishing. This tool uses cross-multiplication to instantly calculate missing dimensions.'
    },
    faqs: [
      {
        question: 'What is 16:9?',
        answer: '16:9 is the standard aspect ratio for high-definition video (HDTV, YouTube, 1080p, 4K). It means for every 16 units of width, there are 9 units of height.'
      },
      {
        question: 'How does CSS aspect-ratio work?',
        answer: 'The modern CSS property `aspect-ratio: 16 / 9;` automatically calculates the height of an element based on its current width, eliminating the need for old "padding-top hacks" used for responsive iframes.'
      },
      {
        question: 'Does changing the aspect ratio crop the image?',
        answer: 'Yes. If you force an image with a 4:3 ratio into a 16:9 container, you must either stretch the pixels (distortion), add black bars (letterboxing), or crop the top and bottom off the image.'
      }
    ]
  },
  'percentage-calc': {
    seo: {
      title: 'Percentage Calculator — Quick Math & Value Changes',
      description: 'Calculate percentages instantly. Find X percent of Y, calculate percentage increases or decreases, and solve complex layout ratios effortlessly.',
      keywords: ['percentage calculator', 'calculate percentage increase', 'find percent of a number', 'percentage decrease calculator', 'quick math tool'],
      tldr: 'Instantly calculate percentage increases, decreases, and complex ratios.',
      entity_definition: 'The Percentage Calculator is a mathematical utility. In software development and e-commerce, computing percentages is a daily requirement—whether calculating discount pricing logic, analyzing Server Uptime (e.g., 99.99%), or translating absolute pixel widths into fluid CSS percentage layouts (e.g., 300px out of 1200px is 25%). This tool provides instant, multi-modal algebraic calculations for exact percentages, absolute differences, and relative growth.'
    },
    faqs: [
      {
        question: 'How do you calculate percentage increase?',
        answer: 'Subtract the old value from the new value. Divide that difference by the old value, and then multiply by 100. For example: from 50 to 75 is an increase of 25. (25 / 50) * 100 = 50% increase.'
      },
      {
        question: 'What is a fluid percentage in CSS?',
        answer: 'In responsive web design, instead of giving a sidebar a static width of `300px`, developers divide the target width by the parent container\'s width (e.g., 300 / 1200 = 0.25). The CSS is then set to `width: 25%`, allowing it to scale fluidly.'
      },
      {
        question: 'Are percentages reversible?',
        answer: 'No. A 50% increase followed by a 50% decrease does not return you to the original number. If you increase 100 by 50%, you get 150. Decreasing 150 by 50% results in 75.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 36');
