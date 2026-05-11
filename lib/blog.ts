import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const INTERNAL_LINKS = [
  { keyword: 'Pinterest Downloader', url: '/tools/pinterest-downloader/' },
  { keyword: 'Pinterest image downloader', url: '/tools/pinterest-downloader/' },
  { keyword: 'JSON Formatter', url: '/tools/json-formatter/' },
  { keyword: 'format JSON', url: '/tools/json-formatter/' },
  { keyword: 'What is my IP', url: '/tools/what-is-my-ip/' },
  { keyword: 'Redirect Checker', url: '/tools/redirect-checker/' },
  { keyword: 'Password Generator', url: '/tools/password-generator/' },
  { keyword: 'secure passwords', url: '/tools/password-generator/' },
  { keyword: 'strong passwords', url: '/tools/password-generator/' },
  { keyword: 'developer tools', url: '/tools/' },
  { keyword: 'Edge Computing', url: '/blog/edge-computing-guide/' },
  { keyword: 'Edge Functions', url: '/blog/edge-computing-guide/' },
  { keyword: 'JSON formatting', url: '/blog/json-formatting-best-practices/' },
  { keyword: 'database design', url: '/blog/scalable-database-design/' },
  { keyword: 'serverless computing', url: '/blog/serverless-computing-future/' },
  { keyword: 'JS Frameworks', url: '/blog/enterprise-js-frameworks/' },
  { keyword: 'technical SEO', url: '/blog/ai-seo-optimization-2026/' },
  { keyword: 'structured data', url: '/blog/seo-meta-tags-complete-guide/' },
  { keyword: 'RegEx Tester', url: '/tools/regex-tester/' },
  { keyword: 'Regular Expressions', url: '/tools/regex-tester/' },
  { keyword: 'JWT Decoder', url: '/tools/jwt-decoder/' },
  { keyword: 'JSON Web Tokens', url: '/tools/jwt-decoder/' },
  { keyword: 'Cron Generator', url: '/tools/cron-generator/' },
  { keyword: 'crontab', url: '/tools/cron-generator/' },
  { keyword: 'DEVHUB INDEX', url: 'https://devhubindex.vercel.app/' },
  { keyword: 'Abu Sufyan', url: 'https://abusufyan.xyz' },
  { keyword: 'Trust Network', url: '/blog/webtoolkit-pro-trust-network/' },
]

function applySmartLinks(htmlString: string): string {
  let processedHtml = htmlString;
  
  INTERNAL_LINKS.forEach(({ keyword, url }) => {
    // Regex explanation:
    // (?<!href=")(?<!">) - Negative lookbehind to ensure it's not part of an existing link tag or attribute
    // (?![^<]*<\/a>) - Negative lookahead to ensure it's not inside an <a>...</a> block
    // \b - Word boundary
    const regex = new RegExp(`(?<!href=")(?<!">)\\b${keyword}\\b(?![^<]*<\\/a>)`, 'gi');
    processedHtml = processedHtml.replace(regex, (match) => {
      return `<a href="${url}" class="text-blue-600 dark:text-blue-400 font-bold hover:underline transition-all decoration-blue-500/30">${match}</a>`;
    });
  });
  
  return processedHtml;
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  keywords: string[]
  readTime: string
  tldr?: string
  author: string
  image: string
  imageAlt: string
  content: string
  htmlContent?: string
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []

  const now = new Date();
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.md'))

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
      category: data.category || 'General',
      tags: data.tags || [],
      keywords: data.keywords || [],
      readTime: data.readTime || '5 min read',
      tldr: data.tldr || '',
      author: data.author || 'WebToolkit Pro Team',
      image: data.image || '',
      imageAlt: data.imageAlt || data.title || '',
      content,
    } as BlogPost
  }).filter(post => {
    const postDate = new Date(post.date);
    return postDate <= now; // Hide future posts
  });

  // Safe sort with date validation
  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA)
  })
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)

  // Hide future posts
  const postDate = new Date(data.date);
  if (postDate > new Date()) return null;

  // Use remark to convert markdown to HTML string
  const processedContent = await remark()
    .use(html)
    .process(content)
  const rawHtml = processedContent.toString()
  const htmlContent = applySmartLinks(rawHtml)

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    date: data.date || new Date().toISOString(),
    category: data.category || 'General',
    tags: data.tags || [],
    keywords: data.keywords || [],
    readTime: data.readTime || '5 min read',
    tldr: data.tldr || '',
    author: data.author || 'WebToolkit Pro Team',
    image: data.image || '',
    imageAlt: data.imageAlt || data.title || '',
    content,
    htmlContent,
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}
