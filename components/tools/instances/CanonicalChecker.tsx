'use client'

import React, { useState } from 'react'
import { Link2, Search, CheckCircle2, XCircle, Info, Trash2, ShieldCheck, Copy } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function CanonicalChecker() {
  const [url, setUrl] = useState('')
  const [isBulkMode, setIsBulkMode] = useState(false)
  const [bulkResults, setBulkResults] = useState<any[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [canonical, setCanonical] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  const checkCanonical = async () => {
    if (!url) return
    setStatus('loading')

    if (isBulkMode) {
      setBulkResults([])
      const urls = url.split('\n').map(u => u.trim()).filter(Boolean)
      const results: any[] = []
      
      for (const u of urls) {
        try {
          const targetUrl = u.startsWith('http') ? u : `https://${u}`
          const res = await fetch(`/api/check-canonical?url=${encodeURIComponent(targetUrl)}`)
          const data = await res.json()
          results.push({ url: targetUrl, canonical: data.canonical, error: data.error })
        } catch(e) {
          results.push({ url: u, error: 'Failed to analyze' })
        }
        setBulkResults([...results])
      }
      setStatus('success')
    } else {
      setCanonical(null)
      setMessage('')

      try {
        const targetUrl = url.startsWith('http') ? url : `https://${url}`
        const res = await fetch(`/api/check-canonical?url=${encodeURIComponent(targetUrl)}`)
        const data = await res.json()

        if (data.error) {
          setStatus('error')
          setMessage(data.error)
        } else {
          setStatus('success')
          setCanonical(data.canonical)
          if (data.canonical) {
            const isMatch = data.canonical === targetUrl
            setMessage(isMatch ? 'Canonical matches the current URL.' : 'Canonical points to a different URL.')
          } else {
            setMessage('No canonical tag found on this page.')
          }
        }
      } catch (e) {
        setStatus('error')
        setMessage('Failed to analyze the page.')
      }
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk Canonical Check" />
      </div>
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-10 shadow-sm relative overflow-hidden group">
        <div className="flex flex-col sm:flex-row gap-4 mb-8 relative z-10">
          {isBulkMode ? (
            <textarea
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste a list of URLs (one per line)..."
              className="flex-grow h-32 px-6 py-5 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-transparent focus:ring-2 focus:ring-[#00D4B4] outline-none dark:text-white font-medium whitespace-pre"
            />
          ) : (
            <input 
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/page"
              className="flex-grow px-6 py-5 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-transparent focus:ring-2 focus:ring-[#00D4B4] outline-none dark:text-white font-medium"
            />
          )}
          <button 
            onClick={checkCanonical}
            className="px-10 py-5 bg-[#00D4B4] text-[#0B1120] font-black rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-xs"
          >
            <Search className="w-4 h-4" /> Analyze
          </button>
        </div>

        {status === 'loading' && (
          <div className="flex flex-col items-center py-12">
            <div className="w-12 h-12 border-4 border-emerald-100 border-t-[#00D4B4] rounded-full animate-spin mb-4"></div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Crawling Meta Tags...</p>
          </div>
        )}

        {status === 'success' && !isBulkMode && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className={`p-6 rounded-2xl border flex items-center gap-4 ${canonical ? 'bg-emerald-50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900/30' : 'bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-900/30'}`}>
              {canonical ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <Info className="w-6 h-6 text-amber-500" />}
              <div>
                <span className={`font-black uppercase tracking-tight block ${canonical ? 'text-emerald-800 dark:text-emerald-400' : 'text-amber-800 dark:text-amber-400'}`}>
                  {canonical ? 'Canonical Tag Detected' : 'Missing Canonical Tag'}
                </span>
                <p className="text-xs font-medium opacity-70 mt-1">{message}</p>
              </div>
            </div>

            {canonical && (
              <div className="bg-[#0B1120] border border-[#1E2D47] p-8 rounded-3xl">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-4">Canonical URL</label>
                <div className="flex items-center gap-3 p-4 bg-[#0D1526] border border-[#1E2D47] rounded-xl group relative">
                  <Link2 className="w-4 h-4 text-blue-500 shrink-0" />
                  <code className="text-xs text-blue-400 font-mono break-all">{canonical}</code>
                  <button 
                    onClick={() => navigator.clipboard.writeText(canonical)}
                    className="ml-auto p-2 hover:bg-white/5 rounded-lg text-gray-500 transition-all"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {isBulkMode && bulkResults.length > 0 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500 max-h-[400px] overflow-auto">
            {bulkResults.map((res, i) => (
              <div key={i} className="p-4 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  {res.error ? <XCircle className="w-4 h-4 text-red-500" /> : (res.canonical ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Info className="w-4 h-4 text-amber-500" />)}
                  <span className="text-sm font-bold text-gray-900 dark:text-white truncate">{res.url}</span>
                </div>
                {res.error ? (
                  <span className="text-xs text-red-500">{res.error}</span>
                ) : (
                  res.canonical ? (
                    <code className="text-xs text-emerald-600 dark:text-emerald-400 break-all bg-emerald-50 dark:bg-emerald-900/10 p-2 rounded-lg">{res.canonical}</code>
                  ) : (
                    <span className="text-xs text-amber-500 italic">No canonical tag found</span>
                  )
                )}
              </div>
            ))}
          </div>
        )}

        {status === 'error' && (
          <div className="p-6 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl flex items-center gap-4 animate-in shake duration-500">
            <XCircle className="w-6 h-6 text-red-500" />
            <span className="font-black text-red-800 dark:text-red-400 uppercase tracking-tight">{message}</span>
          </div>
        )}
      </div>

      <div className="p-8 bg-blue-50 dark:bg-blue-900/5 border border-blue-100 dark:border-blue-900/20 rounded-3xl flex items-start gap-6">
        <ShieldCheck className="w-8 h-8 text-blue-500 shrink-0" />
        <div>
          <h5 className="text-lg font-bold text-blue-900 dark:text-blue-400 mb-2 tracking-tight">Why Canonical Tags Matter?</h5>
          <p className="text-sm text-blue-800/70 dark:text-blue-500/70 leading-relaxed font-medium">
            Canonical tags tell search engines which version of a URL is the &quot;master&quot; copy. This prevents duplicate content issues and ensures that your SEO authority is concentrated on the correct page, especially for sites with tracking parameters or multiple entry paths.
          </p>
        </div>
      </div>
    </div>
  )
}
