import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONFIG_PATH = path.join(__dirname, '../next.config.js');

const gscSlugs = [
  'headless-vs-traditional-cms',
  'htaccess-vs-wordpress-redirect-plugins',
  'linear-vs-radial-vs-conic-gradients',
  'uuid-v4-vs-v7-comparison',
  'geo-future-of-seo',
  'cron-expression-examples',
  'pwa-development-guide',
  'cloud-cost-management',
  'regex-tester-tools-compared',
  'base64-encoding-use-cases',
  'add-favicon-wordpress-2026',
  'jwt-vs-paseto-vs-session-tokens',
  'favicon-psychology',
  'llms-txt-wordpress-guide',
  'diff-tools-for-wordpress',
  'llms-txt-generator-guide',
  'css-gradient-generators-compared',
  'test-htaccess-redirects',
  'excel-vs-google-sheets-json',
  'wordpress-rest-api-export-csv',
  'seo-schema-generator-2026-guide',
  'professional-json-debugging-guide-2026',
  'ai-coding-tools-2026',
  'serverless-computing-future',
  'rsa-key-pair-generator',
  'css-gradients-wordpress',
  'typescript-best-practices-2026',
  'animate-css-gradients-performance',
  'how-diff-algorithms-work-myers',
  'regex-patterns-every-developer-should-know',
  'jwt-security-best-practices',
  'slug-generator-vs-manual-entry',
  'wordpress-cron-vs-linux-cron',
  'jwt-decoder-tools-compared',
  'json-to-csv-converters-compared',
  'llm-latency-ux-impact',
  'decode-jwt-without-library',
  'geo-optimization-guide',
  'password-security-enterprise-2026',
  'ai-seo-optimization-2026',
  'how-to-fix-common-json-errors',
  'regex-javascript-vs-python-vs-php',
  'wordpress-permalink-structures-compared',
  'cron-builders-compared',
  'favicon-generator-tools-compared',
  'jwt-signing-guide',
  'json-vs-xml-comparison',
  'cron-expression-generator-2026',
  'what-is-llms-txt',
  'best-diff-checker-tools-2026',
  'fix-bad-slugs-without-losing-rankings',
  'how-to-debug-regex',
  'llms-txt-vs-robots-txt',
  'webtoolkit-pro-trust-network'
];

const getDestination = (slug) => {
  if (slug.includes('json') && slug.includes('csv')) return '/tools/csv-json-xml-converter/';
  if (slug.includes('json')) return '/tools/json-formatter/';
  if (slug.includes('uuid')) return '/tools/bulk-uuid-v4-v7-generator/';
  if (slug.includes('jwt')) return '/tools/jwt-decoder-generator/';
  if (slug.includes('base64')) return '/tools/base64-encoder-decoder/';
  if (slug.includes('regex')) return '/tools/regex-tester/';
  if (slug.includes('cron')) return '/tools/cron-generator/';
  if (slug.includes('gradient')) return '/tools/css-generators/';
  if (slug.includes('schema')) return '/tools/schema-markup-generator/';
  if (slug.includes('password')) return '/tools/password-entropy-tester/';
  return '/blog/';
};

let redirectLines = '    return [\n      // 404 Recovery (GSC Crawl Errors)\n';

gscSlugs.forEach(slug => {
  const dest = getDestination(slug);
  redirectLines += `      { source: '/blog/${slug}', destination: '${dest}', permanent: true },\n`;
  redirectLines += `      { source: '/blog/${slug}/', destination: '${dest}', permanent: true },\n`;
});

let configContent = fs.readFileSync(CONFIG_PATH, 'utf8');

const insertPoint = '    return [';
if (configContent.includes(insertPoint)) {
  configContent = configContent.replace(
    insertPoint,
    redirectLines
  );
  fs.writeFileSync(CONFIG_PATH, configContent, 'utf8');
  console.log(`Successfully injected ${gscSlugs.length * 2} redirects into next.config.js`);
} else {
  console.error("Could not find insertion point.");
}
