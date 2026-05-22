'use client'

import React, { useState } from 'react'
import { Calendar, Search, Globe, Info, Trash2, ShieldCheck, Zap, Clock } from 'lucide-react'

export default function DomainAgeChecker() {
  const [domain, setDomain] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const checkDomain = async () => {
    if (!domain) return
    setLoading(true)
    setResult(null)
    
    try {
      // Remove any http/https protocols if pasted
      const cleanDomain = domain.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').split('/')[0];
      const response = await fetch(`https://networkcalc.com/api/dns/whois/${encodeURIComponent(cleanDomain)}`);
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
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group">
        <div className="flex flex-col sm:flex-row gap-4 mb-10 relative z-10">
          <input 
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="example.com"
            className="flex-grow px-8 py-6 rounded-3xl bg-gray-50 dark:bg-slate-950 border border-transparent focus:ring-2 focus:ring-blue-500 outline-none dark:text-white font-medium shadow-inner transition-all"
          />
          <button 
            onClick={checkDomain}
            disabled={loading}
            className="px-12 py-6 bg-blue-600 text-white font-black rounded-3xl shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
          >
            {loading ? <Zap className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            {loading ? 'Checking...' : 'Check Age'}
          </button>
        </div>

        {result && (
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
