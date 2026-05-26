'use client'

import React, { useState, useEffect } from 'react'
import { ShieldCheck, Copy, Check, Trash2, AlertCircle, Clock, Zap, AlertTriangle, Info } from 'lucide-react'

export default function JwtDecoder() {
  const [token, setToken] = useState('')
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState<{ header: boolean; payload: boolean }>({ header: false, payload: false })
  const [insights, setInsights] = useState<{ type: 'danger' | 'warning' | 'info', message: string }[]>([])

  const decodeJwt = React.useCallback(() => {
    if (!token.trim()) {
      setHeader('')
      setPayload('')
      setError('')
      return
    }

    try {
      const parts = token.split('.')
      if (parts.length !== 3) {
        throw new Error('Invalid JWT: A token must have 3 parts separated by dots.')
      }

      const decodedHeader = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')))
      const decodedPayload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))

      setHeader(JSON.stringify(decodedHeader, null, 2))
      setPayload(JSON.stringify(decodedPayload, null, 2))
      setError('')
      
      // Run AI Explainer Static Analysis
      const newInsights = []
      
      // Header Analysis
      if (decodedHeader.alg === 'none') {
        newInsights.push({ type: 'danger', message: 'CRITICAL: Algorithm is set to "none". This token is extremely insecure.' })
      } else if (decodedHeader.alg?.startsWith('HS')) {
        newInsights.push({ type: 'info', message: `Uses symmetric encryption (${decodedHeader.alg}). Ensure your secret key is strong and kept completely private.` })
      } else if (decodedHeader.alg?.startsWith('RS')) {
        newInsights.push({ type: 'info', message: `Uses asymmetric encryption (${decodedHeader.alg}). The public key can be safely shared for verification.` })
      }

      // Payload Analysis
      const now = Math.floor(Date.now() / 1000)
      if (!decodedPayload.exp) {
        newInsights.push({ type: 'warning', message: 'Missing "exp" claim. This token never expires, which is a major security risk if compromised.' })
      } else if (decodedPayload.exp < now) {
        newInsights.push({ type: 'danger', message: 'Token is expired according to the "exp" claim.' })
      } else {
        const daysLeft = Math.floor((decodedPayload.exp - now) / 86400)
        newInsights.push({ type: 'info', message: `Token expires in approximately ${daysLeft} days.` })
      }

      if (!decodedPayload.iss) {
        newInsights.push({ type: 'warning', message: 'Missing "iss" (Issuer) claim. The receiver cannot verify who created this token.' })
      }
      
      if (!decodedPayload.aud) {
        newInsights.push({ type: 'warning', message: 'Missing "aud" (Audience) claim. The receiver cannot verify if this token was intended for them.' })
      }

      setInsights(newInsights)

    } catch (err: any) {
      setError(err.message)
      setHeader('')
      setPayload('')
      setInsights([])
    }
  }, [token])

  useEffect(() => {
    decodeJwt()
  }, [decodeJwt])

  const handleCopy = (type: 'header' | 'payload') => {
    const text = type === 'header' ? header : payload
    navigator.clipboard.writeText(text)
    setCopied(prev => ({ ...prev, [type]: true }))
    setTimeout(() => setCopied(prev => ({ ...prev, [type]: false })), 2000)
  }

  const formatTimestamp = (ts: any) => {
    if (typeof ts !== 'number') return 'Invalid'
    return new Date(ts * 1000).toLocaleString()
  }

  return (
    <div className="space-y-8">
      {/* Token Input */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Encoded JWT Token</label>
          <button 
            onClick={() => setToken('')}
            className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1.5 px-3 py-1.5 bg-red-50 dark:bg-red-900/10 rounded-lg transition-all"
          >
            <Trash2 className="w-4 h-4" /> Clear
          </button>
        </div>
        <textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste your JWT (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
          className="w-full h-[120px] p-6 font-mono text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl shadow-sm focus:ring-2 focus:ring-[#00D4B4] outline-none resize-none dark:text-white transition-all"
        />
        {error && (
          <div className="flex items-center gap-2 text-red-400 text-xs font-medium px-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Header Block */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-[#FF00E5] uppercase tracking-widest">Header (Algorithm & Type)</label>
            {header && (
              <button 
                onClick={() => handleCopy('header')}
                className="text-xs font-bold text-[#FF00E5] flex items-center gap-1.5 px-3 py-1.5 bg-[#FF00E5]/5 rounded-lg transition-all border border-[#FF00E5]/10"
              >
                {copied.header ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied.header ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>
          <pre className="w-full h-[250px] p-6 font-mono text-xs bg-[#0B1120] border border-[#1E2D47] rounded-3xl overflow-auto text-[#FF00E5] shadow-inner">
            {header || '// Header JSON will appear here'}
          </pre>
        </div>

        {/* Payload Block */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-[#0094FF] uppercase tracking-widest">Payload (Data & Claims)</label>
            {payload && (
              <button 
                onClick={() => handleCopy('payload')}
                className="text-xs font-bold text-[#0094FF] flex items-center gap-1.5 px-3 py-1.5 bg-[#0094FF]/5 rounded-lg transition-all border border-[#0094FF]/10"
              >
                {copied.payload ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied.payload ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>
          <pre className="w-full h-[250px] p-6 font-mono text-xs bg-[#0B1120] border border-[#1E2D47] rounded-3xl overflow-auto text-[#0094FF] shadow-inner">
            {payload || '// Payload JSON will appear here'}
          </pre>
        </div>
      </div>

      {/* AI Explainer Engine (Local Static Analysis) */}
      {payload && insights.length > 0 && (
        <div className="bg-[#0D1526] border border-[#1E2D47] p-8 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/3" />
          
          <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2 relative z-10">
            <Zap className="w-4 h-4" /> AI Explainer Analysis
          </h4>
          
          <div className="space-y-3 relative z-10">
            {insights.map((insight, idx) => (
              <div 
                key={idx} 
                className={`flex items-start gap-3 p-4 rounded-xl border ${
                  insight.type === 'danger' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                  insight.type === 'warning' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                  'bg-blue-500/10 border-blue-500/20 text-blue-400'
                }`}
              >
                {insight.type === 'danger' ? <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" /> :
                 insight.type === 'warning' ? <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" /> :
                 <Info className="w-5 h-5 shrink-0 mt-0.5" />}
                <p className="text-sm font-medium leading-relaxed">{insight.message}</p>
              </div>
            ))}
          </div>

          {/* Legacy Claims Inspector Data */}
          <div className="mt-8 pt-8 border-t border-[#1E2D47] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {JSON.parse(payload).iat && (
              <div className="p-4 bg-[#0B1120] border border-[#1E2D47] rounded-xl">
                <span className="text-[10px] text-gray-500 block mb-1">Issued At (iat)</span>
                <span className="text-sm font-mono text-white font-bold">{formatTimestamp(JSON.parse(payload).iat)}</span>
              </div>
            )}
            {JSON.parse(payload).exp && (
              <div className="p-4 bg-[#0B1120] border border-[#1E2D47] rounded-xl">
                <span className="text-[10px] text-gray-500 block mb-1">Expires At (exp)</span>
                <span className="text-sm font-mono text-red-400 font-bold">{formatTimestamp(JSON.parse(payload).exp)}</span>
              </div>
            )}
            {JSON.parse(payload).nbf && (
              <div className="p-4 bg-[#0B1120] border border-[#1E2D47] rounded-xl">
                <span className="text-[10px] text-gray-500 block mb-1">Not Before (nbf)</span>
                <span className="text-sm font-mono text-gray-300 font-bold">{formatTimestamp(JSON.parse(payload).nbf)}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Security Warning */}
      <div className="p-6 bg-[#0B1120] border border-[#1E2D47] rounded-2xl flex items-start gap-4">
        <ShieldCheck className="w-6 h-6 text-[#00D4B4] shrink-0" />
        <div>
          <h5 className="text-sm font-bold text-white mb-1">Zero-Knowledge Decoding</h5>
          <p className="text-xs text-[#8A9BBE] leading-relaxed">
            This tool performs decoding entirely in your browser. We never send your JWT to our servers. 
            <strong> Note:</strong> This tool only decodes the token; it does not verify the signature against a secret.
          </p>
        </div>
      </div>
    </div>
  )
}
