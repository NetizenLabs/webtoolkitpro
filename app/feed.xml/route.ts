import { getAllPosts } from '@/lib/blog'
import { getTools } from '@/lib/tools'


export async function GET() {
  const posts = getAllPosts()
  const tools = getTools()
  const domain = 'https://wtkpro.site'

  const feedItems = [
    ...posts.map((post) => ({
      title: post.title,
      link: `${domain}/blog/${post.slug}/`,
      description: post.description,
      date: new Date(post.date),
      guid: `${domain}/blog/${post.slug}/`,
      category: post.category,
    })),
    ...tools.map((tool) => ({
      title: tool.meta?.title || tool.name,
      link: `${domain}/tools/${tool.slug}/`,
      description: tool.meta?.description || tool.content?.description || '',
      date: new Date(tool.releaseDate || '2026-05-01'),
      guid: `${domain}/tools/${tool.slug}/`,
      category: tool.category,
    })),
  ].sort((a, b) => {
    const aTime = isNaN(a.date.getTime()) ? 0 : a.date.getTime()
    const bTime = isNaN(b.date.getTime()) ? 0 : b.date.getTime()
    return bTime - aTime
  })

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>WebToolkit Pro - Tools &amp; Developer Blog</title>
  <link>${domain}/</link>
  <description>Free online developer utilities, web tools, tips, tutorials, and guides.</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${domain}/feed.xml" rel="self" type="application/rss+xml" />
  ${feedItems
    .map((item) => {
      const pubDate = isNaN(item.date.getTime()) ? new Date().toUTCString() : item.date.toUTCString()
      return `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${item.link}</link>
      <description><![CDATA[${item.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <guid>${item.guid}</guid>
      <category><![CDATA[${item.category}]]></category>
    </item>`
    })
    .join('')}
</channel>
</rss>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  })
}
