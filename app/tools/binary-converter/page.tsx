'use client'
import React, { useState } from 'react'
import { Binary } from 'lucide-react'

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
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-red-500 to-red-700 rounded-xl"><Binary className="w-8 h-8 text-white" /></div>
          <div><h1 className="text-3xl font-bold text-gray-900">Binary Converter</h1><p className="text-gray-500">Convert between binary, decimal, hexadecimal, and octal</p></div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm mb-6">
          <div className="flex gap-4 mb-6">
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter a number..." className="flex-1 p-4 font-mono bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none" />
            <select value={fromBase} onChange={(e) => setFromBase(e.target.value)} className="p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 outline-none font-semibold">
              <option value="2">Binary</option><option value="8">Octal</option><option value="10">Decimal</option><option value="16">Hex</option>
            </select>
          </div>
          <button onClick={convert} className="w-full py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-all mb-8">Convert</button>
          <div className="grid grid-cols-2 gap-4">
            {[{l:'Binary (Base 2)',v:results.binary},{l:'Decimal (Base 10)',v:results.decimal},{l:'Hex (Base 16)',v:results.hex},{l:'Octal (Base 8)',v:results.octal}].map(r=>(
              <div key={r.l} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="text-xs text-gray-500 mb-1 font-semibold">{r.l}</div>
                <div className="font-mono text-lg font-bold text-gray-900 break-all">{r.v || '—'}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-[90px] bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">Ad Space</div>
      </div>
    </div>
  )
}
