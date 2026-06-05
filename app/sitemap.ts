import { MetadataRoute } from 'next'
import { getTools } from '@/lib/tools'
import { CATEGORY_MAP } from '@/lib/categories'
import { getAllPosts } from '@/lib/blog'

const BASE_URL = 'https://wtkpro.site'
const TODAY = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  const tools = getTools()
  const posts = getAllPosts()

  // ─── Static Pages ───────────────────────────────────────────────────────────
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: TODAY,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: TODAY,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: TODAY,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/author`,
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: new Date('2026-05-30'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/submit-tool`,
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/ai-visibility`,
      lastModified: TODAY,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/pipeline`,
      lastModified: TODAY,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/brand`,
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/disclaimer`,
      lastModified: new Date('2026-05-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // ─── Category Hub Pages (/tools/hub/[category]) ──────────────────────────────
  const hubUrls: MetadataRoute.Sitemap = Object.keys(CATEGORY_MAP).map((slug) => ({
    url: `${BASE_URL}/tools/hub/${slug}`,
    lastModified: TODAY,
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  // ─── Blog Posts ───────────────────────────────────────────────────────────────
  const blogUrls: MetadataRoute.Sitemap = posts
    .filter((post) => post.slug !== '_template')
    .map((post) => {
      const d = new Date(post.date)
      return {
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: isNaN(d.getTime()) ? TODAY : d,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }
    })

  // ─── Tool Pages (/tools/[slug]) — only implemented (non-coming-soon) ─────────
  const toolUrls: MetadataRoute.Sitemap = tools
    .filter((t) => !t.isComingSoon)
    .map((tool) => {
      const releaseDate = tool.releaseDate ? new Date(tool.releaseDate) : TODAY
      return {
        url: `${BASE_URL}/tools/${tool.slug}`,
        lastModified: isNaN(releaseDate.getTime()) ? TODAY : releaseDate,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }
    })

  // ─── Combine & normalise (trailing slash) ─────────────────────────────────────
  const allUrls = [
    ...staticUrls,
    ...hubUrls,
    ...blogUrls,
    ...toolUrls,
  ]

  return allUrls.map((item) => ({
    ...item,
    url: item.url.endsWith('/') ? item.url : `${item.url}/`,
  }))
}
