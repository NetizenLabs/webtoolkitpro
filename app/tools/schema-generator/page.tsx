'use client'

import React, { useState } from 'react'
import { Code, Copy, CheckCircle2, RefreshCw, Trash2, ArrowRight, Database } from 'lucide-react'
import Link from 'next/link'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'
import ToolInfo from '@/components/sections/ToolInfo'
import AdSlot from '@/components/ads/AdSlot'

export default function SchemaGenerator() {
  const [type, setType] = useState('Organization')
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [copied, setCopied] = useState(false)

  const generateSchema = () => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': type,
      'name': name,
      'url': url,
      'description': description
    }
    return JSON.stringify(schema, null, 2)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateSchema())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearAll = () => {
    setName('')
    setUrl('')
    setDescription('')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="JSON-LD Schema Generator" slug="tools/schema-generator" />
      <ToolSchema 
        name="JSON-LD Schema Generator" 
        description="Generate structured data for your website using JSON-LD. Improve search visibility, rich snippets, and SEO rankings."
        slug="schema-generator"
        steps={[
          "Select the schema type (Organization, Website, LocalBusiness, etc.).",
          "Fill in the required fields like Name, URL, and Description.",
          "Review the generated JSON-LD script block in the output window.",
          "Copy and paste the script into the <head> section of your HTML."
        ]}
      />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4 text-left">
            <div className="p-4 bg-emerald-600 rounded-2xl shadow-lg shadow-emerald-600/20">
              <Code className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">JSON-LD Schema Generator</h1>
              <p className="text-gray-500 dark:text-slate-400">Earn rich snippets and enhance search visibility with structured data</p>
            </div>
          </div>
          
          <button 
            onClick={clearAll}
            className="flex items-center gap-2 px-6 py-3 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-xl font-bold text-sm hover:bg-red-100 dark:hover:bg-red-900/20 transition-all border border-red-100 dark:border-red-900/30"
          >
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Configuration */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm">
              <h2 className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-8 flex items-center gap-2">
                <RefreshCw className="w-4 h-4" /> Schema Parameters
              </h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase mb-3 px-1">Schema Type</label>
                  <select 
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-transparent rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white font-bold"
                  >
                    <option>Organization</option>
                    <option>WebSite</option>
                    <option>LocalBusiness</option>
                    <option>Person</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase mb-3 px-1">Entity Name</label>
                  <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., WebToolkit Pro"
                    className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-transparent rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase mb-3 px-1">Primary URL</label>
                  <input 
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://wtkpro.site"
                    className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-transparent rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase mb-3 px-1">Meta Description</label>
                  <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Technical overview of your organization..."
                    rows={3}
                    className="w-full px-5 py-4 bg-gray-50 dark:bg-slate-800 border border-transparent rounded-2xl focus:ring-2 focus:ring-emerald-500 outline-none transition-all dark:text-white resize-none"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-900/30">
              <p className="text-xs text-emerald-700 dark:text-emerald-400 leading-relaxed italic">
                <strong>Pro Tip:</strong> Google uses JSON-LD to understand the context of your site. Adding this code to your <code>&lt;head&gt;</code> can result in high-authority rich snippets.
              </p>
            </div>
          </div>

          {/* Output Area */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl shadow-emerald-900/5 p-8 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6 px-2">
                <h2 className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">JSON-LD Script Block</h2>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-5 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy Block'}
                </button>
              </div>
              <pre className="flex-grow p-6 bg-gray-900 dark:bg-slate-950 rounded-3xl border border-gray-800 dark:border-slate-800 text-xs font-mono text-emerald-400 overflow-auto shadow-inner">
                {generateSchema()}
              </pre>
            </div>
          </div>
        </div>

        {/* Data Insight Footer */}
        <div className="bg-emerald-600 rounded-[3rem] p-10 text-white relative overflow-hidden group mb-16 shadow-xl shadow-emerald-500/20">
          <Database className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold mb-4">Semantic Web Authority</h3>
              <p className="text-emerald-100 text-sm leading-relaxed">
                Structured data is the bridge between your content and AI search engines. Implementing robust Schema Markup ensures your technical assets are correctly indexed by LLMs and search crawlers.
              </p>
            </div>
            <Link 
              href="/tools/sitemap-validator/"
              className="inline-flex items-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all hover:-translate-y-1 whitespace-nowrap"
            >
              Validate Sitemap <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <AdSlot />

        <ToolInfo 
          title="JSON-LD Schema Generator"
          description="The WebToolkit Pro JSON-LD Schema Generator is a powerful tool for creating structured data that search engines can easily understand. JSON-LD (JavaScript Object Notation for Linked Data) is the recommended format by Google for implementing schema markup, which can lead to enhanced search results known as 'Rich Snippets'."
          howItWorks="Our tool allows you to input data for various entity types defined by Schema.org. It then formats this data into a standardized JSON-LD script. When search engine bots crawl your page, they parse this script to gain a deeper understanding of your site's content, which can improve your visibility in search results and AI-driven answer engines."
          features={[
            "Support for major schema types (Organization, WebSite, etc.)",
            "Real-time JSON-LD script generation and formatting",
            "Optimized for Google's Rich Results standards",
            "Clean, minified output for faster page loads",
            "No-code interface for complex structured data",
            "100% Client-side processing for data privacy"
          ]}
          faqs={[
            {
              q: "What is JSON-LD?",
              a: "JSON-LD stands for JavaScript Object Notation for Linked Data. It's a method of encoding structured data using JSON, making it easier for search engines to process."
            },
            {
              q: "What are Rich Snippets?",
              a: "Rich snippets are enhanced search results that display extra information like ratings, prices, or company logos. They often have higher click-through rates than standard results."
            },
            {
              q: "Where should I put the schema code?",
              a: "Google recommends placing the JSON-LD script within the <head> section of your HTML, but it can also be placed anywhere in the <body>."
            },
            {
              q: "Does schema markup improve rankings?",
              a: "While it's not a direct ranking factor, schema markup helps search engines understand your site better, which can lead to better visibility and higher click-through rates."
            }
          ]}
        />
      </div>
    </div>
  )
}
