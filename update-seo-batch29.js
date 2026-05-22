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
  'critical-css-gen': {
    seo: {
      title: 'Critical CSS Generator — Optimize Above-the-Fold Render',
      description: 'Extract and inline Critical CSS to eliminate render-blocking resources. Improve your First Contentful Paint (FCP) and Google PageSpeed Insights score.',
      keywords: ['critical css generator', 'extract critical css', 'inline css tool', 'eliminate render blocking resources', 'optimize above the fold css'],
      tldr: 'Extract and inline the exact CSS needed to render the above-the-fold content instantly.',
      entity_definition: 'The Critical CSS Generator is a frontend performance utility. When a browser loads a webpage, external CSS files are "render-blocking"—meaning the browser halts painting the screen until the entire stylesheet downloads. To solve this, developers extract only the "Critical CSS" required to style the visible above-the-fold content and inject it inline in the `<head>`. This tool parses your HTML and CSS to generate this crucial subset, allowing the page to render instantly while deferring the remaining CSS.'
    },
    faqs: [
      {
        question: 'What does Above-the-Fold mean?',
        answer: 'Above-the-fold refers to the portion of a webpage that is visible in the browser window immediately upon loading, before the user scrolls down.'
      },
      {
        question: 'Why not inline all of my CSS?',
        answer: 'Inlining large amounts of CSS bloats your initial HTML payload, which slows down the Time to First Byte (TTFB) and prevents the CSS from being cached efficiently by the browser across multiple pages.'
      },
      {
        question: 'How do I defer the rest of the CSS?',
        answer: 'After inlining the critical CSS, you load the main stylesheet asynchronously using `<link rel="preload" as="style" href="...">` combined with a JavaScript fallback to apply the styles once downloaded.'
      }
    ]
  },
  'cdn-finder': {
    seo: {
      title: 'CDN Finder & Domain Detector — Identify Hosting Infra',
      description: 'Discover which Content Delivery Network (CDN) and hosting provider a website uses. Detect Cloudflare, Fastly, AWS CloudFront, and Akamai instantly.',
      keywords: ['cdn finder', 'detect cdn', 'website hosting checker', 'who hosts this site', 'find cloudflare ip', 'check cdn provider'],
      tldr: 'Detect the Content Delivery Network (CDN) and hosting provider behind any website URL.',
      entity_definition: 'The CDN Finder is a network intelligence utility. A Content Delivery Network (CDN) is a globally distributed network of proxy servers that cache content closer to end users to improve load times and defend against DDoS attacks. This tool interrogates a target domain\'s DNS records (A, CNAME), HTTP Response Headers (`Server`, `X-CDN`), and Autonomous System Numbers (ASN) to accurately deduce whether the site is fronted by major providers like Cloudflare, AWS CloudFront, Fastly, or Akamai.'
    },
    faqs: [
      {
        question: 'Can this bypass Cloudflare?',
        answer: 'No. Cloudflare functions as a reverse proxy, masking the origin server\'s true IP address. This tool identifies that Cloudflare is active, but cannot legally penetrate it to find the backend IP.'
      },
      {
        question: 'What is a CNAME record?',
        answer: 'A Canonical Name (CNAME) record maps one domain name to another. CDNs heavily rely on CNAMEs (e.g., `cdn.example.com` pointing to `example.cloudfront.net`) to route traffic into their infrastructure.'
      },
      {
        question: 'Why do HTTP headers reveal the CDN?',
        answer: 'Most CDNs inject custom HTTP headers into their responses (like `x-cache: HIT` or `server: cloudflare`) for debugging purposes, making them easily identifiable to network scanners.'
      }
    ]
  },
  'ip-geolocation': {
    seo: {
      title: 'IP Geolocation Lookup — Locate IP Addresses on a Map',
      description: 'Perform an IP geolocation lookup. Trace an IPv4 or IPv6 address to its physical location, including country, city, ISP, and geographic coordinates.',
      keywords: ['ip geolocation', 'ip address locator', 'find ip location', 'trace ipv4 address', 'ip to city lookup', 'ip address map'],
      tldr: 'Instantly trace any IPv4 or IPv6 address to its physical geographic location and ISP.',
      entity_definition: 'The IP Geolocation Lookup is a network routing utility. Every device connected to the internet is assigned a unique IP address by its Internet Service Provider (ISP). IP registries (like ARIN or RIPE) allocate blocks of IPs to specific regions and companies. This tool queries commercial geolocation databases to map a given IP address to its estimated physical coordinates (Latitude/Longitude), City, Country, and ASN (Autonomous System Number), aiding in fraud detection and regional analytics.'
    },
    faqs: [
      {
        question: 'Is IP Geolocation 100% accurate?',
        answer: 'No. IP addresses are logical network addresses, not GPS coordinates. Geolocation is generally accurate to the city or region level, but rarely pinpoints a specific street address.'
      },
      {
        question: 'Can VPNs hide my location?',
        answer: 'Yes. A Virtual Private Network (VPN) routes your traffic through a remote server. This tool will detect the IP and location of the VPN server, completely masking your true physical location.'
      },
      {
        question: 'What is an IPv6 address?',
        answer: 'IPv6 is the modern internet protocol designed to replace IPv4. While IPv4 looks like `192.168.1.1`, IPv6 is a longer alphanumeric string like `2001:0db8:85a3:0000:0000:8a2e:0370:7334`.'
      }
    ]
  },
  'authority-simulation': {
    seo: {
      title: 'Domain Authority Simulator — Backlink SEO Forecaster',
      description: 'Simulate how acquiring high-quality backlinks impacts your Domain Authority (DA) and Page Authority (PA). Forecast your SEO growth and link-building strategy.',
      keywords: ['domain authority simulator', 'seo da checker', 'backlink impact calculator', 'simulate page authority', 'seo growth forecaster'],
      tldr: 'Simulate how acquiring new backlinks will mathematically impact your Domain Authority (DA).',
      entity_definition: 'The Domain Authority Simulator is a predictive SEO utility. Domain Authority (DA) is a proprietary metric (originally developed by Moz) that predicts how well a website will rank on search engines, calculated heavily on the quantity and quality of inbound backlinks. Because the DA scale is logarithmic (it is much harder to grow from 70 to 80 than from 10 to 20), SEOs use this simulation tool to mathematically forecast the impact of acquiring new referring domains, aiding in link-building campaign ROI analysis.'
    },
    faqs: [
      {
        question: 'Does Google use Domain Authority?',
        answer: 'No. Google explicitly states they do not use Moz\'s "Domain Authority" metric. Google uses its own internal PageRank algorithms. However, DA remains the industry\'s best third-party approximation of site strength.'
      },
      {
        question: 'Why is the DA scale logarithmic?',
        answer: 'A logarithmic scale means each step up is exponentially harder. Getting a link from a DA 90 site like Wikipedia will massively boost a new site, but barely move the needle for an already authoritative site.'
      },
      {
        question: 'Are toxic backlinks calculated?',
        answer: 'Spammy or "toxic" backlinks generally do not lower your authority score directly; Google usually ignores them. However, they dilute your link profile quality over time.'
      }
    ]
  },
  'load-time-estimator': {
    seo: {
      title: 'Page Load Time Estimator — Bandwidth Calculator',
      description: 'Estimate how fast a web page will load across different network speeds. Calculate download times for specific payload sizes on 3G, 4G, 5G, and Fiber connections.',
      keywords: ['page load time estimator', 'calculate download speed', 'website bandwidth calculator', 'test 3g load time', 'estimate website speed'],
      tldr: 'Calculate exactly how long a webpage payload will take to download across various network speeds.',
      entity_definition: 'The Page Load Time Estimator is a performance forecasting utility. Website weight (the total megabytes of HTML, CSS, JS, and Images) directly dictates user experience, especially on mobile networks. This tool takes a total payload size (e.g., 2.5MB) and mathematically calculates the exact download duration across standardized network profiles—ranging from throttled 2G up to modern Gigabit Fiber—incorporating TCP/IP overhead heuristics to provide realistic rendering timelines.'
    },
    faqs: [
      {
        question: 'Why is the actual load time slower than the calculation?',
        answer: 'Raw download calculation assumes continuous data transfer. In reality, browsers experience Latency (delays establishing connections) and CPU processing time (parsing JavaScript), which add to the total load time.'
      },
      {
        question: 'What is a good total page size?',
        answer: 'The global average page size is around 2.2MB. However, performance experts recommend keeping critical landing pages under 1MB to ensure fast loading on 3G mobile networks.'
      },
      {
        question: 'Does server location matter?',
        answer: 'Massively. If your server is in New York and the user is in Tokyo, the physical distance adds hundreds of milliseconds of latency to every single file request. This is why using a CDN is critical.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 29');
