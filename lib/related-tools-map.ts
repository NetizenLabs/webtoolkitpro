export const RELATED_TOOLS_MAP: Record<string, any> = {
  'json-formatter': {
    featured: { name: 'JSON to CSV Converter', href: '/tools/json-to-csv/', desc: 'Export API data to spreadsheet format', icon: '📊', badge: 'New' },
    cards: [
      { name: 'URL Encoder', href: '/tools/url-encoder/', desc: 'Encode query strings safely', icon: '🔗' },
      { name: 'Hash Generator', href: '/tools/hash-generator/', desc: 'MD5, SHA-256, SHA-512', icon: '🔐' },
      { name: 'Base64 Encoder', href: '/tools/base64-encoder/', desc: 'Encode JSON payloads', icon: '🧩' },
    ],
    pills: [
      { name: 'Markdown Converter', href: '/tools/markdown-converter/' },
      { name: 'HTML Encoder', href: '/tools/html-encoder/' },
      { name: 'Timestamp Converter', href: '/tools/timestamp-converter/' },
      { name: 'UUID Generator', href: '/tools/uuid-generator/' },
      { name: 'Binary Converter', href: '/tools/binary-converter/' },
    ]
  },
  'base64-encoder': {
    featured: { name: 'JWT Decoder', href: '/tools/jwt-decoder/', desc: 'Decode JWT tokens instantly', icon: '🔑', badge: 'New' },
    cards: [
      { name: 'URL Encoder', href: '/tools/url-encoder/', desc: 'Encode query strings safely', icon: '🔗' },
      { name: 'Hash Generator', href: '/tools/hash-generator/', desc: 'MD5, SHA-256, SHA-512', icon: '🔐' },
      { name: 'HTML Encoder', href: '/tools/html-encoder/', desc: 'Encode special characters', icon: '📄' },
    ],
    pills: [
      { name: 'JSON Formatter', href: '/tools/json-formatter/' },
      { name: 'Binary Converter', href: '/tools/binary-converter/' },
      { name: 'Case Converter', href: '/tools/case-converter/' },
      { name: 'Markdown Converter', href: '/tools/markdown-converter/' },
      { name: 'UUID Generator', href: '/tools/uuid-generator/' },
    ]
  },
  'url-encoder': {
    featured: { name: 'JSON Formatter', href: '/tools/json-formatter/', desc: 'Prettify and validate JSON', icon: '📋' },
    cards: [
      { name: 'Base64 Encoder', href: '/tools/base64-encoder/', desc: 'Encode binary data', icon: '🧩' },
      { name: 'Hash Generator', href: '/tools/hash-generator/', desc: 'MD5, SHA-256, SHA-512', icon: '🔐' },
      { name: 'Timestamp Converter', href: '/tools/timestamp-converter/', desc: 'Unix to human readable', icon: '⏱️' },
    ],
    pills: [
      { name: 'UUID Generator', href: '/tools/uuid-generator/' },
      { name: 'HTML Encoder', href: '/tools/html-encoder/' },
      { name: 'Markdown Converter', href: '/tools/markdown-converter/' },
      { name: 'Case Converter', href: '/tools/case-converter/' },
      { name: 'Binary Converter', href: '/tools/binary-converter/' },
    ]
  },
  'hash-generator': {
    featured: { name: 'JWT Decoder', href: '/tools/jwt-decoder/', desc: 'Decode JWT tokens instantly', icon: '🔑', badge: 'New' },
    cards: [
      { name: 'Password Generator', href: '/tools/password-generator/', desc: 'Generate secure passwords', icon: '🎲' },
      { name: 'UUID Generator', href: '/tools/uuid-generator/', desc: 'Generate v4 UUIDs', icon: '🆔' },
      { name: 'Base64 Encoder', href: '/tools/base64-encoder/', desc: 'Encode binary data', icon: '🧩' },
    ],
    pills: [
      { name: 'UUID v7 Generator', href: '/tools/uuid-v7-generator/' },
      { name: 'URL Encoder', href: '/tools/url-encoder/' },
      { name: 'HTML Encoder', href: '/tools/html-encoder/' },
      { name: 'Binary Converter', href: '/tools/binary-converter/' },
      { name: 'JSON Formatter', href: '/tools/json-formatter/' },
    ]
  },
  'password-generator': {
    featured: { name: 'Hash Generator', href: '/tools/hash-generator/', desc: 'MD5, SHA-256, SHA-512', icon: '🔐' },
    cards: [
      { name: 'JWT Decoder', href: '/tools/jwt-decoder/', desc: 'Decode JWT tokens instantly', icon: '🔑', badge: 'New' },
      { name: 'UUID Generator', href: '/tools/uuid-generator/', desc: 'Generate v4 UUIDs', icon: '🆔' },
      { name: 'Base64 Encoder', href: '/tools/base64-encoder/', desc: 'Encode binary data', icon: '🧩' },
    ],
    pills: [
      { name: 'UUID v7 Generator', href: '/tools/uuid-v7-generator/' },
      { name: 'HTML Encoder', href: '/tools/html-encoder/' },
      { name: 'Binary Converter', href: '/tools/binary-converter/' },
      { name: 'Case Converter', href: '/tools/case-converter/' },
      { name: 'Timestamp Converter', href: '/tools/timestamp-converter/' },
    ]
  },
  'meta-tag-generator': {
    featured: { name: 'Schema Generator', href: '/tools/schema-generator/', desc: 'Structured data for Google', icon: '🤖', badge: 'GEO' },
    cards: [
      { name: 'Social Preview Tester', href: '/tools/social-preview-tester/', desc: 'Test OG & Twitter cards', icon: '📱' },
      { name: 'Robots.txt Generator', href: '/tools/robots-generator/', desc: 'Crawl control for bots', icon: '🤖' },
      { name: 'Sitemap Validator', href: '/tools/sitemap-validator/', desc: 'Validate XML sitemaps', icon: '🗺️' },
    ],
    pills: [
      { name: 'SEO Audit Checklist', href: '/tools/seo-audit-checklist/' },
      { name: 'Word Counter', href: '/tools/word-counter/' },
      { name: 'URL Encoder', href: '/tools/url-encoder/' },
      { name: 'Core Web Vitals Guide', href: '/tools/core-web-vitals-guide/' },
      { name: 'Robots.txt Templates', href: '/tools/robots-txt-templates/' },
    ]
  },
  'schema-generator': {
    featured: { name: 'Meta Tag Generator', href: '/tools/meta-tag-generator/', desc: 'SEO title and meta tags', icon: '🏷️' },
    cards: [
      { name: 'Robots.txt Generator', href: '/tools/robots-generator/', desc: 'Crawl control for bots', icon: '🤖' },
      { name: 'Sitemap Validator', href: '/tools/sitemap-validator/', desc: 'Validate XML sitemaps', icon: '🗺️' },
      { name: 'SEO Audit Checklist', href: '/tools/seo-audit-checklist/', desc: 'Standardized SEO check', icon: '✅' },
    ],
    pills: [
      { name: 'Social Preview Tester', href: '/tools/social-preview-tester/' },
      { name: 'Word Counter', href: '/tools/word-counter/' },
      { name: 'Core Web Vitals Guide', href: '/tools/core-web-vitals-guide/' },
      { name: 'URL Encoder', href: '/tools/url-encoder/' },
      { name: 'Robots.txt Templates', href: '/tools/robots-txt-templates/' },
    ]
  },
  'robots-generator': {
    featured: { name: 'Sitemap Validator', href: '/tools/sitemap-validator/', desc: 'Validate XML sitemaps', icon: '🗺️' },
    cards: [
      { name: 'Meta Tag Generator', href: '/tools/meta-tag-generator/', desc: 'SEO title and meta tags', icon: '🏷️' },
      { name: 'Schema Generator', href: '/tools/schema-generator/', desc: 'Structured data for Google', icon: '🤖', badge: 'GEO' },
      { name: 'SEO Audit Checklist', href: '/tools/seo-audit-checklist/', desc: 'Standardized SEO check', icon: '✅' },
    ],
    pills: [
      { name: 'Core Web Vitals Guide', href: '/tools/core-web-vitals-guide/' },
      { name: 'Social Preview Tester', href: '/tools/social-preview-tester/' },
      { name: 'Robots.txt Templates', href: '/tools/robots-txt-templates/' },
      { name: 'URL Encoder', href: '/tools/url-encoder/' },
      { name: 'Word Counter', href: '/tools/word-counter/' },
    ]
  },
  'sitemap-validator': {
    featured: { name: 'Robots.txt Generator', href: '/tools/robots-generator/', desc: 'Crawl control for bots', icon: '🤖' },
    cards: [
      { name: 'Meta Tag Generator', href: '/tools/meta-tag-generator/', desc: 'SEO title and meta tags', icon: '🏷️' },
      { name: 'Schema Generator', href: '/tools/schema-generator/', desc: 'Structured data for Google', icon: '🤖', badge: 'GEO' },
      { name: 'SEO Audit Checklist', href: '/tools/seo-audit-checklist/', desc: 'Standardized SEO check', icon: '✅' },
    ],
    pills: [
      { name: 'Core Web Vitals Guide', href: '/tools/core-web-vitals-guide/' },
      { name: 'Social Preview Tester', href: '/tools/social-preview-tester/' },
      { name: 'URL Encoder', href: '/tools/url-encoder/' },
      { name: 'Word Counter', href: '/tools/word-counter/' },
      { name: 'Robots.txt Templates', href: '/tools/robots-txt-templates/' },
    ]
  },
  'social-preview-tester': {
    featured: { name: 'Meta Tag Generator', href: '/tools/meta-tag-generator/', desc: 'SEO title and meta tags', icon: '🏷️' },
    cards: [
      { name: 'Schema Generator', href: '/tools/schema-generator/', desc: 'Structured data for Google', icon: '🤖', badge: 'GEO' },
      { name: 'SEO Audit Checklist', href: '/tools/seo-audit-checklist/', desc: 'Standardized SEO check', icon: '✅' },
      { name: 'Word Counter', href: '/tools/word-counter/', desc: 'Count characters and words', icon: '📝' },
    ],
    pills: [
      { name: 'Robots.txt Generator', href: '/tools/robots-generator/' },
      { name: 'Sitemap Validator', href: '/tools/sitemap-validator/' },
      { name: 'URL Encoder', href: '/tools/url-encoder/' },
      { name: 'Core Web Vitals Guide', href: '/tools/core-web-vitals-guide/' },
      { name: 'Robots.txt Templates', href: '/tools/robots-txt-templates/' },
    ]
  },
  'word-counter': {
    featured: { name: 'Meta Tag Generator', href: '/tools/meta-tag-generator/', desc: 'SEO title and meta tags', icon: '🏷️' },
    cards: [
      { name: 'Markdown Previewer', href: '/tools/markdown-previewer/', desc: 'Render MD to HTML', icon: '📄' },
      { name: 'Case Converter', href: '/tools/case-converter/', desc: 'Upper, lower, title case', icon: '🔤' },
      { name: 'Lorem Ipsum', href: '/tools/lorem-ipsum/', desc: 'Placeholder text generator', icon: '📝' },
    ],
    pills: [
      { name: 'Markdown Converter', href: '/tools/markdown-converter/' },
      { name: 'URL Encoder', href: '/tools/url-encoder/' },
      { name: 'SEO Audit Checklist', href: '/tools/seo-audit-checklist/' },
      { name: 'Social Preview Tester', href: '/tools/social-preview-tester/' },
      { name: 'Schema Generator', href: '/tools/schema-generator/' },
    ]
  },
  'markdown-converter': {
    featured: { name: 'Markdown Previewer', href: '/tools/markdown-previewer/', desc: 'Render MD to HTML', icon: '📄' },
    cards: [
      { name: 'Word Counter', href: '/tools/word-counter/', desc: 'Count characters and words', icon: '📝' },
      { name: 'HTML Encoder', href: '/tools/html-encoder/', desc: 'Encode special characters', icon: '📄' },
      { name: 'Case Converter', href: '/tools/case-converter/', desc: 'Upper, lower, title case', icon: '🔤' },
    ],
    pills: [
      { name: 'Lorem Ipsum', href: '/tools/lorem-ipsum/' },
      { name: 'JSON Formatter', href: '/tools/json-formatter/' },
      { name: 'URL Encoder', href: '/tools/url-encoder/' },
      { name: 'Base64 Encoder', href: '/tools/base64-encoder/' },
      { name: 'Meta Tag Generator', href: '/tools/meta-tag-generator/' },
    ]
  },
  'markdown-previewer': {
    featured: { name: 'Markdown Converter', href: '/tools/markdown-converter/', desc: 'MD to HTML converter', icon: '🧩' },
    cards: [
      { name: 'Word Counter', href: '/tools/word-counter/', desc: 'Count characters and words', icon: '📝' },
      { name: 'Lorem Ipsum', href: '/tools/lorem-ipsum/', desc: 'Placeholder text generator', icon: '📝' },
      { name: 'HTML Encoder', href: '/tools/html-encoder/', desc: 'Encode special characters', icon: '📄' },
    ],
    pills: [
      { name: 'Case Converter', href: '/tools/case-converter/' },
      { name: 'Meta Tag Generator', href: '/tools/meta-tag-generator/' },
      { name: 'SEO Audit Checklist', href: '/tools/seo-audit-checklist/' },
      { name: 'URL Encoder', href: '/tools/url-encoder/' },
      { name: 'Schema Generator', href: '/tools/schema-generator/' },
    ]
  },
  'html-encoder': {
    featured: { name: 'JSON Formatter', href: '/tools/json-formatter/', desc: 'Prettify and validate JSON', icon: '📋' },
    cards: [
      { name: 'Base64 Encoder', href: '/tools/base64-encoder/', desc: 'Encode binary data', icon: '🧩' },
      { name: 'URL Encoder', href: '/tools/url-encoder/', desc: 'Encode query strings safely', icon: '🔗' },
      { name: 'Markdown Converter', href: '/tools/markdown-converter/', desc: 'MD to HTML converter', icon: '🧩' },
    ],
    pills: [
      { name: 'JS Minifier', href: '/tools/js-minifier/' },
      { name: 'Case Converter', href: '/tools/case-converter/' },
      { name: 'Hash Generator', href: '/tools/hash-generator/' },
      { name: 'UUID Generator', href: '/tools/uuid-generator/' },
      { name: 'Binary Converter', href: '/tools/binary-converter/' },
    ]
  },
  'js-minifier': {
    featured: { name: 'HTML Encoder', href: '/tools/html-encoder/', desc: 'Encode special characters', icon: '📄' },
    cards: [
      { name: 'JSON Formatter', href: '/tools/json-formatter/', desc: 'Prettify and validate JSON', icon: '📋' },
      { name: 'Markdown Converter', href: '/tools/markdown-converter/', desc: 'MD to HTML converter', icon: '🧩' },
      { name: 'Base64 Encoder', href: '/tools/base64-encoder/', desc: 'Encode binary data', icon: '🧩' },
    ],
    pills: [
      { name: 'URL Encoder', href: '/tools/url-encoder/' },
      { name: 'Hash Generator', href: '/tools/hash-generator/' },
      { name: 'Case Converter', href: '/tools/case-converter/' },
      { name: 'UUID Generator', href: '/tools/uuid-generator/' },
      { name: 'CSS Unit Converter', href: '/tools/css-unit-converter/' },
    ]
  },
  'case-converter': {
    featured: { name: 'Word Counter', href: '/tools/word-counter/', desc: 'Count characters and words', icon: '📝' },
    cards: [
      { name: 'Markdown Converter', href: '/tools/markdown-converter/', desc: 'MD to HTML converter', icon: '🧩' },
      { name: 'Lorem Ipsum', href: '/tools/lorem-ipsum/', desc: 'Placeholder text generator', icon: '📝' },
      { name: 'URL Encoder', href: '/tools/url-encoder/', desc: 'Encode query strings safely', icon: '🔗' },
    ],
    pills: [
      { name: 'HTML Encoder', href: '/tools/html-encoder/' },
      { name: 'Base64 Encoder', href: '/tools/base64-encoder/' },
      { name: 'JSON Formatter', href: '/tools/json-formatter/' },
      { name: 'Meta Tag Generator', href: '/tools/meta-tag-generator/' },
      { name: 'Markdown Previewer', href: '/tools/markdown-previewer/' },
    ]
  },
  'lorem-ipsum': {
    featured: { name: 'Word Counter', href: '/tools/word-counter/', desc: 'Count characters and words', icon: '📝' },
    cards: [
      { name: 'Markdown Previewer', href: '/tools/markdown-previewer/', desc: 'Render MD to HTML', icon: '📄' },
      { name: 'Case Converter', href: '/tools/case-converter/', desc: 'Upper, lower, title case', icon: '🔤' },
      { name: 'Meta Tag Generator', href: '/tools/meta-tag-generator/', desc: 'SEO title and meta tags', icon: '🏷️' },
    ],
    pills: [
      { name: 'HTML Encoder', href: '/tools/html-encoder/' },
      { name: 'JSON Formatter', href: '/tools/json-formatter/' },
      { name: 'Markdown Converter', href: '/tools/markdown-converter/' },
      { name: 'Schema Generator', href: '/tools/schema-generator/' },
      { name: 'Social Preview Tester', href: '/tools/social-preview-tester/' },
    ]
  },
  'uuid-generator': {
    featured: { name: 'UUID v7 Generator', href: '/tools/uuid-v7-generator/', desc: 'Next-gen time-sorted UUIDs', icon: '🆔', badge: 'New' },
    cards: [
      { name: 'Hash Generator', href: '/tools/hash-generator/', desc: 'MD5, SHA-256, SHA-512', icon: '🔐' },
      { name: 'Password Generator', href: '/tools/password-generator/', desc: 'Generate secure passwords', icon: '🎲' },
      { name: 'Timestamp Converter', href: '/tools/timestamp-converter/', desc: 'Unix to human readable', icon: '⏱️' },
    ],
    pills: [
      { name: 'Base64 Encoder', href: '/tools/base64-encoder/' },
      { name: 'Binary Converter', href: '/tools/binary-converter/' },
      { name: 'URL Encoder', href: '/tools/url-encoder/' },
      { name: 'JSON Formatter', href: '/tools/json-formatter/' },
      { name: 'JWT Decoder', href: '/tools/jwt-decoder/' },
    ]
  },
  'uuid-v7-generator': {
    featured: { name: 'UUID Generator', href: '/tools/uuid-generator/', desc: 'Generate v4 UUIDs', icon: '🆔' },
    cards: [
      { name: 'Timestamp Converter', href: '/tools/timestamp-converter/', desc: 'Unix to human readable', icon: '⏱️' },
      { name: 'Hash Generator', href: '/tools/hash-generator/', desc: 'MD5, SHA-256, SHA-512', icon: '🔐' },
      { name: 'Password Generator', href: '/tools/password-generator/', desc: 'Generate secure passwords', icon: '🎲' },
    ],
    pills: [
      { name: 'Base64 Encoder', href: '/tools/base64-encoder/' },
      { name: 'Binary Converter', href: '/tools/binary-converter/' },
      { name: 'URL Encoder', href: '/tools/url-encoder/' },
      { name: 'JSON Formatter', href: '/tools/json-formatter/' },
      { name: 'JWT Decoder', href: '/tools/jwt-decoder/' },
    ]
  },
  'timestamp-converter': {
    featured: { name: 'UUID v7 Generator', href: '/tools/uuid-v7-generator/', desc: 'Next-gen time-sorted UUIDs', icon: '🆔' },
    cards: [
      { name: 'JSON Formatter', href: '/tools/json-formatter/', desc: 'Prettify and validate JSON', icon: '📋' },
      { name: 'Hash Generator', href: '/tools/hash-generator/', desc: 'MD5, SHA-256, SHA-512', icon: '🔐' },
      { name: 'URL Encoder', href: '/tools/url-encoder/', desc: 'Encode query strings safely', icon: '🔗' },
    ],
    pills: [
      { name: 'UUID Generator', href: '/tools/uuid-generator/' },
      { name: 'Base64 Encoder', href: '/tools/base64-encoder/' },
      { name: 'Binary Converter', href: '/tools/binary-converter/' },
      { name: 'Case Converter', href: '/tools/case-converter/' },
      { name: 'Markdown Converter', href: '/tools/markdown-converter/' },
    ]
  },
  'binary-converter': {
    featured: { name: 'Hash Generator', href: '/tools/hash-generator/', desc: 'MD5, SHA-256, SHA-512', icon: '🔐' },
    cards: [
      { name: 'Base64 Encoder', href: '/tools/base64-encoder/', desc: 'Encode binary data', icon: '🧩' },
      { name: 'URL Encoder', href: '/tools/url-encoder/', desc: 'Encode query strings safely', icon: '🔗' },
      { name: 'Timestamp Converter', href: '/tools/timestamp-converter/', desc: 'Unix to human readable', icon: '⏱️' },
    ],
    pills: [
      { name: 'UUID Generator', href: '/tools/uuid-generator/' },
      { name: 'HTML Encoder', href: '/tools/html-encoder/' },
      { name: 'JSON Formatter', href: '/tools/json-formatter/' },
      { name: 'Case Converter', href: '/tools/case-converter/' },
      { name: 'Password Generator', href: '/tools/password-generator/' },
    ]
  },
  'css-unit-converter': {
    featured: { name: 'Color Contrast', href: '/tools/color-contrast/', desc: 'Check WCAG accessibility', icon: '👁️' },
    cards: [
      { name: 'Color Picker', href: '/tools/color-picker/', desc: 'HSL, RGB, HEX values', icon: '🎨' },
      { name: 'JS Minifier', href: '/tools/js-minifier/', desc: 'Optimize JS payloads', icon: '⚡' },
      { name: 'Core Web Vitals Guide', href: '/tools/core-web-vitals-guide/', desc: 'LCP, FID, CLS scores', icon: '📊' },
    ],
    pills: [
      { name: 'HTML Encoder', href: '/tools/html-encoder/' },
      { name: 'Markdown Converter', href: '/tools/markdown-converter/' },
      { name: 'Word Counter', href: '/tools/word-counter/' },
      { name: 'Lorem Ipsum', href: '/tools/lorem-ipsum/' },
      { name: 'SEO Audit Checklist', href: '/tools/seo-audit-checklist/' },
    ]
  },
  'color-picker': {
    featured: { name: 'Color Contrast', href: '/tools/color-contrast/', desc: 'Check WCAG accessibility', icon: '👁️' },
    cards: [
      { name: 'CSS Unit Converter', href: '/tools/css-unit-converter/', desc: 'PX to REM/EM conversion', icon: '📏' },
      { name: 'Meta Tag Generator', href: '/tools/meta-tag-generator/', desc: 'SEO title and meta tags', icon: '🏷️' },
      { name: 'Social Preview Tester', href: '/tools/social-preview-tester/', desc: 'Test OG & Twitter cards', icon: '📱' },
    ],
    pills: [
      { name: 'Core Web Vitals Guide', href: '/tools/core-web-vitals-guide/' },
      { name: 'JS Minifier', href: '/tools/js-minifier/' },
      { name: 'HTML Encoder', href: '/tools/html-encoder/' },
      { name: 'Lorem Ipsum', href: '/tools/lorem-ipsum/' },
      { name: 'Markdown Previewer', href: '/tools/markdown-previewer/' },
    ]
  },
  'color-contrast': {
    featured: { name: 'Color Picker', href: '/tools/color-picker/', desc: 'HSL, RGB, HEX values', icon: '🎨' },
    cards: [
      { name: 'CSS Unit Converter', href: '/tools/css-unit-converter/', desc: 'PX to REM/EM conversion', icon: '📏' },
      { name: 'Core Web Vitals Guide', href: '/tools/core-web-vitals-guide/', desc: 'LCP, FID, CLS scores', icon: '📊' },
      { name: 'SEO Audit Checklist', href: '/tools/seo-audit-checklist/', desc: 'Standardized SEO check', icon: '✅' },
    ],
    pills: [
      { name: 'Meta Tag Generator', href: '/tools/meta-tag-generator/' },
      { name: 'JS Minifier', href: '/tools/js-minifier/' },
      { name: 'HTML Encoder', href: '/tools/html-encoder/' },
      { name: 'Markdown Previewer', href: '/tools/markdown-previewer/' },
      { name: 'Word Counter', href: '/tools/word-counter/' },
    ]
  },
  'adsense-calculator': {
    featured: { name: 'API Latency Calculator', href: '/tools/api-latency-calculator/', desc: 'Test endpoint response', icon: '⏱️' },
    cards: [
      { name: 'Word Counter', href: '/tools/word-counter/', desc: 'Count characters and words', icon: '📝' },
      { name: 'SEO Audit Checklist', href: '/tools/seo-audit-checklist/', desc: 'Standardized SEO check', icon: '✅' },
      { name: 'Core Web Vitals Guide', href: '/tools/core-web-vitals-guide/', desc: 'LCP, FID, CLS scores', icon: '📊' },
    ],
    pills: [
      { name: 'Meta Tag Generator', href: '/tools/meta-tag-generator/' },
      { name: 'Schema Generator', href: '/tools/schema-generator/' },
      { name: 'Social Preview Tester', href: '/tools/social-preview-tester/' },
      { name: 'Sitemap Validator', href: '/tools/sitemap-validator/' },
      { name: 'Robots.txt Generator', href: '/tools/robots-generator/' },
    ]
  },
  'api-latency-calculator': {
    featured: { name: 'CDN Readiness Tester', href: '/tools/cdn-readiness-tester/', desc: 'Global cache propagation', icon: '🌐' },
    cards: [
      { name: 'Core Web Vitals Guide', href: '/tools/core-web-vitals-guide/', desc: 'LCP, FID, CLS scores', icon: '📊' },
      { name: 'JSON Formatter', href: '/tools/json-formatter/', desc: 'Prettify and validate JSON', icon: '📋' },
      { name: 'Hash Generator', href: '/tools/hash-generator/', desc: 'MD5, SHA-256, SHA-512', icon: '🔐' },
    ],
    pills: [
      { name: 'UUID Generator', href: '/tools/uuid-generator/' },
      { name: 'Timestamp Converter', href: '/tools/timestamp-converter/' },
      { name: 'URL Encoder', href: '/tools/url-encoder/' },
      { name: 'Base64 Encoder', href: '/tools/base64-encoder/' },
      { name: 'JWT Decoder', href: '/tools/jwt-decoder/' },
    ]
  },
  'cdn-readiness-tester': {
    featured: { name: 'API Latency Calculator', href: '/tools/api-latency-calculator/', desc: 'Test endpoint response', icon: '⏱️' },
    cards: [
      { name: 'Core Web Vitals Guide', href: '/tools/core-web-vitals-guide/', desc: 'LCP, FID, CLS scores', icon: '📊' },
      { name: 'SEO Audit Checklist', href: '/tools/seo-audit-checklist/', desc: 'Standardized SEO check', icon: '✅' },
      { name: 'Sitemap Validator', href: '/tools/sitemap-validator/', desc: 'Validate XML sitemaps', icon: '🗺️' },
    ],
    pills: [
      { name: 'Meta Tag Generator', href: '/tools/meta-tag-generator/' },
      { name: 'Robots.txt Generator', href: '/tools/robots-generator/' },
      { name: 'Schema Generator', href: '/tools/schema-generator/' },
      { name: 'Social Preview Tester', href: '/tools/social-preview-tester/' },
      { name: 'URL Encoder', href: '/tools/url-encoder/' },
    ]
  },
  'seo-audit-checklist': {
    featured: { name: 'Schema Generator', href: '/tools/schema-generator/', desc: 'Structured data for Google', icon: '🤖', badge: 'GEO' },
    cards: [
      { name: 'Meta Tag Generator', href: '/tools/meta-tag-generator/', desc: 'SEO title and meta tags', icon: '🏷️' },
      { name: 'Sitemap Validator', href: '/tools/sitemap-validator/', desc: 'Validate XML sitemaps', icon: '🗺️' },
      { name: 'Core Web Vitals Guide', href: '/tools/core-web-vitals-guide/', desc: 'LCP, FID, CLS scores', icon: '📊' },
    ],
    pills: [
      { name: 'Robots.txt Generator', href: '/tools/robots-generator/' },
      { name: 'Social Preview Tester', href: '/tools/social-preview-tester/' },
      { name: 'Word Counter', href: '/tools/word-counter/' },
      { name: 'URL Encoder', href: '/tools/url-encoder/' },
      { name: 'CDN Readiness Tester', href: '/tools/cdn-readiness-tester/' },
    ]
  },
  'core-web-vitals-guide': {
    featured: { name: 'SEO Audit Checklist', href: '/tools/seo-audit-checklist/', desc: 'Standardized SEO check', icon: '✅' },
    cards: [
      { name: 'CDN Readiness Tester', href: '/tools/cdn-readiness-tester/', desc: 'Global cache propagation', icon: '🌐' },
      { name: 'API Latency Calculator', href: '/tools/api-latency-calculator/', desc: 'Test endpoint response', icon: '⏱️' },
      { name: 'Sitemap Validator', href: '/tools/sitemap-validator/', desc: 'Validate XML sitemaps', icon: '🗺️' },
    ],
    pills: [
      { name: 'Meta Tag Generator', href: '/tools/meta-tag-generator/' },
      { name: 'Schema Generator', href: '/tools/schema-generator/' },
      { name: 'Robots.txt Generator', href: '/tools/robots-generator/' },
      { name: 'Color Contrast', href: '/tools/color-contrast/' },
      { name: 'JS Minifier', href: '/tools/js-minifier/' },
    ]
  },
  'robots-txt-templates': {
    featured: { name: 'Robots.txt Generator', href: '/tools/robots-generator/', desc: 'Crawl control for bots', icon: '🤖' },
    cards: [
      { name: 'Sitemap Validator', href: '/tools/sitemap-validator/', desc: 'Validate XML sitemaps', icon: '🗺️' },
      { name: 'Meta Tag Generator', href: '/tools/meta-tag-generator/', desc: 'SEO title and meta tags', icon: '🏷️' },
      { name: 'Schema Generator', href: '/tools/schema-generator/', desc: 'Structured data for Google', icon: '🤖', badge: 'GEO' },
    ],
    pills: [
      { name: 'SEO Audit Checklist', href: '/tools/seo-audit-checklist/' },
      { name: 'Core Web Vitals Guide', href: '/tools/core-web-vitals-guide/' },
      { name: 'Social Preview Tester', href: '/tools/social-preview-tester/' },
      { name: 'URL Encoder', href: '/tools/url-encoder/' },
      { name: 'Word Counter', href: '/tools/word-counter/' },
    ]
  },
  'xml-to-yaml': {
    featured: { name: 'XML to JSON', href: '/tools/xml-to-json/', desc: 'Convert XML to JSON objects', icon: '🔄' },
    cards: [
      { name: 'JSON Formatter', href: '/tools/json-formatter/', desc: 'Validate your output', icon: '📋' },
      { name: 'Base64 Encoder', href: '/tools/base64-encoder/', desc: 'Encode data for transport', icon: '🧩' },
      { name: 'YAML to JSON', href: '/tools/yaml-to-json/', desc: 'Convert and format YAML structure', icon: '📄' },
    ],
    pills: [
      { name: 'JSON to YAML', href: '/tools/json-to-yaml/' },
      { name: 'HTML Encoder', href: '/tools/html-encoder/' },
      { name: 'URL Encoder', href: '/tools/url-encoder/' },
    ]
  },
  'xml-to-json': {
    featured: { name: 'XML to YAML', href: '/tools/xml-to-yaml/', desc: 'Convert XML to YAML structure', icon: '🔄' },
    cards: [
      { name: 'JSON Formatter', href: '/tools/json-formatter/', desc: 'Validate your output', icon: '📋' },
      { name: 'Base64 Encoder', href: '/tools/base64-encoder/', desc: 'Encode data for transport', icon: '🧩' },
      { name: 'DOM Analyzer', href: '/tools/dom-analyzer/', desc: 'Inspect DOM structures', icon: '🔍' },
    ],
    pills: [
      { name: 'JSON to CSV', href: '/tools/json-to-csv/' },
      { name: 'HTML Encoder', href: '/tools/html-encoder/' },
      { name: 'URL Encoder', href: '/tools/url-encoder/' },
    ]
  },
  'dom-analyzer': {
    featured: { name: 'Meta Tag Generator', href: '/tools/meta-tag-generator/', desc: 'SEO title and meta tags', icon: '🏷️' },
    cards: [
      { name: 'Broken Link Checker', href: '/tools/broken-link-checker/', desc: 'Find dead URLs', icon: '🔗' },
      { name: 'Schema Generator', href: '/tools/schema-generator/', desc: 'Structured data tool', icon: '🤖' },
      { name: 'Redirect Checker', href: '/tools/redirect-checker/', desc: 'Trace redirect hops', icon: '🔄' },
    ],
    pills: [
      { name: 'Word Counter', href: '/tools/word-counter/' },
      { name: 'Sitemap Validator', href: '/tools/sitemap-validator/' },
      { name: 'Robots Generator', href: '/tools/robots-generator/' },
    ]
  },
  'broken-link-checker': {
    featured: { name: 'Redirect Checker', href: '/tools/redirect-checker/', desc: 'Trace redirect hops', icon: '🔄' },
    cards: [
      { name: 'Sitemap Validator', href: '/tools/sitemap-validator/', desc: 'Validate XML sitemaps', icon: '🗺️' },
      { name: 'Meta Tag Generator', href: '/tools/meta-tag-generator/', desc: 'SEO title and meta tags', icon: '🏷️' },
      { name: 'Robots Generator', href: '/tools/robots-generator/', desc: 'Control search bots', icon: '🤖' },
    ],
    pills: [
      { name: 'Word Counter', href: '/tools/word-counter/' },
      { name: 'DOM Analyzer', href: '/tools/dom-analyzer/' },
      { name: 'Schema Generator', href: '/tools/schema-generator/' },
    ]
  },
  'image-compressor-pro': {
    featured: { name: 'Social Preview Tester', href: '/tools/social-preview-tester/', desc: 'Test OG & Twitter cards', icon: '📱' },
    cards: [
      { name: 'Meta Tag Generator', href: '/tools/meta-tag-generator/', desc: 'SEO title and meta tags', icon: '🏷️' },
      { name: 'Favicon Generator', href: '/tools/favicon-generator/', desc: 'Create site icons', icon: '🖼️' },
      { name: 'Base64 Encoder', href: '/tools/base64-encoder/', desc: 'Encode images to base64', icon: '🧩' },
    ],
    pills: [
      { name: 'Color Picker', href: '/tools/color-picker/' },
      { name: 'CSS Unit Converter', href: '/tools/css-unit-converter/' },
      { name: 'Word Counter', href: '/tools/word-counter/' },
    ]
  },
  'redirect-checker': {
    featured: { name: 'Broken Link Checker', href: '/tools/broken-link-checker/', desc: 'Find dead URLs', icon: '🔗' },
    cards: [
      { name: 'Sitemap Validator', href: '/tools/sitemap-validator/', desc: 'Validate XML sitemaps', icon: '🗺️' },
      { name: 'Meta Tag Generator', href: '/tools/meta-tag-generator/', desc: 'SEO title and meta tags', icon: '🏷️' },
      { name: 'Robots Generator', href: '/tools/robots-generator/', desc: 'Control search bots', icon: '🤖' },
    ],
    pills: [
      { name: 'Word Counter', href: '/tools/word-counter/' },
      { name: 'DOM Analyzer', href: '/tools/dom-analyzer/' },
      { name: 'Schema Generator', href: '/tools/schema-generator/' },
    ]
  },
}
