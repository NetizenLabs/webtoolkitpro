import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONFIG_PATH = path.join(__dirname, '../config/tools.yaml');

// Read the YAML file
const fileContents = fs.readFileSync(CONFIG_PATH, 'utf8');
const data = yaml.load(fileContents);

const toolsToUpdate = [
  'bulk-uuid-v4-v7-generator',
  'base64-encoder-decoder',
  'password-entropy-tester',
  'jwt-decoder-generator'
];

const stepsData = {
  'bulk-uuid-v4-v7-generator': [
    { name: 'Select Version', text: 'Choose between UUID v4 (random) or v7 (time-ordered).' },
    { name: 'Set Quantity', text: 'Specify how many UUIDs you want to generate.' },
    { name: 'Generate', text: 'Click Generate to create the UUIDs securely in your browser.' }
  ],
  'base64-encoder-decoder': [
    { name: 'Input Data', text: 'Type or paste the text you want to encode into Base64.' },
    { name: 'Encode', text: 'The tool instantly encodes your input using the btoa() function.' },
    { name: 'Copy Base64', text: 'Copy the resulting Base64 string for use in your application.' }
  ],
  'password-entropy-tester': [
    { name: 'Set Length', text: 'Choose the desired length for your secure password.' },
    { name: 'Select Characters', text: 'Toggle uppercase, lowercase, numbers, and symbols.' },
    { name: 'Generate', text: 'Click Generate to create a cryptographically secure password.' }
  ],
  'jwt-decoder-generator': [
    { name: 'Paste Token', text: 'Paste your JSON Web Token (JWT) into the input field.' },
    { name: 'Decode Header & Payload', text: 'The tool instantly decodes the Base64Url components locally.' },
    { name: 'Inspect Claims', text: 'Review the decoded payload claims and header algorithm.' }
  ]
};

let updatedCount = 0;

data.tools.forEach(tool => {
  if (toolsToUpdate.includes(tool.slug)) {
    if (!tool.content.steps) {
      tool.content.steps = stepsData[tool.slug];
      updatedCount++;
      console.log(`Updated ${tool.slug}`);
    }
  }
});

if (updatedCount > 0) {
  const newYaml = yaml.dump(data, { lineWidth: -1, noRefs: true });
  fs.writeFileSync(CONFIG_PATH, newYaml, 'utf8');
  console.log(`Successfully updated ${updatedCount} tools.`);
} else {
  console.log('No tools were updated (they might already have steps or slugs were not found).');
}
