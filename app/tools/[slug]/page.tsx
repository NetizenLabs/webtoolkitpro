import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getToolBySlug, getTools, getRelatedTools, getRelatedToolsForWidget, generateSoftwareSchema, generateFAQSchema } from '@/lib/tools'
import { ArrowRight } from 'lucide-react'
import { TOOL_COMPONENTS } from '@/lib/tool-registry'
import ToolInfo from '@/components/sections/ToolInfo'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import RelatedToolsSidebar from '@/components/tools/RelatedToolsSidebar'
import RelatedToolsWidget from '@/components/tools/RelatedToolsWidget'
import { RELATED_TOOLS_MAP } from '@/lib/related-tools-map'
import ToolUsageTracker from '@/components/tools/ToolUsageTracker'
import AdSlot from '@/components/ads/AdSlot'
import AIOContextButton from '@/components/tools/AIOContextButton'
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

  const baseTitle = `${tool.name} | Best Free Online ${tool.category} 2026`
  const title = tool.meta?.title || (baseTitle.length <= 60 ? baseTitle : `${tool.name} | WebToolkit Pro`)
  const description = tool.content?.description || `Free online ${tool.name}. Secure, private, and fast developer utility.`
  
  // Use dedicated keywords if available, fallback to tags
  const keywords = tool.content?.keywords 
    ? (Array.isArray(tool.content.keywords) ? tool.content.keywords.join(', ') : tool.content.keywords)
    : tool.tags.join(', ')

  return {
    title,
    description,
    alternates: {
      canonical: `https://wtkpro.site/tools/${tool.slug}`,
    },
    keywords,
    openGraph: {
      title,
      description,
      url: `https://wtkpro.site/tools/${tool.slug}`,
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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
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
                <h1 className="text-3xl md:text-4xl font-bold text-[#1E2D47] dark:text-white tracking-tighter">
                  {tool.content?.title || tool.name}
                </h1>
                <p className="text-gray-600 dark:text-[#8A9BBE] font-medium">
                  {tool.function?.primary} {tool.function?.secondary ? `• ${tool.function.secondary}` : ''}
                </p>
                <Link href={`/tools/category/${categorySlug}`} className="badge-pill bg-[#0D1526] text-[#00D4B4] border border-[#1E2D47] mt-3 hover:border-[#00D4B4]/50 transition-all">
                  {tool.category} <ArrowRight className="w-3 h-3 ml-1" strokeWidth={1.5} />
                </Link>
              </div>
            </div>

            {/* Entity Definition Block */}
            <div className="mb-12 p-8 bg-gray-50 dark:bg-[#0D1526] rounded-[12px] border border-gray-100 dark:border-[#1E2D47] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D4B4]/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
              <p className="text-lg text-gray-900 dark:text-[#F0F6FF] leading-relaxed font-medium relative z-10">
                {tool.content.description}
              </p>
            </div>

            {/* Tool UI Container */}
            <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-[12px] p-4 md:p-8 shadow-2xl mb-20 transition-colors duration-300">
              {ToolComponent ? <ToolComponent /> : (
                <div className="p-12 text-center bg-gray-50 dark:bg-[#0B1120] rounded-[12px] border border-gray-100 dark:border-[#1E2D47] text-gray-400 dark:text-[#8A9BBE]">
                  Tool interface coming soon...
                </div>
              )}
            </div>

            <AdSlot />

            {/* Detailed Info */}
            <ToolInfo 
              title={tool.name}
              description={tool.content.description}
              howItWorks={tool.content.how_it_works}
              features={tool.content.features}
              faqs={tool.content.faq.map(f => ({ q: f.question, a: f.answer }))}
              technicalSpecs={tool.content.technical_specs}
            />

            {/* Related Tools Widget */}
            {(() => {
              const widgetData = RELATED_TOOLS_MAP[tool.slug] || getRelatedToolsForWidget(tool);
              if (!widgetData) return null;
              return (
                <RelatedToolsWidget 
                  featured={widgetData.featured}
                  cards={widgetData.cards}
                  pills={widgetData.pills}
                />
              );
            })()}
          </div>

          {/* Sidebar Area */}
          <aside className="w-full lg:w-80 shrink-0 space-y-8">
            <AIOContextButton 
              toolName={tool.name} 
              description={tool.content.description} 
              features={tool.content.features} 
            />
            <RelatedToolsSidebar relatedTools={relatedTools} />
            <div className="p-8 bg-gradient-to-br from-[#00D4B4] to-[#0094FF] rounded-[12px] text-[#0B1120] shadow-xl shadow-blue-500/10">
              <h3 className="font-bold mb-3 text-sm uppercase tracking-wider">Privacy First</h3>
              <p className="text-sm font-medium leading-relaxed">
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
