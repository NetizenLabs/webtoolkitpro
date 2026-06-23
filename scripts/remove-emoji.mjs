import fs from 'fs';
import path from 'path';

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

function run() {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
  let updatedCount = 0;

  for (const file of files) {
    const filepath = path.join(BLOG_DIR, file);
    let content = fs.readFileSync(filepath, 'utf-8');
    
    if (content.includes('🚀 Recommended Tool')) {
      content = content.replace(/🚀 Recommended Tool/g, 'Recommended Tool');
      fs.writeFileSync(filepath, content, 'utf-8');
      updatedCount++;
    }
  }

  console.log(`Successfully removed the rocket emoji from ${updatedCount} files.`);
}

run();
