'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import {
  FileJson, Key, FileText, Link as LinkIcon, AlignLeft, Palette,
  Hash, Type, Clock, Binary, Shield, Code, Ruler, Shuffle, FileCode, Globe,
  Search, Filter, Laptop, Zap, Settings, Layout, Layers, Code2, Star,
  DollarSign, ClipboardList, TrendingDown, Activity, Share2, Server
} from 'lucide-react'
import AdSlot from '@/components/ads/AdSlot'

const tools = [
  // Formatters
  { name: 'Professional JSON Formatter', description: 'Enterprise-grade JSON formatting, validation, and beautification', icon: FileJson, href: '/tools/json-formatter', color: 'from-blue-500 to-blue-700', category: 'Formatters' },
  { name: 'JS Code Minifier', description: 'High-performance JavaScript compression for production deployment', icon: Code2, href: '/tools/js-minifier', color: 'from-yellow-500 to-yellow-700', category: 'Formatters' },

  // Generators
  { name: 'Secure Password Generator', description: 'US-standard cryptographically secure password generation tool', icon: Key, href: '/tools/password-generator', color: 'from-indigo-500 to-indigo-700', category: 'Generators' },
  { name: 'UUID v7 Generator', description: 'Next-gen time-ordered unique identifiers (RFC 9562)', icon: Zap, href: '/tools/uuid-v7-generator', color: 'from-lime-500 to-lime-700', category: 'Generators' },
  { name: 'UUID/GUID Generator', description: 'Instant RFC-compliant unique identifier generation', icon: Shuffle, href: '/tools/uuid-generator', color: 'from-lime-600 to-lime-800', category: 'Generators' },
  { name: 'Lorem Ipsum Generator', description: 'Professional placeholder text for designers and developers', icon: AlignLeft, href: '/tools/lorem-ipsum', color: 'from-orange-500 to-orange-700', category: 'Generators' },
  { name: 'SEO Meta Tag Generator', description: 'Create Google-ready meta tags for high search visibility', icon: Globe, href: '/tools/meta-tag-generator', color: 'from-rose-500 to-rose-700', category: 'Generators' },
  { name: 'Advanced Robots.txt Generator', description: 'Technical robots.txt creation for enterprise SEO management', icon: FileText, href: '/tools/robots-generator', color: 'from-orange-600 to-orange-800', category: 'Generators', releaseDate: '2026-05-05' },
  { name: 'Secure Hash Generator', description: 'MD5, SHA-256, and SHA-512 cryptographic hashing tool', icon: Shield, href: '/tools/hash-generator', color: 'from-slate-500 to-slate-700', category: 'Generators' },
  { name: 'Sitemap XML Validator', description: 'Verify XML sitemaps for Google Search Console compliance', icon: Layers, href: '/tools/sitemap-validator', color: 'from-blue-600 to-blue-800', category: 'SEO', releaseDate: '2026-05-06' },
  { name: 'JSON-LD Schema Generator', description: 'Build structured data schema for Google Rich Results', icon: Code, href: '/tools/schema-generator', color: 'from-emerald-600 to-emerald-800', category: 'SEO', releaseDate: '2026-05-07' },
  { name: 'API Latency Cost Calculator', description: 'Calculate the financial impact of network latency on your revenue', icon: TrendingDown, href: '/tools/api-latency-calculator', color: 'from-red-600 to-red-800', category: 'SEO' },
  { name: 'AdSense Revenue Estimator', description: 'Project potential earnings based on traffic, niche, and CPC/CTR', icon: DollarSign, href: '/tools/adsense-calculator', color: 'from-emerald-500 to-emerald-700', category: 'SEO' },
  { name: 'Technical SEO Audit Checklist', description: 'Interactive checklist for comprehensive search engine optimization', icon: ClipboardList, href: '/tools/seo-audit-checklist', color: 'from-blue-600 to-blue-800', category: 'SEO' },
  { name: 'Enterprise robots.txt Templates', description: 'Pre-configured, battle-tested robots.txt for Next.js, WP, and E-commerce', icon: FileText, href: '/tools/robots-txt-templates', color: 'from-orange-600 to-orange-800', category: 'SEO', releaseDate: '2026-05-07' },
  { name: 'Core Web Vitals Expert Guide', description: 'Interactive technical guide to mastering LCP, INP, and CLS performance', icon: Activity, href: '/tools/core-web-vitals-guide', color: 'from-blue-600 to-purple-600', category: 'SEO', releaseDate: '2026-05-07' },
  { name: 'CDN & Edge Readiness Tester', description: 'Technical verification tool to inspect CDN headers and edge delivery', icon: Server, href: '/tools/cdn-readiness-tester', color: 'from-indigo-600 to-blue-600', category: 'SEO', releaseDate: '2026-05-07' },
  { name: 'WCAG Color Contrast Checker', description: 'Verify ADA and WCAG 2.1 accessibility compliance', icon: Palette, href: '/tools/color-contrast', color: 'from-pink-500 to-pink-700', category: 'Design', releaseDate: '2026-05-08' },
  { name: 'Markdown to HTML Converter', description: 'Convert documentation to clean, semantic HTML code', icon: FileCode, href: '/tools/markdown-converter', color: 'from-violet-500 to-violet-700', category: 'Formatters', releaseDate: '2026-05-09' },

  // Converters
  { name: 'Base64 Data Converter', description: 'Secure encoding and decoding of Base64 data strings', icon: FileText, href: '/tools/base64-encoder', color: 'from-purple-500 to-purple-700', category: 'Converters' },
  { name: 'URL Percent Encoder', description: 'Safe URL encoding for special characters and parameters', icon: LinkIcon, href: '/tools/url-encoder', color: 'from-emerald-500 to-emerald-700', category: 'Converters' },
  { name: 'Binary Data Converter', description: 'Convert between Binary, Hex, Decimal, and Octal formats', icon: Binary, href: '/tools/binary-converter', color: 'from-red-500 to-red-700', category: 'Converters' },
  { name: 'Unix Timestamp Converter', description: 'Translate Unix epochs into human-readable UTC dates', icon: Clock, href: '/tools/timestamp-converter', color: 'from-amber-500 to-amber-700', category: 'Converters' },
  { name: 'CSS Unit Converter Pro', description: 'Calculate px, rem, em, and vh units for responsive design', icon: Ruler, href: '/tools/css-unit-converter', color: 'from-fuchsia-500 to-fuchsia-700', category: 'Converters' },
  { name: 'Text Case Converter', description: 'Transform text into Uppercase, Lowercase, and Title Case', icon: Type, href: '/tools/case-converter', color: 'from-cyan-500 to-cyan-700', category: 'Converters' },
  { name: 'HTML Entity Encoder', description: 'Convert special characters into secure HTML entities', icon: Code, href: '/tools/html-encoder', color: 'from-violet-500 to-violet-700', category: 'Converters' },

  // Utilities
  { name: 'Design Color Picker', description: 'Visual color selection with HEX and RGB export', icon: Palette, href: '/tools/color-picker', color: 'from-pink-500 to-pink-700', category: 'Utilities' },
  { name: 'Technical Word Counter', description: 'Accurate word, character, and sentence analysis', icon: Hash, href: '/tools/word-counter', color: 'from-teal-500 to-teal-700', category: 'Utilities' },
  { name: 'Social Preview Stress Tester', description: 'Real-time simulation of OG tags and Twitter cards for viral sharing optimization', icon: Share2, href: '/tools/social-preview-tester', color: 'from-blue-600 to-blue-800', category: 'SEO', releaseDate: '2026-05-07' },
  { name: 'Live Markdown Previewer', description: 'Real-time rendering of Markdown into formatted text', icon: FileCode, href: '/tools/markdown-previewer', color: 'from-sky-500 to-sky-700', category: 'Utilities' },
]

const categories = ['All', 'Formatters', 'Generators', 'Converters', 'Utilities', 'SEO', 'Design']

export default function ToolsPage() {
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
    })
  }, [today])

  const favoriteTools = useMemo(() => {
    return visibleTools.filter(tool => favorites.includes(tool.href))
  }, [visibleTools, favorites])

  const filteredTools = useMemo(() => {
    return visibleTools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory, visibleTools])

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-slate-950/50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 relative">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-slate-500">
            Developer Toolkit
          </h1>
          <p className="text-xl text-gray-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            A comprehensive suite of <span className="text-blue-600 dark:text-blue-400 font-bold">{tools.length}</span> free, high-performance tools built for the next generation of web professionals.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-5xl mx-auto mb-20">
          <div className="bg-white dark:bg-slate-900 p-2 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-2xl shadow-blue-900/5 dark:shadow-none flex flex-col md:flex-row items-center gap-2">
            <div className="relative flex-grow w-full">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for a tool (e.g., JSON, Password, Encoder)..."
                className="block w-full pl-14 pr-6 py-5 bg-transparent border-none focus:ring-0 outline-none text-lg font-medium dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-600"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            
            <div className="w-px h-10 bg-gray-100 dark:bg-slate-800 hidden md:block mx-2" />

            <div className="relative group/nav w-full md:w-auto overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />
              
              <div className="flex gap-2 overflow-x-auto py-2 px-6 no-scrollbar mask-fade-edges">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-3 rounded-2xl font-bold whitespace-nowrap transition-all duration-300 text-sm uppercase tracking-widest ${activeCategory === cat
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                      : 'bg-gray-50 dark:bg-slate-800/50 text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 border border-transparent'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <AdSlot className="mb-12" />

        {/* Favorites Section */}
        {favoriteTools.length > 0 && search === '' && activeCategory === 'All' && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <Star className="w-6 h-6 text-yellow-500 fill-current" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Favorites</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteTools.map((tool) => (
                <div key={`fav-${tool.href}`} className="relative group">
                  <button
                    onClick={(e) => toggleFavorite(e, tool.href)}
                    className="absolute top-6 right-6 p-2 rounded-full bg-yellow-50 dark:bg-yellow-900/20 text-yellow-500 hover:scale-110 transition-transform z-20"
                    title="Remove from favorites"
                  >
                    <Star className="w-5 h-5 fill-current" />
                  </button>
                  <Link
                    href={tool.href}
                    className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 hover:shadow-2xl dark:hover:shadow-blue-900/10 hover:-translate-y-1.5 transition-all duration-300"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <tool.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="mb-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded mb-2 inline-block">
                        {tool.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{tool.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mb-6 leading-relaxed flex-grow">{tool.description}</p>
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-12 border-b border-gray-100 dark:border-slate-800"></div>
          </div>
        )}

        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <div key={tool.href} className="relative group">
                <button
                  onClick={(e) => toggleFavorite(e, tool.href)}
                  className={`absolute top-6 right-6 p-2 rounded-full transition-all z-20 ${favorites.includes(tool.href)
                      ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-500'
                      : 'bg-gray-50 dark:bg-slate-800 text-gray-300 dark:text-slate-600 hover:text-yellow-500'
                    }`}
                  title={favorites.includes(tool.href) ? "Remove from favorites" : "Add to favorites"}
                >
                  <Star className={`w-5 h-5 ${favorites.includes(tool.href) ? 'fill-current' : ''}`} />
                </button>
                <Link
                  href={tool.href}
                  className="flex flex-col h-full bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 hover:shadow-2xl dark:hover:shadow-blue-900/10 hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <tool.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded mb-2 inline-block">
                      {tool.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{tool.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-slate-400 mb-6 leading-relaxed flex-grow">{tool.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-slate-800">
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                      Launch Tool <Zap className="w-4 h-4 fill-current" />
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-gray-200 dark:border-slate-800">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 dark:bg-slate-800 rounded-full mb-6">
              <Search className="w-10 h-10 text-gray-300 dark:text-slate-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No tools found</h3>
            <p className="text-gray-500 dark:text-slate-400">We couldn't find any tools matching your search or filter.</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('All') }}
              className="mt-6 text-blue-600 dark:text-blue-400 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        <AdSlot className="mt-20" />
      </div>
    </div>
  )
}