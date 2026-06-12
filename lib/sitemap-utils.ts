import { getTools } from '@/lib/tools'
import { CATEGORY_MAP } from '@/lib/categories'
import { getAllPosts } from '@/lib/blog'
import { COMPARE_DATA } from '@/lib/compare-data'
import { GUIDES_DATA } from '@/lib/guides-data'

export const BASE_URL = 'https://wtkpro.site'
export const TODAY = new Date()

export interface SitemapUrl {
  url: string
  lastModified: Date
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

// Ensure proper trailing slashes, but skip for XML files
const normalizeUrl = (url: string) => {
  if (url.endsWith('.xml')) return url;
  return url.endsWith('/') ? url : `${url}/`;
}

// ─── XML Generators ─────────────────────────────────────────────────────────

export function buildSitemapIndexXml(sitemaps: string[]): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  for (const sitemap of sitemaps) {
    xml += '  <sitemap>\n'
    xml += `    <loc>${normalizeUrl(sitemap)}</loc>\n`
    xml += '  </sitemap>\n'
  }
  xml += '</sitemapindex>'
  return xml
}

export function buildUrlsetXml(urls: SitemapUrl[]): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  for (const item of urls) {
    xml += '  <url>\n'
    xml += `    <loc>${normalizeUrl(item.url)}</loc>\n`
    if (item.lastModified) {
      xml += `    <lastmod>${item.lastModified.toISOString()}</lastmod>\n`
    }
    if (item.changeFrequency) {
      xml += `    <changefreq>${item.changeFrequency}</changefreq>\n`
    }
    if (item.priority !== undefined) {
      xml += `    <priority>${item.priority.toFixed(2)}</priority>\n`
    }
    xml += '  </url>\n'
  }
  xml += '</urlset>'
  return xml
}

// ─── Data Fetchers ──────────────────────────────────────────────────────────

export function getMainUrls(): SitemapUrl[] {
  const staticUrls: SitemapUrl[] = [
    { url: `${BASE_URL}/`, lastModified: TODAY, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/tools`, lastModified: TODAY, changeFrequency: 'daily', priority: 0.95 },
    { url: `${BASE_URL}/blog`, lastModified: TODAY, changeFrequency: 'daily', priority: 0.85 },
    { url: `${BASE_URL}/about`, lastModified: new Date('2026-05-01'), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/author`, lastModified: new Date('2026-05-01'), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/contact`, lastModified: new Date('2026-05-01'), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/pricing`, lastModified: new Date('2026-05-30'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/submit-tool`, lastModified: new Date('2026-05-01'), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/ai-visibility`, lastModified: TODAY, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/pipeline`, lastModified: TODAY, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/brand`, lastModified: new Date('2026-05-01'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date('2026-05-01'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date('2026-05-01'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/disclaimer`, lastModified: new Date('2026-05-01'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/compare`, lastModified: TODAY, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/guides`, lastModified: TODAY, changeFrequency: 'weekly', priority: 0.9 },
  ]

  const hubUrls: SitemapUrl[] = Object.keys(CATEGORY_MAP).map((slug) => ({
    url: `${BASE_URL}/tools/hub/${slug}`,
    lastModified: TODAY,
    changeFrequency: 'weekly',
    priority: 0.85,
  }))

  const compareUrls: SitemapUrl[] = COMPARE_DATA.map((comp) => ({
    url: `${BASE_URL}/compare/${comp.slug}`,
    lastModified: TODAY,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const guideUrls: SitemapUrl[] = GUIDES_DATA.map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}`,
    lastModified: TODAY,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticUrls, ...hubUrls, ...compareUrls, ...guideUrls]
}

export function getToolUrls(): SitemapUrl[] {
  const tools = getTools()
  return tools
    .filter((t) => !t.isComingSoon)
    .map((tool) => {
      const releaseDate = tool.releaseDate ? new Date(tool.releaseDate) : TODAY
      return {
        url: `${BASE_URL}/tools/${tool.slug}`,
        lastModified: isNaN(releaseDate.getTime()) ? TODAY : releaseDate,
        changeFrequency: 'monthly',
        priority: 0.8,
      }
    })
}

export function getBlogUrls(): SitemapUrl[] {
  const posts = getAllPosts()
  return posts
    .filter((post) => post.slug !== '_template')
    .map((post) => {
      const d = new Date(post.date)
      return {
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: isNaN(d.getTime()) ? TODAY : d,
        changeFrequency: 'monthly',
        priority: 0.7,
      }
    })
}
