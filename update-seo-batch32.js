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
  'docker-compose-gen': {
    seo: {
      title: 'Docker Compose Generator — Generate YAML Files',
      description: 'Generate Docker Compose YAML files visually. Quickly configure multi-container applications with networks, volumes, environment variables, and port mappings.',
      keywords: ['docker compose generator', 'generate docker-compose.yml', 'docker container builder', 'visual docker compose', 'docker network volumes'],
      tldr: 'Visually configure and generate strict `docker-compose.yml` files for multi-container apps.',
      entity_definition: 'The Docker Compose Generator is a DevOps infrastructure utility. Docker Compose is a tool for defining and running multi-container Docker applications via a single `docker-compose.yml` file. Writing this YAML by hand is prone to indentation and syntax errors. This tool provides a visual interface to declare services (e.g., Node.js frontend, PostgreSQL database), map ports, mount persistent volumes, and define internal bridged networks, outputting flawless YAML ready for deployment.'
    },
    faqs: [
      {
        question: 'What is a Docker Volume?',
        answer: 'Containers are ephemeral, meaning data is lost when they are destroyed. A Docker Volume maps a directory inside the container to a persistent directory on your host machine, ensuring databases (like MySQL) retain their data.'
      },
      {
        question: 'Why do I need a Docker Network?',
        answer: 'By defining a custom network, containers can communicate with each other securely using their service names (like `db:5432`) without exposing those internal ports to the public internet.'
      },
      {
        question: 'What is the "depends_on" directive?',
        answer: 'It controls the startup order of containers. If your Node.js API requires a database to function, `depends_on` ensures the database container starts fully before the API container spins up.'
      }
    ]
  },
  'sql-formatter': {
    seo: {
      title: 'SQL Formatter & Beautifier — Format SQL Queries',
      description: 'Format, beautify, and minify complex SQL queries instantly. Supports MySQL, PostgreSQL, and SQL Server dialects for improved readability and debugging.',
      keywords: ['sql formatter', 'sql beautifier online', 'format postgresql query', 'minify sql statement', 'clean up sql code'],
      tldr: 'Instantly format and beautify messy, complex SQL queries for easier debugging.',
      entity_definition: 'The SQL Formatter & Beautifier is a database development utility. Structured Query Language (SQL) is often written quickly in a single line, resulting in massive, unreadable blocks of code. This tool parses raw SQL strings and applies opinionated formatting rules—indenting JOIN clauses, capitalizing keywords (SELECT, WHERE), and aligning aliases—transforming illegible queries into highly readable, maintainable code for MySQL, PostgreSQL, and SQL Server dialects.'
    },
    faqs: [
      {
        question: 'Does formatting change how the query runs?',
        answer: 'No. SQL engines ignore whitespace, line breaks, and tabs. Formatting purely benefits human readability and makes complex `JOIN` and `GROUP BY` logic easier to debug.'
      },
      {
        question: 'Why capitalize SQL keywords?',
        answer: 'Capitalizing reserved keywords (like `SELECT` or `INNER JOIN`) is an industry-standard best practice. It visually separates the structural commands from your custom table and column names.'
      },
      {
        question: 'Can I minify SQL?',
        answer: 'Yes. Minifying SQL strips all unnecessary whitespace and comments, compressing the query into a single line. This is occasionally useful when passing queries as strings inside application code.'
      }
    ]
  },
  'js-obfuscator': {
    seo: {
      title: 'JavaScript Obfuscator — Protect Your JS Source Code',
      description: 'Obfuscate and scramble your JavaScript code to protect intellectual property. Prevent reverse engineering by renaming variables and encrypting strings.',
      keywords: ['javascript obfuscator', 'obfuscate js code', 'protect javascript source', 'scramble js code', 'js reverse engineering protection'],
      tldr: 'Scramble and encrypt your JavaScript code to protect it from theft and reverse engineering.',
      entity_definition: 'The JavaScript Obfuscator is a software security utility. Because JavaScript runs client-side in the browser, anyone can view the raw source code via DevTools. This tool parses JS code and applies aggressive transformations—such as renaming variables to meaningless characters, converting strings to hexadecimal arrays, and flattening control flows—making the code nearly impossible for humans to read or reverse-engineer, while maintaining exact functional equivalence.'
    },
    faqs: [
      {
        question: 'Is obfuscation the same as encryption?',
        answer: 'No. Encrypted code requires a password/key to decrypt before running. Obfuscated code is just heavily scrambled; the browser can still execute it natively without a key, it\'s just incredibly difficult for a human to understand.'
      },
      {
        question: 'Does obfuscation slow down my website?',
        answer: 'Yes, slightly. Obfuscation increases the file size (due to complex string arrays) and the execution time (due to control flow flattening). It should only be used on proprietary, sensitive logic.'
      },
      {
        question: 'Can obfuscated code be reversed (deobfuscated)?',
        answer: 'With enough time and effort, yes. Obfuscation is a deterrent, not a bulletproof shield. It stops casual theft, but a dedicated reverse-engineer can eventually untangle the logic.'
      }
    ]
  },
  'schema-validator': {
    seo: {
      title: 'JSON Schema Validator — Validate JSON Data',
      description: 'Validate your JSON data against a strict JSON Schema (Draft 04/06/07). Instantly identify structural errors, missing properties, and type mismatches.',
      keywords: ['json schema validator', 'validate json against schema', 'json draft 07 validator', 'test json schema', 'json data validation tool'],
      tldr: 'Validate a JSON payload against a strict JSON Schema definition to find structural errors.',
      entity_definition: 'The JSON Schema Validator is a data integrity utility. While JSON is the standard format for API data transfer, it lacks inherent structural rules. JSON Schema (e.g., Draft-07) is a vocabulary that enforces strict rules on a JSON object (like requiring specific keys, or enforcing that an `age` field must be an integer). This tool takes both a JSON payload and a JSON Schema, algorithmically evaluating the payload to flag exact line-number errors for any type mismatches or missing required properties.'
    },
    faqs: [
      {
        question: 'What is a required property?',
        answer: 'In a JSON Schema, the `required` array explicitly lists the keys that MUST be present in the JSON object. If the payload omits one of these keys, the validator throws a strict error.'
      },
      {
        question: 'Can I validate complex nested objects?',
        answer: 'Yes. JSON Schema supports deeply nested validation. You can define specific schemas for objects inside arrays, ensuring every element in a list strictly conforms to your data model.'
      },
      {
        question: 'What is the difference between JSON Linting and Schema Validation?',
        answer: 'Linting (or parsing) only checks if the JSON has correct syntax (like missing commas or quotes). Schema validation checks if the *data itself* is logically correct (e.g., an email field actually contains an `@` symbol).'
      }
    ]
  },
  'slug-optimizer': {
    seo: {
      title: 'URL Slug Optimizer — Generate SEO-Friendly Permalinks',
      description: 'Convert any text into a clean, SEO-friendly URL slug. Remove stop words, special characters, and convert spaces to hyphens for optimal Google rankings.',
      keywords: ['url slug optimizer', 'generate seo friendly slug', 'text to slug converter', 'permalink generator', 'clean url creator'],
      tldr: 'Convert any string of text into a clean, hyphen-separated, SEO-friendly URL slug.',
      entity_definition: 'The URL Slug Optimizer is a content formatting utility. A "slug" is the human-readable portion of a URL that identifies a specific page (e.g., `/best-running-shoes`). Search engines prefer URLs that are short, descriptive, and free of special characters. This tool algorithmically sanitizes input text by converting it to lowercase, replacing spaces with hyphens, stripping out non-alphanumeric characters, and optionally removing "stop words" (like "the" or "and") to generate a mathematically optimized permalink.'
    },
    faqs: [
      {
        question: 'Why use hyphens instead of underscores?',
        answer: 'Google explicitly recommends using hyphens (`-`) rather than underscores (`_`) in URLs. Google\'s crawler treats hyphens as word separators, but treats words connected by underscores as one single, long word.'
      },
      {
        question: 'Should I remove stop words?',
        answer: 'Usually, yes. Removing words like "a", "the", and "of" makes the URL shorter and increases the keyword density of the slug, which is a minor but positive SEO ranking factor.'
      },
      {
        question: 'How long should my URL slug be?',
        answer: 'Best practices dictate keeping your slug under 5 words or 60 characters. Shorter URLs are easier for users to copy/paste and are preferred by search engine crawlers.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 32');
