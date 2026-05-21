import { getAllPosts } from '@/lib/blog'

export const dynamic = 'force-dynamic'

export async function GET() {
  const posts = getAllPosts()
  const domain = 'https://wtkpro.site'

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>WebToolkit Pro - Developer Blog</title>
  <link>${domain}/blog/</link>
  <description>Expert web development tips, tutorials, and guides for modern developers.</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${domain}/feed.xml" rel="self" type="application/rss+xml" />
  ${posts
    .map((post) => {
      const d = new Date(post.date)
      const pubDate = isNaN(d.getTime()) ? new Date().toUTCString() : d.toUTCString()
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${domain}/blog/${post.slug}/</link>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <guid>${domain}/blog/${post.slug}/</guid>
      <category>${post.category}</category>
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
