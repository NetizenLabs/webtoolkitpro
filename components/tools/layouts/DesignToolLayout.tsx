import React from 'react'
import Link from '@/components/ui/NativeLink';
import { ArrowRight, ShieldCheck, Info } from 'lucide-react'
import ToolRenderer from '@/components/tools/ToolRenderer'
import ToolInfo from '@/components/sections/ToolInfo'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import RelatedToolsSidebar from '@/components/tools/RelatedToolsSidebar'
import RelatedToolsWidget from '@/components/tools/RelatedToolsWidget'
import ProBannerCTA from '@/components/tools/ProBannerCTA'
import { RELATED_TOOLS_MAP } from '@/lib/related-tools-map'
import ToolUsageTracker from '@/components/tools/ToolUsageTracker'
import AdSlot from '@/components/ads/AdSlot'
import AIOContextButton from '@/components/tools/AIOContextButton'
import DynamicIcon from '@/components/ui/DynamicIcon'
import { getRelatedPostsForTool } from '@/lib/blog'
import FurtherReading from '@/components/sections/FurtherReading'
import ToolPersonalizationClient from '@/components/tools/ToolPersonalizationClient'
import { getRelatedToolsForWidget } from '@/lib/tools'

// @ts-ignore
export default function DesignToolLayout({ tool, categorySlug, relatedTools, softwareSchema }) {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name={tool.name} slug={tool.slug} category={tool.category} />
      <ToolUsageTracker />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <div className="max-w-[1600px] mx-auto px-4">
        {/* Full-width header for Design Tools */}
        <div className="flex flex-col xl:flex-row gap-8 xl:gap-16">
          {/* Main Visual Workspace Area */}
          <div className="flex-grow w-full">
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
                </div>
              </div>
              
              <div className="hidden sm:block">
                <ToolPersonalizationClient slug={tool.slug} name={tool.name} />
              </div>
            </div>

            <div 
              className="min-h-[400px] bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-[12px] p-4 md:p-8 shadow-2xl mb-12 transition-colors duration-300"
              data-agent-container="interactive-tool"
              aria-label={`Interactive ${tool.name} Utility UI`}
            >
              <ToolRenderer slug={tool.slug} />
            </div>

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

            <div className="flex flex-wrap items-center gap-4 mb-12 pb-6 border-b border-gray-100 dark:border-[#1E2D47] text-xs sm:text-sm text-gray-500 dark:text-[#8A9BBE]">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 dark:text-white">Written by</span>
                <Link href="/about/" className="text-blue-500 hover:text-blue-600 dark:text-[#00D4B4] dark:hover:text-[#00FFD4] font-medium transition-colors">
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

            <ToolInfo 
              title={tool.name}
              howItWorks={tool.content?.how_it_works || ''}
              features={tool.content?.features || []}
              faqs={tool.content?.faq?.map((f: any) => ({ q: f.question, a: f.answer })) || []}
              technicalSpecs={tool.content?.technical_specs}
              practicalApplication={tool.content?.practical_application}
              codeBlueprints={tool.content?.code_blueprints}
            />

            <div className="mt-12 p-8 bg-gray-50 dark:bg-[#0D1526]/50 rounded-[12px] border border-gray-100 dark:border-[#1E2D47] text-sm text-gray-600 dark:text-[#8A9BBE] leading-relaxed shadow-inner">
              <div className="flex items-center gap-3 mb-4 text-[#1E2D47] dark:text-white font-bold text-base">
                <Info className="w-5 h-5 text-blue-500 dark:text-[#00D4B4]" strokeWidth={2} />
                Editorial Standards & Processing Transparency
              </div>
              <p className="mb-3">
                This utility is engineered and maintained under strict editorial and technical standards. All source calculations are audited against official formatting standards and RFC specifications to guarantee mathematical and logic accuracy.
              </p>
              <p className="mb-4">
                <strong>Security Guarantee:</strong> To guarantee absolute user privacy, this tool executes 100% client-side inside your web browser. None of your input strings, payloads, keys, or files are ever transmitted to a server or stored externally.
              </p>
              <p className="mt-4 pt-4 border-t border-gray-200 dark:border-[#1E2D47] text-xs font-mono">
                Built by <a href="https://abusufyan.xyz" target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-[#00D4B4] hover:underline">Abu Sufyan</a> • Also explore: <a href="https://www.severancecalculator.xyz" target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-[#00D4B4] hover:underline">Severance Calculator</a> & <a href="https://tradeconvert.pro" target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-[#00D4B4] hover:underline">TradeConvert</a>
              </p>
            </div>

            <FurtherReading 
              posts={getRelatedPostsForTool(tool.tags, tool.category)} 
              tools={relatedTools.slice(0, 3)}
            />

            {(() => {
              const widgetData = RELATED_TOOLS_MAP[tool.slug] || getRelatedToolsForWidget(tool);
              if (!widgetData) return null;

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

          <aside className="w-full xl:w-96 shrink-0 flex flex-col gap-6 sticky top-24 self-start">
            <AIOContextButton 
              toolName={tool.name} 
              description={tool.content?.description || ''} 
              features={tool.content?.features || []} 
            />
            <RelatedToolsSidebar relatedTools={relatedTools} />
            <ProBannerCTA />
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
