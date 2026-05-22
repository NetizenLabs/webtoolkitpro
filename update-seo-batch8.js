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
  'uuid-generator': {
    seo: {
      title: 'UUID Generator (v4 / v7) — Generate Unique Identifiers',
      description: 'Generate bulk, secure universally unique identifiers (UUIDs). Fully supports standard random UUID v4 and the new time-sorted UUID v7 standard.',
      keywords: ['uuid generator', 'random uuid', 'uuid v4', 'uuid v7', 'bulk uuid generator', 'guid generator online'],
      tldr: 'Generate cryptographically secure v4 and time-sorted v7 UUIDs in bulk instantly.',
      entity_definition: 'A Universally Unique Identifier (UUID) is a 128-bit label used for uniquely identifying information in computing systems. The WebToolkit Pro UUID Generator is a client-side cryptographic utility that leverages the browser\'s native `crypto.randomUUID()` API. It supports generating standard randomized UUID version 4 (which relies entirely on pseudo-random entropy) as well as the modern UUID version 7, which incorporates a Unix timestamp in its first 48 bits, making it mathematically optimized for database indexing and sorting.'
    },
    faqs: [
      {
        question: 'What is the difference between UUID v4 and v7?',
        answer: 'UUID v4 is entirely random, meaning the IDs cannot be chronologically sorted. UUID v7 solves this by embedding a millisecond-precision Unix timestamp at the beginning of the string, ensuring that newly generated IDs are naturally sortable while retaining cryptographic uniqueness.'
      },
      {
        question: 'Are these UUIDs secure for production databases?',
        answer: 'Yes. The generator hooks directly into the Web Crypto API provided by your operating system to ensure high-entropy cryptographic randomness. The UUIDs are not generated using the mathematically predictable Math.random() function.'
      },
      {
        question: 'Can I generate UUIDs in bulk?',
        answer: 'Yes, the tool includes a quantity modifier allowing you to instantly generate up to 100 UUIDs at a time, making it ideal for seeding development databases.'
      }
    ]
  },
  'html-entities': {
    seo: {
      title: 'HTML Entities Encoder & Decoder — Sanitize Web Text',
      description: 'Safely encode and decode HTML entities to prevent XSS attacks. Convert reserved characters like <, >, and & into their secure entity equivalents.',
      keywords: ['html entity encoder', 'html entity decoder', 'escape html online', 'prevent xss string', 'sanitize html characters'],
      tldr: 'Encode dangerous HTML characters to prevent rendering errors and XSS vulnerabilities.',
      entity_definition: 'The HTML Entities Encoder/Decoder is a string sanitization tool designed for secure web development. Certain characters are reserved in HTML (such as `<` and `>`), and if a user types them into an input field, the browser may interpret them as executable code, leading to Cross-Site Scripting (XSS) vulnerabilities. This tool uses iterative Regular Expression mapping to intercept these reserved characters and safely translate them into their corresponding HTML entity codes (e.g., converting `<` to `&lt;`).'
    },
    faqs: [
      {
        question: 'Why do I need to encode HTML entities?',
        answer: 'If you want to display the actual string "<div>" on a webpage without the browser attempting to render an actual HTML div block, you must encode the brackets. This tells the browser to display the characters visually rather than parsing them.'
      },
      {
        question: 'What characters does this tool encode?',
        answer: 'The tool encodes standard reserved characters (ampersands, quotes, less-than, greater-than) as well as higher-order Unicode characters, converting them into numeric character references (e.g., `&#160;`).'
      },
      {
        question: 'How does the decoder work?',
        answer: 'The decoder injects the entity string into an isolated, in-memory DOM text node. The browser\'s native engine securely parses the entities back into raw visual text without executing any embedded scripts.'
      }
    ]
  },
  'jwt-decoder': {
    seo: {
      title: 'JWT Decoder — Parse JSON Web Tokens Offline',
      description: 'Decode and inspect JSON Web Tokens (JWT) instantly and securely in your browser. View header algorithms, payload claims, and token expiration times.',
      keywords: ['jwt decoder online', 'parse json web token', 'jwt payload inspector', 'decode jwt offline', 'jwt expiration checker'],
      tldr: 'Decode JWT tokens instantly without sending them to a server.',
      entity_definition: 'The JWT Decoder is a zero-knowledge security auditing tool that parses JSON Web Tokens. A JWT consists of three Base64-URL encoded strings separated by dots: the Header (algorithm data), the Payload (claims and user data), and the Signature (verification hash). This tool utilizes a client-side `atob()` decoding algorithm to safely extract and format the JSON objects within the Header and Payload. Because it operates entirely within local memory, sensitive authorization payloads are never exposed to external networks.'
    },
    faqs: [
      {
        question: 'Is my JWT sent to a server for decoding?',
        answer: 'No. This tool operates via 100% Client-Side JavaScript. Your token never leaves your browser, ensuring your authorization data remains completely secure and private.'
      },
      {
        question: 'Does this tool verify the JWT signature?',
        answer: 'No. The decoder only translates the Base64-encoded strings back into readable JSON. To verify the cryptographic signature (the third part of the token), you must possess the server\'s private secret key.'
      },
      {
        question: 'What do the "iat" and "exp" claims mean?',
        answer: 'These are standard registered JWT claims. "iat" stands for Issued At (when the token was created), and "exp" stands for Expiration Time. Both are represented as Unix timestamps in seconds.'
      }
    ]
  },
  'bcrypt-hasher': {
    seo: {
      title: 'Bcrypt Hasher — Generate Cryptographic Passwords',
      description: 'Generate secure bcrypt password hashes using cost factors (rounds). A highly secure, client-side cryptographic hashing utility for developers.',
      keywords: ['bcrypt generator online', 'generate bcrypt hash', 'bcrypt password hasher', 'bcrypt cost factor', 'secure hash generator'],
      tldr: 'Generate cryptographically secure Bcrypt password hashes with customizable cost factors.',
      entity_definition: 'The Bcrypt Hasher is a cryptographic utility that implements the blowfish cipher algorithm to secure plaintext passwords. Unlike fast hashing algorithms (such as MD5 or SHA-256), Bcrypt is intentionally slow and computationally expensive by design. It introduces a "cost factor" (work factor) which dictates the number of key expansion iterations. This tool leverages the `bcryptjs` library entirely within the browser thread, randomly generating a 22-character cryptographic salt and hashing the input to generate a secure `$2b$` string format.'
    },
    faqs: [
      {
        question: 'What is a bcrypt "Cost Factor" or "Round"?',
        answer: 'The cost factor is a logarithmic metric that dictates the computational time required to generate the hash. A cost factor of 10 means the algorithm runs 2^10 (1,024) iterations. Increasing this value makes the hash exponentially harder to crack via brute force.'
      },
      {
        question: 'Why does hashing the same password yield different results?',
        answer: 'This is the security brilliance of bcrypt. Every time you generate a hash, the algorithm creates a new cryptographic "Salt" (random data appended to the password). Because the salt is unique every time, the resulting hash is also unique every time.'
      },
      {
        question: 'Is it safe to generate production hashes here?',
        answer: 'Yes. The hashing computation is performed entirely by your local device\'s CPU using client-side JavaScript. The plaintext password is never transmitted over the internet.'
      }
    ]
  },
  'lorem-ipsum': {
    seo: {
      title: 'Lorem Ipsum Generator — Custom Dummy Text',
      description: 'Generate precise paragraphs of custom Lorem Ipsum dummy text. Instantly copy beautifully formatted placeholder text for your UI designs and mockups.',
      keywords: ['lorem ipsum generator', 'dummy text generator', 'placeholder text online', 'generate random latin text', 'mockup text tool'],
      tldr: 'Generate natural-looking, randomized paragraphs of Latin placeholder text instantly.',
      entity_definition: 'The Lorem Ipsum Generator is a typographic utility used by web designers and content strategists to produce visual placeholder text. Rather than relying on a static block of text, this tool utilizes a dynamic array of classic Latin roots (derived from Cicero\'s literature). It employs a mathematical randomization algorithm to dictate word lengths, sentence structures, and paragraph volume, ensuring the resulting text blocks mimic the natural flow, density, and cadence of real human language.'
    },
    faqs: [
      {
        question: 'Why do designers use Lorem Ipsum?',
        answer: 'Lorem ipsum is used to fill UI layouts because it has a more-or-less normal distribution of letters. Using English placeholder text like "Insert text here" distracts viewers, whereas Latin text allows clients to focus purely on the visual design and typography.'
      },
      {
        question: 'Is the generated text truly random?',
        answer: 'Yes. The algorithm dynamically selects words from a dictionary array, randomly determining sentence length (4-8 words) and paragraph density. No two generated outputs are exactly identical.'
      },
      {
        question: 'Where does the original Lorem Ipsum come from?',
        answer: 'The original text is rooted in a piece of classical Latin literature written by Cicero in 45 BC, titled "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil).'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 8');
