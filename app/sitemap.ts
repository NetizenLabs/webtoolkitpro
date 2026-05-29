import { MetadataRoute } from 'next'
import { getTools } from '@/lib/tools'
import { CATEGORY_MAP } from '@/lib/categories'
import { getAllPosts } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wtkpro.site'
  const tools = getTools()
  const posts = getAllPosts()
  


  const blogUrls = posts.map((post) => {
    const d = new Date(post.date)
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: isNaN(d.getTime()) ? new Date() : d,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  })

  const toolUrls = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const staticUrls = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/ai-visibility`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/author`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/brand`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
  ]

  const hubUrls = Object.keys(CATEGORY_MAP).map((slug) => ({
    url: `${baseUrl}/tools/hub/${slug.replace(/ & /g, '-').replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }))

  const allUrls = [...staticUrls, ...hubUrls, ...blogUrls, ...toolUrls]

  return allUrls.map((item) => {
    let formattedUrl = item.url
    if (!formattedUrl.endsWith('/')) {
      formattedUrl = `${formattedUrl}/`
    }
    return {
      ...item,
      url: formattedUrl,
    }
  })
}
