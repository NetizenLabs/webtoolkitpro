const fs = require('fs');
const content = fs.readFileSync('lib/tool-registry.tsx', 'utf8');

const lines = content.split('\n');
const obj = {};

for (const line of lines) {
  // skip comments and empty lines
  if (line.trim().startsWith('//') || !line.trim()) continue;
  
  // match 'slug': 'Component',
  const match = line.match(/'([^']+)':\s*'([^']+)'/);
  if (match) {
    obj[match[1]] = match[2];
  }
}

fs.writeFileSync('lib/tool-registry.json', JSON.stringify(obj, null, 2));
console.log('Created tool-registry.json with', Object.keys(obj).length, 'keys');
