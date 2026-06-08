const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const CONFIG_PATH = path.join(process.cwd(), 'config', 'tools.yaml');
const fileContents = fs.readFileSync(CONFIG_PATH, 'utf8');
const data = yaml.load(fileContents);
const rawTools = data.tools || [];

const tool = rawTools.find(t => t.slug === 'llms-txt-generator');
console.log(tool ? 'Tool found: ' + tool.name : 'Tool NOT found');

const registryContent = fs.readFileSync(path.join(process.cwd(), 'lib', 'tool-registry.tsx'), 'utf8');
console.log('In registry:', registryContent.includes("'llms-txt-generator':"));

const appPath = path.join(process.cwd(), 'app', 'tools', '[slug]', 'page.tsx');
console.log('App path exists:', fs.existsSync(appPath));
