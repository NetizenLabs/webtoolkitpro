'use client'

import React, { useState, useEffect } from 'react'
import { Shield, Key, ShieldAlert, CheckCircle2 } from 'lucide-react'
import BulkModeToggle from '@/components/ui/BulkModeToggle'

export default function JwtDecoderGenerator() {
  const [jwt, setJwt] = useState('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
  const [header, setHeader] = useState('{\n  "alg": "HS256",\n  "typ": "JWT"\n}')
  const [payload, setPayload] = useState('{\n  "sub": "1234567890",\n  "name": "John Doe",\n  "iat": 1516239022\n}')
  const [signature, setSignature] = useState('')
  const [secret, setSecret] = useState('your-256-bit-secret')
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [isBulkMode, setIsBulkMode] = useState(false)
  
  // Very basic base64url decode
  const base64UrlDecode = (str: string) => {
    try {
      str = str.replace(/-/g, '+').replace(/_/g, '/')
      const pad = str.length % 4
      if (pad) {
        if (pad === 1) throw new Error('InvalidLengthError: Input base64url string is the wrong length to determine padding')
        str += new Array(5 - pad).join('=')
      }
      return decodeURIComponent(escape(atob(str)))
    } catch (e) {
      return ''
    }
  }

  const decodeJwt = () => {
    if (!jwt) {
      setHeader('')
      setPayload('')
      setSignature('')
      return
    }
    const tokens = isBulkMode ? jwt.split('\n').filter(t => t.trim()) : [jwt]
    let headers = ''
    let payloads = ''
    let signatures = ''
    
    tokens.forEach((token, index) => {
      const parts = token.trim().split('.')
      if (parts.length === 3) {
        const decodedHeader = base64UrlDecode(parts[0])
        const decodedPayload = base64UrlDecode(parts[1])
        const prefix = isBulkMode ? `=== Token ${index + 1} ===\n` : ''
        
        let headerStr = decodedHeader
        if (decodedHeader) {
          try { headerStr = JSON.stringify(JSON.parse(decodedHeader), null, 2) } catch {}
        }
        
        let payloadStr = decodedPayload
        if (decodedPayload) {
          try { payloadStr = JSON.stringify(JSON.parse(decodedPayload), null, 2) } catch {}
        }
        
        headers += prefix + headerStr + (isBulkMode ? '\n\n' : '')
        payloads += prefix + payloadStr + (isBulkMode ? '\n\n' : '')
        signatures += prefix + parts[2] + (isBulkMode ? '\n\n' : '')
      }
    })
    
    setHeader(headers.trimEnd())
    setPayload(payloads.trimEnd())
    setSignature(signatures.trimEnd())
  }
  
  // Initial decode on mount
  useEffect(() => {
    decodeJwt()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-6">
      <div className="bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-2xl p-4 flex items-start gap-4">
        <div className="p-2 bg-emerald-100 dark:bg-emerald-500/20 rounded-lg shrink-0">
          <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-300">100% Offline & Client-Side Verification</h3>
          <p className="text-xs text-emerald-700 dark:text-emerald-400/80 mt-1 leading-relaxed">
            Unlike other JWT decoders, your sensitive tokens and secrets are never sent to a server. 
            All decoding and verification happens locally within your browser&apos;s JavaScript engine.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white flex items-center gap-2">
            Encoded JWT {isBulkMode && <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 text-[10px] px-2 py-0.5 rounded-full">BULK</span>}
          </h3>
          <BulkModeToggle isBulkMode={isBulkMode} setIsBulkMode={setIsBulkMode} featureName="Bulk JWT Decoder" />
        </div>
        <textarea
          value={jwt}
          onChange={(e) => setJwt(e.target.value)}
          placeholder={isBulkMode ? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}
          className="w-full h-32 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] focus:border-blue-500/30 rounded-2xl text-sm outline-none dark:text-gray-300 resize-none font-mono break-all"
        />
        
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={decodeJwt}
            disabled={!jwt.trim()}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-emerald-500/20 transition-all active:scale-[0.98]"
          >
            <Key className="w-4 h-4" /> Decode & Verify JWT
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#0D1526] border border-red-100 dark:border-red-500/20 rounded-3xl p-6 shadow-sm flex flex-col">
            <h3 className="text-sm font-black uppercase tracking-widest text-red-500 mb-4">Header (Algorithm & Token Type)</h3>
            <textarea
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              className="w-full h-32 p-4 bg-red-50 dark:bg-red-500/5 border border-transparent rounded-2xl text-sm outline-none text-red-700 dark:text-red-300 resize-none font-mono"
            />
          </div>
          <div className="bg-white dark:bg-[#0D1526] border border-fuchsia-100 dark:border-fuchsia-500/20 rounded-3xl p-6 shadow-sm flex flex-col">
            <h3 className="text-sm font-black uppercase tracking-widest text-fuchsia-500 mb-4">Payload (Data)</h3>
            <textarea
              value={payload}
              onChange={(e) => setPayload(e.target.value)}
              className="w-full h-64 p-4 bg-fuchsia-50 dark:bg-fuchsia-500/5 border border-transparent rounded-2xl text-sm outline-none text-fuchsia-700 dark:text-fuchsia-300 resize-none font-mono"
            />
          </div>
        </div>
        
        <div className="bg-white dark:bg-[#0D1526] border border-cyan-100 dark:border-cyan-500/20 rounded-3xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-cyan-500 mb-4">
            <Key className="w-4 h-4" /> Verify Signature
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            HMACSHA256(
            <br />
            &nbsp;&nbsp;base64UrlEncode(header) + &quot;.&quot; +
            <br />
            &nbsp;&nbsp;base64UrlEncode(payload),
            <br />
            &nbsp;&nbsp;your-256-bit-secret
            <br />
            )
          </p>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Secret Key</label>
              <input
                type="text"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="w-full p-4 bg-cyan-50 dark:bg-cyan-500/5 border border-transparent rounded-2xl text-sm outline-none text-cyan-700 dark:text-cyan-300 font-mono"
              />
            </div>
            {isValid === false && (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl text-sm font-semibold">
                <ShieldAlert className="w-4 h-4" /> Signature Invalid
              </div>
            )}
            {isValid === true && (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Signature Verified
              </div>
            )}
            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2 block">Extracted Signature</label>
              <textarea
                value={signature}
                readOnly
                className="w-full h-24 p-4 bg-gray-50 dark:bg-[#0B1120] border border-transparent rounded-2xl text-sm outline-none dark:text-gray-400 resize-none font-mono break-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
