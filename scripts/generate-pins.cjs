const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const BLOG_IMAGES_DIR = path.join(__dirname, '../public/images/blog');
const PINS_IMAGES_DIR = path.join(__dirname, '../public/images/pins');
const PINS_DATA_FILE = path.join(__dirname, 'pins-data.json');

if (!fs.existsSync(BLOG_IMAGES_DIR)) fs.mkdirSync(BLOG_IMAGES_DIR, { recursive: true });
if (!fs.existsSync(PINS_IMAGES_DIR)) fs.mkdirSync(PINS_IMAGES_DIR, { recursive: true });

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for(let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = context.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
}

// Visual Templates
const TEMPLATES = [
  // 1: Developer Dark Mode
  { bg: '#0D1117', text: '#E6EDF3', accent: '#58A6FF', hook: 'DEVELOPER TIPS \u2193' },
  // 2: Cyberpunk Neon
  { bg: '#0A0A0A', text: '#FFFFFF', accent: '#00FF41', hook: 'SAVE THIS WORKFLOW \u2193' },
  // 3: Minimalist Light
  { bg: '#F6F8FA', text: '#24292F', accent: '#0969DA', hook: 'STOP DOING THIS \u2193' },
  // 4: Purple Terminal
  { bg: '#1E1E3F', text: '#FFFFFF', accent: '#FF9E64', hook: 'CODING SECRETS \u2193' },
  // 5: High Contrast Monospace
  { bg: '#000000', text: '#FFFFFF', accent: '#F5F5F5', hook: 'THE ULTIMATE GUIDE \u2193' }
];

function generateCover(title, slug, template) {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');
  
  ctx.fillStyle = template.bg;
  ctx.fillRect(0, 0, 1200, 630);
  
  ctx.beginPath();
  ctx.arc(1100, 100, 300, 0, Math.PI * 2, false);
  ctx.fillStyle = template.accent + '22'; // 22 hex alpha
  ctx.fill();

  ctx.font = 'bold 30px sans-serif';
  ctx.fillStyle = template.accent; 
  ctx.fillText('WEBTOOLKIT PRO', 80, 100);

  ctx.font = 'bold 70px sans-serif';
  ctx.fillStyle = template.text;
  wrapText(ctx, title, 80, 240, 1000, 90);

  ctx.font = '30px monospace';
  ctx.fillStyle = template.accent;
  ctx.fillText('wtkpro.site', 80, 570);

  const outPath = path.join(BLOG_IMAGES_DIR, `${slug}.png`);
  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
}

function generatePin(title, slug, variationIndex) {
  const canvas = createCanvas(1000, 1500);
  const ctx = canvas.getContext('2d');
  
  // Pick template based on slug hash or just random-ish (slug length modulo 5) + variationIndex
  const templateIdx = (slug.length + variationIndex) % TEMPLATES.length;
  const style = TEMPLATES[templateIdx];
  
  ctx.fillStyle = style.bg;
  ctx.fillRect(0, 0, 1000, 1500);
  
  // Design Elements
  ctx.fillStyle = style.accent;
  ctx.fillRect(40, 40, 920, 1420);
  ctx.fillStyle = style.bg;
  ctx.fillRect(50, 50, 900, 1400);
  
  // Top Hook
  ctx.font = 'bold 35px monospace';
  ctx.fillStyle = style.accent;
  ctx.textAlign = 'center';
  ctx.fillText(style.hook, 500, 200);

  // Main Title
  ctx.font = 'bold 80px sans-serif';
  ctx.fillStyle = style.text;
  ctx.textAlign = 'center';
  
  const words = title.split(' ');
  let line = '';
  let y = 500;
  for(let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > 800 && n > 0) {
      ctx.fillText(line, 500, y);
      line = words[n] + ' ';
      y += 100;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 500, y);

  // Bottom Branding
  ctx.font = 'bold 40px sans-serif';
  ctx.fillStyle = style.text;
  ctx.fillText('wtkpro.site', 500, 1300);

  const filename = `${slug}-v${variationIndex + 1}.png`;
  const outPath = path.join(PINS_IMAGES_DIR, filename);
  fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
  
  return filename;
}

async function run() {
  console.log("Reading generated markdown files...");
  const files = fs.readdirSync(path.join(__dirname, '../content/blog'))
    .filter(f => f.endsWith('.md'));

  let pinsData = [];
  if (fs.existsSync(PINS_DATA_FILE)) {
    pinsData = JSON.parse(fs.readFileSync(PINS_DATA_FILE, 'utf8'));
  }

  let index = 0;
  for (const file of files) {
    const slug = file.replace('.md', '');
    const content = fs.readFileSync(path.join(__dirname, '../content/blog', file), 'utf8');
    
    // Extract Title using basic regex from frontmatter
    const titleMatch = content.match(/title:\s*"([^"]+)"/);
    if (!titleMatch) continue;
    const title = titleMatch[1];

    const link = `https://wtkpro.site/blog/${slug}`;
    const template = TEMPLATES[index % TEMPLATES.length];

    generateCover(title, slug, template);

    for (let i = 0; i < 3; i++) {
      const pinFilename = generatePin(title, slug, i);
      
      const tags = "#webdev #programming #coding #developer #javascript #wtkpro";
      let desc = `Discover the ultimate guide to ${title}. Secure, offline-first developer tools. Click through to read!\n\n${tags}`;
      if (i === 1) desc = `Stop wasting time. Here is the best workflow for ${title}.\n\n${tags}`;
      if (i === 2) desc = `Everything developers need to know about ${title}. Save this pin!\n\n${tags}`;
      
      pinsData.push({
        filename: pinFilename,
        title: title,
        description: desc,
        link: link,
        status: "pending",
        postedAt: null
      });
    }

    index++;
    if (index % 10 === 0) console.log(`Generated ${index * 3} pins and ${index} covers...`);
  }

  fs.writeFileSync(PINS_DATA_FILE, JSON.stringify(pinsData, null, 2));
  console.log(`✅ Successfully generated ${index} Cover Images and ${index * 3} Pinterest Pins!`);
}

run();
