/**
 * Blog-to-tool CTA map.
 * Maps each blog slug to the single best tool CTA to show after the article.
 * When no exact slug match exists, the category fallback is used.
 * All tool slugs are verified against lib/tool-registry.json.
 */

export interface ToolCTA {
  slug: string         // Tool route slug → /tools/{slug}/
  name: string         // Short display name
  description: string  // One-line value prop (action-oriented)
  emoji: string        // Visual anchor
  badge?: string       // Optional "Free" | "No sign-up" label
}

// ── SLUG-LEVEL MAP (exact article → primary tool) ──────────────────────────

export const blogToolCTAMap: Record<string, ToolCTA> = {

  // ── JWT ────────────────────────────────────────────────────────────────────
  'decode-jwt-token-without-library': {
    slug: 'jwt-decoder-generator',
    name: 'JWT Decoder & Generator',
    description: 'Paste any JWT and decode its header, payload and signature instantly — no library, no backend.',
    emoji: '🔑',
    badge: 'Privacy-first',
  },
  'generate-jwt-token-online-free': {
    slug: 'jwt-decoder-generator',
    name: 'JWT Decoder & Generator',
    description: 'Generate signed JWTs with any algorithm, then inspect them — all client-side.',
    emoji: '🔑',
    badge: 'Free forever',
  },
  'what-is-jwt-complete-guide': {
    slug: 'jwt-decoder-generator',
    name: 'JWT Decoder & Generator',
    description: 'See JWT in action — paste a real token and decode its claims right now.',
    emoji: '🔑',
    badge: 'No sign-up',
  },
  'jwt-vs-session-cookies-2026': {
    slug: 'jwt-decoder-generator',
    name: 'JWT Decoder & Generator',
    description: 'Inspect JWT tokens vs session tokens side-by-side in your browser.',
    emoji: '🔑',
  },
  'jwt-token-expiry-error-nodejs': {
    slug: 'jwt-decoder-generator',
    name: 'JWT Decoder & Generator',
    description: 'Check your JWT expiry claim (exp) and debug token errors instantly.',
    emoji: '🔑',
    badge: 'Instant',
  },

  // ── JSON ───────────────────────────────────────────────────────────────────
  'validate-json-format-online': {
    slug: 'json-yaml-jsonl-converter',
    name: 'JSON / YAML / JSONL Converter',
    description: 'Validate, format and convert JSON to YAML or JSONL — one tool, zero install.',
    emoji: '📋',
    badge: 'Free forever',
  },
  'json-formatter-vs-jq': {
    slug: 'json-yaml-jsonl-converter',
    name: 'JSON / YAML / JSONL Converter',
    description: 'Format, minify and transform JSON without jq — works in your browser.',
    emoji: '📋',
  },
  'what-is-json-complete-guide': {
    slug: 'json-yaml-jsonl-converter',
    name: 'JSON / YAML / JSONL Converter',
    description: 'Practice with real JSON — format, validate, and convert it right now.',
    emoji: '📋',
    badge: 'No sign-up',
  },
  'json-to-yaml-converter-offline': {
    slug: 'json-yaml-jsonl-converter',
    name: 'JSON / YAML / JSONL Converter',
    description: 'Convert JSON ↔ YAML ↔ JSONL offline — nothing leaves your browser.',
    emoji: '📋',
    badge: 'Offline',
  },
  'json-to-typescript-interface-converter': {
    slug: 'json-to-code-generator',
    name: 'JSON to Code Generator',
    description: 'Generate TypeScript interfaces, Zod schemas and more from any JSON.',
    emoji: '⌨️',
    badge: 'Free',
  },
  'json-to-pydantic-model-generator': {
    slug: 'json-to-code-generator',
    name: 'JSON to Code Generator',
    description: 'Paste JSON and get a ready-to-use Pydantic model in seconds.',
    emoji: '⌨️',
  },
  'csv-to-json-nested-objects-converter': {
    slug: 'csv-json-xml-converter',
    name: 'CSV / JSON / XML Converter',
    description: 'Convert CSV to JSON (flat or nested), XML or JSONL — one click, no upload.',
    emoji: '🔄',
    badge: 'Privacy-first',
  },

  // ── BASE64 & ENCODING ──────────────────────────────────────────────────────
  'what-is-base64-encoding': {
    slug: 'base64-encoder-decoder',
    name: 'Base64 Encoder / Decoder',
    description: 'Encode or decode Base64 strings and files instantly in your browser.',
    emoji: '🔐',
    badge: 'Instant',
  },
  'base64-encode-decode-javascript': {
    slug: 'base64-encoder-decoder',
    name: 'Base64 Encoder / Decoder',
    description: 'Encode any text or file to Base64 (and back) without writing a line of code.',
    emoji: '🔐',
  },

  // ── SECURITY & PASSWORDS ───────────────────────────────────────────────────
  'how-secure-is-my-password': {
    slug: 'password-entropy-tester',
    name: 'Password Entropy Tester',
    description: 'Score your password on real entropy — bits, crack time, and improvement tips.',
    emoji: '🛡️',
    badge: 'Private',
  },
  'calculate-password-entropy-bits': {
    slug: 'password-entropy-tester',
    name: 'Password Entropy Tester',
    description: 'Calculate exact entropy bits and estimated crack time for any password.',
    emoji: '🛡️',
    badge: 'No tracking',
  },
  'bcrypt-vs-argon2-password-hashing': {
    slug: 'bcrypt-hasher',
    name: 'Bcrypt Hasher',
    description: 'Hash and verify passwords with bcrypt, Argon2, or scrypt — client-side.',
    emoji: '🔏',
    badge: 'Free',
  },
  'aes-encryption-javascript-browser': {
    slug: 'aes-encryption',
    name: 'AES Encryption Tool',
    description: 'Encrypt and decrypt strings with AES-256-GCM — entirely in your browser.',
    emoji: '🔒',
    badge: 'Offline',
  },
  'enterprise-web-security-checklist': {
    slug: 'csp-builder',
    name: 'CSP Builder',
    description: 'Build a bulletproof Content Security Policy header — guided and instant.',
    emoji: '🛡️',
  },
  'xss-prevention-guide': {
    slug: 'xss-scanner',
    name: 'XSS Scanner',
    description: 'Test your HTML for common XSS vulnerabilities without sending data to a server.',
    emoji: '🔍',
  },
  'rsa-key-pair-generator': {
    slug: 'rsa-key-gen',
    name: 'RSA Key Generator',
    description: 'Generate RSA 2048 / 4096 key pairs client-side — no server involved.',
    emoji: '🗝️',
    badge: 'Privacy-first',
  },

  // ── HASHING ────────────────────────────────────────────────────────────────
  'what-is-sha256-hashing': {
    slug: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA-1, SHA-256, SHA-512 and more — all client-side.',
    emoji: '#️⃣',
    badge: 'Instant',
  },

  // ── CSS ────────────────────────────────────────────────────────────────────
  'css-gradient-generator-linear-radial': {
    slug: 'css-generators',
    name: 'CSS Generators',
    description: 'Visual gradient, box-shadow and clip-path generators — copy ready CSS.',
    emoji: '🎨',
    badge: 'No install',
  },
  'css-box-shadow-generator-examples': {
    slug: 'css-generators',
    name: 'CSS Generators',
    description: 'Generate perfect box-shadow values visually and copy the CSS instantly.',
    emoji: '🎨',
  },
  'px-to-rem-css-accessibility-guide': {
    slug: 'px-rem-converter',
    name: 'PX ↔ REM Converter',
    description: 'Convert px to rem (and back) with a configurable base font size — one click.',
    emoji: '📐',
    badge: 'Instant',
  },
  'modern-css-architecture': {
    slug: 'css-formatter-minifier',
    name: 'CSS Formatter & Minifier',
    description: 'Beautify or minify your CSS — removes unused whitespace and comments.',
    emoji: '✨',
  },
  'wcag-color-contrast-requirements-2026': {
    slug: 'color-contrast',
    name: 'Color Contrast Checker',
    description: 'Check WCAG 2.1 AA/AAA contrast ratios for any color pair — instant pass/fail.',
    emoji: '👁️',
    badge: 'WCAG 2.1',
  },

  // ── REGEX ──────────────────────────────────────────────────────────────────
  'regex-cheat-sheet-javascript': {
    slug: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test and debug regex patterns with real-time match highlighting — no JS required.',
    emoji: '⚡',
    badge: 'Instant',
  },
  'regex-lookahead-lookbehind-guide': {
    slug: 'regex-explainer',
    name: 'Regex Explainer',
    description: 'Paste any regex and get a plain-English breakdown of what every part does.',
    emoji: '⚡',
    badge: 'AI-powered',
  },

  // ── SEO ────────────────────────────────────────────────────────────────────
  'seo-meta-tags-complete-guide': {
    slug: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    description: 'Generate perfect title, description and OG tags — with live preview.',
    emoji: '🏷️',
    badge: 'Free',
  },
  'canonical-url-seo-duplicate-content': {
    slug: 'canonical-checker',
    name: 'Canonical Checker',
    description: 'Verify canonical tags on any live URL — catch duplicate content issues fast.',
    emoji: '🔗',
  },
  'robots-txt-guide-block-ai-crawlers-2026': {
    slug: 'robots-txt-toolkit',
    name: 'robots.txt Toolkit',
    description: 'Build, validate and test your robots.txt — block AI crawlers in seconds.',
    emoji: '🤖',
    badge: 'AI-ready',
  },
  'xml-sitemap-best-practices-2026': {
    slug: 'sitemap-generator',
    name: 'Sitemap Generator',
    description: 'Generate a valid XML sitemap from any URL list — ready to submit to Google.',
    emoji: '🗺️',
  },
  'faq-schema-markup-google-rich-results': {
    slug: 'schema-markup-generator',
    name: 'Schema Markup Generator',
    description: 'Generate FAQ, Article, Product and HowTo JSON-LD schema — copy-paste ready.',
    emoji: '📊',
    badge: 'Rich results',
  },
  'add-schema-markup-without-plugin': {
    slug: 'schema-markup-generator',
    name: 'Schema Markup Generator',
    description: 'Add structured data to any page without a plugin — JSON-LD generated instantly.',
    emoji: '📊',
  },
  'seo-audit-checklist-2026': {
    slug: 'site-audit-pro',
    name: 'Site Audit Pro',
    description: 'Run a full technical SEO audit on any URL — checks 40+ signals instantly.',
    emoji: '✅',
    badge: 'Free audit',
  },
  'core-web-vitals-guide': {
    slug: 'load-time-estimator',
    name: 'Load Time Estimator',
    description: 'Estimate Core Web Vitals impact by simulating different network conditions.',
    emoji: '⚡',
  },
  'url-slug-seo-best-practices': {
    slug: 'slug-generator',
    name: 'Slug Generator',
    description: 'Generate SEO-friendly URL slugs from any title or phrase — instant.',
    emoji: '🔗',
    badge: 'Instant',
  },

  // ── SERVER / INFRASTRUCTURE ────────────────────────────────────────────────
  'htaccess-cheat-sheet-wordpress': {
    slug: 'htaccess-generator',
    name: '.htaccess Generator',
    description: 'Generate .htaccess redirect rules, rewrites and security headers visually.',
    emoji: '⚙️',
    badge: 'No install',
  },
  '301-vs-302-vs-307-redirects': {
    slug: 'redirect-checker',
    name: 'Redirect Checker',
    description: 'Trace full redirect chains and verify 301/302/307 responses on any URL.',
    emoji: '↩️',
  },
  'nginx-config-generator-reverse-proxy': {
    slug: 'nginx-generator',
    name: 'NGINX Config Generator',
    description: 'Generate NGINX server blocks, reverse proxy configs and SSL rules visually.',
    emoji: '🔧',
    badge: 'Free',
  },
  'docker-compose-generator-tutorial': {
    slug: 'docker-compose-gen',
    name: 'Docker Compose Generator',
    description: 'Generate docker-compose.yml for any stack — Node, PostgreSQL, Redis and more.',
    emoji: '🐳',
  },
  'dns-propagation-how-long-check': {
    slug: 'dns-propagation',
    name: 'DNS Propagation Checker',
    description: 'Check DNS propagation across global nameservers — real-time results.',
    emoji: '🌐',
    badge: 'Real-time',
  },
  'ssl-certificate-expired-check-fix': {
    slug: 'ssl-checker',
    name: 'SSL Certificate Checker',
    description: 'Check SSL expiry, chain validity and cipher strength on any domain.',
    emoji: '🔒',
    badge: 'Instant',
  },

  // ── KUBERNETES / DEVOPS ────────────────────────────────────────────────────
  'kubernetes-yaml-validator-guide': {
    slug: 'k8s-yaml-validator',
    name: 'K8s YAML Validator',
    description: 'Validate Kubernetes manifests for syntax errors and common misconfigurations.',
    emoji: '☸️',
    badge: 'Free',
  },
  'cron-expression-guide-examples': {
    slug: 'cron-generator',
    name: 'Cron Expression Generator',
    description: 'Build cron schedules visually and get a plain-English description instantly.',
    emoji: '⏰',
    badge: 'Instant',
  },
  'cron-syntax-complete-reference': {
    slug: 'cron-descriptor',
    name: 'Cron Descriptor',
    description: 'Paste any cron expression and get a human-readable explanation in seconds.',
    emoji: '⏰',
  },

  // ── PERFORMANCE & WEB ──────────────────────────────────────────────────────
  '3ms-ttfb-performance-study': {
    slug: 'api-latency-calculator',
    name: 'API Latency Calculator',
    description: 'Calculate real-world API response time budgets and TTFB targets.',
    emoji: '📊',
  },
  'gzip-brotli-compression-web-performance': {
    slug: 'site-audit-pro',
    name: 'Site Audit Pro',
    description: 'Check if your site is serving Brotli/gzip compression — and 39 other signals.',
    emoji: '🗜️',
  },
  'favicon-sizes-complete-guide-2026': {
    slug: 'favicon-generator',
    name: 'Favicon Generator',
    description: 'Generate all favicon sizes (16×16 to 512×512) from a single image — instant.',
    emoji: '🖼️',
    badge: 'Free',
  },

  // ── DIFF / TEXT ────────────────────────────────────────────────────────────
  'what-is-unified-diff': {
    slug: 'diff-checker',
    name: 'Diff Checker',
    description: 'Compare two code blocks or text files and see differences highlighted instantly.',
    emoji: '📝',
    badge: 'No upload',
  },

  // ── AI / MODERN WEB ────────────────────────────────────────────────────────
  'ai-first-development-2026': {
    slug: 'prompt-token-calculator',
    name: 'Prompt Token Calculator',
    description: 'Count tokens for GPT-4, Claude and Gemini prompts — optimize your AI costs.',
    emoji: '🤖',
    badge: 'AI tools',
  },
  'llms-txt-standard-ai-visibility': {
    slug: 'llms-txt-generator',
    name: 'llms.txt Generator',
    description: 'Generate an llms.txt file that makes your site readable by AI agents.',
    emoji: '🤖',
    badge: 'AI-ready',
  },

  // ── MARKDOWN ───────────────────────────────────────────────────────────────
  'markdown-vs-html-content': {
    slug: 'markdown-html-converter',
    name: 'Markdown ↔ HTML Converter',
    description: 'Convert Markdown to HTML (and back) with a live preview — zero install.',
    emoji: '📄',
  },
}

// ── CATEGORY-LEVEL FALLBACK MAP ────────────────────────────────────────────
// Used when no exact slug entry exists for an article.

export const categoryToolCTAFallback: Record<string, ToolCTA> = {
  'Security': {
    slug: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate MD5, SHA-256, SHA-512 and more — all in your browser, nothing uploaded.',
    emoji: '#️⃣',
    badge: 'Privacy-first',
  },
  'SEO': {
    slug: 'meta-tag-generator',
    name: 'Meta Tag Generator',
    description: 'Generate perfect SEO meta tags for any page — with live Google snippet preview.',
    emoji: '🏷️',
    badge: 'Free',
  },
  'SEO Tools': {
    slug: 'site-audit-pro',
    name: 'Site Audit Pro',
    description: 'Run a full technical SEO audit — checks 40+ on-page and technical signals.',
    emoji: '✅',
    badge: 'Free audit',
  },
  'CSS': {
    slug: 'css-generators',
    name: 'CSS Generators',
    description: 'Visual gradient, shadow and clip-path tools — copy production-ready CSS.',
    emoji: '🎨',
  },
  'Design Tools': {
    slug: 'color-contrast',
    name: 'Color Contrast Checker',
    description: 'Verify WCAG 2.1 contrast ratios — make your UI accessible and pass audits.',
    emoji: '👁️',
  },
  'Tutorials': {
    slug: 'json-yaml-jsonl-converter',
    name: 'JSON / YAML / JSONL Converter',
    description: 'Format, validate and convert JSON in your browser — free forever.',
    emoji: '📋',
    badge: 'Instant',
  },
  'Developer Tools': {
    slug: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test regex patterns with real-time match highlighting — no JS required.',
    emoji: '⚡',
  },
  'Research': {
    slug: 'site-audit-pro',
    name: 'Site Audit Pro',
    description: 'Run a full technical audit on any live URL — 40+ signals in seconds.',
    emoji: '✅',
    badge: 'Free',
  },
  'Engineering': {
    slug: 'docker-compose-gen',
    name: 'Docker Compose Generator',
    description: 'Generate a docker-compose.yml for any stack — guided and instant.',
    emoji: '🐳',
  },
}

// ── LOOKUP HELPER ───────────────────────────────────────────────────────────

/**
 * Returns the best tool CTA for a given blog slug and category.
 * Falls back to category-level CTA, then to a generic WTKPro CTA.
 */
export function getToolCTAForPost(slug: string, category: string): ToolCTA {
  return (
    blogToolCTAMap[slug] ??
    categoryToolCTAFallback[category] ?? {
      slug: '',   // empty = link to /tools/ hub
      name: 'WebToolkit Pro — 150+ Free Tools',
      description: 'Developer tools, SEO utilities, converters and more — all free, all private, no sign-up.',
      emoji: '🛠️',
      badge: 'Free forever',
    }
  )
}
