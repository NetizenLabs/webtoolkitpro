const fs = require('fs');
const html = fs.readFileSync('../temp.html', 'utf8');

// Find all meta tags
const metaTags = html.match(/<meta[^>]+>/g);
metaTags.forEach(tag => {
    if (tag.toLowerCase().includes('description')) {
        console.log(tag);
        console.log("Length of content:", tag.match(/content="([^"]*)"/)?.[1].length);
    }
});
