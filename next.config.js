/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Ensure long-term caching for static assets
  async headers() {
    return [
      {
        // Cache static assets but EXCLUDE robots.txt and sitemap.xml
        // Using a negative lookahead to exclude these critical files
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
  }
}

module.exports = nextConfig