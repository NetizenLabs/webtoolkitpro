import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from '@/components/ui/NativeLink'
import { COMPARE_DATA } from '@/lib/compare-data'
import { getToolBySlug } from '@/lib/tools'
import RelatedToolsInline from '@/components/blog/RelatedToolsInline'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import { CheckCircle2, XCircle, ChevronRight, Scale, Lightbulb, BookOpen } from 'lucide-react'
import AdSlot from '@/components/ads/AdSlot'

interface ComparePageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  return COMPARE_DATA.map((item) => ({
    slug: item.slug,
  }))
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const item = COMPARE_DATA.find((c) => c.slug === params.slug)
  if (!item) return {}

  const url = `https://wtkpro.site/compare/${item.slug}/`

  return {
    title: item.metaTitle,
    description: item.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: item.metaTitle,
      description: item.metaDescription,
      url: url,
      type: 'article',
    }
  }
}

export default function ComparePage({ params }: ComparePageProps) {
  const item = COMPARE_DATA.find((c) => c.slug === params.slug)
  if (!item) notFound()

  // Resolve tools for the CTA
  const tools = item.tools
    .map(tSlug => getToolBySlug(tSlug))
    .filter((t): t is NonNullable<typeof t> => t !== undefined)

  // Generate FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: item.faqs.map(faq => ({
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
      <BreadcrumbSchema name={item.title} slug={`compare/${item.slug}`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <Link href="/compare/" className="inline-flex items-center gap-2 text-sm font-bold font-mono text-gray-500 hover:text-purple-600 uppercase tracking-widest mb-12 transition-colors">
          <Scale className="w-4 h-4" /> All Comparisons
        </Link>

        {/* Hero Section */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-green-200 dark:border-green-800/50">
            Winner: {item.winner}
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight mb-6 leading-tight">
            {item.title}
          </h1>
          <p className="text-xl text-gray-500 dark:text-[#8A9BBE] leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 bg-gray-50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800">
            <div className="p-6 font-bold text-gray-500 dark:text-slate-400 uppercase tracking-widest text-xs hidden md:block">
              Feature
            </div>
            {/* Headers for the two options */}
            <div className="p-6 font-black text-gray-900 dark:text-white text-lg border-l border-gray-100 dark:border-slate-800">
              {item.features[0]?.optionA.name}
            </div>
            <div className="p-6 font-black text-gray-900 dark:text-white text-lg border-l border-gray-100 dark:border-slate-800">
              {item.features[0]?.optionB.name}
            </div>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-slate-800">
            {item.features.map((feature, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-3 group">
                <div className="p-6 font-bold text-gray-900 dark:text-white text-sm bg-gray-50/50 dark:bg-slate-900/50 md:bg-transparent flex items-center">
                  {feature.label}
                </div>
                <div className={`p-6 text-sm border-l border-gray-100 dark:border-slate-800 flex items-center gap-3 ${feature.optionA.highlight ? 'bg-green-50/50 dark:bg-green-900/10 text-green-700 dark:text-green-400 font-bold' : 'text-gray-600 dark:text-[#8A9BBE]'}`}>
                  {feature.optionA.highlight ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <XCircle className="w-5 h-5 shrink-0 opacity-20" />}
                  {feature.optionA.value}
                </div>
                <div className={`p-6 text-sm border-l border-gray-100 dark:border-slate-800 flex items-center gap-3 ${feature.optionB.highlight ? 'bg-green-50/50 dark:bg-green-900/10 text-green-700 dark:text-green-400 font-bold' : 'text-gray-600 dark:text-[#8A9BBE]'}`}>
                  {feature.optionB.highlight ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <XCircle className="w-5 h-5 shrink-0 opacity-20" />}
                  {feature.optionB.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ad Slot - Middle */}
        <AdSlot minHeight="90px" className="mb-16" />

        {/* When to use each */}
        <div className="mb-20">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-8">When to use which?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {item.useCases.map((useCase, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-gray-100 dark:border-slate-800">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6">
                  <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3">{useCase.title}</h3>
                <p className="text-sm text-gray-600 dark:text-[#8A9BBE] leading-relaxed mb-6 italic">
                  "{useCase.scenario}"
                </p>
                <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 text-sm text-gray-900 dark:text-white font-medium leading-relaxed">
                  <span className="font-bold text-[#00D4B4] uppercase tracking-widest text-[10px] block mb-2">Recommendation</span>
                  {useCase.recommendation}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Deep Dive Link */}
        {item.blogSlug && (
          <Link href={`/blog/${item.blogSlug}/`} className="group flex flex-col sm:flex-row items-center gap-6 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-3xl border border-blue-100 dark:border-blue-900/30 mb-20 hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-blue-500 text-white rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
              <BookOpen className="w-8 h-8" />
            </div>
            <div className="flex-grow text-center sm:text-left">
              <h3 className="font-black text-xl text-gray-900 dark:text-white mb-2 tracking-tight">Read the Deep Dive</h3>
              <p className="text-sm text-gray-600 dark:text-blue-200/70">We wrote a comprehensive technical guide covering this exact topic in extreme detail.</p>
            </div>
            <div className="shrink-0">
              <span className="inline-flex items-center justify-center h-12 px-6 rounded-xl bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-xs group-hover:bg-blue-600 group-hover:text-white transition-colors">
                Read Article
              </span>
            </div>
          </Link>
        )}

        {/* FAQ Section */}
        <div className="mb-20">
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {item.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-3 flex items-start gap-4">
                  <span className="text-purple-500 font-black">Q.</span>
                  {faq.q}
                </h3>
                <div className="text-gray-600 dark:text-[#8A9BBE] text-sm leading-relaxed flex items-start gap-4">
                  <span className="text-[#00D4B4] font-black">A.</span>
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tool CTAs */}
        {tools.length > 0 && (
          <RelatedToolsInline tools={tools} />
        )}

      </div>
    </div>
  )
}
