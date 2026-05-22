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
  'color-picker': {
    seo: {
      title: 'Universal Color Picker — HEX, RGB & HSL Converter',
      description: 'Select, extract, and convert colors seamlessly between HEX, RGB, and HSL formats. An essential visual design utility for frontend developers and UI/UX designers.',
      keywords: ['color picker online', 'hex color picker', 'rgb to hex converter', 'hsl color selector', 'web design color tool'],
      tldr: 'Visually select colors and instantly convert them across standard web formats (HEX, RGB, HSL).',
      entity_definition: 'The Universal Color Picker is a graphical user interface (GUI) utility designed for digital color space manipulation. It allows users to visually sample a color using a standard chromatic spectrum and immediately generates the corresponding mathematical representations required for CSS styling. The tool utilizes advanced color-space algorithms to convert between Hexadecimal (HEX), Red-Green-Blue (RGB), and Hue-Saturation-Lightness (HSL) models in real-time, ensuring pixel-perfect color accuracy across different rendering engines and design systems.'
    },
    faqs: [
      {
        question: 'What is the difference between RGB and HSL?',
        answer: 'RGB (Red, Green, Blue) is an additive color model based on how digital screens emit light. HSL (Hue, Saturation, Lightness) is a cylindrical-coordinate representation of colors that aligns more closely with human visual perception, making it much easier for designers to create complementary color palettes.'
      },
      {
        question: 'Why do web developers prefer HEX codes?',
        answer: 'Hexadecimal (HEX) codes are highly compact. A 6-character string (like #FFFFFF for white) is easier to copy, paste, and store in codebases than typing out rgb(255, 255, 255). It is the universal standard for declaring colors in CSS.'
      },
      {
        question: 'Does this tool support alpha transparency?',
        answer: 'This specific utility focuses on solid colors (HEX). For transparency, you must use RGBA or HSLA formats, which append an "Alpha" channel value between 0.0 (fully transparent) and 1.0 (fully opaque).'
      }
    ]
  },
  'color-contrast': {
    seo: {
      title: 'WCAG Color Contrast Checker — Accessibility Compliance Tool',
      description: 'Audit your website\'s color contrast against strict WCAG 2.1 AA and AAA accessibility standards. Ensure your UI design is readable for visually impaired users.',
      keywords: ['wcag color contrast checker', 'accessibility color tester', 'check color contrast online', 'wcag aa aaa compliance', 'ui accessibility tool'],
      tldr: 'Mathematically audit your foreground and background colors to ensure WCAG accessibility compliance.',
      entity_definition: 'The WCAG Color Contrast Checker is a compliance utility that calculates the relative luminance (brightness) difference between two overlapping colors. Formulated by the World Wide Web Consortium (W3C), the Web Content Accessibility Guidelines (WCAG) dictate that standard text must have a contrast ratio of at least 4.5:1 (AA standard) against its background to be readable by users with moderate visual impairments. This tool executes the exact W3C mathematical formula to instantly grade your design choices, legally protecting digital platforms from accessibility lawsuits.'
    },
    faqs: [
      {
        question: 'What is the difference between WCAG AA and AAA?',
        answer: 'WCAG AA is the global legal standard for web accessibility, requiring a minimum contrast ratio of 4.5:1 for normal text. WCAG AAA is the strictest level, requiring a massive 7.1:1 contrast ratio, which is typically only required for specialized government or medical software.'
      },
      {
        question: 'How is relative luminance calculated?',
        answer: 'Relative luminance is calculated by converting RGB values into a linear color space and applying specific weights based on human eye sensitivity (Green contributes the most to perceived brightness, Blue the least). The formula is: L = 0.2126*R + 0.7152*G + 0.0722*B.'
      },
      {
        question: 'Does font size affect contrast requirements?',
        answer: 'Yes. Larger text (typically defined as 18pt normal or 14pt bold) is inherently easier to read. Therefore, WCAG lowers the contrast requirement for Large Text to a 3.0:1 ratio for AA compliance.'
      }
    ]
  },
  'css-shadow-gen': {
    seo: {
      title: 'CSS Box Shadow Generator — Create Modern UI Shadows',
      description: 'Design beautiful, modern CSS box-shadows visually. Adjust offsets, blur radius, spread, and opacity to instantly generate production-ready CSS code.',
      keywords: ['css box shadow generator', 'generate css shadow online', 'modern ui shadow builder', 'css drop shadow tool', 'box-shadow css code'],
      tldr: 'Visually construct modern CSS box-shadows and instantly export the resulting code.',
      entity_definition: 'The CSS Box Shadow Generator is a visual interface for constructing complex `box-shadow` properties in CSS3. A box-shadow consists of up to six parameters: horizontal offset, vertical offset, blur radius, spread radius, color, and an optional "inset" keyword for internal shadows. Because adjusting these values blindly in code is tedious, this generator maps interactive sliders directly to the DOM in real-time. This allows UI developers to instantly preview elevation, depth, and glassmorphism effects before copying the finalized string directly into their stylesheet.'
    },
    faqs: [
      {
        question: 'What does the spread radius do in a box-shadow?',
        answer: 'The spread radius dictates how much the shadow expands (or shrinks, if negative) before the blur effect is applied. A positive spread makes the shadow larger than the element itself, while a negative spread pulls it tightly underneath the element.'
      },
      {
        question: 'How do I create a natural-looking shadow?',
        answer: 'The secret to modern, natural-looking UI shadows is using very low opacity (e.g., 0.05 to 0.15) and a high blur radius. Harsh, pitch-black shadows look amateurish; softer, lighter shadows simulate real-world ambient lighting.'
      },
      {
        question: 'What is an inset shadow?',
        answer: 'By appending the "inset" keyword to a box-shadow declaration, the shadow is rendered inside the boundary of the element rather than outside. This is commonly used to create debossed, pressed-in, or "Neumorphic" UI button states.'
      }
    ]
  },
  'css-gradient-generator': {
    seo: {
      title: 'CSS Gradient Generator — Linear, Radial & Conic Editor',
      description: 'Create stunning CSS gradients visually. Generate code for Linear, Radial, and Conic gradients with unlimited color stops for modern frontend web development.',
      keywords: ['css gradient generator', 'linear gradient builder', 'radial gradient tool', 'css background gradient', 'conic gradient online'],
      tldr: 'Visually engineer complex CSS gradients with custom angles, types, and unlimited color stops.',
      entity_definition: 'The CSS Gradient Generator is a visual compositing tool for frontend engineers. In CSS3, gradients are treated as background images rather than solid colors. The tool allows developers to visually configure the three primary gradient syntaxes: Linear (colors transition along a straight line/angle), Radial (colors radiate outward from a central point), and Conic (colors transition rotated around a center point). By managing the mathematical positioning (percentages) of multiple "Color Stops," the generator outputs a pristine, cross-browser compatible CSS string.'
    },
    faqs: [
      {
        question: 'What is a CSS Color Stop?',
        answer: 'A Color Stop dictates exactly where a specific color should reach its pure, unblended state within a gradient. By assigning percentages (e.g., Red 0%, Blue 100%), the browser calculates the smooth mathematical interpolation between those points.'
      },
      {
        question: 'Can I animate a CSS gradient?',
        answer: 'Directly animating the `background-image` property (which gradients use) is heavily restricted in CSS and often causes severe performance lag. To animate gradients, developers typically animate the `background-position` of an oversized gradient instead.'
      },
      {
        question: 'What is a conic-gradient?',
        answer: 'Unlike radial gradients (which emanate outward from a center point), a conic-gradient wraps colors around a center point, much like slices of a pie chart or a color wheel. It is highly effective for creating circular progress bars and dynamic pie charts in pure CSS.'
      }
    ]
  },
  'hex-to-rgb': {
    seo: {
      title: 'HEX to RGB Converter — Color Code Translator',
      description: 'Instantly convert Hexadecimal (HEX) color codes into RGB values. A fast, offline color conversion utility for frontend web developers and UI designers.',
      keywords: ['hex to rgb converter', 'hex to rgb online', 'convert hex color', 'rgb color code generator', 'hexadecimal to rgb'],
      tldr: 'Instantly translate Hexadecimal color strings into standard RGB coordinates.',
      entity_definition: 'The HEX to RGB Converter is a specialized mathematical parser that translates 6-digit hexadecimal color strings into the Red, Green, and Blue (RGB) 256-level color scale. It operates by splitting the HEX string into three pairs (e.g., #FF0000 becomes FF, 00, 00) and running them through a Base-16 to Base-10 parseInt() algorithm. While modern browsers render both formats identically, converting to RGB is strictly required when a developer needs to inject an alpha-transparency channel (RGBA) programmatically into a CSS variable system.'
    },
    faqs: [
      {
        question: 'Why convert HEX to RGB?',
        answer: 'The most common reason developers convert HEX to RGB is to apply transparency. While modern CSS supports 8-digit HEX codes for transparency, RGBA (e.g., rgba(255, 0, 0, 0.5)) remains the most readable and universally supported method for declaring semi-transparent colors.'
      },
      {
        question: 'How does Hexadecimal color work?',
        answer: 'Hexadecimal counts in Base-16 (0-9 and A-F). A standard HEX color contains 6 characters representing Red, Green, and Blue channels. The lowest value (00) means no color, while the highest value (FF) means full intensity (255 in decimal).'
      },
      {
        question: 'Are HEX and RGB rendering speeds different?',
        answer: 'No. At the browser engine level (like Chrome\'s Blink engine), all CSS color formats are immediately parsed into the same underlying mathematical representation during the painting phase. There is absolutely no performance difference.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 6');
