'use client'

import React, { useState } from 'react'
import { Search, Info, Check, AlertTriangle, AlertCircle } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function MetaLengthChecker() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isBulkMode, setIsBulkMode] = useState(false)
  const [bulkInput, setBulkInput] = useState('')
  const [bulkResults, setBulkResults] = useState<{title: string; desc: string; titleLen: number; descLen: number; tStatus: any; dStatus: any}[]>([])

  const processBulk = () => {
    const lines = bulkInput.split('\n')
    const results = lines.map(line => {
      if (!line.trim()) return null
      const parts = line.split('|')
      const t = parts[0] ? parts[0].trim() : ''
      const d = parts[1] ? parts[1].trim() : ''
      return {
        title: t, desc: d,
        titleLen: t.length, descLen: d.length,
        tStatus: getTitleStatus(t.length),
        dStatus: getDescStatus(d.length)
      }
    }).filter(Boolean) as any
    setBulkResults(results)
  }

  const getTitleStatus = (len: number) => {
    if (len === 0) return { color: 'text-gray-400', label: 'Empty' }
    if (len < 30) return { color: 'text-amber-500', label: 'Too Short' }
    if (len <= 60) return { color: 'text-green-500', label: 'Perfect' }
    return { color: 'text-red-500', label: 'Too Long' }
  }

  const getDescStatus = (len: number) => {
    if (len === 0) return { color: 'text-gray-400', label: 'Empty' }
    if (len < 120) return { color: 'text-amber-500', label: 'Too Short' }
    if (len <= 160) return { color: 'text-green-500', label: 'Perfect' }
    return { color: 'text-red-500', label: 'Too Long' }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk Meta Length Checker" />
      </div>
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">SERP Meta Audit</h3>
        </div>

        <div className="space-y-8">
          {isBulkMode ? (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Bulk Titles & Descriptions</label>
              </div>
              <textarea
                value={bulkInput}
                onChange={(e) => setBulkInput(e.target.value)}
                placeholder="Page Title | Meta Description (one set per line, separated by a pipe '|')..."
                className="w-full h-48 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-medium text-gray-800 dark:text-[#F0F6FF] outline-none focus:ring-2 focus:ring-blue-500/20 whitespace-pre"
              />
              <button
                onClick={processBulk}
                className="w-full mt-4 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 hover:scale-[1.01] transition-all"
              >
                Analyze Bulk Data
              </button>
            </div>
          ) : (
            <>
              {/* Title Audit */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Meta Title</label>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${getTitleStatus(title.length).color}`}>
                    {title.length} / 60 — {getTitleStatus(title.length).label}
                  </span>
                </div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter your page title..."
                  className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-medium text-gray-800 dark:text-[#F0F6FF] outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              {/* Description Audit */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Meta Description</label>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${getDescStatus(description.length).color}`}>
                    {description.length} / 160 — {getDescStatus(description.length).label}
                  </span>
                </div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter your meta description for SERP snippets..."
                  className="w-full h-32 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-medium text-gray-800 dark:text-[#F0F6FF] outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {!isBulkMode && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">Google Search Preview</h3>
          <div className="max-w-[600px] font-sans">
            <div className="text-[12px] text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-1">
              https://example.com <span className="text-[10px] opacity-50">▼</span>
            </div>
            <h3 className="text-[20px] text-blue-700 dark:text-blue-400 hover:underline cursor-pointer leading-tight mb-1 line-clamp-1">
              {title || 'Your Page Title Will Appear Here'}
            </h3>
            <p className="text-[14px] text-gray-800 dark:text-gray-300 leading-normal line-clamp-2">
              {description || 'Your meta description will be shown here as a snippet. Make sure it contains your primary keywords and a compelling call to action.'}
            </p>
          </div>
        </div>
      )}

      {isBulkMode && bulkResults.length > 0 && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Bulk Analysis Results</h3>
          <div className="space-y-4 max-h-[400px] overflow-auto">
            {bulkResults.map((res, i) => (
              <div key={i} className="p-4 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47] flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-gray-900 dark:text-white line-clamp-1 flex-1">{res.title || '(Empty Title)'}</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest ml-4 shrink-0 ${res.tStatus.color}`}>{res.titleLen}/60</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-xs text-gray-600 dark:text-[#8A9BBE] line-clamp-2 flex-1">{res.desc || '(Empty Description)'}</span>
                  <span className={`text-[10px] font-black uppercase tracking-widest ml-4 shrink-0 ${res.dStatus.color}`}>{res.descLen}/160</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10 flex items-start gap-4">
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <div className="space-y-2">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-600">Why Length Matters?</h4>
          <p className="text-xs text-gray-500 dark:text-[#8A9BBE] leading-relaxed">
            Search engines like Google truncate titles after ~60 characters and descriptions after ~160 characters. Keeping your meta tags within these limits ensures your message is fully visible and improves Click-Through Rate (CTR).
          </p>
        </div>
      </div>
    </div>
  )
}
