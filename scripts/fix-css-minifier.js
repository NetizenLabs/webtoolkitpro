const fs = require('fs');
const p = 'components/tools/instances/CssFormatterMinifier.tsx';
let txt = fs.readFileSync(p, 'utf8');
txt = txt.replace(/\\/\\\\\\/\\\\\\*\\.\\*\\?\\\\\\*\\\\\\/\\//g, '/\\\\/\\\\*.*?\\\\*\\\\//');
// Let's just fix all of them correctly
txt = txt.replace(/replace\\(\\/\\\\\\\\s\\+\\/g/g, 'replace(/\\\\s+/g');
txt = txt.replace(/replace\\(\\/\\\\\\\\s\\*\\{\\\\\\\\s\\*\\/g/g, 'replace(/\\\\s*\\{\\\\s*/g');
// This is getting complicated with regex, let's just do literal replacements.
