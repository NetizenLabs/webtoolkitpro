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
        destination: '/tools/uuid-v7-generator/',
        permanent: true,
      },
      {
        source: '/tools/uuid-v7/',
        destination: '/tools/uuid-v7-generator/',
        permanent: true,
      },
      {
        source: '/tools/password-strength-tester',
        destination: '/tools/password-auditor/',
        permanent: true,
      },
      {
        source: '/tools/password-strength-tester/',
        destination: '/tools/password-auditor/',
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
        value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://www.googletagmanager.com https://www.google-analytics.com https://adservice.google.com https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://pagead2.googlesyndication.com https://www.google-analytics.com https://adservice.google.com https://*.google.com https://*.gstatic.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://www.google-analytics.com https://stats.g.doubleclick.net https://pagead2.googlesyndication.com https://vitals.vercel-insights.com; frame-src 'self' https://googleads.g.doubleclick.net https://*.google.com; object-src 'none'; upgrade-insecure-requests;",
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
    ]

    return [
      {
        source: '/:path*',
        headers: securityHeaders,
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