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
  'csp-builder': {
    seo: {
      title: 'CSP Builder — Content Security Policy Generator',
      description: 'Generate a secure Content Security Policy (CSP) header for your website. Prevent XSS and data injection attacks by defining strict, allowed origins for your scripts and assets.',
      keywords: ['csp builder', 'content security policy generator', 'generate csp header', 'xss prevention tool', 'csp header creator'],
      tldr: 'Visually generate a strict Content Security Policy to protect your site from XSS attacks.',
      entity_definition: 'The CSP Builder is a cybersecurity configuration utility. A Content Security Policy (CSP) is an HTTP header that allows site administrators to declare approved sources of content that the browser may load. This tool provides a visual interface to construct complex CSP directives (`script-src`, `style-src`, etc.), safely generating the correct syntax required to mitigate Cross-Site Scripting (XSS) and data injection vulnerabilities.'
    },
    faqs: [
      {
        question: 'What is XSS?',
        answer: 'Cross-Site Scripting (XSS) is a vulnerability where an attacker injects malicious JavaScript into your site. A strict CSP prevents the browser from executing unauthorized scripts, neutralizing the attack.'
      },
      {
        question: 'What does "unsafe-inline" mean?',
        answer: 'It is a CSP directive that allows the execution of inline `<script>` or `<style>` tags directly in your HTML. Security experts strongly advise avoiding this, as it severely weakens XSS protections.'
      },
      {
        question: 'How do I apply the CSP?',
        answer: 'You can apply it by returning a `Content-Security-Policy` header from your web server, or by embedding it directly into your HTML using a `<meta http-equiv="Content-Security-Policy" content="...">` tag.'
      }
    ]
  },
  'hsts-gen': {
    seo: {
      title: 'HSTS Policy Generator — Strict-Transport-Security',
      description: 'Generate an HTTP Strict Transport Security (HSTS) header policy. Protect your users from man-in-the-middle attacks and SSL stripping by forcing HTTPS connections.',
      keywords: ['hsts generator', 'strict transport security', 'hsts header creator', 'force https header', 'hsts preload list'],
      tldr: 'Generate a Strict-Transport-Security header to ensure browsers only connect via HTTPS.',
      entity_definition: 'The HSTS Policy Generator is a server security utility. HTTP Strict Transport Security (HSTS) is a web security policy mechanism that helps protect websites against man-in-the-middle attacks such as protocol downgrade attacks and cookie hijacking. This tool generates the exact `Strict-Transport-Security` HTTP header syntax, allowing administrators to configure the `max-age`, subdomain inclusion, and browser preloading parameters.'
    },
    faqs: [
      {
        question: 'What is SSL Stripping?',
        answer: 'SSL stripping is an attack where a hacker intercepts an initial HTTP request and prevents the server from redirecting the user to a secure HTTPS connection. HSTS prevents this by telling the browser to always use HTTPS natively.'
      },
      {
        question: 'What does the "preload" directive do?',
        answer: 'Preloading tells browsers (like Chrome and Firefox) to hardcode your domain into their internal list of HTTPS-only websites. This ensures that even the very first visit to your site is strictly via HTTPS.'
      },
      {
        question: 'How long should max-age be?',
        answer: 'For maximum security and to qualify for the official browser preload list, your `max-age` must be at least 31536000 seconds (1 year).'
      }
    ]
  },
  'permissions-policy': {
    seo: {
      title: 'Permissions-Policy Generator — Feature Policy Builder',
      description: 'Generate a Permissions-Policy (Feature Policy) HTTP header. Restrict access to sensitive browser APIs like the Camera, Microphone, and Geolocation for enhanced privacy.',
      keywords: ['permissions policy generator', 'feature policy builder', 'restrict browser api', 'permissions-policy header', 'disable geolocation web'],
      tldr: 'Restrict access to sensitive browser features by generating a strict Permissions-Policy header.',
      entity_definition: 'The Permissions-Policy Generator is a web privacy utility. The `Permissions-Policy` (formerly Feature Policy) HTTP header allows site owners to explicitly declare which web platform features—such as the Camera, Microphone, WebUSB, or Geolocation—can be used on their domain or within embedded iframes. This tool generates the complex comma-separated syntax required to selectively enable or disable these powerful APIs, ensuring malicious third-party scripts cannot compromise user privacy.'
    },
    faqs: [
      {
        question: 'What happened to Feature-Policy?',
        answer: '`Feature-Policy` was the original name for this header. The W3C standardized and renamed it to `Permissions-Policy`, updating the syntax to use parentheses and commas instead of spaces.'
      },
      {
        question: 'What does "self" mean?',
        answer: 'Using `self` means the feature (like the camera) is only allowed for the same origin (your exact domain). Third-party scripts or iframes from other domains will be blocked from using it.'
      },
      {
        question: 'How do I block a feature entirely?',
        answer: 'To completely disable a feature for all scripts and iframes on your page, set its value to `()` (which represents an empty allowlist) or "none".'
      }
    ]
  },
  'ssl-checker': {
    seo: {
      title: 'SSL Certificate Inspector — Check HTTPS Validity',
      description: 'Inspect and verify the SSL/TLS certificate of any website. Check expiration dates, issuer details, algorithm strength, and supported TLS protocols instantly.',
      keywords: ['ssl checker', 'check ssl certificate', 'https inspector', 'tls protocol check', 'verify ssl expiration'],
      tldr: 'Inspect your domain\'s SSL/TLS certificate to verify its expiration date and encryption strength.',
      entity_definition: 'The SSL Certificate Inspector is an infrastructure diagnostic utility. Secure Sockets Layer (SSL) and its modern successor, Transport Layer Security (TLS), are cryptographic protocols designed to provide communications security over a network. This tool interrogates a server\'s public HTTPS certificate, extracting critical metadata including the Certificate Authority (Issuer), RSA/ECC encryption algorithms, and the exact expiration timestamp, allowing administrators to audit their cryptographic posture.'
    },
    faqs: [
      {
        question: 'Why do SSL certificates expire?',
        answer: 'Certificates expire to ensure that identity and server ownership are re-validated regularly, and to force the adoption of newer, stronger encryption algorithms over time.'
      },
      {
        question: 'What is Let\'s Encrypt?',
        answer: 'Let\'s Encrypt is a free, automated, and open Certificate Authority (CA) run for the public\'s benefit. They provide 90-day SSL certificates that modern web servers auto-renew.'
      },
      {
        question: 'What is the difference between SSL and TLS?',
        answer: 'TLS is simply the newer, more secure version of SSL. However, the industry still colloquially refers to "TLS Certificates" as "SSL Certificates" due to historical habit.'
      }
    ]
  },
  'header-inspector': {
    seo: {
      title: 'HTTP Header Inspector — Analyze Server Responses',
      description: 'Fetch and inspect the HTTP response headers of any web page. Analyze caching policies, security configurations, and server metadata to optimize your web application.',
      keywords: ['http header inspector', 'check response headers', 'fetch http headers', 'analyze server headers', 'curl headers online'],
      tldr: 'Fetch and analyze the raw HTTP response headers returned by a web server.',
      entity_definition: 'The HTTP Header Inspector is a network diagnostic utility. When a browser requests a web page, the server responds with a payload of HTML, but prepends it with invisible metadata known as HTTP Headers. This tool executes a standard HTTP GET or HEAD request to a target URL, extracting and formatting the raw headers. Developers use this to debug proxy configurations, verify gzip/Brotli compression, and audit security policies like X-Frame-Options.'
    },
    faqs: [
      {
        question: 'What is Cache-Control?',
        answer: '`Cache-Control` is a crucial HTTP header that dictates how, and for how long, browsers and CDNs are allowed to cache the server\'s response before requesting a fresh copy.'
      },
      {
        question: 'What does "X-Powered-By" do?',
        answer: '`X-Powered-By` is a legacy header that reveals the backend technology (e.g., PHP, Express, Next.js). Security experts recommend removing this header to avoid disclosing your technology stack to attackers.'
      },
      {
        question: 'Why am I seeing different headers than in Chrome DevTools?',
        answer: 'Servers can respond differently based on the client\'s geographical location, the User-Agent, or the presence of specific cookies. Our tool fetches headers from a neutral, stateless server environment.'
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
console.log('Successfully updated', updatedCount, 'tools in tools.yaml for Batch 24');
