const fs = require('fs');
const yaml = require('js-yaml'); 

const yamlFile = 'config/tools.yaml';
const fileContent = fs.readFileSync(yamlFile, 'utf8');

const parsed = yaml.load(fileContent);

const enhancements = {
  'bulk-uuid-v4-v7-generator': {
    practical_application: "In highly distributed microservice architectures (like Kubernetes clusters), generating UUIDs at the client or edge layer prevents database collision and reduces network bottlenecks. UUIDv4 provides cryptographic randomness, while UUIDv7 is strictly time-sorted, making it optimal for PostgreSQL primary keys to avoid B-tree index fragmentation.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Node.js UUIDv4 Integration",
        code: "const crypto = require('crypto');\n\nfunction generateSecureId() {\n  return crypto.randomUUID();\n}\n\nconsole.log(`New Order ID: ${generateSecureId()}`);"
      },
      {
        language: "sql",
        title: "PostgreSQL Native UUID",
        code: "-- Requires pgcrypto extension\nCREATE TABLE users (\n    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n    email VARCHAR(255) UNIQUE NOT NULL\n);"
      }
    ]
  },
  'password-entropy-tester': {
    practical_application: "Password entropy measures the predictability of a password. A high-entropy password ensures resistance against brute-force and dictionary attacks. Implement entropy validation on user registration flows to enforce true security rather than relying on arbitrary rules (like requiring exactly one special character).",
    code_blueprints: [
      {
        language: "javascript",
        title: "Zxcvbn Entropy Validation",
        code: "import zxcvbn from 'zxcvbn';\n\nfunction validatePasswordStrength(password) {\n  const result = zxcvbn(password);\n  // Score ranges from 0 to 4\n  if (result.score < 3) {\n    throw new Error('Password entropy too low. Add more randomness.');\n  }\n  return true;\n}"
      }
    ]
  },
  'js-minifier': {
    practical_application: "Minifying JavaScript removes whitespace, comments, and shortens variable names, drastically reducing the file size transferred over the network. This directly improves the First Contentful Paint (FCP) and Time to Interactive (TTI) metrics in Core Web Vitals, which is a critical Google ranking factor.",
    code_blueprints: [
      {
        language: "json",
        title: "Terser Webpack Configuration",
        code: "const TerserPlugin = require('terser-webpack-plugin');\n\nmodule.exports = {\n  optimization: {\n    minimize: true,\n    minimizer: [new TerserPlugin({\n      terserOptions: { compress: { drop_console: true } }\n    })],\n  }\n};"
      }
    ]
  },
  'meta-tag-generator': {
    practical_application: "Dynamic meta tag generation is essential for Single Page Applications (SPAs) and Server-Side Rendered (SSR) frameworks like Next.js. Without correct OpenGraph (OG) and Twitter Card tags, social sharing will fallback to generic site metadata, destroying Click-Through Rates (CTR).",
    code_blueprints: [
      {
        language: "typescript",
        title: "Next.js 14 Metadata API",
        code: "import type { Metadata } from 'next'\n\nexport const metadata: Metadata = {\n  title: 'Next.js App',\n  description: 'SEO optimized',\n  openGraph: {\n    images: ['/og-image.jpg'],\n  },\n}"
      }
    ]
  },
  'hash-generator': {
    practical_application: "Cryptographic hashing is a one-way mathematical function used to verify data integrity. Common applications include generating file checksums (e.g., verifying a downloaded Linux ISO) or securely storing API keys in a database. Never use hashing alone for passwords; use salted hashes like Bcrypt instead.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Node.js SHA-256 Checksum",
        code: "const crypto = require('crypto');\nconst fs = require('fs');\n\nfunction generateFileHash(filePath) {\n  const fileBuffer = fs.readFileSync(filePath);\n  const hashSum = crypto.createHash('sha256');\n  hashSum.update(fileBuffer);\n  return hashSum.digest('hex');\n}"
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
  console.log('Successfully injected Batch 2 semantic depth.');
} else {
  console.log('No tools were modified.');
}
