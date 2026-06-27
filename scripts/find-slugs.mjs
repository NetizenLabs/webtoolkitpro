import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONFIG_PATH = path.join(__dirname, '../config/tools.yaml');

const fileContents = fs.readFileSync(CONFIG_PATH, 'utf8');
const data = yaml.load(fileContents);

const keywords = ['uuid', 'base64', 'password', 'jwt'];

data.tools.forEach(tool => {
  if (keywords.some(k => tool.slug.includes(k))) {
    console.log(tool.slug);
  }
});
