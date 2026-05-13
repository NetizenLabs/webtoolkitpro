'use client'

import React from 'react'
import { CheckCircle2, Info, Zap, Shield, HelpCircle } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

interface ToolInfoProps {
  title: string
  description: string
  howItWorks: string
  features: string[]
  faqs: { q: string; a: string }[]
  technicalSpecs?: { label: string; value: string }[]
}

export default function ToolInfo({ title, description, features, faqs, howItWorks, technicalSpecs }: ToolInfoProps) {
  return (
    <div className="mt-24 space-y-24">
      {/* Description & Features */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <SectionHeading number="01" title={`About ${title}`} className="mb-8" />
          <p className="text-lg text-[#8A9BBE] leading-relaxed mb-8">
            {description}
          </p>
          <div className="bg-[#0D1526] border border-[#1E2D47] p-8 rounded-[12px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D4B4]/5 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <h3 className="font-mono text-xs font-bold text-[#00D4B4] mb-4 uppercase tracking-[0.15em]">How it works</h3>
            <p className="text-sm text-[#8A9BBE] leading-relaxed relative z-10">
              {howItWorks}
            </p>
          </div>
        </div>

        <div>
          <SectionHeading number="02" title="Key Features" className="mb-8" />
          <div className="grid grid-cols-1 gap-4">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start gap-4 p-5 bg-[#0D1526] border border-[#1E2D47] rounded-[12px] group hover:border-[#00D4B4]/30 transition-all">
                <CheckCircle2 className="w-5 h-5 text-[#00D4B4] shrink-0 mt-0.5" strokeWidth={1.5} />
                <span className="text-sm text-[#F0F6FF] font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <SectionHeading number="03" title="Common Questions" className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-[#0D1526] border border-[#1E2D47] p-8 rounded-[12px] hover:border-[#00D4B4]/20 transition-all">
              <h3 className="font-bold text-white text-lg mb-4 tracking-tight">{faq.q}</h3>
              <p className="text-sm text-[#8A9BBE] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Engine Specs */}
      {technicalSpecs && (
        <section>
          <SectionHeading number="04" title="Technical Specifications" className="mb-12" />
          <div className="bg-[#0D1526] border border-[#1E2D47] p-8 md:p-12 rounded-[12px] relative overflow-hidden group max-w-4xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00D4B4]/10 to-[#0094FF]/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6 relative z-10">
              {technicalSpecs.map((spec, i) => (
                <div key={i} className="flex justify-between items-center py-4 border-b border-[#1E2D47]/50">
                  <span className="text-sm text-[#8A9BBE] font-medium">{spec.label}</span>
                  <span className="text-sm text-[#00D4B4] font-bold font-mono tracking-wider">{spec.value}</span>
                </div>
              ))}
            </div>
            <p className="mt-10 text-[10px] font-mono text-[#4A6080] leading-relaxed uppercase tracking-widest">
              // All processing occurs locally in your browser. WebToolkit Pro does not transmit, store, or log your input data.
            </p>
          </div>
        </section>
      )}

      {/* Navigation Back Home */}
      <section className="pt-16 border-t border-[#1E2D47]/30 flex flex-col items-center">
        <p className="text-[#8A9BBE] text-sm mb-6 font-medium">Looking for more professional developer utilities?</p>
        <a 
          href="/" 
          className="px-8 py-4 bg-[#0D1526] border border-[#1E2D47] rounded-[12px] text-[#00D4B4] font-bold text-xs uppercase tracking-[0.2em] hover:border-[#00D4B4]/50 transition-all flex items-center gap-3 shadow-xl shadow-blue-500/5 group"
        >
          <Zap className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" /> 
          Explore All WebToolkit Pro Tools
        </a>
      </section>
    </div>
  )
}

