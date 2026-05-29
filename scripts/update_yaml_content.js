const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const toolsYamlPath = path.join(__dirname, '../config/tools.yaml');
const doc = yaml.load(fs.readFileSync(toolsYamlPath, 'utf8'));

const richContent = {
    'json-toolkit': {
        meta: { title: 'JSON Developer Toolkit | Format, Validate & Generate Code', description: 'The ultimate JSON utility for developers. Format, minify, validate, and generate TypeScript, Go, Java, and Python code from JSON.' },
        content: {
            title: 'JSON Developer Toolkit',
            description: 'A professional-grade JSON manipulation suite. Whether you need to pretty-print malformed JSON, validate your schema, or instantly generate type-safe interfaces for TypeScript, Go, Java, Prisma, and Pydantic, this toolkit runs entirely in your browser.',
            how_it_works: 'This tool uses advanced AST parsing entirely client-side. When you paste JSON, it is parsed via native JSON.parse() and passed through language-specific code generators (like quicktype) directly in your browser. No data is ever sent to our servers.',
            faq: [
                { question: 'Is my JSON data sent to a server?', answer: 'No. All parsing, formatting, and code generation happens 100% locally in your browser for maximum privacy and security.' },
                { question: 'Which languages can I generate from JSON?', answer: 'You can instantly generate TypeScript interfaces, Go structs, Java classes, Python Pydantic models, and Prisma schemas.' },
                { question: 'Can it fix malformed JSON?', answer: 'Yes, the toolkit includes an intelligent formatter that can repair missing quotes, trailing commas, and other common JSON syntax errors.' }
            ]
        },
        seo: { title: 'JSON Developer Toolkit', description: 'Format, validate, and generate code from JSON.' }
    },
    'json-data-converter': {
        meta: { title: 'JSON Data Converter | JSON to YAML, JSONL, & CSV', description: 'Instantly convert JSON into YAML, JSONL (JSON Lines), and CSV formats. Client-side, secure, and fast.' },
        content: {
            title: 'JSON Data Converter',
            description: 'Seamlessly convert complex JSON structures into YAML, JSON Lines (JSONL), and other data formats. Perfect for preparing data for machine learning models, log analysis, or Kubernetes configurations.',
            how_it_works: 'The converter flattens JSON objects and maps them to the target format syntax (e.g., recursive indents for YAML or newline delimitation for JSONL) using optimized client-side JavaScript.',
            faq: [
                { question: 'What is JSONL used for?', answer: 'JSON Lines (JSONL) is widely used for processing large streams of data, log files, and preparing datasets for training Large Language Models (LLMs) because each line is a valid JSON object.' },
                { question: 'Does this support nested JSON arrays?', answer: 'Yes, the converter recursively parses nested objects and arrays to properly represent them in YAML or flatten them for tabular formats.' }
            ]
        },
        seo: { title: 'JSON Data Converter', description: 'Convert JSON to YAML and JSONL.' }
    },
    'uuid-generator': {
        meta: { title: 'Universal UUID & GUID Generator | v4 and v7', description: 'Generate cryptographically secure UUIDs (v4) and time-sorted UUIDs (v7). Free, instant, and privacy-focused.' },
        content: {
            title: 'Universal UUID Generator',
            description: 'Generate universally unique identifiers instantly. Whether you need random, cryptographically secure UUID v4s or the new time-ordered UUID v7s for database primary keys, this tool generates them securely in your browser.',
            how_it_works: 'We use the Web Crypto API (`crypto.getRandomValues()`) to ensure true cryptographic randomness for UUID v4. For UUID v7, we combine a high-precision timestamp with random data to guarantee chronologically sortable identifiers.',
            faq: [
                { question: 'What is the difference between UUID v4 and v7?', answer: 'UUID v4 is entirely random, making it great for general use. UUID v7 includes a Unix timestamp, meaning the IDs are chronologically sortable—which is vastly superior for database indexing and performance.' },
                { question: 'Are these UUIDs cryptographically secure?', answer: 'Yes. We utilize the native Web Crypto API to ensure the generated strings have high entropy and cannot be predicted.' }
            ]
        },
        seo: { title: 'Universal UUID Generator', description: 'Generate secure UUIDs.' }
    },
    'password-suite': {
        meta: { title: 'Enterprise Password Security Suite | Generate & Audit', description: 'Generate hyper-secure passwords, evaluate password strength, and audit against known breaches. 100% local processing.' },
        content: {
            title: 'Enterprise Password Security Suite',
            description: 'A complete cryptographic toolkit for passwords. Generate highly entropic passwords, test their cracking time against modern hardware, and evaluate their strength without ever transmitting your keystrokes over the internet.',
            how_it_works: 'Generation relies on the Web Crypto API. The auditor uses zxcvbn (a standard password strength estimator) to calculate entropy and estimated crack times locally.',
            faq: [
                { question: 'Is it safe to type my password here?', answer: 'Yes. The entire Password Suite is built with client-side JavaScript. Your password never leaves your device and is never transmitted to a server.' },
                { question: 'How is password cracking time calculated?', answer: 'We use the industry-standard zxcvbn algorithm, which analyzes entropy, dictionary words, common patterns, and substitution techniques to estimate how long an offline brute-force attack would take.' },
                { question: 'What makes a password strong?', answer: 'Length is more important than complexity. A 16-character passphrase of random words is significantly harder to crack than an 8-character password with symbols.' }
            ]
        },
        seo: { title: 'Enterprise Password Security Suite', description: 'Generate and audit secure passwords.' }
    },
    'data-converter': {
        meta: { title: 'Universal Data Converter | CSV, XML, JSON', description: 'Bidirectional converter for CSV, XML, and JSON. Transform data formats instantly in your browser.' },
        content: {
            title: 'Universal Data Converter',
            description: 'The ultimate bridge between legacy and modern data formats. Instantly convert CSV spreadsheets to JSON arrays, XML documents to JSON objects, and vice versa. Built for data analysts and developers.',
            how_it_works: 'The tool uses robust parsing libraries (like PapaParse for CSV) to deserialize the input data into a unified JavaScript object model, which is then serialized into the chosen output format.',
            faq: [
                { question: 'Can this handle large CSV files?', answer: 'Yes, the converter is optimized to handle large datasets in the browser, though files over 50MB may cause browser slowdown depending on your hardware.' },
                { question: 'Does XML to JSON preserve attributes?', answer: 'Yes, XML attributes are preserved and typically mapped to JSON keys prefixed with an "@" symbol to maintain data integrity.' }
            ]
        },
        seo: { title: 'Universal Data Converter', description: 'Convert between CSV, XML, and JSON.' }
    }
};

doc.tools.forEach(tool => {
    if (richContent[tool.slug]) {
        tool.meta = richContent[tool.slug].meta;
        tool.content = richContent[tool.slug].content;
        tool.seo = richContent[tool.slug].seo;
    }
});

fs.writeFileSync(toolsYamlPath, yaml.dump(doc), 'utf8');
console.log('YAML updated');
