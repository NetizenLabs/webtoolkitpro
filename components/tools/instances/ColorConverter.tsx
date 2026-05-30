'use client'

import React, { useState, useEffect } from 'react'
import { Palette, ArrowRightLeft, Copy } from 'lucide-react'

export default function ColorConverter() {
  const [hex, setHex] = useState('#00D4B4')
  const [r, setR] = useState(0)
  const [g, setG] = useState(212)
  const [b, setB] = useState(180)
  const [a, setA] = useState(1)
  const [rgbString, setRgbString] = useState('rgba(0, 212, 180, 1)')

  const hexToRgb = (hexVal: string) => {
    let cleanHex = hexVal.replace('#', '')
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('')
    }
    if (cleanHex.length === 6) {
      cleanHex += 'ff'
    }
    const rVal = parseInt(cleanHex.substring(0, 2), 16) || 0
    const gVal = parseInt(cleanHex.substring(2, 4), 16) || 0
    const bVal = parseInt(cleanHex.substring(4, 6), 16) || 0
    const aVal = cleanHex.length === 8 ? (parseInt(cleanHex.substring(6, 8), 16) / 255).toFixed(2) : '1'
    return { r: rVal, g: gVal, b: bVal, a: parseFloat(aVal) }
  }

  const rgbToHex = (rVal: number, gVal: number, bVal: number, aVal: number) => {
    const toHex = (n: number) => Math.max(0, Math.min(255, n)).toString(16).padStart(2, '0')
    const hexColor = `#${toHex(rVal)}${toHex(gVal)}${toHex(bVal)}`
    if (aVal < 1) {
      const alphaHex = Math.round(aVal * 255).toString(16).padStart(2, '0')
      return hexColor + alphaHex
    }
    return hexColor
  }

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setHex(val)
    if (/^#[0-9A-Fa-f]{3,8}$/.test(val)) {
      const rgba = hexToRgb(val)
      setR(rgba.r)
      setG(rgba.g)
      setB(rgba.b)
      setA(rgba.a)
      setRgbString(`rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`)
    }
  }

  const updateFromRgb = (newR: number, newG: number, newB: number, newA: number) => {
    setR(newR)
    setG(newG)
    setB(newB)
    setA(newA)
    const newHex = rgbToHex(newR, newG, newB, newA)
    setHex(newHex)
    setRgbString(`rgba(${newR}, ${newG}, ${newB}, ${newA})`)
  }

  const copy = (text: string) => navigator.clipboard.writeText(text)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Color Display */}
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center space-y-6">
        <div 
          className="w-48 h-48 rounded-full shadow-2xl transition-colors duration-200 border-4 border-white dark:border-[#1E2D47]"
          style={{ backgroundColor: rgbString }}
        />
        <div className="w-full flex justify-between gap-4">
          <button onClick={() => copy(hex)} className="flex-1 py-4 bg-gray-50 dark:bg-[#0B1120] border border-transparent rounded-2xl flex flex-col items-center justify-center hover:border-blue-500/30 transition-all group">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">HEX</span>
            <span className="text-sm font-mono font-bold text-gray-900 dark:text-white flex items-center gap-2">
              {hex.toUpperCase()} <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100" />
            </span>
          </button>
          <button onClick={() => copy(rgbString)} className="flex-1 py-4 bg-gray-50 dark:bg-[#0B1120] border border-transparent rounded-2xl flex flex-col items-center justify-center hover:border-blue-500/30 transition-all group">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">RGBA</span>
            <span className="text-sm font-mono font-bold text-gray-900 dark:text-white flex items-center gap-2">
              {rgbString} <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100" />
            </span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm space-y-8">
        <div>
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 flex items-center justify-between mb-3">
            HEX Color Input
          </label>
          <div className="relative flex items-center">
            <input 
              type="color" 
              value={hex.substring(0,7)} 
              onChange={handleHexChange}
              className="absolute left-3 w-8 h-8 rounded-full cursor-pointer bg-transparent border-0 p-0"
            />
            <input 
              type="text" 
              value={hex}
              onChange={handleHexChange}
              className="w-full pl-14 p-4 bg-gray-50 dark:bg-[#0B1120] border border-transparent rounded-2xl text-sm font-mono font-bold outline-none dark:text-white focus:border-blue-500/30 transition-colors uppercase"
            />
          </div>
        </div>

        <div className="space-y-6">
          <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 flex items-center justify-between">
            RGBA Sliders
          </label>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="w-4 text-xs font-bold text-red-500">R</span>
              <input type="range" min="0" max="255" value={r} onChange={(e) => updateFromRgb(Number(e.target.value), g, b, a)} className="flex-grow accent-red-500" />
              <input type="number" min="0" max="255" value={r} onChange={(e) => updateFromRgb(Number(e.target.value), g, b, a)} className="w-16 p-2 bg-gray-50 dark:bg-[#0B1120] rounded-xl text-xs text-center font-mono font-bold outline-none" />
            </div>
            <div className="flex items-center gap-4">
              <span className="w-4 text-xs font-bold text-green-500">G</span>
              <input type="range" min="0" max="255" value={g} onChange={(e) => updateFromRgb(r, Number(e.target.value), b, a)} className="flex-grow accent-green-500" />
              <input type="number" min="0" max="255" value={g} onChange={(e) => updateFromRgb(r, Number(e.target.value), b, a)} className="w-16 p-2 bg-gray-50 dark:bg-[#0B1120] rounded-xl text-xs text-center font-mono font-bold outline-none" />
            </div>
            <div className="flex items-center gap-4">
              <span className="w-4 text-xs font-bold text-blue-500">B</span>
              <input type="range" min="0" max="255" value={b} onChange={(e) => updateFromRgb(r, g, Number(e.target.value), a)} className="flex-grow accent-blue-500" />
              <input type="number" min="0" max="255" value={b} onChange={(e) => updateFromRgb(r, g, Number(e.target.value), a)} className="w-16 p-2 bg-gray-50 dark:bg-[#0B1120] rounded-xl text-xs text-center font-mono font-bold outline-none" />
            </div>
            <div className="flex items-center gap-4">
              <span className="w-4 text-xs font-bold text-gray-500">A</span>
              <input type="range" min="0" max="1" step="0.01" value={a} onChange={(e) => updateFromRgb(r, g, b, Number(e.target.value))} className="flex-grow accent-gray-500" />
              <input type="number" min="0" max="1" step="0.01" value={a} onChange={(e) => updateFromRgb(r, g, b, Number(e.target.value))} className="w-16 p-2 bg-gray-50 dark:bg-[#0B1120] rounded-xl text-xs text-center font-mono font-bold outline-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
