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
  'faq-schema': {
    seo: {
      title: 'FAQ Schema Generator — Generate JSON-LD Code',
      description: 'Generate FAQPage JSON-LD schema markup instantly. Help Google display your Frequently Asked Questions directly in the search results with rich snippets.',
      keywords: ['faq schema generator', 'json-ld faq schema', 'generate faqpage markup', 'seo rich snippets', 'google faq schema maker'],
      tldr: 'Generate FAQPage JSON-LD markup to display your questions directly in Google search results.',
      entity_definition: 'The FAQ Schema Generator is a structured data utility for SEO. When a webpage contains a list of Frequently Asked Questions, search engines struggle to differentiate the Q&A format from standard text. By wrapping the questions and answers in `FAQPage` JSON-LD schema, developers provide explicit context. This tool automatically formats your text into the strict schema structure required by Google, allowing your site to claim massive "Rich Snippet" real estate directly on the Search Engine Results Page (SERP).'
    },
    faqs: [
      {
        question: 'What is a Rich Snippet?',
        answer: 'A rich snippet is an enhanced search result in Google that displays additional data (like star ratings, images, or FAQ accordions) below the standard blue title link.'
      },
      {
        question: 'Does FAQ Schema guarantee rich results?',
        answer: 'No. Adding valid JSON-LD makes you eligible, but Google\'s algorithm ultimately decides whether displaying the rich snippet provides a good user experience for that specific search query.'
      },
      {
        question: 'Can I use HTML in my answers?',
        answer: 'Yes! Google supports basic HTML tags like `<h1>`, `<a>` (links), `<ul>`, and `<li>` within the FAQ answer schema, allowing you to link users directly to other pages.'
      }
    ]
  },
  'review-schema': {
    seo: {
      title: 'Review Schema Generator — Star Rating JSON-LD',
      description: 'Generate Review and AggregateRating JSON-LD schema. Display 5-star ratings for your products, software, and local business directly in Google Search results.',
      keywords: ['review schema generator', 'aggregate rating json ld', 'generate star ratings google', 'product review schema maker', 'seo rich snippet generator'],
      tldr: 'Generate AggregateRating JSON-LD schema to display star ratings in Google search results.',
      entity_definition: 'The Review Schema Generator is a structured data utility designed to boost click-through rates. The `AggregateRating` JSON-LD schema defines the average score (usually out of 5 stars) and the total number of reviews a specific product or service has received. This tool generates the exact semantic code required by Schema.org, ensuring search engines can parse your reviews and display eye-catching gold stars directly on the SERP.'
    },
    faqs: [
      {
        question: 'Can I put review schema on my homepage?',
        answer: 'No. Google\'s guidelines strictly prohibit using `AggregateRating` on homepages or for the business as a whole. It must be applied to a specific Product, Recipe, Software Application, or Local Business page.'
      },
      {
        question: 'What happens if I fake my ratings?',
        answer: 'Google actively monitors for "schema spam." If you hardcode 5-star ratings without actually having a review collection system on your page, your site will receive a manual penalty and lose all rich snippets.'
      },
      {
        question: 'What is the "worstRating" and "bestRating"?',
        answer: 'These define the scale of your rating system. By default, Schema.org assumes the worst rating is 1 and the best is 5. If your site uses a 1-10 or 1-100 scale, you must explicitly declare it in the schema.'
      }
    ]
  },
  'local-business-schema': {
    seo: {
      title: 'Local Business Schema Generator — SEO Structured Data',
      description: 'Generate LocalBusiness JSON-LD markup. Ensure Google Maps and Search understand your business address, phone number, opening hours, and coordinates.',
      keywords: ['local business schema generator', 'json ld local seo', 'generate business schema', 'google maps seo schema', 'schema.org local business'],
      tldr: 'Generate LocalBusiness schema to feed your address and hours directly into the Google Knowledge Graph.',
      entity_definition: 'The Local Business Schema Generator is an entity-optimization utility. Local SEO relies on search engines having absolute certainty about a business\'s Name, Address, and Phone Number (NAP). This tool generates `LocalBusiness` JSON-LD code (as defined by Schema.org) which explicitly maps out this data, alongside geolocation coordinates and opening hours, feeding it directly into the Google Knowledge Graph for better visibility in Google Maps and local search packs.'
    },
    faqs: [
      {
        question: 'What is NAP consistency?',
        answer: 'NAP stands for Name, Address, Phone Number. Consistency means ensuring these three pieces of information match exactly across your website, schema markup, and third-party directories like Yelp.'
      },
      {
        question: 'How do I specify multiple locations?',
        answer: 'You should create a separate location page for each branch of your business, and generate a unique `LocalBusiness` (or a specific subtype like `Restaurant` or `Dentist`) schema for each page.'
      },
      {
        question: 'Should I use Microdata or JSON-LD?',
        answer: 'Always use JSON-LD. While Microdata (HTML attributes) was popular years ago, Google explicitly recommends JSON-LD because it is easier to parse and less prone to breaking when redesigning your site.'
      }
    ]
  },
  'redirect-chain-finder': {
    seo: {
      title: 'Redirect Chain Checker — Analyze 301 HTTP Redirects',
      description: 'Trace the path of HTTP redirects. Identify infinite loops and long redirect chains that harm your SEO crawl budget and slow down page load times.',
      keywords: ['redirect chain checker', 'find 301 redirects', 'http redirect trace', 'seo redirect loop finder', 'analyze redirect path'],
      tldr: 'Trace complex 301/302 HTTP redirect chains to diagnose crawling loops and latency issues.',
      entity_definition: 'The Redirect Chain Checker is a technical SEO and network diagnostic utility. When a URL is moved, servers issue a 301 (Permanent) or 302 (Temporary) HTTP status code, pointing the browser to the new location. However, poor configuration can result in "Redirect Chains" (A -> B -> C -> D), which drastically slow down Time to First Byte (TTFB) and waste search engine crawl budget. This tool traces the exact sequence of HTTP hops, exposing the full routing path for optimization.'
    },
    faqs: [
      {
        question: 'How many redirects are too many?',
        answer: 'Googlebot will typically stop following a redirect chain after 5 consecutive hops. Ideally, you should have no more than 1 redirect (A -> Final Destination).'
      },
      {
        question: 'What is a Redirect Loop?',
        answer: 'A redirect loop occurs when Page A redirects to Page B, and Page B redirects back to Page A. Browsers will eventually throw an "ERR_TOO_MANY_REDIRECTS" error, completely breaking the site.'
      },
      {
        question: 'Do 301 redirects lose SEO juice (PageRank)?',
        answer: 'Historically, 301 redirects lost about 15% of their PageRank. Today, Google explicitly states that 3xx redirects pass 100% of their PageRank, though long chains still cause indexing delays.'
      }
    ]
  },
  'canonical-checker': {
    seo: {
      title: 'Canonical Tag Checker — Prevent Duplicate Content',
      description: 'Inspect canonical tags to resolve duplicate content issues. Verify that your rel="canonical" attributes are correctly pointing search engines to the master page.',
      keywords: ['canonical tag checker', 'check rel canonical', 'duplicate content seo tool', 'verify canonical url', 'inspect canonical header'],
      tldr: 'Inspect your canonical tags to ensure search engines are indexing the correct version of a page.',
      entity_definition: 'The Canonical Tag Checker is an indexing management utility. In e-commerce and large websites, the same content often exists on multiple URLs (e.g., due to sorting parameters or tracking codes). This creates "Duplicate Content," confusing search engines on which page to rank. The `<link rel="canonical" href="...">` HTML tag or HTTP header solves this by explicitly declaring the "master" version of a page. This tool inspects the DOM and headers to verify that canonical tags are implemented correctly.'
    },
    faqs: [
      {
        question: 'Can I use a relative URL for my canonical tag?',
        answer: 'No. You should always use absolute URLs (e.g., `https://www.example.com/page/`) for canonical tags. Relative URLs can cause catastrophic indexing loops if the site is accessed via an unexpected path.'
      },
      {
        question: 'What happens if two pages have the same canonical?',
        answer: 'If Page A and Page B both have a canonical tag pointing to Page A, Google will ignore Page B and consolidate all ranking signals (like backlinks) to Page A.'
      },
      {
        question: 'Is a canonical tag a strict rule or a hint?',
        answer: 'It is a strong hint. Google usually respects the canonical tag, but if their algorithms determine that a different page is actually the better master version, they may choose to ignore your canonical tag.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 27');
