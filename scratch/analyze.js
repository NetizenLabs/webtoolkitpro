const fs = require('fs');

const content = fs.readFileSync('.next/analyze/client.html', 'utf8');
const match = content.match(/window\.chartData = (\[.*?\]);/s);
if (match) {
  const data = JSON.parse(match[1]);
  const root = data[0];
  
  function getLargest(node, limit=10) {
    let list = [];
    if (node.groups) {
      node.groups.forEach(g => list.push(...getLargest(g, limit)));
    } else {
      list.push({ label: node.label, path: node.path, size: node.statSize });
    }
    return list;
  }
  
  const allModules = getLargest(root);
  allModules.sort((a, b) => b.size - a.size);
  console.log("Top 20 largest modules in client bundle:");
  allModules.slice(0, 20).forEach(m => console.log(`${m.size} bytes - ${m.path || m.label}`));
}
