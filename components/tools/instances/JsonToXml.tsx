'use client'

import React, { useState } from 'react'
import { FileCode, Copy, Trash2, Check, ArrowRightLeft } from 'lucide-react'
import { useEnterSubmit } from '@/hooks/useEnterSubmit'

export default function JsonToXml() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [rootElement, setRootElement] = useState('root')
  const [copied, setCopied] = useState(false)

  const convertJsonToXml = () => {
    try {
      if (!input.trim()) return
      const parsed = JSON.parse(input)
      
      const toXml = (obj: any, name: string): string => {
        let xml = ''
        if (Array.isArray(obj)) {
          for (const item of obj) {
            xml += toXml(item, name)
          }
        } else if (typeof obj === 'object' && obj !== null) {
          xml += `<${name}>`
          for (const key in obj) {
            xml += toXml(obj[key], key)
          }
          xml += `</${name}>`
        } else {
          xml += `<${name}>${obj}</${name}>`
        }
        return xml
      }

      const result = `<?xml version="1.0" encoding="UTF-8"?>\n${toXml(parsed, rootElement)}`
      
      // Basic formatting (pseudo-indentation for readability)
      setOutput(result.replace(/>(?=<)/g, '>\n'))
      setError('')
    } catch (err: any) {
      setError(`Invalid JSON: ${err.message}`)
      setOutput('')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 mb-8">
        <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2 block">Root Element Name</label>
        <input 
          type="text" 
          value={rootElement}
          onChange={(e) => setRootElement(e.target.value)}
          className="w-full max-w-xs p-3 bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-[#00D4B4]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">JSON Input</label>
            <button 
              onClick={clearAll}
              className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1.5 px-3 py-1.5 bg-red-50 dark:bg-red-900/10 rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4" /> Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{ "name": "WebToolkit Pro", "version": "2.0" }'
            className="w-full h-[500px] p-6 font-mono text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none dark:text-white transition-all"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">XML Output</label>
            {output && (
              <button 
                onClick={handleCopy}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/10 rounded-lg transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy XML'}
              </button>
            )}
          </div>
          <div className="relative">
            <textarea
              readOnly
              value={output || error}
              placeholder="XML output will appear here..."
              className={`w-full h-[500px] p-6 font-mono text-sm border rounded-3xl shadow-2xl outline-none resize-none transition-all ${
                error ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400' : 'bg-gray-900 dark:bg-slate-900 text-gray-100 dark:text-emerald-400 border-gray-800 dark:border-slate-800'
              }`}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={convertJsonToXml}
          className="px-10 py-4 bg-[#00D4B4] text-[#0B1120] rounded-2xl font-black hover:scale-105 transition-all shadow-lg shadow-[#00D4B4]/20 uppercase tracking-widest text-sm flex items-center gap-3"
        >
          Convert to XML <ArrowRightLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
