import { getTools } from '@/lib/tools'
import { CATEGORY_MAP } from '@/lib/categories'
import { getAllPosts } from '@/lib/blog'
import { COMPARE_DATA } from '@/lib/compare-data'
import { GUIDES_DATA } from '@/lib/guides-data'

export const BASE_URL = 'https://wtkpro.site'

export interface SitemapUrl {
  url: string
  // Only set lastModified when a real per-page updated date exists in the
  // source data. Never stamp bulk constants (build time, release batches,
  // hand-written literals): a fake uniform lastmod trains crawlers to
  // ignore lastmod entirely, while an absent one is honest.
  lastModified?: Date
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
  // No lastModified for static/hub/compare/guide pages: there is no real
  // per-page updated date in the source data. The previous values were bulk
  // constants — the build-time `new Date()` (one identical millisecond
  // timestamp shared by every URL) and shared hand-written date literals.
  const staticUrls: SitemapUrl[] = [
    { url: `${BASE_URL}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/tools`, changeFrequency: 'daily', priority: 0.95 },
    { url: `${BASE_URL}/blog`, changeFrequency: 'daily', priority: 0.85 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/author`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/pricing`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/submit-tool`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/ai-visibility`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/pipeline`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/brand`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/disclaimer`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/compare`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/guides`, changeFrequency: 'weekly', priority: 0.9 },
  ]

  const hubUrls: SitemapUrl[] = Object.keys(CATEGORY_MAP).map((slug) => ({
    url: `${BASE_URL}/tools/hub/${slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  const compareUrls: SitemapUrl[] = COMPARE_DATA.map((comp) => ({
    url: `${BASE_URL}/compare/${comp.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const guideUrls: SitemapUrl[] = GUIDES_DATA.map((guide) => ({
    url: `${BASE_URL}/guides/${guide.slug}/`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticUrls, ...hubUrls, ...compareUrls, ...guideUrls]
}

export function getToolUrls(): SitemapUrl[] {
  const tools = getTools()
  return tools
    .filter((t) => !t.isComingSoon)
    .map((tool) => ({
      url: `${BASE_URL}/tools/${tool.slug}/`,
      // No lastmod: config/tools.yaml carries only releaseDate, which is a
      // batch release stamp (dozens of tools share 2026-05-01 / 2026-05-30),
      // not a per-tool updated date. Omit until a real updated-date field
      // exists in the tools data.
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
}

export function getBlogUrls(): SitemapUrl[] {
  const posts = getAllPosts()
  return posts
    .filter((post) => post.slug !== '_template')
    .map((post) => {
      const d = new Date(post.date)
      return {
        url: `${BASE_URL}/blog/${post.slug}/`,
        // post.date is a real per-post date from the post's own frontmatter,
        // so it stays. An unparseable date now omits lastmod instead of
        // falling back to a bulk build-time stamp.
        ...(isNaN(d.getTime()) ? {} : { lastModified: d }),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }
    })
}
