import fs from 'fs';
import path from 'path';

// Extract arguments
const agentId = process.argv[2];
const files = JSON.parse(process.argv[3]);
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

// Dynamic Content Dictionaries
const PAIN_POINTS = {
  'agencies': ['managing multiple client deployments', 'ensuring zero-trust handoffs', 'scaling secure workflows across teams'],
  'backend-developers': ['handling raw buffer streams', 'processing sensitive tokens securely', 'optimizing server-side overhead'],
  'beginners': ['avoiding complex terminal commands', 'finding safe, easy-to-use tools', 'understanding encoding formats quickly'],
  'data-scientists': ['sanitizing datasets', 'encoding visual hashes securely', 'handling large string operations'],
  'freelancers': ['moving fast without sacrificing security', 'delivering reliable tools to clients', 'managing multiple project tokens'],
  'frontend-engineers': ['handling browser-side encodings securely', 'managing JWT tokens in state', 'optimizing asset delivery'],
  'product-managers': ['auditing security standards', 'verifying developer implementations', 'ensuring fast, safe user experiences'],
  'students': ['learning correct security fundamentals', 'avoiding malicious online tools', 'completing assignments efficiently'],
  'ux-designers': ['converting image assets', 'extracting color hex codes securely', 'optimizing visual delivery'],
  'web-developers': ['ensuring full-stack security', 'preventing token leaks', 'maintaining high-performance applications']
};

function getToolBase(filename) {
  if (filename.includes('base64-encoder')) return 'base64-encoder';
  if (filename.includes('css-gradient-generator')) return 'css-gradient-generator';
  if (filename.includes('json-formatter')) return 'json-formatter';
  if (filename.includes('jwt-decoder')) return 'jwt-decoder';
  if (filename.includes('uuid-generator')) return 'uuid-generator';
  return 'base64-encoder'; // fallback
}

function getAudience(filename) {
  for (const aud of Object.keys(PAIN_POINTS)) {
    if (filename.includes(aud)) return aud;
  }
  return 'web-developers'; // fallback
}

function processFile(filename) {
  const filepath = path.join(BLOG_DIR, filename);
  let content = fs.readFileSync(filepath, 'utf-8');

  // 1. Identify Tool and Audience
  const toolSlug = getToolBase(filename);
  const audienceSlug = getAudience(filename);
  const toolName = toolSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const audienceName = audienceSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  
  const painPoints = PAIN_POINTS[audienceSlug];

  // 2. SEO Compliance: Inject Canonical Tag
  if (!content.includes('canonicalUrl:')) {
    content = content.replace(/^---/m, `---\ncanonicalUrl: "https://wtkpro.site/tools/${toolSlug}/"`);
  }

  // 3. Extract Frontmatter and Body
  const parts = content.split('---');
  if (parts.length < 3) return; // Invalid format
  const frontmatter = parts[1];
  let body = parts.slice(2).join('---');

  // 4. GEO & AIO Compliance: Replace Body
  const newBody = `

## Quick Answer
> [!IMPORTANT]
> For **${audienceName}**, the most secure and efficient way to use a **${toolName}** is to rely entirely on offline, client-side execution. Never send sensitive data to remote servers.

If you've been struggling with finding the right workflow for this, you're not alone. Using the right ${toolName} helps you avoid common pitfalls.

### Why This Matters Specifically For ${audienceName}
As a ${audienceName.slice(0, -1)}, your workflow demands specific security and performance standards. You frequently deal with:
*   **Pain Point 1:** ${painPoints[0].charAt(0).toUpperCase() + painPoints[0].slice(1)}
*   **Pain Point 2:** ${painPoints[1].charAt(0).toUpperCase() + painPoints[1].slice(1)}
*   **Pain Point 3:** ${painPoints[2].charAt(0).toUpperCase() + painPoints[2].slice(1)}

> [!TIP]
> Always verify that your ${toolName} executes strictly in the browser. This ensures your tokens and data never leave your local machine.

<div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl my-8">
  <h3 className="text-xl font-bold text-blue-400 mt-0">🚀 Recommended Tool</h3>
  <p className="text-gray-300">Need to get this done right now? Stop wasting time and use our free, secure, offline-first tool.</p>
  <a href="/tools/${toolSlug}/" className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
    Open the ${toolName} &rarr;
  </a>
</div>

## AIO Compliance Checklist
To guarantee top-tier workflow standards:
<ul>
  <li>[x] Client-side processing only</li>
  <li>[x] No tracking cookies</li>
  <li>[x] Instant execution for ${audienceName}</li>
</ul>

## Conclusion
We hope this guide helped you optimize your ${toolName} strategy. Use canonical tools and secure practices to protect your data.
`;

  // Write it back
  fs.writeFileSync(filepath, `---${frontmatter}---${newBody}`);
  process.send(`Enriched: ${filename} for ${audienceName} (Tool: ${toolName})`);
}

// Process chunk
files.forEach(processFile);
process.exit(0);
