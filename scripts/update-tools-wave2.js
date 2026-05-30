const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const yamlPath = path.join(__dirname, '..', 'config', 'tools.yaml');
const doc = yaml.load(fs.readFileSync(yamlPath, 'utf8'));

const obsoleteSlugs = new Set([
  'schema-generator', 'schema-validator', 'schema-validator-pro', 'breadcrumb-schema', 'breadcrumb-schema-gen',
  'qr-code-gen',
  'sql-formatter', 'sql-minifier', 'sql-injection-tester', 'sql-sanitizer', 'sql-injection-sanitizer',
  'markdown-to-html', 'markdown-converter', 'markdown-previewer'
]);

// Filter out obsolete tools
doc.tools = doc.tools.filter(t => !obsoleteSlugs.has(t.slug));

// Also remove the old qr-code-generator if it exists so we can re-insert it cleanly
doc.tools = doc.tools.filter(t => t.slug !== 'qr-code-generator');

// 1. Schema Markup Generator
doc.tools.push({
  name: 'Schema Markup Generator',
  slug: 'schema-markup-generator',
  category: 'SEO Tools',
  tags: ['schema', 'json-ld', 'seo', 'structured data', 'validator'],
  icon: 'Database',
  releaseDate: '2026-05-30',
  function: { primary: 'Generate and validate JSON-LD structured data.' },
  technical: { input_formats: ['JSON', 'Form'], output_formats: ['JSON-LD'], processing: 'client-side' },
  meta: {
    title: 'Schema Markup & JSON-LD Generator | Free SEO Validator',
    description: 'Offline-first Schema Markup Generator. Easily build and validate JSON-LD structured data for Breadcrumbs, Organizations, and FAQs securely in your browser.'
  },
  content: {
    description: 'A comprehensive suite for generating and validating JSON-LD structured data. Ensure your website communicates effectively with search engines using our robust Schema Markup Generator.',
    entity_definition: 'Schema markup (JSON-LD) is a standardized vocabulary used by search engines to understand the content of your pages. Our generator provides a streamlined interface for creating and validating Organization, Breadcrumb, and other critical entity schemas, ensuring compliance with schema.org specifications.',
    how_it_works: 'Select the schema type you wish to generate (e.g., Organization, Breadcrumb). Fill in the required fields, and our tool instantly generates the corresponding JSON-LD output. You can also paste existing schema into the Pro Validator to check for missing required properties or syntax errors.',
    use_cases: ['Generating Breadcrumb lists for e-commerce sites.', 'Creating Organization schema for local businesses.', 'Validating third-party JSON-LD snippets for errors.'],
    features: ['Multi-entity support', 'Live syntax validation', 'Breadcrumb list builder', 'Client-side processing for privacy'],
    faq: [
      { question: 'What is JSON-LD?', answer: 'JSON-LD is a lightweight Linked Data format. It is the recommended format by Google for implementing schema markup.' },
      { question: 'Does this tool validate against schema.org?', answer: 'Yes, our Pro Validator checks for required fields and proper syntax based on schema.org guidelines.' }
    ]
  }
});

// 2. QR Code Generator
doc.tools.push({
  name: 'QR Code Generator',
  slug: 'qr-code-generator',
  category: 'Generators',
  tags: ['qr', 'barcode', 'generator', 'link'],
  icon: 'QrCode',
  releaseDate: '2026-05-30',
  function: { primary: 'Generate high-resolution QR codes from URLs or text.' },
  technical: { input_formats: ['Text', 'URL'], output_formats: ['PNG'], processing: 'client-side' },
  meta: {
    title: 'Free QR Code Generator | High-Res PNG Download',
    description: 'Create high-resolution QR codes instantly. Fast, offline-first, secure, and privacy-friendly. Download as PNG directly from your browser.'
  },
  content: {
    description: 'Generate high-quality, scan-ready QR codes for your URLs, text, or contact information securely in your browser.',
    entity_definition: 'A Quick Response (QR) code is a two-dimensional barcode capable of storing large amounts of data. Our client-side generator translates your input text or URLs into an optimized, high-resolution QR image suitable for print or digital distribution.',
    how_it_works: 'Simply type or paste your URL or text into the input field. The QR code is generated instantly in real-time. You can then copy the image to your clipboard or download it as a PNG file.',
    use_cases: ['Creating scannable links for marketing materials.', 'Generating WiFi access codes.', 'Sharing contact information quickly.'],
    features: ['High-resolution output', 'Instant rendering', 'One-click copy and download', 'Zero server tracking'],
    faq: [
      { question: 'Are the QR codes permanent?', answer: 'Yes, the QR codes generated are static, meaning they will work forever as long as the underlying URL or text remains valid.' },
      { question: 'Can I use these for commercial printing?', answer: 'Absolutely. The PNG downloads are high-resolution and suitable for commercial print applications.' }
    ]
  }
});

// 3. SQL Toolkit
doc.tools.push({
  name: 'SQL Toolkit',
  slug: 'sql-toolkit',
  category: 'Developer Tools',
  tags: ['sql', 'database', 'formatter', 'sanitizer', 'security'],
  icon: 'Terminal',
  releaseDate: '2026-05-30',
  function: { primary: 'Format, minify, and sanitize SQL queries.' },
  technical: { input_formats: ['SQL'], output_formats: ['SQL'], processing: 'client-side' },
  meta: {
    title: 'SQL Formatter, Minifier & Injection Tester | SQL Toolkit',
    description: 'All-in-one offline SQL utility. Format messy queries, minify code, and test for SQL injection vulnerabilities securely in your browser.'
  },
  content: {
    description: 'A robust utility belt for database administrators and backend developers to format, minify, and analyze SQL queries for potential injection vulnerabilities.',
    entity_definition: 'The SQL Toolkit combines syntax formatting with basic vulnerability scanning. It standardizes messy query strings for readability, compresses them for application deployment, and scans input against common SQL injection patterns (such as tautologies or destructive DML).',
    how_it_works: 'Paste your SQL query into the unified interface. Use the "Format" tab to beautifully indent the code, the "Minify" tab to compress it into a single line, or the "Injection Tester" tab to simulate scanning for malicious payloads.',
    use_cases: ['Formatting massive database dumps for readability.', 'Minifying SQL strings for embedding in source code.', 'Checking raw user input for obvious SQL injection attempts.'],
    features: ['Multi-dialect formatting', 'Query minification', 'Basic injection vulnerability scanning', '100% offline processing'],
    faq: [
      { question: 'Does this replace parameterized queries?', answer: 'No! You should always use parameterized queries or prepared statements in production. This tool is purely for static analysis and formatting.' },
      { question: 'Which SQL dialects are supported?', answer: 'The formatter uses generic SQL rules that work well with MySQL, PostgreSQL, and SQLite.' }
    ]
  }
});

// 4. Markdown HTML Converter
doc.tools.push({
  name: 'Markdown HTML Converter',
  slug: 'markdown-html-converter',
  category: 'Content Utilities',
  tags: ['markdown', 'html', 'converter', 'editor'],
  icon: 'FileCode',
  releaseDate: '2026-05-30',
  function: { primary: 'Convert Markdown to HTML with live preview.' },
  technical: { input_formats: ['Markdown'], output_formats: ['HTML'], processing: 'client-side' },
  meta: {
    title: 'Markdown to HTML Converter | Live Split-Pane Editor',
    description: 'Convert Markdown to HTML instantly. Features a live split-pane preview, raw HTML output, and offline-first processing for privacy.'
  },
  content: {
    description: 'Write, preview, and convert Markdown syntax to clean HTML markup instantly with our side-by-side editor.',
    entity_definition: 'Markdown is a lightweight markup language that allows writers to format text using plain-text syntax. Our converter instantly parses Markdown structures (like headers, bold text, and lists) into fully compliant semantic HTML tags, complete with a real-time visual preview.',
    how_it_works: 'Type or paste your Markdown into the source pane. As you type, the tool instantly generates the corresponding raw HTML code and renders a visual preview in the bottom pane. You can copy the HTML output with a single click.',
    use_cases: ['Writing documentation for GitHub.', 'Formatting blog posts for CMS platforms.', 'Drafting formatted emails.'],
    features: ['Split-pane live preview', 'Instant HTML generation', 'Syntax highlighting', 'Zero-latency conversion'],
    faq: [
      { question: 'Does this support GitHub Flavored Markdown?', answer: 'Yes, standard Markdown features like lists, blockquotes, and code blocks are fully supported.' },
      { question: 'Is my text saved anywhere?', answer: 'No, all conversion happens entirely in your browser memory. We never store your writing.' }
    ]
  }
});

fs.writeFileSync(yamlPath, yaml.dump(doc, { noRefs: true, lineWidth: -1 }), 'utf8');
console.log('Wave 2 tools updated in config/tools.yaml');
