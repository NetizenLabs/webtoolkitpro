const fs = require('fs');
const yaml = require('js-yaml'); 

const yamlFile = 'config/tools.yaml';
const fileContent = fs.readFileSync(yamlFile, 'utf8');

const parsed = yaml.load(fileContent);

const enhancements = {
  'percentage-calc': {
    practical_application: "Percentage calculations are the foundation of E-commerce margin math, tax deductions, and split-testing metrics. Calculating relative growth (Month-over-Month) requires precise floating-point math. Due to JavaScript's IEEE 754 precision issues (e.g., `0.1 + 0.2 === 0.30000000000000004`), naive percentage math in financial apps can lead to massive revenue discrepancies.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Safe Financial Math",
        code: "function safePercentageIncrease(oldValue, newValue) {\n  // Multiply by 100 before division to avoid floating-point loss\n  const diff = newValue - oldValue;\n  const percentage = (diff * 100) / oldValue;\n  return Number(percentage.toFixed(2)); // Round safely to 2 decimal places\n}"
      }
    ]
  },
  'nanoid-gen': {
    practical_application: "NanoID is rapidly replacing UUIDv4 in modern applications because it is 60% faster, highly secure, and utilizes a larger alphabet (A-Za-z0-9_-), resulting in significantly shorter strings. This makes it the ideal choice for generating shareable short-links, database primary keys, and React component keys without polluting the DOM.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Custom NanoID Alphabet",
        code: "import { customAlphabet } from 'nanoid';\n\n// Create a URL-safe ID generator without lookalike characters (0, O, I, l)\nconst nanoid = customAlphabet('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz', 10);\n\nconsole.log(`Share Link: /p/${nanoid()}`);"
      }
    ]
  },
  'character-counter': {
    practical_application: "Database constraints (like `VARCHAR(255)`) operate strictly on character count, not word count. Furthermore, SMS gateways (like Twilio) segment messages every 160 characters, multiplying costs if limits are exceeded. A precise character counter must accurately measure Unicode surrogate pairs (like emojis) which often count as 2-4 bytes.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Unicode-Safe Character Count",
        code: "function getRealLength(str) {\n  // String.length fails on emojis. Using the spread operator splits by code point.\n  return [...str].length;\n}\n\nconsole.log('👨‍👩‍👧'.length); // Returns 8 (Incorrect)\nconsole.log(getRealLength('👨‍👩‍👧')); // Returns 5 (Safe)"
      }
    ]
  },
  'credit-card-validator': {
    practical_application: "To prevent fraudulent or mistyped payment submissions, the Luhn Algorithm (Modulus 10) must be executed client-side. Validating the mathematical integrity of a credit card number before sending it to a payment gateway (like Stripe or Braintree) reduces API error rates and provides instant feedback to the user.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Luhn Algorithm Implementation",
        code: "function luhnCheck(cardNumber) {\n  let sum = 0;\n  let isEven = false;\n  // Iterate backwards through the digits\n  for (let i = cardNumber.length - 1; i >= 0; i--) {\n    let digit = parseInt(cardNumber.charAt(i), 10);\n    if (isEven) { digit *= 2; if (digit > 9) digit -= 9; }\n    sum += digit;\n    isEven = !isEven;\n  }\n  return (sum % 10) === 0;\n}"
      }
    ]
  },
  'iban-validator': {
    practical_application: "International Bank Account Numbers (IBAN) contain built-in check digits to verify routing accuracy. B2B SaaS platforms handling wire transfers must validate IBAN structure (Country Code + Check Digits + BBAN) before initiating a SEPA transfer, preventing thousands of dollars from being routed into the void.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Modulo 97 IBAN Check",
        code: "function isValidIBAN(iban) {\n  const clean = iban.replace(/\\s/g, '').toUpperCase();\n  const rearranged = clean.slice(4) + clean.slice(0, 4);\n  const numericStr = rearranged.replace(/[A-Z]/g, match => match.charCodeAt(0) - 55);\n  // Use BigInt because the numeric string exceeds JavaScript's MAX_SAFE_INTEGER\n  return BigInt(numericStr) % 97n === 1n;\n}"
      }
    ]
  },
  'broken-link-checker': {
    practical_application: "A single broken link (404 Not Found) destroys user trust and heavily penalizes a page's SEO ranking. Because modern websites dynamically load content via React or Vue, standard static crawlers fail to see the links. A robust checker must execute JavaScript and trace hrefs recursively.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Client-Side Link Crawler",
        code: "async function checkLink(url) {\n  try {\n    const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' });\n    // no-cors obscures exact status, but network failures throw an error\n    return response.type === 'opaque' ? 'Likely Alive' : response.ok;\n  } catch (e) {\n    return 'Broken';\n  }\n}"
      }
    ]
  },
  'image-compressor-pro': {
    practical_application: "E-commerce sites are notoriously heavy due to unoptimized product photos. Utilizing WebAssembly (Wasm) ports of MozJPEG or libimagequant allows the browser to perform lossless and lossy compression entirely client-side. This eliminates massive server bandwidth costs and protects user privacy.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Canvas Compression API",
        code: "function compressImage(file, quality = 0.8) {\n  return new Promise((resolve) => {\n    const reader = new FileReader();\n    reader.onload = (e) => {\n      const img = new Image();\n      img.onload = () => {\n        const canvas = document.createElement('canvas');\n        canvas.width = img.width; canvas.height = img.height;\n        canvas.getContext('2d').drawImage(img, 0, 0);\n        canvas.toBlob(resolve, 'image/jpeg', quality);\n      };\n      img.src = e.target.result;\n    };\n    reader.readAsDataURL(file);\n  });\n}"
      }
    ]
  },
  'pdf-to-text-extractor': {
    practical_application: "Legal tech and automated accounting software rely heavily on parsing PDFs. However, standard PDFs are binary files that require complex font mapping. Utilizing PDF.js in the browser allows for client-side Optical Character Recognition (OCR) and text extraction without sending sensitive tax documents to a remote server.",
    code_blueprints: [
      {
        language: "javascript",
        title: "PDF.js Text Extraction",
        code: "import * as pdfjsLib from 'pdfjs-dist';\n\nasync function extractText(fileBuffer) {\n  const pdf = await pdfjsLib.getDocument({ data: fileBuffer }).promise;\n  const page = await pdf.getPage(1);\n  const textContent = await page.getTextContent();\n  \n  return textContent.items.map(item => item.str).join(' ');\n}"
      }
    ]
  },
  'text-to-speech-pro': {
    practical_application: "Web Accessibility (A11y) goes beyond screen readers. Providing an integrated Text-to-Speech (TTS) engine using the browser's native SpeechSynthesis API drastically improves UX for users with dyslexia, visual impairments, or simply those who prefer consuming long-form content via audio.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Web Speech API",
        code: "function speakText(text, voiceName = 'Google UK English Male') {\n  const utterance = new SpeechSynthesisUtterance(text);\n  const voices = window.speechSynthesis.getVoices();\n  \n  utterance.voice = voices.find(v => v.name === voiceName);\n  utterance.rate = 1.0;\n  utterance.pitch = 1.0;\n  \n  window.speechSynthesis.speak(utterance);\n}"
      }
    ]
  },
  'js-evaluator': {
    practical_application: "Evaluating arbitrary user JavaScript is incredibly dangerous. Using `eval()` exposes the entire DOM and global Window object to malicious injection (XSS). A secure evaluator must execute the code inside an isolated Web Worker or an iframe sandbox, entirely decoupled from the main thread.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Web Worker Sandbox",
        code: "const workerCode = `\n  self.onmessage = function(e) {\n    try {\n      // Execute in isolated context without DOM access\n      const result = new Function(e.data)(); \n      self.postMessage(result);\n    } catch(err) { self.postMessage(err.toString()); }\n  };\n`;\nconst blob = new Blob([workerCode], { type: 'application/javascript' });\nconst worker = new Worker(URL.createObjectURL(blob));"
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
  console.log('Successfully injected Batch 13 semantic depth.');
} else {
  console.log('No tools were modified.');
}
