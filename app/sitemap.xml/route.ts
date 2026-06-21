import { getMainUrls, getToolUrls, getBlogUrls, buildUrlsetXml } from '@/lib/sitemap-utils'

export async function GET() {
  const mainUrls = getMainUrls()
  const toolUrls = getToolUrls()
  const blogUrls = getBlogUrls()

  const allUrls = [...mainUrls, ...toolUrls, ...blogUrls]

  const xml = buildUrlsetXml(allUrls)

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
