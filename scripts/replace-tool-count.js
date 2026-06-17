const fs = require('fs');
const path = require('path');

const NEW_COUNT = "150+";
const OLD_COUNTS = [/150\+/g, /190\+/g];

const filesToUpdate = [
  'app/page.tsx',
  'app/layout.tsx',
  'app/about/page.tsx',
  'public/manifest.json',
  'public/llms.txt',
  'scripts/build-extension.js',
  'README.md',
  'MEDIUM_GEO_GUIDE.md',
  'components/sections/JsonMiniDemo.tsx',
];

const basePath = path.join(__dirname, '..');

for (const file of filesToUpdate) {
  const filePath = path.join(basePath, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    // specifically handle the JsonMiniDemo case: "tools":150
    if (file === 'components/sections/JsonMiniDemo.tsx') {
      if (content.includes('"tools":150')) {
        content = content.replace('"tools":150', '"tools":135');
        changed = true;
      }
    } else if (file === 'app/about/page.tsx') {
      if (content.includes('suite of over 150 utilities')) {
        content = content.replace('suite of over 150 utilities', 'suite of over 130 utilities');
        changed = true;
      }
    }

    for (const old of OLD_COUNTS) {
      if (old.test(content)) {
        content = content.replace(old, NEW_COUNT);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated tool count in:', file);
    }
  }
}
