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
      
      // Update location
      content = content.replace(/Austin, TX/g, 'Lahore, Punjab');
      
      // Update dates on a few posts to stagger the history
      // We will backdate the first 15 files to 2025, and next 10 to 2024
      if (content.includes("date: '2026-")) {
        if (i < 10) {
          content = content.replace(/date: '2026-/g, "date: '2024-");
        } else if (i < 25) {
          content = content.replace(/date: '2026-/g, "date: '2025-");
        }
      }
      
      fs.writeFileSync(filePath, content, 'utf8');
      i++;
    }
  });
  console.log(`Successfully updated ${i} files.`);
});
