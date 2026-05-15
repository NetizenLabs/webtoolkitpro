'use client'

import React, { useState } from 'react'
import { Languages, Copy, Check, Trash2, Plus, X, ArrowRight } from 'lucide-react'

interface LanguageEntry {
  lang: string
  url: string
}

export default function HreflangGenerator() {
  const [entries, setEntries] = useState<LanguageEntry[]>([
    { lang: 'x-default', url: 'https://example.com/' },
    { lang: 'en', url: 'https://example.com/en' },
  ])
  const [newLang, setNewLang] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [copied, setCopied] = useState(false)

  const addEntry = () => {
    if (!newLang || !newUrl) return
    setEntries([...entries, { lang: newLang, url: newUrl }])
    setNewLang('')
    setNewUrl('')
  }

  const removeEntry = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index))
  }

  const generateTags = () => {
    return entries.map(entry => 
      `<link rel="alternate" hreflang="${entry.lang}" href="${entry.url}" />`
    ).join('\n')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generateTags())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Editor */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
            <h3 className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-8">Language Variants</h3>
            
            <div className="space-y-4 mb-8">
              {entries.map((entry, index) => (
                <div key={index} className="flex gap-4 items-center animate-in fade-in duration-300">
                  <div className="w-24 shrink-0">
                    <input 
                      value={entry.lang}
                      onChange={(e) => {
                        const newEntries = [...entries]
                        newEntries[index].lang = e.target.value
                        setEntries(newEntries)
                      }}
                      className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-xl text-xs font-bold text-blue-600 dark:text-blue-400 outline-none"
                    />
                  </div>
                  <div className="flex-grow">
                    <input 
                      value={entry.url}
                      onChange={(e) => {
                        const newEntries = [...entries]
                        newEntries[index].url = e.target.value
                        setEntries(newEntries)
                      }}
                      className="w-full p-3 bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-xl text-xs font-medium dark:text-slate-300 outline-none"
                    />
                  </div>
                  <button onClick={() => removeEntry(index)} className="p-2 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-all">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-slate-800">
              <div className="flex gap-4 items-center">
                <input
                  placeholder="en-us"
                  value={newLang}
                  onChange={(e) => setNewLang(e.target.value)}
                  className="w-24 p-3 bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-xl text-xs font-bold outline-none"
                />
                <input
                  placeholder="https://example.com/us"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="flex-grow p-3 bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-xl text-xs font-medium outline-none"
                />
                <button 
                  onClick={addEntry}
                  className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="space-y-4 h-full flex flex-col">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Hreflang Tag Output</label>
            <button 
              onClick={handleCopy}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/10 rounded-lg transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy Tags'}
            </button>
          </div>
          <div className="relative flex-grow">
            <textarea
              readOnly
              value={generateTags()}
              placeholder="HTML tags will appear here..."
              className="w-full h-full min-h-[400px] p-8 font-mono text-xs bg-gray-900 dark:bg-slate-950 text-emerald-400 border border-gray-800 dark:border-slate-800 rounded-[2.5rem] shadow-2xl outline-none resize-none transition-all leading-relaxed"
            />
          </div>

          <div className="p-8 bg-[#0B1120] border border-[#1E2D47] rounded-3xl mt-4">
            <div className="flex items-center gap-4 mb-4">
              <Languages className="w-6 h-6 text-[#00D4B4]" />
              <h5 className="text-sm font-bold text-white tracking-tight uppercase">SEO Compliance</h5>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              These tags ensure that Google serves the correct language version of your content based on the user's location and browser settings. Always include an <span className="text-white font-bold">x-default</span> tag for global fallback.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
