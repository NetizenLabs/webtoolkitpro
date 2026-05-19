const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
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
        source: '/:path*((?!robots\\.txt|sitemap\\.xml).+\\.(?:webp|png|jpg|ico|svg|json|txt|xml))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=3600',
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