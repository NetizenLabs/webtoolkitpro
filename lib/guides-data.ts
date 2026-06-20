export interface GuideCluster {
  slug: string
  title: string
  description: string
  metaTitle: string
  metaDescription: string
  lastUpdated: string
  icon: string
  
  whatYouWillLearn: string[]
  
  // Slugs of the blog articles in this cluster
  articleSlugs: string[]
  
  // Slugs of the tools relevant to this cluster
  toolSlugs: string[]
  
  // A quick reference table for the hub page
  quickReference: {
    title: string
    rows: { key: string; value: string }[]
  }
  
  faqs: {
    q: string
    a: string
  }[]
}

export const GUIDES_DATA: GuideCluster[] = [
  {
    slug: 'jwt',
    title: 'Complete Guide to JWT in 2026',
    description: 'Everything you need to know about JSON Web Tokens. From encoding and decoding to security best practices, expiry handling, and stateless authentication architecture.',
    metaTitle: 'Complete Guide to JSON Web Tokens (JWT) in 2026',
    metaDescription: 'The ultimate technical guide to JWTs. Learn how to securely implement, decode, and manage JSON Web Tokens in modern web applications.',
    lastUpdated: '2026-06-10',
    icon: 'Key',
    whatYouWillLearn: [
      'The exact structure of a JWT (Header, Payload, Signature)',
      'How to decode and verify JWTs without third-party libraries',
      'When to use JWTs vs traditional Session Cookies',
      'How to handle the "TokenExpiredError" gracefully in Node.js',
      'Security best practices to prevent JWT tampering and XSS attacks'
    ],
    articleSlugs: [
      'what-is-jwt-complete-guide',
      'decode-jwt-token-without-library',
      'generate-jwt-token-online-free',
      'jwt-vs-session-cookies-2026',
      'jwt-token-expiry-error-nodejs'
    ],
    toolSlugs: [
      'jwt-decoder-generator'
    ],
    quickReference: {
      title: 'Standard JWT Claims (RFC 7519)',
      rows: [
        { key: 'iss', value: 'Issuer (who created the token)' },
        { key: 'sub', value: 'Subject (who the token refers to)' },
        { key: 'aud', value: 'Audience (who the token is intended for)' },
        { key: 'exp', value: 'Expiration Time (numeric date)' },
        { key: 'nbf', value: 'Not Before (token is invalid before this time)' },
        { key: 'iat', value: 'Issued At (time token was generated)' }
      ]
    },
    faqs: [
      {
        q: 'Are JWTs encrypted?',
        a: 'No, standard JWTs (JWS) are only Base64Url encoded and signed. Anyone who intercepts the token can read the payload. Do not put sensitive data (like passwords) in a JWT payload.'
      },
      {
        q: 'How do I invalidate a JWT before it expires?',
        a: 'Because JWTs are stateless, you cannot "delete" them on the server. You must either use short expiration times combined with refresh tokens, or implement a server-side blacklist for revoked tokens.'
      }
    ]
  },
  {
    slug: 'json',
    title: 'Complete Guide to JSON in 2026',
    description: 'Master JavaScript Object Notation. Discover validation techniques, formatting strategies, and how to convert JSON into YAML, CSV, and Type-Safe code.',
    metaTitle: 'Complete Guide to JSON Formatting, Validation & Conversion',
    metaDescription: 'Master JSON (JavaScript Object Notation). Learn formatting best practices, schema validation, and how to convert JSON to TypeScript, YAML, and CSV.',
    lastUpdated: '2026-06-10',
    icon: 'Braces',
    whatYouWillLearn: [
      'The strict syntax rules of RFC 8259',
      'How to format, validate, and minify massive JSON payloads',
      'Differences between JSON, YAML, and JSONL',
      'How to auto-generate TypeScript Interfaces and Pydantic models from JSON',
      'The best CLI vs Browser tools for parsing JSON data'
    ],
    articleSlugs: [
      'what-is-json-complete-guide',
      'validate-json-format-online',
      'json-formatter-vs-jq',
      'json-to-yaml-converter-offline',
      'json-to-typescript-interface-converter',
      'json-to-pydantic-model-generator',
      'csv-to-json-nested-objects-converter'
    ],
    toolSlugs: [
      'json-yaml-jsonl-converter',
      'json-to-code-generator',
      'csv-json-xml-converter'
    ],
    quickReference: {
      title: 'Valid JSON Data Types',
      rows: [
        { key: 'String', value: 'Must be wrapped in double quotes ("text")' },
        { key: 'Number', value: 'Integers or floating point (no quotes)' },
        { key: 'Object', value: 'Unordered collection of key/value pairs {}' },
        { key: 'Array', value: 'Ordered list of values []' },
        { key: 'Boolean', value: 'true or false (lowercase, no quotes)' },
        { key: 'Null', value: 'null (lowercase, no quotes)' }
      ]
    },
    faqs: [
      {
        q: 'Can JSON keys be numbers or variables?',
        a: 'No. In valid JSON, all keys must be strings enclosed in double quotes.'
      },
      {
        q: 'Can I add comments to a JSON file?',
        a: 'Strictly speaking, the JSON standard does not support comments. If you need comments for configuration files, consider using JSONC (JSON with Comments) or YAML.'
      }
    ]
  },
  {
    slug: 'regex',
    title: 'Complete Guide to Regular Expressions',
    description: 'A deep dive into pattern matching. Learn the syntax, lookaheads, lookbehinds, and how to test Regex safely in JavaScript without catastrophic backtracking.',
    metaTitle: 'Complete Guide to Regular Expressions (Regex) for Web Developers',
    metaDescription: 'Master Regular Expressions (Regex). Learn syntax, assertions, lookaheads, and how to safely test and debug patterns without catastrophic backtracking.',
    lastUpdated: '2026-06-10',
    icon: 'TerminalSquare',
    whatYouWillLearn: [
      'The fundamental syntax: anchors, character classes, and quantifiers',
      'Advanced assertions: positive and negative lookaheads/lookbehinds',
      'How to read and decipher complex Regex patterns',
      'How to test your patterns securely in the browser',
      'Common pitfalls like catastrophic backtracking'
    ],
    articleSlugs: [
      'regex-cheat-sheet-javascript',
      'regex-lookahead-lookbehind-guide'
    ],
    toolSlugs: [
      'regex-tester',
      'regex-explainer'
    ],
    quickReference: {
      title: 'Regex Anchors & Quantifiers',
      rows: [
        { key: '^', value: 'Start of string/line' },
        { key: '$', value: 'End of string/line' },
        { key: '*', value: 'Zero or more times' },
        { key: '+', value: 'One or more times' },
        { key: '?', value: 'Zero or one time (optional)' },
        { key: '{n,m}', value: 'Between n and m times' }
      ]
    },
    faqs: [
      {
        q: 'What is a Regex flag?',
        a: 'Flags change how an expression is evaluated. Common flags include "g" (global search), "i" (case-insensitive), and "m" (multiline).'
      },
      {
        q: 'What is catastrophic backtracking?',
        a: 'It occurs when a Regex has heavily nested quantifiers or overlapping alternation, causing the engine to try millions of combinations on a failing string, locking up the CPU.'
      }
    ]
  },
  {
    slug: 'seo',
    title: 'Complete Technical SEO Guide 2026',
    description: 'Optimize your site for modern search engines and AI crawlers. Covering schema markup, robots.txt, canonicalization, Core Web Vitals, and metadata.',
    metaTitle: 'Complete Technical SEO Guide 2026 | WebToolkit Pro',
    metaDescription: 'Master Technical SEO. Learn how to implement JSON-LD schema, configure robots.txt for AI bots, set canonical URLs, and optimize Core Web Vitals.',
    lastUpdated: '2026-06-10',
    icon: 'LineChart',
    whatYouWillLearn: [
      'How to write perfect Title, Description, and Open Graph tags',
      'The difference between Canonical tags and Noindex directives',
      'How to block or allow specific AI crawlers via robots.txt',
      'How to implement JSON-LD FAQ and Article schema without plugins',
      'Optimizing URL slugs and XML Sitemaps for rapid indexing'
    ],
    articleSlugs: [
      'seo-meta-tags-complete-guide',
      'canonical-url-seo-duplicate-content',
      'robots-txt-guide-block-ai-crawlers-2026',
      'xml-sitemap-best-practices-2026',
      'faq-schema-markup-google-rich-results',
      'add-schema-markup-without-plugin',
      'seo-audit-checklist-2026',
      'url-slug-seo-best-practices'
    ],
    toolSlugs: [
      'site-audit-pro',
      'schema-markup-generator',
      'meta-tag-generator',
      'robots-txt-toolkit'
    ],
    quickReference: {
      title: 'Essential Meta Tags',
      rows: [
        { key: '<title>', value: '50-60 characters maximum' },
        { key: '<meta name="description">', value: '150-160 characters maximum' },
        { key: '<link rel="canonical">', value: 'Absolute URL pointing to master copy' },
        { key: 'og:image', value: '1200x630 pixels, < 1MB' },
        { key: 'robots', value: 'index, follow (default) or noindex, nofollow' }
      ]
    },
    faqs: [
      {
        q: 'Does Google still use the meta keywords tag?',
        a: 'No. Google officially stated in 2009 that they do not use the meta keywords tag for web ranking.'
      },
      {
        q: 'How do I test my Schema Markup?',
        a: 'You can use the official Google Rich Results Test tool, or use our Schema Markup Generator which outputs pre-validated JSON-LD.'
      }
    ]
  },
  {
    slug: 'web-security',
    title: 'Complete Web Security Guide 2026',
    description: 'Secure your applications against modern threats. Learn about AES encryption, secure password hashing, RSA key generation, and preventing XSS.',
    metaTitle: 'Complete Web Security & Cryptography Guide 2026',
    metaDescription: 'A technical guide to web security. Learn how to hash passwords safely, implement AES encryption, configure Content Security Policies, and prevent XSS.',
    lastUpdated: '2026-06-10',
    icon: 'Shield',
    whatYouWillLearn: [
      'Why you should use Argon2 or Bcrypt instead of SHA for passwords',
      'How to encrypt data in the browser using AES-256-GCM',
      'How to generate secure RSA key pairs client-side',
      'Building a strict Content Security Policy (CSP) header',
      'Identifying and preventing Cross-Site Scripting (XSS) vulnerabilities'
    ],
    articleSlugs: [
      'how-secure-is-my-password',
      'calculate-password-entropy-bits',
      'bcrypt-vs-argon2-password-hashing',
      'aes-encryption-javascript-browser',
      'enterprise-web-security-checklist',
      'xss-prevention-guide',
      'what-is-sha256'
    ],
    toolSlugs: [
      'password-entropy-tester',
      'bcrypt-hasher',
      'aes-encryption',
      'csp-builder',
      'xss-scanner',
      'rsa-key-gen'
    ],
    quickReference: {
      title: 'Security Header Checklist',
      rows: [
        { key: 'Content-Security-Policy', value: 'Prevents XSS by restricting resource origins' },
        { key: 'Strict-Transport-Security', value: 'Forces browsers to use HTTPS (HSTS)' },
        { key: 'X-Content-Type-Options', value: 'nosniff (prevents MIME-sniffing)' },
        { key: 'X-Frame-Options', value: 'DENY or SAMEORIGIN (prevents Clickjacking)' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
      ]
    },
    faqs: [
      {
        q: 'Should I encrypt passwords in my database?',
        a: 'No, you should hash them, not encrypt them. Encryption is reversible if you have the key; hashing is a one-way mathematical function. Use Argon2 or Bcrypt for hashing passwords.'
      },
      {
        q: 'What is the difference between Hashing and Encryption?',
        a: 'Encryption is meant to be decrypted later (requires a key). Hashing is one-way (cannot be reversed). Encryption is for storing secret data; hashing is for verifying data integrity (like passwords or file checksums).'
      }
    ]
  }
]
