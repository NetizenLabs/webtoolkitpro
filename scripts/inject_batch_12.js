const fs = require('fs');
const yaml = require('js-yaml'); 

const yamlFile = 'config/tools.yaml';
const fileContent = fs.readFileSync(yamlFile, 'utf8');

const parsed = yaml.load(fileContent);

const enhancements = {
  'xml-formatter': {
    practical_application: "XML remains the backbone of financial protocols (FIXML), RSS feeds, and enterprise SOAP APIs. Because XML relies heavily on nested tags and namespaces, unformatted XML payloads are nearly impossible to debug. A formatter normalizes indentation, exposing structural errors like unclosed nodes or orphaned attributes.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Node.js XML Formatting",
        code: "const xmlFormat = require('xml-formatter');\n\nconst formattedXml = xmlFormat('<root><child>Data</child></root>', {\n  indentation: '  ',\n  collapseContent: true\n});\nconsole.log(formattedXml);"
      }
    ]
  },
  'pwa-manifest': {
    practical_application: "A Progressive Web App (PWA) Manifest (`manifest.json`) transforms a standard website into an installable native-like application on Android and iOS. Defining the `display: standalone` property, theme colors, and icon arrays allows your web app to launch full-screen, bypassing the browser's URL bar and unlocking push notifications.",
    code_blueprints: [
      {
        language: "json",
        title: "Standard PWA Manifest",
        code: "{\n  \"name\": \"WebToolkit Pro\",\n  \"short_name\": \"WTK Pro\",\n  \"start_url\": \"/?source=pwa\",\n  \"display\": \"standalone\",\n  \"background_color\": \"#0B1120\",\n  \"theme_color\": \"#00D4B4\"\n}"
      }
    ]
  },
  'readability-checker': {
    practical_application: "Flesch-Kincaid readability algorithms calculate the complexity of text based on syllable counts and sentence length. Google's Helpful Content Update penalizes highly complex, academic writing for consumer-focused queries. Tuning content to an 8th-grade reading level guarantees the widest demographic engagement and lowest bounce rate.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Readability Score Math",
        code: "function calculateFleschKincaid(totalWords, totalSentences, totalSyllables) {\n  // Standard Flesch-Kincaid Grade Level Formula\n  const score = 0.39 * (totalWords / totalSentences) + 11.8 * (totalSyllables / totalWords) - 15.59;\n  return Math.max(0, score.toFixed(1));\n}"
      }
    ]
  },
  'emoji-picker': {
    practical_application: "Emojis drastically boost Click-Through Rates (CTR) in email subject lines and Meta Titles. However, different operating systems (iOS vs Windows) render emojis differently. A standardized picker ensures that unicode surrogate pairs (like ZWJ sequences used in complex emojis) are safely copied to the clipboard without rendering as broken question marks.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Safe Clipboard Unicode Copy",
        code: "async function copyEmojiToClipboard(emojiChar) {\n  try {\n    await navigator.clipboard.writeText(emojiChar);\n    console.log(`Successfully copied: ${emojiChar}`);\n  } catch (err) {\n    console.error('Clipboard API denied access.', err);\n  }\n}"
      }
    ]
  },
  'css-color-extractor': {
    practical_application: "When auditing legacy codebases or cloning a competitor's UI, CSS files often contain hundreds of scattered hex codes, RGB values, and HSL definitions. A color extractor parses the Abstract Syntax Tree (AST) to generate a consolidated palette, allowing engineers to quickly migrate hardcoded colors into CSS Variables or Tailwind tokens.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Regex Color Extraction",
        code: "function extractHexColors(cssString) {\n  // Matches 3, 4, 6, and 8 digit hex codes\n  const hexRegex = /#(?:[0-9a-fA-F]{3,4}){1,2}\\b/g;\n  const matches = cssString.match(hexRegex) || [];\n  // Return unique colors only\n  return [...new Set(matches)];\n}"
      }
    ]
  },
  'webhook-visualizer': {
    practical_application: "Webhooks allow systems (like Stripe, GitHub, or Shopify) to push real-time event data to your server. A webhook visualizer acts as an intermediate tunneling inspector (similar to Ngrok), capturing the exact JSON payload, HTTP headers, and HMAC signatures so engineers can write their backend parsing logic accurately.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Express.js Webhook Receiver",
        code: "app.post('/webhook/stripe', express.raw({type: 'application/json'}), (req, res) => {\n  const signature = req.headers['stripe-signature'];\n  try {\n    // Verify the HMAC signature before processing the event\n    const event = stripe.webhooks.constructEvent(req.body, signature, endpointSecret);\n    console.log(`Received Event: ${event.type}`);\n    res.send();\n  } catch (err) {\n    res.status(400).send(`Webhook Error: ${err.message}`);\n  }\n});"
      }
    ]
  },
  'storage-auditor': {
    practical_application: "Modern web applications frequently leak sensitive data (JWT tokens, PII) into LocalStorage and SessionStorage. Because these storage mechanisms are accessible via JavaScript, they are highly vulnerable to Cross-Site Scripting (XSS). Auditing storage ensures that sensitive tokens are moved to HttpOnly, Secure cookies instead.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Audit LocalStorage Consumption",
        code: "function auditStorage() {\n  let totalBytes = 0;\n  for(let i = 0; i < localStorage.length; i++) {\n    const key = localStorage.key(i);\n    const value = localStorage.getItem(key);\n    totalBytes += (key.length + value.length) * 2; // UTF-16 characters are 2 bytes\n  }\n  console.log(`Total LocalStorage usage: ${(totalBytes / 1024).toFixed(2)} KB`);\n}"
      }
    ]
  },
  'text-similarity': {
    practical_application: "Cosine Similarity and Levenshtein Distance algorithms calculate how closely two strings match. This is crucial for building 'Did you mean?' search autocorrects, detecting plagiarized SEO content, and filtering out duplicate user-generated submissions in large database architectures.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Levenshtein Distance Math",
        code: "// Calculates the minimum number of single-character edits required to change one word into the other\nfunction levenshtein(a, b) {\n  if(a.length === 0) return b.length;\n  if(b.length === 0) return a.length;\n  const matrix = [];\n  // Matrix initialization and dynamic programming omitted for brevity\n  // Returns an integer representing the edit distance\n  return calculateDistance(a, b);\n}"
      }
    ]
  },
  'site-audit-pro': {
    practical_application: "A comprehensive SEO Site Audit goes beyond meta tags. It involves crawling the DOM to identify broken 404 internal links, missing `alt` attributes on images, and analyzing the text-to-HTML ratio. Fixing these technical debt issues clears the path for Googlebot to allocate maximum crawl budget to your money pages.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Identify Broken DOM Links",
        code: "const allLinks = document.querySelectorAll('a');\nallLinks.forEach(link => {\n  const href = link.getAttribute('href');\n  if (!href || href === '#' || href.includes('javascript:')) {\n    console.warn('Suspicious or broken link found:', link);\n  }\n});"
      }
    ]
  },
  'aspect-ratio-calc': {
    practical_application: "Cumulative Layout Shift (CLS) is a critical Core Web Vitals metric. When an image loads dynamically without predefined dimensions, it pushes the text down, frustrating users. Calculating and applying the correct CSS aspect ratio or HTML `width`/`height` attributes reserves the exact layout space before the image downloads.",
    code_blueprints: [
      {
        language: "css",
        title: "Modern CSS Aspect Ratio",
        code: ".video-container {\n  width: 100%;\n  /* Enforces a 16:9 widescreen ratio regardless of width */\n  aspect-ratio: 16 / 9;\n  background-color: #1E2D47; /* Fallback skeleton color */\n}"
      }
    ]
  }
};

let modified = false;

parsed.tools.forEach(tool => {
  if (enhancements[tool.slug]) {
    tool.content.practical_application = enhancements[tool.slug].practical_application;
    tool.content.code_blueprints = enhancements[tool.slug].code_blueprints;
    modified = true;
    console.log(`Updated ${tool.slug}`);
  }
});

if (modified) {
  fs.writeFileSync(yamlFile, yaml.dump(parsed));
  console.log('Successfully injected Batch 12 semantic depth.');
} else {
  console.log('No tools were modified.');
}
