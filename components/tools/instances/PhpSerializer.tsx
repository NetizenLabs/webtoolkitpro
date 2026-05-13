'use client'
import React, { useState } from 'react'
import { serialize, unserialize } from 'php-serialize'
import { FileCode, RefreshCw, Copy, Check, Trash2, Zap } from 'lucide-react'
import { triggerQuickSuccess } from '@/lib/effects'

export default function PhpSerializer() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'serialize' | 'unserialize'>('serialize')
  const [copied, setCopied] = useState(false)

  const handleProcess = () => {
    if (!input.trim()) return
    try {
      if (mode === 'serialize') {
        // Try to parse input as JSON first
        const data = JSON.parse(input)
        const result = serialize(data)
        setOutput(result)
      } else {
        const result = unserialize(input)
        setOutput(JSON.stringify(result, null, 2))
      }
      triggerQuickSuccess()
    } catch (err) {
      console.error(err)
      alert(mode === 'serialize' 
        ? 'Invalid JSON input for serialization. Please provide valid JSON.' 
        : 'Invalid PHP serialized string. Please check the format.')
    }
  }

  const handleCopy = () => {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
    triggerQuickSuccess()
  }

  const handleClear = () => {
    setInput('')
    setOutput('')
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl shadow-blue-900/5 mb-8">
        <div className="flex p-1 bg-gray-50 dark:bg-slate-800 rounded-2xl w-fit mb-8">
          <button 
            onClick={() => setMode('serialize')}
            className={`px-6 py-3 rounded-xl text-xs font-bold transition-all ${mode === 'serialize' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            JSON to PHP Serialize
          </button>
          <button 
            onClick={() => setMode('unserialize')}
            className={`px-6 py-3 rounded-xl text-xs font-bold transition-all ${mode === 'unserialize' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
          >
            PHP Unserialize to JSON
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                <FileCode className="w-4 h-4 text-blue-500" /> Input {mode === 'serialize' ? 'JSON' : 'PHP Serialized'}
              </h3>
              <button onClick={handleClear} className="text-xs font-bold text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1">
                <Trash2 className="w-3.5 h-3.5" /> Clear
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'serialize' ? '{"name": "WebToolkit Pro", "active": true}...' : 'a:2:{s:4:"name";s:14:"WebToolkit Pro";s:6:"active";b:1;}...'}
              className="w-full h-[350px] p-6 bg-white dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-slate-200 font-mono text-sm resize-none transition-all"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-500" /> Output {mode === 'serialize' ? 'PHP Serialized' : 'JSON'}
              </h3>
              {output && (
                <button onClick={handleCopy} className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy Result'}
                </button>
              )}
            </div>
            <textarea
              readOnly
              value={output}
              placeholder="Processed data will appear here..."
              className="w-full h-[350px] p-6 bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-3xl dark:text-blue-400 font-mono text-sm resize-none outline-none shadow-inner"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button 
            onClick={handleProcess}
            className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> {mode === 'serialize' ? 'Serialize Now' : 'Unserialize Now'}
          </button>
        </div>
      </div>
    </div>
  )
}
