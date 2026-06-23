const fs = require('fs');
const yaml = require('js-yaml'); 

const yamlFile = 'config/tools.yaml';
const fileContent = fs.readFileSync(yamlFile, 'utf8');

const parsed = yaml.load(fileContent);

const enhancements = {
  'url-encoder': {
    practical_application: "URL encoding (Percent-encoding) is vital for ensuring that special characters in query parameters or form submissions don't break the HTTP protocol. When passing dynamic user data (like search terms with ampersands or spaces) into a URL, failing to encode it will lead to broken routing and Server Error 500s on frameworks like Next.js or Express.",
    code_blueprints: [
      {
        language: "javascript",
        title: "JavaScript URI Component Encoding",
        code: "function buildSearchQuery(term) {\n  // encodeURIComponent is safer than encodeURI for query params\n  const safeTerm = encodeURIComponent(term);\n  return `https://api.wtkpro.site/search?q=${safeTerm}`;\n}\n\n// Input: \"apple & banana\"\n// Output: \"apple%20%26%20banana\""
      }
    ]
  },
  'cdn-readiness-tester': {
    practical_application: "A robust Content Delivery Network (CDN) like Cloudflare or Fastly is required to survive traffic spikes and reduce global Time to First Byte (TTFB). Evaluating CDN readiness ensures your assets have appropriate Cache-Control headers, preventing expensive origin fetches and ensuring high availability during DDoS attacks.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Next.js Edge Caching Headers",
        code: "export function GET(request) {\n  return new Response('Asset Data', {\n    status: 200,\n    headers: {\n      // Cache on CDN for 1 day, stale-while-revalidate for seamless updates\n      'Cache-Control': 's-maxage=86400, stale-while-revalidate=3600'\n    }\n  })\n}"
      }
    ]
  },
  'color-contrast': {
    practical_application: "WCAG (Web Content Accessibility Guidelines) AA compliance mandates a minimum contrast ratio of 4.5:1 for normal text. Ensuring high contrast isn't just about inclusivity for visually impaired users; it directly impacts usability on mobile devices under harsh glare and is a ranking factor for Google's UX signals.",
    code_blueprints: [
      {
        language: "css",
        title: "CSS Tailwind Accessible Variables",
        code: ":root {\n  /* Passes WCAG AAA (7.0:1) on white backgrounds */\n  --color-primary-text: #1E2D47;\n  /* Use #F0F6FF for dark mode text */\n}\n\n.alert {\n  background-color: #FEE2E2;\n  color: #991B1B; /* 6.1:1 ratio */\n}"
      }
    ]
  },
  'html-encoder': {
    practical_application: "HTML encoding neutralizes Cross-Site Scripting (XSS) payloads by converting execution characters (`<`, `>`, `\"`) into safe HTML entities (`&lt;`, `&gt;`). If user-generated content (like blog comments or forum posts) is injected directly into the DOM without encoding, attackers can steal authentication cookies.",
    code_blueprints: [
      {
        language: "javascript",
        title: "React Safe Injection",
        code: "function UserComment({ text }) {\n  // React automatically HTML-encodes strings passed to text nodes.\n  // NEVER use dangerouslySetInnerHTML unless absolutely necessary and sanitized via DOMPurify.\n  return <p>{text}</p>;\n}"
      }
    ]
  },
  'timestamp-converter': {
    practical_application: "Unix timestamps (seconds since Jan 1, 1970) are the universal standard for storing absolute time in databases like PostgreSQL or MongoDB because they avoid timezone ambiguity. Converting timestamps correctly ensures accurate chronological sorting, audit logging, and job scheduling in globally distributed architectures.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Node.js Timestamp Validation",
        code: "function isTokenExpired(expTimestamp) {\n  const currentSeconds = Math.floor(Date.now() / 1000);\n  return currentSeconds >= expTimestamp;\n}\n\n// Output standard ISO string for APIs\nconsole.log(new Date().toISOString());"
      }
    ]
  },
  'social-preview-tester': {
    practical_application: "Social preview cards (OpenGraph and Twitter Cards) are the primary drivers of organic click-through rates (CTR) on platforms like X, LinkedIn, and iMessage. Missing or improperly sized `og:image` tags cause platforms to fall back to generic link previews, drastically reducing user engagement and viral coefficient.",
    code_blueprints: [
      {
        language: "html",
        title: "Perfect OpenGraph Headers",
        code: "<meta property=\"og:title\" content=\"WTK Pro Utility\">\n<meta property=\"og:description\" content=\"Fast, secure online tools.\">\n<meta property=\"og:image\" content=\"https://wtkpro.site/og-1200x630.jpg\">\n<meta name=\"twitter:card\" content=\"summary_large_image\">"
      }
    ]
  },
  'word-counter': {
    practical_application: "Content length directly correlates with search engine ranking for long-form informational queries. Additionally, LLM prompt engineering often requires strict token/word limits to prevent truncation. A precise word counter ensures SEO articles hit the 1,500+ word threshold and ad copy remains within platform constraints.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Fast Regex Word Counting",
        code: "function countWords(str) {\n  // Match contiguous word characters, ignoring punctuation\n  const matches = str.match(/\\b\\w+\\b/g);\n  return matches ? matches.length : 0;\n}"
      }
    ]
  },
  'question-explorer': {
    practical_application: "Targeting 'People Also Ask' (PAA) boxes is a dominant strategy in Generative Engine Optimization (GEO). By exploring and answering long-tail semantic questions directly in your content structure using FAQPage schema, you feed directly into Google's Knowledge Graph and voice search algorithms.",
    code_blueprints: [
      {
        language: "json",
        title: "FAQPage JSON-LD Schema",
        code: "{\n  \"@context\": \"https://schema.org\",\n  \"@type\": \"FAQPage\",\n  \"mainEntity\": [{\n    \"@type\": \"Question\",\n    \"name\": \"How does WTK Pro work?\",\n    \"acceptedAnswer\": {\n      \"@type\": \"Answer\",\n      \"text\": \"It processes all data locally.\"\n    }\n  }]\n}"
      }
    ]
  },
  'html-beautifier': {
    practical_application: "When debugging legacy Web Forms, compiled Angular templates, or raw email HTML snippets, code readability drops to zero without proper indentation. Beautifying HTML normalizes node hierarchies, allowing engineers to instantly spot unclosed tags, nested `div` soup, and DOM performance bottlenecks.",
    code_blueprints: [
      {
        language: "javascript",
        title: "Prettier CLI Integration",
        code: "// Prettier can be executed programmatically or via CLI to format HTML\nconst prettier = require(\"prettier\");\n\nasync function formatHTML(rawHtml) {\n  return await prettier.format(rawHtml, { parser: \"html\" });\n}"
      }
    ]
  },
  'diff-checker': {
    practical_application: "Identifying precise insertions, deletions, and modifications between code versions or configuration files is fundamental to Git operations and post-mortem incident reviews. Abstract Syntax Tree (AST) diffing and strict line-by-line comparison help engineers catch zero-day vulnerabilities introduced via malicious PRs.",
    code_blueprints: [
      {
        language: "bash",
        title: "Git Unified Diff Output",
        code: "# Show changes across the entire repository\ngit diff --unified=3\n\n# Compare two branches directly\ngit diff main feature-branch"
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
  console.log('Successfully injected Batch 4 semantic depth.');
} else {
  console.log('No tools were modified.');
}
