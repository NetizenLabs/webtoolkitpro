import { NextResponse } from 'next/server'

export async function GET() {
  const robots = `User-agent: *
Allow: /
Disallow: /_next/

User-agent: Mediapartners-Google
Allow: /

Sitemap: https://wtkpro.site/sitemap.xml`

  return new NextResponse(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}