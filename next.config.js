const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})


/** @type {import('next').NextConfig} */
const isDesktop = process.env.TAURI_ENV === 'true';

const nextConfig = {
  output: isDesktop ? 'export' : undefined,
  trailingSlash: true,
  compress: true,
  poweredByHeader: false,
  images: {
    // Enable Next.js built-in image optimizer for WebP/AVIF conversion
    // This is the single biggest LCP win — reduces image size 60-80% on mobile
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000, // 30 days
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    if (isDesktop) return [];
    return [
      
      // Wave 2 Consolidation
      { source: '/tools/schema-generator', destination: '/tools/schema-markup-generator/', permanent: true },
      { source: '/tools/schema-validator', destination: '/tools/schema-markup-generator/', permanent: true },
      { source: '/tools/schema-validator-pro', destination: '/tools/schema-markup-generator/', permanent: true },
      { source: '/tools/breadcrumb-schema', destination: '/tools/schema-markup-generator/', permanent: true },
      { source: '/tools/breadcrumb-schema-gen', destination: '/tools/schema-markup-generator/', permanent: true },
      { source: '/tools/qr-code-gen', destination: '/tools/qr-code-generator/', permanent: true },
      { source: '/tools/sql-formatter', destination: '/tools/sql-toolkit/', permanent: true },
      { source: '/tools/sql-minifier', destination: '/tools/sql-toolkit/', permanent: true },
      { source: '/tools/sql-injection-tester', destination: '/tools/sql-toolkit/', permanent: true },
      { source: '/tools/sql-sanitizer', destination: '/tools/sql-toolkit/', permanent: true },
      { source: '/tools/sql-injection-sanitizer', destination: '/tools/sql-toolkit/', permanent: true },
      { source: '/tools/markdown-to-html', destination: '/tools/markdown-html-converter/', permanent: true },
      { source: '/tools/markdown-converter', destination: '/tools/markdown-html-converter/', permanent: true },
      { source: '/tools/markdown-previewer', destination: '/tools/markdown-html-converter/', permanent: true },
      { source: '/tools/json-to-markdown', destination: '/tools/markdown-html-converter/', permanent: true },
      { source: '/tools/json-to-markdown/', destination: '/tools/markdown-html-converter/', permanent: true },
      
      // Wave 3 Consolidation
      { source: '/tools/binary-converter', destination: '/tools/binary-hex-decimal-converter/', permanent: true },
      { source: '/tools/binary-to-decimal', destination: '/tools/binary-hex-decimal-converter/', permanent: true },
      { source: '/tools/decimal-to-binary', destination: '/tools/binary-hex-decimal-converter/', permanent: true },
      { source: '/tools/binary-to-hex', destination: '/tools/binary-hex-decimal-converter/', permanent: true },
      { source: '/tools/hex-to-binary', destination: '/tools/binary-hex-decimal-converter/', permanent: true },
      { source: '/tools/text-to-binary', destination: '/tools/binary-hex-decimal-converter/', permanent: true },
      { source: '/tools/binary-to-text', destination: '/tools/binary-hex-decimal-converter/', permanent: true },
      { source: '/tools/base64-encoder', destination: '/tools/base64-encoder-decoder/', permanent: true },
      { source: '/tools/base64-to-image', destination: '/tools/base64-encoder-decoder/', permanent: true },
      { source: '/tools/image-to-base64', destination: '/tools/base64-encoder-decoder/', permanent: true },
      { source: '/tools/case-converter', destination: '/tools/text-case-formatter/', permanent: true },
      { source: '/tools/title-case', destination: '/tools/text-case-formatter/', permanent: true },
      { source: '/tools/case-inverter', destination: '/tools/text-case-formatter/', permanent: true },
      { source: '/tools/text-reverser', destination: '/tools/text-case-formatter/', permanent: true },
      { source: '/tools/text-cleaner', destination: '/tools/text-case-formatter/', permanent: true },
      { source: '/tools/whitespace-remover', destination: '/tools/text-case-formatter/', permanent: true },
      { source: '/tools/duplicate-line-remover', destination: '/tools/text-case-formatter/', permanent: true },
      { source: '/tools/jwt-decoder', destination: '/tools/jwt-decoder-generator/', permanent: true },
      { source: '/tools/jwt-signer', destination: '/tools/jwt-decoder-generator/', permanent: true },
      { source: '/tools/jwt-debugger', destination: '/tools/jwt-decoder-generator/', permanent: true },
      { source: '/tools/alt-text-audit', destination: '/tools/alt-text-auditor/', permanent: true },
      
      // Wave 4 Consolidation & Cleanup
      { source: '/tools/css-minifier', destination: '/tools/css-formatter-minifier/', permanent: true },
      { source: '/tools/css-formatter', destination: '/tools/css-formatter-minifier/', permanent: true },
      { source: '/tools/css-shadow-gen', destination: '/tools/css-generators/', permanent: true },
      { source: '/tools/css-keyframes', destination: '/tools/css-generators/', permanent: true },
      { source: '/tools/css-gradient-generator', destination: '/tools/css-generators/', permanent: true },
      { source: '/tools/header-inspector', destination: '/tools/http-headers-inspector/', permanent: true },
      { source: '/tools/cache-header-gen', destination: '/tools/http-headers-inspector/', permanent: true },
      { source: '/tools/robots-generator', destination: '/tools/robots-txt-toolkit/', permanent: true },
      { source: '/tools/robots-validator', destination: '/tools/robots-txt-toolkit/', permanent: true },
      { source: '/tools/robots-txt-templates', destination: '/tools/robots-txt-toolkit/', permanent: true },
      { source: '/tools/hex-to-rgb', destination: '/tools/color-converter/', permanent: true },
      { source: '/tools/rgba-to-hex', destination: '/tools/color-converter/', permanent: true },
      { source: '/tools/color-picker', destination: '/tools/color-converter/', permanent: true },
      { source: '/tools/px-to-rem', destination: '/tools/px-rem-converter/', permanent: true },
      { source: '/tools/rem-to-px', destination: '/tools/px-rem-converter/', permanent: true },
      { source: '/tools/browser-compat', destination: '/tools/browser-compat-checker/', permanent: true },
      { source: '/tools/authority-simulation', destination: '/tools/authority-simulator/', permanent: true },
      { source: '/tools/core-web-vitals-guide', destination: '/blog/core-web-vitals-guide/', permanent: true },
      { source: '/tools/seo-audit-checklist', destination: '/blog/seo-audit-checklist/', permanent: true },

      // Tools Consolidation Redirects
      { source: '/tools/json-toolkit', destination: '/tools/json-to-code-generator', permanent: true },
      { source: '/tools/json-data-converter', destination: '/tools/json-yaml-jsonl-converter', permanent: true },
      { source: '/tools/uuid-generator', destination: '/tools/bulk-uuid-v4-v7-generator', permanent: true },
      { source: '/tools/password-suite', destination: '/tools/password-entropy-tester', permanent: true },
      { source: '/tools/data-converter', destination: '/tools/csv-json-xml-converter', permanent: true },
      { source: '/tools/csv-to-xml', destination: '/tools/csv-json-xml-converter', permanent: true },
      { source: '/tools/json-formatter', destination: '/tools/json-to-code-generator', permanent: true },
      { source: '/tools/json-formatter-pro', destination: '/tools/json-to-code-generator', permanent: true },
      { source: '/tools/json-to-ts', destination: '/tools/json-to-code-generator', permanent: true },
      { source: '/tools/json-to-go', destination: '/tools/json-to-code-generator', permanent: true },
      { source: '/tools/json-to-java', destination: '/tools/json-to-code-generator', permanent: true },
      { source: '/tools/json-to-pydantic', destination: '/tools/json-to-code-generator', permanent: true },
      { source: '/tools/json-to-prisma', destination: '/tools/json-to-code-generator', permanent: true },
      { source: '/tools/json-to-yaml', destination: '/tools/json-yaml-jsonl-converter', permanent: true },
      { source: '/tools/json-to-jsonl', destination: '/tools/json-yaml-jsonl-converter', permanent: true },
      { source: '/tools/uuid-v4-gen', destination: '/tools/bulk-uuid-v4-v7-generator', permanent: true },
      { source: '/tools/uuid-v7-generator', destination: '/tools/bulk-uuid-v4-v7-generator', permanent: true },
      { source: '/tools/password-generator', destination: '/tools/password-entropy-tester', permanent: true },
      { source: '/tools/password-auditor', destination: '/tools/password-entropy-tester', permanent: true },
      { source: '/tools/password-tester', destination: '/tools/password-entropy-tester', permanent: true },
      { source: '/tools/xml-to-csv', destination: '/tools/csv-json-xml-converter', permanent: true },
      { source: '/tools/json-to-csv', destination: '/tools/csv-json-xml-converter', permanent: true },
      { source: '/tools/csv-to-json', destination: '/tools/csv-json-xml-converter', permanent: true },
      { source: '/tools/xml-to-json', destination: '/tools/csv-json-xml-converter', permanent: true },
      { source: '/tools/json-to-xml', destination: '/tools/csv-json-xml-converter', permanent: true },
      {
        source: '/blog/iran-conflict-2026-cybersecurity/',
        destination: '/blog/enterprise-web-security-guide/',
        permanent: true,
      },
      {
        source: '/blog/lirr-strike-2026-remote-dev-tools',
        destination: '/blog/ai-first-development-2026/',
        permanent: true,
      },
      {
        source: '/blog/lirr-strike-2026-remote-dev-tools/',
        destination: '/blog/ai-first-development-2026/',
        permanent: true,
      },
      {
        source: '/blog/trump-xi-summit-2026-tech-impact',
        destination: '/blog/edge-computing-guide/',
        permanent: true,
      },
      {
        source: '/blog/trump-xi-summit-2026-tech-impact/',
        destination: '/blog/edge-computing-guide/',
        permanent: true,
      },
      {
        source: '/blog/supreme-court-2026-privacy-impact',
        destination: '/blog/privacy-first-web-development/',
        permanent: true,
      },
      {
        source: '/blog/supreme-court-2026-privacy-impact/',
        destination: '/blog/privacy-first-web-development/',
        permanent: true,
      },
      {
        source: '/blog/best-diff-checker-tools-2026',
        destination: '/blog/what-is-unified-diff/',
        permanent: true,
      },
      {
        source: '/blog/best-diff-checker-tools-2026/',
        destination: '/blog/what-is-unified-diff/',
        permanent: true,
      },
      
      // Bucket 1: Deleted Blog Posts 301 Redirects to fix GSC 404 crawl errors
      { source: '/blog/webtoolkit-pro-trust-network', destination: '/blog/', permanent: true },
      { source: '/blog/webtoolkit-pro-trust-network/', destination: '/blog/', permanent: true },
      { source: '/blog/jwt-signing-guide', destination: '/blog/what-is-jwt-complete-guide/', permanent: true },
      { source: '/blog/jwt-signing-guide/', destination: '/blog/what-is-jwt-complete-guide/', permanent: true },
      { source: '/blog/json-formatting-best-practices', destination: '/blog/what-is-json-complete-guide/', permanent: true },
      { source: '/blog/json-formatting-best-practices/', destination: '/blog/what-is-json-complete-guide/', permanent: true },
      { source: '/blog/wordpress-permalink-structures-compared', destination: '/blog/url-slug-seo-best-practices/', permanent: true },
      { source: '/blog/wordpress-permalink-structures-compared/', destination: '/blog/url-slug-seo-best-practices/', permanent: true },
      { source: '/blog/ai-seo-optimization-2026', destination: '/blog/seo-meta-tags-complete-guide/', permanent: true },
      { source: '/blog/ai-seo-optimization-2026/', destination: '/blog/seo-meta-tags-complete-guide/', permanent: true },
      { source: '/blog/how-to-debug-regex', destination: '/blog/regex-cheat-sheet-javascript/', permanent: true },
      { source: '/blog/how-to-debug-regex/', destination: '/blog/regex-cheat-sheet-javascript/', permanent: true },
      { source: '/blog/geo-optimization-guide', destination: '/blog/core-web-vitals-guide/', permanent: true },
      { source: '/blog/geo-optimization-guide/', destination: '/blog/core-web-vitals-guide/', permanent: true },
      { source: '/blog/decode-jwt-without-library', destination: '/blog/what-is-jwt-complete-guide/', permanent: true },
      { source: '/blog/decode-jwt-without-library/', destination: '/blog/what-is-jwt-complete-guide/', permanent: true },
      { source: '/blog/llm-latency-ux-impact', destination: '/blog/3ms-ttfb-performance-study/', permanent: true },
      { source: '/blog/llm-latency-ux-impact/', destination: '/blog/3ms-ttfb-performance-study/', permanent: true },
      { source: '/blog/cron-expression-generator-2026', destination: '/blog/cron-syntax-complete-reference/', permanent: true },
      { source: '/blog/cron-expression-generator-2026/', destination: '/blog/cron-syntax-complete-reference/', permanent: true },
      { source: '/blog/fix-bad-slugs-without-losing-rankings', destination: '/blog/url-slug-seo-best-practices/', permanent: true },
      { source: '/blog/fix-bad-slugs-without-losing-rankings/', destination: '/blog/url-slug-seo-best-practices/', permanent: true },
      { source: '/blog/regex-javascript-vs-python-vs-php', destination: '/blog/regex-cheat-sheet-javascript/', permanent: true },
      { source: '/blog/regex-javascript-vs-python-vs-php/', destination: '/blog/regex-cheat-sheet-javascript/', permanent: true },
      { source: '/blog/favicon-generator-tools-compared', destination: '/blog/favicon-sizes-complete-guide-2026/', permanent: true },
      { source: '/blog/favicon-generator-tools-compared/', destination: '/blog/favicon-sizes-complete-guide-2026/', permanent: true },
      { source: '/blog/json-vs-xml-comparison', destination: '/blog/what-is-json-complete-guide/', permanent: true },
      { source: '/blog/json-vs-xml-comparison/', destination: '/blog/what-is-json-complete-guide/', permanent: true },
      { source: '/blog/flattening-nested-json-csv', destination: '/blog/csv-to-json-nested-objects-converter/', permanent: true },
      { source: '/blog/flattening-nested-json-csv/', destination: '/blog/csv-to-json-nested-objects-converter/', permanent: true },
      { source: '/blog/how-to-fix-common-json-errors', destination: '/blog/what-is-json-complete-guide/', permanent: true },
      { source: '/blog/how-to-fix-common-json-errors/', destination: '/blog/what-is-json-complete-guide/', permanent: true },
      { source: '/blog/llms-txt-vs-robots-txt', destination: '/blog/robots-txt-guide-block-ai-crawlers-2026/', permanent: true },
      { source: '/blog/llms-txt-vs-robots-txt/', destination: '/blog/robots-txt-guide-block-ai-crawlers-2026/', permanent: true },
      { source: '/blog/password-security-enterprise-2026', destination: '/blog/enterprise-web-security-guide/', permanent: true },
      { source: '/blog/password-security-enterprise-2026/', destination: '/blog/enterprise-web-security-guide/', permanent: true },
      { source: '/blog/nextjs-vs-vite-comparison', destination: '/blog/performance-optimization-guide/', permanent: true },
      { source: '/blog/nextjs-vs-vite-comparison/', destination: '/blog/performance-optimization-guide/', permanent: true },
      { source: '/blog/cron-builders-compared', destination: '/blog/cron-syntax-complete-reference/', permanent: true },
      { source: '/blog/cron-builders-compared/', destination: '/blog/cron-syntax-complete-reference/', permanent: true },
      { source: '/blog/json-to-csv-converters-compared', destination: '/blog/csv-to-json-nested-objects-converter/', permanent: true },
      { source: '/blog/json-to-csv-converters-compared/', destination: '/blog/csv-to-json-nested-objects-converter/', permanent: true },
      { source: '/blog/what-is-llms-txt', destination: '/blog/robots-txt-guide-block-ai-crawlers-2026/', permanent: true },
      { source: '/blog/what-is-llms-txt/', destination: '/blog/robots-txt-guide-block-ai-crawlers-2026/', permanent: true },,
      {
        source: '/tools/category/:category',
        destination: '/tools/hub/:category/',
        permanent: true,
      },
      {
        source: '/tools/uuid-v7',
        destination: '/tools/bulk-uuid-v4-v7-generator/',
        permanent: true,
      },
      {
        source: '/tools/uuid-v7/',
        destination: '/tools/bulk-uuid-v4-v7-generator/',
        permanent: true,
      },
      {
        source: '/tools/password-strength-tester',
        destination: '/tools/password-entropy-tester/',
        permanent: true,
      },
      {
        source: '/tools/password-strength-tester/',
        destination: '/tools/password-entropy-tester/',
        permanent: true,
      },
      
      
      {
        source: '/tools/yaml-formatter',
        destination: '/tools/yaml-to-json/',
        permanent: true,
      },
      {
        source: '/tools/yaml-formatter/',
        destination: '/tools/yaml-to-json/',
        permanent: true,
      },
      // SEO Audit 2026: Merged Thin Content Redirects


      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.wtkpro.site' }],
        destination: 'https://wtkpro.site/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'wtkpro-hub.vercel.app' }],
        destination: 'https://wtkpro.site/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'webtoolkit-pro.vercel.app' }],
        destination: 'https://wtkpro.site/:path*',
        permanent: true,
      },
    ]
  },
  // Ensure long-term caching for static assets and security hardening
  async headers() {
    const securityHeaders = [
      {
        key: 'X-Frame-Options',
        value: 'SAMEORIGIN',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
      {
        key: 'Content-Security-Policy',
        value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com https://adservice.google.com https://va.vercel-scripts.com https://static.cloudflareinsights.com https://vercel.live https://ep2.adtrafficquality.google https://*.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; img-src 'self' data: https://pagead2.googlesyndication.com https://www.google-analytics.com https://adservice.google.com https://*.google.com https://*.gstatic.com https://ep1.adtrafficquality.google https://vercel.com https://vercel.live; font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net https://vercel.live; connect-src 'self' https://wtkpro.site https://www.wtkpro.site https://www.google-analytics.com https://stats.g.doubleclick.net https://pagead2.googlesyndication.com https://vitals.vercel-insights.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://vercel.live https://cdn.jsdelivr.net https://static.cloudflareinsights.com https://www.googletagmanager.com https://*.google.com https://analytics.google.com wss://*.pusher.com; frame-src 'self' https://googleads.g.doubleclick.net https://*.google.com https://vercel.live https://ep2.adtrafficquality.google; object-src 'none'; upgrade-insecure-requests;",
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=()',
      },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=31536000; includeSubDomains; preload',
      },
      {
        key: 'X-XSS-Protection',
        value: '1; mode=block',
      },
      {
        key: 'Cache-Control',
        value: 'no-transform',
      },
      {
        key: 'X-402-Facilitator',
        value: 'https://stripe.com',
      },
      {
        key: 'X-402-Wallet',
        value: 'acct_1032D82eB69zArt5',
      },
    ]

    if (isDesktop) return [];
    return [
      {
        source: '/',
        headers: [
          ...securityHeaders,
          {
            key: 'Link',
            value: '</llms.txt>; rel="describedby"'
          }
        ]
      },
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        // Kill-switch SW: never cache, always fetch fresh so browsers pick up the unregister immediately
        source: '/sw.js',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Service-Worker-Allowed', value: '/' },
        ],
      },
      {
        // Static assets: 30-day cache with stale-while-revalidate
        source: '/:path*((?!robots\\.txt|sitemap\\.xml).+\\.(?:webp|avif|png|jpg|jpeg|ico|svg|woff2|woff|ttf))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, stale-while-revalidate=86400, immutable',
          },
        ],
      },
      {
        // JS/CSS bundles: long cache (Next.js hashes filenames)
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  webpack: (config, { isServer }) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    }
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        child_process: false,
      }
    }
    return config
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  }
}

module.exports = withBundleAnalyzer(nextConfig)