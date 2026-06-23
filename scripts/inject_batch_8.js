const fs = require('fs');
const yaml = require('js-yaml'); 

const yamlFile = 'config/tools.yaml';
const fileContent = fs.readFileSync(yamlFile, 'utf8');

const parsed = yaml.load(fileContent);

const enhancements = {
  'ssl-checker': {
    practical_application: "SSL/TLS certificates enforce data encryption in transit. A lapsed SSL certificate instantly blocks user access via browser 'Your connection is not private' warnings and severely demotes the site in Google rankings. Automated checking ensures Certificate Authorities (like Let's Encrypt) successfully renewed the certificate before the 90-day expiration window.",
    code_blueprints: [
      {
        language: "bash",
        title: "OpenSSL Certificate Validation",
        code: "# Fetch and verify the SSL certificate chain from a remote server\necho | openssl s_client -servername wtkpro.site -connect wtkpro.site:443 2>/dev/null | openssl x509 -noout -dates"
      }
    ]
  },
  'compression-test': {
    practical_application: "Gzip and Brotli compression massively reduce the payload size of text-based assets (HTML, CSS, JS) over the network. Brotli specifically provides a 20% denser compression ratio than Gzip. A compression test ensures your edge router or CDN is correctly applying the `Content-Encoding` headers rather than serving raw, uncompressed bytes.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Express.js Brotli Compression",
        code: "const express = require('express');\nconst shrinkRay = require('shrink-ray-current');\nconst app = express();\n\n// Automatically apply Brotli/Gzip based on Accept-Encoding header\napp.use(shrinkRay());"
      }
    ]
  },
  'dom-analyzer': {
    practical_application: "An excessively large Document Object Model (DOM) forces the browser's rendering engine to calculate massive layout trees, severely impacting mobile scrolling performance. Google Lighthouse flags any page exceeding 1,500 nodes. Analyzing DOM depth allows developers to implement virtual scrolling and lazy rendering for complex UI lists.",
    code_blueprints: [
      {
        language: "javascript",
        title: "DOM Node Counter",
        code: "// Execute in Browser Console to find DOM size\nconst totalNodes = document.getElementsByTagName('*').length;\nconsole.log(`Total DOM Nodes: ${totalNodes}`);\n\nif (totalNodes > 1500) {\n  console.warn('DOM is too large! Implement virtualization.');\n}"
      }
    ]
  },
  'critical-css-gen': {
    practical_application: "Browsers halt rendering until all external CSS is downloaded and parsed (Render-Blocking Resources). Extracting the 'Critical CSS' (the styles strictly required for above-the-fold content) and inlining it directly in the `<head>` allows the browser to paint the hero section instantly while asynchronously loading the rest of the stylesheet.",
    code_blueprints: [
      {
        language: "html",
        title: "Inlined Critical CSS Pattern",
        code: "<head>\n  <style>\n    /* Inline strictly necessary Above-The-Fold styles */\n    .hero { background: #0B1120; color: white; display: flex; }\n  </style>\n  <!-- Defer loading of non-critical CSS -->\n  <link rel=\"preload\" href=\"/styles.css\" as=\"style\" onload=\"this.onload=null;this.rel='stylesheet'\">\n</head>"
      }
    ]
  },
  'cdn-finder': {
    practical_application: "Identifying the upstream CDN of a competitor or a malicious actor provides vital infrastructure intelligence. Since CDNs like Cloudflare mask the true origin IP, understanding the edge routing layer is the first step in diagnosing DNS propagation issues or understanding a competitor's caching architecture.",
    code_blueprints: [
      {
        language: "bash",
        title: "HTTP Header Inspection",
        code: "# Inspect HTTP headers to identify CDN fingerprints\ncurl -I https://wtkpro.site\n\n# Look for headers like 'cf-ray' (Cloudflare) or 'x-fastly-request-id' (Fastly)"
      }
    ]
  },
  'whois-lookup': {
    practical_application: "WHOIS lookups retrieve domain registration records, revealing the registrar, creation date, and abuse contact information. For cybersecurity teams, identifying newly registered domains (NRDs) that spoof legitimate brands is critical for issuing DMCA takedowns and updating firewall threat-intelligence feeds.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Node.js WHOIS Query",
        code: "const whois = require('whois-json');\n\nasync function checkDomainAvailability(domain) {\n  const results = await whois(domain);\n  return results.domainName ? 'Registered' : 'Available';\n}"
      }
    ]
  },
  'ip-geolocation': {
    practical_application: "IP Geolocation translates an IP address into physical coordinates (City, Country, ASN). E-commerce platforms use this to dynamically enforce region-specific tax laws (VAT), streaming services use it for digital rights management (DRM) geo-blocking, and security teams use it to detect anomalous 'impossible travel' login attempts.",
    code_blueprints: [
      {
        language: "javascript",
        title: "MaxMind GeoLite2 Lookup",
        code: "const geoip = require('geoip-lite');\n\nfunction getCountryFromIp(ipString) {\n  const geo = geoip.lookup(ipString);\n  return geo ? geo.country : 'Unknown'; // e.g., 'US' or 'GB'\n}"
      }
    ]
  },
  'meta-length-checker': {
    practical_application: "Search engines enforce strict pixel limits on Title Tags and Meta Descriptions before truncating them with an ellipsis (...). Exceeding these limits ruins Click-Through Rates (CTR). A strict pixel-width checker ensures your SEO copy displays perfectly on both mobile and desktop SERPs without getting cut off.",
    code_blueprints: [
      {
        language: "html",
        title: "Perfect SEO Limits",
        code: "<!-- Keep Title under 60 characters / 580 pixels -->\n<title>WebToolkit Pro | Advanced Developer Utilities</title>\n\n<!-- Keep Description under 155 characters / 920 pixels -->\n<meta name=\"description\" content=\"A suite of privacy-first, client-side web developer tools designed for high performance.\">"
      }
    ]
  },
  'load-time-estimator': {
    practical_application: "Web performance budgets demand strict asset size controls. A load time estimator calculates the exact milliseconds required to download the page payload across 3G, 4G, and Fiber networks. If the total asset weight exceeds 1MB, the estimator proves that mobile users will bounce before the First Contentful Paint (FCP) fires.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Bandwidth Math Formula",
        code: "function estimateLoadTimeMs(fileSizeBytes, connectionKbps) {\n  const fileSizeBits = fileSizeBytes * 8;\n  const connectionBitsPerSecond = connectionKbps * 1000;\n  const seconds = fileSizeBits / connectionBitsPerSecond;\n  return (seconds * 1000).toFixed(2); // Return milliseconds\n}"
      }
    ]
  },
  'mobile-meta-gen': {
    practical_application: "The mobile viewport meta tag dictates how a browser scales a webpage on touch devices. Omitting this tag forces the browser to render the page at a desktop width (usually 980px) and zoom out, completely destroying the mobile layout and causing Google to apply a heavy SEO 'Mobile-unfriendly' penalty.",
    code_blueprints: [
      {
        language: "html",
        title: "Required Responsive Viewport",
        code: "<!-- Absolutely mandatory for responsive web design -->\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0, maximum-scale=5.0\">\n\n<!-- Apple iOS PWA specific tags -->\n<meta name=\"apple-mobile-web-app-capable\" content=\"yes\">"
      }
    ]
  }
};

let modified = false;

parsed.tools.forEach(tool => {
  if (enhancements[tool.slug]) {
    tool.content.practical_application = enhancements[tool.slug].practical_application;
    tool.content.code_blueprints = enhancements[tool.slug].code_blueprints;
    modified = true;
    console.log(`Updated ${tool.slug}`);
  }
});

if (modified) {
  fs.writeFileSync(yamlFile, yaml.dump(parsed));
  console.log('Successfully injected Batch 8 semantic depth.');
} else {
  console.log('No tools were modified.');
}
