import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /cdn-cgi/
Disallow: /private/
Disallow: /*?

User-agent: PerplexityBot
Allow: /blog/
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /*?

User-agent: Perplexity-User
Allow: /

User-agent: GPTBot
Allow: /blog/
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /*?

User-agent: ClaudeBot
Allow: /blog/
Allow: /
Disallow: /admin/
Disallow: /private/
Disallow: /*?

Sitemap: https://wtkpro.site/sitemap.xml
Host: https://wtkpro.site
Content-Signal: ai-train=no, search=yes, ai-input=no
`;

  return new NextResponse(robotsTxt, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
