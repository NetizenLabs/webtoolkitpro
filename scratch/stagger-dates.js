const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '..', 'content', 'blog');
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md') && f !== '_template.md');

// Generate a random date between Jan 1, 2026 and May 26, 2026
function getRandomDate() {
    const start = new Date('2026-01-01').getTime();
    const end = new Date('2026-05-26').getTime();
    const randomTime = start + Math.random() * (end - start);
    return new Date(randomTime).toISOString().split('T')[0];
}

let modifiedCount = 0;

files.forEach(file => {
    const filePath = path.join(blogDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace date field in frontmatter
    // Matches date: 'YYYY-MM-DD' or date: "YYYY-MM-DD" or date: YYYY-MM-DD
    const newDate = getRandomDate();
    const updatedContent = content.replace(/^date:\s*['"]?\d{4}-\d{2}-\d{2}['"]?/m, `date: '${newDate}'`);

    if (content !== updatedContent) {
        fs.writeFileSync(filePath, updatedContent);
        modifiedCount++;
    }
});

console.log(`Successfully staggered dates for ${modifiedCount} blog posts.`);
