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
  'uuid-v7-generator': {
    seo: {
      title: 'UUID v7 Generator — Time-Ordered, Sortable GUIDs',
      description: 'Generate RFC-compliant UUID version 7 identifiers. Perfect for database primary keys where time-based sorting and massive distributed generation are required.',
      keywords: ['uuid v7 generator', 'sortable guid generator', 'time ordered uuid', 'rfc compliant uuid7', 'database primary key generator'],
      tldr: 'Instantly generate time-ordered UUIDv7 tokens perfect for optimized database indexing.',
      entity_definition: 'UUID Version 7 (UUIDv7) is a modern evolution of the Universally Unique Identifier standard, designed specifically to solve the performance bottlenecks associated with using random UUIDv4s as database primary keys. A UUIDv7 combines a 48-bit Unix timestamp (millisecond precision) with 74 bits of cryptographically secure random data. This time-ordered architecture ensures that newly generated IDs are naturally sequential. When inserted into relational databases (like PostgreSQL or MySQL) or NoSQL clusters, this sequential nature prevents index fragmentation (B-Tree page splits), resulting in drastically faster INSERT performance and highly optimized read latency.'
    },
    faqs: [
      {
        question: 'Why should I use UUIDv7 instead of UUIDv4?',
        answer: 'UUIDv4 is completely random, which causes severe index fragmentation in databases, destroying insert performance as the table grows. UUIDv7 is time-ordered, meaning it sorts sequentially like an auto-incrementing integer while maintaining the distributed uniqueness of a traditional UUID.'
      },
      {
        question: 'Are UUIDv7s cryptographically secure?',
        answer: 'Yes. While the first 48 bits represent the timestamp, the remaining 74 bits of a UUIDv7 are generated using cryptographically secure pseudorandom number generators (CSPRNG). This makes guessing the exact ID virtually impossible.'
      },
      {
        question: 'Does this tool generate IDs entirely offline?',
        answer: 'Yes. The generation algorithm utilizes your browser\'s native Web Crypto API and local system clock. No data is sent to or generated on a remote server.'
      }
    ]
  },
  'uuid-generator': {
    seo: {
      title: 'UUID / GUID Generator — Bulk RFC 4122 Identifier Tool',
      description: 'Generate bulk, 100% random UUID version 4 (GUID) strings. Secure, fast, and completely offline identifier generation for software testing.',
      keywords: ['uuid generator', 'guid generator', 'random uuid v4', 'bulk guid creator', 'rfc 4122 online tool'],
      tldr: 'Generate completely random, collision-resistant UUIDv4 (GUID) strings instantly.',
      entity_definition: 'A Universally Unique Identifier (UUID), also known as a Globally Unique Identifier (GUID) in Microsoft ecosystems, is a 128-bit label used for information in computer systems. Version 4 UUIDs are generated using randomized numbers rather than MAC addresses or time signatures. The WebToolkit Pro UUID Generator taps directly into the browser\'s native Web Crypto API (crypto.randomUUID) to produce RFC 4122 compliant identifiers. The probability of a collision (generating the exact same UUID twice) is so astronomically low that it is considered practically impossible, making it the industry standard for distributed system identifiers.'
    },
    faqs: [
      {
        question: 'What is the probability of a UUIDv4 collision?',
        answer: 'The total number of possible UUIDv4 combinations is 2^122 (roughly 5.3 x 10^36). To have even a 50% chance of a single collision, you would need to generate 1 billion UUIDs every second for about 85 years.'
      },
      {
        question: 'Is there a difference between a UUID and a GUID?',
        answer: 'No, they refer to the exact same 128-bit standard. "UUID" (Universally Unique Identifier) is the generic industry term, whereas "GUID" (Globally Unique Identifier) is the terminology historically preferred by Microsoft.'
      },
      {
        question: 'Can I generate thousands of UUIDs at once?',
        answer: 'Yes. By entering your desired quantity, the tool utilizes a fast, optimized loop to generate bulk identifiers instantly in your browser without any API rate limits.'
      }
    ]
  },
  'lorem-ipsum': {
    seo: {
      title: 'Lorem Ipsum Generator — Professional Design Placeholder Text',
      description: 'Generate beautiful, readable Lorem Ipsum placeholder text for UI/UX designs, wireframes, and web development. Customize paragraphs instantly.',
      keywords: ['lorem ipsum generator', 'dummy text generator', 'placeholder text creator', 'ui ux dummy content', 'website filler text'],
      tldr: 'Generate classic Latin placeholder text to finalize UI/UX wireframes without distraction.',
      entity_definition: 'Lorem Ipsum is the standard dummy text of the printing and typesetting industry, originating from a scrambled section of a 1st-century BC Latin text by Cicero. In modern UI/UX design and web development, it serves a critical psychological purpose: by using unintelligible text with a normal distribution of letters (unlike "Content here, content here"), stakeholders and clients are forced to focus strictly on the visual layout, typography, and spacing of a mockup rather than getting distracted by reading the draft copy.'
    },
    faqs: [
      {
        question: 'Why do designers still use Lorem Ipsum?',
        answer: 'Using real text in a mockup often distracts clients; they start proofreading or arguing over the copy rather than evaluating the design. Lorem Ipsum forces the viewer to focus entirely on the visual hierarchy and layout.'
      },
      {
        question: 'Is Lorem Ipsum just random gibberish?',
        answer: 'While it looks like gibberish, its roots trace back to a classic Latin text written by Cicero in 45 BC titled "De finibus bonorum et malorum" (The Extremes of Good and Evil).'
      },
      {
        question: 'Can search engines index Lorem Ipsum text?',
        answer: 'If you leave Lorem Ipsum text on a live, public-facing website, Google will index it. This can negatively impact your SEO, as it signals incomplete content. Always remember to replace it before deploying to production.'
      }
    ]
  },
  'robots-generator': {
    seo: {
      title: 'Advanced Robots.txt Generator — Control Crawlers & Bots',
      description: 'Instantly generate an optimized robots.txt file for your website. Control Googlebot crawling, block malicious scrapers, and manage your SEO crawl budget.',
      keywords: ['robots.txt generator', 'create robots.txt online', 'block googlebot tool', 'seo crawl budget optimizer', 'robots file creator'],
      tldr: 'Easily construct a valid robots.txt file to control how search engines index your domain.',
      entity_definition: 'The robots.txt file, abiding by the Robots Exclusion Protocol (REP), is the foundational gatekeeper of any website\'s SEO architecture. It is a plain text file placed in the root directory that dictates strict rules for web crawlers (like Googlebot or Bingbot). Our Advanced Robots.txt Generator allows technical SEOs to visually construct these directives. By precisely defining "Allow" and "Disallow" paths, developers can protect sensitive directories, block aggressive AI scrapers, and optimize their "Crawl Budget"—ensuring that Google spends its time indexing high-value pages rather than wasting resources on infinite parameter URLs or admin dashboards.'
    },
    faqs: [
      {
        question: 'What is an SEO Crawl Budget?',
        answer: 'Crawl budget refers to the number of pages search engines will crawl on your site within a given timeframe. By using a robots.txt file to block non-essential pages, you force Googlebot to spend its limited budget on your most important content.'
      },
      {
        question: 'Can robots.txt hide my pages from hackers?',
        answer: 'No! A robots.txt file is a public document. In fact, hackers often read robots.txt files to find sensitive admin directories you are trying to hide. You should rely on server-side authentication (passwords) for security, not robots.txt.'
      },
      {
        question: 'Do all bots obey the robots.txt file?',
        answer: 'No. Legitimate crawlers like Google, Bing, and major AI scrapers obey the file. However, malicious botnets, spammers, and vulnerability scanners will completely ignore your directives.'
      }
    ]
  },
  'hash-generator': {
    seo: {
      title: 'Secure Hash Generator — SHA-256, SHA-512 & MD5 Online',
      description: 'Generate secure cryptographic hashes (SHA-256, SHA-384, SHA-512) and MD5 checksums instantly in your browser. Verify data integrity with 100% privacy.',
      keywords: ['sha-256 hash generator', 'sha-512 online', 'md5 checksum tool', 'cryptographic hash creator', 'string to sha256'],
      tldr: 'Compute cryptographic hashes (SHA-256, MD5) entirely offline to verify data integrity.',
      entity_definition: 'A cryptographic hash function takes an arbitrary block of data (string or file) and returns a fixed-size bit string, known as the hash value or checksum. The WebToolkit Pro Secure Hash Generator implements the Web Crypto API (crypto.subtle.digest) to compute high-level algorithms like SHA-256 and SHA-512 natively in the browser. Hashes are characterized by their one-way nature (they cannot be decrypted back to the original text) and their avalanche effect (changing a single letter completely alters the output hash). This makes them the ultimate mathematical tool for verifying file integrity and securely storing password signatures.'
    },
    faqs: [
      {
        question: 'Can a SHA-256 hash be decrypted?',
        answer: 'No. Hashing is a mathematical one-way function, meaning it is computationally impossible to reverse the hash back into the original string. This is why it is fundamentally different from "encryption," which requires a key to decrypt.'
      },
      {
        question: 'Why is MD5 considered insecure today?',
        answer: 'MD5 is extremely fast and produces a short 128-bit hash, making it highly susceptible to "collision attacks" (where two different inputs produce the exact same hash). It should only be used for simple file checksums, never for passwords or cryptographic security.'
      },
      {
        question: 'Is my input data sent over the internet?',
        answer: 'No. All hashing algorithms (including our custom MD5 polyfill) execute entirely within your local browser\'s JavaScript engine. Your input strings are never transmitted to our servers.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 2');
