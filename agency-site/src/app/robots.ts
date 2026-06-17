import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: [
          'Amazonbot', 
          'Applebot-Extended', 
          'Bytespider', 
          'CCBot', 
          'ClaudeBot', 
          'Google-Extended', 
          'GPTBot', 
          'meta-externalagent'
        ],
        allow: '/',
      }
    ],
    sitemap: 'https://netizenlabs.online/sitemap.xml',
  };
}
