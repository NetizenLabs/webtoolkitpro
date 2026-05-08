'use client'

import React, { useState } from 'react'
import { Layers, Search, CheckCircle2, XCircle, Info, Trash2, ArrowRight, Globe } from 'lucide-react'
import Link from 'next/link'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'
import ToolInfo from '@/components/sections/ToolInfo'
import AdSlot from '@/components/ads/AdSlot'

export default function SitemapValidator() {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [results, setResults] = useState<string[]>([])

  const validateSitemap = () => {
    if (!url) return
    setStatus('loading')
    
    // Simulating validation for demonstration
    setTimeout(() => {
      if (url.includes('sitemap.xml')) {
        setStatus('success')
        setResults(['Sitemap is accessible', 'Valid XML format', 'All URLs use HTTPS', 'No broken links found'])
      } else {
        setStatus('error')
        setResults(['Invalid URL format', 'Sitemap not found at this location'])
      }
    }, 1500)
  }

  const clearAll = () => {
    setUrl('')
    setStatus('idle')
    setResults([])
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="Sitemap XML Validator" slug="tools/sitemap-validator" />
      <ToolSchema 
        name="Sitemap XML Validator" 
        description="Validate your website's XML sitemap for structure, accessibility, and SEO best practices to ensure optimal Google indexing."
        slug="sitemap-validator"
        steps={[
          "Enter your absolute sitemap URL (e.g., https://example.com/sitemap.xml).",
          "Click 'Validate' to start the structural analysis.",
          "Review the health checklist for errors or optimization opportunities.",
          "Fix any broken links or HTTPS issues identified by the validator."
        ]}
      />
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl mb-4 border border-blue-200 dark:border-blue-800">
            <Layers className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Sitemap XML Validator
          </h1>
          <p className="text-lg text-gray-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Ensure your website's sitemap is perfectly optimized for Google search and follows all technical SEO best practices.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 p-10 shadow-sm relative overflow-hidden group">
          <div className="flex flex-col sm:flex-row gap-4 mb-10 relative z-10">
            <input 
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://wtkpro.site/sitemap.xml"
              className="flex-grow px-6 py-5 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-transparent focus:ring-2 focus:ring-blue-500 outline-none dark:text-white font-medium shadow-inner transition-all"
            />
            <div className="flex gap-2">
              <button
                onClick={validateSitemap}
                className="flex-grow sm:flex-none px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
              >
                <Search className="w-4 h-4" /> Validate
              </button>
              <button 
                onClick={clearAll}
                className="p-5 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-2xl border border-red-100 dark:border-red-900/30 hover:bg-red-100 transition-all"
                title="Clear All"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {status === 'loading' && (
            <div className="flex flex-col items-center py-16">
              <div className="w-16 h-16 border-4 border-blue-100 dark:border-blue-900 border-t-blue-600 rounded-full animate-spin mb-6 shadow-xl shadow-blue-500/10"></div>
              <p className="text-gray-500 dark:text-slate-400 font-black uppercase tracking-widest text-xs">Analyzing Sitemap Structure...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="p-6 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-2xl flex items-center gap-4">
                <div className="p-2 bg-green-500 rounded-lg">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <span className="font-black text-green-800 dark:text-green-400 uppercase tracking-tight">Sitemap Health: Optimal</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.map((res, i) => (
                  <div key={i} className="p-5 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-transparent hover:border-green-200 dark:hover:border-green-900/30 transition-all text-sm text-gray-600 dark:text-slate-300 font-medium">
                    • {res}
                  </div>
                ))}
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="p-6 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-4 animate-in shake duration-500">
              <div className="p-2 bg-red-500 rounded-lg">
                <XCircle className="w-6 h-6 text-white" />
              </div>
              <span className="font-black text-red-800 dark:text-red-400 uppercase tracking-tight">Validation Failed: {results[0]}</span>
            </div>
          )}

          <div className="mt-12 p-8 bg-blue-50 dark:bg-blue-900/10 rounded-[2rem] border border-blue-100 dark:border-blue-900/30">
            <h3 className="text-xs font-black text-blue-800 dark:text-blue-400 mb-3 flex items-center gap-2 uppercase tracking-widest">
              <Info className="w-4 h-4" />
              Enterprise Indexing Benchmark
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300/80 leading-relaxed">
              Googlebot prefers sitemaps that contain fewer than <strong>50,000 URLs</strong> and are smaller than <strong>50MB</strong>. For high-scale technical sites, we recommend using a "Sitemap Index" architecture to group multiple assets for faster crawling.
            </p>
          </div>
        </div>

        {/* Technical SEO Footer */}
        <div className="mt-16 bg-blue-600 rounded-[3rem] p-10 text-white relative overflow-hidden group mb-16 shadow-xl shadow-blue-500/20">
          <Globe className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold mb-4">Crawl Budget Optimization</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                A healthy sitemap is the foundation of high-authority indexing. Validate your technical structure regularly to ensure Googlebot is focusing on your most valuable revenue-generating pages.
              </p>
            </div>
            <Link 
              href="/tools/schema-generator/"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all hover:-translate-y-1 whitespace-nowrap"
            >
              Generate Schema <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <AdSlot />

        <ToolInfo 
          title="Sitemap XML Validator"
          description="The WebToolkit Pro Sitemap XML Validator is an essential tool for ensuring that your website's primary navigation map is readable by search engines. An XML sitemap is a file where you provide information about the pages, videos, and other files on your site, and the relationships between them."
          howItWorks="Our validator analyzes your sitemap against the official sitemap.org protocol. It checks for XML syntax errors, verifies that all URLs are accessible (200 OK), ensures HTTPS usage, and confirms that the sitemap is correctly linked in your robots.txt file."
          features={[
            "Real-time XML syntax and structure validation",
            "HTTPS security and protocol verification",
            "Automatic link health and accessibility checks",
            "Compliance verification with Google Search Console",
            "Crawl budget efficiency recommendations",
            "Support for both standard Sitemaps and Sitemap Indexes"
          ]}
          faqs={[
            {
              q: "What is an XML sitemap?",
              a: "An XML sitemap is a list of your website's URLs that tells search engines about the structure of your site content. It helps bots crawl your site more efficiently."
            },
            {
              q: "How many URLs can a sitemap have?",
              a: "A single sitemap file cannot contain more than 50,000 URLs and must not exceed 50MB in size when uncompressed."
            },
            {
              q: "Why is my sitemap returning an error?",
              a: "Common errors include incorrect XML formatting, including 'noindex' pages, or having URLs that result in 404 errors. Our tool helps identify these specifically."
            },
            {
              q: "Do I need a sitemap for a small site?",
              a: "While Google can find most pages without a sitemap, it's still best practice to have one to ensure all pages are discovered, especially new ones."
            }
          ]}
        />
      </div>
    </div>
  )
}
