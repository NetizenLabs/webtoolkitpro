'use client'
import React, { useState } from 'react'
import { Globe, User, Calendar, Shield, Search, Activity, FileText, XCircle, CheckCircle2 } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function WhoisLookup() {
  const [domain, setDomain] = useState('')
  const [isBulkMode, setIsBulkMode] = useState(false)
  const [bulkResults, setBulkResults] = useState<any[]>([])
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLookup = async () => {
    if (!domain) return
    setLoading(true)

    if (isBulkMode) {
      setBulkResults([])
      const domains = domain.split('\n').map(d => d.trim()).filter(Boolean)
      const results = []
      for (const d of domains) {
        try {
          const res = await fetch(`/api/whois?domain=${encodeURIComponent(d)}`)
          const json = await res.json()
          if (json.error) {
            results.push({ domain: d, error: json.error })
          } else {
            const statusList = json.status ? (Array.isArray(json.status) ? json.status.join(', ') : json.status) : 'Active'
            results.push({
              domain: d,
              registrar: json.registrar || 'Unknown',
              registered: json.creation_date ? new Date(json.creation_date).toLocaleDateString() : 'Unknown',
              expires: json.expiration_date ? new Date(json.expiration_date).toLocaleDateString() : 'Unknown',
              status: statusList
            })
          }
        } catch (err: any) {
          results.push({ domain: d, error: 'Failed to lookup' })
        }
        setBulkResults([...results])
      }
    } else {
      setData(null)
      setError('')

      try {
        const res = await fetch(`/api/whois?domain=${encodeURIComponent(domain)}`)
        const json = await res.json()
        if (json.error) throw new Error(json.error)
        
        const statusList = json.status ? (Array.isArray(json.status) ? json.status.join(', ') : json.status) : 'Active'
        const nameservers = json.nameservers || []
        
        setData({
          domain: domain,
          registrar: json.registrar || 'Unknown',
          registered: json.creation_date ? new Date(json.creation_date).toLocaleDateString() : 'Unknown',
          expires: json.expiration_date ? new Date(json.expiration_date).toLocaleDateString() : 'Unknown',
          status: statusList,
          nameservers: nameservers,
          registrant: json.registrant || 'REDACTED FOR PRIVACY',
          raw: JSON.stringify(json, null, 2)
        })
      } catch (err: any) {
        setError(err.message || 'Failed to lookup domain')
      }
    }
    setLoading(false)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk WHOIS Lookup" />
      </div>
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Domain WHOIS Lookup</h3>
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
            onClick={handleLookup}
            disabled={loading}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50"
          >
            {loading ? <Activity className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />} Run Lookup
          </button>
        </div>
        {error && <div className="mt-4 text-red-500 text-sm font-bold">{error}</div>}
      </div>

      {!isBulkMode && data && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                <Shield className="w-3 h-3" /> Registration Summary
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Registrar', value: data.registrar, icon: Shield },
                  { label: 'Created', value: data.registered, icon: Calendar },
                  { label: 'Expires', value: data.expires, icon: Calendar },
                  { label: 'Status', value: data.status, icon: Activity },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-black/5">
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon className="w-3 h-3 text-gray-400" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">{item.label}</span>
                    </div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white truncate" title={item.value}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                <FileText className="w-3 h-3" /> Raw Data Output
              </h4>
              <div className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-xl font-mono text-[10px] text-blue-600 dark:text-[#00D4B4] leading-relaxed overflow-auto max-h-64 whitespace-pre-wrap border border-black/5">
                {data.raw}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
              <Globe className="w-3 h-3" /> Name Servers
            </h4>
            <div className="space-y-3">
              {data.nameservers.length > 0 ? data.nameservers.map((ns: string, i: number) => (
                <div key={i} className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-[#00D4B4]">{ns}</span>
                </div>
              )) : <div className="text-sm text-gray-400">No nameservers found</div>}
            </div>
            <div className="mt-8 p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-[#1E2D47]">
              <div className="flex items-center gap-2 mb-2 text-gray-400">
                <User className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-widest">Registrant</span>
              </div>
              <div className="text-xs font-bold text-red-500 italic">{data.registrant}</div>
            </div>
          </div>
        </div>
      )}

      {isBulkMode && bulkResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500 max-h-[600px] overflow-auto">
          {bulkResults.map((res, i) => (
            <div key={i} className="p-6 bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl shadow-sm flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-gray-900 dark:text-white truncate" title={res.domain}>{res.domain}</h4>
                {res.error ? <XCircle className="w-5 h-5 text-red-500 shrink-0" /> : <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />}
              </div>
              {res.error ? (
                <div className="text-xs text-red-500 bg-red-50 dark:bg-red-900/10 p-3 rounded-xl">{res.error}</div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 uppercase tracking-widest font-bold text-[8px]">Registrar</span>
                    <span className="text-gray-900 dark:text-white font-bold truncate max-w-[200px]" title={res.registrar}>{res.registrar}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 uppercase tracking-widest font-bold text-[8px]">Created</span>
                    <span className="text-gray-900 dark:text-white">{res.registered}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 uppercase tracking-widest font-bold text-[8px]">Expires</span>
                    <span className="text-gray-900 dark:text-white">{res.expires}</span>
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
