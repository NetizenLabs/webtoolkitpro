'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Command, X, Zap } from 'lucide-react'
import DynamicIcon from './DynamicIcon'

interface MinimalTool {
  slug: string
  name: string
  category: string
  icon: string
  description: string
  tags: string[]
}

interface CommandBarProps {
  tools: MinimalTool[]
}

export default function CommandBar({ tools }: CommandBarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen((prev) => !prev)
      }
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50)
      setSearch('')
      setActiveIndex(0)
    }
  }, [isOpen])

  // Simple heuristic/keyword routing engine
  const filteredTools = search.trim() === '' ? [] : tools.filter(tool => {
    const term = search.toLowerCase()
    if (tool.name.toLowerCase().includes(term)) return true
    if (tool.description.toLowerCase().includes(term)) return true
    if (tool.category.toLowerCase().includes(term)) return true
    if (tool.tags.some(tag => tag.toLowerCase().includes(term))) return true
    return false
  }).slice(0, 5)

  useEffect(() => {
    setActiveIndex(0)
  }, [search])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex(prev => (prev < filteredTools.length - 1 ? prev + 1 : prev))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex(prev => (prev > 0 ? prev - 1 : prev))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filteredTools.length > 0) {
        const selected = filteredTools[activeIndex]
        setIsOpen(false)
        router.push(`/tools/${selected.slug}`)
      }
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4 backdrop-blur-sm bg-background/80">
      {/* Overlay click to close */}
      <div className="absolute inset-0" onClick={() => setIsOpen(false)} />
      
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0D1526] rounded-2xl shadow-2xl border border-gray-200 dark:border-[#1E2D47] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center px-4 py-4 border-b border-gray-100 dark:border-[#1E2D47]">
          <Search className="w-5 h-5 text-gray-400 dark:text-[#8A9BBE] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent outline-none text-lg text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-[#8A9BBE]"
            placeholder="Type a command or search for a tool..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md text-gray-400 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#1E2D47] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          {search.trim() === '' ? (
            <div className="p-12 text-center text-gray-500 dark:text-[#8A9BBE]">
              <Command className="w-10 h-10 mx-auto mb-4 opacity-20" />
              <p className="text-sm">Search across 190+ developer tools, formats, and generators.</p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-[#1E2D47] rounded-md">Try: &quot;format json&quot;</span>
                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-[#1E2D47] rounded-md">Try: &quot;decode jwt&quot;</span>
                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-[#1E2D47] rounded-md">Try: &quot;hash sha256&quot;</span>
              </div>
            </div>
          ) : filteredTools.length > 0 ? (
            <div className="p-2 space-y-1">
              {filteredTools.map((tool, index) => (
                <button
                  key={tool.slug}
                  onClick={() => {
                    setIsOpen(false)
                    router.push(`/tools/${tool.slug}`)
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors text-left ${
                    index === activeIndex 
                      ? 'bg-blue-50 dark:bg-[#00D4B4]/10 border border-blue-100 dark:border-[#00D4B4]/20' 
                      : 'hover:bg-gray-50 dark:hover:bg-[#1E2D47]/50 border border-transparent'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                    index === activeIndex 
                      ? 'bg-blue-100 text-blue-600 dark:bg-[#00D4B4]/20 dark:text-[#00D4B4]' 
                      : 'bg-gray-100 text-gray-500 dark:bg-[#1E2D47] dark:text-[#8A9BBE]'
                  }`}>
                    <DynamicIcon name={tool.icon || 'Zap'} className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm font-bold truncate ${
                      index === activeIndex ? 'text-blue-900 dark:text-[#00D4B4]' : 'text-gray-900 dark:text-white'
                    }`}>
                      {tool.name}
                    </h3>
                    <p className={`text-xs truncate ${
                      index === activeIndex ? 'text-blue-600/70 dark:text-[#00D4B4]/70' : 'text-gray-500 dark:text-[#8A9BBE]'
                    }`}>
                      {tool.description}
                    </p>
                  </div>
                  <div className="shrink-0 text-xs font-mono px-2 py-1 rounded bg-gray-100 dark:bg-[#0B1120] text-gray-500 dark:text-[#5B719E]">
                    {tool.category}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center text-gray-500 dark:text-[#8A9BBE]">
              <p className="text-sm">No tools found for &quot;{search}&quot;</p>
              <p className="text-xs mt-2 opacity-60">We are adding new tools every week.</p>
            </div>
          )}
        </div>
        
        <div className="px-4 py-3 bg-gray-50 dark:bg-[#0B1120] border-t border-gray-100 dark:border-[#1E2D47] flex items-center justify-between text-xs text-gray-500 dark:text-[#5B719E]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-[#1E2D47] text-[10px] font-mono">↑</kbd><kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-[#1E2D47] text-[10px] font-mono">↓</kbd> to navigate</span>
            <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 rounded bg-gray-200 dark:bg-[#1E2D47] text-[10px] font-mono">Enter</kbd> to open</span>
          </div>
          <div className="flex items-center gap-1 font-mono uppercase tracking-widest text-[9px] font-bold">
            <Zap className="w-3 h-3 text-[#00D4B4]" /> Client-Side Router
          </div>
        </div>

      </div>
    </div>
  )
}
