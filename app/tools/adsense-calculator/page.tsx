'use client'

import React, { useState, useMemo } from 'react'
import { DollarSign, BarChart3, PieChart, Users, Target, Info, TrendingUp, Sparkles } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'
import ToolInfo from '@/components/sections/ToolInfo'
import AdSlot from '@/components/ads/AdSlot'

const niches = [
  { name: 'Technology', avgCpc: 1.20, avgCtr: 1.5, color: 'text-blue-500' },
  { name: 'Finance', avgCpc: 3.50, avgCtr: 2.0, color: 'text-emerald-500' },
  { name: 'Health', avgCpc: 0.90, avgCtr: 1.2, color: 'text-rose-500' },
  { name: 'Travel', avgCpc: 0.70, avgCtr: 1.0, color: 'text-amber-500' },
  { name: 'Entertainment', avgCpc: 0.25, avgCtr: 0.8, color: 'text-purple-500' }
]

export default function AdSenseCalculator() {
  const [dailyViews, setDailyViews] = useState(5000)
  const [ctr, setCtr] = useState(1.5)
  const [cpc, setCpc] = useState(0.50)

  const applyNiche = (niche: typeof niches[0]) => {
    setCpc(niche.avgCpc)
    setCtr(niche.avgCtr)
  }

  const earnings = useMemo(() => {
    const daily = dailyViews * (ctr / 100) * cpc
    const monthly = daily * 30.42
    const yearly = daily * 365
    return { daily, monthly, yearly }
  }, [dailyViews, ctr, cpc])

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="AdSense Revenue Estimator" slug="adsense-calculator" />
      <ToolSchema 
        name="Google AdSense Revenue Calculator" 
        description="Estimate your potential website earnings from Google AdSense. Calculate revenue based on daily views, CTR, and CPC across different niches."
        slug="adsense-calculator"
        steps={[
          "Select a niche preset (e.g., Technology, Finance) to load average CPC and CTR.",
          "Adjust the daily page views slider to match your traffic expectations.",
          "Fine-tune the CTR (Click-Through Rate) and CPC (Cost Per Click) values.",
          "Analyze your projected daily, monthly, and yearly earnings."
        ]}
      />
      
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-2xl mb-4 border border-emerald-200 dark:border-emerald-800">
            <DollarSign className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">AdSense Revenue Estimator</h1>
          <p className="text-xl text-gray-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Calculate your potential earnings from Google AdSense based on traffic, CTR, and niche-specific CPC benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 shadow-sm">
              <h2 className="text-sm font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-8">Estimation Controls</h2>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Daily Page Views</label>
                    <input 
                      type="number"
                      value={dailyViews}
                      onChange={(e) => setDailyViews(parseInt(e.target.value) || 0)}
                      className="w-24 px-2 py-1 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-right font-black text-emerald-600 dark:text-emerald-400 text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <input 
                    type="range" 
                    min="100" 
                    max="1000000" 
                    step="100"
                    value={dailyViews}
                    onChange={(e) => setDailyViews(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-2">CTR (%)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={ctr}
                      onChange={(e) => setCtr(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-slate-400 uppercase mb-2">CPC ($)</label>
                    <input 
                      type="number" 
                      step="0.01"
                      value={cpc}
                      onChange={(e) => setCpc(parseFloat(e.target.value) || 0)}
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 dark:border-slate-800">
                  <span className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">Quick Niche Presets</span>
                  <div className="grid grid-cols-2 gap-2">
                    {niches.map((niche) => (
                      <button 
                        key={niche.name}
                        onClick={() => applyNiche(niche)}
                        className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest border border-gray-100 dark:border-slate-800 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/10 hover:border-emerald-200 transition-all text-gray-600 dark:text-slate-400"
                      >
                        {niche.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Projection Display */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Daily Earnings', value: earnings.daily, icon: Target },
                { label: 'Monthly Earnings', value: earnings.monthly, icon: PieChart },
                { label: 'Yearly Potential', value: earnings.yearly, icon: TrendingUp }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
                  <stat.icon className="absolute -right-4 -bottom-4 w-24 h-24 text-gray-50 dark:text-slate-800 group-hover:text-emerald-50 dark:group-hover:text-emerald-900/10 transition-colors" />
                  <div className="relative z-10">
                    <span className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2">{stat.label}</span>
                    <span className="text-3xl font-black text-gray-900 dark:text-white">
                      ${stat.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-emerald-600 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden">
              <Sparkles className="absolute top-0 right-0 w-64 h-64 opacity-10 -mr-12 -mt-12" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="w-6 h-6 text-emerald-200" />
                  <h3 className="text-xl font-bold tracking-tight">Earning Projection Analysis</h3>
                </div>
                <p className="text-emerald-50 leading-relaxed mb-8 max-w-2xl">
                  Based on your current traffic of **{dailyViews.toLocaleString()} views/day**, you are on track to generate **${earnings.yearly.toLocaleString(undefined, { maximumFractionDigits: 0 })} per year**. To double this, focus on high-intent keywords in the **Finance** or **Technology** sectors where CPC averages are higher.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="px-4 py-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                    <span className="block text-[10px] uppercase font-bold text-emerald-200">CPC Advantage</span>
                    <span className="text-lg font-bold">${cpc.toFixed(2)}</span>
                  </div>
                  <div className="px-4 py-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/10">
                    <span className="block text-[10px] uppercase font-bold text-emerald-200">CTR Efficiency</span>
                    <span className="text-lg font-bold">{ctr}%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-slate-900/50 rounded-3xl p-8 border border-gray-100 dark:border-slate-800">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-emerald-500 shrink-0 mt-1" />
                <div>
                  <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2 uppercase tracking-widest">About AdSense Estimates</h4>
                  <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">
                    Actual earnings depend on many factors including visitor location, device type, content quality, and advertiser competition. These estimates use industry standard averages for established sites.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AdSense slot for the tool itself */}
        <AdSlot className="mt-16" />

        <ToolInfo 
          title="AdSense Revenue Estimator"
          description="The WebToolkit Pro AdSense Revenue Estimator is a professional financial tool for publishers and content creators. It provides data-driven projections of potential advertising revenue by analyzing three critical variables: traffic volume, user engagement (CTR), and advertiser demand (CPC)."
          howItWorks="Our calculator uses the standard revenue formula: `Earnings = Views x CTR x CPC`. We provide specialized 'Niche Presets' based on 2026 industry benchmarks. For instance, the Finance niche typically commands higher CPCs due to the high lifetime value of customers in that sector, whereas Entertainment relies on massive traffic volume to compensate for lower per-click values."
          features={[
            "Real-time revenue projections for daily/monthly/yearly",
            "Niche-specific presets for Finance, Tech, Health, and more",
            "Interactive traffic volume slider (up to 1M views)",
            "Dynamic CTR and CPC fine-tuning controls",
            "Responsive dashboard with dark mode support",
            "100% Client-side: Your traffic data stays private"
          ]}
          faqs={[
            {
              q: "What is CTR in AdSense?",
              a: "CTR (Click-Through Rate) is the percentage of visitors who click on an ad. A standard CTR for informational sites usually ranges between 1% and 2%."
            },
            {
              q: "Why is Finance CPC so much higher than Travel?",
              a: "Finance advertisers (banks, insurance, crypto) are willing to pay more for a lead because the profit from a single customer is significantly higher than that of a travel booking."
            },
            {
              q: "How can I increase my AdSense earnings?",
              a: "Focus on improving content quality to attract high-CPC advertisers, optimize ad placement for better CTR, and use SEO to drive organic traffic from high-income regions (Tier 1 countries)."
            },
            {
              q: "Does traffic source affect revenue?",
              a: "Yes. Organic search traffic usually yields higher CTR and CPC than social media traffic because search users have higher intent and are more likely to interact with relevant ads."
            }
          ]}
        />
      </div>
    </div>
  )
}
