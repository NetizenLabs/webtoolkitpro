'use client'
import React, { useState } from 'react'
import { Link as LinkIcon, Search, RefreshCw, ArrowRight, CheckCircle2, Shield, Globe } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function RedirectChecker() {
  const [url, setUrl] = useState('')
  const [isBulkMode, setIsBulkMode] = useState(false)
  const [bulkResults, setBulkResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleCheck = async () => {
    if (!url) return
    setLoading(true)

    if (isBulkMode) {
      setBulkResults([])
      const urls = url.split('\n').map(u => u.trim()).filter(Boolean)
      const newResults = []
      for (const u of urls) {
        try {
          const res = await fetch(`/api/check-redirect?url=${encodeURIComponent(u)}`)
          const data = await res.json()
          newResults.push({ url: u, data, error: data.error })
        } catch(e: any) {
          newResults.push({ url: u, error: e.message })
        }
        setBulkResults([...newResults])
      }
    } else {
      setResults(null)
      try {
        const res = await fetch(`/api/check-redirect?url=${encodeURIComponent(url)}`)
        const data = await res.json()
        if (data.error) throw new Error(data.error)
        setResults(data)
      } catch (e: any) {
        alert('Failed to check: ' + e.message)
      }
    }
    setLoading(false)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk Redirect Checker" />
      </div>
      <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            {!isBulkMode && (
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-gray-400" />
              </div>
            )}
            {isBulkMode ? (
              <textarea
                placeholder="Enter URLs to trace (one per line)..."
                className="block w-full h-32 p-4 bg-gray-50 dark:bg-slate-800/50 border border-transparent rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white font-medium whitespace-pre"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            ) : (
              <input
                type="url"
                placeholder="Enter URL to trace..."
                className="block w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-slate-800/50 border border-transparent rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white font-medium"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            )}
          </div>
          <button
            onClick={handleCheck}
            disabled={loading}
            className="px-10 py-4 bg-indigo-600 text-white font-bold rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            Trace
          </button>
        </div>
      </div>

      {!isBulkMode && results && (
        <div className="space-y-12 relative pl-8 sm:pl-12 py-4">
          <div className="absolute left-[23px] sm:left-[31px] top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 via-indigo-300 to-green-500 rounded-full opacity-20" />
          {results.chain.map((step: any, index: number) => {
            const isLast = index === results.chain.length - 1
            return (
              <div key={index} className="relative">
                <div className={`absolute -left-[33px] sm:-left-[41px] top-1/2 -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center z-10 shadow-sm ${isLast ? 'bg-green-500' : 'bg-indigo-500'}`}>
                  {isLast ? <CheckCircle2 className="w-3 h-3 text-white" /> : <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-gray-100 dark:border-slate-800 shadow-sm">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="min-w-0 flex-grow">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${isLast ? 'bg-green-100 text-green-700' : 'bg-indigo-100 text-indigo-700'}`}>{isLast ? 'Destination' : `Hop #${index + 1}`}</span>
                        <span className="text-[10px] font-mono text-gray-400">{step.statusText}</span>
                      </div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{step.url}</h3>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="flex flex-col items-end">
                        <div className={`text-2xl font-black ${step.status < 300 ? 'text-green-500' : 'text-amber-500'}`}>{step.status}</div>
                        <span className="text-[9px] font-bold text-gray-400 uppercase">Status</span>
                      </div>
                      <div className="w-12 h-12 bg-gray-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-gray-400">{isLast ? <Shield className="w-6 h-6" /> : <ArrowRight className="w-6 h-6" />}</div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {isBulkMode && bulkResults.length > 0 && (
        <div className="space-y-6">
          {bulkResults.map((res, i) => (
            <div key={i} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm">
              <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-4 truncate">Target: {res.url}</h3>
              {res.error ? (
                <div className="text-red-500 text-xs">{res.error}</div>
              ) : (
                <div className="space-y-4">
                  {res.data.chain.map((step: any, index: number) => {
                    const isLast = index === res.data.chain.length - 1
                    return (
                      <div key={index} className="flex items-center gap-4 bg-gray-50 dark:bg-slate-800/50 p-4 rounded-xl">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isLast ? 'bg-green-500 text-white' : 'bg-indigo-500 text-white'}`}>
                          {isLast ? <CheckCircle2 className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="text-xs font-mono text-gray-500 truncate mb-1">{step.url}</div>
                          <div className={`text-[10px] font-black uppercase ${step.status < 300 ? 'text-green-500' : 'text-amber-500'}`}>Status: {step.status}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
