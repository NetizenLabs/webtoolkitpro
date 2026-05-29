const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const doc = yaml.load(fs.readFileSync(path.join(__dirname, '../config/tools.yaml'), 'utf8'));
const registryContent = fs.readFileSync(path.join(__dirname, '../lib/tool-registry.tsx'), 'utf8');

const implemented = doc.tools.filter(t => registryContent.includes("'" + t.slug + "'"));
const notImplemented = doc.tools.filter(t => !registryContent.includes("'" + t.slug + "'"));

console.log('Total Tools:', doc.tools.length);
console.log('Implemented Tools:', implemented.length);
console.log('Coming Soon Tools:', notImplemented.length);

const catGroups = {};
doc.tools.forEach(t => {
    if(!catGroups[t.category]) catGroups[t.category] = [];
    catGroups[t.category].push(t.slug);
});

console.log('\nCategories with most tools:');
Object.keys(catGroups).sort((a,b) => catGroups[b].length - catGroups[a].length).slice(0, 5).forEach(c => {
    console.log(c, ':', catGroups[c].length);
});

// Identify potential duplicates by finding similar words in slug
const clusters = {};
doc.tools.forEach(t => {
    const mainKeyword = t.slug.split('-')[0];
    if(!clusters[mainKeyword]) clusters[mainKeyword] = [];
    clusters[mainKeyword].push(t.slug);
});

console.log('\nPotential duplication clusters (Prefix grouping):');
Object.keys(clusters).sort((a,b) => clusters[b].length - clusters[a].length).slice(0, 10).forEach(c => {
    if(clusters[c].length > 2) {
        console.log(c.toUpperCase(), ':', clusters[c].join(', '));
    }
});
