const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const toolsPath = path.join('c:', 'xampp', 'htdocs', 'webtoolkit-pro', 'config', 'tools.yaml');
const registryPath = path.join('c:', 'xampp', 'htdocs', 'webtoolkit-pro', 'lib', 'tool-registry.tsx');

try {
    const fileContents = fs.readFileSync(toolsPath, 'utf8');
    const data = yaml.load(fileContents);
    const tools = data.tools || [];
    const yamlSlugs = tools.map(t => t.slug);

    const registryContents = fs.readFileSync(registryPath, 'utf8');
    const registrySlugs = [];
    const regex = /'([^']+)': dynamic/g;
    let match;
    while ((match = regex.exec(registryContents)) !== null) {
        registrySlugs.push(match[1]);
    }

    const missingInYaml = registrySlugs.filter(slug => !yamlSlugs.includes(slug));

    console.log('Missing in YAML:', missingInYaml);

} catch (e) {
    console.error(e);
}
