const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'content', 'blog');

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  } 
  
  let i = 0;
  
  files.forEach((file) => {
    if (file.endsWith('.md')) {
      const filePath = path.join(directoryPath, file);
      let content = fs.readFileSync(filePath, 'utf8');
      
      // We will replace any 2024, 2025, or 2026 dates with a staggered date in May 2026
      // Generating a day between 01 and 23
      const day = String((i % 23) + 1).padStart(2, '0'); 
      const newDate = `2026-05-${day}`;
      
      content = content.replace(/date: '202[456]-\d{2}-\d{2}'/g, `date: '${newDate}'`);
      
      fs.writeFileSync(filePath, content, 'utf8');
      i++;
    }
  });
  console.log(`Successfully reverted dates on ${i} files to May 2026.`);
});
