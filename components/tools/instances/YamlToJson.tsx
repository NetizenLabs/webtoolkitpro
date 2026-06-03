'use client'

import React, { useState } from 'react'
import { FileCode, FileJson, ArrowRight, Copy, Check, RotateCcw, AlertCircle } from 'lucide-react'
import yaml from 'js-yaml'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function YamlToJson() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isBulkMode, setIsBulkMode] = useState(false)

  const convertYamlToJson = () => {
    setError(null)
    try {
      if (!input.trim()) return
      
      if (isBulkMode) {
        const docs: any[] = []
        yaml.loadAll(input, (doc) => { if (doc) docs.push(doc) })
        setOutput(docs.map(d => JSON.stringify(d, null, 2)).join('\n\n// --- NEXT DOCUMENT ---\n\n'))
      } else {
        const doc = yaml.load(input)
        setOutput(JSON.stringify(doc, null, 2))
      }
    } catch (err: any) {
      setError(err.message || "Invalid YAML format")
      setOutput('')
    }
  }

  const copyResult = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk YAML/JSON" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
              <FileCode className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2">
              YAML Input {isBulkMode && <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-[9px] px-1.5 py-0.5 rounded-full">BULK</span>}
            </h3>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isBulkMode ? "name: Doc1\n---\nname: Doc2" : "name: WebToolkit\nversion: 1.0.0\nfeatures:\n  - fast\n  - secure"}
            className={`w-full p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-mono text-gray-800 dark:text-[#F0F6FF] outline-none resize-none ${isBulkMode ? 'h-[400px]' : 'h-80'}`}
          />
          <button onClick={convertYamlToJson} className="w-full mt-6 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-blue-700 transition-all">
            Convert to JSON <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                <FileJson className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">JSON Output</h3>
            </div>
            {output && (
              <button onClick={copyResult} className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            )}
          </div>
          <div className={`bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl p-6 overflow-auto ${isBulkMode ? 'h-[400px]' : 'h-80'}`}>
            {error ? (
              <div className="flex flex-col items-center justify-center h-full text-red-500 gap-2 p-4 text-center">
                <AlertCircle className="w-8 h-8 shrink-0" />
                <span className="text-xs font-bold uppercase break-words">{error}</span>
              </div>
            ) : (
              <pre className="text-xs font-mono text-blue-600 dark:text-[#00D4B4]">{output}</pre>
            )}
          </div>
          <button onClick={() => { setInput(''); setOutput(''); setError(null) }} className="w-full mt-6 py-4 border border-gray-100 dark:border-[#1E2D47] text-gray-400 dark:text-[#4A6080] rounded-xl font-bold uppercase tracking-widest text-[10px] hover:text-red-500 transition-all">
            Reset
          </button>
        </div>
      </div>
    </div>
  )
}
