'use client'

import React, { useState } from 'react'
import { FileSearch, Copy, Check, Trash2, Hash, ShieldCheck, Zap, Upload, FileText } from 'lucide-react'

export default function FileChecksum() {
  const [file, setFile] = useState<File | null>(null)
  const [hashes, setHashes] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0])
      setHashes({})
    }
  }

  const calculateHashes = async () => {
    if (!file) return
    setLoading(true)
    
    try {
      const buffer = await file.arrayBuffer()
      
      const algoMap = {
        'SHA-256': 'SHA-256',
        'SHA-1': 'SHA-1'
      }

      const results: Record<string, string> = {}
      
      for (const [label, algo] of Object.entries(algoMap)) {
        const hashBuffer = await window.crypto.subtle.digest(algo, buffer)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
        results[label] = hashHex
      }

      setHashes(results)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] p-10 shadow-sm text-center">
        {!file ? (
          <div className="group relative">
            <input 
              type="file" 
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="py-20 border-2 border-dashed border-gray-100 dark:border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center transition-all group-hover:border-blue-500/30 group-hover:bg-blue-50/10">
              <div className="w-20 h-20 bg-gray-50 dark:bg-slate-950 rounded-full flex items-center justify-center mb-6">
                <Upload className="w-10 h-10 text-gray-300 dark:text-slate-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">Drop File to Checksum</h3>
              <p className="text-sm text-gray-500 dark:text-slate-500 max-w-xs font-medium uppercase tracking-widest text-[10px]">Supports all file types up to 1GB</p>
            </div>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-center gap-4 p-6 bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-3xl">
              <FileText className="w-10 h-10 text-blue-500" />
              <div className="text-left">
                <h4 className="font-bold text-gray-900 dark:text-white truncate max-w-[200px]">{file.name}</h4>
                <p className="text-[10px] font-bold text-gray-400 uppercase">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
              <button onClick={() => setFile(null)} className="ml-4 p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {Object.keys(hashes).length === 0 ? (
              <button
                onClick={calculateHashes}
                disabled={loading}
                className="px-12 py-5 bg-blue-600 text-white rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-blue-500/20 uppercase tracking-widest text-xs flex items-center gap-3 mx-auto"
              >
                {loading ? <Zap className="w-5 h-5 animate-spin" /> : <Hash className="w-5 h-5" />}
                {loading ? 'Calculating...' : 'Generate Integrity Hashes'}
              </button>
            ) : (
              <div className="grid grid-cols-1 gap-6 text-left">
                {Object.entries(hashes).map(([algo, val]) => (
                  <div key={algo} className="p-8 bg-[#0B1120] border border-[#1E2D47] rounded-3xl group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-bold text-[#00D4B4] uppercase tracking-[0.2em]">{algo} Digest</span>
                      <button 
                        onClick={() => handleCopy(val, algo)}
                        className="text-[10px] font-bold text-gray-400 hover:text-white uppercase tracking-widest flex items-center gap-2"
                      >
                        {copied === algo ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied === algo ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                    <code className="text-xs text-white font-mono break-all leading-relaxed block">{val}</code>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-8 bg-blue-50 dark:bg-blue-900/5 border border-blue-100 dark:border-blue-900/20 rounded-3xl flex items-start gap-6">
        <ShieldCheck className="w-8 h-8 text-blue-500 shrink-0" />
        <div>
          <h5 className="text-lg font-bold text-blue-900 dark:text-blue-400 mb-2 tracking-tight">Data Integrity Verification</h5>
          <p className="text-sm text-blue-800/70 dark:text-blue-500/70 leading-relaxed font-medium">
            Files are processed entirely within your browser using <span className="font-bold">SubtleCrypto</span> digest algorithms. No file data is uploaded to any server, making this the most secure way to verify software downloads and forensic integrity.
          </p>
        </div>
      </div>
    </div>
  )
}
