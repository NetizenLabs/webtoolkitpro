'use client'

import React, { useState, useMemo } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'

type GradientType = 'linear' | 'radial' | 'conic'

interface ColorStop {
  id: number
  color: string
  position: number
}

export default function CssGradientGenerator() {
  const [gradientType, setGradientType] = useState<GradientType>('linear')
  const [angle, setAngle] = useState(135)
  const [stops, setStops] = useState<ColorStop[]>([
    { id: 1, color: '#00D4B4', position: 0 },
    { id: 2, color: '#0094FF', position: 100 },
  ])
  const [copied, setCopied] = useState(false)

  const sortedStops = useMemo(() => [...stops].sort((a, b) => a.position - b.position), [stops])

  const gradient = useMemo(() => {
    const stopsStr = sortedStops.map(s => `${s.color} ${s.position}%`).join(', ')
    if (gradientType === 'linear') return `linear-gradient(${angle}deg, ${stopsStr})`
    if (gradientType === 'radial') return `radial-gradient(circle, ${stopsStr})`
    return `conic-gradient(from ${angle}deg, ${stopsStr})`
  }, [gradientType, angle, stops, sortedStops])

  const cssCode = `background: ${gradient};`

  const addStop = () => {
    const newId = Date.now()
    setStops(prev => [...prev, { id: newId, color: '#8B5CF6', position: 50 }])
  }

  const removeStop = (id: number) => {
    if (stops.length <= 2) return
    setStops(prev => prev.filter(s => s.id !== id))
  }

  const updateStop = (id: number, key: keyof ColorStop, value: string | number) => {
    setStops(prev => prev.map(s => s.id === id ? { ...s, [key]: value } : s))
  }

  const randomize = () => {
    const randomColor = () => '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0')
    setStops(prev => prev.map(s => ({ ...s, color: randomColor() })))
  }

  const copy = () => {
    navigator.clipboard.writeText(cssCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Preview */}
      <div
        className="w-full h-52 rounded-2xl shadow-2xl transition-all duration-500"
        style={{ background: gradient }}
      />

      {/* Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Type & Angle */}
        <div className="space-y-6">
          {/* Gradient Type */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Gradient Type</label>
            <div className="flex gap-2">
              {(['linear', 'radial', 'conic'] as GradientType[]).map(type => (
                <button
                  key={type}
                  onClick={() => setGradientType(type)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold capitalize transition-all ${
                    gradientType === type
                      ? 'bg-[#00D4B4]/10 border border-[#00D4B4] text-[#00D4B4]'
                      : 'bg-[#0D1526] border border-[#1E2D47] text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Angle */}
          {(gradientType === 'linear' || gradientType === 'conic') && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Angle</label>
                <span className="text-sm font-bold text-[#00D4B4]">{angle}°</span>
              </div>
              <input
                type="range"
                min={0}
                max={360}
                value={angle}
                onChange={e => setAngle(Number(e.target.value))}
                className="w-full accent-[#00D4B4] cursor-pointer"
              />
              <div className="grid grid-cols-4 gap-2">
                {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
                  <button
                    key={a}
                    onClick={() => setAngle(a)}
                    className={`py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                      angle === a
                        ? 'bg-[#00D4B4]/10 text-[#00D4B4] border border-[#00D4B4]'
                        : 'bg-[#0D1526] border border-[#1E2D47] text-gray-500 hover:border-gray-600'
                    }`}
                  >
                    {a}°
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Color Stops */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Color Stops</label>
            <div className="flex gap-2">
              <button onClick={randomize} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-purple-400 bg-purple-900/10 border border-purple-800/30 rounded-lg hover:bg-purple-900/20 transition-all">
                <RefreshCw className="w-3 h-3" /> Randomize
              </button>
              <button onClick={addStop} className="px-3 py-1.5 text-[10px] font-bold text-[#00D4B4] bg-[#00D4B4]/10 border border-[#00D4B4]/30 rounded-lg hover:bg-[#00D4B4]/20 transition-all">
                + Add Stop
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {stops.map(stop => (
              <div key={stop.id} className="flex items-center gap-3 p-3 bg-[#0D1526] border border-[#1E2D47] rounded-xl">
                <input
                  type="color"
                  value={stop.color}
                  onChange={e => updateStop(stop.id, 'color', e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent p-0"
                />
                <div className="flex-grow space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white">{stop.color.toUpperCase()}</span>
                    <span className="text-[10px] font-bold text-[#00D4B4]">{stop.position}%</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={stop.position}
                    onChange={e => updateStop(stop.id, 'position', Number(e.target.value))}
                    className="w-full accent-[#00D4B4] cursor-pointer h-1"
                  />
                </div>
                <button
                  onClick={() => removeStop(stop.id)}
                  disabled={stops.length <= 2}
                  className="text-red-500 hover:text-red-400 disabled:opacity-20 disabled:cursor-not-allowed text-lg font-bold leading-none transition-colors px-1"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Output */}
      <div className="space-y-3">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">CSS Output</label>
        <div className="relative bg-[#0B1120] border border-[#1E2D47] rounded-2xl p-5">
          <pre className="font-mono text-sm text-[#00D4B4] whitespace-pre-wrap break-all pr-16">{cssCode}</pre>
          <button
            onClick={copy}
            className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-2 bg-[#00D4B4]/10 border border-[#00D4B4]/30 text-[#00D4B4] rounded-xl text-[10px] font-bold hover:bg-[#00D4B4]/20 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  )
}
