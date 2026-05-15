'use client'

import React, { useState, useEffect } from 'react'
import { Box, Sun, Copy, Check, Info, Settings } from 'lucide-react'

export default function CssShadowGen() {
  const [hOffset, setHOffset] = useState(0)
  const [vOffset, setVOffset] = useState(10)
  const [blur, setBlur] = useState(20)
  const [spread, setSpread] = useState(0)
  const [opacity, setOpacity] = useState(0.1)
  const [color, setColor] = useState('#000000')
  const [inset, setInset] = useState(false)
  const [shadow, setShadow] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Convert hex to rgba for opacity control
    const r = parseInt(color.slice(1, 3), 16)
    const g = parseInt(color.slice(3, 5), 16)
    const b = parseInt(color.slice(5, 7), 16)
    const s = `${inset ? 'inset ' : ''}${hOffset}px ${vOffset}px ${blur}px ${spread}px rgba(${r}, ${g}, ${b}, ${opacity})`
    setShadow(s)
  }, [hOffset, vOffset, blur, spread, opacity, color, inset])

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
              <Settings className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Shadow Parameters</h3>
          </div>

          <div className="space-y-6">
            {[
              { label: 'Horizontal Offset', value: hOffset, setter: setHOffset, min: -50, max: 50 },
              { label: 'Vertical Offset', value: vOffset, setter: setVOffset, min: -50, max: 50 },
              { label: 'Blur Radius', value: blur, setter: setBlur, min: 0, max: 100 },
              { label: 'Spread Radius', value: spread, setter: setSpread, min: -50, max: 50 },
            ].map((s, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">{s.label}</label>
                  <span className="text-[10px] font-mono text-blue-600">{s.value}px</span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  value={s.value}
                  onChange={(e) => s.setter(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-gray-100 dark:bg-white/5 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Shadow Color</label>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-10 p-1 bg-transparent border border-gray-100 dark:border-white/5 rounded-xl cursor-pointer"
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block">Opacity</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="1"
                  value={opacity}
                  onChange={(e) => setOpacity(parseFloat(e.target.value))}
                  className="w-full h-10 px-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-xl text-xs font-mono outline-none"
                />
              </div>
            </div>

            <button 
              onClick={() => setInset(!inset)}
              className={`w-full py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${inset ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-400 hover:text-blue-600'}`}
            >
              {inset ? 'Inset Enabled' : 'Make Inset'}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="flex flex-col gap-8">
          <div className="flex-1 bg-gray-50 dark:bg-[#0B1120] border border-dashed border-gray-200 dark:border-[#1E2D47] rounded-3xl p-12 flex items-center justify-center relative overflow-hidden">
            <div 
              className="w-48 h-48 bg-white dark:bg-[#1E2D47] rounded-3xl transition-all duration-300"
              style={{ boxShadow: shadow }}
            />
            <span className="absolute bottom-4 right-6 text-[10px] font-black uppercase tracking-widest text-gray-400 opacity-30">Visual Preview</span>
          </div>

          <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Generated CSS</h3>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(`box-shadow: ${shadow};`)
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                }}
                className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
              >
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47]">
              <code className="text-[11px] font-mono text-blue-600 dark:text-[#00D4B4]">
                box-shadow: {shadow};
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
