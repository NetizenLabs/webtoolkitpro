const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const filePath = path.join(__dirname, '..', 'config', 'tools.yaml');
const fileContents = fs.readFileSync(filePath, 'utf8');

// We want to detect the YAML block for faq and see how they are structured
// Let's load the YAML to see the parsed data
const data = yaml.load(fileContents);

let totalErrors = 0;
data.tools.forEach(tool => {
  if (tool.content && tool.content.faq) {
    const faq = tool.content.faq;
    faq.forEach((item, index) => {
      if (item.question && !item.answer) {
        console.error(`Tool: ${tool.slug} - FAQ item ${index} has question but no answer: "${item.question}"`);
        totalErrors++;
      }
      if (item.answer && !item.question) {
        console.error(`Tool: ${tool.slug} - FAQ item ${index} has answer but no question: "${item.answer}"`);
        totalErrors++;
      }
    });
  }
});

console.log(`Total FAQ formatting errors found: ${totalErrors}`);
