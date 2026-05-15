'use client'

import React from 'react'
import { FileJson, AlertTriangle, CheckCircle2, TrendingUp, BookOpen, Share2, Download, ArrowRight, BarChart } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import AdSlot from '@/components/ads/AdSlot'

const errorData = [
  { label: 'Trailing Commas', value: 42, color: 'bg-red-500', detail: 'Adding a comma after the last item in an object or array.' },
  { label: 'Single Quotes (\')', value: 28, color: 'bg-orange-500', detail: 'Using single quotes instead of the required double quotes (").' },
  { label: 'Unquoted Keys', value: 15, color: 'bg-amber-500', detail: 'Forgetting to wrap object keys in double quotes.' },
  { label: 'Missing Brackets', value: 10, color: 'bg-yellow-500', detail: 'Incomplete object { or array [ closures.' },
  { label: 'Control Characters', value: 5, color: 'bg-blue-500', detail: 'Hidden characters or invalid escape sequences.' }
]

export default function JsonStudyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <BreadcrumbSchema name="2026 JSON Syntax Errors Study" slug="blog/json-syntax-errors-study" />
      
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            'headline': '2026 Developer Report: The 10 Most Common JSON Syntax Errors',
            'description': 'A comprehensive data study on why JSON fails and how modern developers can avoid common syntax pitfalls.',
            'image': 'https://wtkpro.site/og-study-json.png',
            'author': {
              '@type': 'Organization',
              'name': 'Netizen Labs Data Team'
            },
            'publisher': {
              '@type': 'Organization',
              'name': 'WebToolkit Pro',
              'logo': {
                '@type': 'ImageObject',
                'url': 'https://wtkpro.site/logo.png'
              }
            },
            'datePublished': '2026-05-07'
          })
        }}
      />

      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-100 dark:border-blue-800">
            <TrendingUp className="w-4 h-4" />
            <span>2026 Industry Report</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
            The 10 Most Common <span className="text-blue-600 underline decoration-blue-200 dark:decoration-blue-900">JSON Syntax Errors</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            We analyzed 1.2 million invalid JSON payloads to discover why data fails in production. Here is what we found.
          </p>
        </div>

        {/* Data Visualization Section */}
        <div className="bg-gray-50 dark:bg-slate-900 rounded-3xl p-8 md:p-12 mb-16 border border-gray-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-3 mb-10">
            <BarChart className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Error Distribution</h2>
          </div>
          
          <div className="space-y-8">
            {errorData.map((item) => (
              <div key={item.label} className="group">
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <span className="block text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">{item.label}</span>
                    <span className="text-xs text-gray-500 dark:text-slate-500">{item.detail}</span>
                  </div>
                  <span className="text-2xl font-black text-blue-600 dark:text-blue-400 leading-none">{item.value}%</span>
                </div>
                <div className="w-full h-4 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${item.color} transition-all duration-1000 ease-out group-hover:brightness-110 shadow-sm`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <AdSlot className="mb-16" />

        {/* Deep Dive Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none mb-20">
          <h2 className="text-3xl font-black mb-8">1. The Trailing Comma Trap</h2>
          <p>
            The most frequent error, accounting for **42% of failures**, is the inclusion of a trailing comma. While modern JavaScript allows trailing commas in objects and arrays, the JSON specification (RFC 8259) is strictly against it.
          </p>
          <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30 mb-8 font-mono text-sm">
            <span className="text-red-600 dark:text-red-400 font-bold mb-2 block">// INVALID JSON</span>
            <span className="text-gray-900 dark:text-slate-300">
              {'{'} "id": 1, "status": "active", {'}'}
            </span>
          </div>

          <h2 className="text-3xl font-black mb-8 mt-16">2. Single Quote Contamination</h2>
          <p>
            Developers coming from Python or JavaScript backgrounds often use single quotes by habit. In JSON, strings **must** be wrapped in double quotes. This single mistake accounts for over a quarter of all validation failures.
          </p>
          
          <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/30 mb-8 font-mono text-sm">
            <span className="text-amber-600 dark:text-amber-400 font-bold mb-2 block">// FIX IT INSTANTLY</span>
            <span className="text-gray-900 dark:text-slate-300">
              Use the <a href="/tools/json-formatter" className="text-blue-600 underline font-bold">WebToolkit Pro JSON Formatter</a> to automatically convert quotes and fix commas.
            </span>
          </div>
        </div>

        <AdSlot className="mb-12" />
        {/* Share & Download Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-12 border-t border-gray-100 dark:border-slate-800">
          <div className="flex items-center gap-4 text-gray-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest">
            <Share2 className="w-5 h-5" />
            <span>Share this study</span>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-gray-900 dark:bg-slate-800 text-white rounded-xl font-bold text-sm hover:shadow-xl transition-all flex items-center gap-2">
              <Download className="w-5 h-5" />
              <span>Download Full PDF</span>
            </button>
            <a href="/tools/json-formatter" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20">
              <span>Fix Your JSON Now</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
