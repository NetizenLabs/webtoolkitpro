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
  const step1 = applySmartLinks(rawHtml)
  const htmlContent = applyPremiumStyles(step1)

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
