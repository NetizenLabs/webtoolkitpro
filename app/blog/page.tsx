import React from 'react'
import Link from 'next/link'
import { Zap, ChevronLeft, ChevronRight } from 'lucide-react'
import { getAllPosts } from '@/lib/blog'
import AdSlot from '@/components/ads/AdSlot'

export const metadata = {
  title: 'Engineering Blog: Technical Guides & Tutorials | WebToolkit Pro',
  description: 'Expert web development tips, tutorials, and guides. Learn about developer tools, JSON formatting, password security, SEO optimization, CSS best practices, and more.',
  keywords: 'web development blog, developer tutorials, coding tips, programming guides, web development best practices',
  alternates: {
    canonical: 'https://wtkpro.site/blog',
  },
  openGraph: {
    title: 'Developer Blog - WebToolkit Pro',
    description: 'Expert web development tips, tutorials, and guides for modern developers.',
    url: 'https://wtkpro.site/blog',
    siteName: 'WebToolkit Pro',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Developer Blog - WebToolkit Pro',
    description: 'Expert web development tips, tutorials, and guides for modern developers.',
  },
}

const categoryColors: { [k: string]: string } = {
  'Tools': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
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
          href={`/blog/?${paramName}=${currentPage - 1}`}
          className="p-2 rounded-lg bg-[#0D1526] border border-[#1E2D47] text-[#8A9BBE] hover:text-[#00D4B4] hover:border-[#00D4B4]/50 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
      )}
      
      {pages.map(page => (
        <Link
          key={page}
          href={`/blog/?${paramName}=${page}`}
          className={`w-10 h-10 flex items-center justify-center rounded-lg border font-bold font-mono text-xs transition-all ${
            page === currentPage 
              ? 'bg-[#00D4B4] border-[#00D4B4] text-[#0B1120]' 
              : 'bg-[#0D1526] border-[#1E2D47] text-[#8A9BBE] hover:border-[#00D4B4]/50'
          }`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link 
          href={`/blog/?${paramName}=${currentPage + 1}`}
          className="p-2 rounded-lg bg-[#0D1526] border border-[#1E2D47] text-[#8A9BBE] hover:text-[#00D4B4] hover:border-[#00D4B4]/50 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      )}
    </div>
  )
}

export default function BlogPage({ searchParams }: { searchParams: { page?: string, jpage?: string } }) {
  const allPosts = getAllPosts()
  const blogs = allPosts.filter(p => p.type === 'blog')
  const journals = allPosts.filter(p => p.type === 'journal')

  const blogPage = parseInt(searchParams.page || '1')
  const journalPage = parseInt(searchParams.jpage || '1')
  const limit = 30

  const blogStart = (blogPage - 1) * limit
  const currentBlogs = blogs.slice(blogStart, blogStart + limit)

  const journalStart = (journalPage - 1) * limit
  const currentJournals = journals.slice(journalStart, journalStart + limit)

  return (
    <>
      <div className="dynamic-padding max-w-7xl mx-auto min-h-screen">
        {/* Hero Section */}
        <div className="text-center mb-16 pt-12">
          <span className="inline-block px-4 py-1.5 bg-[#00D4B4]/10 text-[#00D4B4] text-[10px] font-bold font-mono uppercase tracking-[0.2em] rounded-full mb-4 border border-[#00D4B4]/20">
            📝 Knowledge Center
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-[#1E2D47] dark:text-white mb-6 tracking-tighter">
            Developer Blog & <span className="text-[#00D4B4]">Engineering Journals</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-[#8A9BBE] max-w-2xl mx-auto leading-relaxed">
            Expert web development insights to level up your skills. From performance research to CSS architecture.
          </p>
        </div>

        {/* Blogs Section */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-12 border-b border-[#1E2D47] pb-6">
            <div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Technical Blogs</h2>
              <p className="text-sm text-[#8A9BBE] mt-1">Tutorials, news, and deep dives for daily development.</p>
            </div>
            <div className="text-[10px] font-mono font-bold text-[#4A6080] uppercase tracking-widest bg-[#0D1526] px-3 py-1 rounded-full border border-[#1E2D47]">
              {blogs.length} Articles
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {currentBlogs.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                <article className="bg-[#0D1526] rounded-[24px] border border-[#1E2D47] p-8 hover:border-[#00D4B4]/30 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D4B4]/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-widest font-mono ${categoryColors[post.category] || 'bg-[#0B1120] text-[#8A9BBE] border-[#1E2D47]'}`}>
                      {post.category}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#4A6080] uppercase tracking-widest">
                      {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#00D4B4] transition-colors leading-tight relative z-10">{post.title}</h3>
                  <p className="text-sm text-[#8A9BBE] leading-relaxed mb-8 flex-grow line-clamp-3 relative z-10">{post.description}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-[#1E2D47]/30 relative z-10">
                    <span className="text-[10px] font-bold text-[#00D4B4] flex items-center gap-2 uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">
                      Read Entry <Zap className="w-3 h-3 fill-current" />
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#4A6080] font-mono">{post.readTime}</span>
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
          <div className="flex items-center justify-between mb-12 border-b border-[#1E2D47] pb-6">
            <div>
              <h2 className="text-3xl font-bold text-[#00D4B4] tracking-tight">Engineering Journals</h2>
              <p className="text-sm text-[#8A9BBE] mt-1">Peer-reviewed technical research and performance studies.</p>
            </div>
            <div className="text-[10px] font-mono font-bold text-[#00D4B4]/60 uppercase tracking-widest bg-[#0D1526] px-3 py-1 rounded-full border border-[#00D4B4]/20">
              {journals.length} Papers
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {currentJournals.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block h-full">
                <article className="bg-[#0B1120] rounded-[24px] border border-[#1E2D47] p-8 hover:border-[#00D4B4]/30 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00D4B4]/10 to-[#0094FF]/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#00D4B4]/10 text-[#00D4B4] border border-[#00D4B4]/20 uppercase tracking-widest font-mono">
                      {post.category}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-[#4A6080] uppercase tracking-widest">
                      STUDY NO. {post.slug.slice(0, 4).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#00D4B4] transition-colors leading-tight relative z-10">{post.title}</h3>
                  <p className="text-sm text-[#8A9BBE] leading-relaxed mb-8 flex-grow line-clamp-3 relative z-10 font-medium italic">"{post.description}"</p>
                  <div className="flex items-center justify-between pt-6 border-t border-[#1E2D47]/30 relative z-10">
                    <span className="text-[10px] font-bold text-[#00D4B4] uppercase tracking-widest">View Full Paper</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#4A6080] font-mono">{post.readTime}</span>
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
            'name': 'WebToolkit Pro Developer Blog & Engineering Journal',
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
    </>
  )
}
