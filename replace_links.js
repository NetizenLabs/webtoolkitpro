const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walkDir(dirPath, callback);
    } else {
      if (f.endsWith('.tsx') || f.endsWith('.ts')) {
        callback(dirPath);
      }
    }
  });
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes("from 'next/link'") || content.includes('from "next/link"')) {
    content = content.replace(/import\s+Link\s+from\s+['"]next\/link['"];?/g, "import Link from '@/components/ui/NativeLink';");
    fs.writeFileSync(filePath, content);
    console.log('Updated:', filePath);
  }
}

const dirs = [
  path.join(__dirname, 'app'),
  path.join(__dirname, 'components')
];

dirs.forEach(dir => {
  if (fs.existsSync(dir)) walkDir(dir, processFile);
});
console.log('Done replacing Links');
