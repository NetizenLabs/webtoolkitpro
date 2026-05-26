import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/', 
          '/admin/', 
          '/cdn-cgi/', 
          '/private/',
          '/*?' // Block query parameters to prevent crawler traps
        ],
      },
      {
        userAgent: 'PerplexityBot',
        allow: ['/blog/', '/'],
        disallow: ['/admin/', '/private/', '/*?'],
      },
      {
        userAgent: 'Perplexity-User',
        allow: '/',
      },
      {
        userAgent: 'GPTBot',
        allow: ['/blog/', '/'],
        disallow: ['/admin/', '/private/', '/*?'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: ['/blog/', '/'],
        disallow: ['/admin/', '/private/', '/*?'],
      }
    ],
    sitemap: 'https://wtkpro.site/sitemap.xml',
  }
}
