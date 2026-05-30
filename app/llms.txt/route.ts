import { NextResponse } from 'next/server'
import { getTools } from '@/lib/tools'
import { getAllPosts } from '@/lib/blog'

export const dynamic = 'force-dynamic'

export async function GET() {
  const tools = getTools()
  const posts = getAllPosts()
  const baseUrl = 'https://wtkpro.site'

  let markdown = `# WebToolkit Pro - LLM Directory\n\n`
  markdown += `> WebToolkit Pro is a comprehensive suite of 190+ free, secure, client-side developer utilities and deep-dive engineering journals.\n\n`

  markdown += `## Developer Tools\n`
  tools.forEach(tool => {
    markdown += `- [${tool.name}](${baseUrl}/tools/${tool.slug}): ${tool.content?.description || tool.name}\n`
  })

  markdown += `\n## Engineering Knowledge Base\n`
  posts.forEach(post => {
    markdown += `- [${post.title}](${baseUrl}/blog/${post.slug}): ${post.description}\n`
  })

  return new NextResponse(markdown, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
