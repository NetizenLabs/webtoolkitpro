'use client'

import React from 'react'
import { CheckCircle2, Info, Zap, Shield, HelpCircle } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

interface ToolInfoProps {
  title: string
  howItWorks: string
  features: string[]
  faqs: { q: string; a: string }[]
  technicalSpecs?: { label: string; value: string }[]
  practicalApplication?: string
  codeBlueprints?: { language: string; code: string; title?: string }[]
}

export default function ToolInfo({ title, features, faqs, howItWorks, technicalSpecs, practicalApplication, codeBlueprints }: ToolInfoProps) {
  return (
    <div className="mt-24 space-y-24">
      {/* Description & Features */}
      <section className={`grid grid-cols-1 ${features && features.length > 0 ? 'lg:grid-cols-2' : ''} gap-16`}>
        <div>
          <SectionHeading number="01" title={`How ${title} Works`} className="mb-8" />
          <div className="bg-gray-50 dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] p-8 rounded-[12px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-[#00D4B4]/5 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <p className="text-sm text-gray-700 dark:text-[#8A9BBE] leading-relaxed relative z-10">
              {howItWorks}
            </p>
          </div>
        </div>

        {features && features.length > 0 && (
          <div>
            <SectionHeading number="02" title={`Key Features of ${title}`} className="mb-8" as="h3" />
            <div className="grid grid-cols-1 gap-4">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-4 p-5 bg-gray-50 dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-[12px] group hover:border-blue-500/30 dark:hover:border-[#00D4B4]/30 transition-all">
                  <CheckCircle2 className="w-5 h-5 text-blue-500 dark:text-[#00D4B4] shrink-0 mt-0.5" strokeWidth={1.5} />
                  <span className="text-sm text-gray-900 dark:text-[#F0F6FF] font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Practical Application & Code Blueprints */}
      {(practicalApplication || (codeBlueprints && codeBlueprints.length > 0)) && (
        <section className="mt-24">
          <SectionHeading number="03" title={`Practical Application & Code Integration`} className="mb-12" as="h3" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {practicalApplication && (
              <div>
                <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] p-8 rounded-[12px] shadow-sm">
                  <h4 className="font-bold text-gray-900 dark:text-white text-lg mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-500 dark:text-[#00D4B4]" strokeWidth={2} />
                    Use-Case Context
                  </h4>
                  <div className="text-sm text-gray-700 dark:text-[#8A9BBE] leading-relaxed whitespace-pre-wrap">
                    {practicalApplication}
                  </div>
                </div>
              </div>
            )}

            {codeBlueprints && codeBlueprints.length > 0 && (
              <div className="space-y-6">
                {codeBlueprints.map((bp, i) => (
                  <div key={i} className="bg-gray-900 rounded-[12px] overflow-hidden border border-gray-800 shadow-xl shadow-black/20">
                    <div className="bg-black/40 px-4 py-2 border-b border-gray-800 flex justify-between items-center">
                      <span className="text-xs font-mono text-gray-400">{bp.title || bp.language.toUpperCase()}</span>
                    </div>
                    <div className="p-4 overflow-x-auto">
                      <pre className="text-sm font-mono text-gray-300">
                        <code>{bp.code}</code>
                      </pre>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section>
        <SectionHeading number="03" title={`Common Questions About ${title}`} className="mb-12" as="h3" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          {faqs.map((faq, i) => (
            <article key={i} className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] p-8 rounded-[24px] hover:border-blue-500/20 dark:hover:border-[#00D4B4]/20 transition-all shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-4 tracking-tight">{faq.q}</h3>
              <div>
                <p className="text-sm text-gray-600 dark:text-[#8A9BBE] leading-relaxed">{faq.a}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Technical Engine Specs */}
      {technicalSpecs && (
        <section>
          <SectionHeading number="04" title={`${title} Utility Performance Specs`} className="mb-12" as="h3" />
          <div className="bg-gray-50 dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] p-8 md:p-12 rounded-[24px] relative overflow-hidden group max-w-4xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/5 dark:from-[#00D4B4]/10 dark:to-[#0094FF]/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 relative z-10">
              {technicalSpecs.map((spec, i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-gray-200 dark:border-[#1E2D47]/50">
                  <span className="text-sm text-gray-500 dark:text-[#8A9BBE] font-medium">{spec.label}</span>
                  <span className="text-sm text-blue-600 dark:text-[#00D4B4] font-bold font-mono tracking-wider">{spec.value}</span>
                </div>
              ))}
            </div>
            <p className="mt-10 text-[10px] font-mono text-gray-400 dark:text-[#4A6080] leading-relaxed uppercase tracking-widest">
              {"// All processing occurs locally in your browser. WebToolkit Pro does not transmit, store, or log your input data."}
            </p>
          </div>
        </section>
      )}

      {/* Navigation Back Home */}
      <section className="pt-16 border-t border-gray-100 dark:border-[#1E2D47]/30 flex flex-col items-center">
        <p className="text-gray-500 dark:text-[#8A9BBE] text-sm mb-6 font-medium">Looking for more professional developer utilities?</p>
        <a 
          href="/" 
          className="px-8 py-4 bg-gray-900 dark:bg-[#0D1526] border border-gray-800 dark:border-[#1E2D47] rounded-[16px] text-white dark:text-[#00D4B4] font-bold text-xs uppercase tracking-[0.2em] hover:scale-105 transition-all flex items-center gap-3 shadow-2xl shadow-blue-500/10 group"
        >
          <Zap className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" /> 
          Explore All WebToolkit Pro Tools
        </a>
      </section>
    </div>
  )
}
