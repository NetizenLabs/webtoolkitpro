import React from 'react'
import Link from 'next/link'
import { Zap } from 'lucide-react'
import { getAllPosts } from '@/lib/blog'
import AdSlot from '@/components/ads/AdSlot'

export const metadata = {
  title: 'Engineering Blog: Technical Guides & Tutorials | WebToolkit Pro',
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
  'Research': 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      <div className="dynamic-padding max-w-5xl mx-auto min-h-screen">
        {/* Hero Section */}
        <div className="text-center mb-16 pt-12">
          <span className="inline-block px-4 py-1.5 bg-[#00D4B4]/10 text-[#00D4B4] text-[10px] font-bold font-mono uppercase tracking-[0.2em] rounded-full mb-4 border border-[#00D4B4]/20">
            📝 Engineering Blog
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tighter">
            Technical Guides & <span className="text-[#00D4B4]">Studies</span>
          </h1>
          <p className="text-lg text-[#8A9BBE] max-w-2xl mx-auto leading-relaxed">
            Expert web development insights to level up your skills. From security research to CSS architecture.
          </p>
        </div>

        {/* Ad Slot - Top */}
        <AdSlot minHeight="90px" className="mb-12" />

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              id={`blog-card-${post.slug}`}
              className="group block h-full"
            >
              <article className="bg-[#0D1526] rounded-[12px] border border-[#1E2D47] p-8 hover:border-[#00D4B4]/30 transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D4B4]/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
                
                {/* Category & Read Time */}
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full border uppercase tracking-widest font-mono ${categoryColors[post.category] || 'bg-[#0B1120] text-[#8A9BBE] border-[#1E2D47]'}`}>
                    {post.category}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#4A6080] font-mono">{post.readTime}</span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-[#00D4B4] transition-colors leading-tight relative z-10">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-[#8A9BBE] leading-relaxed mb-8 flex-grow relative z-10">
                  {post.description}
                </p>

                {/* Footer */}
                <div className="flex justify-between items-center pt-6 border-t border-[#1E2D47]/50 relative z-10">
                  <span className="text-[10px] font-mono font-bold text-[#4A6080] uppercase tracking-widest">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="text-xs font-bold text-[#00D4B4] flex items-center gap-2 group-hover:gap-3 transition-all uppercase tracking-widest">
                    Read Article <Zap className="w-3 h-3 fill-current" />
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
        
        {/* Engineering Hubs Section */}
        <section className="mt-24 pt-16 border-t border-[#1E2D47]">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Engineering Whitepapers</h2>
              <p className="text-[#8A9BBE] font-medium">Original technical research for modern web architects.</p>
            </div>
            <Link href="/about/" className="text-[#00D4B4] font-bold text-[10px] uppercase tracking-widest hover:underline font-mono">Our Research Lab →</Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { slug: 'seo-meta-tags-complete-guide', title: 'Meta Tags' },
              { slug: 'geo-optimization-guide', title: 'GEO & AI' },
              { slug: 'llm-latency-ux-impact', title: 'LLM Latency' },
              { slug: 'modern-css-architecture', title: 'CSS Arch' },
              { slug: 'ai-cybersecurity-trends', title: 'Cybersecurity' },
              { slug: 'privacy-first-web-development', title: 'Privacy' }
            ].map((study) => (
              <Link 
                key={study.slug}
                href={`/blog/${study.slug}/`}
                className="p-6 bg-[#0D1526] border border-[#1E2D47] rounded-[12px] hover:border-[#00D4B4]/30 transition-all group text-center"
              >
                <div className="text-[9px] font-bold text-[#00D4B4] uppercase tracking-[0.2em] mb-3 opacity-60 font-mono">Research</div>
                <h3 className="text-xs font-bold text-white group-hover:text-[#00D4B4] transition-colors leading-tight">{study.title}</h3>
              </Link>
            ))}
          </div>
        </section>

        {/* Ad Slot - Bottom */}
        <AdSlot minHeight="250px" className="mt-16" />
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
    </>
  )
}

