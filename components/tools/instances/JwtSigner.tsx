'use client'

import React, { useState } from 'react'
import { PenTool, Copy, Check, Trash2, AlertCircle, ShieldCheck, Zap } from 'lucide-react'

export default function JwtSigner() {
  const [header, setHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}')
  const [payload, setPayload] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}')
  const [secret, setSecret] = useState('your-256-bit-secret')
  const [jwt, setJwt] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const base64UrlEncode = (str: string) => {
    return btoa(str)
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
  }

  const signJwt = async () => {
    try {
      setError('')
      const headerObj = JSON.parse(header)
      const payloadObj = JSON.parse(payload)

      if (headerObj.alg !== 'HS256') {
        throw new Error('Only HS256 algorithm is currently supported for client-side signing.')
      }

      const encodedHeader = base64UrlEncode(JSON.stringify(headerObj))
      const encodedPayload = base64UrlEncode(JSON.stringify(payloadObj))
      const tokenToSign = `${encodedHeader}.${encodedPayload}`

      // SubtleCrypto HMAC-SHA256
      const encoder = new TextEncoder()
      const keyData = encoder.encode(secret)
      const messageData = encoder.encode(tokenToSign)

      const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
      )

      const signature = await window.crypto.subtle.sign(
        'HMAC',
        cryptoKey,
        messageData
      )

      const encodedSignature = base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)))
      setJwt(`${tokenToSign}.${encodedSignature}`)
    } catch (err: any) {
      setError(err.message)
      setJwt('')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(jwt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearAll = () => {
    setHeader('{\n  "alg": "HS256",\n  "typ": "JWT"\n}')
    setPayload('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}')
    setSecret('')
    setJwt('')
    setError('')
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Header (JSON)</label>
            <textarea
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              className="w-full h-[150px] p-6 font-mono text-xs bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl outline-none resize-none dark:text-white focus:ring-2 focus:ring-[#00D4B4] transition-all"
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Payload (JSON)</label>
            <textarea
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              className="w-full h-[250px] p-6 font-mono text-xs bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl outline-none resize-none dark:text-white focus:ring-2 focus:ring-[#00D4B4] transition-all"
            />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">HS256 Secret</label>
            <input
              type="text"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="your-256-bit-secret"
              className="w-full p-6 font-mono text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl outline-none dark:text-white focus:ring-2 focus:ring-[#00D4B4] transition-all"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={signJwt}
              className="flex-grow py-4 bg-[#0094FF] text-white rounded-2xl font-black hover:scale-[1.02] transition-all shadow-lg shadow-blue-500/20 uppercase tracking-widest text-sm flex items-center justify-center gap-3"
            >
              <PenTool className="w-5 h-5" /> Sign Token
            </button>
            <button
              onClick={clearAll}
              className="px-6 py-4 bg-red-50 dark:bg-red-900/10 text-red-500 rounded-2xl font-bold hover:bg-red-100 transition-all"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Output */}
        <div className="space-y-4 flex flex-col h-full">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Encoded JWT</label>
            {jwt && (
              <button 
                onClick={handleCopy}
                className="text-xs font-bold text-[#00D4B4] flex items-center gap-1.5 px-3 py-1.5 bg-[#00D4B4]/5 rounded-lg transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied' : 'Copy Token'}
              </button>
            )}
          </div>
          <div className="relative flex-grow">
            <textarea
              readOnly
              value={jwt || error}
              placeholder="Signed JWT will appear here..."
              className={`w-full h-full p-8 font-mono text-sm border rounded-[2.5rem] shadow-2xl outline-none resize-none transition-all ${
                error ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400' : 'bg-gray-900 dark:bg-slate-950 text-white border-gray-800 dark:border-slate-800'
              }`}
            />
          </div>
          
          <div className="p-8 bg-[#0B1120] border border-[#1E2D47] rounded-3xl mt-4">
            <div className="flex items-start gap-4 mb-4">
              <ShieldCheck className="w-6 h-6 text-[#00D4B4]" />
              <div>
                <h5 className="text-sm font-bold text-white mb-1 tracking-tight">Privacy Guard</h5>
                <p className="text-[10px] text-gray-500 leading-relaxed uppercase tracking-wider font-bold">Local-First Processing</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              We use the native <span className="text-white font-bold">HMAC-SHA256</span> implementation for signature generation. Your secret and payload are never sent to a server.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
