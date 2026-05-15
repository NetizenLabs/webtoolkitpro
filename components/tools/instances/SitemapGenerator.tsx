'use client'

import React, { useState } from 'react'
import { FileCode, Copy, Trash2, Check, Download, Plus, X, Globe } from 'lucide-react'

export default function SitemapGenerator() {
  const [urls, setUrls] = useState<string[]>(['https://example.com/'])
  const [newUrl, setNewUrl] = useState('')
  const [xml, setXml] = useState('')
  const [copied, setCopied] = useState(false)

  const addUrl = () => {
    if (!newUrl) return
    const formatted = newUrl.startsWith('http') ? newUrl : `https://${newUrl}`
    setUrls([...urls, formatted])
    setNewUrl('')
  }

  const removeUrl = (index: number) => {
    setUrls(urls.filter((_, i) => i !== index))
  }

  const generateSitemap = () => {
    const date = new Date().toISOString().split('T')[0]
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`
    
    urls.forEach(url => {
      sitemap += `  <url>\n`
      sitemap += `    <loc>${url}</loc>\n`
      sitemap += `    <lastmod>${date}</lastmod>\n`
      sitemap += `    <priority>0.80</priority>\n`
      sitemap += `  </url>\n`
    })

    sitemap += `</urlset>`
    setXml(sitemap)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(xml)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadSitemap = () => {
    const blob = new Blob([xml], { type: 'text/xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'sitemap.xml'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Area */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 shadow-sm">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-4 block">Add Website URLs</label>
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addUrl()}
                placeholder="https://example.com/page"
                className="flex-grow p-4 bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button 
                onClick={addUrl}
                className="p-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-auto pr-2 custom-scrollbar">
              {urls.map((url, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-xl group">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Globe className="w-4 h-4 text-blue-500 shrink-0" />
                    <span className="text-xs font-mono text-gray-600 dark:text-slate-300 truncate">{url}</span>
                  </div>
                  <button onClick={() => removeUrl(index)} className="text-red-400 opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={generateSitemap}
              className="w-full mt-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black hover:scale-[1.02] transition-all shadow-xl shadow-blue-500/20 uppercase tracking-widest text-sm flex items-center justify-center gap-3"
            >
              <FileCode className="w-5 h-5" /> Build Sitemap XML
            </button>
          </div>
        </div>

        {/* Output Area */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Sitemap.xml Output</label>
            {xml && (
              <div className="flex gap-2">
                <button 
                  onClick={downloadSitemap}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-gray-400 transition-all"
                  title="Download XML"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleCopy}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/10 rounded-lg transition-all"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy XML'}
                </button>
              </div>
            )}
          </div>
          <div className="relative h-[550px]">
            <textarea
              readOnly
              value={xml}
              placeholder="XML output will appear here after clicking Build..."
              className="w-full h-full p-8 font-mono text-xs bg-gray-900 dark:bg-slate-950 text-blue-300 border border-gray-800 dark:border-slate-800 rounded-[2.5rem] shadow-2xl outline-none resize-none transition-all leading-relaxed"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
