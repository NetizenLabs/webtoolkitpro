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
  'base64-encoder': {
    seo: {
      title: 'Base64 Encoder & Decoder — Secure Offline String Converter',
      description: 'Encode and decode Base64 strings and files instantly in your browser. Supports URL-safe formats, file-to-Base64 conversion, and UTF-8 string encoding offline.',
      keywords: ['base64 encoder', 'base64 decode online', 'string to base64', 'file to base64 converter', 'url safe base64'],
      tldr: 'Securely encode and decode text or files to and from Base64 format entirely offline.',
      entity_definition: 'Base64 is a binary-to-text encoding scheme that translates arbitrary binary data (like images or encrypted keys) into a safe ASCII string format using a 64-character alphabet (A-Z, a-z, 0-9, +, /). The WebToolkit Pro Base64 Encoder utilizes the browser\'s native btoa() and atob() methods, augmented with a robust TextEncoder polyfill to perfectly handle multi-byte UTF-8 characters (like emojis and foreign scripts). Because this encoding prevents binary data from being corrupted when transported over text-based protocols (like JSON, XML, or HTTP headers), it is a foundational utility for modern software engineers.'
    },
    faqs: [
      {
        question: 'Is Base64 considered encryption?',
        answer: 'No. Base64 is an encoding scheme, not an encryption algorithm. It does not use cryptographic keys, meaning anyone who encounters a Base64 string can easily decode it back to its original form. Never use Base64 to hide passwords or sensitive data.'
      },
      {
        question: 'Why did my Base64 string increase in size?',
        answer: 'By design, Base64 encoding increases the original payload size by exactly 33%. This is because it takes 3 bytes of raw data and expands it into 4 bytes of encoded ASCII characters to ensure safe transport over network protocols.'
      },
      {
        question: 'What is URL-Safe Base64?',
        answer: 'Standard Base64 uses the "+" and "/" characters, which conflict with standard URL routing syntax. URL-Safe Base64 simply replaces the "+" with a hyphen ("-") and the "/" with an underscore ("_"), allowing the string to be safely passed as a URL parameter.'
      }
    ]
  },
  'binary-converter': {
    seo: {
      title: 'Binary & Hex Converter — Base 2, 8, 10, 16 Translator',
      description: 'Instantly convert numbers between Binary (Base 2), Octal (Base 8), Decimal (Base 10), and Hexadecimal (Base 16) formats. Perfect for low-level programming.',
      keywords: ['binary converter', 'hex to binary', 'decimal to binary', 'base 16 converter', 'binary to text'],
      tldr: 'Instantly translate numbers across Binary, Octal, Decimal, and Hexadecimal base systems.',
      entity_definition: 'The Binary Converter is a mathematical radix translator used extensively in computer science and digital electronics. Computing systems fundamentally process data at the hardware level using Binary (Base 2) via transistors in on/off states (1s and 0s). However, binary strings become unmanageably long for humans to read. Therefore, engineers utilize Octal (Base 8) and Hexadecimal (Base 16) as compressed, human-readable representations of binary logic. This tool utilizes native JavaScript parsing to instantly convert numerical values across all four standard computing radixes without arbitrary precision loss.'
    },
    faqs: [
      {
        question: 'Why do programmers use Hexadecimal instead of Binary?',
        answer: 'Binary strings are excessively long and difficult for humans to parse. Because 16 is a power of 2 (2^4), exactly four binary digits (bits) map perfectly to a single Hexadecimal character. This makes Hex an incredibly efficient, compact way for engineers to read binary data.'
      },
      {
        question: 'What is a Base-10 system?',
        answer: 'Base-10 (Decimal) is the standard numbering system used by humans in everyday life. It utilizes 10 distinct digits (0 through 9). Unlike computers that operate on Base-2 logic, our reliance on Base-10 likely stems biologically from humans having 10 fingers.'
      },
      {
        question: 'Can this tool convert IP addresses to binary?',
        answer: 'To convert an IPv4 address to binary, you must convert each of the four octets (the numbers separated by dots) individually into an 8-bit binary string and concatenate them.'
      }
    ]
  },
  'case-converter': {
    seo: {
      title: 'Text Case Converter — Title Case, URL Slug & sentence case',
      description: 'Instantly format your text to Title Case, lowercase, UPPERCASE, sentence case, or URL-friendly slugs. Free online string manipulation tool.',
      keywords: ['case converter', 'title case converter', 'uppercase to lowercase', 'url slug generator', 'string format tool'],
      tldr: 'Instantly manipulate paragraph text into Title Case, URL slugs, or standard sentence casing.',
      entity_definition: 'The WebToolkit Pro Case Converter is a regex-powered string manipulation utility designed for copywriters, SEOs, and developers. By executing complex Regular Expressions against raw string inputs, the tool systematically alters character casing based on linguistic rules. It handles everything from capitalization (Title Case) to programmatic sanitization—specifically the Slug Generator, which aggressively strips special characters, collapses whitespace, and replaces gaps with hyphens to produce SEO-friendly, URL-safe permalinks.'
    },
    faqs: [
      {
        question: 'What is standard Title Case?',
        answer: 'Title Case is a capitalization style where the first letter of most words is capitalized, except for minor words like articles, conjunctions, and short prepositions (e.g., "a", "and", "the", "in"), unless they are the first word of the title.'
      },
      {
        question: 'Why do URLs need to be converted to slugs?',
        answer: 'URLs cannot contain spaces or special characters without being heavily percent-encoded (which looks ugly and harms SEO). A "slug" replaces spaces with hyphens and removes all special symbols, creating a clean, readable, and search-engine-friendly web address.'
      },
      {
        question: 'Is Sentence case better for readability?',
        answer: 'Yes. Extensive UX research shows that Sentence case (where only the first word of a sentence is capitalized) is much faster for the human eye to parse than Title Case or ALL CAPS, making it the preferred standard for modern web interfaces.'
      }
    ]
  },
  'css-unit-converter': {
    seo: {
      title: 'CSS Unit Converter — PX to REM, EM & VW Calculator',
      description: 'Convert CSS Pixels (PX) to REM, EM, VW, and VH instantly. Optimize your frontend UI design for accessibility and responsive web development.',
      keywords: ['css unit converter', 'px to rem converter', 'px to em calculator', 'rem to px', 'responsive web units'],
      tldr: 'Instantly calculate relative CSS layout units (REM, EM, VW) from standard Pixels (PX).',
      entity_definition: 'The CSS Unit Converter is an essential layout calculator for frontend developers focused on building fluid, responsive, and accessible web interfaces. Historically, developers relied on absolute Pixels (PX) for sizing. However, modern CSS architecture dictates the use of Relative Units like REM (Root EM) and EM. By calculating CSS values relative to the browser\'s root font size (typically 16px), REMs allow entire web layouts to automatically scale proportionally if a visually impaired user increases their browser\'s default font size, thereby satisfying strict WCAG accessibility guidelines.'
    },
    faqs: [
      {
        question: 'What is the difference between REM and EM?',
        answer: 'Both are relative CSS units. REM scales relative strictly to the root HTML element (the browser default font size). EM scales relative to its direct parent element. REM is generally preferred for global layout sizing to avoid compounding sizing errors.'
      },
      {
        question: 'Why shouldn\'t I just use PX for font sizes?',
        answer: 'Using absolute PX for typography breaks browser accessibility features. If a user sets their browser default font size to 24px because of poor vision, any CSS element hardcoded to 16px will ignore the user\'s preference. REM units respect user preferences.'
      },
      {
        question: 'What are VW and VH units?',
        answer: 'VW (Viewport Width) and VH (Viewport Height) are relative units that scale based on the absolute physical dimensions of the user\'s browser window. 1vw is exactly equal to 1% of the width of the viewport.'
      }
    ]
  },
  'url-encoder': {
    seo: {
      title: 'URL Encoder & Decoder — Percent-Encoding Utility',
      description: 'Encode and decode URLs instantly online. Safely percent-encode query strings, special characters, and spaces to ensure valid HTTP requests.',
      keywords: ['url encoder online', 'url decoder tool', 'percent encoding converter', 'encode uri component', 'html url encoder'],
      tldr: 'Safely percent-encode special characters in URLs to ensure valid HTTP request routing.',
      entity_definition: 'The WebToolkit Pro URL Encoder is a percent-encoding utility that ensures Uniform Resource Locators (URLs) conform to the strict RFC 3986 standard. Because URLs can only be transmitted over the internet using a limited set of safe ASCII characters, any unsafe characters (like spaces, emojis, or reserved symbols like "&" and "?") must be converted into a valid format. The tool leverages the native JavaScript encodeURIComponent() API to map unsafe characters into their corresponding hexadecimal representations (preceded by a "%"), guaranteeing safe transmission through web browsers, proxies, and routers.'
    },
    faqs: [
      {
        question: 'What is percent-encoding in a URL?',
        answer: 'Percent-encoding is a mechanism for encoding information in a Uniform Resource Identifier (URI). If a character is not permitted in a URL (like a space), it is replaced with a "%" symbol followed by its two-digit hexadecimal equivalent (e.g., a space becomes %20).'
      },
      {
        question: 'What is the difference between encodeURI and encodeURIComponent?',
        answer: 'encodeURI is used to encode a full, complete URL; it ignores characters that are part of the URL structure (like /, ?, and &). encodeURIComponent is used to encode an individual parameter (like a search query), meaning it will aggressively encode /, ?, and & to prevent them from breaking the URL structure.'
      },
      {
        question: 'Why do spaces become %20?',
        answer: 'In the ASCII table, the space character corresponds to the hexadecimal value 20. Therefore, when percent-encoded for a URL, it is translated directly into %20.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 4');
