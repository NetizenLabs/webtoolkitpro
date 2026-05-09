'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import {
  FileJson, Key, FileText, Link as LinkIcon, AlignLeft, Palette,
  Hash, Type, Clock, Binary, Shield, Code, Ruler, Shuffle, FileCode, Globe,
  Search, Filter, Laptop, Zap, Settings, Layout, Layers, Code2, Star,
  DollarSign, ClipboardList, TrendingDown, Activity, Share2, Server, Download
} from 'lucide-react'
import AdSlot from '@/components/ads/AdSlot'

const tools = [
  // High Priority / New
  { name: 'Pinterest Board Downloader', description: 'Download high-resolution images and boards from Pinterest in bulk', icon: Download, href: '/tools/pinterest-downloader', color: 'from-red-500 to-red-700', category: 'Utilities', releaseDate: '2026-05-08', priority: 1 },
  { name: 'What is my IP Address?', description: 'Instantly find your public IPv4/IPv6, location, and connection audit', icon: Shield, href: '/tools/what-is-my-ip', color: 'from-emerald-500 to-emerald-700', category: 'Utilities', releaseDate: '2026-05-09', priority: 2 },
  { name: 'Professional JSON Formatter', description: 'Enterprise-grade JSON formatting, validation, and beautification', icon: FileJson, href: '/tools/json-formatter', color: 'from-blue-500 to-blue-700', category: 'Formatters', priority: 3 },
  { name: 'JS Code Minifier', description: 'High-performance JavaScript compression for production deployment', icon: Code2, href: '/tools/js-minifier', color: 'from-yellow-500 to-yellow-700', category: 'Formatters', priority: 4 },
  { name: 'SEO Meta Tag Generator', description: 'Create Google-ready meta tags for high search visibility', icon: Globe, href: '/tools/meta-tag-generator', color: 'from-rose-500 to-rose-700', category: 'Generators', priority: 5 },
  
  // Generators
  { name: 'Secure Password Generator', description: 'US-standard cryptographically secure password generation tool', icon: Key, href: '/tools/password-generator', color: 'from-indigo-500 to-indigo-700', category: 'Generators', priority: 10 },
  { name: 'UUID v7 Generator', description: 'Next-gen time-ordered unique identifiers (RFC 9562)', icon: Zap, href: '/tools/uuid-v7-generator', color: 'from-lime-500 to-lime-700', category: 'Generators', priority: 10 },
  { name: 'UUID/GUID Generator', description: 'Instant RFC-compliant unique identifier generation', icon: Shuffle, href: '/tools/uuid-generator', color: 'from-lime-600 to-lime-800', category: 'Generators', priority: 10 },
  { name: 'Lorem Ipsum Generator', description: 'Professional placeholder text for designers and developers', icon: AlignLeft, href: '/tools/lorem-ipsum', color: 'from-orange-500 to-orange-700', category: 'Generators', priority: 10 },
  { name: 'Advanced Robots.txt Generator', description: 'Technical robots.txt creation for enterprise SEO management', icon: FileText, href: '/tools/robots-generator', color: 'from-orange-600 to-orange-800', category: 'Generators', releaseDate: '2026-05-05', priority: 10 },
  { name: 'Secure Hash Generator', description: 'MD5, SHA-256, and SHA-512 cryptographic hashing tool', icon: Shield, href: '/tools/hash-generator', color: 'from-slate-500 to-slate-700', category: 'Generators', priority: 10 },
  
  // SEO
  { name: 'Sitemap XML Validator', description: 'Verify XML sitemaps for Google Search Console compliance', icon: Layers, href: '/tools/sitemap-validator', color: 'from-blue-600 to-blue-800', category: 'SEO', releaseDate: '2026-05-06', priority: 5 },
  { name: 'HTTP Redirect Checker', description: 'Trace full redirect chains (301/302) and audit status codes', icon: LinkIcon, href: '/tools/redirect-checker', color: 'from-indigo-600 to-indigo-800', category: 'SEO', releaseDate: '2026-05-09', priority: 5 },
  { name: 'JSON-LD Schema Generator', description: 'Build structured data schema for Google Rich Results', icon: Code, href: '/tools/schema-generator', color: 'from-emerald-600 to-emerald-800', category: 'SEO', releaseDate: '2026-05-07', priority: 5 },
  { name: 'API Latency Cost Calculator', description: 'Calculate the financial impact of network latency on your revenue', icon: TrendingDown, href: '/tools/api-latency-calculator', color: 'from-red-600 to-red-800', category: 'SEO', priority: 10 },
  { name: 'AdSense Revenue Estimator', description: 'Project potential earnings based on traffic, niche, and CPC/CTR', icon: DollarSign, href: '/tools/adsense-calculator', color: 'from-emerald-500 to-emerald-700', category: 'SEO', priority: 10 },
  { name: 'Technical SEO Audit Checklist', description: 'Interactive checklist for comprehensive search engine optimization', icon: ClipboardList, href: '/tools/seo-audit-checklist', color: 'from-blue-600 to-blue-800', category: 'SEO', priority: 10 },
  { name: 'Enterprise robots.txt Templates', description: 'Pre-configured, battle-tested robots.txt for Next.js, WP, and E-commerce', icon: FileText, href: '/tools/robots-txt-templates', color: 'from-orange-600 to-orange-800', category: 'SEO', releaseDate: '2026-05-07', priority: 10 },
  { name: 'Core Web Vitals Expert Guide', description: 'Interactive technical guide to mastering LCP, INP, and CLS performance', icon: Activity, href: '/tools/core-web-vitals-guide', color: 'from-blue-600 to-purple-600', category: 'SEO', releaseDate: '2026-05-07', priority: 10 },
  { name: 'CDN & Edge Readiness Tester', description: 'Technical verification tool to inspect CDN headers and edge delivery', icon: Server, href: '/tools/cdn-readiness-tester', color: 'from-indigo-600 to-blue-600', category: 'SEO', releaseDate: '2026-05-07', priority: 10 },
  { name: 'Social Preview Stress Tester', description: 'Real-time simulation of OG tags and Twitter cards for viral sharing optimization', icon: Share2, href: '/tools/social-preview-tester', color: 'from-blue-600 to-blue-800', category: 'SEO', releaseDate: '2026-05-07', priority: 5 },

  // Design & Utilities
  { name: 'WCAG Color Contrast Checker', description: 'Verify ADA and WCAG 2.1 accessibility compliance', icon: Palette, href: '/tools/color-contrast', color: 'from-pink-500 to-pink-700', category: 'Design', releaseDate: '2026-05-08', priority: 10 },
  { name: 'Markdown to HTML Converter', description: 'Convert documentation to clean, semantic HTML code', icon: FileCode, href: '/tools/markdown-converter', color: 'from-violet-500 to-violet-700', category: 'Formatters', releaseDate: '2026-05-09', priority: 10 },
  { name: 'Base64 Data Converter', description: 'Secure encoding and decoding of Base64 data strings', icon: FileText, href: '/tools/base64-encoder', color: 'from-purple-500 to-purple-700', category: 'Converters', priority: 10 },
  { name: 'URL Percent Encoder', description: 'Safe URL encoding for special characters and parameters', icon: LinkIcon, href: '/tools/url-encoder', color: 'from-emerald-500 to-emerald-700', category: 'Converters', priority: 10 },
  { name: 'Binary Data Converter', description: 'Convert between Binary, Hex, Decimal, and Octal formats', icon: Binary, href: '/tools/binary-converter', color: 'from-red-500 to-red-700', category: 'Converters', priority: 10 },
  { name: 'Unix Timestamp Converter', description: 'Translate Unix epochs into human-readable UTC dates', icon: Clock, href: '/tools/timestamp-converter', color: 'from-amber-500 to-amber-700', category: 'Converters', priority: 10 },
  { name: 'CSS Unit Converter Pro', description: 'Calculate px, rem, em, and vh units for responsive design', icon: Ruler, href: '/tools/css-unit-converter', color: 'from-fuchsia-500 to-fuchsia-700', category: 'Converters', priority: 10 },
  { name: 'Text Case Converter', description: 'Transform text into Uppercase, Lowercase, and Title Case', icon: Type, href: '/tools/case-converter', color: 'from-cyan-500 to-cyan-700', category: 'Converters', priority: 10 },
  { name: 'HTML Entity Encoder', description: 'Convert special characters into secure HTML entities', icon: Code, href: '/tools/html-encoder', color: 'from-violet-500 to-violet-700', category: 'Converters', priority: 10 },
  { name: 'Design Color Picker', description: 'Visual color selection with HEX and RGB export', icon: Palette, href: '/tools/color-picker', color: 'from-pink-500 to-pink-700', category: 'Design', priority: 10 },
  { name: 'Technical Word Counter', description: 'Accurate word, character, and sentence analysis', icon: Hash, href: '/tools/word-counter', color: 'from-teal-500 to-teal-700', category: 'Utilities', priority: 10 },
  { name: 'Live Markdown Previewer', description: 'Real-time rendering of Markdown into formatted text', icon: FileCode, href: '/tools/markdown-previewer', color: 'from-sky-500 to-sky-700', category: 'Utilities', priority: 10 },
]

const categories = ['All', 'Formatters', 'Generators', 'Converters', 'Utilities', 'SEO', 'Design']

export default function ToolsClient() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [favorites, setFavorites] = useState<string[]>([])

  const today = useMemo(() => new Date().toISOString().split('T')[0], [])

  useEffect(() => {
    const saved = localStorage.getItem('wtk_favorites')
    if (saved) setFavorites(JSON.parse(saved))
  }, [])

  const toggleFavorite = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    e.stopPropagation()
    const newFavorites = favorites.includes(href)
      ? favorites.filter(id => id !== href)
      : [...favorites, href]

    setFavorites(newFavorites)
    localStorage.setItem('wtk_favorites', JSON.stringify(newFavorites))
  }

  const visibleTools = useMemo(() => {
    return (tools as any[]).filter(tool => {
      if (!tool.releaseDate) return true
      return tool.releaseDate <= today
    }).sort((a, b) => {
      if ((a.priority || 10) !== (b.priority || 10)) {
        return (a.priority || 10) - (b.priority || 10)
      }
      if (a.releaseDate && b.releaseDate) {
        return b.releaseDate.localeCompare(a.releaseDate)
      }
      return a.name.localeCompare(b.name)
    })
  }, [today])

  const filteredTools = useMemo(() => {
    return visibleTools.filter(tool => {
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory
      const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) || 
                           tool.description.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [visibleTools, activeCategory, search])

  const favoriteTools = useMemo(() => {
    return visibleTools.filter(tool => favorites.includes(tool.href))
  }, [visibleTools, favorites])

  const hubs = [
    { title: 'Pinterest Expert Hub', desc: 'Enterprise-grade board and image downloading', icon: Download, color: 'from-red-500 to-red-700', href: '/tools/pinterest-downloader', priority: 1 },
    { title: 'Technical SEO Suite', desc: 'Check sitemaps, meta tags, and redirect health', icon: Globe, color: 'from-blue-600 to-blue-800', href: '/tools/meta-tag-generator', priority: 2 },
    { title: 'Data Converter Pro', desc: 'Secure Base64, Binary, and URL encoding', icon: RefreshCw, color: 'from-purple-500 to-purple-700', href: '/tools/base64-encoder', priority: 3 },
  ]

  return (
    <div className="dynamic-padding max-w-[1400px] mx-auto">
      {/* Category Tabs - Scrollable on mobile */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-6 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-3 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
              activeCategory === category 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-105' 
                : 'bg-white dark:bg-slate-900 text-gray-500 dark:text-slate-400 border border-gray-100 dark:border-slate-800 hover:border-blue-500/30'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Main Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTools.map((tool) => (
          <div key={tool.href} className="relative group">
            <button 
              onClick={(e) => toggleFavorite(e, tool.href)}
              className={`absolute top-6 right-6 p-2 rounded-xl transition-all z-20 ${favorites.includes(tool.href) ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-500' : 'text-gray-300 dark:text-slate-700 hover:text-rose-400'}`}
            >
              <Star className={`w-5 h-5 ${favorites.includes(tool.href) ? 'fill-rose-500' : ''}`} />
            </button>
            <Link 
              href={tool.href} 
              className="card-premium flex flex-col h-full p-8"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <tool.icon className="w-7 h-7 text-white" />
              </div>

              <div className="flex-grow">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {tool.name}
                  </h3>
                  {tool.priority <= 5 && (
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                  )}
                </div>
                <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">
                  {tool.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50 dark:border-slate-800/50">
                <span className="text-[10px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">{tool.category}</span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                  Launch <Zap className="w-4 h-4 fill-current" />
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <AdSlot className="mt-16" />
    </div>
  )
}
