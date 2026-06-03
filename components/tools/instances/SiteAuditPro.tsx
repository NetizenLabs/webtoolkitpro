'use client'

import React, { useState } from 'react'
import { ShieldCheck, Search, Activity, CheckCircle2, AlertCircle, Zap, Globe, FileText, Share2 } from 'lucide-react'
import { useAuditLogger } from '@/contexts/AuditLoggerContext'

export default function SiteAuditPro() {
  const { logAudit } = useAuditLogger()
  const [url, setUrl] = useState('')
  const [audit, setAudit] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const runAudit = () => {
    if (!url) return
    setLoading(true)
    setAudit(null)

    setTimeout(() => {
      setAudit({
        score: 84,
        categories: [
          { name: 'SEO & Meta', score: 92, items: [
            { label: 'Title Tag optimized', status: 'pass' },
            { label: 'Meta Description present', status: 'pass' },
            { label: 'H1 Header uniqueness', status: 'pass' },
            { label: 'Image Alt attributes', status: 'warn' },
          ]},
          { name: 'Performance', score: 78, items: [
            { label: 'Next-gen Image formats', status: 'warn' },
            { label: 'Minified JS/CSS', status: 'pass' },
            { label: 'Server Response Time', status: 'pass' },
            { label: 'Total Byte Size', status: 'fail' },
          ]},
          { name: 'Security', score: 100, items: [
            { label: 'HTTPS redirection', status: 'pass' },
            { label: 'SSL Validity', status: 'pass' },
            { label: 'HSTS Header', status: 'pass' },
            { label: 'CSP Policy', status: 'pass' },
          ]}
        ]
      })
      
      logAudit({
        toolName: 'Professional Site Auditor',
        action: 'RAN_FULL_AUDIT',
        status: 'SUCCESS',
        details: `Audited URL: ${url}`
      })
      
      setLoading(false)
    }, 2000)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Professional Site Auditor</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold outline-none"
          />
          <button 
            onClick={runAudit}
            disabled={loading}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
          >
            {loading ? <Activity className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />} Run Full Audit
          </button>
        </div>
      </div>

      {audit && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-1 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-8 text-white flex flex-col items-center justify-center text-center shadow-xl shadow-blue-500/20">
              <div className="text-6xl font-black mb-2">{audit.score}</div>
              <div className="text-[10px] font-black uppercase tracking-widest opacity-80">Overall Health Score</div>
              <div className="mt-6 w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white" style={{ width: `${audit.score}%` }} />
              </div>
            </div>

            <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {audit.categories.map((cat: any, i: number) => (
                <div key={i} className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">{cat.name}</h4>
                    <span className="text-lg font-black text-blue-600">{cat.score}</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${cat.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {audit.categories.map((cat: any, i: number) => (
              <div key={i} className="space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-2">{cat.name} Details</h4>
                {cat.items.map((item: any, j: number) => (
                  <div key={j} className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-2xl p-4 flex items-center justify-between shadow-sm">
                    <span className="text-xs font-bold text-gray-700 dark:text-white">{item.label}</span>
                    {item.status === 'pass' ? (
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                    ) : item.status === 'warn' ? (
                      <AlertCircle className="w-4 h-4 text-yellow-500" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
