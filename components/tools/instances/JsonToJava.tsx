'use client'

import React, { useState } from 'react'
import { FileCode, Copy, Trash2, Check, ArrowRightLeft, Code } from 'lucide-react'

export default function JsonToJava() {
  const [json, setJson] = useState('{\n  "id": 101,\n  "username": "coder_pro",\n  "isActive": true\n}')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convertJson = () => {
    try {
      const parsed = JSON.parse(json)
      let javaClass = 'public class Root {\n'
      
      for (const [key, val] of Object.entries(parsed)) {
        let javaType = 'String'
        if (typeof val === 'number') javaType = Number.isInteger(val) ? 'int' : 'double'
        if (typeof val === 'boolean') javaType = 'boolean'
        if (Array.isArray(val)) javaType = 'List<String>'
        
        javaClass += `\tpublic ${javaType} ${key};\n`
      }
      
      javaClass += '}'
      setOutput(javaClass)
      setError('')
    } catch (e: any) {
      setError(e.message)
      setOutput('')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">JSON Source</label>
          <textarea
            value={json}
            onChange={(e) => setJson(e.target.value)}
            className="w-full h-[400px] p-6 font-mono text-xs bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl outline-none resize-none dark:text-white transition-all shadow-sm"
          />
        </div>
        <div className="space-y-4 h-full flex flex-col">
          <div className="flex items-center justify-between px-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Java Class Output</label>
            {output && (
              <button 
                onClick={handleCopy}
                className="text-xs font-bold text-amber-600 flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/10 rounded-lg"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>
          <textarea
            readOnly
            value={output || error}
            className="w-full flex-grow p-6 font-mono text-xs bg-[#1E1E1E] text-amber-300 border border-slate-800 rounded-3xl outline-none resize-none"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={convertJson}
          className="px-12 py-4 bg-amber-600 text-white rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-amber-500/20 uppercase tracking-widest text-xs"
        >
          Convert to Java Class
        </button>
      </div>
    </div>
  )
}
