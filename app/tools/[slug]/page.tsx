import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getToolBySlug, getTools, getRelatedTools, generateSoftwareSchema, generateFAQSchema } from '@/lib/tools'
import { ArrowRight } from 'lucide-react'
import { TOOL_COMPONENTS } from '@/lib/tool-registry'
import ToolInfo from '@/components/sections/ToolInfo'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import RelatedToolsSidebar from '@/components/tools/RelatedToolsSidebar'
import ToolUsageTracker from '@/components/tools/ToolUsageTracker'
import AdSlot from '@/components/ads/AdSlot'
import * as Icons from 'lucide-react'

interface ToolPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const tools = getTools()
  return tools.map((tool) => ({
    slug: tool.slug,
  }))
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const tool = getToolBySlug(params.slug)
  if (!tool) return {}

  const title = tool.meta?.title || `${tool.name} - Free Online ${tool.function.primary} | wtkpro`
  const description = tool.content.description

  return {
    title,
    description,
    alternates: {
      canonical: `https://wtkpro.site/tools/${tool.slug}/`,
    },
    keywords: tool.tags.join(', '),
    openGraph: {
      title,
      description,
      url: `https://wtkpro.site/tools/${tool.slug}/`,
      type: 'website',
    },
  }
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug)
  if (!tool) notFound()

  const ToolComponent = TOOL_COMPONENTS[tool.slug]
  const relatedTools = getRelatedTools(tool)
  const softwareSchema = generateSoftwareSchema(tool)
  const faqSchema = generateFAQSchema(tool)

  // Dynamic icon selection
  const IconComponent = (Icons as any)[tool.icon || 'Zap'] || Icons.Zap

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name={tool.name} slug={tool.slug} category={tool.category} />
      <ToolUsageTracker />
      
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content Area */}
          <div className="flex-grow max-w-5xl">
            <div className="flex items-center gap-4 mb-12">
              <div className="p-4 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/20">
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                  {tool.content.title || tool.name}
                </h1>
                <p className="text-gray-500 dark:text-slate-400">
                  {tool.function.primary} {tool.function.secondary ? `• ${tool.function.secondary}` : ''}
                </p>
                <Link href={`/tools/hub/${tool.category.toLowerCase()}`} className="inline-flex items-center gap-1.5 text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mt-2 hover:underline">
                  Part of the {tool.category} Suite <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* TL;DR Hook Section */}
            {tool.content.tldr && (
              <div className="mb-12 p-1 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 animate-in fade-in slide-in-from-top-4 duration-1000">
                <div className="bg-white dark:bg-slate-900 rounded-[calc(1.5rem-1px)] p-6 md:p-8 flex items-start gap-6">
                  <div className="w-12 h-12 shrink-0 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center">
                    <Icons.Zap className="w-6 h-6 text-blue-600 animate-pulse" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2">TL;DR / Quick Summary</div>
                    <p className="text-xl font-bold text-gray-900 dark:text-white leading-tight italic">
                      "{tool.content.tldr}"
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Entity Definition Block (GEO Optimization) */}
            <div className="mb-12 p-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
              <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed font-medium relative z-10">
                {tool.content.entity_definition}
              </p>
            </div>

            {/* Tool UI */}
            <div className="mb-20">
              {ToolComponent ? <ToolComponent /> : <div className="p-12 text-center bg-yellow-50 rounded-3xl text-yellow-700">Tool interface coming soon...</div>}
            </div>

            <AdSlot />

            {/* Compounding Info Section */}
            <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 500px' }}>
              <ToolInfo 
                title={tool.name}
                description={tool.content.description}
                howItWorks={tool.content.how_it_works}
                features={tool.content.features}
                faqs={tool.content.faq.map(f => ({ q: f.question, a: f.answer }))}
                technicalSpecs={tool.content.technical_specs}
              />
            </div>
          </div>

          {/* Sidebar Area */}
          <aside className="w-full lg:w-80 shrink-0 space-y-8">
            <RelatedToolsSidebar relatedTools={relatedTools} />
            <div className="p-6 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white shadow-xl shadow-blue-500/20">
              <h4 className="font-bold mb-2">Did you know?</h4>
              <p className="text-xs text-blue-100 leading-relaxed">
                All processing happens locally in your browser. Your data never leaves your device.
              </p>
            </div>
            <AdSlot />
          </aside>
        </div>
      </div>
    </div>
  )
}
