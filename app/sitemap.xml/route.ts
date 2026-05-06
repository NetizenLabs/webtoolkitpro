import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = 'https://wtkpro.site'
  const now = new Date().toISOString()

  const pages = [
    { loc: '/', priority: '1.0', freq: 'daily' },
    { loc: '/tools', priority: '1.0', freq: 'daily' },
    { loc: '/blog', priority: '0.9', freq: 'daily' },
    { loc: '/about', priority: '0.6', freq: 'monthly' },
    { loc: '/contact', priority: '0.5', freq: 'monthly' },
    { loc: '/privacy', priority: '0.3', freq: 'yearly' },
    { loc: '/terms', priority: '0.3', freq: 'yearly' },
    { loc: '/disclaimer', priority: '0.3', freq: 'yearly' },
    { loc: '/tools/json-formatter', priority: '0.8', freq: 'monthly' },
    { loc: '/tools/password-generator', priority: '0.8', freq: 'monthly' },
    { loc: '/tools/base64-encoder', priority: '0.8', freq: 'monthly' },
    { loc: '/tools/url-encoder', priority: '0.8', freq: 'monthly' },
    { loc: '/tools/lorem-ipsum', priority: '0.7', freq: 'monthly' },
    { loc: '/tools/color-picker', priority: '0.7', freq: 'monthly' },
    { loc: '/tools/word-counter', priority: '0.7', freq: 'monthly' },
    { loc: '/tools/case-converter', priority: '0.7', freq: 'monthly' },
    { loc: '/tools/timestamp-converter', priority: '0.7', freq: 'monthly' },
    { loc: '/tools/binary-converter', priority: '0.7', freq: 'monthly' },
    { loc: '/tools/hash-generator', priority: '0.7', freq: 'monthly' },
    { loc: '/tools/html-encoder', priority: '0.7', freq: 'monthly' },
    { loc: '/tools/css-unit-converter', priority: '0.7', freq: 'monthly' },
    { loc: '/tools/uuid-generator', priority: '0.7', freq: 'monthly' },
    { loc: '/tools/js-minifier', priority: '0.8', freq: 'monthly' },
    { loc: '/tools/markdown-previewer', priority: '0.7', freq: 'monthly' },
    { loc: '/tools/meta-tag-generator', priority: '0.7', freq: 'monthly' },
    // Blog posts
    { loc: '/blog/top-10-free-developer-tools-2026', priority: '0.8', freq: 'monthly' },
    { loc: '/blog/json-formatting-best-practices', priority: '0.8', freq: 'monthly' },
    { loc: '/blog/password-security-guide', priority: '0.8', freq: 'monthly' },
    { loc: '/blog/seo-meta-tags-complete-guide', priority: '0.8', freq: 'monthly' },
    { loc: '/blog/css-units-explained', priority: '0.8', freq: 'monthly' },
    { loc: '/blog/base64-encoding-use-cases', priority: '0.8', freq: 'monthly' },
    { loc: '/blog/enterprise-web-security-guide', priority: '0.9', freq: 'monthly' },
    { loc: '/blog/performance-optimization-guide', priority: '0.9', freq: 'monthly' },
    { loc: '/blog/securing-json-apis', priority: '0.9', freq: 'monthly' },
    { loc: '/blog/jwt-security-guide', priority: '0.9', freq: 'monthly' },
    { loc: '/blog/modern-css-architecture', priority: '0.9', freq: 'monthly' },
    { loc: '/blog/nextjs-vs-vite-comparison', priority: '0.9', freq: 'monthly' },
    { loc: '/blog/automated-testing-guide', priority: '0.9', freq: 'monthly' },
    { loc: '/blog/serverless-computing-future', priority: '0.9', freq: 'monthly' },
    { loc: '/blog/ai-cybersecurity-trends', priority: '0.9', freq: 'monthly' },
    { loc: '/blog/enterprise-js-frameworks', priority: '0.9', freq: 'monthly' },
    { loc: '/blog/scalable-database-design', priority: '0.9', freq: 'monthly' },
    { loc: '/blog/ui-ux-design-trends', priority: '0.9', freq: 'monthly' },
    { loc: '/blog/pwa-development-guide', priority: '0.9', freq: 'monthly' },
    { loc: '/blog/microservices-architecture-guide', priority: '0.9', freq: 'monthly' },
    { loc: '/blog/headless-vs-traditional-cms', priority: '0.9', freq: 'monthly' },
    { loc: '/blog/web-accessibility-best-practices', priority: '0.9', freq: 'monthly' },
    { loc: '/blog/cloud-cost-management', priority: '0.9', freq: 'monthly' },
    { loc: '/blog/edge-computing-guide', priority: '0.9', freq: 'monthly' },
    { loc: '/blog/ai-in-devops-future', priority: '0.9', freq: 'monthly' },
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${baseUrl}${p.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new NextResponse(sitemap, {
    status: 200,
    headers: { 'Content-Type': 'application/xml' },
  })
}