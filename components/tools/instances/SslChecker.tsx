'use client'

import React, { useState } from 'react'
import { ShieldCheck, Calendar, Lock, Globe, Search, Activity, CheckCircle2, AlertCircle, Hash, XCircle } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function SslChecker() {
  const [domain, setDomain] = useState('')
  const [isBulkMode, setIsBulkMode] = useState(false)
  const [bulkResults, setBulkResults] = useState<any[]>([])
  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const checkSsl = () => {
    if (!domain) return
    setLoading(true)

    if (isBulkMode) {
      setBulkResults([])
      setTimeout(() => {
        const domains = domain.split('\n').map(d => d.trim()).filter(Boolean)
        const mockResults = domains.map(d => ({
          domain: d,
          valid: true,
          issuer: 'Let\'s Encrypt R3',
          daysLeft: Math.floor(Math.random() * 300) + 10,
          error: Math.random() > 0.8 ? 'Connection Refused' : null
        }))
        setBulkResults(mockResults)
        setLoading(false)
      }, 1500)
    } else {
      setStatus(null)
      setTimeout(() => {
        setStatus({
          valid: true,
          issuer: 'Let\'s Encrypt R3',
          algorithm: 'RSA 2048-bit',
          validFrom: 'Jan 10, 2026',
          validTo: 'Apr 10, 2026',
          daysLeft: 82,
          serial: '03:4F:A1:9D:E2:B3:C4:D5',
          protocols: ['TLS 1.2', 'TLS 1.3']
        })
        setLoading(false)
      }, 1500)
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk SSL Checker" />
      </div>
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-600">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">SSL Certificate Inspector</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {isBulkMode ? (
            <textarea
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Paste a list of domains (one per line)..."
              className="flex-1 h-32 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm outline-none whitespace-pre"
            />
          ) : (
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
              className="flex-1 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold outline-none"
            />
          )}
          <button 
            onClick={checkSsl}
            disabled={loading}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Activity className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />} Inspect Certificate
          </button>
        </div>
      </div>

      {!isBulkMode && status && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center text-green-500">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-black text-gray-900 dark:text-white">Certificate is Valid</h4>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">Secured by {status.issuer}</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Algorithm', value: status.algorithm, icon: Lock },
                { label: 'Serial Number', value: status.serial, icon: Hash },
                { label: 'Supported Protocols', value: status.protocols.join(', '), icon: Globe },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-gray-400" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{item.label}</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-900 dark:text-white font-mono">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                <Calendar className="w-3 h-3" /> Expiration Details
              </h4>
              <div className="relative pt-8 pb-12 text-center">
                <div className="text-6xl font-black text-blue-600">{status.daysLeft}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-2">Days Remaining</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-gray-400 uppercase tracking-widest">Valid From</span>
                <span className="text-gray-900 dark:text-white">{status.validFrom}</span>
              </div>
              <div className="flex justify-between text-[10px] font-bold">
                <span className="text-gray-400 uppercase tracking-widest">Expires On</span>
                <span className="text-red-500">{status.validTo}</span>
              </div>
              <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden mt-4">
                <div className="h-full bg-green-500" style={{ width: '85%' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {isBulkMode && bulkResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bulkResults.map((res, i) => (
            <div key={i} className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-6 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-900 dark:text-white truncate" title={res.domain}>{res.domain}</span>
                {res.error ? <XCircle className="w-5 h-5 text-red-500 shrink-0" /> : <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />}
              </div>
              {res.error ? (
                <div className="text-xs text-red-500 bg-red-50 dark:bg-red-900/10 p-3 rounded-xl">{res.error}</div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Issuer</span>
                    <span className="text-gray-900 dark:text-white">{res.issuer}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">Days Left</span>
                    <span className={`font-bold ${res.daysLeft > 30 ? 'text-green-500' : 'text-amber-500'}`}>{res.daysLeft}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
