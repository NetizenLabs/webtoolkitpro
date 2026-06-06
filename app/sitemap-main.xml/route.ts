import { getMainUrls, buildUrlsetXml } from '@/lib/sitemap-utils'

export async function GET() {
  const urls = getMainUrls()
  const xml = buildUrlsetXml(urls)

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
