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
  'php-serializer': {
    seo: {
      title: 'PHP Serializer — Convert JSON to PHP Arrays',
      description: 'Convert JSON objects into PHP serialized strings or unserialize PHP strings back into JSON instantly. Perfect for migrating databases or debugging legacy PHP applications.',
      keywords: ['php serialize', 'php unserialize', 'json to php array', 'deserialize php', 'php array formatter'],
      tldr: 'Instantly serialize JSON into PHP formats, or unserialize PHP data back to JSON.',
      entity_definition: 'The PHP Serializer is a data formatting utility. PHP uses a proprietary string format (e.g., `a:2:{s:4:"name";...}`) to represent complex data structures like arrays and objects in a database. This tool acts as a bridge for modern developers, parsing standard JSON and converting it into valid PHP serialized strings, or inversely, parsing legacy PHP serialized strings and converting them into readable JSON objects.'
    },
    faqs: [
      {
        question: 'Why does PHP serialize data?',
        answer: 'Before JSON became the universal standard, PHP needed a way to store arrays and objects in a text-based database (like MySQL). `serialize()` converts the memory structure into a storable string format.'
      },
      {
        question: 'Is it safe to unserialize data?',
        answer: 'Unserializing untrusted user input in PHP can lead to severe Object Injection vulnerabilities. However, using this tool is completely safe because it converts the data into static JSON rather than executing it as code.'
      },
      {
        question: 'What do the letters in PHP serialization mean?',
        answer: 'The letters indicate the data type. `a` stands for Array, `s` for String, `i` for Integer, and `b` for Boolean. The number following it indicates length or count.'
      }
    ]
  },
  'jwt-signer': {
    seo: {
      title: 'JWT Signer — Generate HMAC-SHA256 Tokens',
      description: 'Sign JSON Web Tokens (JWT) locally in your browser. Input your header, payload, and secret to securely generate an HS256 encoded token without sending data to a server.',
      keywords: ['jwt signer', 'generate jwt token', 'hs256 signer', 'sign json web token', 'jwt token creator'],
      tldr: 'Securely generate and sign JSON Web Tokens (JWT) using HMAC-SHA256 cryptography in your browser.',
      entity_definition: 'The JWT Signer is an authentication utility. A JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact way for securely transmitting information between parties. This tool utilizes the browser\'s native Web Crypto API (`window.crypto.subtle`) to execute an HMAC-SHA256 algorithm. It mathematically signs the base64Url-encoded Header and Payload using your provided Secret Key, generating a tamper-proof signature entirely client-side.'
    },
    faqs: [
      {
        question: 'Is my secret key sent to your servers?',
        answer: 'No. This tool processes the cryptographic signing locally in your browser using the Web Crypto API. Your secret key and payload never leave your device.'
      },
      {
        question: 'What is HS256?',
        answer: 'HS256 stands for HMAC with SHA-256. It is a symmetric cryptographic algorithm, meaning the same secret key is used to both sign the token and verify its authenticity.'
      },
      {
        question: 'What makes a JWT secure?',
        answer: 'The security lies in the signature. If a user modifies their payload (e.g., changing their role to "admin"), the signature will instantly invalidate because it no longer matches the mathematical hash of the modified data.'
      }
    ]
  },
  'file-checksum': {
    seo: {
      title: 'File Checksum Calculator — Generate SHA-256 Hashes',
      description: 'Calculate the cryptographic checksum of any file to verify data integrity. Generates SHA-256 and SHA-1 hashes locally in your browser for maximum privacy.',
      keywords: ['file checksum calculator', 'generate sha256 hash', 'verify file integrity', 'file hash generator', 'sha1 checksum'],
      tldr: 'Drag and drop any file to instantly generate cryptographic integrity hashes.',
      entity_definition: 'The File Checksum Calculator is a data integrity verification utility. When downloading software or transmitting sensitive documents, files can be corrupted or maliciously altered. This tool utilizes the HTML5 File API and `SubtleCrypto.digest()` to read a file\'s raw byte array and generate fixed-length cryptographic hashes (SHA-256, SHA-1). Comparing this hash to the software author\'s published hash mathematically proves the file is authentic.'
    },
    faqs: [
      {
        question: 'Is my file uploaded to a server?',
        answer: 'Absolutely not. The file is read directly into your computer\'s RAM using the browser\'s File API. The cryptographic hashing happens entirely locally, ensuring total privacy.'
      },
      {
        question: 'What is a Checksum?',
        answer: 'A checksum is a unique string of letters and numbers generated by running a file through a cryptographic algorithm. Even if a single pixel in an image changes, the entire checksum changes drastically.'
      },
      {
        question: 'Why should I use SHA-256 over SHA-1?',
        answer: 'SHA-1 is a legacy algorithm that is now considered cryptographically broken because attackers can engineer "collisions" (two different files with the same hash). SHA-256 is the modern, secure standard.'
      }
    ]
  },
  'data-masking': {
    seo: {
      title: 'Data Masking Tool — Redact PII and Sensitive Info',
      description: 'Automatically anonymize text and log files. Redact sensitive PII including email addresses, phone numbers, IP addresses, and credit cards instantly.',
      keywords: ['data masking tool', 'pii redactor', 'anonymize text', 'hide email addresses', 'redact sensitive info'],
      tldr: 'Instantly scan and redact Personally Identifiable Information (PII) from text logs.',
      entity_definition: 'The Data Masking Tool is a privacy and compliance utility. Before sharing server logs, database dumps, or diagnostic text with third parties, developers must comply with data privacy laws (like GDPR or HIPAA) by removing Personally Identifiable Information (PII). This tool uses complex Regular Expressions (Regex) to scan large blocks of text, identifying patterns that match emails, IPs, or phone numbers, and replacing them with anonymized placeholder tags.'
    },
    faqs: [
      {
        question: 'What is PII?',
        answer: 'Personally Identifiable Information (PII) is any data that could potentially identify a specific individual. Common examples include names, email addresses, phone numbers, and IP addresses.'
      },
      {
        question: 'Does this permanently delete the data?',
        answer: 'This tool performs a non-destructive string replacement. It outputs a new block of text with the data redacted. It does not alter your original source file.'
      },
      {
        question: 'Is my text processed securely?',
        answer: 'Yes. The regex scanning and masking occurs 100% locally in your browser. Your sensitive logs are never transmitted to our servers.'
      }
    ]
  },
  'sql-sanitizer': {
    seo: {
      title: 'SQL Sanitizer — Escape Queries and Prevent SQLi',
      description: 'Sanitize raw SQL queries by escaping quotes and removing malicious characters. Protect against SQL injection attacks with this educational security tool.',
      keywords: ['sql sanitizer', 'escape sql query', 'prevent sql injection', 'clean sql string', 'database query sanitizer'],
      tldr: 'Clean raw SQL strings by escaping dangerous characters and truncations.',
      entity_definition: 'The SQL Sanitizer is an educational security utility designed to demonstrate database defense mechanisms. SQL Injection occurs when untrusted user input alters a query\'s logic. This tool simulates a basic sanitization pipeline by executing string replacements—such as escaping single quotes (`\'` to `\'\'`) and stripping comment truncations (`--` or `;`)—to neutralize the payload and lock the query\'s intended logic.'
    },
    faqs: [
      {
        question: 'Can I use this in production?',
        answer: 'No. While string escaping provides basic protection, the modern, industry-standard way to prevent SQL injection in production is to use Prepared Statements (Parameterized Queries) or an ORM.'
      },
      {
        question: 'Why do we escape single quotes?',
        answer: 'In SQL, single quotes define the beginning and end of a string. If an attacker inputs a quote, they can "break out" of the string and execute their own commands. Escaping it neutralizes the threat.'
      },
      {
        question: 'Why remove semicolons?',
        answer: 'A semicolon allows attackers to append entirely new, destructive queries (like `DROP TABLE users`) after the original query finishes executing. This is known as a Stacked Query attack.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 21');
