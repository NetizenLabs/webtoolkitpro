import { getAllPosts } from '@/lib/blog'
import { getTools } from '@/lib/tools'

const DOMAIN = 'https://wtkpro.site'
const FEED_TITLE = 'WebToolkit Pro — Developer Tools & SEO Blog'
const FEED_DESC = 'Free online developer utilities, web performance tools, SEO auditing, security tools, and in-depth technical guides for modern web developers.'
const FEED_LANG = 'en-us'
const FEED_AUTHOR = 'Abu Sufyan'
const FEED_EMAIL = 'contact@wtkpro.site'

export async function GET() {
  const posts = getAllPosts()
  const tools = getTools()

  const feedItems = [
    // Blog posts — filter out template/draft entries
    ...posts
      .filter((post) => post.slug !== '_template' && post.slug !== 'template')
      .map((post) => ({
        title: post.title,
        link: `${DOMAIN}/blog/${post.slug}/`,
        description: post.description || post.title,
        date: new Date(post.date),
        guid: `${DOMAIN}/blog/${post.slug}/`,
        category: post.category || 'Web Development',
        type: 'article',
      })),

    // Tool pages — only implemented (non-coming-soon) tools
    ...tools
      .filter((tool) => !tool.isComingSoon)
      .map((tool) => ({
        title: tool.meta?.title || tool.name,
        link: `${DOMAIN}/tools/${tool.slug}/`,
        description: tool.meta?.description || tool.content?.description || `Free online ${tool.name} — browser-based, private, and fast.`,
        date: new Date(tool.releaseDate || '2026-05-01'),
        guid: `${DOMAIN}/tools/${tool.slug}/`,
        category: tool.category || 'Developer Tools',
        type: 'tool',
      })),
  ].sort((a, b) => {
    const aTime = isNaN(a.date.getTime()) ? 0 : a.date.getTime()
    const bTime = isNaN(b.date.getTime()) ? 0 : b.date.getTime()
    return bTime - aTime
  })

  const buildDate = new Date().toUTCString()

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
<channel>
  <title>${FEED_TITLE}</title>
  <link>${DOMAIN}/</link>
  <description>${FEED_DESC}</description>
  <language>${FEED_LANG}</language>
  <lastBuildDate>${buildDate}</lastBuildDate>
  <pubDate>${buildDate}</pubDate>
  <managingEditor>${FEED_EMAIL} (${FEED_AUTHOR})</managingEditor>
  <webMaster>${FEED_EMAIL} (${FEED_AUTHOR})</webMaster>
  <generator>WebToolkit Pro / Next.js</generator>
  <docs>https://www.rssboard.org/rss-specification</docs>
  <ttl>60</ttl>
  <atom:link href="${DOMAIN}/feed.xml" rel="self" type="application/rss+xml" />
  <image>
    <url>${DOMAIN}/logo.png</url>
    <title>${FEED_TITLE}</title>
    <link>${DOMAIN}/</link>
    <width>144</width>
    <height>144</height>
  </image>
  ${feedItems
    .map((item) => {
      const pubDate = isNaN(item.date.getTime()) ? buildDate : item.date.toUTCString()
      const escapedDesc = item.description
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
      return `
  <item>
    <title><![CDATA[${item.title}]]></title>
    <link>${item.link}</link>
    <description><![CDATA[${item.description}]]></description>
    <pubDate>${pubDate}</pubDate>
    <guid isPermaLink="true">${item.guid}</guid>
    <category><![CDATA[${item.category}]]></category>
    <dc:creator><![CDATA[${FEED_AUTHOR}]]></dc:creator>
  </item>`
    })
    .join('')}
</channel>
</rss>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
