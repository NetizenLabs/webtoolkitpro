'use client'

import React, { useState, useMemo } from 'react'
import { DollarSign, TrendingDown, Clock, MousePointer2, AlertCircle, Info, Globe, TrendingUp, Terminal, Activity } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import AdSlot from '@/components/ads/AdSlot'

export default function ApiLatencyCalculator() {
  const [requests, setRequests] = useState(100000)
  const [latency, setLatency] = useState(500)
  const [revenue, setRevenue] = useState(50)
  const [currency, setCurrency] = useState('USD')

  const currencies = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 },
  }

  const results = useMemo(() => {
    // 100ms latency = ~1% conversion drop (industry standard)
    const conversionDrop = (latency / 100) * 1.0
    const monthlyRequests = requests * 30
    const impactedRevenue = (monthlyRequests * revenue * conversionDrop) / 100
    const timeWasted = (monthlyRequests * latency) / 3600000 // Convert ms to hours

    return {
      monthlyLoss: impactedRevenue,
      annualLoss: impactedRevenue * 12,
      conversionDrop,
      timeWasted
    }
  }, [requests, latency, revenue])

  const efficiencyScore = Math.max(0, 100 - (results.conversionDrop * 10))
  const currentCurrency = currencies[currency as keyof typeof currencies]

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-slate-950/50 min-h-screen">
      <BreadcrumbSchema name="API Latency Cost Calculator" slug="tools/api-latency-calculator" />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/20">
              <TrendingDown className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">API Latency Cost Calculator</h1>
              <p className="text-gray-500 dark:text-slate-400">Calculate the financial impact of network latency on your enterprise revenue</p>
            </div>
          </div>
          
          <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm">
            {Object.keys(currencies).map((c) => (
              <button
                key={c}
                onClick={() => setCurrency(c)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${currency === c ? 'bg-red-600 text-white shadow-md' : 'text-gray-500 dark:text-slate-400 hover:text-gray-900'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Environment Data</h2>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Daily API Requests</label>
                    <span className="text-sm font-black text-red-600 dark:text-red-400">{requests.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="1000000"
                    step="1000"
                    className="w-full h-1.5 bg-gray-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                    value={requests}
                    onChange={(e) => setRequests(Number(e.target.value))}
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Average Latency (ms)</label>
                    <span className="text-sm font-black text-red-600 dark:text-red-400">{latency} ms</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="5000"
                    step="10"
                    className="w-full h-1.5 bg-gray-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                    value={latency}
                    onChange={(e) => setLatency(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-3">Avg Transaction Value</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">{currentCurrency.symbol}</span>
                    <input
                      type="number"
                      className="w-full pl-8 pr-4 py-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-transparent focus:ring-2 focus:ring-red-500 outline-none transition-all dark:text-white font-black"
                      value={revenue}
                      onChange={(e) => setRevenue(Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/10 p-6 rounded-3xl border border-amber-100 dark:border-amber-900/30">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 dark:text-amber-400 leading-relaxed">
                  <strong>Technical Fact:</strong> Amazon research indicates that every 100ms of latency costs 1% in sales. Google found a 0.5s delay caused a 20% drop in traffic.
                </p>
              </div>
            </div>
          </div>

          {/* Results Analysis */}
          <div className="lg:col-span-7 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                <div className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-widest mb-2">Monthly Revenue Loss</div>
                <div className="text-4xl font-black text-gray-900 dark:text-white mb-2">
                  {currentCurrency.symbol}{(results.monthlyLoss * currentCurrency.rate).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </div>
                <p className="text-xs text-gray-500 dark:text-slate-400">Impact based on {results.conversionDrop.toFixed(1)}% drop.</p>
              </div>

              <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 shadow-2xl">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 text-center">Network Efficiency Score</div>
                <div className="flex justify-center mb-4">
                  <div className={`text-5xl font-black ${efficiencyScore > 80 ? 'text-green-500' : efficiencyScore > 50 ? 'text-amber-500' : 'text-red-500'}`}>
                    {Math.round(efficiencyScore)}
                  </div>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${efficiencyScore > 80 ? 'bg-green-500' : efficiencyScore > 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${efficiencyScore}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/10 p-8 rounded-[2.5rem] border border-red-100 dark:border-red-900/30">
              <h3 className="text-xl font-bold text-red-700 dark:text-red-400 mb-6 flex items-center gap-2">
                <Activity className="w-6 h-6" /> Executive ROI Analysis
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-red-200/30">
                  <span className="text-sm text-red-700/80 dark:text-red-400/80 font-medium">Annual Opportunity Loss</span>
                  <span className="text-2xl font-black text-red-700 dark:text-red-400">
                    {currentCurrency.symbol}{(results.annualLoss * currentCurrency.rate).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 bg-white/50 dark:bg-slate-950/50 rounded-2xl border border-red-200 dark:border-red-900/30">
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-2">
                      <Clock className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Time Delay</span>
                    </div>
                    <div className="text-xl font-black text-gray-900 dark:text-white">{results.timeWasted.toLocaleString(undefined, { maximumFractionDigits: 0 })} hrs/mo</div>
                  </div>
                  <div className="p-5 bg-white/50 dark:bg-slate-950/50 rounded-2xl border border-red-200 dark:border-red-900/30">
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-2">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Growth Potential</span>
                    </div>
                    <div className="text-xl font-black text-gray-900 dark:text-white">+{results.conversionDrop.toFixed(1)}% CR</div>
                  </div>
                </div>

                <p className="text-sm text-red-700/60 dark:text-red-400/60 leading-relaxed italic">
                  "Optimization isn't just about speed; it's about reclaiming the revenue that's already yours."
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-gray-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:scale-110 transition-transform">
            <Activity className="w-48 h-48 text-red-600" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <Terminal className="w-6 h-6 text-red-600" /> Technical Impact Report
            </h2>
            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-600 dark:text-slate-400 mb-10">
              <p className="mb-6">
                Latency isn't just a technical metric; it's a direct inhibitor of user satisfaction and business growth. In high-performance enterprise systems, every millisecond counts toward the final bottom line.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <MousePointer2 className="w-4 h-4 text-red-500" /> Conversion Friction
                  </h4>
                  <p className="text-xs leading-relaxed">As latency increases, users experience 'micro-frustrations' that lead to session abandonment. This is especially critical in mobile-first environments.</p>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-red-500" /> Global Edge Distribution
                  </h4>
                  <p className="text-xs leading-relaxed">Reducing latency often requires moving logic closer to the user via CDN edge workers (Next.js Edge Runtime or Cloudflare Workers).</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30 gap-6">
              <div className="text-left">
                <h4 className="font-bold text-red-700 dark:text-red-400 mb-1">Optimize Your Core Web Vitals</h4>
                <p className="text-xs text-red-600/70 dark:text-red-400/70">Master the metrics Google uses to rank high-performance websites.</p>
              </div>
              <Link 
                href="/tools/core-web-vitals-guide/"
                className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all hover:-translate-y-0.5 whitespace-nowrap"
              >
                Explore Expert Guide <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        
        <AdSlot className="mt-16" />
      </div>
    </div>
  )
}
