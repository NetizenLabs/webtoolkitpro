const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '../content/blog');
const NEXT_CONFIG_PATH = path.join(__dirname, '../next.config.js');

const clusterMap = {
  'cron-syntax-complete-reference.md': [
    'cron-builders-compared.md',
    'cron-expression-examples.md',
    'cron-expression-generator-2026.md',
    'wordpress-cron-vs-linux-cron.md'
  ],
  'what-is-json-complete-guide.md': [
    'excel-vs-google-sheets-json.md',
    'flattening-nested-json-csv.md',
    'how-to-fix-common-json-errors.md',
    'json-formatting-best-practices.md',
    'json-ld-evolution-2026.md',
    'json-ld-schema-tutorial.md',
    'json-to-csv-converters-compared.md',
    'json-vs-xml-comparison.md',
    'professional-json-debugging-guide-2026.md',
    'securing-json-apis.md',
    'wordpress-rest-api-export-csv.md'
  ],
  'what-is-jwt-complete-guide.md': [
    'decode-jwt-without-library.md',
    'jwt-decoder-tools-compared.md',
    'jwt-security-best-practices.md',
    'jwt-security-guide.md',
    'jwt-vs-paseto-vs-session-tokens.md'
  ],
  'regex-cheat-sheet-javascript.md': [
    '20-must-know-regex-patterns.md',
    'how-to-debug-regex.md',
    'regex-javascript-vs-python-vs-php.md',
    'regex-patterns-every-developer-should-know.md',
    'regex-tester-tools-compared.md'
  ],
  'how-secure-is-my-password.md': [
    'password-security-enterprise-2026.md',
    'password-security-guide.md'
  ],
  'what-is-unified-diff.md': [
    'best-diff-checker-tools-2026.md',
    'diff-tools-for-wordpress.md',
    'how-diff-algorithms-work-myers.md'
  ],
  'favicon-sizes-complete-guide-2026.md': [
    'add-favicon-wordpress-2026.md',
    'favicon-generator-tools-compared.md',
    'favicon-psychology.md'
  ],
  'url-slug-seo-best-practices.md': [
    'fix-bad-slugs-without-losing-rankings.md',
    'slug-generator-vs-manual-entry.md',
    'wordpress-permalink-structures-compared.md'
  ],
  'htaccess-cheat-sheet-wordpress.md': [
    'htaccess-vs-wordpress-redirect-plugins.md',
    'test-htaccess-redirects.md'
  ],
  'seo-meta-tags-complete-guide.md': [
    'geo-future-of-seo.md',
    'geo-nextjs-2026-guide.md',
    'geo-optimization-guide.md',
    'seo-schema-generator-2026-guide.md'
  ],
  'ai-first-development-2026.md': [
    'ai-coding-tools-2026.md',
    'ai-cybersecurity-trends.md',
    'ai-in-devops-future.md',
    'ai-seo-optimization-2026.md',
    'ai-web-dev-workflows-2026.md',
    'llm-latency-ux-impact.md',
    'llms-txt-generator-guide.md',
    'llms-txt-vs-robots-txt.md',
    'llms-txt-wordpress-guide.md',
    'what-is-llms-txt.md'
  ],
  'edge-computing-guide.md': [
    'edge-computing-core-web-vitals.md',
    'edge-computing-performance-2026.md',
    'microservices-architecture-guide.md',
    'serverless-computing-future.md'
  ],
  'modern-css-architecture.md': [
    'animate-css-gradients-performance.md',
    'css-gradient-generators-compared.md',
    'css-gradients-wordpress.md',
    'css-units-explained.md',
    'linear-vs-radial-vs-conic-gradients.md'
  ],
  'performance-optimization-guide.md': [
    'api-latency-study.md',
    'server-first-rendering-2026.md',
    'server-first-vs-client-rendering-2026.md'
  ],
  'privacy-first-web-development.md': [
    'secure-client-side-tools-privacy.md',
    'web-accessibility-best-practices.md',
    'webtoolkit-pro-trust-network.md'
  ],
  'enterprise-web-security-guide.md': [
    'cloud-cost-management.md',
    'automated-testing-guide.md',
    'enterprise-js-frameworks.md',
    'nextjs-vs-vite-comparison.md',
    'typescript-best-practices-2026.md',
    'ui-ux-design-trends.md',
    'scalable-database-design.md',
    'headless-vs-traditional-cms.md',
    'base64-encoding-use-cases.md',
    'top-10-free-developer-tools-2026.md',
    'uuid-v4-vs-v7-comparison.md',
    'pwa-development-guide.md'
  ]
};

let redirects = [];
let deletedCount = 0;

console.log('Starting Blog Content Consolidation...');

for (const [canonicalFile, duplicateFiles] of Object.entries(clusterMap)) {
  const canonicalSlug = canonicalFile.replace('.md', '');
  
  duplicateFiles.forEach(duplicateFile => {
    const targetPath = path.join(BLOG_DIR, duplicateFile);
    const duplicateSlug = duplicateFile.replace('.md', '');
    
    if (fs.existsSync(targetPath)) {
      // 1. Delete the physical file
      fs.unlinkSync(targetPath);
      deletedCount++;
      console.log(`[DELETED] ${duplicateFile} -> Merged into ${canonicalFile}`);
      
      // 2. Generate the Next.js Redirect Objects
      redirects.push(`      { source: '/blog/${duplicateSlug}', destination: '/blog/${canonicalSlug}/', permanent: true },`);
      redirects.push(`      { source: '/blog/${duplicateSlug}/', destination: '/blog/${canonicalSlug}/', permanent: true },`);
    } else {
      console.log(`[SKIPPED] ${duplicateFile} (Not found)`);
    }
  });
}

console.log(`\nSuccessfully deleted ${deletedCount} thin-content markdown files.`);

// 3. Output the exact Redirect Block to be pasted into next.config.js
console.log('\n======================================================');
console.log('--- COPY AND PASTE THIS INTO next.config.js redirects() ---');
console.log(redirects.join('\n'));
console.log('======================================================\n');
