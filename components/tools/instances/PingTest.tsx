'use client'
import React, { useState, useEffect } from 'react'
import { Activity, Search, Trash2, Zap, Server, Globe, CheckCircle2, XCircle } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function PingTest() {
  const [host, setHost] = useState('')
  const [isBulkMode, setIsBulkMode] = useState(false)
  const [bulkResults, setBulkResults] = useState<any[]>([])
  const [isPinging, setIsPinging] = useState(false)
  const [history, setHistory] = useState<{ time: number; status: 'ok' | 'timeout' | 'error'; ms: number }[]>([])

  useEffect(() => {
    let interval: any
    let active = true
    if (isPinging && !isBulkMode) {
      if (!host) {
        setIsPinging(false)
        return
      }
      const target = host.startsWith('http') ? host : `https://${host}`
      
      const ping = async () => {
        if (!active) return
        const start = performance.now()
        try {
          await fetch(target, { mode: 'no-cors', cache: 'no-store' })
          const ms = Math.round(performance.now() - start)
          setHistory((prev) => [{ time: Date.now(), status: 'ok' as const, ms }, ...prev].slice(0, 50))
        } catch (e) {
          setHistory((prev) => [{ time: Date.now(), status: 'error' as const, ms: 0 }, ...prev].slice(0, 50))
        }
      }
      
      ping()
      interval = setInterval(ping, 2000)
    }
    return () => {
      active = false
      clearInterval(interval)
    }
  }, [isPinging, host, isBulkMode])

  const checkBulkPing = async () => {
    if (!host) return
    setIsPinging(true)
    setBulkResults([])
    const domains = host.split('\n').map(d => d.trim()).filter(Boolean)
    const newResults = []
    
    for (const d of domains) {
      const target = d.startsWith('http') ? d : `https://${d}`
      const start = performance.now()
      try {
        await fetch(target, { mode: 'no-cors', cache: 'no-store' })
        const ms = Math.round(performance.now() - start)
        newResults.push({ host: d, status: 'ok', ms })
      } catch(e) {
        newResults.push({ host: d, status: 'error', ms: 0 })
      }
      setBulkResults([...newResults])
    }
    setIsPinging(false)
  }

  const handlePingToggle = () => {
    if (isBulkMode) {
      if (!isPinging) checkBulkPing()
    } else {
      setIsPinging(!isPinging)
    }
  }

  const validHistory = history.filter(h => h.status === 'ok')
  const avgPing = validHistory.length > 0 ? Math.round(validHistory.reduce((a, b) => a + b.ms, 0) / validHistory.length) : 0
  const packetLoss = history.length > 0 ? ((history.filter(h => h.status !== 'ok').length / history.length) * 100).toFixed(1) : '0.0'

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center px-2">
        <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk Ping Tester" />
      </div>
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">HTTP Latency Tester</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {isBulkMode ? (
            <textarea
              value={host}
              onChange={(e) => setHost(e.target.value)}
              disabled={isPinging}
              placeholder="Paste a list of hosts (one per line)..."
              className="flex-1 h-32 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold outline-none font-mono disabled:opacity-50 whitespace-pre"
            />
          ) : (
            <input
              type="text"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              disabled={isPinging}
              placeholder="google.com"
              className="flex-1 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold outline-none font-mono disabled:opacity-50"
            />
          )}
          <button 
            onClick={handlePingToggle}
            className={`px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 ${isPinging ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'}`}
          >
            {isBulkMode ? (isPinging ? 'Pinging...' : 'Start Bulk Ping') : (isPinging ? 'Stop Ping' : 'Start Ping')}
          </button>
        </div>
      </div>

      {!isBulkMode && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Average Latency', value: `${avgPing}ms`, icon: Zap, color: 'text-blue-500' },
              { label: 'Requests Sent', value: history.length, icon: Server, color: 'text-gray-400' },
              { label: 'Request Loss', value: `${packetLoss}%`, icon: Globe, color: 'text-green-500' },
            ].map((stat, i) => (
              <div key={i} className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className={`w-3 h-3 ${stat.color}`} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</span>
                </div>
                <div className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</div>
              </div>
            ))}
          </div>

          <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Response Terminal</h3>
              <button onClick={() => setHistory([])} className="text-[10px] font-bold text-gray-400 hover:text-red-500 flex items-center gap-1 uppercase tracking-widest">
                <Trash2 className="w-3 h-3" /> Clear
              </button>
            </div>
            <div className="h-64 bg-gray-50 dark:bg-[#0B1120] rounded-2xl p-6 font-mono text-[10px] overflow-auto space-y-1">
              {history.length > 0 ? history.map((h, i) => (
                <div key={i} className={`flex items-center gap-4 ${h.status === 'ok' ? 'text-blue-600 dark:text-[#00D4B4]' : 'text-red-500'}`}>
                  <span className="text-gray-400 w-16">[{new Date(h.time).toLocaleTimeString([], { hour12: false })}]</span>
                  <span className="font-bold">
                    {h.status === 'ok' ? `HTTP Request to ${host}: seq=${history.length - i} time=${h.ms}ms` : `Request to ${host} failed or timed out`}
                  </span>
                </div>
              )) : (
                <div className="text-gray-400 italic">Waiting for request sequence...</div>
              )}
            </div>
          </div>
        </>
      )}

      {isBulkMode && bulkResults.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
          {bulkResults.map((res, i) => (
            <div key={i} className="p-6 bg-[#0B1120] border border-[#1E2D47] rounded-3xl flex items-center justify-between">
              <div className="truncate pr-4 flex-1">
                <div className="text-sm font-bold text-white truncate" title={res.host}>{res.host}</div>
                <div className="text-xs text-gray-400 mt-1">{res.status === 'ok' ? `${res.ms}ms` : 'Failed'}</div>
              </div>
              {res.status === 'ok' ? <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" /> : <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
