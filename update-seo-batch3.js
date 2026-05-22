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
  'sitemap-validator': {
    seo: {
      title: 'XML Sitemap Validator — Audit Search Console Errors',
      description: 'Validate your XML sitemap against Google Search Console standards. Instantly check for formatting errors, index limits, and secure protocol issues.',
      keywords: ['xml sitemap validator', 'check sitemap errors', 'google search console sitemap test', 'validate xml sitemap online', 'sitemap checker tool'],
      tldr: 'Audit your XML sitemap for structure, size limits, and indexability errors instantly.',
      entity_definition: 'An XML Sitemap is a roadmap for your website that guides search engines to all your important pages. The WebToolkit Pro XML Sitemap Validator programmatically fetches your live sitemap and audits its underlying structure against strict Google Search Console requirements. It utilizes regex parsing to count standard <url> tags and <sitemap> indexes, verifies the presence of the correct XML namespaces (xmlns), and confirms that all URLs are served over a secure HTTPS connection. Regular validation ensures that Googlebot can efficiently crawl your domain without hitting HTTP errors or payload size constraints.'
    },
    faqs: [
      {
        question: 'Why is Google Search Console rejecting my sitemap?',
        answer: 'Google typically rejects sitemaps if they exceed the 50MB size limit, contain more than 50,000 URLs, or lack the correct XML namespace declarations. Additionally, if your sitemap contains unescaped characters (like an ampersand) or insecure HTTP links, it will throw a parsing error.'
      },
      {
        question: 'What is a Sitemap Index file?',
        answer: 'A Sitemap Index is essentially a "sitemap of sitemaps." If your website has more than 50,000 pages, you must split your URLs into multiple smaller sitemap files and link to them using a central Sitemap Index file to comply with search engine limits.'
      },
      {
        question: 'Should I compress my sitemap?',
        answer: 'Yes. It is highly recommended to gzip your XML sitemap (resulting in a .xml.gz extension). Search engines natively decompress these files, and it drastically reduces the bandwidth required for Googlebot to download your URL list.'
      }
    ]
  },
  'redirect-checker': {
    seo: {
      title: 'HTTP Redirect Checker — Trace 301 & 302 URL Chains',
      description: 'Trace the full HTTP redirect chain of any URL. Detect redirect loops, analyze 301 vs 302 status codes, and optimize your SEO link equity.',
      keywords: ['http redirect checker', 'trace redirect chain', 'check 301 redirect online', 'find redirect loops', 'url redirect tracer'],
      tldr: 'Trace complex HTTP redirect chains and detect SEO-damaging redirect loops instantly.',
      entity_definition: 'The WebToolkit Pro HTTP Redirect Checker is a diagnostic network utility that traces the exact hop-by-hop journey of a URL. By initiating a HEAD request and manually intercepting the "Location" headers, the tool exposes the entire redirect chain—including the specific HTTP status codes (like 301 Moved Permanently or 302 Found) returned by the server at each step. This is critical for Technical SEO, as long redirect chains dilute "link equity" (PageRank), slow down First Contentful Paint (FCP), and can trap search engine crawlers in infinite redirect loops.'
    },
    faqs: [
      {
        question: 'What is the difference between a 301 and 302 redirect?',
        answer: 'A 301 redirect is a "Permanent" redirect. It tells search engines that a page has permanently moved and passes nearly all SEO link equity to the new destination. A 302 redirect is "Temporary," indicating the page will eventually return, and it does not pass full SEO value.'
      },
      {
        question: 'Why are redirect chains bad for SEO?',
        answer: 'Redirect chains (A -> B -> C -> D) force browsers to make multiple HTTP requests before loading a page, devastating your site speed. Furthermore, Googlebot may stop following the chain after 4-5 hops, resulting in the final destination never being crawled or indexed.'
      },
      {
        question: 'How do I fix a redirect loop?',
        answer: 'A redirect loop occurs when URL A redirects to URL B, and URL B redirects back to URL A. To fix it, you must audit your server configuration (e.g., .htaccess or Nginx config) or CMS routing rules and break the infinite cycle by pointing both to a final, non-redirecting destination.'
      }
    ]
  },
  'schema-generator': {
    seo: {
      title: 'JSON-LD Schema Generator — Rich Snippets for SEO',
      description: 'Generate valid JSON-LD structured data to win rich snippets in Google Search. Easily create Schema.org markup for Local Businesses, Organizations, and Websites.',
      keywords: ['json-ld schema generator', 'rich snippets generator', 'schema.org markup tool', 'create local business schema', 'structured data generator'],
      tldr: 'Generate valid JSON-LD structured data markup to unlock Google Rich Snippets.',
      entity_definition: 'Structured Data, written in JSON-LD format, is a standardized vocabulary (Schema.org) used to explicitly classify the content on a webpage for search engines. The WebToolkit Pro Schema Generator constructs syntactically perfect JSON-LD blocks that you can inject directly into the <head> of your HTML. By explicitly defining entities—such as an Organization, Local Business, or Product—you remove the guesswork for Google\'s algorithms. Properly implemented structured data is the sole mechanism for unlocking highly visible "Rich Snippets" (like star ratings, event dates, and knowledge panels) in the Search Engine Results Pages (SERPs).'
    },
    faqs: [
      {
        question: 'What is JSON-LD and why is it preferred?',
        answer: 'JSON-LD (JavaScript Object Notation for Linked Data) is a method of encoding Linked Data using JSON. Google officially recommends JSON-LD over older formats like Microdata or RDFa because it is injected as a distinct script block, separating the metadata logic from the visual HTML structure.'
      },
      {
        question: 'Does schema markup guarantee rich snippets?',
        answer: 'No. While valid JSON-LD schema is a mandatory technical requirement for rich snippets, Google\'s algorithm ultimately decides whether to display them based on the authority of your site and the relevance of the query.'
      },
      {
        question: 'Where should I place the JSON-LD code?',
        answer: 'JSON-LD should be placed inside a <script type="application/ld+json"> tag. While it can technically be placed anywhere in the HTML document, best practices dictate placing it within the <head> section of the page.'
      }
    ]
  },
  'api-latency-calculator': {
    seo: {
      title: 'API Latency Cost Calculator — Calculate Revenue Loss',
      description: 'Calculate the exact financial impact and revenue loss caused by API latency and server response delays on your e-commerce conversion rates.',
      keywords: ['api latency cost calculator', 'calculate website downtime cost', 'ecommerce latency revenue loss', 'server response time impact', 'page speed roi calculator'],
      tldr: 'Calculate the exact financial revenue lost due to high API latency and slow server response times.',
      entity_definition: 'The API Latency Cost Calculator is an executive ROI analysis tool designed for DevOps and E-commerce directors. It mathematically correlates technical server metrics (API latency in milliseconds) with business KPIs (Conversion Rate Drop and Revenue Loss). Based on industry standard performance models—where every 100ms of latency translates to roughly a 1% drop in conversion rates—the calculator processes your daily request volume and average transaction value to project the annual financial damage caused by inefficient infrastructure. This data is critical for justifying investments in edge caching, CDN adoption, or database query optimization.'
    },
    faqs: [
      {
        question: 'How does latency affect conversion rates?',
        answer: 'Extensive studies by Amazon and Google have proven that every 100 milliseconds of latency costs a site 1% in sales. Modern users expect immediate, fluid interactions; slight delays cause psychological friction, leading to abandoned carts and bounce rates.'
      },
      {
        question: 'What is a good API response time?',
        answer: 'For a fluid user experience, an API should ideally respond in under 100-200 milliseconds. Anything over 500ms will be perceived as a noticeable delay by the user, and anything over 1000ms (1 second) severely damages task continuity.'
      },
      {
        question: 'How can I reduce my API latency?',
        answer: 'Latency can be reduced by moving compute closer to the user via Edge functions, implementing aggressive Redis caching for read-heavy operations, optimizing database indexes, and utilizing a global Content Delivery Network (CDN).'
      }
    ]
  },
  'adsense-calculator': {
    seo: {
      title: 'Google AdSense Revenue Calculator — Estimate Blog Earnings',
      description: 'Estimate your potential Google AdSense earnings based on daily pageviews, Click-Through Rate (CTR), and niche-specific Cost Per Click (CPC).',
      keywords: ['adsense revenue calculator', 'estimate blog earnings online', 'calculate adsense income', 'cpc ctr traffic calculator', 'website revenue estimator'],
      tldr: 'Accurately project your website\'s daily and annual Google AdSense revenue based on niche metrics.',
      entity_definition: 'The AdSense Revenue Calculator is a projection engine for digital publishers and content creators. It utilizes the standard digital advertising formula: Revenue = (Traffic × (CTR / 100)) × CPC. By factoring in your daily pageviews, the Click-Through Rate (the percentage of visitors who click an ad), and the Cost Per Click (the average payout per click in your specific niche), the tool instantly models your daily, monthly, and annual financial trajectory. This is vital for bloggers planning content strategies and assessing the viability of entering high-payout niches like Finance or Technology.'
    },
    faqs: [
      {
        question: 'What is a good CTR for Google AdSense?',
        answer: 'A standard Click-Through Rate (CTR) for AdSense across most industries is between 1% and 2%. If your CTR is significantly lower, you may need to optimize your ad placements or ensure the ads are highly relevant to your content.'
      },
      {
        question: 'Why do some niches have higher CPCs?',
        answer: 'Cost Per Click (CPC) is determined by advertiser competition and the lifetime value of the customer. Niches like Finance, Insurance, and Software have massive customer lifetime values, so advertisers are willing to bid much higher amounts for a single click compared to niches like Entertainment.'
      },
      {
        question: 'How can I increase my AdSense revenue?',
        answer: 'To increase revenue, you can either drive more organic traffic via SEO, improve your CTR by running A/B tests on ad placements (like placing ads above the fold), or pivot your content strategy to target higher CPC keywords within your niche.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 3');
