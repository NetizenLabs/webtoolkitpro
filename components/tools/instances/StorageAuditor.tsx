'use client'

import React, { useState } from 'react'
import { Zap, Search, CheckCircle2, XCircle, Info, ShieldCheck, Database } from 'lucide-react'

export default function StorageAuditor() {
  const [stats, setStats] = useState<any>(null)

  const auditStorage = () => {
    const localCount = Object.keys(localStorage).length
    const sessionCount = Object.keys(sessionStorage).length
    
    let localSize = 0
    for (let key in localStorage) {
      localSize += (localStorage[key].length + key.length) * 2
    }

    setStats({
      localCount,
      sessionCount,
      localSize: (localSize / 1024).toFixed(2),
      keys: Object.keys(localStorage)
    })
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] p-10 shadow-sm text-center">
        <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Database className="w-10 h-10 text-blue-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Browser Storage Auditor</h3>
        <p className="text-sm text-gray-500 dark:text-slate-500 max-w-sm mx-auto mb-8 font-medium">
          Analyze how much data websites are storing in your browser's local and session storage.
        </p>
        
        <button
          onClick={auditStorage}
          className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-blue-500/20 uppercase tracking-widest text-xs flex items-center gap-3 mx-auto"
        >
          <Search className="w-4 h-4" /> Audit My Storage
        </button>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-8 bg-[#0B1120] border border-[#1E2D47] rounded-3xl">
            <span className="text-[10px] font-bold text-[#00D4B4] uppercase block mb-2">Local Storage Keys</span>
            <span className="text-3xl font-black text-white">{stats.localCount}</span>
          </div>
          <div className="p-8 bg-[#0B1120] border border-[#1E2D47] rounded-3xl">
            <span className="text-[10px] font-bold text-blue-400 uppercase block mb-2">Estimated Size</span>
            <span className="text-3xl font-black text-white">{stats.localSize} KB</span>
          </div>
          <div className="p-8 bg-[#0B1120] border border-[#1E2D47] rounded-3xl">
            <span className="text-[10px] font-bold text-purple-400 uppercase block mb-2">Session Keys</span>
            <span className="text-3xl font-black text-white">{stats.sessionCount}</span>
          </div>
        </div>
      )}

      <div className="p-8 bg-blue-50 dark:bg-blue-900/5 border border-blue-100 dark:border-blue-900/20 rounded-3xl flex items-start gap-6">
        <ShieldCheck className="w-8 h-8 text-blue-500 shrink-0" />
        <div>
          <h5 className="text-lg font-bold text-blue-900 dark:text-blue-400 mb-2 tracking-tight">Privacy First Auditing</h5>
          <p className="text-sm text-blue-800/70 dark:text-blue-500/70 leading-relaxed font-medium">
            This tool operates entirely within your browser. It does not send your storage keys or values to any server, ensuring your browsing data remains private and secure.
          </p>
        </div>
      </div>
    </div>
  )
}
