import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const apiPath = path.join(process.cwd(), 'app', 'api');
const tempApiPath = path.join(process.cwd(), 'app', '_api');

try {
  if (fs.existsSync(apiPath)) {
    console.log('Temporarily hiding app/api to prevent Next.js static export errors...');
    fs.renameSync(apiPath, tempApiPath);
  }
  console.log('Running Next.js build...');
  execSync('npx cross-env TAURI_ENV=true next build', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} finally {
  if (fs.existsSync(tempApiPath)) {
    console.log('Restoring app/api...');
    fs.renameSync(tempApiPath, apiPath);
  }
}
