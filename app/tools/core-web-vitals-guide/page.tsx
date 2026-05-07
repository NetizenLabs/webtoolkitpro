'use client'

import React, { useState } from 'react'
import { Zap, Clock, Layout, Info, CheckCircle2, AlertTriangle, TrendingUp, Activity, Terminal, Globe } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import AdSlot from '@/components/ads/AdSlot'

export default function CoreWebVitalsGuide() {
  const [activeMetric, setActiveMetric] = useState('LCP')

  const metrics = {
    LCP: {
      name: 'Largest Contentful Paint',
      label: 'Loading Performance',
      description: 'LCP measures when the largest content element (e.g., hero image or heading) becomes visible in the viewport.',
      thresholds: { good: '< 2.5s', needsImprovement: '2.5s - 4.0s', poor: '> 4.0s' },
      tips: [
        'Optimize your critical rendering path',
        'Use modern image formats like WebP or AVIF',
        'Implement efficient server-side caching',
        'Ensure the LCP element is preloaded'
      ],
      icon: Zap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    INP: {
      name: 'Interaction to Next Paint',
      label: 'Interactivity',
      description: 'INP measures the overall responsiveness of a page to user interactions throughout the entire visit.',
      thresholds: { good: '< 200ms', needsImprovement: '200ms - 500ms', poor: '> 500ms' },
      tips: [
        'Minimize main thread blocking time',
        'Use Web Workers for heavy computations',
        'Break up long tasks (TBT reduction)',
        'Optimize event listeners and DOM updates'
      ],
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    CLS: {
      name: 'Cumulative Layout Shift',
      label: 'Visual Stability',
      description: 'CLS measures the sum total of all individual layout shift scores for every unexpected layout shift that occurs.',
      thresholds: { good: '< 0.1', needsImprovement: '0.1 - 0.25', poor: '> 0.25' },
      tips: [
        'Set width/height attributes on images',
        'Reserve space for dynamic ad slots',
        'Avoid inserting content above existing content',
        'Use font-display: swap to prevent layout jumps'
      ],
      icon: Layout,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    }
  }

  const metric = metrics[activeMetric as keyof typeof metrics]

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-slate-950/50 min-h-screen">
      <BreadcrumbSchema name="Core Web Vitals Monitoring Guide" slug="tools/core-web-vitals-guide" />
      
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Activity className="w-4 h-4" /> 2026 Expert Technical Guide
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight leading-tight">
            The Ultimate Guide to <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Core Web Vitals</span>
          </h1>
          <p className="text-xl text-gray-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Master the three critical metrics Google uses to measure user experience and search ranking authority.
          </p>
        </div>

        {/* Metric Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {Object.entries(metrics).map(([key, m]) => (
            <button
              key={key}
              onClick={() => setActiveMetric(key)}
              className={`p-8 rounded-3xl border transition-all duration-300 text-left group ${
                activeMetric === key 
                  ? 'bg-white dark:bg-slate-900 border-blue-200 dark:border-blue-900/30 shadow-xl ring-1 ring-blue-100 dark:ring-blue-900/10' 
                  : 'bg-transparent border-transparent hover:bg-white/50 dark:hover:bg-slate-900/50'
              }`}
            >
              <m.icon className={`w-8 h-8 mb-4 ${m.color}`} />
              <div className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-1">{m.label}</div>
              <div className="text-2xl font-black text-gray-900 dark:text-white">{key}</div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-7 space-y-8">
            <div className={`p-8 rounded-3xl border border-transparent ${metric.bgColor}`}>
              <h2 className={`text-2xl font-bold mb-4 ${metric.color}`}>{metric.name}</h2>
              <p className="text-gray-700 dark:text-slate-300 leading-relaxed mb-8">
                {metric.description}
              </p>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-white dark:border-slate-800">
                  <div className="text-[10px] font-bold text-green-600 uppercase mb-1">Good</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">{metric.thresholds.good}</div>
                </div>
                <div className="text-center p-4 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-white dark:border-slate-800">
                  <div className="text-[10px] font-bold text-amber-600 uppercase mb-1">Needs Imp.</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">{metric.thresholds.needsImprovement}</div>
                </div>
                <div className="text-center p-4 bg-white/50 dark:bg-slate-900/50 rounded-2xl border border-white dark:border-slate-800">
                  <div className="text-[10px] font-bold text-red-600 uppercase mb-1">Poor</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">{metric.thresholds.poor}</div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" /> Optimization Strategies
              </h3>
              <div className="space-y-4">
                {metric.tips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                    <span className="text-gray-600 dark:text-slate-400 leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Tools Sidebar */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-slate-950 text-slate-200 p-8 rounded-3xl border border-slate-800 shadow-2xl">
              <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                <Terminal className="w-4 h-4" /> Monitoring Stack
              </h3>
              <div className="space-y-6">
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <div className="font-bold text-white text-sm mb-1">Chrome DevTools</div>
                  <p className="text-xs text-slate-400">Use the 'Performance' tab for deep-dive frame analysis.</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <div className="font-bold text-white text-sm mb-1">Lighthouse</div>
                  <p className="text-xs text-slate-400">Automated auditing for lab-data simulations.</p>
                </div>
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                  <div className="font-bold text-white text-sm mb-1">PageSpeed Insights</div>
                  <p className="text-xs text-slate-400">Real-world Field Data from the CrUX report.</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 p-8 rounded-3xl text-white relative overflow-hidden shadow-xl shadow-blue-500/20">
              <Globe className="absolute -bottom-10 -right-10 w-40 h-40 opacity-10" />
              <h3 className="text-lg font-bold mb-2">Ready to Rank?</h3>
              <p className="text-sm text-blue-100 leading-relaxed mb-6">
                Google prioritizes sites that pass all three Core Web Vitals. Use our SEO Checklist to track your progress.
              </p>
              <button className="w-full py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
                View SEO Checklist
              </button>
            </div>
            
            <AdSlot />
          </div>
        </div>
      </div>
    </div>
  )
}
