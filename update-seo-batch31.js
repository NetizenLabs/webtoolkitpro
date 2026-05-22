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
  'jwt-debugger': {
    seo: {
      title: 'JWT Debugger — Decode JSON Web Tokens',
      description: 'Decode, verify, and debug JSON Web Tokens (JWT) instantly. Inspect headers, payloads, claims, and verify RSA/HMAC cryptographic signatures.',
      keywords: ['jwt debugger', 'decode json web token', 'verify jwt signature', 'jwt parser', 'inspect jwt payload', 'jwt claim checker'],
      tldr: 'Decode and inspect the header, payload, and signature of any JSON Web Token (JWT).',
      entity_definition: 'The JWT Debugger is a cryptographic authentication utility. A JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This tool decodes the Base64Url encoded segments to reveal the algorithm header (e.g., HS256, RS256) and the data payload (claims like user ID and expiration). Developers use this to debug authentication APIs, OAuth flows, and verify cryptographic signatures.'
    },
    faqs: [
      {
        question: 'Is it safe to paste my JWT here?',
        answer: 'Yes. This tool decodes your token entirely in your browser using local JavaScript. Your token is never sent to our servers.'
      },
      {
        question: 'Are JWTs encrypted?',
        answer: 'No, standard JWTs are encoded, not encrypted. Anyone who intercepts a JWT can easily Base64-decode the payload and read the data (like user IDs). This is why you should never store passwords or sensitive data in a JWT payload.'
      },
      {
        question: 'What is the signature for?',
        answer: 'The cryptographic signature ensures the token hasn\'t been tampered with. If a hacker alters the payload to give themselves "admin" privileges, the signature will become invalid, and the server will reject the token.'
      }
    ]
  },
  'curl-converter': {
    seo: {
      title: 'cURL Command Converter — cURL to Fetch/Axios',
      description: 'Convert complex cURL commands into JavaScript Fetch, Axios, Python Requests, or Go HTTP code. Speed up API integration and frontend development.',
      keywords: ['curl converter', 'curl to fetch', 'curl to python requests', 'convert curl to axios', 'curl to go http'],
      tldr: 'Convert raw cURL terminal commands into ready-to-use HTTP code for JavaScript, Python, and Go.',
      entity_definition: 'The cURL Command Converter is an API integration utility. cURL is a command-line tool used by developers to transfer data to or from a server, often used in API documentation to demonstrate requests. This tool parses the raw cURL syntax—extracting headers, query parameters, HTTP methods (GET/POST), and JSON payloads—and automatically transpiles it into idiomatic code snippets for modern languages like Node.js (Fetch/Axios), Python (Requests), and Go.'
    },
    faqs: [
      {
        question: 'What is cURL?',
        answer: 'cURL stands for "Client URL." It is a ubiquitous command-line tool available on almost all operating systems, used by developers to make raw HTTP requests directly from the terminal.'
      },
      {
        question: 'Can this convert complex multipart forms?',
        answer: 'Yes. The parser recognizes advanced cURL flags like `-F` (form-data), `-d` (data), and `-H` (headers) and converts them into the appropriate `FormData` objects in your target language.'
      },
      {
        question: 'Why not just use Postman?',
        answer: 'While Postman is a powerful GUI, converting a cURL snippet directly into code is significantly faster when you are actively writing an application and just need the exact Fetch syntax.'
      }
    ]
  },
  'code-diff': {
    seo: {
      title: 'Code Diff Checker — Compare Text Files',
      description: 'Compare two text files or code snippets instantly. Identify additions, deletions, and modifications with a visual side-by-side Git-style diff viewer.',
      keywords: ['code diff checker', 'compare text files online', 'diff viewer', 'find differences in text', 'git style diff tool'],
      tldr: 'Visually compare two blocks of code or text to identify exact line-by-line differences.',
      entity_definition: 'The Code Diff Checker is a version control and text analysis utility. A "diff" is a data comparison algorithm that calculates and displays the differences between two files. Used extensively in software engineering (like Git pull requests), this tool performs a line-by-line and character-by-character analysis of an "Original" and "Modified" text block. It visually highlights additions in green and deletions in red, allowing developers to spot minute syntax changes or configuration drifts.'
    },
    faqs: [
      {
        question: 'Does this work like Git?',
        answer: 'Yes. It uses standard diff algorithms similar to Git to identify exact line changes, outputting a visual representation similar to what you see on GitHub or GitLab.'
      },
      {
        question: 'Can it compare minified code?',
        answer: 'It can, but the results will be difficult to read because minified code is usually on a single line. For best results, run your code through a Beautifier tool first, then compare it.'
      },
      {
        question: 'Is my code saved on your server?',
        answer: 'No. The entire diff algorithm runs locally in your browser. No code is transmitted or stored, making it safe for comparing proprietary source code or private configuration files.'
      }
    ]
  },
  'dotenv-generator': {
    seo: {
      title: 'Environment Variable (.env) Generator',
      description: 'Generate, format, and validate .env files for Node.js, Python, and Docker. Ensure your environment variables are secure and syntactically correct.',
      keywords: ['dotenv generator', 'env file maker', 'create environment variables', 'node js .env', 'docker env file generator'],
      tldr: 'Generate properly formatted `.env` files to securely manage your application secrets.',
      entity_definition: 'The Environment Variable (.env) Generator is a secure configuration utility. In modern software architecture (like the Twelve-Factor App methodology), sensitive configuration data—such as API keys, database passwords, and port numbers—must be stored in environment variables rather than hardcoded in the source code. This tool helps developers scaffold strictly formatted `.env` files, ensuring proper quoting, escaping of special characters, and syntax compatibility for Node.js, Python, and Docker.'
    },
    faqs: [
      {
        question: 'Why use a .env file?',
        answer: 'Using a `.env` file keeps sensitive secrets (like database passwords) out of your main codebase. This ensures that if your code is pushed to a public GitHub repository, your passwords remain secure on your local machine.'
      },
      {
        question: 'Should I commit my .env file to Git?',
        answer: 'Never. You should explicitly add `.env` to your `.gitignore` file. You can, however, commit a `.env.example` file that lists the required variable names with blank values so other developers know what to configure.'
      },
      {
        question: 'Do I need quotes around variables?',
        answer: 'Usually no, unless the variable contains spaces or special characters (like a complex password with a `#` symbol). In those cases, wrapping the value in double quotes is required.'
      }
    ]
  },
  'git-helper': {
    seo: {
      title: 'Git Command Helper — Git CLI Cheatsheet',
      description: 'Generate complex Git commands easily. A visual interface to build commands for rebasing, squashing commits, cherry-picking, and resolving merge conflicts.',
      keywords: ['git command helper', 'git cli generator', 'generate git rebase', 'git cherry pick helper', 'git cheatsheet tool'],
      tldr: 'Visually construct complex Git CLI commands for rebasing, branching, and cherry-picking.',
      entity_definition: 'The Git Command Helper is a version control utility. Git is the industry-standard distributed version control system, but its command-line interface (CLI) is notoriously complex and unforgiving. Operations like interactive rebasing, squashing commits, hard resetting to specific SHAs, and cherry-picking require exact syntax to avoid catastrophic code loss. This tool provides a visual abstraction layer, allowing developers to select their intended action and safely generating the precise terminal command to execute it.'
    },
    faqs: [
      {
        question: 'What is a Git Rebase?',
        answer: 'Rebasing is the process of moving or combining a sequence of commits to a new base commit. It creates a cleaner, linear project history compared to a standard `git merge`, but requires more advanced Git knowledge.'
      },
      {
        question: 'What does a Hard Reset do?',
        answer: '`git reset --hard` forces your current working directory and staging area to perfectly match a specific past commit, permanently deleting any uncommitted changes you were working on.'
      },
      {
        question: 'What is Cherry-Picking?',
        answer: 'Cherry-picking allows you to select a specific commit from one branch and apply it to another, without having to merge the entire branch.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 31');
