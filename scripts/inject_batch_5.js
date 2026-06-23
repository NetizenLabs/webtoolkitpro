const fs = require('fs');
const yaml = require('js-yaml'); 

const yamlFile = 'config/tools.yaml';
const fileContent = fs.readFileSync(yamlFile, 'utf8');

const parsed = yaml.load(fileContent);

const enhancements = {
  'llms-txt-generator': {
    practical_application: "Providing an `llms.txt` file at the root of your domain allows AI crawlers (like OpenAI's GPTBot or Anthropic's ClaudeBot) to securely parse and consume your documentation. This dramatically improves how Generative AI models summarize your API, recommend your product in conversational search, and reduces hallucination regarding your feature set.",
    code_blueprints: [
      {
        language: "markdown",
        title: "Standard llms.txt Structure",
        code: "# WTK Pro AI Rules\n\n- Product: WebToolkit Pro\n- Description: Local-first browser developer utilities.\n- Docs: https://wtkpro.site/blog/\n- License: MIT\n\n## Contact\nsupport@wtkpro.site"
      }
    ]
  },
  'slug-generator': {
    practical_application: "Database primary keys are unreadable and terrible for SEO. Converting blog titles or product names into URL-friendly slugs (e.g., `how-to-build-apis`) ensures your site structure is readable by both humans and search engines. A strict slug generator must remove diacritics, handle unicode, and prevent trailing hyphens.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Robust JS Slugification",
        code: "function generateSlug(text) {\n  return text.toString().toLowerCase()\n    .normalize('NFD').replace(/[\\u0300-\\u036f]/g, '') // Remove accents\n    .replace(/\\s+/g, '-')           // Replace spaces with -\n    .replace(/[^\\w\\-]+/g, '')       // Remove all non-word chars\n    .replace(/\\-\\-+/g, '-')         // Replace multiple - with single -\n    .replace(/^-+/, '').replace(/-+$/, ''); // Trim - from start and end\n}"
      }
    ]
  },
  'favicon-generator': {
    practical_application: "Modern web applications require a complex array of favicon sizes to support Apple Touch Icons, Android Chrome manifests, and Windows Metro tiles. A missing `apple-touch-icon` results in ugly bookmarks on iOS. Pre-generating the exact SVG and PNG dimensions ensures your brand remains sharp across all operating systems.",
    code_blueprints: [
      {
        language: "html",
        title: "Next.js/React Meta Tags",
        code: "<link rel=\"icon\" href=\"/favicon.ico\" sizes=\"any\" />\n<link rel=\"icon\" href=\"/icon.svg\" type=\"image/svg+xml\" />\n<link rel=\"apple-touch-icon\" href=\"/apple-touch-icon.png\" />\n<link rel=\"manifest\" href=\"/manifest.webmanifest\" />"
      }
    ]
  },
  'php-serializer': {
    practical_application: "Legacy PHP applications (like older WordPress plugins or Magento instances) store complex arrays in MySQL using PHP's native `serialize()` function. To migrate this data to a modern Node.js or Python backend, engineers must safely deserialize these strings into JSON without executing arbitrary code injections.",
    code_blueprints: [
      {
        language: "php",
        title: "PHP Safe Deserialization",
        code: "// NEVER use unserialize() on untrusted user input due to object injection vulnerabilities.\n// Convert legacy data to JSON format instead.\n$legacyData = 'a:2:{s:4:\"name\";s:3:\"Abu\";s:4:\"role\";s:5:\"admin\";}';\n$array = unserialize($legacyData, ['allowed_classes' => false]);\n$json = json_encode($array);\n// Output: {\"name\":\"Abu\",\"role\":\"admin\"}"
      }
    ]
  },
  'image-resizer': {
    practical_application: "Serving raw, unoptimized 5MB images from an S3 bucket destroys mobile page load speeds and penalizes Google Lighthouse scores. Automatically resizing images to viewport-specific dimensions and compressing them via WebP or AVIF formats guarantees maximum network efficiency and visual quality.",
    code_blueprints: [
      {
        language: "html",
        title: "Responsive HTML Picture Element",
        code: "<picture>\n  <source srcset=\"hero-desktop.webp\" media=\"(min-width: 1024px)\">\n  <source srcset=\"hero-tablet.webp\" media=\"(min-width: 768px)\">\n  <img src=\"hero-mobile.jpg\" alt=\"Optimized Hero\" loading=\"lazy\" width=\"800\" height=\"600\">\n</picture>"
      }
    ]
  },
  'bcrypt-hasher': {
    practical_application: "Bcrypt is the industry standard for password storage because its 'work factor' intentionally slows down brute-force attacks. When migrating user databases or manually verifying compromised accounts, a standalone Bcrypt tool allows security teams to validate hashes without exposing raw credentials to a live environment.",
    code_blueprints: [
      {
        language: "python",
        title: "Python Passlib Bcrypt",
        code: "from passlib.hash import bcrypt\n\n# Generate hash with cost factor 12\npassword_hash = bcrypt.using(rounds=12).hash('super_secret_password')\n\n# Verify\nis_valid = bcrypt.verify('super_secret_password', password_hash)\nprint('Verified:', is_valid)"
      }
    ]
  },
  'argon2-hasher': {
    practical_application: "Argon2 is the winner of the Password Hashing Competition (PHC) and is superior to Bcrypt because it provides memory-hard resistance against GPU and ASIC cracking rigs. Argon2id is the recommended variant for web applications, offering robust defense against both side-channel and brute-force attacks.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Node.js Argon2 Authentication",
        code: "const argon2 = require('argon2');\n\nasync function securePassword(password) {\n  try {\n    return await argon2.hash(password, {\n      type: argon2.argon2id,\n      memoryCost: 2 ** 16,\n      timeCost: 3,\n      parallelism: 1\n    });\n  } catch (err) {\n    console.error('Hashing failed', err);\n  }\n}"
      }
    ]
  },
  'aes-encryption': {
    practical_application: "AES (Advanced Encryption Standard) is a symmetric-key algorithm approved by the NSA for top-secret information. AES-GCM provides both confidentiality and authenticated data integrity. Engineers use AES to encrypt database columns containing PII (Personally Identifiable Information) or sensitive OAuth tokens at rest.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Node.js AES-256-GCM",
        code: "const crypto = require('crypto');\n\nfunction encryptSymmetric(text, key) {\n  const iv = crypto.randomBytes(12);\n  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);\n  let encrypted = cipher.update(text, 'utf8', 'hex');\n  encrypted += cipher.final('hex');\n  const authTag = cipher.getAuthTag().toString('hex');\n  return { encrypted, iv: iv.toString('hex'), authTag };\n}"
      }
    ]
  },
  'rsa-key-gen': {
    practical_application: "RSA asymmetric encryption relies on a public and private key pair. It is the backbone of SSL/TLS certificates, SSH authentication, and JWT signing verification. Generating secure 2048-bit or 4096-bit RSA keys locally ensures the private key never traverses an insecure network before deployment.",
    code_blueprints: [
      {
        language: "bash",
        title: "OpenSSL RSA Generation",
        code: "# Generate a 4096-bit RSA Private Key\nopenssl genrsa -out private.pem 4096\n\n# Extract the corresponding Public Key\nopenssl rsa -in private.pem -outform PEM -pubout -out public.pem"
      }
    ]
  },
  'xss-scanner': {
    practical_application: "Cross-Site Scripting (XSS) allows attackers to inject malicious scripts into trusted websites, often stealing session cookies or bypassing CSRF protections. Scanning raw HTML or user input for unescaped `<script>` tags and `javascript:` URIs is a mandatory defense-in-depth practice for any web application accepting rich text.",
    code_blueprints: [
      {
        language: "javascript",
        title: "DOMPurify React Hook",
        code: "import DOMPurify from 'dompurify';\n\nfunction SafeHtmlRenderer({ dirtyHtml }) {\n  // Aggressively strips XSS vectors while keeping safe markup\n  const cleanHtml = DOMPurify.sanitize(dirtyHtml, {\n    USE_PROFILES: { html: true }\n  });\n  \n  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;\n}"
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
  console.log('Successfully injected Batch 5 semantic depth.');
} else {
  console.log('No tools were modified.');
}
