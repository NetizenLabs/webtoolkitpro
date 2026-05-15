'use client'

import React, { useState } from 'react'
import { FileJson, FileSpreadsheet, ArrowRight, Copy, Check, Trash2, AlertCircle } from 'lucide-react'

export default function CsvToJson() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const convertCsvToJson = () => {
    setError(null)
    try {
      if (!input.trim()) return

      const lines = input.split(/\r?\n/).filter(line => line.trim())
      if (lines.length < 2) {
        throw new Error("CSV must have at least a header and one row of data.")
      }

      const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''))
      const result = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''))
        const obj: any = {}
        headers.forEach((header, i) => {
          obj[header] = values[i] || ""
        })
        return obj
      })

      setOutput(JSON.stringify(result, null, 2))
    } catch (err: any) {
      setError(err.message)
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
        {/* Input */}
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
                <FileSpreadsheet className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">CSV Input</h3>
            </div>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="name,email,role&#10;John Doe,john@example.com,Admin..."
            className="w-full h-80 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-mono text-gray-800 dark:text-[#F0F6FF] outline-none"
          />
          <button
            onClick={convertCsvToJson}
            className="w-full mt-6 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
          >
            Convert to JSON <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Output */}
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                <FileJson className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">JSON Result</h3>
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
          <button
            onClick={() => { setInput(''); setOutput(''); setError(null) }}
            className="w-full mt-6 py-4 border border-gray-100 dark:border-[#1E2D47] text-gray-400 dark:text-[#4A6080] rounded-xl font-bold uppercase tracking-widest text-[10px] hover:text-red-500 transition-all"
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  )
}
