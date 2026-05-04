'use client'

import React, { useState, useEffect } from 'react'
import { Palette, Info, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react'

export default function ColorContrast() {
  const [foreground, setForeground] = useState('#2563EB')
  const [background, setBackground] = useState('#FFFFFF')
  const [ratio, setRatio] = useState(0)
  const [results, setResults] = useState({
    aaNormal: false,
    aaLarge: false,
    aaaNormal: false,
    aaaLarge: false
  })

  const getLuminance = (hex: string) => {
    const rgb = hex.replace(/^#/, '').match(/.{2}/g)?.map(x => {
      let v = parseInt(x, 16) / 255
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    }) || [0, 0, 0]
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
  }

  const calculateContrast = () => {
    const l1 = getLuminance(foreground)
    const l2 = getLuminance(background)
    const lighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)
    const currentRatio = (lighter + 0.05) / (darker + 0.05)
    
    setRatio(Number(currentRatio.toFixed(2)))
    setResults({
      aaNormal: currentRatio >= 4.5,
      aaLarge: currentRatio >= 3,
      aaaNormal: currentRatio >= 7,
      aaaLarge: currentRatio >= 4.5
    })
  }

  useEffect(() => {
    calculateContrast()
  }, [foreground, background])

  const ResultCard = ({ title, passed, sub }: { title: string, passed: boolean, sub: string }) => (
    <div className={`p-4 rounded-xl border-2 flex items-center justify-between ${passed ? 'border-green-100 bg-green-50 text-green-800' : 'border-red-100 bg-red-50 text-red-800'}`}>
      <div>
        <div className="font-bold text-sm">{title}</div>
        <div className="text-xs opacity-75">{sub}</div>
      </div>
      {passed ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
    </div>
  )

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-pink-100 rounded-2xl mb-4">
            <Palette className="w-8 h-8 text-pink-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Color Contrast Checker
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Ensure your US-based enterprise application meets WCAG accessibility standards for high-readability and professional design.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inputs */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-pink-500" />
              Test Colors
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Foreground (Text) Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={foreground}
                    onChange={(e) => setForeground(e.target.value.toUpperCase())}
                    className="w-12 h-12 p-1 rounded-lg border border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={foreground}
                    onChange={(e) => setForeground(e.target.value.toUpperCase())}
                    className="flex-grow px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Background Color</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={background}
                    onChange={(e) => setBackground(e.target.value.toUpperCase())}
                    className="w-12 h-12 p-1 rounded-lg border border-gray-200 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={background}
                    onChange={(e) => setBackground(e.target.value.toUpperCase())}
                    className="flex-grow px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none font-mono"
                  />
                </div>
              </div>

              {/* Preview Box */}
              <div 
                className="mt-8 p-12 rounded-2xl border border-gray-200 flex flex-col items-center justify-center text-center transition-all shadow-inner"
                style={{ backgroundColor: background, color: foreground }}
              >
                <div className="text-3xl font-bold mb-2">Preview Text</div>
                <div className="text-sm">The quick brown fox jumps over the lazy dog.</div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <div className="text-center mb-8 pb-8 border-b border-gray-50">
              <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Contrast Ratio</div>
              <div className="text-6xl font-black text-gray-900">{ratio}:1</div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <ResultCard title="WCAG AA Normal" passed={results.aaNormal} sub="Required ratio: 4.5:1" />
              <ResultCard title="WCAG AA Large" passed={results.aaLarge} sub="Required ratio: 3:1" />
              <ResultCard title="WCAG AAA Normal" passed={results.aaaNormal} sub="Required ratio: 7:1" />
              <ResultCard title="WCAG AAA Large" passed={results.aaaLarge} sub="Required ratio: 4.5:1" />
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-100 flex gap-3">
              <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700 leading-relaxed">
                <strong>WCAG Standards:</strong> AA is the standard requirement for most business sites. Large text is defined as 18pt+ or 14pt+ bold.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
