'use client'

import React from 'react'
import { CheckCircle2, HelpCircle, Info } from 'lucide-react'

interface ToolInfoProps {
  title: string
  description: string
  features: string[]
  faqs: { q: string; a: string }[]
  howItWorks: string
}

export default function ToolInfo({ title, description, features, faqs, howItWorks }: ToolInfoProps) {
  return (
    <div className="mt-20 space-y-20">
      {/* Description & Features */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Info className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">About {title}</h2>
          </div>
          <p className="text-lg text-gray-500 dark:text-slate-400 leading-relaxed mb-8">
            {description}
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-3xl border border-blue-100 dark:border-blue-800">
            <h3 className="font-bold text-blue-900 dark:text-blue-400 mb-4 uppercase tracking-widest text-xs">How it works</h3>
            <p className="text-sm text-blue-800 dark:text-slate-300 leading-relaxed">
              {howItWorks}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Key Features</h3>
          <div className="grid grid-cols-1 gap-4">
            {features.map((feature, i) => (
              <div key={i} className="flex items-start gap-4 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-600 dark:text-slate-300 font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 dark:bg-slate-900/50 rounded-[3rem] p-10 md:p-16 border border-gray-100 dark:border-slate-800">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
            <HelpCircle className="w-4 h-4" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {faqs.map((faq, i) => (
            <div key={i} className="space-y-3">
              <h4 className="font-bold text-gray-900 dark:text-white text-lg">{faq.q}</h4>
              <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
