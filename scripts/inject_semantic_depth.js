const fs = require('fs');
const yaml = require('js-yaml'); 

const yamlFile = 'config/tools.yaml';
const fileContent = fs.readFileSync(yamlFile, 'utf8');

// Parse the YAML
const parsed = yaml.load(fileContent);

const enhancements = {
  'px-rem-converter': {
    practical_application: "In modern frontend engineering, hardcoding pixel values across a sprawling React or Vue codebase creates massive technical debt, especially when auditing for WCAG (Web Content Accessibility Guidelines) compliance. If a visually impaired user increases their browser's default font size to 24px, any container or font locked at '16px' will fail to scale, breaking the layout and violating accessibility standards. By using this tool to standardize your design system into REM units, your entire CSS architecture becomes fluid—scaling proportionately with the user's root font preference without requiring complex media queries.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Tailwind CSS Configuration (tailwind.config.js)",
        code: `module.exports = {
  theme: {
    extend: {
      spacing: {
        // 18px converted to REM (assuming 16px root)
        '4.5': '1.125rem',
      },
      fontSize: {
        // 24px converted to REM
        'h2': '1.5rem', 
      }
    }
  }
}`
      },
      {
        language: "css",
        title: "Standard CSS Implementation",
        code: `html {
  /* Let the browser define the base size, typically 16px */
  font-size: 100%; 
}

.card-container {
  /* 32px padding converted to REM */
  padding: 2rem;
  /* 20px font size converted to REM */
  font-size: 1.25rem;
}`
      }
    ]
  },
  'color-converter': {
    practical_application: "Design teams heavily rely on Hexadecimal (HEX) color codes in Figma or Sketch because they are concise and easy to copy. However, when front-end engineers implement complex, modern UI patterns like 'Glassmorphism' or layered modal backdrops, standard HEX codes fall short because they lack an alpha channel for transparency. Converting these HEX values to RGBA is a strict requirement for creating dynamic hover states, subtle box-shadows, and overlay masks. This utility bridges the gap between static design files and dynamic CSS architectures, allowing engineers to quickly extract the exact decimal equivalents needed to inject opacity without relying on heavy CSS preprocessors.",
    code_blueprints: [
      {
        language: "css",
        title: "CSS Glassmorphism Implementation",
        code: `.modal-backdrop {
  /* Solid base HEX: #1E2D47 converted to RGBA with 50% opacity */
  background-color: rgba(30, 45, 71, 0.5);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.button-glow:hover {
  /* Solid base HEX: #00D4B4 converted to RGBA for a subtle glow */
  box-shadow: 0 0 15px rgba(0, 212, 180, 0.4);
}`
      }
    ]
  },
  'robots-txt-toolkit': {
    practical_application: "Misconfiguring a robots.txt file is one of the most catastrophic errors a DevOps or SEO engineer can make, potentially de-indexing an entire enterprise domain overnight. Furthermore, with the rapid rise of aggressive AI scraping bots (like GPTBot or ClaudeBot) consuming vast amounts of server bandwidth and proprietary data, granular crawler management is now a critical security operation. This offline generator provides engineers with a secure sandbox to construct, validate, and test complex regex-like path directives before deploying them to production, ensuring that sensitive admin directories remain hidden while public content is crawled efficiently.",
    code_blueprints: [
      {
        language: "txt",
        title: "Standard AI-Blocking robots.txt",
        code: `User-agent: *
Disallow: /admin/
Disallow: /private/
Disallow: /*?search=

# Block known AI scrapers from consuming data
User-agent: GPTBot
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

Sitemap: https://yourdomain.com/sitemap.xml`
      }
    ]
  },
  'css-generators': {
    practical_application: "Hand-coding complex CSS3 properties like multi-layered box-shadows or intricate linear gradients often results in mathematical errors, inconsistent rendering across different browsers, and hours of wasted trial and error. For UI engineers focused on rapid prototyping and building high-fidelity design systems, writing out vendor-prefixed CSS for a buttery-smooth animation keyframe is highly inefficient. This visual generator acts as a low-level compiler—translating your visual slider adjustments into heavily optimized, cross-browser compatible CSS blocks, dramatically accelerating the workflow from design mockup to production code.",
    code_blueprints: [
      {
        language: "css",
        title: "Smooth Layered Shadow Implementation",
        code: `.premium-card {
  /* A smooth, multi-layered shadow generated for natural elevation */
  box-shadow: 
    0 2px 4px rgba(0,0,0,0.02),
    0 4px 8px rgba(0,0,0,0.02),
    0 8px 16px rgba(0,0,0,0.04),
    0 16px 32px rgba(0,0,0,0.04),
    0 32px 64px rgba(0,0,0,0.06);
  
  border-radius: 16px;
  background: #ffffff;
}`
      }
    ]
  },
  'css-formatter-minifier': {
    practical_application: "In a production environment, serving raw, uncompressed CSS files is a severe performance anti-pattern. Every unnecessary space, line break, and comment in a stylesheet adds bytes to the network payload, delaying the First Contentful Paint (FCP) and hurting Core Web Vitals scores. Conversely, when debugging legacy projects or reverse-engineering a third-party module, engineers frequently encounter monolithic, minified CSS that is impossible to read. This dual-purpose utility allows DevOps and front-end teams to instantly minify code for deployment pipelines or beautify minified code back into a readable AST (Abstract Syntax Tree) structure for local debugging, without exposing proprietary code to external APIs.",
    code_blueprints: [
      {
        language: "bash",
        title: "NPM Script Integration Example",
        code: `# While this tool is great for manual operations, 
# here is how you might integrate minification into your build pipeline
npm install -g clean-css-cli

# Minify standard CSS for production deployment
cleancss -o public/styles.min.css src/styles.css`
      }
    ]
  },
  'jwt-decoder-generator': {
    practical_application: "JSON Web Tokens (JWT) are the standard bearer tokens for modern microservices and API authentication. However, a massive security vulnerability occurs when developers use generic, online JWT decoders to inspect their tokens. Pasting a valid production JWT into a third-party website effectively transmits your live session credentials—and potentially sensitive PII (Personally Identifiable Information) contained in the payload—to an unknown server. This 100% offline decoder ensures your zero-trust architecture remains intact. It unpacks the Base64URL encoding locally in your browser's memory, allowing you to debug expiration claims and scope configurations without risking a catastrophic credential leak.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Node.js JWT Verification Example",
        code: `const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) return res.status(401).send('Access Denied');

  try {
    // Verify the signature against your private secret
    const verifiedPayload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifiedPayload;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}`
      }
    ]
  },
  'text-case-formatter': {
    practical_application: "Data normalization is a persistent headache for backend engineers and database administrators. When migrating legacy databases, importing massive CSV files from third-party vendors, or processing raw user input, string formats are almost always inconsistent. A single stray whitespace or a mismatch between 'camelCase' and 'snake_case' can crash an entire ETL (Extract, Transform, Load) pipeline or cause severe SQL query failures. This local formatting matrix provides a high-speed sandbox to instantly normalize massive text arrays, strip hidden unicode spaces, and deduplicate records before they touch your production database schemas.",
    code_blueprints: [
      {
        language: "javascript",
        title: "JavaScript String Normalization Utility",
        code: `// A programmatic approach to converting text to snake_case for database insertion
function toDatabaseSnakeCase(str) {
  return str
    .replace(/\W+/g, " ") // Remove special chars
    .split(/ |\B(?=[A-Z])/) // Split by space or camelCase
    .map(word => word.toLowerCase())
    .join('_');
}

console.log(toDatabaseSnakeCase("UserAccount Details!")); 
// Output: user_account_details`
      }
    ]
  },
  'base64-encoder-decoder': {
    practical_application: "Base64 encoding is an indispensable protocol for transmitting binary data across text-based network streams. For front-end architects optimizing web performance, embedding small vector graphics (SVGs) or placeholder images directly into a CSS file as a Base64 Data URI eliminates extra HTTP request round-trips, dramatically improving page load speeds. For security engineers, decoding intercepted API headers or webhook payloads safely is a daily task. By executing the FileReader API and Base64 conversion algorithms entirely client-side, this tool guarantees that your proprietary assets and sensitive data streams never leave your local environment.",
    code_blueprints: [
      {
        language: "css",
        title: "CSS Base64 Background Image",
        code: `.loading-spinner {
  width: 24px;
  height: 24px;
  /* Embedding the image directly prevents a separate HTTP request */
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz...');
  background-repeat: no-repeat;
}`
      },
      {
        language: "javascript",
        title: "Node.js Base64 Encoding",
        code: `// How to encode a string to Base64 in Node.js
const authString = 'username:password';
const encodedAuth = Buffer.from(authString).toString('base64');

console.log(\`Basic \${encodedAuth}\`);`
      }
    ]
  },
  'binary-hex-decimal-converter': {
    practical_application: "For systems programmers, embedded IoT engineers, and cybersecurity analysts, navigating between machine-level binary, memory-address hexadecimal, and human-readable decimal is a constant necessity. When analyzing a raw memory dump, interpreting a custom TCP/IP packet header, or writing low-level assembly instructions, standard calculators fall short. This real-time translation matrix utilizes JavaScript's BigInt architecture to instantly convert massive strings across multiple numerical bases simultaneously, allowing engineers to reverse-engineer data payloads without server latency or precision loss.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Bitwise Operations in JavaScript",
        code: `// Example of using hexadecimal for bitmasking
const FLAG_READ    = 0x01; // 0001
const FLAG_WRITE   = 0x02; // 0010
const FLAG_EXECUTE = 0x04; // 0100

// Combine flags using Bitwise OR
let userPermissions = FLAG_READ | FLAG_WRITE; // 0011 (Hex: 0x03)

// Check for a specific flag using Bitwise AND
const canWrite = (userPermissions & FLAG_WRITE) === FLAG_WRITE;
console.log(canWrite); // true`
      }
    ]
  },
  'json-formatter': {
    practical_application: "JSON is the undisputed lingua franca of modern web APIs, but reading a raw, 10,000-line unminified JSON payload from a server response is impossible for human eyes. Furthermore, when configuring cloud infrastructure using AWS CloudFormation or wrangling complex NoSQL database documents, a single missing comma or unescaped quote will crash the deployment. This offline JSON formatter acts as a secure, local IDE. It strictly validates syntax against the RFC 8259 specification and structures the data into a readable, collapsable tree, allowing engineers to debug API responses locally without uploading sensitive company data to a random web server.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Safe JSON Parsing with Error Handling",
        code: `// When fetching raw JSON from an API, always wrap parsing in a try/catch
// to prevent malformed responses from crashing your Node.js application.
async function fetchAndParseData(url) {
  try {
    const response = await fetch(url);
    const rawText = await response.text();
    
    // Safely parse the JSON
    const data = JSON.parse(rawText);
    return data;
  } catch (error) {
    console.error("Syntax Error: The API returned invalid JSON.", error.message);
    return null;
  }
}`
      }
    ]
  }
};

let modified = false;
for (const tool of parsed.tools) {
  if (enhancements[tool.slug]) {
    tool.content.practical_application = enhancements[tool.slug].practical_application;
    tool.content.code_blueprints = enhancements[tool.slug].code_blueprints;
    modified = true;
  }
}

if (modified) {
  fs.writeFileSync(yamlFile, yaml.dump(parsed));
  console.log('Successfully injected semantic depth into 10 tools.');
} else {
  console.log('No tools were modified.');
}
