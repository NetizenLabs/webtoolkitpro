'use client'
import React, { useState } from 'react'
import { Terminal, Zap, AlertTriangle, Activity } from 'lucide-react'

export default function PortScanner() {
  const [target, setTarget] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [error, setError] = useState('')

  const scanPorts = async () => {
    if (!target) return
    setLoading(true)
    setResults([])
    setError('')
    
    try {
      const res = await fetch(`/api/port-scan?target=${encodeURIComponent(target)}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResults(data.results)
    } catch (e: any) {
      setError(e.message || 'Scan failed')
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
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="example.com or 127.0.0.1"
            className="flex-grow px-8 py-6 rounded-3xl bg-gray-50 dark:bg-slate-950 border border-transparent focus:ring-2 focus:ring-red-500 outline-none dark:text-white font-mono text-lg shadow-inner transition-all"
          />
          <button 
            onClick={scanPorts}
            disabled={loading}
            className="px-12 py-6 bg-red-600 text-white font-black rounded-3xl shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs disabled:opacity-50"
          >
            {loading ? <Activity className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
            {loading ? 'Scanning...' : 'Scan Target'}
          </button>
        </div>

        {error && <div className="text-red-500 font-bold mb-4">{error}</div>}

        {results.length > 0 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Common Port Audit</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((r, i) => (
                <div key={i} className="p-6 bg-[#0B1120] border border-[#1E2D47] rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-red-400 font-bold">Port {r.port}</span>
                    <p className="text-[10px] text-gray-500 font-bold uppercase">{r.service}</p>
                  </div>
                  <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-full ${r.status === 'Open' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-gray-800 text-gray-400 border-gray-700'}`}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-8 bg-red-50 dark:bg-red-900/5 border border-red-100 dark:border-red-900/20 rounded-3xl flex items-start gap-6">
        <AlertTriangle className="w-8 h-8 text-red-500 shrink-0" />
        <div>
          <h5 className="text-lg font-bold text-red-900 dark:text-red-400 mb-2 tracking-tight">Security Notice</h5>
          <p className="text-sm text-red-800/70 dark:text-red-500/70 leading-relaxed font-medium">
            This tool performs a real TCP connection attempt from our server to the target IP address. Scanning external servers may trigger firewall alerts on the target infrastructure.
          </p>
        </div>
      </div>
    </div>
  )
}
