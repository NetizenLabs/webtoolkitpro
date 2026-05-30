const fs = require('fs');
const path = require('path');

const registryPath = path.join(__dirname, '..', 'lib', 'tool-registry.tsx');
let content = fs.readFileSync(registryPath, 'utf8');

const lines = content.split(/\r?\n/);

const instancesPath = path.join(__dirname, '..', 'components', 'tools', 'instances');

const newLines = lines.filter(line => {
  const match = line.match(/import\(['"]\.\.\/components\/tools\/instances\/(.*?)['"]/);
  if (match) {
    const componentName = match[1];
    const componentPath = path.join(instancesPath, componentName + '.tsx');
    if (!fs.existsSync(componentPath)) {
      console.log('Removing dead import:', componentName);
      return false; // exclude line
    }
  }
  return true;
});

fs.writeFileSync(registryPath, newLines.join('\n'), 'utf8');
console.log('Cleaned dead imports successfully.');
