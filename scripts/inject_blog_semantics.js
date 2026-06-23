const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog');

const files = fs.readdirSync(BLOG_DIR).filter(f => f.startsWith('why-every-'));

// Knowledge Base for Semantic Injection
const personaKnowledge = {
  'agencies': {
    focus: "Client delivery and scalable workflows",
    tip1: "Standardize your team's tooling to prevent costly onboarding delays.",
    tip2: "Use offline-first tools to guarantee client NDAs and data privacy are never breached.",
    tldrPrefix: "For fast-paced agencies, relying on a secure, offline"
  },
  'backend-developers': {
    focus: "Server optimization and secure data handling",
    tip1: "Always verify that your tools process data client-side to prevent accidental token leakage.",
    tip2: "Integrate native libraries (like Buffer in Node.js) in production, but use UI tools for rapid debugging.",
    tldrPrefix: "For backend developers handling sensitive production data, a reliable"
  },
  'beginners': {
    focus: "Learning fundamentals and debugging easily",
    tip1: "Don't just copy-paste; use tools that explain the formatting errors so you learn the syntax.",
    tip2: "Bookmark offline-capable tools so you can practice coding anywhere.",
    tldrPrefix: "For beginners learning the ropes, a straightforward"
  },
  'data-scientists': {
    focus: "Massive dataset processing and validation",
    tip1: "Ensure your tools can handle large payloads without crashing the browser tab.",
    tip2: "Use strictly formatted outputs to easily pipe data into Jupyter Notebooks or Pandas dataframes.",
    tldrPrefix: "For data scientists dealing with complex pipelines, a robust"
  },
  'freelancers': {
    focus: "Speed, efficiency, and context switching",
    tip1: "Use bookmarklets or PWA-installable tools to access utilities instantly during client meetings.",
    tip2: "Rely on tools that don't require account sign-ups to maintain a frictionless workflow.",
    tldrPrefix: "For freelancers juggling multiple client projects, a fast"
  },
  'frontend-engineers': {
    focus: "UI performance and DOM optimization",
    tip1: "Minify and validate your assets before deploying to avoid massive Cumulative Layout Shifts (CLS).",
    tip2: "Use tools that support modern web standards (like CSS Variable extraction or WebP conversion).",
    tldrPrefix: "For frontend engineers obsessed with Core Web Vitals, a native"
  },
  'product-managers': {
    focus: "QA testing and cross-team communication",
    tip1: "Use formatted, visual outputs to easily communicate bug reports to the engineering team.",
    tip2: "Validate JSON configs or JWTs yourself to unblock QA pipelines without waiting on developers.",
    tldrPrefix: "For product managers verifying feature payloads, a visual"
  },
  'students': {
    focus: "Free, accessible, educational utilities",
    tip1: "Use tools with dark mode to prevent eye strain during late-night study sessions.",
    tip2: "Look for tools that provide code blueprints to help you understand the underlying algorithms.",
    tldrPrefix: "For students building their first projects, a free"
  },
  'ux-designers': {
    focus: "Visual fidelity and design-system integration",
    tip1: "Copy outputs directly into Figma or Sketch without losing structural formatting.",
    tip2: "Ensure generated assets (like Gradients or SVGs) are optimized for accessibility (WCAG).",
    tldrPrefix: "For UX designers bridging the gap to development, an aesthetic"
  },
  'web-developers': {
    focus: "Full-stack agility and standard compliance",
    tip1: "Validate your data structures against RFC standards to ensure cross-browser compatibility.",
    tip2: "Keep your utility belt lightweight by using zero-dependency, browser-native tools.",
    tldrPrefix: "For full-stack web developers, an essential"
  }
};

const toolKnowledge = {
  'base64-encoder': {
    name: "Base64 Encoder",
    benefit: "prevents binary data corruption over text-based protocols.",
    q1: "Is Base64 encryption?",
    a1: "No. Base64 is merely an encoding scheme. It does not secure or encrypt data, it only translates binary into ASCII to prevent transmission errors.",
    q2: "Why use Base64 for images?",
    a2: "Inlining small images as Base64 in CSS or HTML reduces the number of HTTP requests, slightly improving initial page load times for critical assets."
  },
  'css-gradient-generator': {
    name: "CSS Gradient Generator",
    benefit: "allows you to design complex, multi-stop gradients without writing tedious CSS syntax.",
    q1: "Do gradients affect performance?",
    a1: "CSS gradients are rendered by the browser's graphics engine, making them significantly faster and lighter than downloading a massive background image.",
    q2: "What is a color stop?",
    a2: "A color stop defines the exact position (in percentages) where a specific color reaches its full opacity before blending into the next color."
  },
  'json-formatter': {
    name: "JSON Formatter",
    benefit: "instantly formats collapsed, unreadable JSON strings into structured, hierarchical trees.",
    q1: "Why does my JSON parsing fail?",
    a1: "JSON requires strict double quotes around both keys and string values. Trailing commas at the end of arrays or objects will also cause parsing engines to throw an error.",
    q2: "Can I parse massive JSON files?",
    a2: "Yes, but browser-based formatters may crash if the JSON exceeds 50MB. For massive files, using a command-line tool like jq is recommended."
  },
  'jwt-decoder': {
    name: "JWT Decoder",
    benefit: "decrypts the base64-url encoded payload of a JSON Web Token so you can inspect session claims.",
    q1: "Can a JWT Decoder verify the signature?",
    a1: "A client-side decoder can only read the payload. To verify the cryptographic signature, you must provide the original secret key used to sign it.",
    q2: "Is it safe to paste JWTs online?",
    a2: "Only if the tool operates 100% offline in your browser. Pasting a production JWT into a server-side tool risks severe session hijacking."
  },
  'uuid-generator': {
    name: "UUID Generator",
    benefit: "generates cryptographically secure, universally unique identifiers to prevent database primary key collisions.",
    q1: "What is the difference between UUID v4 and v7?",
    a1: "UUID v4 is completely random. UUID v7 is time-ordered, meaning it sorts chronologically in databases, severely reducing B-Tree index fragmentation.",
    q2: "Can a UUID collide?",
    a2: "While mathematically possible, the probability is so infinitesimally small (1 in 2.71 quintillion) that it is practically impossible in any real-world scenario."
  }
};

let processedCount = 0;

files.forEach(filename => {
  // Extract persona and tool
  // e.g., why-every-agencies-needs-a-reliable-base64-encoder.md
  const match = filename.match(/^why-every-(.+)-needs-a-reliable-(.+)\.md$/);
  if (!match) return;

  const personaKey = match[1];
  const toolKey = match[2];

  const pData = personaKnowledge[personaKey];
  const tData = toolKnowledge[toolKey];

  if (!pData || !tData) return;

  const filePath = path.join(BLOG_DIR, filename);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  const parsed = matter(fileContent);

  // Inject TLDR
  parsed.data.tldr = `${pData.tldrPrefix} ${tData.name} ${tData.benefit}`;

  // Inject Expert Tips
  parsed.data.expertTips = [
    pData.tip1,
    pData.tip2,
    `Integrate this ${tData.name} into your daily workflow to eliminate repetitive debugging tasks.`
  ];

  // Inject FAQs
  parsed.data.faqs = [
    { q: tData.q1, a: tData.a1 },
    { q: tData.q2, a: tData.a2 },
    { q: `Why is this tool essential for ${personaKey.replace(/-/g, ' ')}?`, a: `Because it addresses the core requirement of ${pData.focus.toLowerCase()}, ensuring that your projects remain scalable and secure.` }
  ];

  // If this persona is highly technical, change category to Engineering so it triggers the JournalLayout
  if (['backend-developers', 'data-scientists', 'frontend-engineers', 'web-developers'].includes(personaKey)) {
    parsed.data.category = 'Engineering';
  } else if (['agencies', 'freelancers'].includes(personaKey)) {
    parsed.data.category = 'SEO';
  }

  // Write back
  const newFileContent = matter.stringify(parsed.content, parsed.data);
  fs.writeFileSync(filePath, newFileContent);
  processedCount++;
});

console.log(`Successfully injected semantic depth into ${processedCount} blog posts.`);
