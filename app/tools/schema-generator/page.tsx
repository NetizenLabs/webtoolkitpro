'use client'

import React, { useState } from 'react'
import { Code, Copy, CheckCircle2, RefreshCw } from 'lucide-react'

export default function SchemaGenerator() {
  const [type, setType] = useState('Organization')
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [copied, setCopied] = useState(false)

  const generateSchema = () => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': type,
      'name': name,
      'url': url,
      'description': description
    }
    return JSON.stringify(schema, null, 2)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateSchema())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 rounded-2xl mb-4">
            <Code className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            JSON-LD Schema Generator
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Generate high-value structured data to help your site earn rich snippets in Google search results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-emerald-500" />
              Configure Schema
            </h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Schema Type</label>
                <select 
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option>Organization</option>
                  <option>WebSite</option>
                  <option>LocalBusiness</option>
                  <option>Person</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Name</label>
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., WebToolkit Pro"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">URL</label>
                <input 
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Short description of your site..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">JSON-LD Output</h2>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy Schema'}
              </button>
            </div>
            <pre className="flex-grow p-4 bg-gray-50 rounded-xl border border-gray-100 text-xs font-mono text-gray-700 overflow-auto">
              {generateSchema()}
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
