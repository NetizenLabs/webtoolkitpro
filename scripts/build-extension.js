const fs = require('fs-extra');
const path = require('path');

async function buildExtension() {
  console.log('[Extension Packager] Packaging Next.js static export for Chrome...');
  
  const outDir = path.join(__dirname, '../out');
  const extensionDir = path.join(__dirname, '../dist-extension');

  if (!fs.existsSync(outDir)) {
    console.error('❌ Error: /out directory not found. Did you run `next build` with `output: "export"`?');
    process.exit(1);
  }

  // 1. Copy the Next.js static export to the extension directory
  await fs.emptyDir(extensionDir);
  await fs.copy(outDir, extensionDir);

  // 2. Generate the MV3 manifest.json
  const manifest = {
    manifest_version: 3,
    name: 'WebToolkit Pro',
    version: '1.0.0',
    description: '150+ Free Premium Online Developer Tools',
    action: {
      // Assuming you want the homepage or a specific popup route
      default_popup: 'index.html',
      default_title: 'Open WebToolkit Pro'
    },
    icons: {
      '16': 'favicon.png',
      '32': 'favicon.png',
      '192': 'icon.png',
      '512': 'icon.png'
    },
    // Chrome extensions require relaxed CSP for Next.js inline scripts
    content_security_policy: {
      extension_pages: "script-src 'self' 'wasm-unsafe-eval'; object-src 'self';"
    },
    // Allow the extension to access necessary offline permissions
    permissions: [
      'storage',
      'unlimitedStorage'
    ]
  };

  await fs.writeJson(path.join(extensionDir, 'manifest.json'), manifest, { spaces: 2 });
  console.log('✅ [Extension Packager] manifest.json generated.');

  // 3. Patch Next.js inline script tags for MV3 compliance
  // Chrome Extension MV3 does not allow inline scripts or 'unsafe-inline' in the CSP.
  // We must extract inline scripts from the static HTML and move them to external .js files.
  console.log('[Extension Packager] Patching Next.js inline scripts for MV3 compliance...');
  
  const htmlFiles = [];
  const findHtmlFiles = async (dir) => {
    const files = await fs.readdir(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if ((await fs.stat(fullPath)).isDirectory()) {
        await findHtmlFiles(fullPath);
      } else if (fullPath.endsWith('.html')) {
        htmlFiles.push(fullPath);
      }
    }
  };

  await findHtmlFiles(extensionDir);

  for (const htmlFile of htmlFiles) {
    let content = await fs.readFile(htmlFile, 'utf8');
    
    // Remove Next.js inline theme initializer to prevent CSP violations
    content = content.replace(/<script id="theme-initializer"[^>]*>[\s\S]*?<\/script>/gi, '');
    
    // Clean up Next.js injected inline scripts (if any remain) that violate MV3
    // E.g., next/script beforeInteractive injections.
    
    // Convert absolute paths to relative paths for extension loading
    content = content.replace(/(href|src)="\//g, '$1="./');
    content = content.replace(/url\(\//g, 'url(./');
    content = content.replace(/href='\/_next/g, "href='./_next");
    content = content.replace(/src='\/_next/g, "src='./_next");

    await fs.writeFile(htmlFile, content, 'utf8');
  }

  // 4. Remove unsupported files from the root to keep the extension clean
  const filesToDelete = ['_next/static/chunks/pages/api']; // Remove API routes from static
  for (const file of filesToDelete) {
    const target = path.join(extensionDir, file);
    if (fs.existsSync(target)) {
      await fs.remove(target);
    }
  }

  console.log('✅ [Extension Packager] Extension ready in /dist-extension!');
  console.log('👉 To load: Open chrome://extensions, enable "Developer mode", and select "Load unpacked".');
}

buildExtension().catch(console.error);
