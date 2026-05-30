const fs = require('fs');
const path = require('path');

const registryPath = path.join(__dirname, '..', 'lib', 'tool-registry.tsx');
let content = fs.readFileSync(registryPath, 'utf8');

const obsoleteKeys = [
  'css-minifier', 'css-formatter', 'css-shadow-gen', 'css-keyframes', 'css-gradient-generator',
  'header-inspector', 'cache-header-gen',
  'robots-generator', 'robots-validator', 'robots-txt-templates',
  'hex-to-rgb', 'rgba-to-hex', 'color-picker',
  'px-to-rem', 'rem-to-px',
  'browser-compat', 'authority-simulation',
  'core-web-vitals-guide', 'seo-audit-checklist'
];

const lines = content.split(/\r?\n/);
const newLines = lines.filter(line => {
  for (const key of obsoleteKeys) {
    if (line.includes("'" + key + "': dynamic(")) {
      return false;
    }
  }
  return true;
});

let updated = newLines.join('\n');

const newComponents = `
  // Wave 4 Consolidated Masters
  'css-formatter-minifier': dynamic(() => import('../components/tools/instances/CssFormatterMinifier'), { ssr: false }),
  'css-generators': dynamic(() => import('../components/tools/instances/CssGenerators'), { ssr: false }),
  'robots-txt-toolkit': dynamic(() => import('../components/tools/instances/RobotsTxtToolkit'), { ssr: false }),
  'color-converter': dynamic(() => import('../components/tools/instances/ColorConverter'), { ssr: false }),
  'px-rem-converter': dynamic(() => import('../components/tools/instances/PxRemConverter'), { ssr: false }),
`;

if (!updated.includes('css-formatter-minifier')) {
  updated = updated.replace('// Batch 1: Core Utilities', newComponents + '\n  // Batch 1: Core Utilities');
}

fs.writeFileSync(registryPath, updated, 'utf8');
console.log('Registry updated successfully.');
