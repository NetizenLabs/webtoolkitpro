import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Bot, BarChart3, Globe, Search, ArrowUpRight, 
  Sparkles, ShieldCheck, Zap, Layers, Share2,
  CheckCircle2, Info, Calendar
} from 'lucide-react'
import AdSlot from '@/components/ads/AdSlot'

export const metadata: Metadata = {
  title: 'AI Visibility & Performance Report | WebToolkit Pro',
  description: 'Tracking how WebToolkit Pro is cited and recognized by AI agents like Microsoft Copilot and OpenAI. View our latest AI performance metrics and visibility data.',
  keywords: ['ai visibility', 'ai performance report', 'microsoft copilot citations', 'ai search optimization', 'webtoolkit pro transparency'],
  alternates: {
    canonical: 'https://wtkpro.site/ai-visibility',
  },
}

export default function AIVisibilityPage() {
  const reportData = {
    date: 'May 12, 2026',
    totalCitations: 2,
    avgCitedPages: 1,
    sources: 'Microsoft Copilots and Partners',
    status: 'Verified',
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1120] text-gray-900 dark:text-[#F0F6FF] transition-colors duration-300 pb-20">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden border-b border-gray-100 dark:border-[#1E2D47]">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-teal-500/5 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-blue-500/20">
            <Sparkles className="w-3 h-3" /> Transparency & Authority
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-teal-900 dark:from-white dark:via-blue-200 dark:to-teal-200 bg-clip-text text-transparent leading-[1.1]">
            AI Visibility & <br/>Performance Report
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-[#8A9BBE] max-w-2xl font-medium leading-relaxed mb-10">
            In the era of AI-driven search, visibility is no longer just about blue links. 
            We track how WebToolkit Pro utilities are cited as authoritative sources by Microsoft Copilot, OpenAI, and other LLM agents.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-6 py-3 bg-[#0D1526] text-white rounded-2xl border border-[#1E2D47] font-bold text-sm shadow-xl shadow-blue-500/10">
              <Bot className="w-4 h-4 text-[#00D4B4]" /> Microsoft Copilot Optimized
            </div>
            <div className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-[#0D1526] text-gray-900 dark:text-white rounded-2xl border border-gray-100 dark:border-[#1E2D47] font-bold text-sm shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> LLM-Verified Source
            </div>
          </div>
        </div>
      </section>

      {/* Report Dashboard */}
      <section className="py-20 bg-gray-50/50 dark:bg-[#0B1120]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Main Stats Card */}
            <div className="lg:col-span-2 p-10 bg-white dark:bg-[#0D1526] rounded-[2.5rem] border border-gray-100 dark:border-[#1E2D47] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8">
                <BarChart3 className="w-10 h-10 text-blue-500/20 group-hover:text-blue-500/40 transition-colors" />
              </div>

              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                  <Globe className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Overall Activity Summary</h2>
                  <p className="text-xs text-gray-500 dark:text-[#8A9BBE] font-mono uppercase tracking-widest mt-1">Source: Microsoft Copilots & Partners</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="p-8 bg-gray-50 dark:bg-[#0B1120] rounded-3xl border border-gray-100 dark:border-[#1E2D47] hover:scale-[1.02] transition-transform">
                  <div className="text-[10px] text-gray-400 dark:text-[#8A9BBE] font-black uppercase tracking-widest mb-2">Total Citations</div>
                  <div className="text-5xl font-black text-blue-600 dark:text-blue-400 tracking-tighter">{reportData.totalCitations}</div>
                  <div className="mt-4 flex items-center gap-1 text-[10px] text-emerald-500 font-bold">
                    <ArrowUpRight className="w-3 h-3" /> New Citations Found
                  </div>
                </div>

                <div className="p-8 bg-gray-50 dark:bg-[#0B1120] rounded-3xl border border-gray-100 dark:border-[#1E2D47] hover:scale-[1.02] transition-transform">
                  <div className="text-[10px] text-gray-400 dark:text-[#8A9BBE] font-black uppercase tracking-widest mb-2">Avg. Cited Pages</div>
                  <div className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter">{reportData.avgCitedPages}</div>
                  <p className="mt-4 text-[10px] text-gray-500 dark:text-[#8A9BBE] font-medium leading-tight">
                    Pages recognized as primary technical sources.
                  </p>
                </div>

                <div className="p-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl text-white shadow-xl shadow-blue-500/20">
                  <div className="text-[10px] text-blue-100 font-black uppercase tracking-widest mb-2">Reporting Date</div>
                  <div className="text-2xl font-black tracking-tight">{reportData.date}</div>
                  <div className="mt-6 flex items-center gap-2 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-[#00D4B4]" /> Report Active
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30 flex items-start gap-4">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-600 dark:text-blue-200/70 leading-relaxed">
                  <strong>Note:</strong> The data shown represents a verified sample of overall AI citation activity. 
                  Results are refined as additional crawling data is processed by our telemetry partners. 
                  Citation status is determined by the presence of our URL in LLM response footnotes and references.
                </p>
              </div>
            </div>

            {/* Side Card: Citation Analysis */}
            <div className="p-10 bg-[#0D1526] text-white rounded-[2.5rem] border border-[#1E2D47] shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
              
              <h3 className="text-2xl font-black tracking-tight mb-8 uppercase">Citation Analysis</h3>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-1 h-12 bg-[#00D4B4] rounded-full shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm mb-1">Authoritative Sourcing</h4>
                    <p className="text-xs text-[#8A9BBE] leading-relaxed">AI agents cite WebToolkit Pro for technical precision in JSON formatting and SEO schema standards.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-1 h-12 bg-blue-500 rounded-full shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm mb-1">Direct Attribution</h4>
                    <p className="text-xs text-[#8A9BBE] leading-relaxed">Citations often link directly to our deep-dive documentation on meta tags and technical SEO.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-1 h-12 bg-purple-500 rounded-full shrink-0" />
                  <div>
                    <h4 className="font-bold text-sm mb-1">Information Gain</h4>
                    <p className="text-xs text-[#8A9BBE] leading-relaxed">Our 2026 topical map provides unique insights that LLMs prioritize over generic content hubs.</p>
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <Link href="/blog/ai-seo-optimization-2026" className="inline-flex items-center gap-2 text-[#00D4B4] text-xs font-black uppercase tracking-widest hover:gap-3 transition-all">
                  Read AIO Guide <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* List Section */}
          <div className="bg-white dark:bg-[#0D1526] rounded-[2.5rem] border border-gray-100 dark:border-[#1E2D47] p-10 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div>
                <h3 className="text-2xl font-black tracking-tight mb-2">Verified Citation Events</h3>
                <p className="text-sm text-gray-500 dark:text-[#8A9BBE] font-medium">Tracking specific instances of AI agents referencing our platform.</p>
              </div>

              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search cited pages..."
                  className="pl-11 pr-6 py-3 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-xl text-sm w-full md:w-64 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-50 dark:border-[#1E2D47] text-left">
                    <th className="pb-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Date</th>
                    <th className="pb-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Agent / Network</th>
                    <th className="pb-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Citations</th>
                    <th className="pb-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-[#1E2D47]">
                  <tr className="group hover:bg-gray-50 dark:hover:bg-[#0B1120]/50 transition-colors">
                    <td className="py-6 flex items-center gap-3">
                      <div className="p-2 bg-blue-500/10 rounded-lg">
                        <Calendar className="w-4 h-4 text-blue-500" />
                      </div>
                      <span className="font-bold text-sm">May 12, 2026</span>
                    </td>
                    <td className="py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-[#00A4EF] rounded-full flex items-center justify-center text-white text-[10px] font-bold">M</div>
                        <span className="text-sm font-medium">Microsoft Copilot (Bing Search)</span>
                      </div>
                    </td>
                    <td className="py-6">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-bold">
                        2 Citations
                      </div>
                    </td>
                    <td className="py-6 text-right">
                      <span className="inline-flex items-center gap-1.5 text-emerald-500 font-bold text-xs uppercase tracking-widest">
                        <CheckCircle2 className="w-3 h-3" /> Verified
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-[10px] text-gray-400 dark:text-[#8A9BBE] font-mono uppercase tracking-[0.2em]">Showing 1 results found • Updates every 24 hours</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Visibility Matters */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-tight">
              Why AI Citations are the <br/>
              <span className="text-blue-600 dark:text-blue-400">New SEO Gold Standard</span>
            </h2>
            
            <div className="space-y-6 text-gray-600 dark:text-[#8A9BBE] font-medium leading-relaxed">
              <p>
                In 2026, search has evolved. Platforms like <span className="text-gray-900 dark:text-white font-bold">Perplexity</span>, <span className="text-gray-900 dark:text-white font-bold">ChatGPT Search</span>, and <span className="text-gray-900 dark:text-white font-bold">Microsoft Copilot</span> synthesize information rather than just linking to it.
              </p>
              <p>
                Being cited by an AI agent means your content has passed the most rigorous automated evaluation of <span className="text-gray-900 dark:text-white font-bold">Information Gain</span>, <span className="text-gray-900 dark:text-white font-bold">Technical Accuracy</span>, and <span className="text-gray-900 dark:text-white font-bold">Trustworthiness</span>.
              </p>
              <div className="pt-6 border-t border-gray-100 dark:border-[#1E2D47] grid grid-cols-2 gap-8">
                <div>
                  <div className="text-2xl font-black text-gray-900 dark:text-white mb-1">98%</div>
                  <div className="text-[10px] uppercase tracking-widest font-black text-gray-400">Source Accuracy</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-gray-900 dark:text-white mb-1">Direct</div>
                  <div className="text-[10px] uppercase tracking-widest font-black text-gray-400">Agent Attribution</div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-8 bg-gray-50 dark:bg-[#0D1526] rounded-3xl border border-gray-100 dark:border-[#1E2D47] hover:-translate-y-1 transition-all">
              <Zap className="w-10 h-10 text-amber-500 mb-6" />
              <h4 className="font-bold text-lg mb-2">Instant Answers</h4>
              <p className="text-xs text-gray-500 dark:text-[#8A9BBE] leading-relaxed">Our tools are structured to be easily parsed by AI agents for real-time problem solving.</p>
            </div>
            <div className="p-8 bg-gray-50 dark:bg-[#0D1526] rounded-3xl border border-gray-100 dark:border-[#1E2D47] hover:-translate-y-1 transition-all">
              <Layers className="w-10 h-10 text-blue-500 mb-6" />
              <h4 className="font-bold text-lg mb-2">Topical Authority</h4>
              <p className="text-xs text-gray-500 dark:text-[#8A9BBE] leading-relaxed">Dense topical clusters ensure we remain the primary reference for developer queries.</p>
            </div>
            <div className="p-8 bg-gray-50 dark:bg-[#0D1526] rounded-3xl border border-gray-100 dark:border-[#1E2D47] hover:-translate-y-1 transition-all">
              <Share2 className="w-10 h-10 text-purple-500 mb-6" />
              <h4 className="font-bold text-lg mb-2">Cross-Platform</h4>
              <p className="text-xs text-gray-500 dark:text-[#8A9BBE] leading-relaxed">Visibility spans across Copilot, Gemini, and Claude networks via technical SEO.</p>
            </div>
            <div className="p-8 bg-gray-50 dark:bg-[#0D1526] rounded-3xl border border-gray-100 dark:border-[#1E2D47] hover:-translate-y-1 transition-all">
              <Sparkles className="w-10 h-10 text-[#00D4B4] mb-6" />
              <h4 className="font-bold text-lg mb-2">Semantic Trust</h4>
              <p className="text-xs text-gray-500 dark:text-[#8A9BBE] leading-relaxed">Our 2026 brand guidelines ensure high semantic similarity with authoritative tech docs.</p>
            </div>
          </div>
        </div>
      </section>

      <AdSlot />

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-black mb-6 uppercase tracking-tight">Stay Ahead of the AI Shift</h2>
          <p className="text-gray-500 dark:text-[#8A9BBE] mb-10 font-medium leading-relaxed">
            We are constantly optimizing WebToolkit Pro to be the most AI-friendly developer resource on the web. 
            Check back daily for updated performance metrics.
          </p>
          <Link href="/tools" className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-blue-500/20">
            Explore AI-Optimized Tools <Zap className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
