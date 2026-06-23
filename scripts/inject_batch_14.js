const fs = require('fs');
const yaml = require('js-yaml'); 

const yamlFile = 'config/tools.yaml';
const fileContent = fs.readFileSync(yamlFile, 'utf8');

const parsed = yaml.load(fileContent);

const enhancements = {
  'xml-minifier': {
    practical_application: "XML configurations (like Android Manifests or AWS S3 Bucket Policies) are notoriously bloated with whitespace and comments. Minifying XML before deployment reduces the parsing time required by strict SAX (Simple API for XML) parsers, drastically accelerating boot times in mobile applications and serverless edge functions.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Node.js XML Minification",
        code: "const minify = require('minify-xml').minify;\n\nconst rawXml = '<book>\\n  <title>Dune</title>\\n</book>';\nconst minified = minify(rawXml);\n// Output: <book><title>Dune</title></book>"
      }
    ]
  },
  'line-counter': {
    practical_application: "Lines of Code (LOC) is a controversial productivity metric, but it is essential for technical debt audits and CI/CD limitations. For example, AWS Lambda functions fail to deploy if the unzipped package exceeds 250MB. A strict line counter that ignores whitespace and comments provides a true measure of architectural complexity.",
    code_blueprints: [
      {
        language: "bash",
        title: "Unix Word Count (wc)",
        code: "# Recursively count total lines of code in all JavaScript files\nfind . -name '*.js' | xargs wc -l\n\n# Exclude node_modules for accurate repository size\nfind . -name '*.js' -not -path './node_modules/*' | xargs wc -l"
      }
    ]
  },
  'rot13-cipher': {
    practical_application: "ROT13 (Rotate by 13 places) is a simple substitution cipher. Because 13 is half of 26 (the English alphabet), applying ROT13 twice restores the original text. It is entirely insecure for cryptography but is widely used in online forums (like Reddit) to hide movie spoilers or puzzle solutions from casual scrollers.",
    code_blueprints: [
      {
        language: "javascript",
        title: "ROT13 ASCII Shift",
        code: "function rot13(str) {\n  return str.replace(/[a-zA-Z]/g, function(c) {\n    return String.fromCharCode(\n      (c <= \"Z\" ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26\n    );\n  });\n}"
      }
    ]
  },
  'random-user-gen': {
    practical_application: "When designing UI layouts in Figma or populating staging databases, developers need realistic, structurally valid dummy data (names, emails, avatars). Generating diverse, statistically accurate user profiles ensures that UI components (like deep-nested dropdowns) don't break when rendering unexpectedly long names or foreign character sets.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Faker.js Integration",
        code: "import { faker } from '@faker-js/faker';\n\nfunction generateDummyUsers(count = 5) {\n  return Array.from({ length: count }).map(() => ({\n    id: faker.string.uuid(),\n    name: faker.person.fullName(),\n    email: faker.internet.email(),\n    avatar: faker.image.avatar()\n  }));\n}"
      }
    ]
  },
  'barcode-gen': {
    practical_application: "1D Barcodes (like Code 128 or UPC-A) are the backbone of logistics and retail Point of Sale (POS) systems. Generating barcodes dynamically in the browser using SVG or Canvas allows E-commerce platforms to render printable shipping labels and digital event tickets without relying on expensive third-party APIs.",
    code_blueprints: [
      {
        language: "javascript",
        title: "JsBarcode SVG Rendering",
        code: "import JsBarcode from 'jsbarcode';\n\n// Target an <svg id=\"barcode\"></svg> element\nJsBarcode(\"#barcode\", \"ORDER-12345\", {\n  format: \"CODE128\",\n  lineColor: \"#0B1120\",\n  width: 2,\n  height: 40,\n  displayValue: true\n});"
      }
    ]
  },
  'svg-optimizer': {
    practical_application: "SVGs exported from Illustrator or Figma contain massive amounts of useless metadata (editor tags, empty groups, hidden layers). Running SVGs through an optimizer (like SVGO) strips this data, reducing file sizes by up to 80% and preventing DOM bloat when the SVGs are inlined directly into React components.",
    code_blueprints: [
      {
        language: "json",
        title: "SVGO Configuration",
        code: "module.exports = {\n  plugins: [\n    'removeDoctype',\n    'removeComments',\n    'cleanupIDs',\n    { name: 'removeViewBox', active: false } // Required for responsive scaling\n  ]\n};"
      }
    ]
  },
  'domain-age-checker': {
    practical_application: "Domain age is a heavily debated SEO ranking factor. Newly registered domains are often placed in the 'Google Sandbox' to prevent spam networks from ranking immediately. Analyzing the WHOIS creation date helps SEO specialists estimate how much authority a domain has accumulated and evaluate the historical value of an expired domain auction.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Calculate Domain Age",
        code: "function calculateDomainAge(creationDateString) {\n  const creationDate = new Date(creationDateString);\n  const diffMs = Date.now() - creationDate.getTime();\n  const ageInYears = diffMs / (1000 * 60 * 60 * 24 * 365);\n  return `${ageInYears.toFixed(1)} years old`;\n}"
      }
    ]
  },
  'contrast-checker': {
    practical_application: "Legally, public sector websites and enterprise applications must comply with WCAG 2.1 AA standards (or AAA for strict compliance). A contrast checker calculates the relative luminance between a foreground text color and background color. Failure to meet the 4.5:1 ratio can result in costly accessibility lawsuits.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Relative Luminance Calculation",
        code: "function getLuminance(r, g, b) {\n  const a = [r, g, b].map(function (v) {\n    v /= 255;\n    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);\n  });\n  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;\n}"
      }
    ]
  },
  'scrypt-hasher': {
    practical_application: "scrypt is a highly secure, memory-hard key derivation function specifically designed to be extremely expensive to calculate on custom ASIC hardware (which attackers use to crack passwords). It forces the CPU to store a massive array of pseudo-random data in memory, making brute-force attacks economically unviable.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Node.js Crypto scrypt",
        code: "const crypto = require('crypto');\n\n// Generate a 64-byte key using a strong salt and high cost factor (N=16384)\ncrypto.scrypt('super_secret_password', 'strong_salt_string', 64, { N: 16384, r: 8, p: 1 }, (err, derivedKey) => {\n  if (err) throw err;\n  console.log(derivedKey.toString('hex'));\n});"
      }
    ]
  },
  'hmac-generator': {
    practical_application: "HMAC (Hash-based Message Authentication Code) provides both data integrity and authenticity. It proves that a message was generated by someone holding a specific secret key. Webhooks (like Stripe or GitHub) rely entirely on HMAC-SHA256 headers to ensure that incoming HTTP requests are genuinely from their servers, not forged by an attacker.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Node.js HMAC Signature",
        code: "const crypto = require('crypto');\n\nfunction generateHmacSignature(payloadString, secretKey) {\n  const hmac = crypto.createHmac('sha256', secretKey);\n  hmac.update(payloadString);\n  return `sha256=${hmac.digest('hex')}`;\n}"
      }
    ]
  }
};

let modified = false;

parsed.tools.forEach(tool => {
  if (enhancements[tool.slug]) {
    tool.content.practical_application = enhancements[tool.slug].practical_application;
    tool.content.code_blueprints = enhancements[tool.slug].code_blueprints;
    modified = true;
    console.log(`Updated ${tool.slug}`);
  }
});

if (modified) {
  fs.writeFileSync(yamlFile, yaml.dump(parsed));
  console.log('Successfully injected Batch 14 semantic depth.');
} else {
  console.log('No tools were modified.');
}
