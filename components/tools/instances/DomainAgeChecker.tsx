'use client'

import React, { useState } from 'react'
import { Calendar, Search, Globe, Info, Trash2, ShieldCheck, Zap, Clock } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function DomainAgeChecker() {
  const [domain, setDomain] = useState('')
  const [isBulkMode, setIsBulkMode] = useState(false)
  const [bulkResults, setBulkResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const checkDomain = async () => {
    if (!domain) return
    setLoading(true)

    if (isBulkMode) {
      setBulkResults([])
      const domains = domain.split('\n').map(d => d.trim()).filter(Boolean)
      const results = []
      
      for (const d of domains) {
        try {
          const cleanDomain = d.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0];
          const response = await fetch(`/api/whois?domain=${encodeURIComponent(cleanDomain)}`);
          const data = await response.json();
          if (data.status === 'OK' && data.whois && data.whois.registry_created_date) {
            const createdDate = new Date(data.whois.registry_created_date);
            const expiryDate = new Date(data.whois.registry_expiration_date);
            const now = new Date();
            let years = now.getFullYear() - createdDate.getFullYear();
            let months = now.getMonth() - createdDate.getMonth();
            let days = now.getDate() - createdDate.getDate();
            if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
            if (months < 0) { years--; months += 12; }
            results.push({
              domain: cleanDomain,
              created: createdDate.toISOString().split('T')[0],
              age: `${years}y ${months}m`,
              expiry: data.whois.registry_expiration_date ? expiryDate.toISOString().split('T')[0] : 'Unknown',
            })
          } else {
            results.push({ domain: cleanDomain, error: 'Could not retrieve data' })
          }
        } catch(e) {
          results.push({ domain: d, error: 'Error fetching data' })
        }
        setBulkResults([...results])
      }
    } else {
      setResult(null)
      try {
        const cleanDomain = domain.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0];
        const response = await fetch(`/api/whois?domain=${encodeURIComponent(cleanDomain)}`);
        const data = await response.json();
        
        if (data.status === 'OK' && data.whois && data.whois.registry_created_date) {
          const createdDate = new Date(data.whois.registry_created_date);
          const expiryDate = new Date(data.whois.registry_expiration_date);
          const now = new Date();
          
          let years = now.getFullYear() - createdDate.getFullYear();
          let months = now.getMonth() - createdDate.getMonth();
          let days = now.getDate() - createdDate.getDate();
          
          if (days < 0) {
            months--;
            days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
          }
          if (months < 0) {
            years--;
            months += 12;
          }
          
          setResult({
            domain: cleanDomain,
            created: createdDate.toISOString().split('T')[0],
            age: `${years} Years, ${months} Months, ${days} Days`,
            expiry: data.whois.registry_expiration_date ? expiryDate.toISOString().split('T')[0] : 'Unknown',
            registrar: data.whois.registrar || 'Unknown'
          })
        } else {
          alert('Could not retrieve WHOIS data for this domain.');
        }
      } catch (e) {
        console.error(e);
        alert('Error fetching domain data.');
      }
    }
    setLoading(false)
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk Domain Age Checker" />
      </div>
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group">
        <div className="flex flex-col sm:flex-row gap-4 mb-10 relative z-10">
          {isBulkMode ? (
            <textarea 
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Paste a list of domains (one per line)..."
              className="flex-grow h-32 px-8 py-6 rounded-3xl bg-gray-50 dark:bg-slate-950 border border-transparent focus:ring-2 focus:ring-blue-500 outline-none dark:text-white font-medium shadow-inner transition-all whitespace-pre"
            />
          ) : (
            <input 
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
              className="flex-grow px-8 py-6 rounded-3xl bg-gray-50 dark:bg-slate-950 border border-transparent focus:ring-2 focus:ring-blue-500 outline-none dark:text-white font-medium shadow-inner transition-all"
            />
          )}
          <button 
            onClick={checkDomain}
            disabled={loading}
            className="px-12 py-6 bg-blue-600 text-white font-black rounded-3xl shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
          >
            {loading ? <Zap className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            {loading ? 'Checking...' : 'Check Age'}
          </button>
        </div>

        {!isBulkMode && result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in zoom-in duration-500">
            <div className="p-8 bg-[#0B1120] border border-[#1E2D47] rounded-3xl">
              <div className="flex items-center gap-4 mb-4">
                <Calendar className="w-6 h-6 text-blue-400" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Domain Age</span>
              </div>
              <h3 className="text-2xl font-black text-white">{result.age}</h3>
            </div>
            
            <div className="p-8 bg-[#0B1120] border border-[#1E2D47] rounded-3xl space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <span className="text-[10px] font-bold text-gray-500 uppercase">Created On</span>
                <span className="text-xs font-mono text-blue-400">{result.created}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <span className="text-[10px] font-bold text-gray-500 uppercase">Expires On</span>
                <span className="text-xs font-mono text-amber-400">{result.expiry}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-gray-500 uppercase">Registrar</span>
                <span className="text-xs font-bold text-white">{result.registrar}</span>
              </div>
            </div>
          </div>
        )}

        {isBulkMode && bulkResults.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-500">
            {bulkResults.map((res, i) => (
              <div key={i} className="p-6 bg-[#0B1120] border border-[#1E2D47] rounded-3xl">
                <h4 className="text-sm font-bold text-white mb-4 truncate" title={res.domain}>{res.domain}</h4>
                {res.error ? (
                  <p className="text-xs text-red-500">{res.error}</p>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Age</span>
                      <span className="text-blue-400 font-bold">{res.age}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-500">Created</span>
                      <span className="text-white">{res.created}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-8 bg-blue-50 dark:bg-blue-900/5 border border-blue-100 dark:border-blue-900/20 rounded-3xl flex items-start gap-6">
        <Clock className="w-8 h-8 text-blue-500 shrink-0" />
        <div>
          <h5 className="text-lg font-bold text-blue-900 dark:text-blue-400 mb-2 tracking-tight">Domain Authority Insights</h5>
          <p className="text-sm text-blue-800/70 dark:text-blue-500/70 leading-relaxed font-medium">
            Domain age is a significant factor in SEO and trust-building. Older domains often carry more authority in search engines, while expiration dates provide insights into a project&apos;s long-term commitment.
          </p>
        </div>
      </div>
    </div>
  )
}
