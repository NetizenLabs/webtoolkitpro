const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const toolsYamlPath = path.join(__dirname, '../config/tools.yaml');
const registryPath = path.join(__dirname, '../lib/tool-registry.json');

const fileContents = fs.readFileSync(toolsYamlPath, 'utf8');
const data = yaml.load(fileContents);
const rawTools = data.tools || [];

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const registeredSlugs = Object.keys(registry);

console.log('Total tools in YAML:', rawTools.length);
console.log('Total tools in Registry:', registeredSlugs.length);

const unimplemented = [];
for (const tool of rawTools) {
  if (!registeredSlugs.includes(tool.slug)) {
    unimplemented.push({ name: tool.name, slug: tool.slug, category: tool.category });
  }
}

console.log('\nUnimplemented tools in YAML:');
console.log(JSON.stringify(unimplemented, null, 2));
