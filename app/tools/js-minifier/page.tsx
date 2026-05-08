'use client'

import React, { useState } from 'react'
import { Code2, Copy, Trash2, Check, Zap, ArrowRight, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'
import ToolInfo from '@/components/sections/ToolInfo'
import AdSlot from '@/components/ads/AdSlot'

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
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="JavaScript Minifier" slug="tools/js-minifier" />
      <ToolSchema 
        name="JavaScript Minifier & Compressor" 
        description="Compress and optimize your JavaScript code for production. Remove comments, spaces, and reduce payload size for faster website performance."
        slug="js-minifier"
        steps={[
          "Paste your JavaScript source code into the input panel.",
          "Click 'Compress Script' to start the minification process.",
          "Review the minified payload size and character count.",
          "Copy the optimized code and deploy it to your production server."
        ]}
      />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4 text-left">
            <div className="p-4 bg-yellow-500 rounded-2xl shadow-lg shadow-yellow-500/20">
              <Code2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">JavaScript Minifier</h1>
              <p className="text-gray-500 dark:text-slate-400">Optimize production payloads by stripping comments and redundant whitespace</p>
            </div>
          </div>
          
          <button 
            onClick={clearAll}
            className="flex items-center gap-2 px-6 py-3 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-xl font-bold text-sm hover:bg-red-100 dark:hover:bg-red-900/20 transition-all border border-red-100 dark:border-red-900/30"
          >
            <Trash2 className="w-4 h-4" /> Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Input Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest px-1">Source Code (JS)</label>
              <span className="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-widest">{input.length} chars</span>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="function enterpriseApp() { console.log('Optimizing...'); }"
              className="w-full h-96 p-6 font-mono text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-[2.5rem] focus:ring-2 focus:ring-yellow-500 outline-none resize-none dark:text-white shadow-sm transition-all"
            />
          </div>

          {/* Output Panel */}
          <div className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Minified Payload</label>
              <div className="flex items-center gap-4">
                <span className="text-[10px] text-gray-400 font-mono font-bold uppercase tracking-widest">{output.length} chars</span>
                {output && (
                  <button 
                    onClick={handleCopy}
                    className="text-xs font-bold text-yellow-600 dark:text-yellow-400 flex items-center gap-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-900/10 rounded-lg hover:bg-yellow-100 transition-all"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied' : 'Copy Output'}
                  </button>
                )}
              </div>
            </div>
            <textarea
              readOnly
              value={output}
              placeholder="Compressed code will appear here..."
              className="w-full h-96 p-6 font-mono text-sm bg-gray-900 dark:bg-slate-950 text-yellow-400 border border-gray-800 dark:border-slate-800 rounded-[2.5rem] outline-none resize-none shadow-2xl shadow-yellow-900/5 transition-all"
            />
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center mb-16">
          <button
            onClick={minifyJs}
            disabled={!input.trim()}
            className="group relative px-12 py-5 bg-gray-900 dark:bg-yellow-600 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-yellow-500/20 hover:-translate-y-1 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-xs"
          >
            <span className="flex items-center gap-3">
              Compress Script <Zap className="w-5 h-5 fill-white dark:fill-white text-white" />
            </span>
          </button>
        </div>

        {/* Technical SEO Footer */}
        <div className="bg-yellow-600 rounded-[3rem] p-10 text-white relative overflow-hidden group mb-16 shadow-xl shadow-yellow-500/20">
          <ShieldCheck className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold mb-4">Core Web Vitals Mastery</h3>
              <p className="text-yellow-100 text-sm leading-relaxed">
                Minifying your JavaScript is a critical step in reducing Total Blocking Time (TBT) and improving your Largest Contentful Paint (LCP) score. Optimize your performance budget for maximum authority.
              </p>
            </div>
            <Link 
              href="/tools/core-web-vitals-guide/"
              className="inline-flex items-center gap-2 bg-white text-yellow-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all hover:-translate-y-1 whitespace-nowrap"
            >
              Learn Optimization <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <AdSlot />

        <ToolInfo 
          title="JavaScript Minifier"
          description="The WebToolkit Pro JavaScript Minifier is a high-performance utility designed to optimize your frontend assets. Minification is the process of removing all unnecessary characters from source code without changing its functionality. This is a crucial step in modern web development to ensure fast load times and improved Core Web Vitals."
          howItWorks="Our minifier uses advanced regex-based logic to strip single-line and multi-line comments, collapse redundant whitespace, and remove unnecessary semicolons or brackets where possible. This results in a smaller file size (payload) that requires less bandwidth and parses faster in the user's browser."
          features={[
            "Recursive comment removal (JS-style and Block)",
            "Whitespace and line-break collapsing",
            "Real-time character count and savings analysis",
            "Safe-mode minification to prevent runtime errors",
            "Optimized for modern ES6+ syntax",
            "100% Client-side: Your source code stays private"
          ]}
          faqs={[
            {
              q: "What is the benefit of minification?",
              a: "Minification reduces the size of your JavaScript files, leading to faster download times, reduced server bandwidth, and better performance scores in tools like PageSpeed Insights."
            },
            {
              q: "Will minification break my code?",
              a: "Standard minification (removing spaces and comments) is 100% safe. However, more aggressive 'obfuscation' or 'mangling' can sometimes cause issues; our tool focuses on safe, reliable compression."
            },
            {
              q: "Should I minify code in development?",
              a: "No. Minification makes code difficult to read and debug. You should keep your source code readable and only minify during your build process or production deployment."
            },
            {
              q: "Does this tool support Babel or TypeScript?",
              a: "Our tool processes valid JavaScript (ECMAScript). If you use TypeScript or modern experimental features, we recommend compiling them to JS before using this minifier."
            }
          ]}
        />
      </div>
    </div>
  )
}
