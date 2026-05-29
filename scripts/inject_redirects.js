const fs = require('fs');
const path = require('path');

const NEXT_CONFIG_PATH = path.join(__dirname, '../next.config.js');
let configContent = fs.readFileSync(NEXT_CONFIG_PATH, 'utf-8');

// I will execute the generator script directly here to get the output string.
const { execSync } = require('child_process');
const output = execSync('node scripts/audit_blog_content.js').toString();

// Extract the redirects block between the markers
const marker = '--- COPY AND PASTE THIS INTO next.config.js redirects() ---';
const endMarker = '======================================================';
let redirectsBlock = output.split(marker)[1].split(endMarker)[0].trim();

// Add a comment header
redirectsBlock = `      // SEO Audit 2026: Merged Thin Content Redirects\n` + redirectsBlock + '\n';

// Find the spot to inject. Let's put it right before "has: [{ type: 'host', value: 'www.wtkpro.site' }]"
const injectionPoint = "      {\n        source: '/:path*',\n        has: [{ type: 'host', value: 'www.wtkpro.site' }],";

if (configContent.includes(injectionPoint)) {
  configContent = configContent.replace(injectionPoint, redirectsBlock + '\n' + injectionPoint);
  fs.writeFileSync(NEXT_CONFIG_PATH, configContent, 'utf-8');
  console.log('Successfully injected redirects into next.config.js');
} else {
  console.log('Could not find injection point in next.config.js');
}
