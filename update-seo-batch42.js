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
  'svg-optimizer': {
    seo: {
      title: 'SVG Optimizer & Minifier — Compress Vector Graphics',
      description: 'Optimize, minify, and compress SVG files for the web. Strip useless metadata, clean up messy vector paths, and reduce file size by up to 80% without losing quality.',
      keywords: ['svg optimizer', 'minify svg file', 'compress vector graphics', 'clean svg code', 'reduce svg file size'],
      tldr: 'Algorithmically compress and minify SVG vector files to drastically reduce web page load times.',
      entity_definition: 'The SVG Optimizer is a frontend performance utility. Scalable Vector Graphics (SVG) are mathematically drawn images written in XML. When exported from design software like Adobe Illustrator or Figma, they are bloated with useless metadata, hidden layers, and overly precise decimal points. This tool parses the raw XML DOM, mathematically rounding coordinate values and stripping out non-essential `<g>` tags and comments, reducing the file size by up to 80% with absolutely zero visual degradation.'
    },
    faqs: [
      {
        question: 'Does optimizing an SVG reduce its quality?',
        answer: 'No. Because SVGs are mathematical vectors, not pixel grids, reducing the decimal precision of a coordinate from 6 decimal places (`10.123456`) to 1 decimal place (`10.1`) drastically shrinks the file size while remaining visually identical to the human eye.'
      },
      {
        question: 'What is SVGO?',
        answer: 'SVGO (SVG Optimizer) is the industry-standard Node.js library used by almost all professional compression tools. It applies dozens of highly specific plugins to clean up messy vector code.'
      },
      {
        question: 'Can I animate an optimized SVG?',
        answer: 'Yes, but you must be careful. Extreme optimization might remove specific `<id>` or `class` tags that your CSS animations rely on. You can adjust the optimization settings to preserve specific IDs.'
      }
    ]
  },
  'schema-validator-pro': {
    seo: {
      title: 'Schema Validator Pro — JSON-LD Structured Data',
      description: 'Validate your JSON-LD structured data for Google Rich Snippets. Instantly find syntax errors and missing schema properties for Articles, Products, and Reviews.',
      keywords: ['schema validator pro', 'json-ld structured data test', 'google rich snippet tester', 'validate schema markup', 'seo structured data checker'],
      tldr: 'Validate your JSON-LD Schema markup to ensure it qualifies for Google Rich Snippets.',
      entity_definition: 'The Schema Validator Pro is a technical SEO utility. Search engines rely on Structured Data (specifically the JSON-LD format) to understand the context of a webpage, using it to generate "Rich Snippets" (like star ratings on recipes or prices on products) in the search results. This tool parses the JSON-LD payload against the official Schema.org vocabulary guidelines, flagging syntax errors, missing mandatory properties, and type mismatches before the code is deployed to production.'
    },
    faqs: [
      {
        question: 'What is JSON-LD?',
        answer: 'JSON-LD (JavaScript Object Notation for Linked Data) is a lightweight data format used to embed structured data into a webpage. It is explicitly recommended by Google over older formats like Microdata or RDFa.'
      },
      {
        question: 'What happens if my schema is invalid?',
        answer: 'If your schema contains errors or misses required properties (like missing the "price" on a Product schema), Google will completely ignore it, and your page will lose its Rich Snippet styling in the search results.'
      },
      {
        question: 'Does valid schema guarantee rich snippets?',
        answer: 'No. Validating your schema simply makes you "eligible" for rich snippets. Google\'s algorithm still ultimately decides whether displaying the rich snippet is relevant to the user\'s specific search query.'
      }
    ]
  },
  'responsive-checker-pro': {
    seo: {
      title: 'Responsive UI Checker Pro — Test Viewports',
      description: 'Test your website\'s responsive UI across multiple mobile, tablet, and desktop viewports simultaneously. Identify CSS media query breaks and layout bugs instantly.',
      keywords: ['responsive ui checker', 'test mobile viewports', 'responsive website tester', 'check css media queries', 'mobile friendly testing tool'],
      tldr: 'Simulate multiple mobile, tablet, and desktop viewports simultaneously to debug responsive CSS.',
      entity_definition: 'The Responsive UI Checker Pro is a frontend QA diagnostic utility. Modern web development relies on CSS Media Queries to adapt layouts to thousands of different screen sizes. Manually resizing a browser window is inaccurate and tedious. This tool utilizes scaled `iframes` to render a target URL across multiple standardized device viewports (e.g., iPhone 14, iPad Pro, 1080p Desktop) simultaneously, allowing developers to quickly identify layout breaks, overlapping text, and horizontal scrolling bugs.'
    },
    faqs: [
      {
        question: 'Does this test actual mobile devices?',
        answer: 'No. This tool simulates the "viewport size" (the width and height) using iframes within your desktop browser. It does not emulate the actual hardware, CPU, or specific rendering engine (like iOS Safari) of the mobile device.'
      },
      {
        question: 'Why do I have horizontal scrolling?',
        answer: 'Horizontal scrolling on mobile is almost always caused by an element (like a massive image, a wide table, or an unbroken string of text) that is explicitly set to a fixed pixel width wider than the screen itself.'
      },
      {
        question: 'What is a CSS Media Query?',
        answer: 'A media query is a CSS rule that applies styles only when specific conditions are met. For example, `@media (max-width: 768px)` tells the browser to apply specific mobile styles only when the screen is smaller than an iPad.'
      }
    ]
  },
  'alt-text-auditor': {
    seo: {
      title: 'Alt Text Accessibility Auditor — Image SEO',
      description: 'Audit a webpage to find missing or poorly written image Alt Text. Improve your web accessibility (ADA compliance) and boost your Google Image Search rankings.',
      keywords: ['alt text auditor', 'check missing alt text', 'image seo scanner', 'ada compliance images', 'web accessibility checker'],
      tldr: 'Scan a webpage to identify missing, empty, or poorly written image `alt` text attributes.',
      entity_definition: 'The Alt Text Accessibility Auditor is an SEO and ADA compliance utility. The `alt` (alternative text) attribute on an HTML `<img>` tag is legally required for web accessibility; it is read aloud by screen readers for visually impaired users and indexed by search engines to understand the image context. This tool crawls the DOM of a provided URL, extracting every image element to flag missing `alt` tags, warn against keyword stuffing, and ensure decorative images use the correct empty `alt=""` syntax.'
    },
    faqs: [
      {
        question: 'What makes good Alt Text?',
        answer: 'Good alt text is highly descriptive but concise. Instead of "dog", write "A golden retriever catching a red frisbee in a park." Never start with "Image of..." as screen readers already announce that it is an image.'
      },
      {
        question: 'What if the image is purely decorative?',
        answer: 'If an image adds no informational value (like a background swoosh or a generic divider), you MUST still include the alt attribute, but leave it completely empty: `alt=""`. This explicitly tells the screen reader to skip it.'
      },
      {
        question: 'Can bad alt text hurt my SEO?',
        answer: 'Yes. If you "keyword stuff" your alt text (e.g., `alt="cheap shoes buy shoes online discount shoes"`), Google\'s algorithm will flag it as spam and potentially penalize your page rankings.'
      }
    ]
  },
  'breadcrumb-schema-gen': {
    seo: {
      title: 'Breadcrumb Schema Generator — JSON-LD Markup',
      description: 'Generate valid JSON-LD Breadcrumb schema markup instantly. Enhance your Google search results with navigational links and improve your site architecture.',
      keywords: ['breadcrumb schema generator', 'json-ld breadcrumb markup', 'seo breadcrumb tool', 'generate schema for navigation', 'google rich results breadcrumbs'],
      tldr: 'Visually generate valid JSON-LD Breadcrumb markup to enhance your Google search listings.',
      entity_definition: 'The Breadcrumb Schema Generator is a technical SEO utility. Breadcrumbs are navigational links that indicate a page\'s position in the site hierarchy (e.g., Home > Electronics > TVs). By embedding this hierarchy in JSON-LD structured data, Google can display these navigational links directly in the search results, dramatically increasing click-through rates (CTR). This tool provides a visual UI to map these hierarchical URLs and outputs the exact `BreadcrumbList` schema required by Google.'
    },
    faqs: [
      {
        question: 'Where do I put the JSON-LD code?',
        answer: 'The generated JSON-LD script should be placed inside the `<head>` or the `<body>` of your HTML document. Search engines will find it regardless of where it is injected.'
      },
      {
        question: 'Do I need visible breadcrumbs on the page?',
        answer: 'Google strongly recommends that the structured data you provide mathematically matches what the user actually sees on the screen. If you have schema for breadcrumbs, you should ideally have visible breadcrumbs in your UI.'
      },
      {
        question: 'Can I use Microdata instead of JSON-LD?',
        answer: 'You can, but it is not recommended. Google explicitly states that JSON-LD is their preferred format for structured data because it is much easier for their crawlers to parse than inline HTML Microdata.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 42');
