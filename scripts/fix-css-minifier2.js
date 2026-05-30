const fs = require('fs');
const p = 'components/tools/instances/CssFormatterMinifier.tsx';
let txt = fs.readFileSync(p, 'utf8');

// The file currently has: .replace(/\\\\/\\\\*.*?\\\\*\\\\//g, '')
txt = txt.split('.replace(/\\\\/\\\\*.*?\\\\*\\\\//g, \\'\\')').join('.replace(/\\\\/\\\\*.*?\\\\*\\\\//g, \\'\\')');

// Actually, let me just hardcode the entire text to replace.
const badCode = `      // Basic CSS formatting logic
      let formatted = input
        .replace(/\\\\s+/g, ' ')
        .replace(/{\\\\s*/g, ' {\\\\n  ')
        .replace(/;\\\\s*/g, ';\\\\n  ')
        .replace(/, /g, ',\\\\n  ')
        .replace(/}\\\\s*/g, '}\\\\n\\\\n')
        .replace(/\\\\n  }/g, '\\\\n}')
        .trim()
      
      setOutput(formatted)
      updateStats(input, formatted)
    } catch (e: any) {
      setError('Error formatting CSS')
    }
  }

  const minifyCSS = () => {
    try {
      setError(null)
      if (!input.trim()) return
      
      // Basic CSS minification logic
      let minified = input
        .replace(/\\\\/\\\\*.*?\\\\*\\\\//g, '') // remove comments
        .replace(/\\\\s+/g, ' ')           // collapse whitespace
        .replace(/\\\\s*{\\\\s*/g, '{')      // remove whitespace around {
        .replace(/\\\\s*}\\\\s*/g, '}')      // remove whitespace around }
        .replace(/\\\\s*;\\\\s*/g, ';')      // remove whitespace around ;
        .replace(/\\\\s*:\\\\s*/g, ':')      // remove whitespace around :
        .replace(/;}/g, '}')             // remove trailing semicolon
        .trim()`;

const goodCode = `      // Basic CSS formatting logic
      let formatted = input
        .replace(/\\s+/g, ' ')
        .replace(/{\\s*/g, ' {\\n  ')
        .replace(/;\\s*/g, ';\\n  ')
        .replace(/, /g, ',\\n  ')
        .replace(/}\\s*/g, '}\\n\\n')
        .replace(/\\n  }/g, '\\n}')
        .trim()
      
      setOutput(formatted)
      updateStats(input, formatted)
    } catch (e: any) {
      setError('Error formatting CSS')
    }
  }

  const minifyCSS = () => {
    try {
      setError(null)
      if (!input.trim()) return
      
      // Basic CSS minification logic
      let minified = input
        .replace(/\\/\\*.*?\\*\\//g, '') // remove comments
        .replace(/\\s+/g, ' ')           // collapse whitespace
        .replace(/\\s*{\\s*/g, '{')      // remove whitespace around {
        .replace(/\\s*}\\s*/g, '}')      // remove whitespace around }
        .replace(/\\s*;\\s*/g, ';')      // remove whitespace around ;
        .replace(/\\s*:\\s*/g, ':')      // remove whitespace around :
        .replace(/;}/g, '}')             // remove trailing semicolon
        .trim()`;

txt = txt.replace(badCode, goodCode);
fs.writeFileSync(p, txt, 'utf8');
console.log('Fixed CSS minifier.');
