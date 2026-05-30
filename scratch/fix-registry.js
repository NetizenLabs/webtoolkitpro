const fs = require('fs');
const path = require('path');

const registryPath = path.join(__dirname, '../lib/tool-registry.tsx');
let content = fs.readFileSync(registryPath, 'utf8');

// Replace dynamic imports with lazy imports
// 1. Remove next/dynamic import
content = content.replace(/import dynamic from 'next\/dynamic'/g, '');

// 2. Add lazy to react import if not present
if (!content.includes('lazy')) {
  content = content.replace(/import React, { ComponentType } from 'react'/, "import React, { ComponentType, lazy } from 'react'");
}

// 3. Fix the json-to-code-generator special case first
content = content.replace(
  /dynamic\(\(\) => import\('\.\.\/components\/tools\/instances\/JsonToCodeGenerator'\), {\s*ssr: false,\s*loading: \(\) => <div[^>]*>Loading component\.\.\.<\/div>\s*}\)/,
  "lazy(() => import('../components/tools/instances/JsonToCodeGenerator'))"
);

// 4. Replace all other dynamic calls
content = content.replace(/dynamic\(\(\) => import\((.*?)\), { ssr: false }\)/g, "lazy(() => import($1))");

fs.writeFileSync(registryPath, content);
console.log("Updated tool-registry.tsx");
