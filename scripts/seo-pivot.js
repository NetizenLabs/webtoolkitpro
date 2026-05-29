const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const ROOT_DIR = path.resolve(__dirname, '..');

// 1. Update YAML
const yamlPath = path.join(ROOT_DIR, 'config', 'tools.yaml');
const doc = yaml.load(fs.readFileSync(yamlPath, 'utf8'));

const pivots = {
  'json-toolkit': {
    name: 'JSON to TypeScript, Go & Pydantic Code Generator',
    slug: 'json-to-code-generator',
    title: 'JSON to TypeScript, Go & Pydantic Code Generator',
    desc: 'Instantly convert JSON into TypeScript interfaces, Go structs, Pydantic models, and Prisma schemas directly in your browser. Free local code generation.',
    keywords: ['convert json to typescript interface', 'json to pydantic model generator', 'json to go struct online', 'free json code generator']
  },
  'json-data-converter': {
    name: 'Free Local JSON to YAML & JSONL Converter',
    slug: 'json-yaml-jsonl-converter',
    title: 'Free Local JSON to YAML & JSONL Converter',
    desc: 'Securely convert JSON arrays and objects to YAML and JSON Lines (JSONL) format offline in your browser.',
    keywords: ['json to yaml converter offline', 'convert json to jsonl format', 'json lines converter tool']
  },
  'uuid-generator': {
    name: 'Bulk UUID v4 & v7 Generator',
    slug: 'bulk-uuid-v4-v7-generator',
    title: 'Bulk UUID v4 & v7 Generator Online',
    desc: 'Generate thousands of random UUID v4 and time-based UUID v7 identifiers securely in your browser.',
    keywords: ['bulk uuid v4 generator online', 'uuid v7 timestamp generator', 'secure guid creator offline']
  },
  'password-suite': {
    name: 'Offline Password Entropy & Strength Tester',
    slug: 'password-entropy-tester',
    title: 'Offline Password Entropy & Strength Tester',
    desc: 'Test your password strength, calculate entropy crack times, and generate secure local passwords without sending data to a server.',
    keywords: ['offline password strength tester', 'calculate password entropy crack time', 'secure local password generator without server']
  },
  'data-converter': {
    name: 'Browser-Based CSV, JSON & XML Converter',
    slug: 'csv-json-xml-converter',
    title: 'Browser-Based CSV, JSON & XML Converter',
    desc: 'Bidirectionally convert between CSV spreadsheets, JSON files, and XML documents instantly without server uploads.',
    keywords: ['csv to xml converter without server', 'json to csv flatten tool', 'xml to json javascript converter']
  }
};

doc.tools.forEach(tool => {
  if (pivots[tool.slug]) {
    const p = pivots[tool.slug];
    tool.name = p.name;
    tool.slug = p.slug;
    
    if (tool.meta) {
      tool.meta.title = p.title;
      tool.meta.description = p.desc;
    }
    if (tool.seo) {
      tool.seo.title = p.title;
      tool.seo.description = p.desc;
      tool.seo.keywords = p.keywords;
    }
    if (tool.content) {
      tool.content.title = p.name;
      tool.content.keywords = p.keywords;
    }
  }
});

fs.writeFileSync(yamlPath, yaml.dump(doc, { lineWidth: -1 }), 'utf8');
console.log('Updated tools.yaml');

// 2. Rename React Components
const componentMap = {
  'JsonToolkit.tsx': 'JsonToCodeGenerator.tsx',
  'JsonDataConverter.tsx': 'JsonYamlJsonlConverter.tsx',
  'UuidGenerator.tsx': 'BulkUuidGenerator.tsx',
  'PasswordSuite.tsx': 'PasswordEntropyTester.tsx',
  'DataConverter.tsx': 'CsvJsonXmlConverter.tsx'
};

const instancesDir = path.join(ROOT_DIR, 'components', 'tools', 'instances');
for (const [oldName, newName] of Object.entries(componentMap)) {
  const oldPath = path.join(instancesDir, oldName);
  const newPath = path.join(instancesDir, newName);
  if (fs.existsSync(oldPath)) {
    // Also rename the function inside the component
    let content = fs.readFileSync(oldPath, 'utf8');
    const oldFnName = oldName.replace('.tsx', '');
    const newFnName = newName.replace('.tsx', '');
    content = content.replace(new RegExp(`function ${oldFnName}`, 'g'), `function ${newFnName}`);
    fs.writeFileSync(newPath, content, 'utf8');
    fs.unlinkSync(oldPath);
    console.log(`Renamed ${oldName} to ${newName}`);
  }
}

// 3. Update Registry
const registryPath = path.join(ROOT_DIR, 'lib', 'tool-registry.tsx');
let registryContent = fs.readFileSync(registryPath, 'utf8');
registryContent = registryContent
  .replace(/JsonToolkit'\)\)/g, "JsonToCodeGenerator'))")
  .replace(/JsonDataConverter'\)\)/g, "JsonYamlJsonlConverter'))")
  .replace(/UuidGenerator'\)\)/g, "BulkUuidGenerator'))")
  .replace(/PasswordSuite'\)\)/g, "PasswordEntropyTester'))")
  .replace(/DataConverter'\)\)/g, "CsvJsonXmlConverter'))")
  .replace(/'json-toolkit':/g, "'json-to-code-generator':")
  .replace(/'json-data-converter':/g, "'json-yaml-jsonl-converter':")
  .replace(/'uuid-generator':/g, "'bulk-uuid-v4-v7-generator':")
  .replace(/'password-suite':/g, "'password-entropy-tester':")
  .replace(/'data-converter':/g, "'csv-json-xml-converter':");
fs.writeFileSync(registryPath, registryContent, 'utf8');
console.log('Updated tool-registry.tsx');

// 4. Update next.config.js Redirects
const nextConfigPath = path.join(ROOT_DIR, 'next.config.js');
let nextConfig = fs.readFileSync(nextConfigPath, 'utf8');

// Replace all destinations with the new flattened slugs
nextConfig = nextConfig
  .replace(/destination: '\/tools\/json-toolkit'/g, "destination: '/tools/json-to-code-generator'")
  .replace(/destination: '\/tools\/json-data-converter'/g, "destination: '/tools/json-yaml-jsonl-converter'")
  .replace(/destination: '\/tools\/uuid-generator'/g, "destination: '/tools/bulk-uuid-v4-v7-generator'")
  .replace(/destination: '\/tools\/password-suite'/g, "destination: '/tools/password-entropy-tester'")
  .replace(/destination: '\/tools\/data-converter'/g, "destination: '/tools/csv-json-xml-converter'")
  
  .replace(/destination: '\/tools\/uuid-v7-generator\/'/g, "destination: '/tools/bulk-uuid-v4-v7-generator/'")
  .replace(/destination: '\/tools\/password-auditor\/'/g, "destination: '/tools/password-entropy-tester/'");

// Add redirects for the interim slugs that were created previously
const newRedirects = `
      { source: '/tools/json-toolkit', destination: '/tools/json-to-code-generator', permanent: true },
      { source: '/tools/json-data-converter', destination: '/tools/json-yaml-jsonl-converter', permanent: true },
      { source: '/tools/uuid-generator', destination: '/tools/bulk-uuid-v4-v7-generator', permanent: true },
      { source: '/tools/password-suite', destination: '/tools/password-entropy-tester', permanent: true },
      { source: '/tools/data-converter', destination: '/tools/csv-json-xml-converter', permanent: true },
`;

// Inject the new redirects after the first block
nextConfig = nextConfig.replace('// Tools Consolidation Redirects', '// Tools Consolidation Redirects' + newRedirects);

fs.writeFileSync(nextConfigPath, nextConfig, 'utf8');
console.log('Updated next.config.js redirects to prevent chains.');

console.log('SEO Pivot Complete!');
