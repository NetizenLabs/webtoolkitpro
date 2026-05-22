'use client'
import React, { useState } from 'react'
import { Globe, Check, Search, MapPin, Activity, X, Server } from 'lucide-react'

const PROVIDERS = [
  { id: 1, name: 'Google DNS', url: 'https://dns.google/resolve' },
  { id: 2, name: 'Cloudflare DNS', url: 'https://cloudflare-dns.com/dns-query' }
]

export default function DnsPropagation() {
  const [domain, setDomain] = useState('')
  const [type, setType] = useState('A')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const checkDns = async () => {
    if (!domain) return
    setLoading(true)
    setResults([])
    
    try {
      const fetchPromises = PROVIDERS.map(async (provider) => {
        try {
          const res = await fetch(`${provider.url}?name=${encodeURIComponent(domain)}&type=${type}`, {
            headers: { 'Accept': 'application/dns-json' }
          })
          const json = await res.json()
          let answer = 'No records found'
          if (json.Answer && json.Answer.length > 0) {
            answer = json.Answer.map((a: any) => a.data).join(', ')
          }
          return { provider: provider.name, status: 'success', value: answer }
        } catch (e) {
          return { provider: provider.name, status: 'error', value: 'Resolution failed' }
        }
      })
      
      const resolved = await Promise.all(fetchPromises)
      setResults(resolved)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">DNS Resolver</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="example.com"
            className="flex-1 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold outline-none"
          />
          <select 
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full md:w-32 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-bold outline-none appearance-none"
          >
            <option value="A">A</option>
            <option value="AAAA">AAAA</option>
            <option value="CNAME">CNAME</option>
            <option value="MX">MX</option>
            <option value="TXT">TXT</option>
          </select>
          <button 
            onClick={checkDns}
            disabled={loading}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Activity className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />} Check Status
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((loc, i) => (
          <div key={i} className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Server className="w-4 h-4 text-gray-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-white">{loc.provider}</span>
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${loc.status === 'success' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                {loc.status === 'success' ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
              </div>
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl text-xs font-mono text-blue-600 dark:text-[#00D4B4] border border-black/5 dark:border-white/5 break-all">
                {loc.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
