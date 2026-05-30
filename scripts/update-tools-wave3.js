const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const toolsYamlPath = path.join(__dirname, '..', 'config', 'tools.yaml');
const fileContents = fs.readFileSync(toolsYamlPath, 'utf8');
let toolsData = yaml.load(fileContents);

const obsoleteSlugs = [
  // Binary
  'binary-converter', 'binary-to-decimal', 'decimal-to-binary', 'binary-to-hex', 'hex-to-binary', 'text-to-binary', 'binary-to-text',
  // Base64
  'base64-encoder', 'base64-to-image', 'image-to-base64',
  // Text Case
  'case-converter', 'title-case', 'case-inverter', 'text-reverser', 'text-cleaner', 'whitespace-remover', 'duplicate-line-remover',
  // JWT
  'jwt-decoder', 'jwt-signer', 'jwt-debugger',
  // Alt text
  'alt-text-audit'
];

// Remove obsolete tools
toolsData.tools = toolsData.tools.filter(tool => !obsoleteSlugs.includes(tool.slug));

const newTools = [
  {
    name: 'Binary, Hex & Decimal Converter',
    slug: 'binary-hex-decimal-converter',
    category: 'Developer Tools',
    icon: 'Binary',
    tags: ['binary', 'hex', 'decimal', 'converter', 'base64'],
    priority: 10,
    releaseDate: '2026-05-30',
    function: { primary: 'Universal Number Base & Text Converter' },
    technical: { processing: 'client-side' },
    meta: {
      title: 'Binary, Hex, Decimal & Text Converter | Universal Matrix',
      description: 'Instantly convert between Binary, Hexadecimal, Decimal, and Plain Text simultaneously. Paste any format and see all conversions auto-detect and update.'
    },
    content: {
      title: 'Universal Binary, Hex & Decimal Converter',
      description: 'A unified matrix converter. Paste binary, hex, decimal numbers, or plain text into any field, and the tool will automatically detect the format and translate it into all other bases simultaneously.',
      how_it_works: 'Using smart regex heuristics, the tool auto-detects pasted data type. It utilizes JavaScript native toString(2) and parseInt(16) methods for high-speed local conversion.',
      keywords: ['text to binary', 'hex to decimal', 'binary to hex', 'decimal to binary converter online']
    },
    seo: {
      title: 'Binary, Hex & Decimal Converter',
      description: 'Instantly convert between Binary, Hexadecimal, Decimal, and Plain Text simultaneously. Paste any format and see all conversions auto-detect and update.',
      keywords: ['text to binary', 'hex to decimal', 'binary to hex', 'decimal to binary converter online']
    }
  },
  {
    name: 'Base64 Encoder / Decoder',
    slug: 'base64-encoder-decoder',
    category: 'Developer Tools',
    icon: 'Type',
    tags: ['base64', 'encoder', 'decoder', 'image-to-base64', 'data-uri'],
    priority: 10,
    releaseDate: '2026-05-30',
    function: { primary: 'Base64 Text & Image Encoding Suite' },
    technical: { processing: 'client-side' },
    meta: {
      title: 'Base64 Encoder & Decoder | Image Data URI Generator',
      description: 'Encode and decode Base64 text safely. Upload an image to generate a Base64 Data URI string, or paste a string to preview the image.'
    },
    content: {
      title: 'Base64 Encoder & Decoder Toolkit',
      description: 'A comprehensive toolkit for Base64 encoding. Switch seamlessly between decoding text payloads and converting images into Base64 Data URIs for CSS embedding.',
      how_it_works: 'Runs 100% locally in your browser. Text encoding handles full UTF-8 characters safely. Image conversion uses the native FileReader API to generate secure Data URIs offline.',
      keywords: ['base64 encode', 'base64 decode', 'image to base64', 'base64 to image converter']
    },
    seo: {
      title: 'Base64 Encoder & Decoder | Image Data URI Generator',
      description: 'Encode and decode Base64 text safely. Upload an image to generate a Base64 Data URI string, or paste a string to preview the image.',
      keywords: ['base64 encode', 'base64 decode', 'image to base64', 'base64 to image converter']
    }
  },
  {
    name: 'Text Formatting & Case Toolkit',
    slug: 'text-case-formatter',
    category: 'Text Tools',
    icon: 'Type',
    tags: ['text', 'case-converter', 'title-case', 'formatting', 'cleaner'],
    priority: 10,
    releaseDate: '2026-05-30',
    function: { primary: 'Advanced Text Case & Formatting Editor' },
    technical: { processing: 'client-side' },
    meta: {
      title: 'Text Case Converter & Formatting Toolkit',
      description: 'Convert text to UPPERCASE, lowercase, Title Case, reverse text, remove whitespace, and delete duplicate lines instantly in your browser.'
    },
    content: {
      title: 'Text Case Converter & Formatting Toolkit',
      description: 'A professional text editor toolbar to quickly manipulate string formats. Clean up messy lists by removing duplicates, trimming whitespace, or instantly switching case structures.',
      how_it_works: 'All text transformations are executed locally using advanced Regex manipulation.',
      keywords: ['case converter', 'title case generator', 'remove duplicate lines', 'whitespace remover', 'text reverser']
    },
    seo: {
      title: 'Text Case Converter & Formatting Toolkit',
      description: 'Convert text to UPPERCASE, lowercase, Title Case, reverse text, remove whitespace, and delete duplicate lines instantly in your browser.',
      keywords: ['case converter', 'title case generator', 'remove duplicate lines', 'whitespace remover', 'text reverser']
    }
  },
  {
    name: 'JWT Decoder & Generator',
    slug: 'jwt-decoder-generator',
    category: 'Developer Tools',
    icon: 'Shield',
    tags: ['jwt', 'security', 'token', 'decoder', 'json-web-token'],
    priority: 10,
    releaseDate: '2026-05-30',
    function: { primary: 'Offline JWT Verification & Decoding' },
    technical: { processing: 'client-side' },
    meta: {
      title: 'Offline JWT Decoder & Generator | Verify Tokens Locally',
      description: 'Decode, verify, and generate JSON Web Tokens (JWT) 100% offline. Protect your secret keys by ensuring they never leave your browser.'
    },
    content: {
      title: 'Offline JWT Decoder & Generator',
      description: 'Analyze JSON Web Tokens with full privacy. Unlike remote decoders, this tool never transmits your JWTs or HMAC secrets to a server.',
      how_it_works: 'It natively implements base64url decoding to parse the Header and Payload locally in your browser session.',
      keywords: ['jwt decoder offline', 'json web token generator', 'verify jwt signature client side', 'decode jwt token']
    },
    seo: {
      title: 'Offline JWT Decoder & Generator | Verify Tokens Locally',
      description: 'Decode, verify, and generate JSON Web Tokens (JWT) 100% offline. Protect your secret keys by ensuring they never leave your browser.',
      keywords: ['jwt decoder offline', 'json web token generator', 'verify jwt signature client side', 'decode jwt token']
    }
  }
];

const existingSlugs = new Set(toolsData.tools.map(t => t.slug));
for (const newTool of newTools) {
  if (!existingSlugs.has(newTool.slug)) {
    toolsData.tools.unshift(newTool);
  }
}

fs.writeFileSync(toolsYamlPath, yaml.dump(toolsData, { lineWidth: 500 }), 'utf8');
console.log('Wave 3 YAML updated.');
