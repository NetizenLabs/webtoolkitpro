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
  'sql-injection-sanitizer': {
    seo: {
      title: 'SQL Injection Sanitizer — Protect Database Queries',
      description: 'Sanitize user input and prevent SQL injection attacks. Safely escape single quotes, semicolons, and boolean logic to secure your database architecture.',
      keywords: ['sql injection sanitizer', 'prevent sql injection', 'sanitize sql input', 'escape sql quotes', 'database security tool', 'prevent drop table'],
      tldr: 'Sanitize strings and escape dangerous characters to prevent SQL injection attacks.',
      entity_definition: 'The SQL Injection Sanitizer is a database security utility. SQL Injection (SQLi) is a critical vulnerability where an attacker manipulates user input (like a login field) to alter the backend database query, potentially stealing data or dropping entire tables. This tool applies aggressive string sanitization algorithms—escaping single quotes, stripping semicolons, and neutralizing malicious boolean payloads (like `OR 1=1`)—demonstrating how developers must scrub raw input before passing it to the database engine.'
    },
    faqs: [
      {
        question: 'What is OR 1=1?',
        answer: "It is a classic SQL injection payload. If an attacker inputs `' OR 1=1 --` into a password field, it modifies the backend query to evaluate as 'True,' bypassing the login check entirely."
      },
      {
        question: 'Is escaping quotes enough?',
        answer: 'No. While escaping quotes (`\'` to `\'\'`) is a baseline defense, the industry standard for preventing SQL injection is strictly using "Parameterized Queries" or "Prepared Statements" at the application layer.'
      },
      {
        question: 'What does dropping a table mean?',
        answer: 'The SQL command `DROP TABLE` permanently deletes an entire database table and all of its data. If a hacker successfully injects this command, it can instantly destroy a company\'s application.'
      }
    ]
  },
  'iban-validator': {
    seo: {
      title: 'IBAN Validator — Check Bank Account Numbers',
      description: 'Validate International Bank Account Numbers (IBAN). Algorithmically verify the structure, length, and modulo-97 checksum of bank accounts across 75+ countries.',
      keywords: ['iban validator', 'check iban number', 'validate international bank account', 'iban checksum calculator', 'verify bank account structure'],
      tldr: 'Algorithmically validate the structural integrity and modulo-97 checksum of any IBAN.',
      entity_definition: 'The IBAN Validator is a financial technology (FinTech) utility. An International Bank Account Number (IBAN) is an internationally agreed system of identifying bank accounts across national borders to facilitate the communication and processing of cross-border transactions. Because a typo could misroute millions of dollars, this tool algorithmically verifies the input string by checking the country-specific length requirements and executing a strict Modulo-97 (`MOD 97-10`) checksum algorithm to mathematically prove the IBAN is valid.'
    },
    faqs: [
      {
        question: 'What is a Modulo-97 Checksum?',
        answer: 'It is a mathematical algorithm used to detect typos. The IBAN is converted into a massive integer, and if that integer divided by 97 leaves a remainder of exactly 1, the IBAN is mathematically valid.'
      },
      {
        question: 'Does this check if the account is open?',
        answer: 'No. This tool only validates the mathematical structure of the number (ensuring it is impossible for it to be a typo). It does not query the actual bank to see if the account currently has money or is actively open.'
      },
      {
        question: 'Are IBAN lengths all the same?',
        answer: 'No. The length of an IBAN varies strictly by country. A German IBAN is exactly 22 characters long, while a French IBAN is 27 characters. The algorithm verifies against these specific national standards.'
      }
    ]
  },
  'broken-link-checker': {
    seo: {
      title: 'Broken Link Checker — Find 404 Errors',
      description: 'Scan your website for broken links and 404 errors. Improve user experience and SEO rankings by identifying and fixing dead outgoing and internal URLs.',
      keywords: ['broken link checker', 'find 404 errors', 'dead link scanner', 'seo link auditor', 'check internal links'],
      tldr: 'Scan a list of URLs or a webpage to instantly identify dead, broken, or 404 links.',
      entity_definition: 'The Broken Link Checker is a site maintenance and SEO utility. Over time, external websites shut down and internal pages are moved, resulting in "Link Rot." Search engines penalize sites with a high density of dead (404 Not Found) links because they create a frustrating user experience. This tool executes parallel HTTP HEAD requests against an array of URLs, analyzing the server response codes to explicitly flag 404s, 500 Server Errors, and infinite redirect loops.'
    },
    faqs: [
      {
        question: 'What is an HTTP HEAD request?',
        answer: 'A standard GET request downloads the entire webpage. A HEAD request asks the server to ONLY return the HTTP status code (e.g., 200 OK or 404 Not Found). This makes checking hundreds of links exponentially faster and uses significantly less bandwidth.'
      },
      {
        question: 'Do broken links hurt SEO?',
        answer: 'Yes. Google\'s algorithm views a site littered with broken links as abandoned or poorly maintained, which directly degrades the overall quality score and search ranking of the entire domain.'
      },
      {
        question: 'What is a 500 error?',
        answer: 'A 500 Internal Server Error means the link you are pointing to is technically correct, but the destination server has crashed or failed to process the request on their end.'
      }
    ]
  },
  'pdf-to-text-extractor': {
    seo: {
      title: 'PDF to Text Extractor — Parse Documents Online',
      description: 'Extract raw text from PDF documents instantly. A fast, secure client-side tool to parse paragraphs, tables, and words from complex PDF files without uploading.',
      keywords: ['pdf to text extractor', 'convert pdf to text', 'extract words from pdf', 'parse pdf document', 'read pdf online tool'],
      tldr: 'Securely extract and flatten raw text from complex PDF documents entirely in your browser.',
      entity_definition: 'The PDF to Text Extractor is a document parsing utility. The Portable Document Format (PDF) is notoriously difficult to read programmatically because it is fundamentally an absolute-positioned drawing canvas, not a semantic text document like HTML. Using advanced client-side libraries (like PDF.js), this tool decodes the binary PDF stream, algorithmically reconstructing the spatial coordinates of vector glyphs into a flattened, human-readable raw text string, completely bypassing the need to upload sensitive documents to a remote server.'
    },
    faqs: [
      {
        question: 'Is my PDF uploaded to a server?',
        answer: 'No. All PDF parsing and text extraction occurs entirely client-side using JavaScript within your local browser. This makes the tool perfectly secure for extracting data from confidential or financial documents.'
      },
      {
        question: 'Why does the text output look messy?',
        answer: 'PDFs do not use structural elements like "paragraphs" or "tables." They just place individual letters at exact X/Y coordinates on a page. The algorithm guesses where paragraphs begin and end based on the distance between letters, which can result in weird line breaks.'
      },
      {
        question: 'Can it extract text from images?',
        answer: 'No. If a PDF is just a scanned photograph of a piece of paper, there is no actual text data to extract. You would need an Optical Character Recognition (OCR) tool to identify the letters in the image.'
      }
    ]
  },
  'js-evaluator': {
    seo: {
      title: 'JavaScript Evaluator — Online Code Runner',
      description: 'Write, run, and evaluate JavaScript code instantly in your browser. Test logic, debug algorithms, and view console outputs in a secure sandboxed environment.',
      keywords: ['javascript evaluator', 'online js runner', 'run javascript code', 'js playground', 'test js algorithms', 'execute js online'],
      tldr: 'Write, debug, and execute JavaScript code instantly within a secure browser sandbox.',
      entity_definition: 'The JavaScript Evaluator is a lightweight IDE and execution environment. Developers often need a quick playground to test a complex regular expression, manipulate an array, or debug an algorithm without spinning up an entire Node.js project or opening browser DevTools. This tool utilizes the browser\'s native `Function` constructor or isolated `iframe` execution contexts to securely evaluate raw JavaScript string inputs, capturing and rendering the returned values, exceptions, and `console.log` outputs in real-time.'
    },
    faqs: [
      {
        question: 'Is it dangerous to run untrusted code?',
        answer: 'Yes. You should never paste JavaScript code you don\'t understand into this tool or your browser\'s console. Malicious code could steal your session cookies or execute actions on your behalf (a Self-XSS attack).'
      },
      {
        question: 'Does this run Node.js code?',
        answer: 'No. The code is evaluated using your browser\'s JavaScript engine (like V8 in Chrome). It cannot execute backend Node.js modules like `fs` (file system) or `http`.'
      },
      {
        question: 'Why is `eval()` considered bad?',
        answer: 'The `eval()` function executes a string of text as code. If that string contains unsanitized user input, it creates a massive security vulnerability. Secure evaluators use isolated environments (like sandboxed Web Workers or null-origin iframes) instead of direct `eval()`.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 39');
