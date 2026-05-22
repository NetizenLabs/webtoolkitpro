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
  'uuid-v4-gen': {
    seo: {
      title: 'UUID v4 Generator — Secure Random GUIDs',
      description: 'Generate secure, random UUID v4 identifiers instantly. Our tool uses cryptographic APIs to ensure zero-collision, universally unique IDs for your databases.',
      keywords: ['uuid generator', 'generate uuid v4', 'guid generator', 'random uuid', 'cryptographic uuid'],
      tldr: 'Generate cryptographically secure, universally unique identifiers (UUIDs).',
      entity_definition: 'The UUID v4 Generator is a secure string generation utility. A UUID (Universally Unique Identifier) is a 128-bit label used for information in computer systems. Specifically, Version 4 UUIDs are generated using cryptographic pseudo-random number generators (PRNGs), ensuring that the probability of generating a duplicate ID (a collision) is astronomically low—making them perfect for database primary keys and stateless distributed systems.'
    },
    faqs: [
      {
        question: 'Are these UUIDs cryptographically secure?',
        answer: 'Yes. The tool utilizes the Web Crypto API (`crypto.randomUUID()`) to generate mathematically secure IDs directly in your browser, rather than relying on weak, predictable algorithms like `Math.random()`.'
      },
      {
        question: 'What is the difference between UUID and GUID?',
        answer: 'They are exactly the same thing. GUID (Globally Unique Identifier) is simply the term Microsoft historically used to refer to the UUID standard in their ecosystem.'
      },
      {
        question: 'What are the chances of a collision?',
        answer: 'The number of possible UUID v4 combinations is 2^122 (approx. 5.3 x 10^36). You would need to generate 1 billion UUIDs every second for 85 years to have even a 50% chance of a single collision.'
      }
    ]
  },
  'nanoid-gen': {
    seo: {
      title: 'NanoID Generator — Fast, URL-Safe Unique IDs',
      description: 'Generate URL-friendly, compact NanoIDs. Customize the length and instantly copy highly secure unique identifiers perfect for modern web applications.',
      keywords: ['nanoid generator', 'generate nanoid', 'url safe id', 'compact uuid alternative', 'nanoid online'],
      tldr: 'Generate compact, URL-safe unique IDs using a cryptographic randomizer.',
      entity_definition: 'The NanoID Generator is a modern string generation utility designed as a faster, more compact alternative to UUIDs. Unlike UUIDs which use a 36-character hexadecimal format, NanoIDs use a larger 64-character alphabet (A-Z, a-z, 0-9, -, _). This larger alphabet allows NanoIDs to be significantly shorter while maintaining the exact same cryptographic collision resistance, making them highly optimized for URL slugs and compact database storage.'
    },
    faqs: [
      {
        question: 'Is NanoID better than UUID?',
        answer: 'For many web applications, yes. A standard 21-character NanoID offers the exact same collision resistance as a 36-character UUID v4, but takes up less space in a database and looks cleaner in a URL.'
      },
      {
        question: 'Are NanoIDs URL-safe?',
        answer: 'Yes, absolutely. The standard NanoID alphabet specifically excludes characters that would break URLs, making them perfect for public-facing route parameters (e.g., `youtube.com/watch?v=NANOID`).'
      },
      {
        question: 'Is this generator secure?',
        answer: 'Yes. It leverages the `window.crypto.getRandomValues()` API to ensure that the randomly selected characters are cryptographically unpredictable.'
      }
    ]
  },
  'random-user-gen': {
    seo: {
      title: 'Random User Generator — Mock Identity Data',
      description: 'Generate realistic mock user profiles instantly. Get fake names, emails, phone numbers, avatars, and locations for UI testing and database seeding.',
      keywords: ['random user generator', 'fake identity generator', 'mock user data', 'test user profiles', 'generate fake person'],
      tldr: 'Instantly generate realistic, mock user identities for UI mockups and testing.',
      entity_definition: 'The Random User Generator is a mock-data utility designed for front-end developers, QA testers, and designers. When building user interfaces or populating test databases, using realistic data is critical to evaluating layout flow and text wrapping. This tool deterministically combines arrays of realistic names, locations, and programmatic avatars to instantly synthesize completely fictional, privacy-safe user profiles formatted in JSON.'
    },
    faqs: [
      {
        question: 'Are these real people?',
        answer: 'No. Every name, email, and location is programmatically stitched together from arrays of random data. They are entirely fictional.'
      },
      {
        question: 'Can I copy the data as JSON?',
        answer: 'Yes, the tool features a one-click button to copy the entire user profile as a cleanly formatted JSON object, perfect for pasting directly into your code.'
      },
      {
        question: 'Where do the avatars come from?',
        answer: 'The tool programmatically generates unique avatar URLs, allowing you to instantly visualize profile pictures in your UI mockups.'
      }
    ]
  },
  'qr-code-gen': {
    seo: {
      title: 'QR Code Generator — 100% Private & Client-Side',
      description: 'Generate high-quality QR codes for URLs, text, and data entirely in your browser. Download the QR code as a PNG without any tracking or server uploads.',
      keywords: ['qr code generator', 'create qr code', 'client side qr code', 'generate qr code free', 'private qr code'],
      tldr: 'Generate high-resolution QR codes privately in your browser without any API calls.',
      entity_definition: 'The QR Code (Quick Response Code) Generator is a client-side graphical encoding utility. A QR Code is a two-dimensional matrix barcode capable of storing massive amounts of alphanumeric data (like long URLs or contact info). This tool utilizes a local JavaScript library to mathematically encode your text and draw the resulting matrix onto an HTML5 Canvas, ensuring complete privacy as your data is never sent to a remote API.'
    },
    faqs: [
      {
        question: 'Do these QR codes expire?',
        answer: 'No! Because these are static QR codes containing the raw data (not redirect links), they will work forever. We do not use link shorteners or trackers.'
      },
      {
        question: 'Is my data sent to a server?',
        answer: 'No. Our tool was specifically engineered to use client-side rendering. The QR code is generated entirely by your browser, making it safe for highly sensitive internal URLs or passwords.'
      },
      {
        question: 'Can I download the QR code?',
        answer: 'Yes. Once generated, you can instantly download the QR code as a high-quality PNG image suitable for printing or digital distribution.'
      }
    ]
  },
  'barcode-gen': {
    seo: {
      title: 'Barcode Generator — Code 128, EAN-13, UPC',
      description: 'Generate professional barcodes instantly in your browser. Supports Code 128, EAN-13, UPC, and Code 39 formats. 100% client-side privacy.',
      keywords: ['barcode generator', 'create code 128', 'generate ean13', 'upc barcode generator', 'jsbarcode online'],
      tldr: 'Generate standard retail and inventory barcodes instantly and privately.',
      entity_definition: 'The Barcode Generator is a logistics and retail encoding utility. It converts alphanumeric text into standardized, machine-readable optical patterns. By leveraging the `jsbarcode` library, this tool programmatically draws complex symbologies (like Code 128 for complex logistics, or EAN-13/UPC for global retail products) directly onto an HTML5 Canvas. This strictly client-side architecture guarantees that sensitive inventory or product data is never exposed to third-party servers.'
    },
    faqs: [
      {
        question: 'Which barcode format should I use?',
        answer: 'If you are tagging products for retail sale, use UPC (USA/Canada) or EAN-13 (Global). If you are creating internal inventory tags that require letters and numbers, use Code 128.'
      },
      {
        question: 'Why is my barcode failing to generate?',
        answer: 'Certain formats have strict data rules. For example, UPC requires exactly 11 or 12 numeric digits. If you enter letters into a UPC generator, it will fail.'
      },
      {
        question: 'Is this secure for proprietary inventory numbers?',
        answer: 'Yes. The barcode is mathematically drawn on your local device using JavaScript. No data is ever transmitted across the network.'
      }
    ]
  },
  'credit-card-validator': {
    seo: {
      title: 'Credit Card Validator — Luhn Algorithm Tester',
      description: 'Validate credit card numbers instantly using the mathematical Luhn algorithm (Modulus 10). Detects Visa, Mastercard, AMEX, and Discover without server calls.',
      keywords: ['credit card validator', 'luhn algorithm checker', 'validate card number', 'mod 10 algorithm', 'check credit card format'],
      tldr: 'Verify if a credit card number is mathematically valid without transmitting any data.',
      entity_definition: 'The Credit Card Validator is a financial formatting utility that implements the Luhn Algorithm (Mod 10 checksum). Created by IBM scientist Hans Peter Luhn in 1954, this mathematical formula verifies the integrity of identification numbers. The tool runs locally in the browser to strip spaces, calculate the checksum digits, and instantly confirm if a credit card number is structurally valid, while simultaneously identifying the Issuer Identification Number (IIN) to determine the card brand (Visa, AMEX, etc.).'
    },
    faqs: [
      {
        question: 'Is it safe to type my real credit card number here?',
        answer: 'Yes, but you shouldn\'t. While our tool runs 100% locally in your browser and NEVER sends data to the internet, it is a bad security practice to type real financial data into any online tool. Use this for testing mock data only.'
      },
      {
        question: 'Does this check if the card has money on it?',
        answer: 'No. This tool only performs a mathematical checksum (the Luhn algorithm) to verify that the string of numbers is formatted correctly. It does not connect to any banking APIs.'
      },
      {
        question: 'How does it know the card brand?',
        answer: 'Credit cards begin with specific Issuer Identification Numbers (IIN). For example, numbers starting with 4 are Visa, while 51-55 are Mastercard.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 17');
