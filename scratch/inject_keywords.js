const fs = require('fs');
const yaml = require('js-yaml');

const gscAnalysis = JSON.parse(fs.readFileSync('gsc_analysis.json', 'utf8'));
const file = fs.readFileSync('../config/tools.yaml', 'utf8');
const data = yaml.load(file);

let modifiedCount = 0;

for (const [slug, info] of Object.entries(gscAnalysis.results)) {
    const tool = data.tools.find(t => t.slug === slug);
    if (!tool) continue;
    
    if (!tool.seo) tool.seo = {};
    if (!tool.seo.keywords) tool.seo.keywords = [];
    
    // Add top missing queries, limit to top 10 to avoid keyword stuffing
    const topMissing = info.missing.slice(0, 10).map(q => q.query);
    
    for (const kw of topMissing) {
        if (!tool.seo.keywords.includes(kw)) {
            tool.seo.keywords.push(kw);
            modifiedCount++;
        }
    }
}

fs.writeFileSync('../config/tools.yaml', yaml.dump(data, { lineWidth: -1, noRefs: true }));
console.log(`Successfully added ${modifiedCount} high-value GSC keywords to config/tools.yaml`);
