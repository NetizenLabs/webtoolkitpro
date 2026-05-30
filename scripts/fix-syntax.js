const fs = require('fs');
const path = require('path');

const files = [
  'components/tools/instances/ColorConverter.tsx',
  'components/tools/instances/CssFormatterMinifier.tsx',
  'components/tools/instances/CssGenerators.tsx',
  'components/tools/instances/HttpHeadersInspector.tsx',
  'components/tools/instances/PxRemConverter.tsx',
  'components/tools/instances/RobotsTxtToolkit.tsx'
];

const basePath = path.join(__dirname, '..');

for (const file of files) {
  const filePath = path.join(basePath, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace \` with `
    content = content.replace(/\\`/g, '`');
    // Replace \$ with $
    content = content.replace(/\\\$/g, '$');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed syntax in:', file);
  }
}
