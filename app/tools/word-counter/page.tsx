'use client'
import React, { useState, useEffect } from 'react'
import { Hash, Copy, Check } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

export default function WordCounter() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)
  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0,
    paragraphs: text.trim() ? text.split(/\n\n+/).filter(p => p.trim()).length : 0,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200),
  }
  const handleCopy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="Word Counter" slug="word-counter" />
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl shadow-lg shadow-teal-500/20">
            <Hash className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Word Counter</h1>
            <p className="text-gray-500 dark:text-slate-400">Count words, characters, sentences, and estimate reading time</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {Object.entries(stats).map(([key, val]) => (
            <div key={key} className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-4 text-center shadow-sm">
              <div className="text-2xl font-black text-gray-900 dark:text-white">{val}</div>
              <div className="text-[10px] text-gray-400 dark:text-slate-500 uppercase font-bold tracking-widest mt-1">{key.replace(/([A-Z])/g, ' $1')}</div>
            </div>
          ))}
        </div>
        
        <textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Start typing or paste your text here..." 
          className="w-full h-80 p-8 font-sans text-lg bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl shadow-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none dark:text-white transition-all" 
        />
        <div className="mt-8 h-[90px] bg-gray-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800 flex items-center justify-center">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ad Placement</span>
        </div>
      </div>
    </div>
  )
}
