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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <BreadcrumbSchema name="Color Picker" slug="color-picker" />
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-pink-600 rounded-xl">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Color Picker</h1>
            <p className="text-gray-600">Pick colors and get their HEX, RGB, and HSL values</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center justify-center space-y-6">
            <div 
              className="w-full h-64 rounded-2xl shadow-inner transition-colors duration-200"
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
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">HEX</label>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 font-mono text-lg">
                  <span className="uppercase">{color}</span>
                  <button 
                    onClick={() => handleCopy(color.toUpperCase(), 'hex')}
                    className={`p-2 rounded-lg transition-all ${copied === 'hex' ? 'text-green-600 bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                  >
                    {copied === 'hex' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">RGB</label>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 font-mono text-lg">
                  <span>{hexToRgb(color)}</span>
                  <button 
                    onClick={() => handleCopy(hexToRgb(color), 'rgb')}
                    className={`p-2 rounded-lg transition-all ${copied === 'rgb' ? 'text-green-600 bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                  >
                    {copied === 'rgb' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">HSL</label>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 font-mono text-lg">
                  <span>{hexToHsl(color)}</span>
                  <button 
                    onClick={() => handleCopy(hexToHsl(color), 'hsl')}
                    className={`p-2 rounded-lg transition-all ${copied === 'hsl' ? 'text-green-600 bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}
                  >
                    {copied === 'hsl' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
