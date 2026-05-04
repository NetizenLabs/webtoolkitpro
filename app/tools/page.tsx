'use client'

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import { 
  FileJson, Key, FileText, Link as LinkIcon, AlignLeft, Palette,
  Hash, Type, Clock, Binary, Shield, Code, Ruler, Shuffle, FileCode, Globe,
  Search, Filter, Laptop, Zap, Settings, Layout, Layers, Code2
} from 'lucide-react'

  // Formatters
  { name: 'JSON Formatter', description: 'Clean, format, and validate JSON data instantly', icon: FileJson, href: '/tools/json-formatter', color: 'from-blue-500 to-blue-700', category: 'Formatters' },
  { name: 'JS Minifier', description: 'Compress JavaScript code for faster loading', icon: Code2, href: '/tools/js-minifier', color: 'from-yellow-500 to-yellow-700', category: 'Formatters' },
  
  // Generators
  { name: 'Password Generator', description: 'Create secure, random passwords with custom rules', icon: Key, href: '/tools/password-generator', color: 'from-indigo-500 to-indigo-700', category: 'Generators' },
  { name: 'UUID Generator', description: 'Generate unique UUIDs/GUIDs instantly', icon: Shuffle, href: '/tools/uuid-generator', color: 'from-lime-600 to-lime-800', category: 'Generators' },
  { name: 'Lorem Ipsum', description: 'Generate placeholder text for your designs', icon: AlignLeft, href: '/tools/lorem-ipsum', color: 'from-orange-500 to-orange-700', category: 'Generators' },
  { name: 'Meta Tag Generator', description: 'Generate SEO meta tags for your website', icon: Globe, href: '/tools/meta-tag-generator', color: 'from-rose-500 to-rose-700', category: 'Generators' },
  { name: 'Hash Generator', description: 'Generate MD5, SHA-1, SHA-256 hashes from text', icon: Shield, href: '/tools/hash-generator', color: 'from-slate-500 to-slate-700', category: 'Generators' },
  
  // Converters
  { name: 'Base64 Encoder', description: 'Encode and decode Base64 strings seamlessly', icon: FileText, href: '/tools/base64-encoder', color: 'from-purple-500 to-purple-700', category: 'Converters' },
  { name: 'URL Encoder', description: 'Safe URL encoding and decoding for web use', icon: LinkIcon, href: '/tools/url-encoder', color: 'from-emerald-500 to-emerald-700', category: 'Converters' },
  { name: 'Binary Converter', description: 'Convert between binary, decimal, hex, and octal', icon: Binary, href: '/tools/binary-converter', color: 'from-red-500 to-red-700', category: 'Converters' },
  { name: 'Timestamp Converter', description: 'Convert Unix timestamps to human-readable dates', icon: Clock, href: '/tools/timestamp-converter', color: 'from-amber-500 to-amber-700', category: 'Converters' },
  { name: 'CSS Unit Converter', description: 'Convert between px, rem, em, vh, and vw units', icon: Ruler, href: '/tools/css-unit-converter', color: 'from-fuchsia-500 to-fuchsia-700', category: 'Converters' },
  { name: 'Case Converter', description: 'Convert text between uppercase, lowercase, title case', icon: Type, href: '/tools/case-converter', color: 'from-cyan-500 to-cyan-700', category: 'Converters' },
  { name: 'HTML Encoder', description: 'Encode and decode HTML entities safely', icon: Code, href: '/tools/html-encoder', color: 'from-violet-500 to-violet-700', category: 'Converters' },
  
  // Utilities
  { name: 'Color Picker', description: 'Pick colors and get HEX, RGB, HSL values', icon: Palette, href: '/tools/color-picker', color: 'from-pink-500 to-pink-700', category: 'Utilities' },
  { name: 'Word Counter', description: 'Count words, characters, sentences, and paragraphs', icon: Hash, href: '/tools/word-counter', color: 'from-teal-500 to-teal-700', category: 'Utilities' },
  { name: 'Markdown Previewer', description: 'Write Markdown and see live HTML preview', icon: FileCode, href: '/tools/markdown-previewer', color: 'from-sky-500 to-sky-700', category: 'Utilities' },
]

const categories = ['All', 'Formatters', 'Generators', 'Converters', 'Utilities']

export default function ToolsPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredTools = useMemo(() => {
    return tools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(search.toLowerCase()) || 
                           tool.description.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory])

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Developer Toolkit
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            A comprehensive suite of {tools.length} free, high-performance tools built for modern web professionals.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search for a tool (e.g., JSON, Password, Encoder)..."
                className="block w-full pl-11 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-4 rounded-2xl font-bold whitespace-nowrap transition-all duration-300 ${
                    activeCategory === cat
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* AdSense Slot */}
        <div className="max-w-3xl mx-auto mb-12 min-h-[90px] flex items-center justify-center">
           {/* AdSense Leaderboard */}
        </div>
        
        {/* Tools Grid */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTools.map((tool) => (
              <Link 
                key={tool.href}
                href={tool.href}
                className="group bg-white rounded-3xl border border-gray-100 p-8 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <tool.icon className="w-7 h-7 text-white" />
                </div>
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2 py-1 rounded mb-2 inline-block">
                    {tool.category}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{tool.name}</h3>
                </div>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed flex-grow">{tool.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <span className="text-sm font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Launch Tool <Zap className="w-4 h-4 fill-current" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full mb-6">
              <Search className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No tools found</h3>
            <p className="text-gray-500">We couldn't find any tools matching your search or filter.</p>
            <button 
              onClick={() => {setSearch(''); setActiveCategory('All')}}
              className="mt-6 text-blue-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* AdSense Slot */}
        <div className="max-w-3xl mx-auto mt-20 min-h-[250px] flex items-center justify-center">
           {/* AdSense Rectangle */}
        </div>
      </div>
    </div>
  )
}