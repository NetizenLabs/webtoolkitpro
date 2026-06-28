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
                className="flex-grow p-4 bg-gray-50/50 dark:bg-slate-950/50 border border-gray-200 dark:border-slate-800 rounded-2xl text-sm font-medium outline-none focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300"
              />
              <button 
                onClick={addUrl}
                className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] active:scale-95"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-2 max-h-[300px] overflow-auto pr-2 custom-scrollbar">
              {urls.map((url, index) => (
                <div key={index} className="flex items-center justify-between p-3.5 bg-gray-50/80 dark:bg-slate-900/50 border border-gray-100 dark:border-slate-800 rounded-xl group hover:border-blue-500/30 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <Globe className="w-4 h-4 text-blue-500 shrink-0 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-xs font-mono text-gray-600 dark:text-slate-300 truncate">{url}</span>
                  </div>
                  <button onClick={() => removeUrl(index)} className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 p-1.5 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={generateSitemap}
              className="w-full mt-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.25)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] uppercase tracking-widest text-sm flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              <FileCode className="w-5 h-5 drop-shadow-md" /> Build Sitemap XML
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
              className="w-full h-full p-8 font-mono text-xs bg-[#0B1120] text-[#8A9BBE] border border-[#1E2D47] rounded-[2.5rem] shadow-2xl focus:border-blue-500/50 focus:shadow-[0_0_30px_rgba(59,130,246,0.15)] outline-none resize-none transition-all duration-500 leading-relaxed custom-scrollbar"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
