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
  'binary-to-hex': {
    seo: {
      title: 'Binary to Hexadecimal Converter — Base-2 to Base-16',
      description: 'Convert Binary (Base-2) computer code to Hexadecimal (Base-16) values instantly. Perfect for low-level programming, memory addressing, and IPv6 routing.',
      keywords: ['binary to hex converter', 'base 2 to base 16', 'convert binary to hexadecimal', 'binary to hex calculator', 'computer science math tool'],
      tldr: 'Convert machine-level Binary (Base-2) code into human-readable Hexadecimal (Base-16) format.',
      entity_definition: 'The Binary to Hexadecimal Converter is a computer science utility. While computers process everything in Binary (Base-2, zeros and ones), humans find massive strings of binary impossible to read. Hexadecimal (Base-16, using digits 0-9 and letters A-F) is used by engineers to elegantly compress binary data. Because 16 is a power of 2, this tool can algorithmically group every 4 binary bits (a nibble) and translate them into a single, perfectly equivalent Hexadecimal character, making memory addresses and IPv6 configurations readable.'
    },
    faqs: [
      {
        question: 'Why do programmers use Hexadecimal?',
        answer: 'Hexadecimal acts as a shorthand for Binary. It is much easier for a developer to read and debug the hex value `FF` rather than its exact binary equivalent `11111111`.'
      },
      {
        question: 'What is a "nibble"?',
        answer: 'In computing, a "nibble" is a group of exactly four binary bits (half of an 8-bit byte). The maximum decimal value of a nibble is 15 (`1111`), which corresponds exactly to the maximum hexadecimal character `F`.'
      },
      {
        question: 'Do hex codes use lowercase or uppercase letters?',
        answer: 'Both are mathematically identical. The hex code `#A1B2` is exactly the same value as `#a1b2`. Most programming style guides prefer uppercase for readability.'
      }
    ]
  },
  'hex-to-binary': {
    seo: {
      title: 'Hexadecimal to Binary Converter — Base-16 to Base-2',
      description: 'Convert Hexadecimal (Base-16) to Binary (Base-2) computer code. Easily decode MAC addresses, CSS colors, and memory dumps back into raw machine bits.',
      keywords: ['hex to binary converter', 'base 16 to base 2', 'convert hex to binary', 'hexadecimal to binary calculator', 'decode mac address binary'],
      tldr: 'Convert compressed Hexadecimal (Base-16) notation back into raw Binary (Base-2) bits.',
      entity_definition: 'The Hexadecimal to Binary Converter is a low-level debugging utility. When reverse-engineering software, analyzing network packets (like MAC addresses), or inspecting raw memory dumps, data is usually presented in Hexadecimal (Base-16). To understand exactly how the hardware processes this data, developers must convert it back to its fundamental binary state. This tool algorithmically parses the hex string, expanding every single hex character (0-F) into its exact 4-bit (nibble) binary equivalent (e.g., `A` becomes `1010`).'
    },
    faqs: [
      {
        question: 'How do you convert Hex to Binary?',
        answer: 'You map each individual hex character to its 4-digit binary equivalent. For example, the hex string `3B` is split into `3` (which is `0011`) and `B` (which is `1011`), resulting in the binary string `00111011`.'
      },
      {
        question: 'What is a MAC address?',
        answer: 'A Media Access Control (MAC) address is a unique identifier assigned to a network interface controller (like your WiFi card). It is universally displayed as a 12-digit hexadecimal number (e.g., `00:1A:2B:3C:4D:5E`).'
      },
      {
        question: 'Is Base-16 faster than Base-2?',
        answer: 'No. The computer hardware ONLY executes Base-2 binary. Base-16 is strictly a visual formatting layer used to make the data shorter and easier for human engineers to read on a screen.'
      }
    ]
  },
  'binary-to-text': {
    seo: {
      title: 'Binary to Text Converter — Decode ASCII & UTF-8',
      description: 'Translate raw Binary code (0s and 1s) back into readable English text. Instantly decode ASCII and UTF-8 strings for cryptography and computer science.',
      keywords: ['binary to text converter', 'decode binary to english', 'binary to ascii', 'binary string translator', 'read binary code'],
      tldr: 'Decode raw computer Binary code (zeros and ones) back into readable English text.',
      entity_definition: 'The Binary to Text Converter is a string decoding utility. Computers do not inherently understand letters or alphabets; they strictly process numerical values in binary. Character encoding standards (like ASCII and UTF-8) exist to mathematically map specific binary sequences to human-readable letters (e.g., `01000001` equals the capital letter "A"). This tool parses a stream of raw binary, splits it into 8-bit bytes, and translates those decimal equivalents against the ASCII/UTF-8 character tables to reveal the hidden text.'
    },
    faqs: [
      {
        question: 'How does the computer know a binary string is a letter?',
        answer: 'It relies entirely on the software context. The binary string `01000001` is mathematically the decimal number 65. If a text editor reads it, it looks at the ASCII table and displays an "A". If a calculator reads it, it displays "65".'
      },
      {
        question: 'What is ASCII?',
        answer: 'ASCII (American Standard Code for Information Interchange) is a legacy character encoding standard. It uses 7 or 8 bits to define 128 standard characters, including the English alphabet, numbers, and basic punctuation.'
      },
      {
        question: 'Can binary translate to emojis?',
        answer: 'Yes, but not using ASCII. Emojis require the much larger UTF-8 encoding standard, which uses complex multi-byte binary sequences to represent thousands of global characters and icons.'
      }
    ]
  },
  'http-headers-inspector': {
    seo: {
      title: 'HTTP Headers Inspector — Analyze Server Responses',
      description: 'Inspect and analyze raw HTTP response headers for any URL. View caching rules, server architecture, security headers, and redirect chains instantly.',
      keywords: ['http headers inspector', 'check server headers', 'analyze response headers', 'view http status code', 'check security headers'],
      tldr: 'Inspect the raw HTTP response headers of any URL to debug caching and security policies.',
      entity_definition: 'The HTTP Headers Inspector is a network debugging utility. When a browser requests a webpage, the server sends back "Headers" before the actual HTML content. These hidden key-value pairs contain critical metadata controlling browser caching (`Cache-Control`), security policies (`Content-Security-Policy`), server architecture (`Server: nginx`), and redirection logic. This tool executes a precise HTTP GET/HEAD request to a target URL, bypassing browser abstractions to expose the raw header payload for diagnostic auditing.'
    },
    faqs: [
      {
        question: 'What is Cache-Control?',
        answer: '`Cache-Control` is an HTTP header that dictates how long a browser or CDN is allowed to save (cache) a copy of the webpage before it must request a fresh version from the server.'
      },
      {
        question: 'Why are Security Headers important?',
        answer: 'Headers like `Strict-Transport-Security` (HSTS) and `X-Frame-Options` actively instruct the browser to block malicious actions, such as preventing your site from being embedded in a hacker\'s invisible iframe (Clickjacking).'
      },
      {
        question: 'How do I spot a 301 Redirect?',
        answer: 'If the server responds with a `301 Moved Permanently` status code, the headers will include a `Location` key, which explicitly tells the browser the new URL it must navigate to.'
      }
    ]
  },
  'domain-age-checker': {
    seo: {
      title: 'Domain Age Checker — WHOIS Registration Date',
      description: 'Check the exact registration date and age of any domain name. Analyze domain authority history and find out exactly when a website was created.',
      keywords: ['domain age checker', 'check domain registration date', 'find website age', 'whois domain lookup', 'how old is a website'],
      tldr: 'Query the WHOIS database to find the exact creation date and age of any domain name.',
      entity_definition: 'The Domain Age Checker is a digital forensics and SEO utility. Search engine algorithms historically view older domains as having higher inherent "Authority" and trust compared to newly registered sites. This tool executes a query against the global WHOIS database—the public registry maintained by ICANN that tracks internet domain ownership. It extracts the exact `Creation Date` timestamp, calculating the precise age of the domain in years, months, and days.'
    },
    faqs: [
      {
        question: 'Does Domain Age impact SEO?',
        answer: 'Yes, but indirectly. A 10-year-old domain is more likely to have accumulated thousands of high-quality backlinks over a decade, which is what actually drives the high SEO ranking, rather than the age itself.'
      },
      {
        question: 'What is WHOIS?',
        answer: 'WHOIS is a widely used internet protocol that queries databases to find the registered owners, registrars, and crucial dates (creation, expiration) of an internet resource like a domain name or IP address block.'
      },
      {
        question: 'Can I see who owns the domain?',
        answer: 'Often, no. Due to modern privacy regulations like GDPR, most domain registrars now automatically redact the personal name and email address of the owner from public WHOIS records, though the registration dates remain public.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 41');
