'use client'

import React, { useState } from 'react'
import { Terminal, Copy, Trash2, Check, Zap, AlertCircle, Share2, Eye } from 'lucide-react'

export default function WebhookVisualizer() {
  const [json, setJson] = useState('{\n  "event": "order.created",\n  "created_at": "2026-05-15T10:00:00Z",\n  "data": {\n    "id": "ord_12345",\n    "amount": 99.99,\n    "currency": "USD",\n    "customer": {\n      "email": "customer@example.com",\n      "name": "Jane Smith"\n    }\n  }\n}')
  const [error, setError] = useState('')
  const [formatted, setFormatted] = useState('')

  const visualizeWebhook = () => {
    try {
      const parsed = JSON.parse(json)
      setFormatted(JSON.stringify(parsed, null, 2))
      setError('')
    } catch (e: any) {
      setError(e.message)
      setFormatted('')
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payload Editor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Webhook Payload (JSON)
            </label>
            <button 
              onClick={() => setJson('')}
              className="text-[10px] font-bold text-red-500 hover:text-red-600 uppercase tracking-widest"
            >
              Clear
            </button>
          </div>
          <textarea
            value={json}
            onChange={(e) => setJson(e.target.value)}
            className="w-full h-[500px] p-6 font-mono text-xs bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl outline-none resize-none dark:text-white focus:ring-2 focus:ring-purple-500 transition-all"
            placeholder="Paste your webhook JSON payload here..."
          />
        </div>

        {/* Visualization */}
        <div className="space-y-4 h-full flex flex-col">
          <div className="flex items-center justify-between px-2">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Eye className="w-4 h-4" /> Structured View
            </label>
            <div className="flex gap-2">
              <button 
                onClick={() => navigator.clipboard.writeText(formatted)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-gray-400 transition-all"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="relative flex-grow">
            <pre className={`w-full h-full p-8 font-mono text-xs border rounded-[2.5rem] shadow-2xl overflow-auto custom-scrollbar leading-relaxed ${
              error ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400' : 'bg-[#0F172A] text-emerald-400 border-slate-800'
            }`}>
              {formatted || error || 'Visualization will appear here...'}
            </pre>
          </div>

          <div className="p-8 bg-purple-50 dark:bg-purple-900/5 border border-purple-100 dark:border-purple-900/20 rounded-3xl mt-4">
            <div className="flex items-center gap-4 mb-2">
              <Share2 className="w-6 h-6 text-purple-500" />
              <h5 className="text-sm font-black text-purple-900 dark:text-purple-400 tracking-tight uppercase">Debugging Support</h5>
            </div>
            <p className="text-xs text-purple-800/70 dark:text-purple-500/70 leading-relaxed font-medium">
              Use this tool to validate and visualize complex payloads from services like Stripe, GitHub, or Shopify. Helps in mapping data fields correctly for your integration.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={visualizeWebhook}
          className="px-12 py-5 bg-purple-600 text-white rounded-[2rem] font-black hover:scale-105 transition-all shadow-xl shadow-purple-500/20 uppercase tracking-widest text-xs flex items-center gap-3"
        >
          <Zap className="w-4 h-4" /> Visualize Webhook
        </button>
      </div>
    </div>
  )
}
