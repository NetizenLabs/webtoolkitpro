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
import { CATEGORY_MAP } from '@/lib/categories'
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

  const categorySlug = Object.keys(CATEGORY_MAP).find(key => CATEGORY_MAP[key] === tool.category) || 'developer-tools'

  return (
    <div className="min-h-screen bg-[#0B1120] py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
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
            <div className="flex items-center gap-6 mb-12">
              <div 
                className="w-16 h-16 rounded-[12px] flex items-center justify-center shrink-0 shadow-xl shadow-blue-500/10"
                style={{ background: 'linear-gradient(135deg, #00D4B4 0%, #0094FF 100%)' }}
              >
                <IconComponent className="w-8 h-8 text-[#0B1120]" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tighter">
                  {tool.content.title || tool.name}
                </h1>
                <p className="text-[#8A9BBE] font-medium">
                  {tool.function.primary} {tool.function.secondary ? `• ${tool.function.secondary}` : ''}
                </p>
                <Link href={`/tools/category/${categorySlug}`} className="badge-pill bg-[#0D1526] text-[#00D4B4] border border-[#1E2D47] mt-3 hover:border-[#00D4B4]/50 transition-all">
                  {tool.category} <ArrowRight className="w-3 h-3 ml-1" strokeWidth={1.5} />
                </Link>
              </div>
            </div>

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
              <h3 className="font-bold mb-2 text-sm">Did you know?</h3>
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
