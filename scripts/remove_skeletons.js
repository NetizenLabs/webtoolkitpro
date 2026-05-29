const fs = require('fs');
const path = require('path');

const REGISTRY_PATH = path.join(__dirname, '../lib/tool-registry.tsx');
let content = fs.readFileSync(REGISTRY_PATH, 'utf-8');

// Remove the import statement
content = content.replace("import ToolSkeleton from '@/components/tools/ToolSkeleton'\n", '');

// Remove the loading property from all dynamic imports
content = content.replace(/loading: \(\) => <ToolSkeleton \/>, /g, '');

fs.writeFileSync(REGISTRY_PATH, content, 'utf-8');
console.log('Successfully removed ToolSkeleton from tool registry.');
