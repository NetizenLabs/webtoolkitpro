import React from 'react'
import { ShieldCheck, Twitter, Mail } from 'lucide-react'
import Link from 'next/link'
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

  return {
    title: `${post.title} | WebToolkit Pro Blog`,
    description: post.description,
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
      'geo.region': 'US',
      'geo.placename': 'United States',
      'content-language': 'en-US',
      'article:published_time': post.date,
      'article:author': post.author,
      'article:section': post.category,
      'article:tag': post.tags.join(', '),
    },
  }
}

const categoryColors: { [k: string]: string } = {
  'Tools': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  'Tutorials': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  'Security': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
  'SEO': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
  'CSS': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800',
  'Research': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  if (!post) notFound()

  // Get related posts (prioritize same category)
  const allPosts = getAllPosts()
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      // Prioritize same category
      if (a.category === post.category && b.category !== post.category) return -1
      if (a.category !== post.category && b.category === post.category) return 1
      // Then by date (already sorted by date usually, but just in case)
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
    .slice(0, 3)

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <>
      <article className="dynamic-padding max-w-4xl mx-auto min-h-screen">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-12 pt-12">
          <ol className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-[#4A6080]" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" className="hover:text-[#00D4B4] transition-colors" itemProp="item">
                <span itemProp="name">Root</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-[#1E2D47]">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/blog/" className="hover:text-[#00D4B4] transition-colors" itemProp="item">
                <span itemProp="name">Journal</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-[#1E2D47]">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-[#8A9BBE]" itemProp="name">Entry</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>

        {/* Post Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full border uppercase tracking-widest font-mono ${categoryColors[post.category] || 'bg-[#0D1526] text-[#8A9BBE] border-[#1E2D47]'}`}>
              {post.category}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#4A6080] font-mono">{post.readTime}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-[#1E2D47] dark:text-white mb-6 leading-tight tracking-tighter">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 dark:text-[#8A9BBE] leading-relaxed mb-10 max-w-3xl">
            {post.description}
          </p>

          <div className="flex items-center gap-4 text-[10px] font-mono font-bold uppercase tracking-widest text-[#4A6080] pb-8 border-b border-[#1E2D47] mb-12">
            <time dateTime={post.date} itemProp="datePublished">
              {formattedDate}
            </time>
            <span className="text-[#1E2D47]">•</span>
            <span itemProp="author" className="text-[#8A9BBE]">{post.author}</span>
          </div>

          {/* TL;DR Section */}
          {post.tldr && (
            <div className="mb-16 p-[1px] rounded-[12px] bg-gradient-to-r from-[#00D4B4] via-[#0094FF] to-indigo-600 shadow-2xl shadow-blue-500/10">
              <div className="bg-[#0B1120] rounded-[11px] p-8 md:p-10 flex items-start gap-8">
                <div className="w-14 h-14 shrink-0 bg-[#00D4B4]/10 rounded-[10px] flex items-center justify-center border border-[#00D4B4]/20">
                  <ShieldCheck className="w-7 h-7 text-[#00D4B4]" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#00D4B4] uppercase tracking-[0.2em] mb-3 font-mono">Executive Summary</div>
                  <p className="text-xl font-bold text-white leading-tight italic opacity-90">
                    "{post.tldr}"
                  </p>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* Ad Slot - Top */}
        <AdSlot minHeight="90px" className="mb-12" />

        {/* Article Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-[#1E2D47] dark:prose-headings:text-white prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:pt-8 prose-h2:border-t prose-h2:border-[#1E2D47]/50
            prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4
            prose-p:text-gray-600 dark:prose-p:text-[#8A9BBE] prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-[#00D4B4] prose-a:font-bold prose-a:no-underline hover:prose-a:underline
            prose-strong:text-[#1E2D47] dark:prose-strong:text-white
            prose-code:bg-[#0D1526] prose-code:px-2 prose-code:py-0.5 prose-code:rounded-[4px] prose-code:text-sm prose-code:text-[#00D4B4] prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-[#0B1120] prose-pre:text-white prose-pre:rounded-[12px] prose-pre:border prose-pre:border-[#1E2D47] prose-pre:p-6
            prose-ul:text-gray-600 dark:prose-ul:text-[#8A9BBE] prose-ol:text-gray-600 dark:prose-ol:text-[#8A9BBE]
            prose-li:mb-2
            prose-blockquote:border-l-[#00D4B4] prose-blockquote:bg-[#00D4B4]/5 prose-blockquote:rounded-r-[12px] prose-blockquote:py-2 prose-blockquote:italic
            prose-img:rounded-[12px] prose-img:border prose-img:border-[#1E2D47]"
          dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}
        />

        {/* Footer Meta */}
        <div className="mt-20 pt-12 border-t border-[#1E2D47]">
          <div className="flex flex-wrap gap-3 mb-12">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold font-mono uppercase tracking-wider bg-[#0D1526] text-[#8A9BBE] px-4 py-2 rounded-full border border-[#1E2D47] hover:border-[#00D4B4]/30 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="p-8 bg-[#0D1526] rounded-[12px] border border-[#1E2D47] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D4B4]/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-[#1E2D47] dark:text-white mb-2">WTK Engineering Journal</h3>
                <p className="text-sm text-gray-600 dark:text-[#8A9BBE] max-w-md font-medium leading-relaxed">
                  Peer-reviewed technical research from our core engineering lab. For research inquiries or feedback.
                </p>
                <div className="flex items-center justify-center md:justify-start gap-6 mt-6">
                  <a href="mailto:contact@wtkpro.site" className="text-[10px] font-mono font-bold text-[#00D4B4] hover:underline uppercase tracking-widest flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" /> contact@wtkpro.site
                  </a>
                </div>
              </div>
              <a 
                href="https://x.com/WebToolkitPro" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 bg-white text-[#0B1120] rounded-[12px] font-bold text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl"
              >
                <Twitter className="w-4 h-4" /> Follow Feed
              </a>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="mt-24 pt-16 border-t border-[#1E2D47]" aria-label="Related articles">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-bold text-[#1E2D47] dark:text-white tracking-tight">Further Reading</h2>
              <Link href="/blog/" className="text-[10px] font-mono font-bold text-[#00D4B4] uppercase tracking-widest hover:underline">All Journal Entries →</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}/`}
                  className="group block"
                >
                  <article className="bg-[#0D1526] rounded-[12px] border border-[#1E2D47] p-6 hover:border-[#00D4B4]/30 transition-all h-full">
                    <span className={`text-[9px] font-bold font-mono px-2 py-0.5 rounded-full uppercase tracking-wider ${categoryColors[related.category] || 'bg-[#0B1120] text-[#8A9BBE]'}`}>
                      {related.category}
                    </span>
                    <h3 className="text-base font-bold text-[#1E2D47] dark:text-white mt-4 mb-3 group-hover:text-[#00D4B4] transition-colors leading-snug">
                      {related.title}
                    </h3>
                    <span className="text-[9px] font-mono uppercase font-bold tracking-widest text-[#4A6080]">{related.readTime}</span>
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
            'dateModified': post.date.includes('T') ? post.date : `${post.date}T09:00:00Z`,
            'author': {
              '@type': 'Organization',
              'name': post.author,
              'url': 'https://wtkpro.site',
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'WebToolkit Pro',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://wtkpro.site/favicon.png'
              },
              'url': 'https://wtkpro.site',
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
                'item': 'https://wtkpro.site',
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
    </>
  )
}
