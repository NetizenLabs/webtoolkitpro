import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { getToolsByCategory, getCategories } from '@/lib/tools'
import { ArrowRight, Zap, Star, Shield, Code2 } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import * as Icons from 'lucide-react'

interface HubPageProps {
  params: {
    category: string
  }
}

export async function generateStaticParams() {
  const categories = getCategories()
  return categories.map((cat) => ({
    category: cat.toLowerCase(),
  }))
}

export async function generateMetadata({ params }: HubPageProps): Promise<Metadata> {
  const category = params.category.charAt(0).toUpperCase() + params.category.slice(1)
  const title = `${category} Tools - Free Online Developer Suite | wtkpro`
  const description = `Access a professional suite of ${category} tools. Format, convert, and generate data instantly with enterprise-grade precision.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://wtkpro.site/tools/hub/${params.category}/`,
    }
  }
}

export default function HubPage({ params }: HubPageProps) {
  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1)
  const tools = getToolsByCategory(params.category)

  const hubSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': `${categoryName} Tools Hub`,
    'description': `A specialized collection of ${categoryName} utilities for web developers.`,
    'url': `https://wtkpro.site/tools/hub/${params.category}/`,
    'hasPart': tools.map(t => ({
      '@type': 'SoftwareApplication',
      'name': t.name,
      'url': `https://wtkpro.site/tools/${t.slug}/`
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8">
      <BreadcrumbSchema name={`${categoryName} Hub`} slug={`hub/${params.category}`} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hubSchema) }}
      />

      <div className="max-w-7xl mx-auto">
        {/* Hub Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
            <Zap className="w-4 h-4 fill-current" /> Topical Hub
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
            The {categoryName} Suite
          </h1>
          <p className="text-xl text-gray-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A comprehensive cluster of professional-grade {categoryName.toLowerCase()} utilities designed for speed, accuracy, and total privacy.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => {
            const IconComponent = (Icons as any)[tool.category === 'Formatters' ? 'FileJson' : tool.category === 'Generators' ? 'Key' : 'Zap'] || Icons.Zap
            return (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-start"
              >
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                  {tool.name}
                </h3>
                <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed mb-8 line-clamp-2">
                  {tool.content.description}
                </p>
                <div className="mt-auto flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest text-xs">
                  Launch Tool <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Cluster Benefits */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-100 dark:border-slate-800 pt-24">
           <div className="space-y-4">
              <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl flex items-center justify-center">
                 <Shield className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold dark:text-white">Secure Processing</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">Every tool in the {categoryName} suite processes data locally in your browser. No server transmission, guaranteed.</p>
           </div>
           <div className="space-y-4">
              <div className="w-12 h-12 bg-amber-50 dark:bg-amber-900/20 rounded-xl flex items-center justify-center">
                 <Star className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold dark:text-white">V8 Optimized</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">Engineered for high-performance handling of large payloads with minimal latency.</p>
           </div>
           <div className="space-y-4">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center">
                 <Code2 className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold dark:text-white">Developer First</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">Semantic output and keyboard-optimized interfaces for professional engineering workflows.</p>
           </div>
        </div>

        {/* Hub FAQ (Silo Specific) */}
        <div className="mt-32 max-w-3xl mx-auto">
           <h2 className="text-3xl font-black text-center mb-12 dark:text-white uppercase tracking-tight">{categoryName} Hub FAQ</h2>
           <div className="space-y-8">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800">
                 <h3 className="font-bold text-lg mb-2 dark:text-white">Why use our {categoryName} tools?</h3>
                 <p className="text-gray-500 dark:text-slate-400 leading-relaxed text-sm">Unlike generic online converters, our {categoryName.toLowerCase()} suite is optimized for technical accuracy and privacy. We follow strict RFC standards and never store your inputs.</p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800">
                 <h3 className="font-bold text-lg mb-2 dark:text-white">Are there any limits on file size?</h3>
                 <p className="text-gray-500 dark:text-slate-400 leading-relaxed text-sm">Most tools in this hub support up to 10MB of text data, processed locally via your browser's memory for maximum speed.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
