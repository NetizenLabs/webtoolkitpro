'use client'
import React, { useState } from 'react'
import { Binary } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

export default function BinaryConverter() {
  const [input, setInput] = useState('')
  const [fromBase, setFromBase] = useState('10')
  const [results, setResults] = useState<{binary:string,decimal:string,hex:string,octal:string}>({binary:'',decimal:'',hex:'',octal:''})

  const convert = () => {
    try {
      const num = parseInt(input, parseInt(fromBase))
      if (isNaN(num)) throw new Error()
      setResults({ binary: num.toString(2), decimal: num.toString(10), hex: num.toString(16).toUpperCase(), octal: num.toString(8) })
    } catch { setResults({ binary: 'Invalid', decimal: 'Invalid', hex: 'Invalid', octal: 'Invalid' }) }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="Binary Converter" slug="binary-converter" />
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl shadow-lg shadow-red-500/20">
            <Binary className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Binary Converter</h1>
            <p className="text-gray-500 dark:text-slate-400">Convert between binary, decimal, hexadecimal, and octal</p>
          </div>
        </div>
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 shadow-sm mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Enter a number..." 
              className="flex-1 p-4 font-mono bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none dark:text-white" 
            />
            <select 
              value={fromBase} 
              onChange={(e) => setFromBase(e.target.value)} 
              className="p-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none font-bold text-gray-700 dark:text-slate-300"
            >
              <option value="2">Binary (Base 2)</option>
              <option value="8">Octal (Base 8)</option>
              <option value="10">Decimal (Base 10)</option>
              <option value="16">Hex (Base 16)</option>
            </select>
          </div>
          <button onClick={convert} className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-500/20 mb-8">Convert Now</button>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[{l:'Binary (Base 2)',v:results.binary},{l:'Decimal (Base 10)',v:results.decimal},{l:'Hex (Base 16)',v:results.hex},{l:'Octal (Base 8)',v:results.octal}].map(r=>(
              <div key={r.l} className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700">
                <div className="text-[10px] text-gray-400 dark:text-slate-500 uppercase font-bold tracking-widest mb-1">{r.l}</div>
                <div className="font-mono text-lg font-black text-gray-900 dark:text-white break-all">{r.v || '—'}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-[90px] bg-gray-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800 flex items-center justify-center">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ad Placement</span>
        </div>
      </div>
    </div>
  )
}
