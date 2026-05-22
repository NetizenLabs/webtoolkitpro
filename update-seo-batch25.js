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
  'cache-header-gen': {
    seo: {
      title: 'Cache-Control Header Generator — Optimize Web Performance',
      description: 'Generate precise HTTP Cache-Control headers. Improve website load times and reduce server bandwidth by configuring optimal caching policies for CDNs and browsers.',
      keywords: ['cache control generator', 'generate cache headers', 'http caching policy', 'cdn cache control', 'optimize web cache'],
      tldr: 'Visually generate a strict Cache-Control policy to optimize browser and CDN caching.',
      entity_definition: 'The Cache-Control Header Generator is a web performance optimization utility. The `Cache-Control` HTTP header defines the caching policies for both the client\'s browser and intermediary caching servers (like CDNs). This tool provides a visual interface for developers to select directives—such as `max-age`, `s-maxage`, `no-cache`, and `immutable`—generating the exact syntax required to maximize asset reuse and minimize unnecessary network requests.'
    },
    faqs: [
      {
        question: 'What is the difference between no-cache and no-store?',
        answer: '`no-store` instructs the browser to never store a copy of the file under any circumstances (used for highly sensitive data). `no-cache` allows the browser to store the file, but forces it to validate with the server (via ETags) before using it.'
      },
      {
        question: 'How do I cache static assets forever?',
        answer: 'For static assets with unique filenames (like `app-v2.js`), use `public, max-age=31536000, immutable`. This tells the browser to cache it for a year and never bother checking for updates.'
      },
      {
        question: 'What does s-maxage do?',
        answer: '`s-maxage` (Shared Max Age) dictates how long intermediary proxies (like Cloudflare or Fastly) are allowed to cache the asset, ignoring the standard `max-age` which is meant for the end-user\'s browser.'
      }
    ]
  },
  'js-execution-audit': {
    seo: {
      title: 'JavaScript Execution Auditor — Analyze Main Thread Blocking',
      description: 'Audit and analyze JavaScript execution times. Identify long tasks that block the main thread, causing poor Interaction to Next Paint (INP) and sluggish web experiences.',
      keywords: ['js execution auditor', 'analyze javascript performance', 'main thread blocking', 'inp optimization tool', 'long tasks audit'],
      tldr: 'Identify and analyze long-running JavaScript tasks that cause UI lag and block the main thread.',
      entity_definition: 'The JavaScript Execution Auditor is a Core Web Vitals diagnostic utility. Modern web applications heavily rely on JavaScript, but excessive or inefficient code can block the browser\'s Main Thread, causing the UI to freeze and frustrating users. This tool helps developers conceptualize "Long Tasks" (functions taking longer than 50ms) and understand how deferring, chunking, or moving heavy computation to Web Workers can drastically improve the Interaction to Next Paint (INP) metric.'
    },
    faqs: [
      {
        question: 'What is a Long Task?',
        answer: 'In web performance, a Long Task is any JavaScript execution period that monopolizes the main thread for longer than 50 milliseconds, causing noticeable input delay and jank.'
      },
      {
        question: 'What is Interaction to Next Paint (INP)?',
        answer: 'INP is a Core Web Vitals metric that assesses a page\'s overall responsiveness to user interactions (like clicks or key presses). If the main thread is blocked by JavaScript, the INP score degrades.'
      },
      {
        question: 'How can I fix main thread blocking?',
        answer: 'Strategies include code splitting (loading only what\'s necessary), using `requestIdleCallback` to defer non-critical work, or offloading heavy calculations to a background Web Worker.'
      }
    ]
  },
  'resource-priority': {
    seo: {
      title: 'Resource Priority Hint Generator — Optimize Asset Loading',
      description: 'Generate HTTP Resource Hints (Preload, Prefetch, Preconnect, DNS-Prefetch). Accelerate your website\'s Largest Contentful Paint (LCP) by prioritizing critical assets.',
      keywords: ['resource priority hints', 'generate preload tags', 'preconnect vs prefetch', 'optimize lcp asset', 'dns prefetch generator'],
      tldr: 'Generate optimized `<link>` tags to prioritize critical CSS, fonts, and images.',
      entity_definition: 'The Resource Priority Hint Generator is a web performance optimization utility. Browsers naturally discover and download assets as they parse the HTML Document Object Model (DOM). However, critical assets (like hero images or web fonts) are often hidden deep in CSS files, delaying rendering. This tool generates declarative Resource Hints (`<link rel="preload">`, `preconnect`, `prefetch`) to explicitly instruct the browser to prioritize specific network connections and file downloads, massively improving the Largest Contentful Paint (LCP).'
    },
    faqs: [
      {
        question: 'What is the difference between Preload and Prefetch?',
        answer: '`preload` tells the browser to download an asset immediately because it is required for the *current* page. `prefetch` suggests downloading an asset in the background because the user might need it for the *next* page.'
      },
      {
        question: 'When should I use Preconnect?',
        answer: 'Use `preconnect` to establish early TCP and TLS handshakes for crucial third-party domains (like Google Fonts or a CDN) before the browser even knows which specific files it needs from them.'
      },
      {
        question: 'Can I preload too many things?',
        answer: 'Yes! Preloading too many assets creates bandwidth contention, effectively defeating the purpose of prioritization and potentially delaying your most critical assets.'
      }
    ]
  },
  'network-throttling': {
    seo: {
      title: 'Network Throttling Simulator — Test Slow Connections',
      description: 'Simulate web performance on Slow 3G, 4G, and offline networks. Understand how network latency and bandwidth limitations affect your website\'s loading experience.',
      keywords: ['network throttling simulator', 'slow 3g test', 'simulate slow internet', 'bandwidth throttling tool', 'web performance network'],
      tldr: 'Visually simulate the impact of bandwidth limits and high latency on web asset loading.',
      entity_definition: 'The Network Throttling Simulator is a user experience (UX) diagnostic utility. While developers often build on lightning-fast fiber connections, real-world users frequently access sites via unstable mobile networks. This tool visually simulates artificial network constraints—such as capping bandwidth throughput (kbps) and injecting artificial latency (ms)—to mimic "Slow 3G" or "Fast 4G" conditions, helping engineers visualize the impact of massive image payloads and render-blocking scripts on mobile devices.'
    },
    faqs: [
      {
        question: 'Why does Google Lighthouse use Slow 3G?',
        answer: 'Google intentionally throttles its mobile audits to a "Slow 4G/Fast 3G" equivalent to ensure websites are resilient and accessible to users globally, not just those on premium networks.'
      },
      {
        question: 'What is Latency vs Bandwidth?',
        answer: 'Latency is the delay (in milliseconds) it takes for a request to reach the server and back. Bandwidth is the total volume of data (in megabits per second) that can be downloaded simultaneously.'
      },
      {
        question: 'Does this actually slow down my computer?',
        answer: 'No. This is a visual simulation designed for educational diagnostics. To legitimately throttle your browser\'s network connection, you must use the "Network" tab inside Chrome/Firefox DevTools.'
      }
    ]
  },
  'compression-test': {
    seo: {
      title: 'Gzip & Brotli Compression Tester — Optimize Payload Sizes',
      description: 'Analyze the compression ratios of Gzip and Brotli algorithms on your text assets (HTML, CSS, JS). Learn how server-level compression drastically reduces website weight.',
      keywords: ['gzip compression test', 'brotli vs gzip', 'test website compression', 'analyze payload size', 'http compression tool'],
      tldr: 'Analyze the massive bandwidth savings achieved by enabling Gzip or Brotli server compression.',
      entity_definition: 'The Gzip & Brotli Compression Tester is a network efficiency utility. Before web servers transmit text-based files (HTML, CSS, JavaScript) to a browser, they compress the raw strings into a dense binary format using algorithms like Gzip or Brotli. This tool simulates these algorithmic compression ratios, demonstrating how minified code can be further reduced by up to 80% in transit, significantly reducing bandwidth costs and accelerating page load times.'
    },
    faqs: [
      {
        question: 'What is the difference between Gzip and Brotli?',
        answer: 'Gzip is the universal, decades-old standard for HTTP compression. Brotli is a modern algorithm developed by Google specifically optimized for web assets, often achieving 15-20% better compression than Gzip.'
      },
      {
        question: 'Does compression work on images?',
        answer: 'No. Server-level Gzip/Brotli should strictly be used for text-based files (HTML, CSS, JSON, JS). Images (like JPEG or PNG) and videos are already mathematically compressed; attempting to Gzip them wastes CPU cycles and can actually increase file size.'
      },
      {
        question: 'How do I enable Brotli?',
        answer: 'Brotli is enabled at the web server level (Nginx, Apache) or at the CDN level (Cloudflare, AWS CloudFront). Modern browsers automatically advertise support for it via the `Accept-Encoding: br` header.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 25');
