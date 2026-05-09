'use client'

import React, { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import {
  Download, RefreshCw, Heart, 
  FileJson, Key, FileText, Link as LinkIcon, AlignLeft, Palette,
  Hash, Type, Clock, Binary, Shield, Code, Ruler, Shuffle, FileCode, Globe,
  Search, Filter, Laptop, Zap, Settings, Layout, Layers, Code2, Star,
  DollarSign, ClipboardList, TrendingDown, Activity, Share2, Server
} from 'lucide-react'
import AdSlot from '@/components/ads/AdSlot'
import { ToolConfig } from '@/types/tool'
import * as Icons from 'lucide-react'

const categories = ['All', 'Formatters', 'Generators', 'Converters', 'Utilities', 'SEO', 'Design']

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
            tool.category === 'Formatters' ? 'from-blue-500 to-blue-700' : 
            tool.category === 'Generators' ? 'from-indigo-500 to-indigo-700' : 
            tool.category === 'SEO' ? 'from-blue-600 to-blue-800' :
            tool.category === 'Converters' ? 'from-purple-500 to-purple-700' :
            tool.category === 'Design' ? 'from-pink-500 to-pink-700' :
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
    </div>
  )
}
