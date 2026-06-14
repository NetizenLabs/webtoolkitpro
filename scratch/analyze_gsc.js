const fs = require('fs');
const yaml = require('js-yaml');

const gscData = `web toolkit	1	21
robots.txt validator	0	114
robots txt validator	0	76
wtkpro.site	0	72
favicon size	0	57
favicon sizes	0	51
real favicon generator	0	50
json vs xml	0	38
test htaccess	0	36
webtoolkit	0	35
htaccess tester	0	34
htaccess test	0	34
robot.txt validator	0	33
htaccess validator	0	32
htaccess checker	0	31
rewrite rule tester	0	31
apache rewrite rule tester	0	30
robot txt validator	0	30
favicon dimensions	0	28
robots txt validate	0	28
validate robots txt	0	25
size of a favicon	0	22
next js vite	0	20
px to rem	0	19
xml vs json	0	18
favicon image size	0	18
robots.txt tester	0	17
size of favicon	0	15
vite nextjs	0	14
jsonld generator	0	14
robots.txt validation	0	14
robots txt validation	0	14
vite vs nextjs	0	13
nextjs vite	0	13
ld json schema generator	0	13
favicon ico size	0	12
json-ld generator	0	12
pixels to rem	0	11
base64 encoding	0	11
json ld schema generator	0	10
unified diff	0	9
next js vs vite	0	9
htaccess rewrite generator	0	9
robots.txt validators	0	9
verify robots txt	0	9
favicon dimensions 2026	0	8
uuidv7	0	8
htaccess rewrite rule generator	0	8
json ld generator	0	8
json-ld schema generator	0	8
cloud spend management	0	8
nextjs vs vite	0	7
vite vs next js	0	7
htaccess redirect 301 not working	0	7
robots.txt validador	0	7
htaccess rewriterule generator	0	7
xml or json	0	7
managing cloud costs	0	7
ld json generator	0	7
301 redirect checker	0	7
best favicon generator	0	7
p x to rem	0	6
json standard	0	6
aws iam policy generator	0	6
301 checker	0	6
robots txt tester	0	6
base64	0	6
what is json format	0	6
webtoolkit online	0	5
px to rem converter	0	5
301 vs 302	0	5
px rem	0	5
robots txt test tool	0	5
xml json	0	5
base64 encoded	0	5
robots.txt testing tool	0	5
webtool kit	0	4
favicon size 2026	0	4
ld generator	0	4
s3 policy generator	0	4
json-ld code generator	0	4
json or xml	0	4
htaccess rewrite url generator	0	4
json versus xml	0	4
jsonwebtoken decode	0	4
xml and json	0	4
verify robots.txt	0	4
json-ld	0	4
robots txt verify	0	4
json-ld schema generator for seo	0	4
faq schema generator	0	3
realfavicongenerator	0	3
redirect 301 htaccess not working	0	3
text to binary encoding	0	3
diff online	0	3
htaccess generator	0	3
iam policy generator	0	3
convert pixel to rem	0	3
difference between json and xml	0	3
compare code online	0	3
html favicon size	0	3
htaccess 301 generator	0	3
pattern regex	0	3
code compare online	0	3
crontab evaluator	0	3
schema json ld generator	0	3
cron examples	0	3
cron example	0	3
json over xml	0	3
robots.txt checker tool	0	3
b64 encoding	0	3
json ld schema	0	3
301 redirect check	0	3
json ld builder	0	3
check redirect 301	0	3
b64 encode	0	3
json-ld code	0	3
unified format	0	2
regex101 tester	0	2
diff unified format	0	2
unified diff format	0	2
jwt.io alternative	0	2
json vs excel	0	2
diff u/v	0	2
next vs vite	0	2
vite js vs next js	0	2
301 vs 307	0	2
cron generator	0	2
302 vs 307	0	2
json rfc	0	2
diffchecker	0	2
difference between 301 and 302	0	2
code difference checker	0	2
css shadow maker	0	2
301 vs 302 vs 307	0	2
favicon size 2022	0	2
diff check	0	2
browser feature test	0	2
cron expression evaluator	0	2
http 301 vs 302	0	2
16px to rem	0	2
aws policy gen	0	2
code diff online	0	2
json definition	0	2
jsonwebtoken.decode	0	2
temporary redirect 302 vs 307	0	2
diff code	0	2
what is base64 encoding	0	2
px to rem conversion	0	2
code diff tool	0	2
xml versus json	0	2
json spec	0	2
jwt security	0	2
pixel to rem	0	2
cron translator	0	2
wcag color contrast checker	0	2
xml json difference	0	2
differences between xml and json	0	2
xml and json difference	0	2
compare code	0	2
difference between 302 and 307	0	2
json xml	0	2
seo 302 vs 301	0	2
htaccess errors	0	2
base64 encryption	0	2
robots txt validator free	0	2
is json the same as xml	0	2
redirect chain checker	0	2
format of json file	0	2
online web toolkit	0	2
regex pattern	0	2
base64 format	0	2
307 redirect seo	0	2
encoded 64	0	2
json xml difference	0	2
robots.txt verify	0	2
json ld schema markup	0	2
json format	0	2
schema json ld	0	2
schema json-ld	0	2
base 64 encoding	0	2
json ld	0	2
redirect tracker	0	2
what is base 64 encoding	0	2
cron editor	0	2
cron-editor	0	2
test 301 redirect	0	2
json ld code	0	2
redirect chain	0	2`;

// Basic mapping of keyword substrings to tool slugs
const toolMappings = {
    'robots.txt': 'robots-txt-toolkit',
    'robots txt': 'robots-txt-toolkit',
    'favicon': 'favicon-generator',
    'htaccess': 'htaccess-generator',
    'rewrite rule': 'htaccess-generator',
    'json vs xml': 'json-yaml-jsonl-converter',
    'xml vs json': 'json-yaml-jsonl-converter',
    'xml or json': 'json-yaml-jsonl-converter',
    'json or xml': 'json-yaml-jsonl-converter',
    'difference between json and xml': 'json-yaml-jsonl-converter',
    'px to rem': 'px-rem-converter',
    'px rem': 'px-rem-converter',
    'pixel to rem': 'px-rem-converter',
    'pixels to rem': 'px-rem-converter',
    '16px': 'px-rem-converter',
    'jsonld': 'schema-markup-generator',
    'json-ld': 'schema-markup-generator',
    'json ld': 'schema-markup-generator',
    'ld json': 'schema-markup-generator',
    'faq schema': 'faq-schema',
    'schema generator': 'schema-markup-generator',
    'uuidv7': 'bulk-uuid-v4-v7-generator',
    'unified diff': 'diff-checker',
    'compare code': 'diff-checker',
    'diff online': 'diff-checker',
    'code diff': 'diff-checker',
    'difference checker': 'diff-checker',
    'base64': 'base64-encoder-decoder',
    'b64': 'base64-encoder-decoder',
    '64 encoding': 'base64-encoder-decoder',
    'jsonwebtoken': 'jwt-decoder-generator',
    'jwt': 'jwt-decoder-generator',
    'decode token': 'jwt-decoder-generator',
    'cron': 'cron-generator',
    'crontab': 'cron-generator',
    '301': 'redirect-checker',
    '302': 'redirect-checker',
    '307': 'redirect-checker',
    'redirect checker': 'redirect-checker',
    'redirect chain': 'redirect-checker',
    'aws iam': 'aws-iam-generator',
    'iam policy': 'aws-iam-generator',
    's3 policy': 'aws-iam-generator',
    'aws policy': 'aws-iam-generator',
    'regex': 'regex-tester',
    'regular expression': 'regex-tester',
    'shadow maker': 'css-generators',
    'shadow generator': 'css-generators',
    'color contrast': 'contrast-checker'
};

const lines = gscData.split('\n');
const queries = lines.map(line => {
    const parts = line.split('\t');
    if (parts.length >= 3) {
        return { query: parts[0].trim(), clicks: parseInt(parts[1]), impressions: parseInt(parts[2]) };
    }
    return null;
}).filter(Boolean);

const file = fs.readFileSync('../config/tools.yaml', 'utf8');
const data = yaml.load(file);
const tools = data.tools;

let matches = {};
let unmapped = [];

queries.forEach(q => {
    let matchedSlug = null;
    for (const [key, slug] of Object.entries(toolMappings)) {
        if (q.query.toLowerCase().includes(key)) {
            matchedSlug = slug;
            break;
        }
    }
    
    if (matchedSlug) {
        if (!matches[matchedSlug]) matches[matchedSlug] = [];
        matches[matchedSlug].push(q);
    } else {
        unmapped.push(q);
    }
});

// Check existing keywords
const results = {};
for (const [slug, queries] of Object.entries(matches)) {
    const tool = tools.find(t => t.slug === slug);
    if (!tool) {
        console.log(`Tool not found: ${slug}`);
        continue;
    }
    
    const existingKeywords = new Set([
        ...(tool.content?.keywords || []),
        ...(tool.seo?.keywords || []),
        ...(tool.tags || [])
    ].map(k => k.toLowerCase()));
    
    const missingQueries = queries.filter(q => {
        // exact match
        if (existingKeywords.has(q.query.toLowerCase())) return false;
        // substring match (if a keyword already covers this query)
        for (const kw of existingKeywords) {
            if (kw.includes(q.query.toLowerCase())) return false;
        }
        return true;
    });
    
    if (missingQueries.length > 0) {
        results[slug] = {
            toolName: tool.name,
            missing: missingQueries.sort((a,b) => b.impressions - a.impressions)
        };
    }
}

fs.writeFileSync('gsc_analysis.json', JSON.stringify({ results, unmapped }, null, 2));
console.log("Analysis saved to gsc_analysis.json");
