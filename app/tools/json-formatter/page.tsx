'use client'

import React, { useState } from 'react'
import { FileJson, Copy, Trash2, Check } from 'lucide-react'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const formatJson = () => {
    try {
      if (!input.trim()) return
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError('')
    } catch (err: any) {
      setError(err.message)
      setOutput('')
    }
  }

  const minifyJson = () => {
    try {
      if (!input.trim()) return
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError('')
    } catch (err: any) {
      setError(err.message)
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                'position': 1,
                'name': 'Home',
                'item': 'https://wtkpro.site'
              },
              {
                '@type': 'ListItem',
                'position': 2,
                'name': 'Tools',
                'item': 'https://wtkpro.site/tools'
              },
              {
                '@type': 'ListItem',
                'position': 3,
                'name': 'JSON Formatter',
                'item': 'https://wtkpro.site/tools/json-formatter'
              }
            ]
          }),
        }}
      />
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-blue-600 rounded-xl">
            <FileJson className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">JSON Formatter</h1>
            <p className="text-gray-600">Clean, format, and validate your JSON data</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Input JSON</label>
              <button 
                onClick={clearAll}
                className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Clear
              </button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your messy JSON here..."
              className="w-full h-[500px] p-4 font-mono text-sm bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Output</label>
              {output && (
                <button 
                  onClick={handleCopy}
                  className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
            <div className="relative">
              <textarea
                readOnly
                value={output || error}
                placeholder="Formatted output will appear here..."
                className={`w-full h-[500px] p-4 font-mono text-sm border rounded-xl shadow-sm outline-none resize-none ${
                  error ? 'bg-red-50 border-red-200 text-red-600' : 'bg-gray-900 text-gray-100 border-gray-800'
                }`}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button
            onClick={formatJson}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Format JSON
          </button>
          <button
            onClick={minifyJson}
            className="px-8 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-900 transition-all shadow-lg shadow-gray-200"
          >
            Minify JSON
          </button>
        </div>
      </div>
    </div>
  )
}
