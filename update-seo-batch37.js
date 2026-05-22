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
  'site-audit-pro': {
    seo: {
      title: 'Site Audit Pro — Comprehensive Technical SEO Scanner',
      description: 'Run a deep technical SEO audit on your website. Detect broken links, missing meta tags, slow server response times, and DOM rendering issues instantly.',
      keywords: ['site audit pro', 'technical seo scanner', 'website auditor', 'check seo score', 'find broken links', 'seo spider tool'],
      tldr: 'Run a comprehensive technical SEO crawl to identify indexing, rendering, and structural issues.',
      entity_definition: 'Site Audit Pro is a technical SEO diagnostic utility. Search Engine Optimization requires absolute technical perfection for a site to rank effectively. Similar to a Googlebot crawl, this tool acts as an automated spider, scanning a provided URL to analyze HTTP status codes (like 404 Not Found), parsing the DOM for missing `<h1>` or Canonical tags, and evaluating Core Web Vitals metrics. It compiles these findings into an actionable dashboard, helping webmasters eliminate indexing blockers.'
    },
    faqs: [
      {
        question: 'What is a 404 error?',
        answer: 'A 404 HTTP status code means the server cannot find the requested URL. If a search engine crawler hits a 404, it immediately drops that page from the index, resulting in a total loss of traffic for that specific URL.'
      },
      {
        question: 'Why are Canonical tags important?',
        answer: 'If you have multiple URLs pointing to the exact same content (like sorting parameters on an e-commerce category), Google will penalize you for "duplicate content." The `<link rel="canonical">` tag explicitly tells Google which URL is the master version to index.'
      },
      {
        question: 'Does this audit my whole site?',
        answer: 'This tool performs a deep, single-page audit. To scan thousands of pages simultaneously, you would need desktop crawling software like Screaming Frog.'
      }
    ]
  },
  'storage-auditor': {
    seo: {
      title: 'Web Storage Auditor — Inspect Cookies & LocalStorage',
      description: 'Audit and inspect browser storage mechanisms. View, analyze, and clear HTTP Cookies, LocalStorage, and SessionStorage payloads for privacy and debugging.',
      keywords: ['web storage auditor', 'inspect localstorage', 'view browser cookies', 'check sessionstorage', 'debug web storage api'],
      tldr: 'Inspect, decode, and audit your browser\'s LocalStorage, SessionStorage, and HTTP Cookies.',
      entity_definition: 'The Web Storage Auditor is a privacy and frontend debugging utility. Modern web applications save massive amounts of state data directly into the user\'s browser to maintain sessions without hitting the database. This tool hooks into the browser\'s Web Storage API to explicitly list all Key/Value pairs currently saved in `localStorage` (persistent data) and `sessionStorage` (tab-specific data), as well as extracting active HTTP Cookies, allowing developers to debug authentication flows and ensure GDPR compliance.'
    },
    faqs: [
      {
        question: 'What is the difference between LocalStorage and SessionStorage?',
        answer: '`localStorage` is persistent; the data remains in the browser forever until manually deleted by the user or JavaScript. `sessionStorage` is ephemeral; the data is instantly wiped the moment the user closes the specific browser tab.'
      },
      {
        question: 'Are Cookies the same as LocalStorage?',
        answer: 'No. Cookies are automatically sent back and forth to the server with every single HTTP request (used primarily for authentication). LocalStorage remains strictly client-side and is never sent to the server.'
      },
      {
        question: 'Can I store passwords in LocalStorage?',
        answer: 'Absolutely never. LocalStorage is entirely unencrypted and highly vulnerable to Cross-Site Scripting (XSS) attacks. Any malicious script running on your page can easily read everything stored there.'
      }
    ]
  },
  'browser-compat': {
    seo: {
      title: 'Browser Compatibility Checker — Test CSS & JS APIs',
      description: 'Check cross-browser compatibility for modern CSS properties and JavaScript APIs. Ensure your web app works flawlessly on Chrome, Safari, Firefox, and Edge.',
      keywords: ['browser compatibility checker', 'test css compatibility', 'caniuse api test', 'safari css support', 'cross browser testing tool'],
      tldr: 'Verify whether specific CSS properties and JavaScript APIs are supported across all major browsers.',
      entity_definition: 'The Browser Compatibility Checker is a frontend QA utility. The web platform is fragmented; while Google Chrome might support a brand-new CSS layout feature like `subgrid`, Apple\'s Safari or Mozilla\'s Firefox might not implement it until months later. This tool queries caniuse datasets to evaluate a specific CSS property or JavaScript API, returning the exact browser versions that support it globally, preventing developers from shipping broken layouts to users on legacy browsers.'
    },
    faqs: [
      {
        question: 'What is a Polyfill?',
        answer: 'If a browser doesn\'t support a new JavaScript API (like `fetch`), developers can inject a "polyfill"—a snippet of fallback code that replicates the missing functionality, ensuring compatibility on older systems.'
      },
      {
        question: 'Why is Safari often the problem?',
        answer: 'Safari is tied strictly to iOS operating system updates. Unlike Chrome or Firefox, which update automatically in the background every few weeks, Safari features are usually only rolled out during major Apple OS releases.'
      },
      {
        question: 'Do I need to support Internet Explorer?',
        answer: 'No. Microsoft officially retired Internet Explorer (IE11) in June 2022. It is an industry standard to ignore IE entirely, focusing instead on modern evergreen browsers.'
      }
    ]
  },
  'binary-to-decimal': {
    seo: {
      title: 'Binary to Decimal Converter — Base-2 to Base-10 Math',
      description: 'Convert Binary (Base-2) numbers into standard Decimal (Base-10) format. A quick algorithmic calculator for computer science students and engineers.',
      keywords: ['binary to decimal converter', 'base 2 to base 10', 'convert binary number', 'binary math calculator', 'binary code translator'],
      tldr: 'Mathematically convert computer Binary (Base-2) code into standard human Decimal (Base-10) numbers.',
      entity_definition: 'The Binary to Decimal Converter is a computer science utility. The foundation of all digital electronics is Binary (Base-2), a numeric system that strictly uses two symbols: 0 and 1, representing electrical off/on states. Humans, however, calculate in Decimal (Base-10). This tool utilizes positional notation algorithms, multiplying each binary bit by powers of 2 from right to left, to sum the exact decimal integer equivalent instantly.'
    },
    faqs: [
      {
        question: 'How do you convert Binary to Decimal?',
        answer: 'You multiply each digit of the binary number by 2 raised to the power of its position (starting from 0 on the right), and then sum the results. For example, binary `101` is `(1 * 2^2) + (0 * 2^1) + (1 * 2^0) = 4 + 0 + 1 = 5`.'
      },
      {
        question: 'What is a Bit?',
        answer: 'A Bit (short for Binary Digit) is the absolute smallest unit of data in a computer. It has a single binary value, either 0 or 1.'
      },
      {
        question: 'What is a Byte?',
        answer: 'A Byte is a sequence of exactly 8 bits (e.g., `10110010`). Because it has 8 positions, a single byte can represent 256 different decimal values (from 0 to 255).'
      }
    ]
  },
  'decimal-to-binary': {
    seo: {
      title: 'Decimal to Binary Converter — Base-10 to Base-2 Math',
      description: 'Convert standard Decimal (Base-10) integers into computer Binary (Base-2) code. Essential algorithmic calculator for low-level programming and subnetting.',
      keywords: ['decimal to binary converter', 'base 10 to base 2', 'convert integer to binary', 'binary math tool', 'decimal integer translator'],
      tldr: 'Mathematically convert standard human Decimal (Base-10) integers into computer Binary (Base-2) code.',
      entity_definition: 'The Decimal to Binary Converter is a low-level programming utility. While humans use a Base-10 numbering system (digits 0-9), computer hardware processes logic strictly in Base-2 (Binary 0s and 1s). Translating large decimal numbers into binary requires repetitive long division. This tool automates the algorithm—continuously dividing the input decimal by 2 and compiling the remainders in reverse order—to output the exact binary string sequence instantly, aiding in bitwise operations and IP subnetting.'
    },
    faqs: [
      {
        question: 'How do you convert Decimal to Binary?',
        answer: 'Divide the decimal number by 2. Write down the remainder (which will always be 0 or 1). Divide the quotient by 2 again. Repeat until the quotient is 0. Reading the remainders from bottom to top gives the binary number.'
      },
      {
        question: 'What is Bitwise operation?',
        answer: 'Bitwise operations are actions that operate directly on the individual binary bits of a number (like shifting them left or right) rather than performing standard math on the whole decimal number. It is extremely fast for CPUs.'
      },
      {
        question: 'Why do IP addresses use binary?',
        answer: 'An IPv4 address like `192.168.1.1` is actually just a human-readable representation of a 32-bit binary number. Network routers read the binary (zeros and ones) to calculate routing paths instantly.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 37');
