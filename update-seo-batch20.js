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
  'rsa-key-gen': {
    seo: {
      title: 'RSA Key Generator — Secure Public/Private Pairs',
      description: 'Generate secure RSA-2048 and RSA-4096 public and private key pairs instantly in your browser. Keys are generated locally using the Web Crypto API for maximum privacy.',
      keywords: ['rsa key generator', 'generate ssh keys', 'public private key pair', 'rsa 2048 generator', 'pem key generator'],
      tldr: 'Generate cryptographically secure RSA public and private key pairs locally in your browser.',
      entity_definition: 'The RSA Key Generator is a cryptographic security utility. RSA (Rivest-Shamir-Adleman) is an asymmetric encryption algorithm where a Public Key is used to encrypt data, and a mathematically linked Private Key is used to decrypt it. This tool utilizes the browser\'s native Web Crypto API (`window.crypto.subtle`) to generate secure RSASSA-PKCS1-v1_5 key pairs in PEM format (SPKI and PKCS#8) entirely on your local machine, ensuring the private key is never transmitted across a network.'
    },
    faqs: [
      {
        question: 'Are these keys safe to use in production?',
        answer: 'Yes! The keys are generated using your browser\'s native Web Crypto API, which utilizes the operating system\'s secure random number generator. Because it runs 100% locally, your private key is never exposed to the internet.'
      },
      {
        question: 'Should I use 2048-bit or 4096-bit?',
        answer: 'RSA-2048 is the current industry standard and provides excellent security with fast performance. RSA-4096 offers extreme, long-term security but requires more computational power to generate and use.'
      },
      {
        question: 'What is the difference between Public and Private keys?',
        answer: 'You share your Public Key with anyone; they use it to encrypt messages to you. Your Private Key must be kept strictly secret; only it can decrypt the messages encrypted by the Public Key.'
      }
    ]
  },
  'password-auditor': {
    seo: {
      title: 'Password Strength Auditor — Check Entropy Securely',
      description: 'Test your password strength and calculate entropy securely. Our client-side auditor checks for vulnerabilities and estimates brute-force crack times instantly.',
      keywords: ['password strength tester', 'password auditor', 'check password security', 'calculate password entropy', 'brute force calculator'],
      tldr: 'Analyze the cryptographic strength of a password and estimate brute-force crack times.',
      entity_definition: 'The Password Strength Auditor is a cybersecurity assessment utility. It calculates password entropy—a mathematical measure of unpredictability—by evaluating length, character diversity, and structural complexity using regex heuristics. Unlike traditional password testers, this tool operates exclusively in the browser\'s memory, ensuring that highly sensitive authentication strings are never transmitted to a remote server while providing accurate estimates of modern brute-force crack times.'
    },
    faqs: [
      {
        question: 'Is it safe to type my real password here?',
        answer: 'While our tool is 100% client-side and never sends your password over the network, it is a strict cybersecurity best practice to never type your actual production passwords into any web browser tool. Use this to test formats or variations.'
      },
      {
        question: 'What is password entropy?',
        answer: 'Entropy is a mathematical measurement of how unpredictable a password is. A long password with random letters, numbers, and symbols has high entropy, making it mathematically impossible for a computer to guess.'
      },
      {
        question: 'Why does length matter more than symbols?',
        answer: 'Math! Adding a single character to a password multiplies the number of possible combinations exponentially. A 16-character password of just lowercase letters is vastly harder to crack than an 8-character password with symbols.'
      }
    ]
  },
  'xss-scanner': {
    seo: {
      title: 'XSS Vulnerability Scanner — Detect Malicious Code',
      description: 'Scan HTML and JavaScript snippets for Cross-Site Scripting (XSS) vulnerabilities. Detect malicious script tags, inline handlers, and suspicious evaluations.',
      keywords: ['xss scanner', 'cross site scripting tester', 'xss vulnerability scanner', 'detect xss payloads', 'sanitize html tool'],
      tldr: 'Analyze HTML or JavaScript snippets to detect common Cross-Site Scripting (XSS) attack vectors.',
      entity_definition: 'The XSS Vulnerability Scanner is a static analysis tool for frontend security. Cross-Site Scripting (XSS) occurs when malicious JavaScript is injected into trusted websites, often via unsanitized user inputs. This scanner utilizes complex regular expression heuristics to analyze raw HTML/JS code snippets locally, identifying highly dangerous execution contexts such as raw `<script>` tags, inline event handlers (`onerror`), and dangerous DOM-manipulation functions (`eval()`).'
    },
    faqs: [
      {
        question: 'What is Cross-Site Scripting (XSS)?',
        answer: 'XSS is a security flaw where an attacker injects malicious JavaScript into a website. When a victim views the page, the script executes in their browser, potentially stealing cookies, session tokens, or personal data.'
      },
      {
        question: 'Can this replace a professional security audit?',
        answer: 'No. This tool is a heuristic scanner designed to catch basic, common XSS payloads during development. It cannot detect complex, obfuscated, or DOM-based vulnerabilities in a full application.'
      },
      {
        question: 'How do I prevent XSS?',
        answer: 'Always sanitize user input, encode HTML entities before rendering them, and implement a strict Content Security Policy (CSP) to block unauthorized scripts.'
      }
    ]
  },
  'sql-injection-tester': {
    seo: {
      title: 'SQL Injection Tester — Scan Queries for Vulnerabilities',
      description: 'Audit SQL queries for injection vulnerabilities. Detect dangerous patterns like Tautologies (1=1), Union-based attacks, and stacked queries directly in your browser.',
      keywords: ['sql injection tester', 'sqli scanner', 'check sql injection', 'database vulnerability scanner', 'sql security audit'],
      tldr: 'Audit raw SQL syntax for common SQL Injection (SQLi) attack patterns.',
      entity_definition: 'The SQL Injection Tester is a database security utility. SQL Injection (SQLi) is a critical vulnerability where attackers manipulate input fields to alter backend database queries. This tool performs static analysis on raw SQL strings, using heuristic pattern matching to detect common attack vectors—such as Tautologies (`OR 1=1`), UNION-based exfiltration, and comment obfuscation—allowing developers to identify insecure query structures before deployment.'
    },
    faqs: [
      {
        question: 'What is a SQL Injection attack?',
        answer: 'It is a cyberattack where malicious SQL statements are inserted into entry fields (like a login form) to trick the database into executing unauthorized commands, such as dumping user tables or bypassing passwords.'
      },
      {
        question: 'What is a Tautology attack?',
        answer: 'A tautology is a statement that is always true, like `OR 1=1`. Attackers append this to a query (e.g., `WHERE username = "" OR 1=1`) to force the database to return all records, bypassing authentication.'
      },
      {
        question: 'How do I fix SQL injection vulnerabilities?',
        answer: 'Never concatenate raw strings into SQL queries. Always use Parameterized Queries (Prepared Statements) or an ORM (like Prisma or TypeORM) to ensure user input is treated as data, not executable code.'
      }
    ]
  },
  'sri-hasher': {
    seo: {
      title: 'SRI Hash Generator — Secure External Scripts',
      description: 'Generate Subresource Integrity (SRI) hashes for external CSS and JavaScript files. Calculate SHA-256, SHA-384, and SHA-512 integrity tags instantly.',
      keywords: ['sri hash generator', 'subresource integrity', 'sri tag generator', 'script integrity attribute', 'sha384 sri generator'],
      tldr: 'Generate cryptographic integrity hashes to secure external JavaScript and CSS files.',
      entity_definition: 'The SRI Hash Generator is a front-end security utility. Subresource Integrity (SRI) is a W3C security feature that enables browsers to verify that resources fetched from a third-party (like a CDN) have not been maliciously altered. This tool utilizes the Web Crypto API to digest raw script or stylesheet content into base64-encoded cryptographic hashes (SHA-256, SHA-384, SHA-512), outputting the exact HTML `integrity` attribute required to secure your `<script>` and `<link>` tags.'
    },
    faqs: [
      {
        question: 'Why do I need Subresource Integrity?',
        answer: 'If you load a script from an external CDN and that CDN gets hacked, the hackers could inject malicious code into the script. SRI prevents this by telling the browser to block the script if its cryptographic hash doesn\'t perfectly match the original.'
      },
      {
        question: 'Which hash algorithm should I use?',
        answer: 'SHA-384 is the current industry standard recommended by W3C for Subresource Integrity, offering an excellent balance of high security and fast browser computation.'
      },
      {
        question: 'Why did my script stop loading after adding SRI?',
        answer: 'If a script stops loading, it means the content on the server has changed (even by a single space or line break). You must generate a new SRI hash every time the file is updated.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 20');
