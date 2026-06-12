import React from 'react'
import Link from '@/components/ui/NativeLink';
import { Zap, ChevronLeft, ChevronRight } from 'lucide-react'
import { getAllPosts } from '@/lib/blog'
import AdSlot from '@/components/ads/AdSlot'
import { getToolBySlug } from '@/lib/tools'
import RelatedToolsInline from '@/components/blog/RelatedToolsInline'

// ISR: cache blog listing at the CDN edge for 1 hour
// This is the primary fix for the /blog RES 83 score → targets TTFB reduction
export const revalidate = 3600

export async function generateMetadata({ searchParams }: { searchParams: { page?: string, jpage?: string } }) {
  const isTauri = process.env.TAURI_ENV === 'true'
  const page = isTauri ? '1' : (searchParams?.page || '1')
  const jpage = isTauri ? '1' : (searchParams?.jpage || '1')
  
  let url = 'https://wtkpro.site/blog/'
  const params = []
  if (page !== '1') params.push(`page=${page}`)
  if (jpage !== '1') params.push(`jpage=${jpage}`)
  
  if (params.length > 0) {
    url += `?${params.join('&')}`
  }

  const pageSuffix = page !== '1' ? ` - Page ${page}` : '';
  const title = `Web Dev Tutorials, SEO Guides & Cases${pageSuffix} | WebToolkit Pro`;
  const description = `Master modern web development with free expert tutorials, technical guides, and performance case studies. Learn secure workflows, CSS, and technical SEO.${pageSuffix ? ' ' + pageSuffix.trim() : ''}`;

  return {
    title: title,
    description: description,
    keywords: 'web development blog, developer tutorials, coding tips, programming guides, web development best practices',
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title,
      description: description,
      url: url,
      siteName: 'WebToolkit Pro',
      images: [
        {
          url: 'https://wtkpro.site/blog-og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'WebToolkit Pro Developer Blog',
        },
      ],
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      site: '@WebToolkitPro',
      images: ['https://wtkpro.site/blog-og-image.jpg'],
    },
  }
}

const categoryColors: { [k: string]: string } = {
  'Tools': 'bg-[#0969DA]/10 dark:bg-[#00D4B4]/10 text-[#0969DA] dark:text-[#00D4B4] border-[#0969DA]/20 dark:border-[#00D4B4]/20',
  'Tutorials': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  'Security': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
  'SEO': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
  'CSS': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800',
  'Research': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
  'Engineering': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
}

function Pagination({ currentPage, totalItems, limit, paramName }: { currentPage: number, totalItems: number, limit: number, paramName: string }) {
  const totalPages = Math.ceil(totalItems / limit)
  if (totalPages <= 1) return null

  const pages = []
  for (let i = 1; i <= totalPages; i++) pages.push(i)

  return (
    <div className="flex items-center justify-center gap-2 mt-12 mb-8">
      {currentPage > 1 && (
        <Link 
          href={currentPage - 1 === 1 ? '/blog' : `/blog?${paramName}=${currentPage - 1}`}
          className="p-2 rounded-lg bg-[#0D1526] border border-[#1E2D47] text-[#8A9BBE] hover:text-[#00D4B4] hover:border-[#00D4B4]/50 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
      )}
      
      {pages.map(page => (
        <Link
          key={page}
          href={page === 1 ? '/blog' : `/blog?${paramName}=${page}`}
          className={`w-10 h-10 flex items-center justify-center rounded-lg border font-bold font-mono text-sm transition-all ${
            page === currentPage 
              ? 'bg-[#00D4B4] border-[#00D4B4] text-[#0D1117]' 
              : 'bg-card border-border text-muted-foreground hover:border-[#00D4B4]/50'
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link 
          href={`/blog?${paramName}=${currentPage + 1}`}
          className="p-2 rounded-lg bg-elevated border border-border text-muted-foreground hover:text-[#00D4B4] hover:border-[#00D4B4]/50 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      )}
    </div>
  )
}

export default function BlogPage({ searchParams }: { searchParams: { page?: string, jpage?: string } }) {
  const isTauri = process.env.TAURI_ENV === 'true'
  const allPosts = getAllPosts()
  const blogs = allPosts.filter(p => p.type === 'blog')
  const journals = allPosts.filter(p => p.type === 'journal')

  const blogPage = isTauri ? 1 : parseInt(searchParams?.page || '1')
  const journalPage = isTauri ? 1 : parseInt(searchParams?.jpage || '1')
  const limit = isTauri ? 1000 : 30

  const blogStart = (blogPage - 1) * limit
  const currentBlogs = blogs.slice(blogStart, blogStart + limit)

  const journalStart = (journalPage - 1) * limit
  const currentJournals = journals.slice(journalStart, journalStart + limit)

  return (
    <>
      <div className="dynamic-padding max-w-7xl mx-auto min-h-screen">
        {/* Hero Section */}
        <div className="text-center mb-16 pt-12">
          <span className="inline-block px-4 py-1.5 bg-[#00D4B4]/10 text-[#00D4B4] text-sm font-bold font-mono uppercase tracking-[0.2em] rounded-full mb-4 border border-[#00D4B4]/20">
            📝 Knowledge Center
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-[#1E2D47] dark:text-white mb-6 tracking-tighter">
            Developer Blog & <span className="text-[#00D4B4]">Case Studies</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-[#8A9BBE] max-w-2xl mx-auto leading-relaxed">
            Expert web development insights to level up your skills. From performance research to CSS architecture.
          </p>
        </div>

        {/* Featured Tools Strip (Breaking the Blog Silo) */}
        {blogPage === 1 && (
          <div className="mb-24">
            <RelatedToolsInline tools={[
              getToolBySlug('jwt-decoder-generator'),
              getToolBySlug('json-yaml-jsonl-converter'),
              getToolBySlug('regex-tester'),
              getToolBySlug('site-audit-pro'),
              getToolBySlug('password-entropy-tester'),
              getToolBySlug('css-generators'),
            ].filter((t): t is NonNullable<typeof t> => t !== undefined)} />
          </div>
        )}

        {/* Blogs Section */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-12 border-b border-border pb-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground tracking-tight">Technical Blogs</h2>
              <p className="text-sm text-muted-foreground mt-1">Tutorials, news, and deep dives for daily development.</p>
            </div>
            <div className="text-sm font-mono font-bold text-muted-foreground uppercase tracking-widest bg-muted dark:bg-elevated px-3 py-1 rounded-full border border-border">
              {blogs.length} Articles
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {currentBlogs.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                <article className="bg-card rounded-[24px] border border-border p-8 hover:border-[#00D4B4]/30 transition-all duration-300 h-full flex flex-col relative overflow-hidden shadow-sm hover:shadow-xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D4B4]/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <span className={`text-sm font-bold px-3 py-1 rounded-full border uppercase tracking-widest font-mono ${categoryColors[post.category] || 'bg-background text-muted-foreground border-border'}`}>
                      {post.category}
                    </span>
                    <span className="text-sm font-mono font-bold text-muted-foreground/60 uppercase tracking-widest">
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-[#00D4B4] transition-colors leading-tight relative z-10">{post.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-grow line-clamp-3 relative z-10">{post.description}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-border/30 relative z-10">
                    <span className="text-sm font-bold text-[#00D4B4] flex items-center gap-2 uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                      Read Entry <Zap className="w-3 h-3 fill-current" />
                    </span>
                    <span className="text-sm uppercase font-bold tracking-widest text-muted-foreground/50 font-mono">{post.readTime}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <Pagination currentPage={blogPage} totalItems={blogs.length} limit={limit} paramName="page" />
        </section>

        {/* Ad Slot - Middle */}
        <AdSlot minHeight="90px" className="mb-24" />

        {/* Journals Section */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-12 border-b border-border pb-6">
            <div>
              <h2 className="text-3xl font-bold text-[#00D4B4] tracking-tight">Case Studies</h2>
              <p className="text-sm text-muted-foreground mt-1">Technical Guides & Performance Case Studies.</p>
            </div>
            <div className="text-sm font-mono font-bold text-[#00D4B4]/60 uppercase tracking-widest bg-elevated px-3 py-1 rounded-full border border-[#00D4B4]/20">
              {journals.length} Papers
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {currentJournals.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                <article className="bg-card rounded-[24px] border border-border p-8 hover:border-[#00D4B4]/30 transition-all duration-300 h-full flex flex-col relative overflow-hidden shadow-sm hover:shadow-xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00D4B4]/10 to-[#0094FF]/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <span className="text-sm font-bold px-3 py-1 rounded-full bg-[#00D4B4]/10 text-[#00D4B4] border border-[#00D4B4]/20 uppercase tracking-widest font-mono">
                      {post.category}
                    </span>
                    <span className="text-sm font-mono font-bold text-muted-foreground/50 uppercase tracking-widest">
                      STUDY NO. {post.slug.slice(0, 4).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-[#00D4B4] transition-colors leading-tight relative z-10">{post.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-grow line-clamp-3 relative z-10 font-medium italic">&quot;{post.description}&quot;</p>
                  <div className="flex items-center justify-between pt-6 border-t border-border/30 relative z-10">
                    <span className="text-sm font-bold text-[#00D4B4] uppercase tracking-widest">View Full Paper</span>
                    <span className="text-sm uppercase font-bold tracking-widest text-muted-foreground/50 font-mono">{post.readTime}</span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <Pagination currentPage={journalPage} totalItems={journals.length} limit={limit} paramName="jpage" />
        </section>

        {/* Ad Slot - Bottom */}
        <AdSlot minHeight="250px" className="mt-16" />
      </div>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            'name': 'WebToolkit Pro Developer Blog & Case Studies',
            'description': 'Expert web development tips, tutorials, and research papers.',
            'url': 'https://wtkpro.site/blog',
            'publisher': {
              '@type': 'Organization',
              'name': 'WebToolkit Pro',
              'url': 'https://wtkpro.site',
            },
            'blogPost': allPosts.map((post) => ({
              '@type': 'BlogPosting',
              'headline': post.title,
              'description': post.description,
              'datePublished': post.date,
              'author': {
                '@type': 'Organization',
                'name': post.author,
              },
              'url': `https://wtkpro.site/blog/${post.slug}`,
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://wtkpro.site/',
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Blog',
                'item': 'https://wtkpro.site/blog/',
              },
            ],
          }),
        }}
      />
    </>
  )
}
