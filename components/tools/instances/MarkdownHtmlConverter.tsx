'use client'

import React, { useState } from 'react'
import { FileCode, Copy, Trash2, Check, ArrowRightLeft } from 'lucide-react'
import { useEnterSubmit } from '@/hooks/useEnterSubmit'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function MarkdownHtmlConverter() {
  const [md, setMd] = useState(`# Project Title\n\nThis is a **Markdown** to HTML converter.\n\n- Feature A\n- Feature B\n\n> "Simplicity is the soul of efficiency."`)
  const [copied, setCopied] = useState(false)
  const [isBulkMode, setIsBulkMode] = useState(false)

  const toHtml = (text: string) => {
    const processMarkdown = (mdStr: string) => {
      return mdStr
        .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
        .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-6 mb-3 border-b pb-2">$1</h2>')
        .replace(/^# (.*$)/gm, '<h2 class="text-2xl font-black mt-8 mb-4 border-b-2 pb-2">$1</h2>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono text-sm text-sky-600">$1</code>')
        .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-sky-500 pl-4 my-4 italic">$1</blockquote>')
        .replace(/^- (.*$)/gm, '<li class="ml-4 list-disc">$1</li>')
        .replace(/\n/g, '<br/>')
    }
    
    if (isBulkMode) {
      return text.split('\n').map(line => processMarkdown(line)).join('\n')
    } else {
      return processMarkdown(text)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(toHtml(md))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearAll = () => {
    setMd('')
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk MD to HTML" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Markdown Source</label>
            <button 
              onClick={clearAll}
              className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1.5 px-3 py-1.5 bg-red-50 dark:bg-red-900/10 rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4" /> Clear
            </button>
          </div>
          <textarea
            value={md}
            onChange={(e) => setMd(e.target.value)}
            placeholder="# Your Markdown Here..."
            className="w-full h-[500px] p-6 font-mono text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none dark:text-white transition-all"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">HTML Output</label>
            {md && (
              <button 
                onClick={handleCopy}
                className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/10 rounded-lg transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy HTML'}
              </button>
            )}
          </div>
          <div className="relative">
            <textarea
              readOnly
              value={toHtml(md)}
              placeholder="HTML output will appear here..."
              className="w-full h-[500px] p-6 font-mono text-sm bg-gray-900 dark:bg-slate-900 text-emerald-400 border border-gray-800 dark:border-slate-800 rounded-3xl shadow-2xl outline-none resize-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="bg-[#0D1526] border border-[#1E2D47] p-8 rounded-3xl">
        <h4 className="text-[10px] font-bold text-[#00D4B4] uppercase tracking-[0.2em] mb-4">Real-time Rendering</h4>
        <div 
          className="prose prose-invert max-w-none bg-white/5 p-6 rounded-2xl border border-white/10"
          dangerouslySetInnerHTML={{ __html: toHtml(md) }}
        />
      </div>
    </div>
  )
}
