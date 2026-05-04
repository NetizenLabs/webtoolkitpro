'use client'

import React, { useState } from 'react'
import { Code2, Copy, Trash2, Check, Zap } from 'lucide-react'

export default function JsMinifier() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const minifyJs = () => {
    if (!input.trim()) return

    // Basic regex-based minification
    let minified = input
      .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1') // Remove comments
      .replace(/\s+/g, ' ') // Collapse multiple spaces
      .replace(/\s*([{};,])\s*/g, '$1') // Remove spaces around delimiters
      .trim()

    setOutput(minified)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Tool Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl shadow-lg">
              <Code2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">JavaScript Minifier</h1>
              <p className="text-gray-600">Compress your JS code by removing comments and whitespace</p>
            </div>
          </div>
          <div className="flex gap-3">
             <button 
              onClick={clearAll}
              className="px-4 py-2 text-sm font-bold text-red-600 bg-white border border-red-100 rounded-xl hover:bg-red-50 transition-all flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" /> Clear All
            </button>
          </div>
        </div>

        {/* Ad Slot */}
        <div className="mb-10 min-h-[90px] flex items-center justify-center">
           {/* AdSense In-Article Top */}
        </div>

        {/* Main Editor Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Input Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Source Code (JS)</label>
              <span className="text-xs text-gray-400 font-mono">{input.length} chars</span>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="function welcome() { console.log('Hello World'); }"
              className="w-full h-[450px] p-6 font-mono text-sm bg-white border border-gray-200 rounded-3xl shadow-sm focus:ring-4 focus:ring-yellow-500/10 focus:border-yellow-500 outline-none resize-none transition-all"
            />
          </div>

          {/* Output Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Minified Result</label>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-400 font-mono">{output.length} chars</span>
                {output && (
                  <button 
                    onClick={handleCopy}
                    className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy Results'}
                  </button>
                )}
              </div>
            </div>
            <div className="relative group">
              <textarea
                readOnly
                value={output}
                placeholder="Compressed code will appear here..."
                className="w-full h-[450px] p-6 font-mono text-sm bg-gray-900 text-yellow-400 border border-gray-800 rounded-3xl shadow-2xl outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center">
          <button
            onClick={minifyJs}
            disabled={!input.trim()}
            className="group relative px-10 py-5 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-yellow-500/20 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span className="flex items-center gap-3">
              Minify JavaScript <Zap className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            </span>
          </button>
        </div>

        {/* Ad Slot */}
        <div className="mt-16 min-h-[250px] flex items-center justify-center">
           {/* AdSense In-Article Bottom */}
        </div>

        {/* Tool Info / SEO Section */}
        <div className="mt-20 prose prose-gray max-w-none bg-white p-10 rounded-3xl border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">About JavaScript Minifier</h2>
          <p>
            Our JavaScript Minifier is a free online tool that helps you compress your JS code by removing unnecessary characters like comments, extra spaces, and newlines. This reduces file size, which leads to faster page load times and better performance for your web applications.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Why minify JS?</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Faster Download: Smaller files download more quickly.</li>
                <li>Bandwidth Savings: Reduces data transfer costs for you and your users.</li>
                <li>Improved SEO: Faster sites rank higher on search engines.</li>
                <li>Obfuscation: Makes code slightly harder to read at a glance.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Privacy First</h3>
              <p className="text-sm">
                Like all tools on WebToolkit Pro, minification happens 100% in your browser. Your code is never sent to our servers, ensuring your intellectual property stays private and secure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
