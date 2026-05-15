'use client'

import React, { useState } from 'react'
import { FileCode, Braces, ArrowRight, Copy, Check, RotateCcw, AlertCircle } from 'lucide-react'

export default function JsonToTs() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const convertJsonToTs = () => {
    setError(null)
    try {
      if (!input.trim()) return
      const parsed = JSON.parse(input)
      
      let ts = 'interface RootObject {\n'
      if (Array.isArray(parsed)) {
        if (parsed.length > 0) {
          ts = generateInterface(parsed[0], 'RootObject')
        } else {
          ts = 'interface RootObject {}'
        }
      } else {
        ts = generateInterface(parsed, 'RootObject')
      }
      
      setOutput(ts)
    } catch (err: any) {
      setError("Invalid JSON format")
      setOutput('')
    }
  }

  const generateInterface = (obj: any, name: string): string => {
    let result = `interface ${name} {\n`
    for (const key in obj) {
      const value = obj[key]
      const type = typeof value
      let tsType = 'any'
      
      if (type === 'string') tsType = 'string'
      else if (type === 'number') tsType = 'number'
      else if (type === 'boolean') tsType = 'boolean'
      else if (Array.isArray(value)) tsType = 'any[]'
      else if (value === null) tsType = 'null'
      else if (type === 'object') tsType = 'object'
      
      result += `  ${key}: ${tsType};\n`
    }
    result += '}'
    return result
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
              <Braces className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">JSON Input</h3>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{ "id": 1, "name": "WebToolkit" }'
            className="w-full h-80 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-mono text-gray-800 dark:text-[#F0F6FF] outline-none"
          />
          <button onClick={convertJsonToTs} className="w-full mt-6 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-blue-700 transition-all">
            Generate TS Interface <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                <FileCode className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">TypeScript Interface</h3>
            </div>
            {output && (
              <button onClick={copyResult} className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            )}
          </div>
          <div className="h-80 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl p-6 overflow-auto">
            {error ? (
              <div className="flex flex-col items-center justify-center h-full text-red-500 gap-2">
                <AlertCircle className="w-8 h-8" />
                <span className="text-xs font-bold uppercase">{error}</span>
              </div>
            ) : (
              <pre className="text-xs font-mono text-blue-600 dark:text-[#00D4B4]">{output}</pre>
            )}
          </div>
          <button onClick={() => { setInput(''); setOutput(''); setError(null) }} className="w-full mt-6 py-4 border border-gray-100 dark:border-[#1E2D47] text-gray-400 dark:text-[#4A6080] rounded-xl font-bold uppercase tracking-widest text-[10px] hover:text-red-500 transition-all">
            <RotateCcw className="w-4 h-4 mx-auto" />
          </button>
        </div>
      </div>
    </div>
  )
}
