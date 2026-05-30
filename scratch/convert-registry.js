const fs = require('fs');

const registryPath = './lib/tool-registry.tsx';
const content = fs.readFileSync(registryPath, 'utf-8');

// Replace lazy(() => import('../components/tools/instances/Filename')) with 'Filename'
const newContent = content
  .replace(/lazy\(\(\) => import\('\.\.\/components\/tools\/instances\/([^']+)'\)\)/g, "'$1'")
  .replace(/export const TOOL_COMPONENTS: Record<string, ComponentType<any>> = \{/, "export const TOOL_FILES: Record<string, string> = {")
  .replace(/import React, \{ ComponentType, lazy \} from 'react'/, "");

fs.writeFileSync(registryPath, newContent, 'utf-8');
console.log("Registry converted.");
