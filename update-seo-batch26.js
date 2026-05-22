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
  'dom-analyzer': {
    seo: {
      title: 'DOM Depth Analyzer — Check HTML Node Complexity',
      description: 'Analyze your HTML Document Object Model (DOM) depth and node count. Identify overly complex nested structures that slow down rendering and harm Core Web Vitals.',
      keywords: ['dom depth analyzer', 'check html node count', 'dom size checker', 'reduce dom size', 'html complexity analyzer'],
      tldr: 'Analyze your HTML code to detect excessive DOM depth and overly nested nodes.',
      entity_definition: 'The DOM Depth Analyzer is a frontend performance utility. The Document Object Model (DOM) is the structural tree browsers use to render HTML. According to Google Lighthouse, an excessive DOM size (over 1,500 nodes) or deep nesting (over 32 levels) exponentially increases the memory and CPU required for layout calculations. This tool parses raw HTML to count total nodes and calculate maximum nesting depth, helping developers identify "div soup" and optimize rendering speed.'
    },
    faqs: [
      {
        question: 'What is a good DOM size?',
        answer: 'Google recommends keeping your total DOM node count below 1,500, with a maximum depth of 32 elements, and no parent node containing more than 60 child nodes.'
      },
      {
        question: 'Why does a large DOM slow down the page?',
        answer: 'Every time JavaScript modifies a node, or CSS changes a layout property, the browser must recalculate the styles and positions of the entire DOM tree. A larger tree means more CPU work, causing visual lag.'
      },
      {
        question: 'How do I fix excessive DOM depth?',
        answer: 'Remove unnecessary wrapper `<div>` tags, use CSS Grid/Flexbox instead of nested layout divs, and implement "virtualization" (or lazy rendering) for long lists of data.'
      }
    ]
  },
  'meta-length-checker': {
    seo: {
      title: 'Meta Title & Description Length Checker',
      description: 'Check your SEO meta titles and descriptions for pixel length. Ensure your snippets look perfect on Google Search results without getting truncated.',
      keywords: ['meta length checker', 'seo title pixel length', 'meta description character count', 'google snippet preview', 'seo meta tags checker'],
      tldr: 'Verify your Meta Title and Description lengths to prevent truncation in Google Search.',
      entity_definition: 'The Meta Length Checker is an on-page SEO utility. Search engines like Google truncate (cut off) `<title>` and `<meta name="description">` tags that are too long. Because different characters have different widths (e.g., a "W" is wider than an "i"), truncation is based on pixel width rather than raw character count. This tool simulates Google\'s desktop and mobile Search Engine Results Page (SERP) rendering engine to calculate exact pixel lengths and ensure your copy fits perfectly.'
    },
    faqs: [
      {
        question: 'What is the optimal Meta Title length?',
        answer: 'Google typically displays the first 50–60 characters of a title tag. In pixel terms, aim to keep your title under 600 pixels to avoid the ellipsis (...) truncation.'
      },
      {
        question: 'What is the optimal Meta Description length?',
        answer: 'Meta descriptions should generally be between 150–160 characters (up to 960 pixels on desktop). On mobile, Google often truncates them earlier, around 120 characters.'
      },
      {
        question: 'Does truncation hurt SEO rankings?',
        answer: 'Truncation itself does not cause a direct penalty, but a cut-off title can reduce your Click-Through Rate (CTR). Lower CTRs signal to Google that your page might not be relevant, which can eventually lower your rank.'
      }
    ]
  },
  'alt-text-audit': {
    seo: {
      title: 'Image Alt-Text Auditor — SEO & Accessibility Checker',
      description: 'Audit your HTML images for missing or poorly optimized alt text. Improve your website\'s accessibility for screen readers and boost your Google Image Search rankings.',
      keywords: ['alt text auditor', 'check image alt tags', 'missing alt text checker', 'image seo tool', 'accessibility alt text scanner'],
      tldr: 'Scan HTML code to identify missing or poorly written image alt-text attributes.',
      entity_definition: 'The Image Alt-Text Auditor is an accessibility and SEO diagnostic tool. The `alt` attribute inside an `<img>` tag provides a textual alternative to visual content. This is legally required for ADA compliance (so screen readers can describe images to visually impaired users) and is a primary ranking factor for Google Image Search. This tool parses an HTML block, extracting all image tags to flag missing attributes, redundant phrases (like "picture of"), or keyword stuffing.'
    },
    faqs: [
      {
        question: 'Is alt text mandatory?',
        answer: 'Yes. For web accessibility (WCAG) compliance, every `<img>` tag must have an `alt` attribute. If the image is purely decorative, you must include an empty attribute (`alt=""`) so screen readers know to skip it.'
      },
      {
        question: 'Should I include keywords in my alt text?',
        answer: 'Yes, but naturally. Write a descriptive sentence of the image\'s content for a blind user. If your target keyword naturally fits the description, include it. Never "keyword stuff" a list of words.'
      },
      {
        question: 'Why avoid phrases like "image of"?',
        answer: 'Screen readers automatically announce "Image:" before reading the alt text. Writing "image of a dog" results in the software awkwardly saying "Image: image of a dog."'
      }
    ]
  },
  'breadcrumb-schema': {
    seo: {
      title: 'Breadcrumb Schema Generator — JSON-LD SEO Output',
      description: 'Generate standard JSON-LD BreadcrumbList schema markup. Help Google understand your site structure and display rich breadcrumb navigation in search results.',
      keywords: ['breadcrumb schema generator', 'json-ld breadcrumb list', 'seo breadcrumb markup', 'generate rich snippets', 'google breadcrumb schema'],
      tldr: 'Generate structured JSON-LD BreadcrumbList markup to secure rich snippets in Google.',
      entity_definition: 'The Breadcrumb Schema Generator is a structured data utility. A breadcrumb trail indicates a page\'s position in the site hierarchy. By embedding `BreadcrumbList` JSON-LD schema into your HTML, you explicitly feed this hierarchy to search engine crawlers. This tool allows SEOs to input URL paths and automatically outputs the strict, error-free JSON-LD code required by Google to display rich, clickable breadcrumb navigation directly in the SERP.'
    },
    faqs: [
      {
        question: 'What is JSON-LD?',
        answer: 'JavaScript Object Notation for Linked Data (JSON-LD) is a lightweight Linked Data format. It is Google\'s officially recommended method for embedding structured data markup on web pages.'
      },
      {
        question: 'Do breadcrumbs improve SEO?',
        answer: 'Yes. They drastically improve the crawler\'s understanding of your site architecture and internal linking. Rich breadcrumbs in the SERP also take up more visual real estate, improving Click-Through Rates (CTR).'
      },
      {
        question: 'Where should I put the JSON-LD code?',
        answer: 'You should place the generated `<script type="application/ld+json">` block within the `<head>` section of your HTML document, though placing it right before the closing `</body>` tag is also valid.'
      }
    ]
  },
  'robots-validator': {
    seo: {
      title: 'Robots.txt Validator — Check Crawler Directives',
      description: 'Validate your robots.txt file syntax and test whether specific URLs are blocked by Disallow directives. Ensure Googlebot can crawl your site effectively.',
      keywords: ['robots.txt validator', 'test robots txt', 'check blocked urls', 'googlebot simulator', 'robots syntax checker'],
      tldr: 'Validate robots.txt syntax and test whether your URLs are blocked from search engines.',
      entity_definition: 'The Robots.txt Validator is a search engine crawling utility. The `robots.txt` file sits at the root of a domain and dictates which paths automated web crawlers (like Googlebot) are allowed to access via the standard Robots Exclusion Protocol. This tool parses the text file, validates the syntax of `User-agent`, `Allow`, and `Disallow` directives, and simulates a crawl against a target URL to verify if the path is permitted or blocked by the ruleset.'
    },
    faqs: [
      {
        question: 'Does robots.txt hide a page from Google?',
        answer: 'No. `Disallow` stops Google from *crawling* the page content, but the URL can still appear in search results (usually without a description) if other sites link to it. Use a `noindex` meta tag to actually hide a page.'
      },
      {
        question: 'What does User-agent: * mean?',
        answer: 'The asterisk is a wildcard. It means the directives that follow apply to every automated crawler on the internet (Googlebot, Bingbot, Ahrefs, etc.).'
      },
      {
        question: 'Can I include my sitemap here?',
        answer: 'Yes. It is an SEO best practice to append `Sitemap: https://yourdomain.com/sitemap.xml` at the bottom of your robots.txt file to help crawlers discover your URLs immediately.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 26');
