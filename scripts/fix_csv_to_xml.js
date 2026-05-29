const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const toolsYamlPath = path.join(__dirname, '../config/tools.yaml');
const nextConfigPath = path.join(__dirname, '../next.config.js');
const registryPath = path.join(__dirname, '../lib/tool-registry.tsx');

// 1. Remove from registry
let registryStr = fs.readFileSync(registryPath, 'utf8');
registryStr = registryStr.replace(/  'csv-to-xml': dynamic[^\n]+\n/, '');
fs.writeFileSync(registryPath, registryStr, 'utf8');

// 2. Remove from YAML
const doc = yaml.load(fs.readFileSync(toolsYamlPath, 'utf8'));
doc.tools = doc.tools.filter(t => t.slug !== 'csv-to-xml');
fs.writeFileSync(toolsYamlPath, yaml.dump(doc), 'utf8');

// 3. Add redirect
let nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');
if (!nextConfigContent.includes("source: '/tools/csv-to-xml'")) {
    nextConfigContent = nextConfigContent.replace('// Tools Consolidation Redirects\n', `// Tools Consolidation Redirects\n      { source: '/tools/csv-to-xml', destination: '/tools/data-converter', permanent: true },\n`);
    fs.writeFileSync(nextConfigPath, nextConfigContent, 'utf8');
}
console.log('Fixed csv-to-xml');
