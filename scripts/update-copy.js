const fs = require('fs');
const path = require('path');

function replaceInFile(filePath, searchRegex, replacement) {
  const fullPath = path.join(__dirname, '..', filePath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(searchRegex, replacement);
    fs.writeFileSync(fullPath, content, 'utf8');
  }
}

// 1. Footer UUID link
replaceInFile('components/ui/Footer.tsx', /\/tools\/uuid-v7-generator\//g, '/tools/bulk-uuid-v4-v7-generator/');
replaceInFile('components/ui/Footer.tsx', /UUID v7 Generator/g, 'Bulk UUID Generator');

// 2. Related Tools Map UUID link
replaceInFile('lib/related-tools-map.ts', /\/tools\/uuid-v7-generator\//g, '/tools/bulk-uuid-v4-v7-generator/');
replaceInFile('lib/related-tools-map.ts', /'uuid-v7-generator':/g, "'bulk-uuid-v4-v7-generator':");
replaceInFile('lib/related-tools-map.ts', /UUID v7 Generator/g, 'Bulk UUID Generator');

// 3. Homepage Meta Description
const oldDesc = /Fast online utilities for JSON formatting, XML beautification, and technical SEO\./g;
const newDesc = 'Offline-first utilities for bulk UUID generation, secure local data conversion, and technical SEO.';

replaceInFile('app/layout.tsx', oldDesc, newDesc);
replaceInFile('app/page.tsx', oldDesc, newDesc);

// 4. Update 150+ to 190+
const filesWith150 = [
  'app/about/page.tsx',
  'app/author/page.tsx',
  'app/brand/page.tsx',
  'app/layout.tsx',
  'app/llms.txt/route.ts',
  'app/manifest.ts',
  'app/page.tsx',
  'app/tools/page.tsx',
  'components/sections/JsonMiniDemo.tsx',
  'components/sections/StatsDashboard.tsx',
  'components/tools/instances/LlmsTxtGenerator.tsx',
  'components/tools/instances/SnippetPreview.tsx',
  'components/ui/CommandBar.tsx'
];

filesWith150.forEach(f => {
  replaceInFile(f, /150\+/g, '190+');
  // Handle the numericTarget in StatsDashboard
  replaceInFile(f, /numericTarget: 150/g, 'numericTarget: 190');
});

console.log('Replacements completed.');
