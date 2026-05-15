'use client'

import React, { useState } from 'react'
import { Key, Copy, RefreshCw, Check, ShieldAlert, Download } from 'lucide-react'

export default function RsaKeyGen() {
  const [keys, setKeys] = useState<{ public: string; private: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState<'public' | 'private' | null>(null)
  const [keySize, setKeySize] = useState(2048)

  const generateKeys = async () => {
    setLoading(true)
    try {
      const keyPair = await window.crypto.subtle.generateKey(
        {
          name: "RSASSA-PKCS1-v1_5",
          modulusLength: keySize,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: "SHA-256",
        },
        true,
        ["sign", "verify"]
      )

      const publicKey = await window.crypto.subtle.exportKey("spki", keyPair.publicKey)
      const privateKey = await window.crypto.subtle.exportKey("pkcs8", keyPair.privateKey)

      const formatPem = (keyData: ArrayBuffer, type: 'PUBLIC' | 'PRIVATE') => {
        const base64 = btoa(String.fromCharCode(...new Uint8Array(keyData)))
        const chunks = base64.match(/.{1,64}/g) || []
        return `-----BEGIN ${type} KEY-----\n${chunks.join('\n')}\n-----END ${type} KEY-----`
      }

      setKeys({
        public: formatPem(publicKey, 'PUBLIC'),
        private: formatPem(privateKey, 'PRIVATE')
      })
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (text: string, type: 'public' | 'private') => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const downloadKey = (text: string, filename: string) => {
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-4">
          <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Key Modulus Length</label>
          <select 
            value={keySize}
            onChange={(e) => setKeySize(parseInt(e.target.value))}
            className="p-3 bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-[#00D4B4] dark:text-white"
          >
            <option value={1024}>1024-bit (Legacy)</option>
            <option value={2048}>2048-bit (Standard)</option>
            <option value={4096}>4096-bit (High Security)</option>
          </select>
        </div>
        <button
          onClick={generateKeys}
          disabled={loading}
          className="px-10 py-4 bg-[#00D4B4] text-[#0B1120] rounded-2xl font-black hover:scale-105 transition-all shadow-lg shadow-[#00D4B4]/20 uppercase tracking-widest text-sm flex items-center gap-3 disabled:opacity-50"
        >
          {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Key className="w-5 h-5" />}
          {loading ? 'Generating...' : 'Generate Key Pair'}
        </button>
      </div>

      {keys ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Public Key */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Public Key (SPKI)</label>
              <div className="flex gap-2">
                <button 
                  onClick={() => downloadKey(keys.public, 'id_rsa.pub')}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-gray-400 transition-all"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleCopy(keys.public, 'public')}
                  className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/10 rounded-lg transition-all"
                >
                  {copied === 'public' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied === 'public' ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
            <pre className="w-full h-[400px] p-6 font-mono text-[10px] bg-gray-900 text-emerald-400 border border-gray-800 rounded-3xl overflow-auto shadow-2xl leading-relaxed">
              {keys.public}
            </pre>
          </div>

          {/* Private Key */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">Private Key (PKCS#8)</label>
              <div className="flex gap-2">
                <button 
                  onClick={() => downloadKey(keys.private, 'id_rsa')}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg text-gray-400 transition-all"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleCopy(keys.private, 'private')}
                  className="text-xs font-bold text-amber-600 flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 dark:bg-amber-900/10 rounded-lg transition-all"
                >
                  {copied === 'private' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied === 'private' ? 'Copied' : 'Copy'}
                </button>
              </div>
            </div>
            <pre className="w-full h-[400px] p-6 font-mono text-[10px] bg-gray-900 text-amber-400 border border-gray-800 rounded-3xl overflow-auto shadow-2xl leading-relaxed">
              {keys.private}
            </pre>
          </div>
        </div>
      ) : (
        <div className="py-24 border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-[3rem] flex flex-col items-center justify-center text-center">
          <div className="w-20 h-20 bg-gray-50 dark:bg-slate-900 rounded-full flex items-center justify-center mb-6">
            <Key className="w-10 h-10 text-gray-300 dark:text-slate-700" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">No Keys Generated</h3>
          <p className="text-sm text-gray-500 dark:text-slate-500 max-w-xs font-medium">Click the button above to generate a cryptographically secure RSA key pair.</p>
        </div>
      )}

      {/* Security Notice */}
      <div className="p-8 bg-amber-50 dark:bg-amber-900/5 border border-amber-100 dark:border-amber-900/20 rounded-3xl flex items-start gap-6">
        <ShieldAlert className="w-8 h-8 text-amber-500 shrink-0" />
        <div>
          <h5 className="text-lg font-bold text-amber-900 dark:text-amber-400 mb-2 tracking-tight">Security & Privacy First</h5>
          <p className="text-sm text-amber-800/70 dark:text-amber-500/70 leading-relaxed font-medium">
            Keys are generated locally in your browser using the <span className="font-bold">Web Crypto API</span>. Your private key never leaves your device and is never transmitted to any server. This ensures maximum security for your development and production environments.
          </p>
        </div>
      </div>
    </div>
  )
}
