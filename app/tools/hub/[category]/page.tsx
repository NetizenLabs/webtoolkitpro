import React from 'react'
import { Metadata } from 'next'
import Link from '@/components/ui/NativeLink';
import { getToolsByCategory, getCategories } from '@/lib/tools'
import { ArrowRight, Zap, Star, Shield, Code2 } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import DynamicIcon from '@/components/ui/DynamicIcon'
import { CATEGORY_PILLARS, CATEGORY_MAP } from '@/lib/categories'

interface HubPageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  const categories = Object.keys(CATEGORY_MAP)
  return categories.map((cat) => ({
    category: cat,
  }))
}

export async function generateMetadata({ params }: HubPageProps): Promise<Metadata> {
  const pillar = CATEGORY_PILLARS[params.category]
  const name = CATEGORY_MAP[params.category] || params.category
  
  const title = pillar?.title || `${name} Tools - Professional Developer Suite | WebToolkit Pro`
  const description = pillar?.description || `Access a professional suite of ${name} tools. Secure, client-side utilities for modern engineering workflows.`

  return {
    title,
    description,
    keywords: pillar?.keywords,
    alternates: {
      canonical: `https://wtkpro.site/tools/hub/${params.category}/`,
    }
  }
}

export default function HubPage({ params }: HubPageProps) {
  const name = CATEGORY_MAP[params.category] || params.category
  const tools = getToolsByCategory(params.category)

  const hubSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': `${name} Tools Hub`,
    'description': `A specialized collection of ${name} utilities for web developers.`,
    'url': `https://wtkpro.site/tools/hub/${params.category}/`,
    'hasPart': tools.map(t => ({
      '@type': 'SoftwareApplication',
      'name': t.name,
      'url': `https://wtkpro.site/tools/${t.slug}/`
    }))
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <BreadcrumbSchema name={`${name} Hub`} slug={`hub/${params.category}`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubSchema) }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Hub Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#00D4B4] text-[#0D1117] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <Zap className="w-4 h-4 fill-current" /> Topical Hub
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            The {name} Suite
          </h1>
          <p className="text-xl text-gray-500 dark:text-[#8A9BBE] max-w-2xl mx-auto leading-relaxed">
            A comprehensive cluster of professional-grade {name.toLowerCase()} utilities designed for speed, accuracy, and total privacy.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => {
            return (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 hover:-translate-y-2 transition-all duration-300 flex flex-col items-start"
              >
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <DynamicIcon name={tool.icon || 'Zap'} className="w-8 h-8 text-[#00D4B4]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#00D4B4] transition-colors">
                  {tool.name}
                </h3>
                <p className="text-gray-500 dark:text-[#8A9BBE] text-sm leading-relaxed mb-8 line-clamp-2">
                  {tool.content?.description || tool.function?.primary}
                </p>
                <div className="mt-auto flex items-center gap-2 text-[#00D4B4] font-black uppercase tracking-widest text-xs">
                  Launch Tool <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Cluster Benefits */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-100 dark:border-slate-800 pt-24">
           <div className="space-y-4">
              <div className="w-12 h-12 bg-[#00D4B4]/10 rounded-xl flex items-center justify-center">
                 <Shield className="w-6 h-6 text-[#00D4B4]" />
              </div>
              <h3 className="text-xl font-bold dark:text-white">Secure Processing</h3>
              <p className="text-sm text-gray-500 dark:text-[#8A9BBE] leading-relaxed">Every tool in the {name} suite processes data locally in your browser. No server transmission, guaranteed.</p>
           </div>
           <div className="space-y-4">
              <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/10 rounded-xl flex items-center justify-center">
                 <Star className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="text-xl font-bold dark:text-white">V8 Optimized</h3>
              <p className="text-sm text-gray-500 dark:text-[#8A9BBE] leading-relaxed">Engineered for high-performance handling of large payloads with minimal latency.</p>
           </div>
           <div className="space-y-4">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/10 rounded-xl flex items-center justify-center">
                 <Code2 className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold dark:text-white">Developer First</h3>
              <p className="text-sm text-gray-500 dark:text-[#8A9BBE] leading-relaxed">Semantic output and keyboard-optimized interfaces for professional engineering workflows.</p>
           </div>
        </div>

        {/* Hub FAQ (Silo Specific) */}
        <div className="mt-32 max-w-3xl mx-auto">
           <h2 className="text-3xl font-black text-center mb-12 dark:text-white uppercase tracking-tight">{name} Hub FAQ</h2>
           <div className="space-y-8">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800">
                 <h3 className="font-bold text-lg mb-2 dark:text-white">Why use our {name} tools?</h3>
                 <p className="text-gray-500 dark:text-[#8A9BBE] leading-relaxed text-sm">Unlike generic online converters, our {name.toLowerCase()} suite is optimized for technical accuracy and privacy. We follow strict RFC standards and never store your inputs.</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800">
                 <h3 className="font-bold text-lg mb-2 dark:text-white">Are there any limits on file size?</h3>
                 <p className="text-gray-500 dark:text-[#8A9BBE] leading-relaxed text-sm">Most tools in this hub support up to 10MB of text data, processed locally via your browser&apos;s memory for maximum speed.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
