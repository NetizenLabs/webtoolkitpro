'use client'

import React, { useState } from 'react'
import { FileCode, RefreshCw, Copy, CheckCircle2 } from 'lucide-react'

export default function MarkdownConverter() {
  const [markdown, setMarkdown] = useState('# Welcome to WebToolkit Pro\n\nEdit this text to see it converted to **HTML**.')
  const [copied, setCopied] = useState(false)

  // Simple converter for demonstration (In production, use a library like marked)
  const convertToHtml = (md: string) => {
    let html = md
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*)\*/g, '<em>$1</em>')
      .replace(/^\- (.*$)/gm, '<li>$1</li>')
      .replace(/\n/g, '<br />')
    return `<div class="prose">\n${html}\n</div>`
  }

  const htmlOutput = convertToHtml(markdown)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlOutput)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-violet-100 rounded-2xl mb-4">
            <FileCode className="w-8 h-8 text-violet-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Markdown to HTML Converter
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Instantly convert your Markdown content into clean, semantic HTML code for your blog or website.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
          {/* Input */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-violet-500" />
              Markdown Input
            </h2>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="flex-grow w-full p-4 bg-gray-50 rounded-xl border border-gray-100 font-mono text-sm outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Type your markdown here..."
            />
          </div>

          {/* Output */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">HTML Output</h2>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-violet-600 hover:bg-violet-50 rounded-lg transition-all"
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy HTML'}
              </button>
            </div>
            <textarea
              readOnly
              value={htmlOutput}
              className="flex-grow w-full p-4 bg-gray-900 text-gray-100 rounded-xl border border-gray-800 font-mono text-xs outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
