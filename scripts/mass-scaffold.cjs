const fs = require('fs');
const path = require('path');

const AUDIENCES = [
  "Beginners", "Web Developers", "Frontend Engineers", "Backend Developers", 
  "Data Scientists", "Product Managers", "UX Designers", "Students", 
  "Freelancers", "Agencies"
];

const SITUATIONS = [
  "in 2026", "for Free", "Offline", "Securely", "on Mac", 
  "on Windows", "in the Browser", "Without Plugins", "Quickly", 
  "for Enterprise"
];

const KEYWORDS = [
  { term: "JSON Formatter", cta: "/tools/json-formatter/", category: "Engineering", tag: "JSON" },
  { term: "CSS Gradient Generator", cta: "/tools/css-gradient-generator/", category: "Design", tag: "CSS" },
  { term: "Base64 Encoder", cta: "/tools/base64-encoder/", category: "Engineering", tag: "Encoding" },
  { term: "UUID Generator", cta: "/tools/uuid-generator/", category: "Engineering", tag: "UUID" },
  { term: "JWT Decoder", cta: "/tools/jwt-decoder/", category: "Engineering", tag: "JWT" }
];

const BLOG_DIR = path.join(__dirname, '../content/blog');
if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });

let baseDate = new Date();
baseDate.setDate(baseDate.getDate() + 1);
let postIndex = 0;

KEYWORDS.forEach(kw => {
  // Generate 51 variations for each keyword
  const titles = [`The Ultimate Guide to ${kw.term}`]; // The core guide
  
  // Matrix Generation (50 more)
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 10; j++) {
      if (i === 0) titles.push(`How to Master ${kw.term} ${SITUATIONS[j]}`);
      if (i === 1) titles.push(`The Best ${kw.term} for ${AUDIENCES[j]}`);
      if (i === 2) titles.push(`5 Fatal Mistakes with ${kw.term} (And How to Fix Them)`);
      if (i === 3) titles.push(`Why Every ${AUDIENCES[j]} Needs a Reliable ${kw.term}`);
      if (i === 4) titles.push(`${kw.term} vs. The Alternatives: Which is Better?`);
    }
  }

  // Ensure unique titles (Set removes duplicates if any)
  const uniqueTitles = [...new Set(titles)].slice(0, 51);

  uniqueTitles.forEach((title) => {
    let slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    
    let pubDate = new Date(baseDate);
    pubDate.setDate(baseDate.getDate() + postIndex);
    const dateString = pubDate.toISOString();

    const desc = `Everything you need to know about ${title.toLowerCase()}. Learn the top strategies, avoid common mistakes, and discover the best tools for the job.`;

    const mdxContent = `---
title: "${title}"
description: "${desc}"
date: "${dateString}"
lastUpdated: "${dateString}"
category: "${kw.category}"
tags: ["${kw.tag}", "Developer Tools", "Productivity"]
keywords: ["${kw.term.toLowerCase()}", "${kw.tag.toLowerCase()}"]
readTime: "4 min read"
author: "WebToolkit Pro Team"
image: "/images/blog/${slug}.png"
imageAlt: "${title}"
seoTitle: "${title} - WebToolkit Pro"
---

# Introduction
Welcome to our comprehensive guide on **${title}**. If you've been struggling with finding the right workflow for this, you're not alone.

In this post, we'll cover exactly what you need to know to optimize your workflow securely and efficiently.

## Why This Matters
For modern developers, efficiency and security are paramount. Using client-side tools ensures your data never leaves your browser. 

<div className="bg-blue-900/20 border border-blue-500/30 p-6 rounded-xl my-8">
  <h3 className="text-xl font-bold text-blue-400 mt-0">🚀 Recommended Tool</h3>
  <p className="text-gray-300">Need to get this done right now? Stop wasting time and use our free, secure, offline-first tool.</p>
  <a href="${kw.cta}" className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
    Open the ${kw.term} &rarr;
  </a>
</div>

## Best Practices
1. **Always use client-side tools:** Never send sensitive tokens or data to a remote server.
2. **Understand the spec:** Knowing the underlying format helps you debug faster.
3. **Use shortcuts:** Bookmark your most-used tools.

### AIO Checklist
<ul>
  <li>[x] Client-side processing only</li>
  <li>[x] No tracking cookies</li>
  <li>[ ] Easy to use interface</li>
</ul>

## Conclusion
We hope this guide helped you understand the nuances of the topic. Check back for more tutorials!
`;

    const filePath = path.join(BLOG_DIR, `${slug}.md`);
    fs.writeFileSync(filePath, mdxContent);
    postIndex++;
  });
});

console.log(`\n🎉 Successfully scaffolded ${postIndex} articles!`);
