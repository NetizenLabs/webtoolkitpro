const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'config', 'tools.yaml');
const fileContent = fs.readFileSync(filePath, 'utf8');

const lines = fileContent.split('\n');
let modifiedCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // If we find an 'answer' line that starts with a dash '- answer:' and is at the same indentation level as a question block:
  // e.g., '        - answer:' instead of '          answer:'
  if (line.match(/^\s+-\s+answer:/)) {
    // Check if the previous line (excluding empty lines) was a question
    let prevIndex = i - 1;
    while (prevIndex >= 0 && lines[prevIndex].trim() === '') {
      prevIndex--;
    }
    
    if (prevIndex >= 0 && lines[prevIndex].includes('- question:')) {
      // Replace '        - answer:' with '          answer:' (preserving the exact indentation)
      const indentMatch = line.match(/^(\s+)-\s+answer:/);
      if (indentMatch) {
        const indent = indentMatch[1];
        // Calculate the new indent level: length of original indent + 2 spaces to align with 'question' inside the block
        const newIndent = ' '.repeat(indent.length + 2);
        lines[i] = line.replace(/^\s+-\s+answer:/, `${newIndent}answer:`);
        modifiedCount++;
      }
    }
  }
}

if (modifiedCount > 0) {
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
  console.log(`Successfully fixed ${modifiedCount} FAQ formatting errors in config/tools.yaml!`);
} else {
  console.log('No FAQ formatting errors found that could be fixed.');
}
