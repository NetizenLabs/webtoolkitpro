import React from 'react'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'

export const metadata = {
  title: 'Developer Blog - Web Development Tips & Tutorials | WebToolkit Pro',
  description: 'Expert web development tips, tutorials, and guides. Learn about developer tools, JSON formatting, password security, SEO optimization, CSS best practices, and more.',
  keywords: 'web development blog, developer tutorials, coding tips, programming guides, web development best practices',
  alternates: {
    canonical: 'https://wtkpro.site/blog/',
  },
  openGraph: {
    title: 'Developer Blog - WebToolkit Pro',
    description: 'Expert web development tips, tutorials, and guides for modern developers.',
    url: 'https://wtkpro.site/blog/',
    siteName: 'WebToolkit Pro',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Developer Blog - WebToolkit Pro',
    description: 'Expert web development tips, tutorials, and guides for modern developers.',
  },
  other: {
    'geo.region': 'US',
    'geo.placename': 'United States',
    'content-language': 'en-US',
  },
}

const categoryColors: { [k: string]: string } = {
  'Tools': 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  'Tutorials': 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800',
  'Security': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
  'SEO': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
  'CSS': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 border-orange-200 dark:border-orange-800',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-950 transition-colors duration-300 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold rounded-full mb-4 border border-blue-100 dark:border-blue-800">
            📝 Developer Blog
          </span>
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Tips, Tutorials &amp; Guides
          </h1>
          <p className="text-xl text-gray-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Expert web development insights to level up your skills. From security best practices to CSS mastery.
          </p>
        </div>

        {/* Ad Slot - Top */}
        <div className="max-w-3xl mx-auto mb-12 min-h-[90px] flex items-center justify-center">
          {/* AdSense Leaderboard */}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              id={`blog-card-${post.slug}`}
              className="group block"
            >
              <article className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 hover:shadow-xl dark:hover:shadow-blue-900/10 hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                {/* Category & Read Time */}
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-wider ${categoryColors[post.category] || 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-400 border-gray-200 dark:border-slate-700'}`}>
                    {post.category}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400 dark:text-slate-500">{post.readTime}</span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="text-gray-500 dark:text-slate-400 mb-5 leading-relaxed flex-grow text-sm">
                  {post.description}
                </p>

                {/* Footer */}
                <div className="flex justify-between items-center pt-6 border-t border-gray-50 dark:border-slate-800">
                  <span className="text-xs font-bold text-gray-400 dark:text-slate-500">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read Article →
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Ad Slot - Bottom */}
        <div className="max-w-3xl mx-auto mt-16 min-h-[250px] flex items-center justify-center">
          {/* AdSense Rectangle */}
        </div>

        {/* JSON-LD Breadcrumb List */}
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
                  'item': 'https://wtkpro.site'
                },
                {
                  '@type': 'ListItem',
                  'position': 2,
                  'name': 'Blog',
                  'item': 'https://wtkpro.site/blog/'
                }
              ]
            }),
          }}
        />

        {/* JSON-LD Structured Data for Blog listing */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Blog',
              'name': 'WebToolkit Pro Developer Blog',
              'description': 'Expert web development tips, tutorials, and guides.',
              'url': 'https://wtkpro.site/blog/',
              'publisher': {
                '@type': 'Organization',
                'name': 'WebToolkit Pro',
                'url': 'https://wtkpro.site',
              },
              'blogPost': posts.map((post) => ({
                '@type': 'BlogPosting',
                'headline': post.title,
                'description': post.description,
                'datePublished': post.date,
                'author': {
                  '@type': 'Organization',
                  'name': post.author,
                },
                'url': `https://wtkpro.site/blog/${post.slug}/`,
              })),
            }),
          }}
        />

      </div>
    </div>
  )
}
