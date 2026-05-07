'use client'

import React, { useState } from 'react'
import { Palette, Copy, Check } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

export default function ColorPicker() {
  const [color, setColor] = useState('#3b82f6')
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgb(${r}, ${g}, ${b})`
  }

  const hexToHsl = (hex: string) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255
    let g = parseInt(hex.slice(3, 5), 16) / 255
    let b = parseInt(hex.slice(5, 7), 16) / 255

    let max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h = 0, s, l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      let d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="Color Picker" slug="color-picker" />
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-4 bg-pink-600 rounded-2xl shadow-lg shadow-pink-600/20">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Color Picker</h1>
            <p className="text-gray-500 dark:text-slate-400">Pick colors and get their HEX, RGB, and HSL values</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 flex flex-col items-center justify-center space-y-6">
            <div 
              className="w-full h-64 rounded-2xl shadow-inner transition-colors duration-200 border border-gray-100 dark:border-slate-800"
              style={{ backgroundColor: color }}
            />
            <input 
              type="color" 
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-16 cursor-pointer bg-transparent border-none outline-none"
            />
          </div>

          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-md border border-gray-100 dark:border-slate-800 space-y-4">
              {[
                { label: 'HEX', value: color.toUpperCase(), id: 'hex' },
                { label: 'RGB', value: hexToRgb(color), id: 'rgb' },
                { label: 'HSL', value: hexToHsl(color), id: 'hsl' }
              ].map((type) => (
                <div key={type.id}>
                  <label className="block text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2">{type.label}</label>
                  <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 font-mono text-lg">
                    <span className={`dark:text-white ${type.id === 'hex' ? 'uppercase' : ''}`}>{type.value}</span>
                    <button 
                      onClick={() => handleCopy(type.value, type.id)}
                      className={`p-2 rounded-xl transition-all ${copied === type.id ? 'text-green-600 bg-green-50 dark:bg-green-900/20' : 'text-gray-400 dark:text-slate-500 hover:bg-gray-100 dark:hover:bg-slate-700'}`}
                    >
                      {copied === type.id ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-12 h-[90px] bg-gray-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800 flex items-center justify-center">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ad Placement</span>
        </div>
      </div>
    </div>
  )
}
