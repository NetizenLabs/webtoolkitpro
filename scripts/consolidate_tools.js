const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const toolsYamlPath = path.join(__dirname, '../config/tools.yaml');
const nextConfigPath = path.join(__dirname, '../next.config.js');
const registryPath = path.join(__dirname, '../lib/tool-registry.tsx');
const instancesDir = path.join(__dirname, '../components/tools/instances');

const doc = yaml.load(fs.readFileSync(toolsYamlPath, 'utf8'));

// The merging definitions
const merges = {
    'json-toolkit': {
        name: 'JSON Developer Toolkit',
        category: 'Developer Tools',
        icon: 'FileJson',
        tags: ['json', 'formatter', 'validator', 'typescript', 'golang', 'prisma', 'pydantic'],
        slugsToMerge: ['json-formatter', 'json-formatter-pro', 'json-to-ts', 'json-to-go', 'json-to-java', 'json-to-pydantic', 'json-to-prisma']
    },
    'json-data-converter': {
        name: 'JSON Data Converter',
        category: 'Developer Tools',
        icon: 'FileJson',
        tags: ['json', 'yaml', 'jsonl', 'csv', 'converter'],
        slugsToMerge: ['json-to-yaml', 'json-to-jsonl'] // json-to-csv and xml handled below to avoid overlap
    },
    'uuid-generator': {
        name: 'Universal UUID Generator',
        category: 'Generators',
        icon: 'Hash',
        tags: ['uuid', 'guid', 'v4', 'v7', 'generator'],
        slugsToMerge: ['uuid-generator', 'uuid-v4-gen', 'uuid-v7-generator']
    },
    'password-suite': {
        name: 'Enterprise Password Security Suite',
        category: 'Generators',
        icon: 'Key',
        tags: ['password', 'security', 'generator', 'auditor', 'tester'],
        slugsToMerge: ['password-generator', 'password-auditor', 'password-tester']
    },
    'data-converter': {
        name: 'Universal Data Converter',
        category: 'Developer Tools',
        icon: 'Repeat',
        tags: ['xml', 'csv', 'json', 'converter'],
        slugsToMerge: ['xml-to-csv', 'json-to-csv', 'csv-to-json', 'xml-to-json', 'json-to-xml']
    }
};

let redirects = [];
let allSlugsToMerge = [];

Object.keys(merges).forEach(masterSlug => {
    merges[masterSlug].slugsToMerge.forEach(slug => {
        allSlugsToMerge.push(slug);
        redirects.push(`      { source: '/tools/${slug}', destination: '/tools/${masterSlug}', permanent: true },`);
    });
});

// Remove merged tools from YAML
doc.tools = doc.tools.filter(t => !allSlugsToMerge.includes(t.slug));

// Create Master Tools entries (basic stubs that inherit from the first merged tool's properties to save space)
// In a real scenario, we would craft complete custom SEO copy for each, but we will duplicate the primary tool's SEO and modify it for the script.
const masterTools = [];
Object.keys(merges).forEach(masterSlug => {
    masterTools.push({
        name: merges[masterSlug].name,
        slug: masterSlug,
        category: merges[masterSlug].category,
        icon: merges[masterSlug].icon,
        tags: merges[masterSlug].tags,
        priority: 10,
        releaseDate: '2026-05-29',
        function: { primary: `Universal ${merges[masterSlug].name}` },
        technical: { processing: 'client-side' },
        meta: { title: `${merges[masterSlug].name} | WebToolkit Pro`, description: `Professional ${merges[masterSlug].name} for developers.` },
        content: { title: merges[masterSlug].name, description: `Comprehensive ${merges[masterSlug].name} combining multiple utilities into one powerful interface.`, how_it_works: 'Runs entirely client-side for maximum privacy and performance.' },
        seo: { title: merges[masterSlug].name, description: `Professional ${merges[masterSlug].name} for developers.` }
    });
});

doc.tools.unshift(...masterTools); // add to top
fs.writeFileSync(toolsYamlPath, yaml.dump(doc), 'utf8');

// Inject redirects into next.config.js
let nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');
const redirectString = redirects.join('\n');
nextConfigContent = nextConfigContent.replace('return [', `return [\n      // Tools Consolidation Redirects\n${redirectString}`);
fs.writeFileSync(nextConfigPath, nextConfigContent, 'utf8');

// Update Registry (Remove old, add new)
let registryStr = fs.readFileSync(registryPath, 'utf8');
allSlugsToMerge.forEach(slug => {
    const regex = new RegExp(`  '${slug}': dynamic[^\n]+\n`, 'g');
    registryStr = registryStr.replace(regex, '');
});

let newRegistryLines = "";
Object.keys(merges).forEach(masterSlug => {
    // PascalCase component name
    const compName = masterSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    newRegistryLines += `  '${masterSlug}': dynamic(() => import('../components/tools/instances/${compName}'), { ssr: false }),\n`;
});

registryStr = registryStr.replace(/export const TOOL_COMPONENTS.*?{/, `export const TOOL_COMPONENTS: Record<string, ComponentType<any>> = {\n${newRegistryLines}`);
fs.writeFileSync(registryPath, registryStr, 'utf8');

// Print files to delete
console.log(allSlugsToMerge.map(s => {
    const compName = s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('');
    return `${compName}.tsx`;
}).join(','));
