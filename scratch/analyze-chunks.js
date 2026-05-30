const fs = require('fs');
const path = require('path');

const clientHtmlPath = path.join(__dirname, '..', '.next', 'analyze', 'client.html');
if (!fs.existsSync(clientHtmlPath)) {
  console.log("Not ready yet...");
  process.exit(1);
}

const content = fs.readFileSync(clientHtmlPath, 'utf8');
const match = content.match(/window\.chartData = (\[.*?\]);/s);
if (match) {
  const data = JSON.parse(match[1]);
  
  function traverse(node, prefix = '') {
    if (node.groups) {
      if (node.label.endsWith('.js') && node.statSize > 200000) {
        console.log(`\n=== Chunk: ${node.label} (${(node.statSize/1024).toFixed(1)} KB) ===`);
        const sorted = [...node.groups].sort((a,b) => b.statSize - a.statSize);
        sorted.slice(0, 10).forEach(g => {
          console.log(`  - ${g.label}: ${(g.statSize/1024).toFixed(1)} KB`);
          if (g.groups) {
             const subSorted = [...g.groups].sort((a,b) => b.statSize - a.statSize);
             subSorted.slice(0, 3).forEach(sg => console.log(`      -> ${sg.label}: ${(sg.statSize/1024).toFixed(1)} KB`));
          }
        });
      } else {
        node.groups.forEach(g => traverse(g, prefix + '  '));
      }
    }
  }
  
  data.forEach(root => traverse(root));
} else {
  console.log("Could not find chartData in client.html");
}
