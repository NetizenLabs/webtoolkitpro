import { NextResponse } from 'next/server'

export async function GET() {
  const robots = `User-agent: *
Allow: /

User-agent: Mediapartners-Google
Allow: /

Sitemap: https://wtkpro.site/sitemap.xml
Sitemap: https://wtkpro-hub.vercel.app/sitemap.xml`

  return new NextResponse(robots, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}