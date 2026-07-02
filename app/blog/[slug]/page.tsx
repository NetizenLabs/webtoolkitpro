import React from 'react'
import { notFound } from 'next/navigation'
import { getAllSlugs, getPostBySlug, getAllPosts, getRelatedToolsForPost } from '@/lib/blog'
import { getToolCTAForPost } from '@/lib/blog-tool-cta-map'
import type { Metadata } from 'next'
import DefaultBlogLayout from '@/components/blog/layouts/DefaultBlogLayout'
import JournalLayout from '@/components/blog/layouts/JournalLayout'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export const dynamic = 'force-static'

// Dynamic SEO metadata for each post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  if (!post) return { title: 'Post Not Found' }

  const ogImage = post.image 
    ? (post.image.startsWith('http') ? post.image : `https://wtkpro.site${post.image}`)
    : 'https://wtkpro.site/og-image.jpg?v=1'

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

  // Resolve the primary tool CTA for this article
  const toolCTA = getToolCTAForPost(post.slug, post.category)

  // Get related posts (mix of Blog and Journal)
  const isJournal = (cat: string) => ['Research', 'Engineering', 'Security'].includes(cat)
  const allPosts = getAllPosts()
  
  const sameCategory = allPosts.filter(p => p.slug !== post.slug && p.category === post.category)
  const differentType = allPosts.filter(p => p.slug !== post.slug && isJournal(p.category) !== isJournal(post.category))
  
  const relatedPosts = [
    ...sameCategory.slice(0, 2),
    ...differentType.slice(0, 1)
  ].slice(0, 3)

  const relatedTools = getRelatedToolsForPost(post.tags)

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

  const layoutProps = {
    post,
    allPosts,
    relatedPosts,
    relatedTools,
    toolCTA,
    formattedDate,
    formattedLastUpdated,
    categoryColors
  }

  return (
    <>
      {post.type === 'journal' ? (
        <JournalLayout {...layoutProps} />
      ) : (
        <DefaultBlogLayout {...layoutProps} />
      )}

      {/* JSON-LD Structured Data - BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            'headline': post.title,
            'description': post.description,
            'image': post.image ? (post.image.startsWith('http') ? post.image : `https://wtkpro.site${post.image}`) : 'https://wtkpro.site/og-image.jpg',
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
              'sameAs': [
                'https://github.com/WebToolkit-Pro',
                'https://twitter.com/WebToolKitPro',
                'https://producthunt.com/products/webtoolkit-pro'
              ]
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
              'image': post.image ? (post.image.startsWith('http') ? post.image : `https://wtkpro.site${post.image}`) : 'https://wtkpro.site/og-image.jpg',
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

      {/* JSON-LD FAQPage Schema */}
      {post.faqs && post.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              'mainEntity': post.faqs.map(faq => ({
                '@type': 'Question',
                'name': faq.q,
                'acceptedAnswer': {
                  '@type': 'Answer',
                  'text': faq.a
                }
              }))
            }),
          }}
        />
      )}
    </>
  )
}
