'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import {
  Download, RefreshCw, Heart, 
  FileJson, Key, FileText, Link as LinkIcon, AlignLeft, Palette,
  Hash, Type, Clock, Binary, Shield, Code, Ruler, Shuffle, FileCode, Globe,
  Search, Filter, Laptop, Zap, Settings, Layout, Layers, Code2, Star,
  DollarSign, ClipboardList, TrendingDown, Activity, Share2, Server, Database,
  LayoutGrid, List, AlignJustify, Table, Info
} from 'lucide-react'
import AdSlot from '@/components/ads/AdSlot'
import { ToolConfig } from '@/types/tool'
import * as Icons from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

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
  title?: string
  isSubPage?: boolean
}

export default function ToolsClient({ initialTools, title, isSubPage }: ToolsClientProps) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [favorites, setFavorites] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'details'>('grid')

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
                           (tool.content?.description || '').toLowerCase().includes(search.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [visibleTools, activeCategory, search])

  return (
    <div className="dynamic-padding max-w-[1400px] mx-auto min-h-screen">
      {!isSubPage && (
        <div className="text-center mb-16 pt-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tighter">
            {title || 'Professional Developer Tools'}
          </h1>
          <p className="text-lg text-[#8A9BBE] max-w-2xl mx-auto mb-12">
            Secure, client-side utilities for modern engineering workflows. 
            Zero data leaves your browser.
          </p>
        </div>
      )}

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center max-w-4xl mx-auto">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8A9BBE]" strokeWidth={1.5} />
            <input 
              type="text"
              placeholder="Search tools (e.g. JSON, SEO, Security...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 dark:bg-[#0D1526] border border-gray-200 dark:border-[#1E2D47] rounded-[12px] pl-12 pr-4 py-4 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-[#4A6080] focus:ring-2 focus:ring-[#00D4B4] outline-none transition-all font-medium appearance-none"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.slice(0, 4).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-4 rounded-[12px] text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${
                  activeCategory === cat 
                    ? 'bg-[#00D4B4] text-[#0B1120] border-[#00D4B4]' 
                    : 'bg-white dark:bg-[#0D1526] text-gray-500 dark:text-[#8A9BBE] border-gray-200 dark:border-[#1E2D47] hover:border-[#00D4B4]/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <SectionHeading number="01" title={activeCategory === 'All' ? 'Complete Directory' : `${activeCategory} Suite`} className="mb-0" />
        
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-[#0D1526] p-1 rounded-xl border border-gray-200 dark:border-[#1E2D47]">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-[#00D4B4] text-[#0B1120] shadow-sm' : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
            title="Large Icons"
          >
            <LayoutGrid className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-[#00D4B4] text-[#0B1120] shadow-sm' : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
            title="List"
          >
            <List className="w-5 h-5" strokeWidth={1.5} />
          </button>
          <button 
            onClick={() => setViewMode('details')}
            className={`p-2 rounded-lg transition-all ${viewMode === 'details' ? 'bg-[#00D4B4] text-[#0B1120] shadow-sm' : 'text-gray-400 hover:text-gray-900 dark:hover:text-white'}`}
            title="Details"
          >
            <AlignJustify className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredTools.map((tool) => {
            const IconComponent = (Icons as any)[tool.icon || 'Zap'] || Icons.Zap
            const href = `/tools/${tool.slug}`

            return (
              <div key={tool.slug} className="relative group">
                <button 
                  onClick={(e) => toggleFavorite(e, href)}
                  aria-label={favorites.includes(href) ? `Remove ${tool.name} from favorites` : `Add ${tool.name} to favorites`}
                  className="absolute top-6 right-6 z-10 p-2 rounded-full bg-black/5 dark:bg-[#0B1120]/80 text-gray-900 dark:text-white backdrop-blur-md md:opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95"
                >
                  <Heart className={`w-4 h-4 ${favorites.includes(href) ? 'fill-rose-500 text-rose-500' : ''}`} strokeWidth={1.5} />
                </button>
                <Link 
                  href={href} 
                  className="card-premium flex flex-col h-full p-8"
                >
                  <div className="w-14 h-14 rounded-[10px] bg-gradient-to-br from-[#00D4B4] to-[#0094FF] flex items-center justify-center mb-6 shadow-lg shadow-blue-500/10 group-hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-7 h-7 text-[#0B1120]" strokeWidth={1.5} />
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight group-hover:text-[#00D4B4] transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-sm text-[#8A9BBE] leading-relaxed line-clamp-2 mb-4">
                      {tool.content?.description || `Free online ${tool.name} utility.`}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 flex-wrap mt-auto pt-6 border-t border-gray-100 dark:border-[#1E2D47]/50">
                    <span className="px-4 py-2 bg-gray-50 dark:bg-[#0B1120] text-gray-500 dark:text-[#8A9BBE] border border-gray-200 dark:border-[#1E2D47] text-[9px] rounded-full font-bold uppercase tracking-widest leading-tight">
                      {tool.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#00D4B4] flex items-center gap-2 group-hover:gap-3 transition-all uppercase tracking-widest shrink-0">
                      Launch <Zap className="w-3.5 h-3.5 fill-current" />
                    </span>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      )}

      {viewMode === 'list' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => {
            const IconComponent = (Icons as any)[tool.icon || 'Zap'] || Icons.Zap
            const href = `/tools/${tool.slug}`

            return (
              <Link 
                key={tool.slug}
                href={href} 
                className="flex items-center gap-4 p-4 bg-white dark:bg-[#0D1526] border border-gray-200 dark:border-[#1E2D47] rounded-xl hover:border-[#00D4B4]/50 group transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00D4B4] to-[#0094FF] flex items-center justify-center shrink-0">
                  <IconComponent className="w-5 h-5 text-[#0B1120]" strokeWidth={1.5} />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate group-hover:text-[#00D4B4]">
                    {tool.name}
                  </h3>
                  <p className="text-[10px] text-[#8A9BBE] uppercase tracking-widest font-bold">
                    {tool.category}
                  </p>
                </div>
                <Zap className="w-4 h-4 text-[#00D4B4] opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            )
          })}
        </div>
      )}

      {viewMode === 'details' && (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-[#1E2D47] bg-white dark:bg-[#0D1526]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-[#1E2D47] bg-gray-50 dark:bg-[#0B1120]">
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Tool Name</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden md:table-cell">Category</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest hidden lg:table-cell">Description</th>
                <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTools.map((tool) => {
                const IconComponent = (Icons as any)[tool.icon || 'Zap'] || Icons.Zap
                const href = `/tools/${tool.slug}`

                return (
                  <tr key={tool.slug} className="group border-b border-gray-50 dark:border-[#1E2D47]/50 hover:bg-gray-50/50 dark:hover:bg-[#0B1120]/50 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={href} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00D4B4] to-[#0094FF] flex items-center justify-center shrink-0">
                          <IconComponent className="w-4 h-4 text-[#0B1120]" strokeWidth={1.5} />
                        </div>
                        <span className="font-bold text-gray-900 dark:text-white group-hover:text-[#00D4B4] transition-colors">{tool.name}</span>
                      </Link>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-[10px] font-bold text-gray-500 dark:text-[#8A9BBE] uppercase tracking-widest bg-gray-100 dark:bg-[#0B1120] px-2 py-1 rounded">
                        {tool.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell max-w-md">
                      <p className="text-xs text-[#8A9BBE] line-clamp-1">{tool.content?.description}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={href} className="text-[#00D4B4] hover:text-[#0094FF] transition-colors">
                        <Zap className="w-4 h-4 inline-block" />
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* SEO Hub Links */}
      <section className="mt-24 pt-16 border-t border-gray-100 dark:border-[#1E2D47]">
        <SectionHeading number="02" title="Engineering Hubs" className="mb-12" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.filter(c => c !== 'All').map(category => {
            const slug = category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')
            return (
              <Link 
                key={category}
                href={`/tools/category/${slug}`}
                className="p-6 bg-white dark:bg-[#0D1526] border border-gray-200 dark:border-[#1E2D47] rounded-[12px] text-center text-xs font-bold text-gray-500 dark:text-[#8A9BBE] uppercase tracking-widest hover:border-[#00D4B4]/30 hover:text-blue-600 dark:hover:text-white transition-all shadow-xl"
              >
                {category} Hub
              </Link>
            )
          })}
        </div>
      </section>

      {/* About Section */}
      <section className="mt-24 pt-16 border-t border-gray-100 dark:border-[#1E2D47] max-w-4xl mx-auto">
        <div className="bg-gray-50 dark:bg-[#0D1526] border border-gray-200 dark:border-[#1E2D47] p-12 rounded-[12px] relative overflow-hidden text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#00D4B4]/5 blur-[80px] rounded-full -translate-y-1/2" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight relative z-10">Privacy-First Developer Utilities</h2>
          <p className="text-lg text-[#8A9BBE] leading-relaxed mb-12 relative z-10">
            WebToolkit Pro provides a curated suite of technical utilities designed for modern web developers, SEO specialists, and software architects.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left relative z-10">
            <div>
              <h3 className="text-xs font-mono font-bold text-blue-600 dark:text-[#00D4B4] uppercase tracking-widest mb-4">Zero Latency</h3>
              <p className="text-sm text-[#8A9BBE] leading-relaxed">Instant results powered by client-side JavaScript execution.</p>
            </div>
            <div>
              <h3 className="text-xs font-mono font-bold text-blue-600 dark:text-[#00D4B4] uppercase tracking-widest mb-4">Secure by Design</h3>
              <p className="text-sm text-[#8A9BBE] leading-relaxed">Your data never leaves your device. 100% browser-based processing.</p>
            </div>
            <div>
              <h3 className="text-xs font-mono font-bold text-blue-600 dark:text-[#00D4B4] uppercase tracking-widest mb-4">Enterprise Ready</h3>
              <p className="text-sm text-[#8A9BBE] leading-relaxed">Output follows industry standards (RFC, ISO, W3C) for production use.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
