import { BASE_URL, buildSitemapIndexXml } from '@/lib/sitemap-utils'

export async function GET() {
  const sitemaps = [
    `${BASE_URL}/sitemap-main.xml`,
    `${BASE_URL}/sitemap-tools.xml`,
    `${BASE_URL}/sitemap-blog.xml`,
  ]

  const xml = buildSitemapIndexXml(sitemaps)

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
