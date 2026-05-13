import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'Googlebot-Extended', 'OAI-SearchBot', 'CCBot'],
        allow: '/',
      }
    ],
    sitemap: 'https://wtkpro.site/sitemap.xml',
  }
}
