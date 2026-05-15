'use client'

import React, { useState } from 'react'
import { FileCode, FileJson, ArrowRight, Copy, Check, RotateCcw, AlertCircle } from 'lucide-react'
import yaml from 'js-yaml'

export default function YamlToJson() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const convertYamlToJson = () => {
    setError(null)
    try {
      if (!input.trim()) return
      const doc = yaml.load(input)
      setOutput(JSON.stringify(doc, null, 2))
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
              <FileCode className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">YAML Input</h3>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="name: WebToolkit&#10;version: 1.0.0&#10;features:&#10;  - fast&#10;  - secure"
            className="w-full h-80 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-mono text-gray-800 dark:text-[#F0F6FF] outline-none"
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
          <div className="h-80 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl p-6 overflow-auto">
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
