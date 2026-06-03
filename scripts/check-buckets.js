const fs = require('fs');
const yaml = require('js-yaml');
const ROOT = 'c:/xampp/htdocs/webtoolkit-pro';
const rawYaml = fs.readFileSync(ROOT + '/config/tools.yaml', 'utf8');
const data = yaml.load(rawYaml);
const tools = data.tools || [];
const regContent = fs.readFileSync(ROOT + '/lib/tool-registry.tsx', 'utf8');

const bucket2 = ['js-minifier','robots-txt-toolkit','markdown-html-converter','json-yaml-jsonl-converter','alt-text-auditor','ping-test','domain-age-checker','px-rem-converter','hash-generator','binary-hex-decimal-converter','base64-encoder-decoder','password-entropy-tester','jwt-decoder-generator','regex-tester','redirect-checker','whois-lookup','slug-generator'];

const bucket1Tools = ['meta-tag-generator','qr-code-generator','contrast-checker','cron-generator','lorem-ipsum','regex-explainer','schema-markup-generator','docker-compose-gen','nginx-generator','authority-simulator','image-resizer','sql-toolkit','ascii-art','json-to-code-generator'];

console.log('=== BUCKET 2 (should work) ===');
bucket2.forEach(function(slug) {
  const inYaml = tools.some(function(t) { return t.slug === slug; });
  const inReg = regContent.indexOf("'" + slug + "':") >= 0;
  const file = fs.existsSync(ROOT + '/components/tools/instances/' + regContent.match(new RegExp("'" + slug + "':\\s*'([^']+)'")) ?.[1] + '.tsx');
  console.log('[yaml:' + inYaml + ' reg:' + inReg + ' file:' + file + '] ' + slug);
});

console.log('\n=== BUCKET 1 (should redirect) ===');
bucket1Tools.forEach(function(slug) {
  const inYaml = tools.some(function(t) { return t.slug === slug; });
  const inReg = regContent.indexOf("'" + slug + "':") >= 0;
  const match = regContent.match(new RegExp("'" + slug + "':\\s*'([^']+)'"));
  const compName = match ? match[1] : null;
  const file = compName ? fs.existsSync(ROOT + '/components/tools/instances/' + compName + '.tsx') : false;
  console.log('[yaml:' + inYaml + ' reg:' + inReg + ' file:' + file + '] ' + slug + (compName ? ' -> ' + compName : ''));
});

console.log('\n=== KEY CONCLUSION ===');
console.log('If yaml:true + reg:true + file:true => the tool page SHOULD work at /tools/<slug>/');
console.log('If it is STILL 404ing on live site => the live site has NOT been redeployed with latest code');

// Show what the live site is likely running - check build output
const hasBuildDir = fs.existsSync(ROOT + '/.next/BUILD_ID');
if (hasBuildDir) {
  const buildId = fs.readFileSync(ROOT + '/.next/BUILD_ID', 'utf8').trim();
  console.log('\nLocal build ID: ' + buildId);
} else {
  console.log('\nNo local .next build found - run npm run build first');
}
