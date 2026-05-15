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

    const comingSoon = yamlSlugs.filter(slug => !registrySlugs.includes(slug));

    console.log('Total Tools in YAML:', yamlSlugs.length);
    console.log('Total Tools in Registry:', registrySlugs.length);
    console.log('Coming Soon Tools:', comingSoon);
    
    // Save to a result file for easier reading
    fs.writeFileSync('coming_soon_tools.json', JSON.stringify({
        total_yaml: yamlSlugs.length,
        total_registry: registrySlugs.length,
        coming_soon: comingSoon
    }, null, 2));

} catch (e) {
    console.error(e);
}
