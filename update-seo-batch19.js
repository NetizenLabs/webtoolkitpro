const fs = require('fs');
const yaml = require('js-yaml');

const path = 'config/tools.yaml';
let doc;
try {
  doc = yaml.load(fs.readFileSync(path, 'utf8'));
} catch (e) {
  console.error('Error loading YAML:', e);
  process.exit(1);
}

const updates = {
  'cdn-readiness-tester': {
    seo: {
      title: 'CDN Readiness Tester — Analyze Edge Cache Headers',
      description: 'Test any URL to verify if it is being properly served by a Content Delivery Network (CDN). Check for Cache-Control, Brotli compression, and X-Cache headers.',
      keywords: ['cdn tester', 'check cdn', 'x-cache header', 'cloudflare cache check', 'edge cache tester', 'brotli check'],
      tldr: 'Instantly verify if your website is properly caching assets on a CDN edge network.',
      entity_definition: 'The CDN Readiness Tester is a network analysis utility designed for DevOps and Web Performance engineers. A Content Delivery Network (CDN) like Cloudflare or Vercel drastically improves page load times by caching assets on servers physically closer to the user. This tool acts as an HTTP client, making a cross-origin request to your domain to extract and analyze critical HTTP response headers (such as `x-cache`, `cf-cache-status`, and `content-encoding`), definitively proving whether your server is successfully offloading traffic to the edge.'
    },
    faqs: [
      {
        question: 'What does X-Cache: HIT mean?',
        answer: 'A `HIT` indicates that the CDN successfully served the file from its edge cache without having to query your origin server. A `MISS` means the CDN had to fetch the file from your origin, slowing down the request.'
      },
      {
        question: 'Why is Brotli compression important?',
        answer: 'Brotli (`br`) is a modern compression algorithm developed by Google that reduces file sizes by roughly 15-20% more than legacy GZIP, significantly improving your Core Web Vitals.'
      },
      {
        question: 'Does this tool check Cloudflare?',
        answer: 'Yes! The tool specifically looks for standard CDN headers, including `cf-cache-status` (Cloudflare), `x-vercel-cache` (Vercel), and standard `x-cache` (AWS CloudFront / Fastly).'
      }
    ]
  },
  'core-web-vitals-guide': {
    seo: {
      title: 'Core Web Vitals Guide — LCP, INP, and CLS Explained',
      description: 'An interactive guide to Google\'s Core Web Vitals. Learn how to diagnose and fix poor Largest Contentful Paint (LCP), INP, and Cumulative Layout Shifts (CLS).',
      keywords: ['core web vitals', 'improve lcp', 'fix cls', 'interaction to next paint', 'google pagespeed guide'],
      tldr: 'An interactive developer handbook for understanding and fixing Core Web Vitals.',
      entity_definition: 'The Core Web Vitals Guide is an educational reference utility for technical SEO. Introduced by Google in 2020, Core Web Vitals are a subset of performance metrics strictly tied to user experience and search engine ranking. The three pillars—Largest Contentful Paint (LCP, measuring loading speed), Interaction to Next Paint (INP, measuring responsiveness), and Cumulative Layout Shift (CLS, measuring visual stability)—require specific front-end engineering techniques (like preloading and asynchronous JavaScript) to optimize.'
    },
    faqs: [
      {
        question: 'What is a good LCP score?',
        answer: 'Google defines a "Good" Largest Contentful Paint as occurring within 2.5 seconds of the page starting to load. Anything over 4.0 seconds is considered "Poor".'
      },
      {
        question: 'How do I fix a bad CLS score?',
        answer: 'Cumulative Layout Shift usually happens when images load without explicit width and height attributes, causing the text to jump around. Always define dimensions for media and ads.'
      },
      {
        question: 'What replaced First Input Delay (FID)?',
        answer: 'Interaction to Next Paint (INP) officially replaced FID in March 2024. INP is a much stricter metric that measures the latency of *all* user interactions on a page, not just the first one.'
      }
    ]
  },
  'robots-txt-templates': {
    seo: {
      title: 'Robots.txt Templates — Pre-configured SEO Rules',
      description: 'Copy pre-configured robots.txt templates for Next.js, WordPress, and E-commerce. Instantly block AI crawlers, secure admin panels, and submit XML sitemaps.',
      keywords: ['robots.txt generator', 'wordpress robots.txt', 'block ai crawlers', 'robots.txt template', 'nextjs robots.txt'],
      tldr: 'One-click robots.txt templates optimized for modern frameworks and CMS platforms.',
      entity_definition: 'The Robots.txt Templates tool is a configuration utility for Webmasters. The `robots.txt` file is a standard plaintext file hosted at the root of a domain that issues directives to web crawlers (like Googlebot). Our tool provides framework-specific templates that utilize precise `Allow` and `Disallow` directives to prevent search engines from indexing sensitive routes (like `/wp-admin/` or `/cart/`), while simultaneously outlining rules to block automated AI scraping bots (like `GPTBot`).'
    },
    faqs: [
      {
        question: 'Does robots.txt actually secure my site?',
        answer: 'No. `robots.txt` is purely an "honor system" for legitimate search engines. Malicious bots will ignore it. Never use it to hide sensitive passwords or private user data.'
      },
      {
        question: 'How do I block ChatGPT and AI scrapers?',
        answer: 'You can explicitly block them by declaring their user-agents. Our templates include snippets like `User-agent: GPTBot \n Disallow: /` to prevent OpenAI from scraping your site.'
      },
      {
        question: 'Where do I put my sitemap?',
        answer: 'It is a best practice to define the absolute URL of your XML sitemap at the very bottom of your `robots.txt` file (e.g., `Sitemap: https://yoursite.com/sitemap.xml`).'
      }
    ]
  },
  'seo-audit-checklist': {
    seo: {
      title: 'Technical SEO Audit Checklist — Interactive Tracker',
      description: 'A comprehensive, interactive Technical SEO checklist for web developers. Track your progress across Indexing, Core Web Vitals, On-Page SEO, and Security.',
      keywords: ['seo checklist', 'technical seo audit', 'seo developer guide', 'on page seo checklist', 'website launch checklist'],
      tldr: 'An interactive, locally-saved technical SEO checklist for your next website launch.',
      entity_definition: 'The Technical SEO Audit Checklist is a project management utility for webmaster compliance. Launching a website requires orchestrating dozens of hidden meta tags, indexing rules, and performance optimizations. This tool acts as an interactive state-machine, categorizing critical technical requirements (from JSON-LD structured data to Canonical Tags) and saving your progress locally to `localStorage`, allowing developers to methodically track compliance before deploying to production.'
    },
    faqs: [
      {
        question: 'Does this tool scan my website automatically?',
        answer: 'No, this is a manual checklist designed for developers to use as a project management tool during the staging and pre-launch phases of development.'
      },
      {
        question: 'Is my progress saved if I close the tab?',
        answer: 'Yes! The checklist utilizes your browser\'s native `localStorage` API to automatically save your checkmarks. You can return days later and your progress will still be there.'
      },
      {
        question: 'Can I export the checklist for my team?',
        answer: 'Yes, there is a one-click export button that converts your current progress into formatted Markdown, perfect for pasting into GitHub Issues, Jira, or Notion.'
      }
    ]
  },
  'social-preview-tester': {
    seo: {
      title: 'Social Media Preview Tester — Check Open Graph Tags',
      description: 'Test how your website looks when shared on Facebook, Twitter, and LinkedIn. Fetch and preview your Open Graph (og:image) meta tags instantly.',
      keywords: ['social preview tester', 'open graph checker', 'twitter card validator', 'og image tester', 'check link preview'],
      tldr: 'Instantly visualize how your URLs will look when shared on social media.',
      entity_definition: 'The Social Media Preview Tester is a metadata visualization utility. When a URL is shared on platforms like Twitter or Facebook, those platforms scrape the HTML `<head>` for Open Graph (`og:`) and Twitter Card meta tags to render a visual card. This tool acts as a proxy scraper, making a backend request to fetch a target URL\'s metadata, and then client-side rendering pixel-perfect UI mockups of exactly how the link will appear on various social feeds.'
    },
    faqs: [
      {
        question: 'Why doesn\'t my image show up?',
        answer: 'Ensure your HTML includes a valid `<meta property="og:image" content="https://.../image.jpg">` tag, and verify that the image URL is absolute (includes https), not a relative path.'
      },
      {
        question: 'What is the best size for an Open Graph image?',
        answer: 'The industry standard is 1200 x 630 pixels. This aspect ratio (1.91:1) looks perfect across Facebook, Twitter, and LinkedIn.'
      },
      {
        question: 'Will this tool cache my results?',
        answer: 'No. Our proxy server fetches the live HTML directly from your URL every time you click "Fetch," making it perfect for real-time debugging during development.'
      }
    ]
  }
};

let updatedCount = 0;
doc.tools.forEach(tool => {
  if (updates[tool.slug]) {
    const data = updates[tool.slug];
    tool.seo = tool.seo || {};
    tool.seo.title = data.seo.title;
    tool.seo.description = data.seo.description;
    tool.seo.keywords = data.seo.keywords;
    tool.seo.tldr = data.seo.tldr;
    tool.seo.entity_definition = data.seo.entity_definition;
    
    // Add FAQs
    tool.faqs = data.faqs;
    updatedCount++;
  }
});

fs.writeFileSync(path, yaml.dump(doc, { lineWidth: -1 }), 'utf8');
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 19');
