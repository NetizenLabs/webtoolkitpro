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
  'css-gradient-generator': {
    seo: {
      title: 'CSS Gradient Generator — Linear, Radial & Conic',
      description: 'Generate beautiful CSS gradients instantly. Create linear, radial, and conic backgrounds with custom color stops, angles, and real-time live preview.',
      keywords: ['css gradient generator', 'linear gradient', 'radial gradient', 'conic gradient', 'css background generator'],
      tldr: 'Design beautiful CSS gradients and copy the cross-browser compatible code instantly.',
      entity_definition: 'The CSS Gradient Generator is a frontend design utility that visually constructs complex `background-image` CSS rules. Instead of manually writing syntax for `linear-gradient`, `radial-gradient`, or the newer `conic-gradient` specifications, developers can visually drag color stops along a slider and adjust angles. The tool mathematically calculates the color interpolation points (percentages) and generates precise, ready-to-copy CSS code.'
    },
    faqs: [
      {
        question: 'What is a conic gradient?',
        answer: 'While linear gradients transition colors along a straight line, and radial gradients transition outward from a center point, conic gradients transition colors in a circular motion around a center point (like a pie chart or a color wheel).'
      },
      {
        question: 'Are CSS gradients cross-browser compatible?',
        answer: 'Yes. Modern CSS gradients are fully supported across all major browsers (Chrome, Firefox, Safari, Edge) without requiring heavy vendor prefixes.'
      },
      {
        question: 'How many color stops can I add?',
        answer: 'You can add an unlimited number of color stops. However, for the best visual aesthetics, 2 to 4 color stops are usually recommended to prevent "muddy" color mixing.'
      }
    ]
  },
  'css-shadow-gen': {
    seo: {
      title: 'CSS Box Shadow Generator — Create Soft Drop Shadows',
      description: 'Design perfect CSS box-shadows visually. Adjust X/Y offsets, blur radius, spread, opacity, and instantly copy the generated CSS code.',
      keywords: ['css box shadow generator', 'css shadow generator', 'drop shadow css', 'neumorphism generator', 'soft shadow css'],
      tldr: 'Visually design and generate perfect CSS drop-shadows and inset shadows.',
      entity_definition: 'The CSS Box Shadow Generator is a visual interface for constructing the CSS `box-shadow` property. Designing a natural-looking shadow manually requires understanding how X/Y offsets interact with blur radius, spread radius, and RGBA alpha channels. This utility allows developers to manipulate these properties via visual sliders, instantly previewing the spatial depth and lighting effects before generating the required CSS string.'
    },
    faqs: [
      {
        question: 'What makes a shadow look natural?',
        answer: 'Natural shadows typically have a high blur radius, zero or negative spread, and very low opacity (e.g., `rgba(0,0,0, 0.05)`). Harsh, dark shadows look unnatural because ambient light in the real world causes shadows to diffuse.'
      },
      {
        question: 'What is an inset shadow?',
        answer: 'An inset shadow renders inside the element\'s border instead of outside it. This creates the illusion that the element is pressed or sunken into the page, a technique heavily used in "Neumorphic" UI design.'
      },
      {
        question: 'Does box-shadow affect layout performance?',
        answer: 'Yes. Rendering very large or heavily blurred box-shadows requires the browser to do significant repainting during scrolling or animations. Use them purposefully.'
      }
    ]
  },
  'color-picker': {
    seo: {
      title: 'Color Picker & Converter — HEX, RGB, HSL',
      description: 'A professional color picker and format converter. Easily select colors and instantly convert between HEX, RGB, and HSL formats for web design.',
      keywords: ['color picker online', 'hex to rgb', 'rgb to hex', 'hsl converter', 'web color selector'],
      tldr: 'Select a color visually and instantly get its HEX, RGB, and HSL values.',
      entity_definition: 'The Color Picker and Converter is a foundational UI design utility that bridges visual color selection with programmatic CSS values. While designers think in visual hues, web browsers render colors via specific mathematical formats: Hexadecimal (Base-16), RGB (Red/Green/Blue additive mixing), or HSL (Hue/Saturation/Lightness). This tool allows a user to select a hue visually and executes algorithms to convert that single color point into all three major CSS-compatible formats simultaneously.'
    },
    faqs: [
      {
        question: 'Which color format should I use in CSS?',
        answer: 'HEX is the most common and concise format. However, HSL is highly recommended for modern design systems because it makes it incredibly easy to create lighter or darker variations of a color simply by adjusting the Lightness percentage.'
      },
      {
        question: 'What is the difference between RGB and HSL?',
        answer: 'RGB defines how much red, green, and blue light is emitted from the screen. HSL defines a color based on its position on a 360-degree color wheel (Hue), its intensity (Saturation), and its brightness (Lightness). HSL is generally more intuitive for humans to read and modify.'
      },
      {
        question: 'Can I copy the values with a single click?',
        answer: 'Yes, the tool features one-click copy buttons for every format, ensuring you can quickly paste the exact value into your CSS or Tailwind config.'
      }
    ]
  },
  'color-contrast': {
    seo: {
      title: 'Color Contrast Checker — WCAG Accessibility Tester',
      description: 'Test text and background color contrast ratios for WCAG 2.0 AA and AAA compliance. Ensure your website design is accessible to visually impaired users.',
      keywords: ['color contrast checker', 'wcag contrast ratio', 'accessibility tester', 'a11y color contrast', 'background contrast'],
      tldr: 'Check if your text colors have sufficient contrast against their background for readability.',
      entity_definition: 'The Color Contrast Checker is an accessibility (a11y) validation tool. It calculates the contrast ratio between a foreground color (text) and a background color using the official Web Content Accessibility Guidelines (WCAG) 2.0 relative luminance formula. The resulting ratio determines if the text is legible for users with moderate to severe vision impairment. Failing to meet minimum contrast ratios (4.5:1 for normal text) creates significant usability issues.'
    },
    faqs: [
      {
        question: 'What is a good contrast ratio?',
        answer: 'To pass WCAG AA compliance (the legal standard in many regions), standard text requires a contrast ratio of at least 4.5:1. Large text (usually 18pt or larger) requires a ratio of at least 3:1.'
      },
      {
        question: 'What does WCAG AAA mean?',
        answer: 'WCAG AAA is the highest and strictest level of accessibility compliance. It requires a contrast ratio of 7:1 for normal text and 4.5:1 for large text. It is often required for government or specialized accessible websites.'
      },
      {
        question: 'How is the ratio calculated mathematically?',
        answer: 'The ratio is calculated by comparing the relative luminance (the perceived brightness) of both colors. The formula converts the RGB sRGB values into a linear color space to measure exactly how the human eye interprets the brightness difference.'
      }
    ]
  },
  'color-blind-simulator': {
    seo: {
      title: 'Color Blindness Simulator — Test Image Accessibility',
      description: 'Upload an image to simulate how it looks to users with Deuteranopia, Protanopia, and Tritanopia. Ensure your UI designs are accessible to everyone.',
      keywords: ['color blind simulator', 'color blindness tester', 'deuteranopia simulator', 'accessibility testing', 'image color blind test'],
      tldr: 'See how your images and designs appear to users with various forms of color blindness.',
      entity_definition: 'The Color Blindness Simulator is an advanced accessibility utility designed to replicate Color Vision Deficiency (CVD). Affecting over 300 million people globally, CVD primarily alters the perception of red/green (Deuteranopia/Protanopia) or blue/yellow (Tritanopia) light. This tool uses specialized SVG `feColorMatrix` filters to mathematically alter the RGB values of a user-uploaded image, providing designers with an accurate visual simulation of how color-blind users experience their interfaces or charts.'
    },
    faqs: [
      {
        question: 'What is the most common form of color blindness?',
        answer: 'Deuteranopia (a type of red-green color blindness) is the most common, affecting roughly 6% of males. Protanopia (another red-green variant) affects roughly 1%.'
      },
      {
        question: 'Why does this matter for web design?',
        answer: 'If you rely entirely on color to convey critical information (like a green button for "Save" and a red button for "Delete" without text labels), a user with Deuteranopia may see two identical greyish-yellow buttons, making the interface unusable.'
      },
      {
        question: 'Are the images I upload saved to a server?',
        answer: 'No. The simulation relies entirely on local browser technologies (HTML5 Canvas and SVG Filters). Your images are processed securely on your local device and are never uploaded.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 14');
