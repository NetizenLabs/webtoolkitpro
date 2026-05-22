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
  'hreflang-generator': {
    seo: {
      title: 'Hreflang Tag Generator — International SEO Markup',
      description: 'Generate flawless hreflang tags for international SEO. Ensure Google serves the correct language and regional version of your website to global users.',
      keywords: ['hreflang generator', 'international seo tags', 'generate hreflang tags', 'multi language seo', 'x-default hreflang'],
      tldr: 'Generate strict `hreflang` tags to ensure Google serves the correct language to international users.',
      entity_definition: 'The Hreflang Tag Generator is an international SEO utility. When a website offers multiple language variations (e.g., English, Spanish) or regional variations (e.g., US English vs UK English), search engines can mistakenly flag them as duplicate content. The `<link rel="alternate" hreflang="x">` HTML attribute explicitly maps out these relationships. This tool generates the strict ISO 639-1 (language) and ISO 3166-1 alpha-2 (region) syntax required to ensure Google serves the correct URL to the correct user.'
    },
    faqs: [
      {
        question: 'What is the x-default tag?',
        answer: 'The `x-default` hreflang value is a fallback tag. It tells Google which URL to serve if the user\'s specific language or region does not match any of your other declared hreflang tags.'
      },
      {
        question: 'Do I need a self-referencing hreflang tag?',
        answer: 'Yes. It is a strict rule of international SEO that every page must include a self-referencing hreflang tag pointing to its own URL, in addition to the tags pointing to the alternate versions.'
      },
      {
        question: 'Can I use just the region code?',
        answer: 'No. You can use just a language code (e.g., `es` for Spanish worldwide), but if you specify a region, it MUST be preceded by a language code (e.g., `es-MX` for Spanish in Mexico).'
      }
    ]
  },
  'snippet-preview': {
    seo: {
      title: 'Google SERP Snippet Preview — SEO Simulator',
      description: 'Simulate how your web page will look on Google Search. Preview your Meta Title, Meta Description, and URL slug to maximize your Click-Through Rate (CTR).',
      keywords: ['serp snippet preview', 'google search simulator', 'preview meta tags', 'seo snippet tool', 'test google ranking appearance'],
      tldr: 'Simulate exactly how your web page will look on Google\'s Search Engine Results Page (SERP).',
      entity_definition: 'The Google SERP Snippet Preview is a Click-Through Rate (CTR) optimization utility. Before deploying a webpage, SEO professionals need to verify that their metadata is compelling and properly formatted. This tool simulates Google\'s proprietary CSS rendering engine, allowing marketers to input a Title, Description, and URL, and visually preview the exact blue link, green slug, and black text snippet that users will see on desktop and mobile search results.'
    },
    faqs: [
      {
        question: 'Why did Google change my title?',
        answer: 'Google\'s algorithm occasionally rewrites Meta Titles if it believes an H1 tag or anchor text better describes the page for a specific user query. However, writing a strong, relevant title tag minimizes this risk.'
      },
      {
        question: 'Does bold text in the snippet help SEO?',
        answer: 'When a user\'s search query matches words in your Meta Description, Google bolds those words in the snippet. This doesn\'t directly boost your rank, but the bold text draws the eye and significantly increases CTR.'
      },
      {
        question: 'How do I add a date to my snippet?',
        answer: 'Google automatically extracts publication dates from your HTML (using `<time>` tags or Article JSON-LD schema) and prepends them to the meta description for news and blog articles.'
      }
    ]
  },
  'heading-visualizer': {
    seo: {
      title: 'Heading Tag (H1-H6) Visualizer — Audit DOM Structure',
      description: 'Extract and visualize the H1-H6 heading structure of any webpage. Audit your content hierarchy for SEO and ensure strict accessibility compliance.',
      keywords: ['heading tag visualizer', 'h1 to h6 extractor', 'audit html headings', 'seo heading structure', 'check h1 tags'],
      tldr: 'Extract and visualize the nested H1-H6 heading hierarchy of any HTML document.',
      entity_definition: 'The Heading Tag Visualizer is a content architecture and accessibility utility. HTML headings (`<h1>` through `<h6>`) are the skeletal framework of a webpage, used by search engine crawlers to understand topical relevance, and by screen readers to navigate content. This tool parses a webpage\'s DOM, extracts all heading tags, and generates an indented visual outline. This allows SEOs to instantly identify missing H1s, skipped heading levels (e.g., jumping from H2 to H4), and keyword optimization opportunities.'
    },
    faqs: [
      {
        question: 'Can a page have multiple H1 tags?',
        answer: 'Technically yes, HTML5 allows it. However, the overwhelming consensus among SEO professionals is to strictly use one H1 tag per page to clearly define the primary topic for Googlebot.'
      },
      {
        question: 'Do heading tags impact SEO?',
        answer: 'Yes. Keywords placed in `<h1>` and `<h2>` tags carry significantly more semantic weight than regular paragraph text. They are a primary signal Google uses to understand page context.'
      },
      {
        question: 'Why shouldn\'t I skip heading levels?',
        answer: 'Skipping levels (like placing an H4 directly under an H2) breaks the logical hierarchy. This is considered a critical error for Web Accessibility (WCAG) because it confuses blind users navigating via screen readers.'
      }
    ]
  },
  'og-debugger': {
    seo: {
      title: 'Open Graph (OG) Debugger — Generate Social Tags',
      description: 'Generate and debug Open Graph (og:) meta tags. Ensure your webpage looks perfect when shared on Facebook, LinkedIn, Discord, and Slack.',
      keywords: ['open graph debugger', 'generate og tags', 'facebook share debugger', 'linkedin link preview', 'og:image generator'],
      tldr: 'Generate and validate Open Graph meta tags to ensure beautiful link previews on social media.',
      entity_definition: 'The Open Graph (OG) Debugger is a social media optimization utility. Developed originally by Facebook, the Open Graph protocol transforms web pages into rich objects in a social graph. When a user pastes a URL into Facebook, LinkedIn, or Discord, the platform scrapes the page for specific `<meta property="og:...">` tags to construct the preview card. This tool generates the exact HTML syntax required for `og:title`, `og:image`, and `og:description` to maximize social engagement.'
    },
    faqs: [
      {
        question: 'What is the optimal og:image size?',
        answer: 'For the best display across all platforms (Facebook, LinkedIn, Discord), your `og:image` should be 1200 x 630 pixels, which is a 1.91:1 aspect ratio.'
      },
      {
        question: 'Why isn\'t Facebook updating my preview?',
        answer: 'Facebook heavily caches Open Graph data. If you update your `og:image`, you must use the official Facebook Sharing Debugger tool to manually force Facebook to scrape your URL again.'
      },
      {
        question: 'Does Open Graph impact Google SEO?',
        answer: 'Not directly. Google\'s core algorithm does not use OG tags for web search rankings. However, beautiful OG cards increase social shares and traffic, which are positive indirect signals.'
      }
    ]
  },
  'twitter-card-gen': {
    seo: {
      title: 'Twitter Card Generator — Optimize X/Twitter Links',
      description: 'Generate Twitter Card meta tags for your website. Optimize your link previews with large images and compelling descriptions to drive massive traffic from X.',
      keywords: ['twitter card generator', 'x link preview', 'twitter meta tags', 'twitter:image size', 'generate twitter summary card'],
      tldr: 'Generate Twitter Card meta tags to ensure massive, eye-catching link previews on X/Twitter.',
      entity_definition: 'The Twitter Card Generator is a social engagement utility tailored for X (formerly Twitter). While X supports basic Open Graph tags, it utilizes its own proprietary `<meta name="twitter:...">` properties to render rich media embeds in the timeline. This tool allows developers to select a card type (usually `summary_large_image`) and generates the precise HTML markup required to transform a standard text link into a massive, clickable image card that dominates the timeline.'
    },
    faqs: [
      {
        question: 'What is a summary_large_image card?',
        answer: 'It is the most popular Twitter Card type. Instead of a small thumbnail, it displays a massive, full-width image spanning the entire tweet column, resulting in drastically higher click-through rates.'
      },
      {
        question: 'What size should a Twitter Card image be?',
        answer: 'For a `summary_large_image` card, X recommends an image of exactly 1200 x 675 pixels (a 16:9 aspect ratio) to prevent awkward cropping.'
      },
      {
        question: 'Will Twitter fall back to Open Graph?',
        answer: 'Yes. If you don\'t define specific `twitter:title` or `twitter:description` tags, Twitter will look for `og:title` and `og:description`. However, you MUST explicitly define the `twitter:card` type for the preview to render.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 28');
