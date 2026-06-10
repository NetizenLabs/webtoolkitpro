import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from '@/components/ui/NativeLink'
import { GUIDES_DATA } from '@/lib/guides-data'
import { getToolBySlug } from '@/lib/tools'
import { getPostBySlug } from '@/lib/blog'
import RelatedToolsInline from '@/components/blog/RelatedToolsInline'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { BookOpen, CheckCircle2, ChevronRight, Zap } from 'lucide-react'
import AdSlot from '@/components/ads/AdSlot'

interface GuidePageProps {
  params: {
    topic: string
  }
}

export async function generateStaticParams() {
  return GUIDES_DATA.map((guide) => ({
    topic: guide.slug,
  }))
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const guide = GUIDES_DATA.find((g) => g.slug === params.topic)
  if (!guide) return {}

  const url = `https://wtkpro.site/guides/${guide.slug}/`

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      url: url,
      type: 'article',
    }
  }
}

export default async function GuidePage({ params }: GuidePageProps) {
  const guide = GUIDES_DATA.find((g) => g.slug === params.topic)
  if (!guide) notFound()

  // Resolve tools
  const tools = guide.toolSlugs
    .map(tSlug => getToolBySlug(tSlug))
    .filter((t): t is NonNullable<typeof t> => t !== undefined)

  // Resolve articles
  const articles = await Promise.all(
    guide.articleSlugs.map(async (slug) => {
      const post = await getPostBySlug(slug)
      return post
    })
  )
  const validArticles = articles.filter((a): a is NonNullable<typeof a> => a !== undefined)

  // Generate FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: guide.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pt-12 pb-24">
      <BreadcrumbSchema name={guide.title} slug={`guides/${guide.slug}`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link href="/guides/" className="inline-flex items-center gap-2 text-sm font-bold font-mono text-gray-500 hover:text-[#00D4B4] uppercase tracking-widest mb-12 transition-colors">
          <BookOpen className="w-4 h-4" /> All Hubs
        </Link>

        {/* Hero Section */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-blue-200 dark:border-blue-800/50">
            Last Updated: {new Date(guide.lastUpdated).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight mb-6 leading-tight">
            {guide.title}
          </h1>
          <p className="text-xl text-gray-500 dark:text-[#8A9BBE] leading-relaxed max-w-3xl">
            {guide.description}
          </p>
        </div>

        {/* What You'll Learn */}
        <div className="bg-gray-50 dark:bg-slate-900/50 rounded-[2rem] p-8 md:p-12 border border-gray-100 dark:border-slate-800 mb-20">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-8">What you&apos;ll learn in this guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guide.whatYouWillLearn.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#00D4B4] shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-slate-300 font-medium leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ad Slot - Top */}
        <AdSlot minHeight="90px" className="mb-20" />

        {/* Article Cluster */}
        <div className="mb-24">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-10 flex items-center gap-4">
            <span className="w-10 h-10 rounded-xl bg-[#00D4B4]/10 flex items-center justify-center text-[#00D4B4]">1</span>
            Core Concepts & Tutorials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {validArticles.map((article, idx) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}/`}
                className="group flex flex-col bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 hover:shadow-xl hover:border-[#00D4B4]/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold font-mono text-[#00D4B4] uppercase tracking-widest bg-[#00D4B4]/10 px-3 py-1 rounded-full border border-[#00D4B4]/20">
                    Part {idx + 1}
                  </span>
                  <span className="text-xs font-bold font-mono text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                    {article.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#00D4B4] transition-colors leading-tight">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-[#8A9BBE] leading-relaxed mb-6 flex-grow">
                  {article.description}
                </p>
                <div className="mt-auto flex items-center text-sm font-bold text-gray-900 dark:text-white group-hover:text-[#00D4B4] uppercase tracking-widest transition-colors gap-2">
                  Read Article <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-10 flex items-center gap-4">
            <span className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center">2</span>
            Practical Tools
          </h2>
          <p className="text-gray-500 dark:text-[#8A9BBE] leading-relaxed mb-8 max-w-2xl">
            Apply what you&apos;ve learned. These client-side tools are relevant to this topic cluster and process all data securely in your browser.
          </p>
          <RelatedToolsInline tools={tools} />
        </div>

        {/* Ad Slot - Middle */}
        <AdSlot minHeight="90px" className="mb-20" />

        {/* Quick Reference Table */}
        <div className="mb-24">
          <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight mb-10 flex items-center gap-4">
            <span className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400 flex items-center justify-center">3</span>
            Quick Reference
          </h2>
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
            <div className="bg-gray-50 dark:bg-slate-800/50 p-6 border-b border-gray-100 dark:border-slate-800">
              <h3 className="font-bold text-gray-900 dark:text-white">{guide.quickReference.title}</h3>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-slate-800">
              {guide.quickReference.rows.map((row, idx) => (
                <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 p-6 group hover:bg-gray-50/50 dark:hover:bg-slate-800/20 transition-colors">
                  <div className="font-mono font-bold text-sm text-[#00D4B4] mb-2 sm:mb-0 flex items-center">
                    {row.key}
                  </div>
                  <div className="sm:col-span-2 text-sm text-gray-600 dark:text-[#8A9BBE] flex items-center">
                    {row.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {guide.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 flex items-start gap-4">
                  <span className="text-[#00D4B4] font-black">Q.</span>
                  {faq.q}
                </h3>
                <div className="text-gray-600 dark:text-[#8A9BBE] text-sm leading-relaxed flex items-start gap-4">
                  <span className="text-gray-300 dark:text-slate-600 font-black">A.</span>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
