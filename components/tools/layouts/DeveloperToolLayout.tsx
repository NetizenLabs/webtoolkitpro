import React from 'react'
import Link from '@/components/ui/NativeLink';
import { ArrowRight, ShieldCheck, Info, Terminal } from 'lucide-react'
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
import ToolSecurityBadge from '@/components/tools/ToolSecurityBadge'

// @ts-ignore
export default function DeveloperToolLayout({ tool, categorySlug, relatedTools, softwareSchema }) {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-[#0B1120] text-gray-300 font-mono transition-colors duration-300">
      <BreadcrumbSchema name={tool.name} slug={tool.slug} category={tool.category} />
      <ToolUsageTracker />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content Area */}
          <div className="flex-grow max-w-5xl">
            <div className="flex items-start justify-between w-full mb-12 border-b border-[#1E2D47] pb-8">
              <div className="flex items-center gap-6">
                <div 
                  className="w-16 h-16 rounded-[8px] flex items-center justify-center shrink-0 border border-[#00D4B4]/30 bg-[#00D4B4]/10"
                >
                  <Terminal className="w-8 h-8 text-[#00D4B4]" strokeWidth={1.5} />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-[#F0F6FF] tracking-tight">
                    {tool.content?.title || tool.name}
                  </h1>
                  <p className="text-[#8A9BBE] text-sm mt-2">
                    {tool.function?.primary} {tool.function?.secondary ? `• ${tool.function.secondary}` : ''}
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-400 text-[10px] font-bold rounded-sm border border-green-500/20 uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      Sys Status: Active
                    </span>
                    <Link href={`/tools/hub/${categorySlug}`} className="text-[10px] bg-[#0D1526] text-[#00D4B4] border border-[#1E2D47] px-3 py-1 rounded-sm hover:border-[#00D4B4]/50 transition-all inline-flex uppercase">
                      [{tool.category}] <ArrowRight className="w-3 h-3 ml-1" strokeWidth={1.5} />
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="hidden sm:block">
                <ToolPersonalizationClient slug={tool.slug} name={tool.name} />
              </div>
            </div>

            {/* Terminal Tool UI Container */}
            <div 
              className="min-h-[400px] bg-[#0D1526] border border-[#1E2D47] rounded-[8px] p-4 md:p-8 shadow-2xl mb-12 relative"
              data-agent-container="interactive-tool"
              aria-label={`Interactive ${tool.name} Utility UI`}
            >
              <div className="absolute top-0 left-0 right-0 h-6 bg-[#1E2D47] rounded-t-[8px] flex items-center px-4 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                <span className="ml-2 text-[10px] text-[#8A9BBE] uppercase">/bin/wtkpro/{tool.slug}</span>
              </div>
              <div className="mt-6 font-sans">
                <ToolRenderer slug={tool.slug} />
              </div>
            </div>

            {/* Entity Definition Block for LLM Citations */}
            <blockquote 
              itemScope 
              itemType="https://schema.org/DefinedTerm"
              className="mb-8 p-6 bg-[#0D1526] rounded-[4px] border-l-2 border-l-[#0094FF] border border-[#1E2D47] shadow-sm relative overflow-hidden"
            >
              <div className="text-[10px] text-[#0094FF] uppercase tracking-widest mb-2 font-bold">System Definition Block</div>
              <meta itemProp="name" content={tool.name} />
              <p itemProp="description" className="text-sm text-[#F0F6FF] leading-relaxed">
                {tool.content?.description || `Professional ${tool.name} utility for modern web development.`}
              </p>
            </blockquote>

            {/* E-E-A-T Editorial Byline & Verification Block */}
            <div className="flex flex-wrap items-center gap-4 mb-12 pb-6 border-b border-[#1E2D47] text-[10px] text-[#8A9BBE] uppercase">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">Author:</span>
                <Link href="/about/" className="text-[#00D4B4] hover:text-[#00FFD4] font-medium transition-colors">
                  Abu Sufyan
                </Link>
                <span>|</span>
                <span>Systems Engineer</span>
              </div>
              <div className="flex items-center gap-2">
                <span>•</span>
                <span className="flex items-center gap-1 text-[#00D4B4] font-medium">
                  <ShieldCheck className="w-3 h-3" strokeWidth={2} /> Verified
                </span>
                <span>•</span>
                <span>Protocol: 2026-STABLE</span>
              </div>
            </div>

            <div className="font-sans">
              <ToolSecurityBadge />
              <ToolInfo 
                title={tool.name}
                howItWorks={tool.content?.how_it_works || ''}
                features={tool.content?.features || []}
                faqs={tool.content?.faq?.map((f: any) => ({ q: f.question, a: f.answer })) || []}
                technicalSpecs={tool.content?.technical_specs}
                practicalApplication={tool.content?.practical_application}
                codeBlueprints={tool.content?.code_blueprints}
                relatedGuides={tool.content?.related_guides}
              />
            </div>

            {/* E-E-A-T Sourcing & Client-Side Privacy Guarantee */}
            <div className="mt-12 p-8 bg-[#0D1526] rounded-[8px] border border-[#1E2D47] text-xs text-[#8A9BBE] leading-relaxed">
              <div className="flex items-center gap-3 mb-4 text-white font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-[#00D4B4]" strokeWidth={2} />
                Strict Client-Side Execution Policy
              </div>
              <p className="mb-4">
                <strong>Zero-Knowledge Protocol:</strong> To guarantee absolute user privacy, this tool executes 100% client-side inside your web browser via WebAssembly and local JavaScript. None of your input strings, payloads, keys, or files are ever transmitted to a remote server.
              </p>
            </div>

            <div className="mt-12 font-sans">
              <FurtherReading 
                posts={getRelatedPostsForTool(tool.tags, tool.category)} 
                tools={relatedTools.slice(0, 3)}
              />
            </div>

            {/* Related Tools Widget */}
            <div className="mt-12 font-sans">
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
          </div>

          {/* Sidebar Area */}
          <aside className="w-full lg:w-80 shrink-0 space-y-8 font-sans">
            <AIOContextButton 
              toolName={tool.name} 
              description={tool.content?.description || ''} 
              features={tool.content?.features || []} 
            />
            <RelatedToolsSidebar relatedTools={relatedTools} />
            <ProBannerCTA />
            <div className="p-8 bg-gradient-to-br from-[#00D4B4] to-[#0094FF] rounded-[8px] text-[#0B1120] shadow-xl shadow-blue-500/10">
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
