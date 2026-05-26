import React from 'react'
import { ShieldCheck, Twitter, Mail, Terminal, Rocket, ChevronRight, Zap, Award, Flame, UserCheck, BookOpen, Clock } from 'lucide-react'
import Link from '@/components/ui/NativeLink';
import { notFound } from 'next/navigation'
import { getAllSlugs, getPostBySlug, getAllPosts } from '@/lib/blog'
import Image from 'next/image'
import AdSlot from '@/components/ads/AdSlot'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

// Generate static params for all blog posts
export function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Dynamic SEO metadata for each post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found' }

  const ogImage = post.image 
    ? (post.image.startsWith('http') ? post.image : `https://wtkpro.site${post.image}`)
    : 'https://wtkpro.site/og-image.png?v=1'

  const baseTitle = post.seoTitle || post.title
  const brandSuffix = ' | WTK Pro'
  let title = baseTitle
  
  if ((title.length + brandSuffix.length) > 58) {
    title = title.slice(0, 58 - brandSuffix.length - 3).trim() + '...'
  }
  title += brandSuffix

  let description = post.description
  if (description.length > 155) {
    description = description.slice(0, 152).trim() + '...'
  }

  return {
    title,
    description,
    keywords: post.keywords.join(', '),
    authors: [{ name: post.author }],
    alternates: {
      canonical: `https://wtkpro.site/blog/${post.slug}/`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://wtkpro.site/blog/${post.slug}/`,
      siteName: 'WebToolkit Pro',
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      locale: 'en_US',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
    other: {
      'content-language': 'en-US',
      'article:published_time': post.date,
      'article:author': post.author,
      'article:section': post.category,
      'article:tag': post.tags.join(', '),
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
  'Developer Tools': 'bg-[#0969DA]/10 dark:bg-[#00D4B4]/10 text-[#0969DA] dark:text-[#00D4B4] border-[#0969DA]/20 dark:border-[#00D4B4]/20',
  'SEO Tools': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
  'Design Tools': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800',
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  // Get related posts (mix of Blog and Journal)
  const isJournal = (cat: string) => ['Research', 'Engineering', 'Security'].includes(cat)
  const allPosts = getAllPosts()
  
  const sameCategory = allPosts.filter(p => p.slug !== post.slug && p.category === post.category)
  const differentType = allPosts.filter(p => p.slug !== post.slug && isJournal(p.category) !== isJournal(post.category))
  
  const relatedPosts = [
    ...sameCategory.slice(0, 2),
    ...differentType.slice(0, 1)
  ].slice(0, 3)

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const formattedLastUpdated = new Date(post.lastUpdated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <article className="dynamic-padding max-w-5xl mx-auto min-h-screen">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-12 pt-12">
          <ol className="flex items-center flex-wrap gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground/60">
            <li>
              <Link href="/" className="hover:text-[#00D4B4] transition-colors">
                Home
              </Link>
            </li>
            <li className="text-border">/</li>
            <li>
              <Link href="/blog" className="hover:text-[#00D4B4] transition-colors">
                Blog
              </Link>
            </li>
            <li className="text-border">/</li>
            <li>
              <span className="text-[#00D4B4]">{post.title}</span>
            </li>
          </ol>
        </nav>

        {/* Post Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full border uppercase tracking-widest font-mono ${categoryColors[post.category] || 'bg-elevated text-muted-foreground border-border'}`}>
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight tracking-tighter">
            {post.title}
          </h1>
          <div className="flex items-center gap-2 mb-6">
            <span className="flex items-center gap-2 text-sm font-bold text-[#00D4B4] bg-[#00D4B4]/10 border border-[#00D4B4]/20 px-4 py-2 rounded-full uppercase tracking-widest font-mono">
              <Clock className="w-4 h-4" /> {post.readTime}
            </span>
          </div>

          <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-3xl">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground/60 pb-8 border-b border-border mb-12">
            <time dateTime={post.date} itemProp="datePublished">
              Published: {formattedDate}
            </time>
            <span className="text-border">•</span>
            <time dateTime={post.lastUpdated} itemProp="dateModified">
              Last Updated: {formattedLastUpdated}
            </time>
            <span className="text-border">•</span>
            <span itemProp="author" className="text-muted-foreground">{post.author}</span>
          </div>

          {/* TL;DR Section */}
          {post.tldr && (
            <div className="mb-16 p-[1px] rounded-[12px] bg-gradient-to-r from-[#00D4B4] via-[#0094FF] to-indigo-600 shadow-2xl shadow-blue-500/10">
              <div className="bg-background rounded-[11px] p-8 md:p-10 flex items-start gap-8">
                <div className="w-14 h-14 shrink-0 bg-[#00D4B4]/10 rounded-[10px] flex items-center justify-center border border-[#00D4B4]/20">
                  <ShieldCheck className="w-7 h-7 text-[#00D4B4]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#00D4B4] uppercase tracking-[0.2em] mb-3 font-mono">Executive Summary</div>
                  <p className="text-xl font-bold text-foreground leading-tight italic opacity-90">
                  &quot;{post.tldr}&quot;
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Latest 30 Posts Scroller */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-4 px-2">
              <h2 className="text-[10px] font-bold text-[#4A6080] uppercase tracking-[0.2em] font-mono">Up-to-date Feed</h2>
              <Link href="/blog" className="text-[9px] font-bold text-[#00D4B4] hover:underline uppercase tracking-widest">View All</Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x">
              {allPosts.slice(0, 30).map((p) => (
                <Link 
                  key={p.slug} 
                  href={`/blog/${p.slug}`}
                  className={`flex-shrink-0 w-[280px] p-5 rounded-[16px] border snap-start transition-all ${
                    p.slug === post.slug 
                      ? 'bg-[#00D4B4]/10 border-[#00D4B4]/40' 
                      : 'bg-elevated border-border hover:border-[#00D4B4]/30'
                  }`}
                >
                  <div className="text-[8px] font-bold text-muted-foreground/60 uppercase tracking-widest mb-2 font-mono">{p.category}</div>
                  <h3 className="text-sm font-bold text-foreground leading-tight line-clamp-2 mb-3">{p.title}</h3>
                  <div className="flex items-center gap-2 text-[8px] font-bold text-[#00D4B4] uppercase tracking-widest">
                    Read Now <ChevronRight className="w-2 h-2" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </header>

        {/* Ad Slot - Top */}
        <AdSlot minHeight="90px" className="mb-12" />

        {/* Article Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-foreground dark:prose-headings:text-white prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pt-8 prose-h2:border-t prose-h2:border-border/50
            prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
            prose-p:text-muted-foreground/80 dark:prose-p:text-[#8A9BBE] prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-[#00D4B4] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
            prose-strong:text-foreground dark:prose-strong:text-white
            prose-code:bg-elevated prose-code:px-2 prose-code:py-0.5 prose-code:rounded-[4px] prose-code:text-sm prose-code:text-[#00D4B4] prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-background prose-pre:text-foreground prose-pre:rounded-[12px] prose-pre:border prose-pre:border-border prose-pre:p-6
            prose-ul:text-muted-foreground/80 dark:prose-ul:text-[#8A9BBE] prose-ol:text-muted-foreground/80 dark:prose-ol:text-[#8A9BBE]
            prose-li:mb-2
            prose-blockquote:border-l-[#00D4B4] prose-blockquote:bg-[#00D4B4]/5 prose-blockquote:rounded-r-[12px] prose-blockquote:py-2 prose-blockquote:italic
            prose-img:rounded-[12px] prose-img:border prose-img:border-border"
          dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}
        />

        {/* Expert Tips Section */}
        {post.expertTips && post.expertTips.length > 0 && (
          <div className="mt-16 p-8 bg-gradient-to-br from-[#00D4B4]/10 to-[#0094FF]/10 border border-[#00D4B4]/20 rounded-[24px] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck className="w-20 h-20 text-[#00D4B4]" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 bg-[#00D4B4] rounded-full animate-pulse" />
                <span className="text-[10px] font-bold text-[#00D4B4] uppercase tracking-widest">Expert Recommendations</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Pro Insights</h3>
              <ul className="space-y-4">
                {post.expertTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-sm text-muted-foreground font-medium leading-relaxed">
                    <span className="mt-1 text-[#00D4B4] font-mono text-[10px] font-bold">0{idx + 1}.</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl font-bold text-foreground mb-10 tracking-tight">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {post.faqs.map((faq, idx) => (
                <div key={idx} className="p-8 bg-elevated border border-border rounded-[16px] group hover:border-[#00D4B4]/30 transition-all">
                  <h3 className="text-lg font-bold text-foreground mb-3 flex items-start gap-3">
                    <span className="text-[#00D4B4]">Q.</span> {faq.q}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-7 border-l border-border group-hover:border-[#00D4B4]/30 transition-colors">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Footer Meta */}
        <div className="mt-20 pt-12 border-t border-border">
          <div className="flex flex-wrap gap-3 mb-12">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold font-mono uppercase tracking-wider bg-elevated text-muted-foreground px-4 py-2 rounded-full border border-border hover:border-[#00D4B4]/30 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="p-8 bg-elevated rounded-[24px] border border-border relative overflow-hidden group shadow-2xl">
            {/* Ambient gradients */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00D4B4]/5 blur-3xl rounded-full translate-x-1/3 -translate-y-1/3 group-hover:bg-[#00D4B4]/10 transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0094FF]/5 blur-3xl rounded-full -translate-x-1/3 translate-y-1/3" />
            
            <div className="relative z-10">
              {/* Header block with Author bio */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#00D4B4] to-[#0094FF] p-[2px] shadow-lg">
                    <div className="w-full h-full rounded-full bg-background flex items-center justify-center font-bold text-foreground text-lg">
                      AS
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-foreground tracking-tight">Abu Sufyan</h3>
                    <p className="text-xs text-muted-foreground font-mono font-bold uppercase tracking-wider">
                      Lead Systems Architect
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a href="mailto:contact@wtkpro.site" className="text-[10px] font-mono font-bold text-[#00D4B4] hover:underline uppercase tracking-widest flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" /> contact@wtkpro.site
                  </a>
                  <a href="https://dev.to/webtoolkitpro" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono font-bold text-[#8A9BBE] hover:text-[#00D4B4] uppercase tracking-widest flex items-center gap-2 transition-colors">
                    <Terminal className="w-3.5 h-3.5" /> Dev.to/WebToolkitPro
                  </a>
                </div>
              </div>


            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="mt-24 pt-16 border-t border-border" aria-label="Related articles">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-bold text-foreground tracking-tight">Blog & Journal Archive</h2>
              <Link href="/blog" className="text-[10px] font-mono font-bold text-[#00D4B4] uppercase tracking-widest hover:underline">All Entries →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group block"
                >
                  <article className="bg-elevated rounded-[12px] border border-border p-6 hover:border-[#00D4B4]/30 transition-all h-full">
                    <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded-full uppercase tracking-wider ${categoryColors[related.category] || 'bg-background text-muted-foreground border-border'}`}>
                      {related.category}
                    </span>
                    <h3 className="text-base font-bold text-foreground mt-4 mb-3 group-hover:text-[#00D4B4] transition-colors leading-snug">
                      {related.title}
                    </h3>
                    <span className="text-[9px] font-mono uppercase font-bold tracking-widest text-muted-foreground/50">{related.readTime}</span>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Ad Slot - Bottom */}
        <AdSlot minHeight="250px" className="mt-16" />
      </article>

      {/* JSON-LD Structured Data - BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            'headline': post.title,
            'description': post.description,
            'image': post.image ? (post.image.startsWith('http') ? post.image : `https://wtkpro.site${post.image}`) : 'https://wtkpro.site/og-image.png',
            'datePublished': post.date.includes('T') ? post.date : `${post.date}T09:00:00Z`,
            'dateModified': post.lastUpdated.includes('T') ? post.lastUpdated : `${post.lastUpdated}T09:00:00Z`,
            'author': {
              '@type': 'Person',
              'name': post.author === 'WebToolkit Pro Engineering' ? 'Abu Sufyan' : post.author,
              'url': 'https://abusufyan.xyz',
              'sameAs': [
                'https://abusufyan.xyz',
                'https://github.com/abusufyan-netizen'
              ]
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'WebToolkit Pro',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://wtkpro.site/logo-high-res.png'
              },
              'url': 'https://wtkpro.site/',
            },
            'mainEntityOfPage': {
              '@type': 'WebPage',
              '@id': `https://wtkpro.site/blog/${post.slug}/`,
            },
            'keywords': post.keywords.join(', '),
            'articleSection': post.category,
            'inLanguage': 'en-US',
            'url': `https://wtkpro.site/blog/${post.slug}/`,
          }),
        }}
      />

      {/* JSON-LD FAQPage */}
      {post.faqs && post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              'mainEntity': post.faqs.map((faq) => ({
                '@type': 'Question',
                'name': faq.q,
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': faq.a,
                },
              })),
            }),
          }}
        />
      )}

      {/* JSON-LD Breadcrumb */}
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
              {
                '@type': 'ListItem',
                'position': 3,
                'name': post.title,
                'item': `https://wtkpro.site/blog/${post.slug}/`,
              },
            ],
          }),
        }}
      />

      {/* JSON-LD HowTo Schema */}
      {post.steps && post.steps.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              'name': post.title,
              'description': post.description,
              'image': post.image ? (post.image.startsWith('http') ? post.image : `https://wtkpro.site${post.image}`) : 'https://wtkpro.site/og-image.png',
              'step': post.steps.map((step, idx) => ({
                '@type': 'HowToStep',
                'position': idx + 1,
                'name': step.name,
                'text': step.text,
                'url': `https://wtkpro.site/blog/${post.slug}/#step-${idx + 1}`
              }))
            }),
          }}
        />
      )}
    </>
  )
}
