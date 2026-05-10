'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import {
  Download, RefreshCw, Heart, 
  FileJson, Key, FileText, Link as LinkIcon, AlignLeft, Palette,
  Hash, Type, Clock, Binary, Shield, Code, Ruler, Shuffle, FileCode, Globe,
  Search, Filter, Laptop, Zap, Settings, Layout, Layers, Code2, Star,
  DollarSign, ClipboardList, TrendingDown, Activity, Share2, Server, Database
} from 'lucide-react'
import AdSlot from '@/components/ads/AdSlot'
import { ToolConfig } from '@/types/tool'
import * as Icons from 'lucide-react'

const categories = [
  'All', 
  'Developer Tools', 
  'SEO Tools', 
  'Design Tools', 
  'Generators', 
  'Network & Performance', 
  'Content Utilities', 
  'Revenue & Analytics', 
  'Social Media Tools'
]

interface ToolsClientProps {
  initialTools: ToolConfig[]
}

export default function ToolsClient({ initialTools }: ToolsClientProps) {
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
    return initialTools.filter(tool => {
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
  }, [initialTools, today])

  const filteredTools = useMemo(() => {
    return visibleTools.filter(tool => {
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory
      const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) || 
                           tool.content.description.toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [visibleTools, activeCategory, search])

  const favoriteTools = useMemo(() => {
    return visibleTools.filter(tool => favorites.includes(`/tools/${tool.slug}`))
  }, [visibleTools, favorites])

  const hubs = [
    { title: 'Pinterest Expert Hub', desc: 'Enterprise-grade board and image downloading', icon: Download, color: 'from-red-500 to-red-700', href: '/tools/pinterest-downloader', priority: 1 },
    { title: 'Technical SEO Suite', desc: 'Check sitemaps, meta tags, and redirect health', icon: Globe, color: 'from-blue-600 to-blue-800', href: '/tools/meta-tag-generator', priority: 2 },
    { title: 'Data Converter Pro', desc: 'Secure Base64, Binary, and URL encoding', icon: RefreshCw, color: 'from-purple-500 to-purple-700', href: '/tools/base64-encoder', priority: 3 },
  ]

  return (
    <div className="dynamic-padding max-w-[1400px] mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
          Professional Developer Tools
        </h1>
        <p className="text-xl text-gray-500 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
          Secure, high-performance web utilities for modern engineering and technical SEO.
        </p>
      </div>

      {/* Premium Search Bar */}
      <div className="relative mb-12 max-w-2xl mx-auto group">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Search 33+ professional tools (e.g. JSON, Password, SEO)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-16 pr-8 py-5 bg-white dark:bg-slate-900 border-2 border-gray-100 dark:border-slate-800 rounded-[2rem] text-lg font-medium text-gray-900 dark:text-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 outline-none transition-all shadow-xl shadow-blue-900/5 placeholder:text-gray-400"
        />
        {search && (
          <button 
            onClick={() => setSearch('')}
            className="absolute inset-y-0 right-6 flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 uppercase tracking-widest"
          >
            Clear
          </button>
        )}
      </div>

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
        {filteredTools.map((tool) => {
          const IconComponent = (Icons as any)[tool.icon || 'Zap'] || Icons.Zap
          const toolColor = 
            tool.category === 'Developer Tools' ? 'from-blue-500 to-blue-700' : 
            tool.category === 'Generators' ? 'from-indigo-500 to-indigo-700' : 
            tool.category === 'SEO Tools' ? 'from-cyan-500 to-cyan-700' :
            tool.category === 'Design Tools' ? 'from-pink-500 to-pink-700' :
            tool.category === 'Network & Performance' ? 'from-emerald-500 to-emerald-700' :
            tool.category === 'Revenue & Analytics' ? 'from-amber-500 to-amber-700' :
            tool.category === 'Social Media Tools' ? 'from-rose-500 to-rose-700' :
            tool.category === 'Content Utilities' ? 'from-violet-500 to-violet-700' :
            'from-slate-500 to-slate-700'
          
          const href = `/tools/${tool.slug}`

          return (
            <div key={tool.slug} className="relative group">
              <button 
                onClick={(e) => toggleFavorite(e, href)}
                className={`absolute top-6 right-6 p-2 rounded-xl transition-all z-20 ${favorites.includes(href) ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-500' : 'text-gray-300 dark:text-slate-700 hover:text-rose-400'}`}
              >
                <Heart className={`w-5 h-5 ${favorites.includes(href) ? 'fill-rose-500' : ''}`} />
              </button>
              <Link 
                href={href} 
                className="card-premium flex flex-col h-full p-8"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${toolColor} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-7 h-7 text-white" />
                </div>

                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4">
                    {tool.content.description}
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
          )
        })}
      </div>

      <AdSlot className="mt-16" />
      
      {/* SEO Hub Links - Ensuring category hubs have internal links */}
      <section className="mt-20 pt-12 border-t border-gray-100 dark:border-slate-900">
        <h2 className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-[0.3em] mb-8 text-center">Browse by Engineering Expertise</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.filter(c => c !== 'All').map(category => {
            const slug = category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')
            return (
              <Link 
                key={category}
                href={`/tools/category/${slug}/`}
                className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 text-center text-xs font-bold text-gray-600 dark:text-slate-400 hover:border-blue-500/30 hover:text-blue-600 transition-all shadow-sm"
              >
                {category} Hub
              </Link>
            )
          })}
        </div>
      </section>

      {/* About Section - Boosting Text-HTML Ratio */}
      <section className="mt-24 pt-16 border-t border-gray-100 dark:border-slate-900 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Privacy-First Developer Utilities</h2>
        <p className="text-lg text-gray-500 dark:text-slate-400 leading-relaxed mb-8">
          WebToolkit Pro provides a curated suite of technical utilities designed for modern web developers, SEO specialists, and software architects. Every tool in our directory is built with a <strong>privacy-first approach</strong>—all processing happens locally in your browser, ensuring that your sensitive data never leaves your device.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div>
            <h3 className="text-sm font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">Zero Latency</h3>
            <p className="text-sm text-gray-500 dark:text-slate-500 leading-relaxed">By leveraging client-side JavaScript, our tools provide instant results without the need for server round-trips or API delays.</p>
          </div>
          <div>
            <h3 className="text-sm font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">Secure by Design</h3>
            <p className="text-sm text-gray-500 dark:text-slate-500 leading-relaxed">We don't store your inputs. Whether you are generating passwords or formatting JSON, your data is processed entirely within your local memory.</p>
          </div>
          <div>
            <h3 className="text-sm font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">Built for Professionals</h3>
            <p className="text-sm text-gray-500 dark:text-slate-500 leading-relaxed">Our utilities follow industry standards (RFC, ISO, W3C) to ensure that the outputs are production-ready for enterprise applications.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
