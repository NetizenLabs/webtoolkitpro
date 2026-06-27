import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONFIG_PATH = path.join(__dirname, '../next.config.js');

let configContent = fs.readFileSync(CONFIG_PATH, 'utf8');

const slugsToRemove = [
  'uuid-v4-vs-v7-comparison',
  'cron-expression-examples',
  'htaccess-vs-wordpress-redirect-plugins',
  'jwt-vs-paseto-vs-session-tokens',
  'excel-vs-google-sheets-json'
];

slugsToRemove.forEach(slug => {
  // We used a standard regex approach just in case whitespace changed
  const regex1 = new RegExp(`.*source: '/blog/${slug}'.*\\n`, 'g');
  const regex2 = new RegExp(`.*source: '/blog/${slug}/'.*\\n`, 'g');
  configContent = configContent.replace(regex1, '');
  configContent = configContent.replace(regex2, '');
});

fs.writeFileSync(CONFIG_PATH, configContent, 'utf8');
console.log("Successfully removed redirects for the 5 target slugs");
