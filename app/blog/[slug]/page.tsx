import React from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllSlugs, getPostBySlug, getAllPosts } from '@/lib/blog'
import Image from 'next/image'
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

  // Get related posts (same category, excluding current)
  const allPosts = getAllPosts()
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 transition-colors duration-300 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-400 dark:text-slate-500" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" itemProp="item">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-300 dark:text-slate-700">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/blog/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors" itemProp="item">
                <span itemProp="name">Blog</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-300 dark:text-slate-700">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-gray-600 dark:text-slate-300 font-medium" itemProp="name">{post.title}</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>

        {/* Post Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-5">
            <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full border uppercase tracking-wider ${categoryColors[post.category] || 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-400 border-gray-200 dark:border-slate-700'}`}>
              {post.category}
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 dark:text-slate-500">{post.readTime}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white mb-5 leading-tight tracking-tight">
            {post.title}
          </h1>

          <p className="text-lg text-gray-500 dark:text-slate-400 leading-relaxed mb-8">
            {post.description}
          </p>

          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-slate-500 pb-6 border-b border-gray-100 dark:border-slate-800 mb-10">
            <time dateTime={post.date} itemProp="datePublished">
              {formattedDate}
            </time>
            <span>•</span>
            <span itemProp="author">{post.author}</span>
          </div>

          {/* Hero Image - Added to fix "missing images" issue */}
          {post.image && (
            <div className="relative aspect-[16/9] w-full mb-12 rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-slate-800 animate-in fade-in zoom-in duration-500">
              <Image 
                src={post.image} 
                alt={post.imageAlt || post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}
        </header>

        {/* Ad Slot - Top of Article */}
        <div className="mb-10 min-h-[90px] flex items-center justify-center bg-gray-50/50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800">
          <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Advertisement</span>
        </div>

        {/* Article Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-gray-600 dark:prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-5
            prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900 dark:prose-strong:text-white
            prose-code:bg-gray-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:text-pink-600 dark:prose-code:text-pink-400
            prose-pre:bg-gray-900 dark:prose-pre:bg-black prose-pre:text-gray-100 dark:prose-pre:text-slate-200 prose-pre:rounded-xl prose-pre:shadow-lg
            prose-ul:text-gray-600 dark:prose-ul:text-slate-300 prose-ol:text-gray-600 dark:prose-ol:text-slate-300
            prose-li:mb-2
            prose-table:border-collapse
            prose-th:bg-gray-50 dark:prose-th:bg-slate-800 prose-th:p-3 prose-th:text-left prose-th:font-bold prose-th:border prose-th:border-gray-200 dark:prose-th:border-slate-700
            prose-td:p-3 prose-td:border prose-td:border-gray-200 dark:prose-td:border-slate-700
            prose-blockquote:border-l-blue-500 dark:prose-blockquote:border-l-blue-400 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/10 prose-blockquote:rounded-r-lg prose-blockquote:py-1
            prose-img:rounded-xl prose-img:shadow-md"
          dangerouslySetInnerHTML={{ __html: post.htmlContent || '' }}
        />

        {/* Tags Section */}
        <div className="mt-12 pt-8 border-t border-gray-100 dark:border-slate-800">
          <h3 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4">Article Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold uppercase tracking-wider bg-gray-50 dark:bg-slate-900 text-gray-500 dark:text-slate-400 px-3 py-1.5 rounded-full border border-gray-100 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Legal Disclaimer Section */}
        <div className="mt-10 p-6 bg-amber-50/50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/30 rounded-2xl">
          <h4 className="flex items-center gap-2 text-sm font-bold text-amber-800 dark:text-amber-400 mb-2 uppercase tracking-wide">
            <ShieldCheck className="w-4 h-4" /> Technical & Educational Disclaimer
          </h4>
          <p className="text-xs text-amber-700/80 dark:text-amber-500/80 leading-relaxed font-medium">
            The technical studies, guides, and research provided on WebToolkit Pro are for educational and research purposes only. 
            While we strive for 100% accuracy, web technologies and search engine algorithms (like Google SGE or Perplexity) evolve rapidly. 
            Always verify technical implementations in a staging environment before deploying to production. WebToolkit Pro is not 
            responsible for any third-party search engine ranking fluctuations or security vulnerabilities resulting from 
            misinterpreted research data.
          </p>
        </div>

        {/* Ad Slot - Bottom of Article */}
        <div className="mt-12 min-h-[250px] flex items-center justify-center">
          {/* AdSense In-Article Bottom */}
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-gray-100 dark:border-slate-800" aria-label="Related articles">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Continue Reading</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}/`}
                  className="group block"
                >
                  <article className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-6 hover:shadow-xl dark:hover:shadow-blue-900/10 hover:-translate-y-1 transition-all duration-300 h-full">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${categoryColors[related.category] || 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-400'}`}>
                      {related.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-3 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {related.title}
                    </h3>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 dark:text-slate-500">{related.readTime}</span>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Back to Blog */}
        <div className="mt-12 text-center">
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:gap-3 transition-all"
          >
            ← Back to All Articles
          </Link>
        </div>

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
      </div>
    </article>
  )
}
