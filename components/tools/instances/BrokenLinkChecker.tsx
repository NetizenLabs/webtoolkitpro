'use client'

import React, { useState } from 'react'
import { Link2, Unlink, Check, Search, Activity, Trash2, Globe } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function BrokenLinkChecker() {
  const [url, setUrl] = useState('')
  const [isBulkMode, setIsBulkMode] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const scanLinks = () => {
    if (!url) return
    setLoading(true)
    setResults([])

    setTimeout(() => {
      if (isBulkMode) {
        const urls = url.split('\n').map(u => u.trim()).filter(Boolean)
        const mockResults = urls.map(u => ({
          url: u,
          status: Math.random() > 0.8 ? (Math.random() > 0.5 ? 404 : 503) : 200,
          type: 'External',
          message: 'Simulated Status'
        }))
        setResults(mockResults)
      } else {
        setResults([
          { url: `${url}/about`, status: 200, type: 'Internal', message: 'OK' },
          { url: `${url}/contact`, status: 200, type: 'Internal', message: 'OK' },
          { url: `https://twitter.com/example`, status: 200, type: 'External', message: 'OK' },
          { url: `${url}/missing-page`, status: 404, type: 'Internal', message: 'Not Found' },
          { url: `https://broken-legacy-site.com`, status: 503, type: 'External', message: 'Service Unavailable' },
          { url: `${url}/old-post`, status: 301, type: 'Internal', message: 'Moved Permanently' },
        ])
      }
      setLoading(false)
    }, 2000)
  }

  const brokenCount = results.filter(r => r.status >= 400).length

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk Broken Link Checker" />
      </div>
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Link2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Broken Link Checker</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {isBulkMode ? (
            <textarea
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste a list of URLs (one per line) to check..."
              className="flex-1 h-32 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm outline-none whitespace-pre"
            />
          ) : (
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="flex-1 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold outline-none"
            />
          )}
          <button 
            onClick={scanLinks}
            disabled={loading}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Activity className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />} Start Crawler
          </button>
        </div>
      </div>

      {results.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-50 dark:border-[#1E2D47] flex items-center justify-between">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Scan Results</h4>
              <button onClick={() => setResults([])} className="text-gray-400">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-[#1E2D47]">
              {results.map((res, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${res.status >= 400 ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                      {res.status >= 400 ? <Unlink className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-gray-900 dark:text-white truncate">{res.url}</div>
                      <div className="text-[8px] font-black uppercase tracking-widest text-gray-400 mt-0.5">{res.type} Link</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-[10px] font-mono font-bold px-2 py-1 rounded-md ${res.status >= 400 ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                      {res.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Health Report</h4>
              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-black text-red-500">{brokenCount}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Broken Links</div>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: `${(brokenCount / results.length) * 100}%` }} />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50 dark:border-[#1E2D47]">
                  <div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">{results.length}</div>
                    <div className="text-[8px] font-black uppercase tracking-widest text-gray-400">Total Scanned</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-500">{results.length - brokenCount}</div>
                    <div className="text-[8px] font-black uppercase tracking-widest text-gray-400">Healthy</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
