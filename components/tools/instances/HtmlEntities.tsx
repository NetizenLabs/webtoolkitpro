'use client'

import React, { useState } from 'react'
import { Hash, Code, Copy, Check, RotateCcw } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function HtmlEntities() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const [isBulkMode, setIsBulkMode] = useState(false)

  const encode = () => {
    if (isBulkMode) {
      const lines = text.split('\n');
      const res = lines.map(line => line.replace(/[\u00A0-\u9999<>&]/g, (i) => `&#${i.charCodeAt(0)};`)).join('\n');
      setResult(res);
    } else {
      const res = text.replace(/[\u00A0-\u9999<>&]/g, (i) => `&#${i.charCodeAt(0)};`)
      setResult(res)
    }
  }

  const decode = () => {
    if (isBulkMode) {
      const lines = text.split('\n');
      const res = lines.map(line => {
        const txt = document.createElement('textarea')
        txt.innerHTML = line
        return txt.value
      }).join('\n');
      setResult(res);
    } else {
      const txt = document.createElement('textarea')
      txt.innerHTML = text
      setResult(txt.value)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk HTML Entities" />
      </div>
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Hash className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">HTML Entity Encoder</h3>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={isBulkMode ? "Enter multiple lines of text or &#entity; here..." : "Enter text or &#entity; here..."}
          className="w-full h-48 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-medium text-gray-800 dark:text-[#F0F6FF] outline-none resize-y"
        />

        <div className="grid grid-cols-2 gap-4 mt-6">
          <button onClick={encode} className="py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all">
            {isBulkMode ? 'Bulk Encode' : 'Encode Entities'}
          </button>
          <button onClick={decode} className="py-4 border border-blue-500 text-blue-600 rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-50 transition-all">
            {isBulkMode ? 'Bulk Decode' : 'Decode Entities'}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Result</h3>
            <button onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000) }} className="p-2 text-gray-400">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47] overflow-auto max-h-64">
            <pre className="text-sm font-mono text-blue-600 dark:text-[#00D4B4] whitespace-pre-wrap break-all">{result}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
