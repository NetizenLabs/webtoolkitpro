const fs = require('fs');
const yaml = require('js-yaml'); 

const yamlFile = 'config/tools.yaml';
const fileContent = fs.readFileSync(yamlFile, 'utf8');

const parsed = yaml.load(fileContent);

const enhancements = {
  'ua-parser': {
    practical_application: "Parsing User-Agent strings is critical for conditional logic on the edge (e.g., serving WebP images only to supported browsers) and generating analytics telemetry. Since User-Agents are notoriously unreliable and frequently spoofed, relying on a strict parser ensures your server gracefully handles malicious requests or legacy web crawlers.",
    code_blueprints: [
      {
        language: "javascript",
        title: "UAParser.js Integration",
        code: "const UAParser = require('ua-parser-js');\n\nfunction isLegacyBrowser(userAgentString) {\n  const parser = new UAParser(userAgentString);\n  const browser = parser.getBrowser();\n  \n  return browser.name === 'IE' || (browser.name === 'Safari' && parseInt(browser.version) < 12);\n}"
      }
    ]
  },
  'js-execution-audit': {
    practical_application: "Heavy JavaScript execution is the leading cause of poor Interaction to Next Paint (INP) and Total Blocking Time (TBT). Auditing execution chains helps pinpoint long tasks (>50ms) occupying the main thread. Deferring non-critical scripts ensures that user inputs (like clicks) are processed instantly.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Main Thread Yielding",
        code: "// Yield to main thread to prevent UI freezing during heavy loops\nfunction yieldToMain() {\n  return new Promise(resolve => setTimeout(resolve, 0));\n}\n\nasync function processHeavyTask(items) {\n  for (let i = 0; i < items.length; i++) {\n    performComputation(items[i]);\n    if (i % 100 === 0) await yieldToMain();\n  }\n}"
      }
    ]
  },
  'resource-priority': {
    practical_application: "The browser's default download priority isn't always optimal. By explicitly injecting `<link rel=\"preload\">` for critical Above-The-Fold LCP (Largest Contentful Paint) images and `<link rel=\"preconnect\">` for third-party API origins, you manipulate the network waterfall, slashing page load times by up to 40%.",
    code_blueprints: [
      {
        language: "html",
        title: "HTML Preload Tags",
        code: "<head>\n  <!-- Connect to API early -->\n  <link rel=\"preconnect\" href=\"https://api.wtkpro.site\" crossorigin>\n  <!-- Preload hero image for LCP -->\n  <link rel=\"preload\" href=\"/hero.webp\" as=\"image\" type=\"image/webp\">\n</head>"
      }
    ]
  },
  'network-throttling': {
    practical_application: "Testing Web Apps on gigabit fiber optic connections creates a false sense of security. Network throttling simulates 3G/4G connections and packet loss, revealing race conditions in data fetching logic and proving the necessity of loading skeletons. This guarantees the app functions flawlessly in poor-reception mobile environments.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Playwright Network Emulation",
        code: "import { test } from '@playwright/test';\n\ntest('Load on Slow 3G', async ({ page }) => {\n  const client = await page.context().newCDPSession(page);\n  await client.send('Network.emulateNetworkConditions', {\n    offline: false,\n    downloadThroughput: 400 * 1024 / 8, // 400 kbps\n    uploadThroughput: 400 * 1024 / 8,\n    latency: 400\n  });\n  await page.goto('https://wtkpro.site');\n});"
      }
    ]
  },
  'hsts-gen': {
    practical_application: "HTTP Strict Transport Security (HSTS) prevents Man-in-the-Middle (MitM) attacks like SSL Stripping. By generating and deploying an HSTS header, you legally force the browser to establish HTTPS connections for a specified duration (`max-age`), ensuring users cannot be tricked into submitting passwords over an unencrypted HTTP link.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Next.js HSTS Security Header",
        code: "module.exports = {\n  async headers() {\n    return [\n      {\n        source: '/(.*)',\n        headers: [\n          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' }\n        ]\n      }\n    ]\n  }\n}"
      }
    ]
  },
  'csp-builder': {
    practical_application: "A strict Content Security Policy (CSP) is the ultimate defense mechanism against Cross-Site Scripting (XSS) and data injection attacks. It explicitly whitelists which domains are permitted to execute scripts, load images, or open websockets on your site, blocking unauthorized rogue payloads immediately.",
    code_blueprints: [
      {
        language: "html",
        title: "Strict CSP Header Syntax",
        code: "<!-- Disallow inline scripts, only allow assets from self and trusted CDN -->\n<meta http-equiv=\"Content-Security-Policy\" \n      content=\"default-src 'self'; script-src 'self' https://trusted-cdn.com; style-src 'self' 'unsafe-inline';\">\n"
      }
    ]
  },
  'sri-hasher': {
    practical_application: "Subresource Integrity (SRI) guarantees that third-party CDN scripts (like React or jQuery) haven't been compromised by a supply-chain attack. By providing a base64-encoded cryptographic hash of the expected file, the browser will refuse to execute the script if the CDN delivers a modified or malicious version.",
    code_blueprints: [
      {
        language: "html",
        title: "HTML Script Tag with SRI",
        code: "<!-- The browser verifies the integrity hash before executing the script -->\n<script \n  src=\"https://code.jquery.com/jquery-3.6.0.min.js\" \n  integrity=\"sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=\" \n  crossorigin=\"anonymous\">\n</script>"
      }
    ]
  },
  'permissions-policy': {
    practical_application: "The Permissions Policy (formerly Feature Policy) explicitly defines which browser features (Camera, Microphone, Geolocation, WebUSB) are allowed to be used by your application or third-party iframes. This locks down privacy vulnerabilities, ensuring an embedded YouTube video or ad cannot silently access the user's camera.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Express.js Permissions Header",
        code: "const express = require('express');\nconst app = express();\n\napp.use((req, res, next) => {\n  // Deny all access to camera, microphone, and geolocation\n  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');\n  next();\n});"
      }
    ]
  },
  'dns-propagation': {
    practical_application: "When migrating web servers or updating email routing (MX records), DNS changes take time to propagate across global ISP caches. Testing propagation across diverse geographic regions ensures that all global users resolve your new IP address correctly, preventing split-brain routing and lost customer emails.",
    code_blueprints: [
      {
        language: "bash",
        title: "Dig CLI Command",
        code: "# Query the A record against Google's public DNS (8.8.8.8)\ndig A wtkpro.site @8.8.8.8 +short\n\n# Check MX records for email routing\ndig MX wtkpro.site +short"
      }
    ]
  },
  'ping-test': {
    practical_application: "A ping test utilizes ICMP Echo Request packets to verify network-level connectivity and measure packet loss. For DevOps engineers, it is the first step in the triage process during an outage. If the server responds to ping but HTTP is failing, the issue is at the application layer, not the network layer.",
    code_blueprints: [
      {
        language: "bash",
        title: "Linux Ping Command",
        code: "# Send 4 ICMP packets to the target domain\nping -c 4 wtkpro.site\n\n# Continuous ping to monitor network stability\nping 1.1.1.1"
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
  console.log('Successfully injected Batch 7 semantic depth.');
} else {
  console.log('No tools were modified.');
}
