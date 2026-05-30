const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})


/** @type {import('next').NextConfig} */
const nextConfig = {
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
    return [
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
      { source: '/tools/uuid-generator', destination: '/tools/bulk-uuid-v4-v7-generator', permanent: true },
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
      
      // Deleted newsjacking posts — redirect to blog index to prevent 404s
      {
        source: '/blog/iran-conflict-2026-cybersecurity',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/iran-conflict-2026-cybersecurity/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/lirr-strike-2026-remote-dev-tools',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/lirr-strike-2026-remote-dev-tools/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/trump-xi-summit-2026-tech-impact',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/trump-xi-summit-2026-tech-impact/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/supreme-court-2026-privacy-impact',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog/supreme-court-2026-privacy-impact/',
        destination: '/blog/',
        permanent: true,
      },
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
        source: '/tools/json-to-markdown',
        destination: '/tools/markdown-converter/',
        permanent: true,
      },
      {
        source: '/tools/json-to-markdown/',
        destination: '/tools/markdown-converter/',
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
        value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com https://adservice.google.com https://va.vercel-scripts.com https://static.cloudflareinsights.com https://vercel.live https://ep2.adtrafficquality.google https://*.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; img-src 'self' data: https://pagead2.googlesyndication.com https://www.google-analytics.com https://adservice.google.com https://*.google.com https://*.gstatic.com https://ep1.adtrafficquality.google; font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net; connect-src 'self' https://wtkpro.site https://www.wtkpro.site https://www.google-analytics.com https://stats.g.doubleclick.net https://pagead2.googlesyndication.com https://vitals.vercel-insights.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://vercel.live https://cdn.jsdelivr.net https://static.cloudflareinsights.com https://www.googletagmanager.com https://*.google.com https://analytics.google.com; frame-src 'self' https://googleads.g.doubleclick.net https://*.google.com https://vercel.live https://ep2.adtrafficquality.google; object-src 'none'; upgrade-insecure-requests;",
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