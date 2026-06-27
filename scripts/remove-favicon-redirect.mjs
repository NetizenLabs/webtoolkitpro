import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONFIG_PATH = path.join(__dirname, '../next.config.js');

let configContent = fs.readFileSync(CONFIG_PATH, 'utf8');

// The lines we want to remove
const linesToRemove = [
  "      { source: '/blog/add-favicon-wordpress-2026', destination: '/blog/', permanent: true },\n",
  "      { source: '/blog/add-favicon-wordpress-2026/', destination: '/blog/', permanent: true },\n"
];

linesToRemove.forEach(line => {
  configContent = configContent.replace(line, '');
});

fs.writeFileSync(CONFIG_PATH, configContent, 'utf8');
console.log("Removed add-favicon-wordpress-2026 redirect");
