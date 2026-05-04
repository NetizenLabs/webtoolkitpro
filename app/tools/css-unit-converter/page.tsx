'use client'
import React, { useState } from 'react'
import { Ruler } from 'lucide-react'

export default function CssUnitConverter() {
  const [value, setValue] = useState('16')
  const [baseFontSize, setBaseFontSize] = useState('16')
  const base = parseFloat(baseFontSize) || 16
  const v = parseFloat(value) || 0
  const conversions = [
    { unit: 'px', value: v.toFixed(2) },
    { unit: 'rem', value: (v / base).toFixed(4) },
    { unit: 'em', value: (v / base).toFixed(4) },
    { unit: 'pt', value: (v * 0.75).toFixed(2) },
    { unit: 'vw', value: (v / 19.2).toFixed(4) + ' (1920px viewport)' },
    { unit: 'vh', value: (v / 10.8).toFixed(4) + ' (1080px viewport)' },
    { unit: '%', value: ((v / base) * 100).toFixed(2) },
  ]
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-fuchsia-500 to-fuchsia-700 rounded-xl"><Ruler className="w-8 h-8 text-white" /></div>
          <div><h1 className="text-3xl font-bold text-gray-900">CSS Unit Converter</h1><p className="text-gray-500">Convert between px, rem, em, pt, vw, vh, and %</p></div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm mb-6">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div><label className="text-sm font-semibold text-gray-700 mb-2 block">Value (px)</label>
              <input type="number" value={value} onChange={(e)=>setValue(e.target.value)} className="w-full p-4 font-mono bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-fuchsia-500 outline-none" /></div>
            <div><label className="text-sm font-semibold text-gray-700 mb-2 block">Base Font Size (px)</label>
              <input type="number" value={baseFontSize} onChange={(e)=>setBaseFontSize(e.target.value)} className="w-full p-4 font-mono bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-fuchsia-500 outline-none" /></div>
          </div>
          <div className="space-y-3">
            {conversions.map(c=>(
              <div key={c.unit} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                <span className="font-bold text-gray-700 uppercase text-sm">{c.unit}</span>
                <span className="font-mono text-gray-900 font-semibold">{c.value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="h-[90px] bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">Ad Space</div>
      </div>
    </div>
  )
}
