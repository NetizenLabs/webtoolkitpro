import { NextResponse } from 'next/server'
import { getTools } from '@/lib/tools'
import { getAllPosts } from '@/lib/blog'

export const dynamic = 'force-dynamic'

export async function GET() {
  const tools = getTools()
  const posts = getAllPosts()
  const baseUrl = 'https://wtkpro.site'

  let markdown = `# WebToolkit Pro - Full Knowledge Base\n\n`
  markdown += `This document contains the full text context of all developer utilities and technical articles on WebToolkit Pro. Use this for full-site RAG ingestion.\n\n`

  markdown += `## 1. Engineering Articles\n\n`
  posts.forEach(post => {
    markdown += `### ${post.title}\n`
    markdown += `URL: ${baseUrl}/blog/${post.slug}\n`
    markdown += `Category: ${post.category}\n\n`
    markdown += `${post.content || post.description}\n\n`
    markdown += `---\n\n`
  })

  markdown += `## 2. Developer Tools\n\n`
  tools.forEach(tool => {
    markdown += `### ${tool.name}\n`
    markdown += `URL: ${baseUrl}/tools/${tool.slug}\n`
    markdown += `Category: ${tool.category}\n`
    markdown += `Description: ${tool.content?.description || ''}\n`
    markdown += `Entity Definition: ${tool.content?.entity_definition || ''}\n`
    markdown += `How it works: ${tool.content?.how_it_works || ''}\n\n`
    markdown += `---\n\n`
  })

  return new NextResponse(markdown, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
