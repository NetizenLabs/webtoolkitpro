import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import gfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

const INTERNAL_LINKS = [
  // Developer Tools
  { keyword: 'JSON Formatter', url: '/tools/json-formatter/' },
  { keyword: 'format JSON', url: '/tools/json-formatter/' },
  { keyword: 'validate JSON', url: '/tools/json-formatter/' },
  { keyword: 'Password Generator', url: '/tools/password-generator/' },
  { keyword: 'secure passwords', url: '/tools/password-generator/' },
  { keyword: 'strong passwords', url: '/tools/password-generator/' },
  { keyword: 'password entropy', url: '/tools/password-generator/' },
  { keyword: 'RegEx Tester', url: '/tools/regex-tester/' },
  { keyword: 'Regular Expressions', url: '/tools/regex-tester/' },
  { keyword: 'RegEx patterns', url: '/tools/regex-tester/' },
  { keyword: 'JWT Decoder', url: '/tools/jwt-decoder/' },
  { keyword: 'JSON Web Tokens', url: '/tools/jwt-decoder/' },
  { keyword: 'decode JWT', url: '/tools/jwt-decoder/' },
  { keyword: 'Hash Generator', url: '/tools/hash-generator/' },
  { keyword: 'Base64 encode', url: '/tools/base64-encoder/' },
  { keyword: 'XML formatter', url: '/tools/xml-formatter/' },
  
  // SEO & Network
  { keyword: 'Redirect Checker', url: '/tools/redirect-checker/' },
  { keyword: 'What is my IP', url: '/tools/what-is-my-ip/' },
  { keyword: 'XML Sitemap Validator', url: '/tools/sitemap-validator/' },
  { keyword: 'Robots.txt Generator', url: '/tools/robots-txt-toolkit/' },
  { keyword: 'Meta Tag Generator', url: '/tools/meta-tag-generator/' },
  
  // Broad Hubs
  { keyword: 'developer tools', url: '/tools/hub/developer-tools/' },
  
  // Blogs & Architecture
  { keyword: 'Edge Computing', url: '/blog/edge-computing-guide/' },
  { keyword: 'Edge Functions', url: '/blog/edge-computing-guide/' },
  { keyword: 'JSON formatting', url: '/blog/json-formatting-best-practices/' },
  { keyword: 'database design', url: '/blog/scalable-database-design/' },
  { keyword: 'serverless computing', url: '/blog/serverless-computing-future/' },
  { keyword: 'JS Frameworks', url: '/blog/enterprise-js-frameworks/' },
  { keyword: 'technical SEO', url: '/blog/ai-seo-optimization-2026/' },
  { keyword: 'structured data', url: '/blog/seo-meta-tags-complete-guide/' },
  { keyword: 'meta tags', url: '/blog/seo-meta-tags-complete-guide/' },
  { keyword: 'Trust Network', url: '/blog/webtoolkit-pro-trust-network/' },
  { keyword: 'RFC 8259', url: '/blog/what-is-json-complete-guide/' },
  { keyword: 'JSON-LD', url: '/blog/json-ld-schema-tutorial/' },
  { keyword: 'Edge Runtime', url: '/blog/edge-computing-performance-2026/' },
  { keyword: 'TTFB', url: '/blog/3ms-ttfb-performance-study/' },
  
  // External Authored
  { keyword: 'DEVHUB INDEX', url: 'https://devhubindex.vercel.app' },
  { keyword: 'Abu Sufyan', url: 'https://abusufyan.xyz' },
]

export function getRelatedToolsForPost(postTags: string[], limit: number = 3) {
  // Safe dynamic import to avoid circular dependencies if getTools is imported here directly
  const { getTools } = require('./tools')
  const allTools = getTools()
  
  const related = allTools.map((tool: any) => {
    let score = 0
    const tagOverlap = tool.tags.filter((tag: string) => postTags.includes(tag)).length
    score += tagOverlap * 10
    return { tool, score }
  })
  .filter((item: any) => item.score > 0)
  .sort((a: any, b: any) => b.score - a.score)
  .slice(0, limit)
  .map((item: any) => item.tool)
  
  return related
}

function applySmartLinks(htmlString: string): string {
  let processedHtml = htmlString;
  
  INTERNAL_LINKS.forEach(({ keyword, url }) => {
    // Safely skip <a> tags and other HTML tags to prevent nested links or malformed attributes
    const regex = new RegExp(`(<a\\b[^>]*>.*?<\\/a>)|(<[^>]+>)|\\b(${keyword})\\b`, 'gi');
    processedHtml = processedHtml.replace(regex, (match, aTag, otherTag, kw) => {
      if (aTag) return aTag;
      if (otherTag) return otherTag;
      return `<a href="${url}" class="text-blue-600 dark:text-blue-400 font-bold hover:underline transition-all decoration-blue-500/30">${kw}</a>`;
    });
  });

  // Tool Path Auto-Linker
  // Matches /tools/slug/ and converts to a styled link. 
  // Safely ignores <a> tags, HTML tags, and absolute URLs to prevent issues like https://wtkpro.site<a href=...
  const toolRegex = /(<a\b[^>]*>.*?<\/a>)|(<[^>]+>)|(https?:\/\/[^\s<"']+)|(\/tools\/([a-z0-9-]+)\/?)/gi;
  processedHtml = processedHtml.replace(toolRegex, (match, aTag, otherTag, fullUrl, toolPath, slug) => {
    if (aTag) return aTag;
    if (otherTag) return otherTag;
    if (fullUrl) return fullUrl;

    // Format the slug into a readable name (e.g., json-formatter -> Json Formatter)
    const name = slug.split('-').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return `<a href="/tools/${slug}/" class="text-[#00D4B4] font-bold hover:underline transition-all decoration-[#00D4B4]/30">${name}</a>`;
  });

  return processedHtml;
}

function applyPremiumStyles(htmlString: string): string {
  let processedHtml = htmlString;
  
  // Transform [x] into premium checkmark
  processedHtml = processedHtml.replace(/\[x\]/g, `
    <span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#00D4B4]/20 border border-[#00D4B4]/40 mr-2 transform translate-y-0.5">
      <svg class="w-3 h-3 text-[#00D4B4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
      </svg>
    </span>
  `);

  // Transform [ ] into empty checkmark
  processedHtml = processedHtml.replace(/\[ \]/g, `
    <span class="inline-flex items-center justify-center w-5 h-5 rounded-full border border-[#1E2D47] mr-2 transform translate-y-0.5"></span>
  `);

  // Detect "AIO Checklist" and wrap in premium block
  const checklistRegex = /(<h3>.*AIO Checklist.*<\/h3>)\s*<ul>([\s\S]*?)<\/ul>/gi;
  processedHtml = processedHtml.replace(checklistRegex, (match, header, list) => {
    return `
      <div class="my-12 p-8 bg-[#0D1526] border border-[#1E2D47] rounded-[24px] relative overflow-hidden group">
        <div class="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
          <svg class="w-16 h-16 text-[#00D4B4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
        </div>
        <div class="relative z-10">
          <div class="flex items-center gap-2 mb-6">
            <span class="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D4B4] to-[#0094FF] flex items-center justify-center">
              <svg class="w-4 h-4 text-[#0B1120]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
            </span>
            <span class="text-[10px] font-bold text-[#00D4B4] uppercase tracking-widest">Authority Signals</span>
          </div>
          ${header}
          <div class="mt-4 prose-ul:list-none prose-li:pl-0">
            <ul class="space-y-3">
              ${list}
            </ul>
          </div>
        </div>
      </div>
    `;
  });

  return processedHtml;
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  lastUpdated: string
  category: string
  tags: string[]
  keywords: string[]
  readTime: string
  tldr?: string
  author: string
  image: string
  imageAlt: string
  seoTitle?: string
  content: string
  htmlContent?: string
  faqs?: { q: string; a: string }[]
  expertTips?: string[]
  steps?: { name: string; text: string }[]
  type: 'blog' | 'journal'
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

let cachedPosts: BlogPost[] | null = null
const cachedPostsBySlug: Record<string, BlogPost> = {}

export function getAllPosts(): BlogPost[] {
  if (process.env.NODE_ENV === 'production' && cachedPosts) {
    return cachedPosts
  }

  if (!fs.existsSync(BLOG_DIR)) return []

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md') && !f.startsWith('_'))

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.md$/, '')
    const filePath = path.join(BLOG_DIR, filename)
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(fileContent)
    
    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      lastUpdated: data.lastUpdated || data.date || new Date().toISOString(),
      category: data.category || 'General',
      tags: data.tags || [],
      keywords: data.keywords || [],
      readTime: data.readTime || '5 min read',
      tldr: data.tldr || '',
      author: data.author || 'WebToolkit Pro Team',
      imageAlt: data.imageAlt || data.title || '',
      seoTitle: data.seoTitle || '',
      content,
      faqs: data.faqs || [],
      expertTips: data.expertTips || [],
      steps: data.steps || [],
      type: ['Research', 'Engineering'].includes(data.category) ? 'journal' : 'blog',
    } as BlogPost
  });

  // Safe sort with date validation
  const sorted = posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA)
  })

  if (process.env.NODE_ENV === 'production') {
    cachedPosts = sorted
  }

  return sorted
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (process.env.NODE_ENV === 'production' && cachedPostsBySlug[slug]) {
    return cachedPostsBySlug[slug]
  }

  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  const processedContent = await unified()
    .use(remarkParse)
    .use(gfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)
  const rawHtml = processedContent.toString()
  const step1 = applySmartLinks(rawHtml)
  const htmlContent = applyPremiumStyles(step1)

  const post: BlogPost = {
    slug,
    title: data.title || '',
    description: data.description || '',
    date: data.date || new Date().toISOString(),
    lastUpdated: data.lastUpdated || data.date || new Date().toISOString(),
    category: data.category || 'General',
    tags: data.tags || [],
    keywords: data.keywords || [],
    readTime: data.readTime || '5 min read',
    tldr: data.tldr || '',
    author: data.author || 'WebToolkit Pro Team',
    image: data.image || '',
    imageAlt: data.imageAlt || data.title || '',
    seoTitle: data.seoTitle || '',
    content,
    htmlContent,
    faqs: data.faqs || [],
    expertTips: data.expertTips || [],
    steps: data.steps || [],
    type: ['Research', 'Engineering'].includes(data.category) ? 'journal' : 'blog',
  }

  if (process.env.NODE_ENV === 'production') {
    cachedPostsBySlug[slug] = post
  }

  return post
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md') && !f.startsWith('_'))
    .map((f) => f.replace(/\.md$/, ''))
}

export function getRelatedPostsForTool(toolTags: string[], toolCategory: string, limit: number = 2): BlogPost[] {
  const allPosts = getAllPosts()
  
  const related = allPosts.map(post => {
    let score = 0
    
    // Check for tag overlap (Highest Priority for Topical Clustering)
    const tagOverlap = post.tags.filter(tag => toolTags.includes(tag)).length
    score += tagOverlap * 10

    // Check for category similarity
    if (post.category.toLowerCase() === toolCategory.toLowerCase()) {
      score += 5
    }

    // Check for keyword overlap in title
    const toolKeywords = toolTags.map(t => t.toLowerCase())
    const titleWords = post.title.toLowerCase().split(' ')
    const keywordOverlap = titleWords.filter(word => toolKeywords.includes(word)).length
    score += keywordOverlap * 2

    return { post, score }
  })
  .filter(item => item.score >= 10) // STRICT REQUIREMENT: Must share at least 1 exact tag
  .sort((a, b) => b.score - a.score)
  .slice(0, limit)
  .map(item => item.post)

  return related
}
