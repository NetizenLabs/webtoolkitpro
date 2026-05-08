'use client'

import React, { useState } from 'react'
import { FileText, Copy, CheckCircle2, Info, Layout, ShoppingCart, Cpu, Globe, AlertTriangle, Terminal } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'
import ToolInfo from '@/components/sections/ToolInfo'
import AdSlot from '@/components/ads/AdSlot'

const templates = [
  {
    id: 'nextjs',
    name: 'Enterprise Next.js (App Router)',
    icon: Cpu,
    description: 'Optimized for modern Next.js 13+ applications with App Router and static export.',
    content: `User-agent: *
Allow: /
Disallow: /_next/
Disallow: /404/
Disallow: /api/

# Block common scrapers
User-agent: GPTBot
Disallow: /

Sitemap: https://yourdomain.com/sitemap.xml`,
    highlights: ['Blocks internal build files', 'Protects API routes', 'Blocks AI crawlers']
  },
  {
    id: 'wordpress',
    name: 'Advanced WordPress SEO',
    icon: Layout,
    description: 'Hardened config for WordPress sites using Yoast or RankMath.',
    content: `User-agent: *
Allow: /
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php
Disallow: /wp-login.php
Disallow: /wp-content/plugins/
Disallow: /readme.html
Disallow: /refer/

Sitemap: https://yourdomain.com/sitemap_index.xml`,
    highlights: ['Protects admin areas', 'Allows AJAX functionality', 'Blocks plugin directory leakage']
  },
  {
    id: 'ecommerce',
    name: 'High-Authority E-commerce',
    icon: ShoppingCart,
    description: 'Global template for Shopify, Magento, or custom e-commerce platforms.',
    content: `User-agent: *
Allow: /
Disallow: /cart/
Disallow: /checkout/
Disallow: /account/
Disallow: /search/
Disallow: /orders/
Disallow: /*?*filter*
Disallow: /*?*sort*

Sitemap: https://yourdomain.com/sitemap_products.xml`,
    highlights: ['Prevents duplicate facet content', 'Protects checkout flow', 'Blocks search results index']
  },
  {
    id: 'minimal',
    name: 'Strict Technical Minimalist',
    icon: Terminal,
    description: 'Maximum crawl budget efficiency for content-heavy sites.',
    content: `User-agent: *
Allow: /
Disallow: /temp/
Disallow: /staging/
Disallow: /drafts/

User-agent: Googlebot
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml`,
    highlights: ['Optimizes crawl budget', 'Protects staging environments', 'Prioritizes Googlebot']
  }
]

export default function RobotsTemplates() {
  const [activeTab, setActiveTab] = useState('nextjs')
  const [copied, setCopied] = useState(false)

  const activeTemplate = templates.find(t => t.id === activeTab) || templates[0]

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTemplate.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-slate-950/50 min-h-screen">
      <BreadcrumbSchema name="Enterprise robots.txt Templates" slug="tools/robots-txt-templates" />
      <ToolSchema 
        name="Enterprise robots.txt Generator & Templates" 
        description="Access battle-tested robots.txt templates for Next.js, WordPress, and E-commerce. Optimize your crawl budget and manage AI bot access."
        slug="robots-txt-templates"
        steps={[
          "Select your platform (Next.js, WordPress, or E-commerce) from the sidebar.",
          "Review the optimized robots.txt content in the code editor.",
          "Copy the generated code and replace 'yourdomain.com' with your actual URL.",
          "Upload the robots.txt file to your website's root directory."
        ]}
      />
      
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-14 h-14 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Enterprise robots.txt Templates</h1>
            <p className="text-gray-500 dark:text-slate-400">Battle-tested configurations for professional SEO & technical authority</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Tabs */}
          <div className="lg:col-span-4 space-y-3">
            {templates.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 group ${
                  activeTab === t.id 
                    ? 'bg-white dark:bg-slate-900 border-orange-200 dark:border-orange-900/30 shadow-md ring-1 ring-orange-100 dark:ring-orange-900/10' 
                    : 'bg-transparent border-transparent hover:bg-white/50 dark:hover:bg-slate-900/50 text-gray-500'
                }`}
              >
                <div className="flex items-center gap-3">
                  <t.icon className={`w-5 h-5 ${activeTab === t.id ? 'text-orange-600' : 'text-gray-400 group-hover:text-orange-500'}`} />
                  <div>
                    <div className={`font-bold text-sm ${activeTab === t.id ? 'text-gray-900 dark:text-white' : 'text-gray-500 dark:text-slate-400'}`}>
                      {t.name}
                    </div>
                  </div>
                </div>
              </button>
            ))}
            
            <div className="mt-8">
              <AdSlot />
            </div>
          </div>

          {/* Template Content */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-50 dark:border-slate-800 flex items-center justify-between bg-gray-50/50 dark:bg-slate-900/50">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                  <Globe className="w-4 h-4" /> Production-Ready Config
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 text-xs font-bold rounded-xl border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-all shadow-sm"
                >
                  {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
              
              <div className="p-8">
                <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                  {activeTemplate.description}
                </p>
                
                <div className="relative">
                  <pre className="bg-slate-950 text-slate-200 p-8 rounded-2xl text-sm font-mono leading-relaxed overflow-x-auto border border-slate-800 shadow-inner">
                    {activeTemplate.content}
                  </pre>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {activeTemplate.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-gray-500 dark:text-slate-500 uppercase tracking-wider bg-gray-50 dark:bg-slate-800/50 px-3 py-2 rounded-lg border border-gray-100 dark:border-slate-800">
                      <CheckCircle2 className="w-3 h-3 text-orange-500" /> {h}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-3xl border border-amber-100 dark:border-amber-900/30">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 mb-3 font-bold">
                <AlertTriangle className="w-5 h-5" />
                Technical Warning
              </div>
              <p className="text-sm text-amber-700/80 dark:text-amber-400/80 leading-relaxed">
                Always replace <strong>yourdomain.com</strong> with your actual production URL. Misconfiguring your robots.txt can lead to immediate de-indexing of your entire site.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Why block AI bots?</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
                Bots like GPTBot crawl your site to train models. If you want to protect your unique data or research from being used without attribution, blocking them in robots.txt is the standard procedure.
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">What is a Crawl Budget?</h3>
              <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
                Google allocates a specific amount of time to crawl your site. By blocking useless pages (like search results or cart pages), you ensure Google spends its time on your valuable articles and tools.
              </p>
            </div>
          </div>
        </div>

        <AdSlot className="mt-16" />

        <ToolInfo 
          title="Enterprise robots.txt Templates"
          description="The WebToolkit Pro Robots.txt Templates are a curated collection of production-ready configurations designed for high-authority domains. A well-configured robots.txt file is the cornerstone of technical SEO, directing search engine crawlers away from thin content and build artifacts toward your most valuable pages."
          howItWorks="Our templates are built based on 2026 technical SEO standards, specifically addressing modern challenges like AI crawler management (GPTBot, CCBot) and Next.js internal build file protection. Each template uses the Robots Exclusion Protocol (REP) to define explicit Allow/Disallow rules for different User-agents, ensuring maximum efficiency for your site's crawl budget."
          features={[
            "Specialized templates for Next.js, WordPress, and E-commerce",
            "Built-in AI bot protection and crawler management",
            "Sitemap declaration integration",
            "Crawl budget optimization strategies",
            "Real-time code copying and preview",
            "100% Free: Expert configurations for all webmasters"
          ]}
          faqs={[
            {
              q: "What is a robots.txt file?",
              a: "Robots.txt is a text file webmasters create to instruct web robots (typically search engine robots) how to crawl pages on their website. It is part of the Robots Exclusion Protocol (REP)."
            },
            {
              q: "Does robots.txt hide pages from search?",
              a: "No. Robots.txt only prevents crawling. To hide a page from search results, you should use the `noindex` meta tag or header."
            },
            {
              q: "Where should the robots.txt file be located?",
              a: "The file must be placed in the top-level directory (root) of your website host. For example: `https://example.com/robots.txt`."
            },
            {
              q: "How do I block ChatGPT from crawling my site?",
              a: "You can use `User-agent: GPTBot` followed by `Disallow: /` in your robots.txt file to prevent OpenAI's crawler from accessing your content."
            }
          ]}
        />
      </div>
    </div>
  )
}
