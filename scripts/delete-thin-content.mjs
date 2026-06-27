import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BLOG_DIR = path.join(__dirname, '../content/blog');

const patterns = [
  /^the-best-.*\.md$/,
  /^why-every-.*\.md$/,
  /^how-to-master-.*\.md$/,
  /^5-fatal-mistakes-.*\.md$/,
  /^the-ultimate-guide-to-.*\.md$/,
  /.*-vs-the-alternatives-which-is-better\.md$/
];

let deletedCount = 0;

fs.readdirSync(BLOG_DIR).forEach(file => {
  if (patterns.some(pattern => pattern.test(file))) {
    fs.unlinkSync(path.join(BLOG_DIR, file));
    console.log(`Deleted: ${file}`);
    deletedCount++;
  }
});

console.log(`\nSuccessfully deleted ${deletedCount} thin content files.`);
