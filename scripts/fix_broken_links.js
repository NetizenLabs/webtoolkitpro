const fs = require('fs');
const path = require('path');

// Directory containing the content (assuming content/blog or similar)
// Let's recursively search the whole repo for .md and .mdx files
function findFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        if (file === 'node_modules' || file === '.next' || file === '.git') continue;
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            findFiles(filePath, fileList);
        } else if (filePath.endsWith('.md') || filePath.endsWith('.mdx')) {
            fileList.push(filePath);
        }
    }
    return fileList;
}

const allFiles = findFiles(path.join(__dirname, '..'));

const replacements = {
    '/tools/base64-encoder-decoder/': '/tools/base64-encoder-decoder/',
    '/tools/base64-encoder-decoder/': '/tools/base64-encoder-decoder/',
    '/tools/hash-generator/': '/tools/hash-generator/',
    '/tools/hash-generator/': '/tools/hash-generator/',
    '/tools/nginx-generator/': '/tools/nginx-generator/',
    '/tools/nginx-generator/': '/tools/nginx-generator/',
    '/tools/url-encoder/': '/tools/url-encoder/',
    '/tools/url-encoder/': '/tools/url-encoder/',
    '/tools/hsts-gen/': '/tools/hsts-gen/',
    '/tools/hsts-gen/': '/tools/hsts-gen/',
    '/blog/edge-computing-guide/': '/blog/edge-computing-guide/',
    '/blog/edge-computing-guide/': '/blog/edge-computing-guide/',
    '/tools/robots-txt-toolkit/': '/tools/robots-txt-toolkit/',
    '/tools/robots-txt-toolkit/': '/tools/robots-txt-toolkit/',
    '/about/': '/about/',
    '/about/': '/about/',
    '/tools/schema-markup-generator/': '/tools/schema-markup-generator/',
    '/tools/schema-markup-generator/': '/tools/schema-markup-generator/',
    '/tools/rsa-key-gen/': '/tools/rsa-key-gen/',
    '/tools/rsa-key-gen/': '/tools/rsa-key-gen/',
    '/tools/meta-tag-generator/': '/tools/meta-tag-generator/',
    '/tools/meta-tag-generator/': '/tools/meta-tag-generator/',
    '/tools/markdown-html-converter/': '/tools/markdown-html-converter/',
    '/tools/markdown-html-converter/': '/tools/markdown-html-converter/',
    '/tools/schema-markup-generator/': '/tools/schema-markup-generator/',
    '/tools/schema-markup-generator/': '/tools/schema-markup-generator/'
};

console.log("=== Replacing Broken Internal Links ===");

let modifiedFiles = 0;

allFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    for (const [oldUrl, newUrl] of Object.entries(replacements)) {
        // Use a regex to match the exact URL, possibly with or without trailing slash
        // Be careful not to replace partial matches incorrectly.
        // E.g., replacing oldUrl when it is enclosed in quotes or parentheses.
        const regex = new RegExp(`href=["']${oldUrl}["']|\\(${oldUrl}\\)`, 'g');
        
        content = content.replace(regex, (match) => {
            return match.replace(oldUrl, newUrl);
        });
        
        // Also check absolute URLs
        const absOldUrl = 'https://wtkpro.site' + oldUrl;
        const absNewUrl = 'https://wtkpro.site' + newUrl;
        const regexAbs = new RegExp(`href=["']${absOldUrl}["']|\\(${absOldUrl}\\)`, 'g');
        content = content.replace(regexAbs, (match) => {
            return match.replace(absOldUrl, absNewUrl);
        });
        
        // Sometimes the URL is just inline text, though rare.
        // Wait, what if they just wrote it directly in markdown: [link text](/tools/...)
        // The regex `\(${oldUrl}\)` catches that.
    }

    if (content !== original) {
        fs.writeFileSync(file, content);
        console.log(`[FIXED] ${path.basename(file)}`);
        modifiedFiles++;
    }
});

console.log(`Done! Modified ${modifiedFiles} files.`);
