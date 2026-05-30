const fs = require('fs');
const path = require('path');

// --- Update next.config.js ---
const nextConfigPath = path.join(__dirname, '..', 'next.config.js');
let nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');

const newRedirects = `
      // Wave 2 Consolidation
      { source: '/tools/schema-generator', destination: '/tools/schema-markup-generator/', permanent: true },
      { source: '/tools/schema-validator', destination: '/tools/schema-markup-generator/', permanent: true },
      { source: '/tools/schema-validator-pro', destination: '/tools/schema-markup-generator/', permanent: true },
      { source: '/tools/breadcrumb-schema', destination: '/tools/schema-markup-generator/', permanent: true },
      { source: '/tools/breadcrumb-schema-gen', destination: '/tools/schema-markup-generator/', permanent: true },
      { source: '/tools/qr-code-gen', destination: '/tools/qr-code-generator/', permanent: true },
      { source: '/tools/sql-formatter', destination: '/tools/sql-toolkit/', permanent: true },
      { source: '/tools/sql-minifier', destination: '/tools/sql-toolkit/', permanent: true },
      { source: '/tools/sql-injection-tester', destination: '/tools/sql-toolkit/', permanent: true },
      { source: '/tools/sql-sanitizer', destination: '/tools/sql-toolkit/', permanent: true },
      { source: '/tools/sql-injection-sanitizer', destination: '/tools/sql-toolkit/', permanent: true },
      { source: '/tools/markdown-to-html', destination: '/tools/markdown-html-converter/', permanent: true },
      { source: '/tools/markdown-converter', destination: '/tools/markdown-html-converter/', permanent: true },
      { source: '/tools/markdown-previewer', destination: '/tools/markdown-html-converter/', permanent: true },
      // Collapse known chain
      { source: '/tools/json-to-markdown', destination: '/tools/markdown-html-converter/', permanent: true },
      { source: '/tools/json-to-markdown/', destination: '/tools/markdown-html-converter/', permanent: true },
`;

if (!nextConfigContent.includes('Wave 2 Consolidation')) {
  nextConfigContent = nextConfigContent.replace('// Tools Consolidation Redirects', newRedirects + '      // Tools Consolidation Redirects');
  // Clean up the old json-to-markdown redirect to prevent the chain
  nextConfigContent = nextConfigContent.replace(
      /\{\s*source:\s*'\/tools\/json-to-markdown',\s*destination:\s*'\/tools\/markdown-converter\/',\s*permanent:\s*true,?\s*\},?/g,
      ''
  );
  nextConfigContent = nextConfigContent.replace(
      /\{\s*source:\s*'\/tools\/json-to-markdown\/',\s*destination:\s*'\/tools\/markdown-converter\/',\s*permanent:\s*true,?\s*\},?/g,
      ''
  );
  fs.writeFileSync(nextConfigPath, nextConfigContent, 'utf8');
}

// --- Update lib/tool-registry.tsx ---
const registryPath = path.join(__dirname, '..', 'lib', 'tool-registry.tsx');
let registryContent = fs.readFileSync(registryPath, 'utf8');

const obsoleteKeys = [
  'schema-generator', 'schema-validator', 'schema-validator-pro', 'breadcrumb-schema', 'breadcrumb-schema-gen',
  'qr-code-gen',
  'sql-formatter', 'sql-minifier', 'sql-injection-tester', 'sql-sanitizer', 'sql-injection-sanitizer',
  'markdown-to-html', 'markdown-converter', 'markdown-previewer',
  // And the hidden ones mapped to deleted components
  'faq-schema', 'local-business-schema', 'review-schema'
];



// Real regex for obsolete keys
const lines = registryContent.split('\n');
const newLines = lines.filter(line => {
  for (const key of obsoleteKeys) {
    if (line.includes("'" + key + "': dynamic(")) return false;
  }
  return true;
});

let updatedRegistry = newLines.join('\n');

const newComponents = `
  // Wave 2 Consolidated Masters
  'schema-markup-generator': dynamic(() => import('../components/tools/instances/SchemaMarkupGenerator'), { ssr: false }),
  'sql-toolkit': dynamic(() => import('../components/tools/instances/SqlToolkit'), { ssr: false }),
  'markdown-html-converter': dynamic(() => import('../components/tools/instances/MarkdownHtmlConverter'), { ssr: false }),
`;

if (!updatedRegistry.includes('schema-markup-generator')) {
  updatedRegistry = updatedRegistry.replace('// Batch 1: Core Utilities', newComponents + '\n  // Batch 1: Core Utilities');
}

fs.writeFileSync(registryPath, updatedRegistry, 'utf8');

console.log('Wave 2 redirects and registry applied successfully.');
