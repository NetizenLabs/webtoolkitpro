import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from '@/components/ui/NativeLink';
import { getToolBySlug, getTools, getRelatedTools, getRelatedToolsForWidget } from '@/lib/tools'
import { generateSoftwareSchema, generateFAQSchema } from '@/lib/seo/schema'
import { ArrowRight, ShieldCheck, Info } from 'lucide-react'
import ToolRenderer from '@/components/tools/ToolRenderer'
import ToolInfo from '@/components/sections/ToolInfo'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import RelatedToolsSidebar from '@/components/tools/RelatedToolsSidebar'
import RelatedToolsWidget from '@/components/tools/RelatedToolsWidget'
import { RELATED_TOOLS_MAP } from '@/lib/related-tools-map'
import ToolUsageTracker from '@/components/tools/ToolUsageTracker'
import ToolRating from '@/components/tools/ToolRating'
import AdSlot from '@/components/ads/AdSlot'
import AIOContextButton from '@/components/tools/AIOContextButton'
import { CATEGORY_MAP } from '@/lib/categories'
import DynamicIcon from '@/components/ui/DynamicIcon'
import { getRelatedPostsForTool } from '@/lib/blog'
import FurtherReading from '@/components/sections/FurtherReading'
import ToolPersonalizationClient from '@/components/tools/ToolPersonalizationClient'

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

// ISR: revalidate tool pages once per day in the background
// Keeps pages fast while allowing content updates without a full redeploy
export const revalidate = 86400

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const tool = getToolBySlug(params.slug)
  if (!tool) return {}

  const brandSuffix = ' | WTK Pro'
  let title = tool.meta?.title || `${tool.name} | Professional Online ${tool.category}`
  
  if ((title.length + brandSuffix.length) > 58) {
    const maxLength = 58 - brandSuffix.length - 3
    const truncated = title.slice(0, maxLength)
    // Trim to last full word
    title = truncated.slice(0, truncated.lastIndexOf(' ')).trim() + '...'
  }
  title += brandSuffix

  let description = tool.content?.description || `Free online ${tool.name}. Secure, private, and fast developer utility.`
  
  // Truncate description to 155 chars for safety (SEO pixel limit)
  if (description.length > 155) {
    description = description.substring(0, 152).trim() + '...'
  }
  
  // Use dedicated keywords if available, fallback to tags
  const keywords = tool.content?.keywords 
    ? (Array.isArray(tool.content.keywords) ? tool.content.keywords.join(', ') : tool.content.keywords)
    : tool.tags.join(', ')

  return {
    title,
    description,
    alternates: {
      canonical: `https://wtkpro.site/tools/${tool.slug}/`,
    },
    keywords,
    openGraph: {
      title,
      description,
      url: `https://wtkpro.site/tools/${tool.slug}/`,
      siteName: 'WebToolkit Pro',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://wtkpro.site/og-image.png',
          width: 1200,
          height: 630,
          alt: tool.name,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://wtkpro.site/og-image.png'],
    },

  }
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug)
  if (!tool) notFound()


  const relatedTools = getRelatedTools(tool)
  const softwareSchema = generateSoftwareSchema(tool)
  const faqSchema = generateFAQSchema(tool)

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
            <div className="flex items-start justify-between w-full mb-12">
              <div className="flex items-center gap-6">
                <div 
                  className="w-16 h-16 rounded-[12px] flex items-center justify-center shrink-0 shadow-xl shadow-blue-500/10"
                  style={{ background: 'linear-gradient(135deg, #00D4B4 0%, #0094FF 100%)' }}
                >
                  <DynamicIcon name={tool.icon || 'Zap'} className="w-8 h-8 text-[#0B1120]" strokeWidth={1.5} />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-[#1E2D47] dark:text-white tracking-tighter">
                    {tool.content?.title || tool.name}
                  </h1>
                  <p className="text-gray-600 dark:text-[#8A9BBE] font-medium mt-1">
                    {tool.function?.primary} {tool.function?.secondary ? `• ${tool.function.secondary}` : ''}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 text-xs font-bold rounded-full border border-green-200 dark:border-green-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      Last updated: May 2026
                    </span>
                  </div>
                  <Link href={`/tools/hub/${categorySlug}`} className="badge-pill bg-[#0D1526] text-[#00D4B4] border border-[#1E2D47] mt-3 hover:border-[#00D4B4]/50 transition-all inline-flex">
                    {tool.category} <ArrowRight className="w-3 h-3 ml-1" strokeWidth={1.5} />
                  </Link>
                  <ToolRating toolName={tool.name} slug={tool.slug} />
                </div>
              </div>
              
              <div className="hidden sm:block">
                <ToolPersonalizationClient slug={tool.slug} name={tool.name} />
              </div>
            </div>

            {/* Tool UI Container - Moved to TOP for better UX */}
            <div 
              className="min-h-[400px] bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-[12px] p-4 md:p-8 shadow-2xl mb-12 transition-colors duration-300"
              data-agent-container="interactive-tool"
              aria-label={`Interactive ${tool.name} Utility UI`}
            >
              <ToolRenderer slug={tool.slug} />
            </div>

            {/* Entity Definition Block for LLM Citations */}
            <blockquote 
              itemScope 
              itemType="https://schema.org/DefinedTerm"
              className="mb-8 p-8 bg-gray-50 dark:bg-[#0D1526] rounded-[12px] border-l-4 border-l-[#00D4B4] border-y border-r border-gray-100 dark:border-[#1E2D47] shadow-sm relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D4B4]/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
              <meta itemProp="name" content={tool.name} />
              <p itemProp="description" className="text-lg text-gray-900 dark:text-[#F0F6FF] leading-relaxed font-medium relative z-10 italic">
                {tool.content?.description || `Professional ${tool.name} utility for modern web development.`}
              </p>
            </blockquote>

            {/* E-E-A-T Editorial Byline & Verification Block */}
            <div className="flex flex-wrap items-center gap-4 mb-12 pb-6 border-b border-gray-100 dark:border-[#1E2D47] text-xs sm:text-sm text-gray-500 dark:text-[#8A9BBE]">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 dark:text-white">Written by</span>
                <Link href="/about" className="text-blue-500 hover:text-blue-600 dark:text-[#00D4B4] dark:hover:text-[#00FFD4] font-medium transition-colors">
                  Abu Sufyan
                </Link>
                <span className="text-gray-300 dark:text-gray-700">|</span>
                <span className="text-gray-400 dark:text-[#5B719E]">Systems Engineer</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-300 dark:text-gray-700">•</span>
                <span className="flex items-center gap-1 text-emerald-600 dark:text-[#00D4B4] font-medium">
                  <ShieldCheck className="w-4 h-4" strokeWidth={2} /> Fact-Checked & Verified
                </span>
                <span className="text-gray-300 dark:text-gray-700">•</span>
                <span className="text-gray-400 dark:text-[#5B719E]">Compliance: 2026 Standards</span>
                <span className="text-gray-300 dark:text-gray-700">•</span>
                <span className="text-gray-400 dark:text-[#5B719E]">Last Updated: May 2026</span>
              </div>
            </div>

            <AdSlot />

            {/* Detailed Info */}
            <ToolInfo 
              title={tool.name}
              description={tool.content?.description || ''}
              howItWorks={tool.content?.how_it_works || ''}
              features={tool.content?.features || []}
              faqs={tool.content?.faq?.map(f => ({ q: f.question, a: f.answer })) || []}
              technicalSpecs={tool.content?.technical_specs}
            />

            {/* E-E-A-T Sourcing & Client-Side Privacy Guarantee */}
            <div className="mt-12 p-8 bg-gray-50 dark:bg-[#0D1526]/50 rounded-[12px] border border-gray-100 dark:border-[#1E2D47] text-sm text-gray-600 dark:text-[#8A9BBE] leading-relaxed shadow-inner">
              <div className="flex items-center gap-3 mb-4 text-[#1E2D47] dark:text-white font-bold text-base">
                <Info className="w-5 h-5 text-blue-500 dark:text-[#00D4B4]" strokeWidth={2} />
                Editorial Standards & Processing Transparency
              </div>
              <p className="mb-3">
                This utility is engineered and maintained under strict editorial and technical standards. All source calculations are audited against official formatting standards and RFC specifications to guarantee mathematical and logic accuracy.
              </p>
              <p className="mb-4">
                <strong>Content Creation & Automation Transparency:</strong> To ensure our dynamic developer specifications and reference datasets remain fully comprehensive and updated against newly released RFC updates, this page compiles technical documentation using advanced programmatic retrieval tools. Every output data block, feature list, and system specification is subsequently audited, fact-checked, and verified by our systems engineers for absolute correctness and accuracy.
              </p>
              <p className="mb-4">
                <strong>Security Guarantee:</strong> To guarantee absolute user privacy, this tool executes 100% client-side inside your web browser. None of your input strings, payloads, keys, or files are ever transmitted to a server or stored externally.
              </p>
              <p className="mt-4 pt-4 border-t border-gray-200 dark:border-[#1E2D47] text-xs font-mono">
                Built by <a href="https://abusufyan.xyz" target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-[#00D4B4] hover:underline">Abu Sufyan</a> • Also explore: <a href="https://www.severancecalculator.xyz" target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-[#00D4B4] hover:underline">Severance Calculator</a> & <a href="https://tradeconvert.pro" target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-[#00D4B4] hover:underline">TradeConvert</a>
              </p>
            </div>

            {/* Further Reading Section */}
            <FurtherReading posts={getRelatedPostsForTool(tool.tags, tool.category)} />

            {/* Related Tools Widget */}
            {(() => {
              const widgetData = RELATED_TOOLS_MAP[tool.slug] || getRelatedToolsForWidget(tool);
              if (!widgetData) return null;

              // If it's a dynamic object from getRelatedToolsForWidget, it has resolveIcon
              // If it's from the static map, we use the one from getRelatedToolsForWidget(tool)
              const dynamicHelper = getRelatedToolsForWidget(tool);
              const resolver = dynamicHelper?.resolveIcon || ((i: string) => i);

              const resolvedFeatured = {
                ...widgetData.featured,
                icon: resolver(widgetData.featured.icon, widgetData.featured.href)
              };

              const resolvedCards = widgetData.cards.map((card: any) => ({
                ...card,
                icon: resolver(card.icon, card.href)
              }));

              return (
                <RelatedToolsWidget 
                  featured={resolvedFeatured}
                  cards={resolvedCards}
                  pills={widgetData.pills}
                />
              );
            })()}
          </div>

          {/* Sidebar Area */}
          <aside className="w-full lg:w-80 shrink-0 space-y-8">
            <AIOContextButton 
              toolName={tool.name} 
              description={tool.content?.description || ''} 
              features={tool.content?.features || []} 
            />
            <RelatedToolsSidebar relatedTools={relatedTools} />
            <div className="p-8 bg-gradient-to-br from-[#00D4B4] to-[#0094FF] rounded-[12px] text-[#0B1120] shadow-xl shadow-blue-500/10">
              <h2 className="font-bold mb-3 text-sm uppercase tracking-wider">Privacy First</h2>
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
