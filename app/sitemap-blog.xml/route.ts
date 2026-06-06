import { getBlogUrls, buildUrlsetXml } from '@/lib/sitemap-utils'

export async function GET() {
  const urls = getBlogUrls()
  const xml = buildUrlsetXml(urls)

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
