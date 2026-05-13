'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Download, RefreshCw } from 'lucide-react'

const FAVICON_SIZES = [16, 32, 64, 180, 192, 512]

export default function FaviconGenerator() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [text, setText] = useState('W')
  const [bgColor, setBgColor] = useState('#00D4B4')
  const [textColor, setTextColor] = useState('#0B1120')
  const [shape, setShape] = useState<'square' | 'circle' | 'rounded'>('rounded')
  const [font, setFont] = useState('Inter')
  const [activeSize, setActiveSize] = useState(64)
  const [downloadSize, setDownloadSize] = useState(192)

  const drawFavicon = useCallback((canvas: HTMLCanvasElement, size: number) => {
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width = size
    canvas.height = size

    const radius = shape === 'circle' ? size / 2 : shape === 'rounded' ? size * 0.2 : 0

    ctx.clearRect(0, 0, size, size)

    // Background
    ctx.fillStyle = bgColor
    if (shape === 'circle') {
      ctx.beginPath()
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
      ctx.fill()
    } else {
      ctx.beginPath()
      ctx.roundRect(0, 0, size, size, radius)
      ctx.fill()
    }

    // Text
    const fontSize = Math.floor(size * (text.length === 1 ? 0.6 : text.length === 2 ? 0.45 : 0.32))
    ctx.fillStyle = textColor
    ctx.font = `bold ${fontSize}px ${font}, system-ui, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text.substring(0, 3), size / 2, size / 2 + fontSize * 0.05)
  }, [text, bgColor, textColor, shape, font])

  useEffect(() => {
    if (canvasRef.current) drawFavicon(canvasRef.current, activeSize)
  }, [drawFavicon, activeSize])

  const download = (size: number) => {
    const canvas = document.createElement('canvas')
    drawFavicon(canvas, size)
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = `favicon-${size}x${size}.png`
    a.click()
  }

  const randomize = () => {
    const colors = ['#00D4B4', '#0094FF', '#8B5CF6', '#F59E0B', '#EF4444', '#10B981', '#EC4899']
    const randomColor = () => colors[Math.floor(Math.random() * colors.length)]
    setBgColor(randomColor())
    setTextColor('#ffffff')
  }

  const manifestSnippet = `{
  "icons": [
    { "src": "/favicon-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/favicon-512x512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/favicon-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}`

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          {/* Text */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Icon Text (1–3 chars or emoji)</label>
            <input
              value={text}
              onChange={e => setText(e.target.value.substring(0, 3))}
              maxLength={3}
              placeholder="W"
              className="w-full px-5 py-3 bg-[#0D1526] border border-[#1E2D47] rounded-xl text-white text-2xl font-bold text-center focus:ring-2 focus:ring-[#00D4B4] outline-none transition-all"
            />
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Background</label>
              <div className="flex items-center gap-3 p-3 bg-[#0D1526] border border-[#1E2D47] rounded-xl">
                <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0 bg-transparent" />
                <span className="font-mono text-xs text-white">{bgColor.toUpperCase()}</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Text Color</label>
              <div className="flex items-center gap-3 p-3 bg-[#0D1526] border border-[#1E2D47] rounded-xl">
                <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border-0 p-0 bg-transparent" />
                <span className="font-mono text-xs text-white">{textColor.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Shape */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Shape</label>
            <div className="flex gap-2">
              {(['square', 'rounded', 'circle'] as const).map(s => (
                <button key={s} onClick={() => setShape(s)} className={`flex-1 py-2.5 rounded-xl text-xs font-bold capitalize border transition-all ${shape === s ? 'bg-[#00D4B4]/10 border-[#00D4B4] text-[#00D4B4]' : 'bg-[#0D1526] border-[#1E2D47] text-gray-400'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Font */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Font</label>
            <select value={font} onChange={e => setFont(e.target.value)} className="w-full px-4 py-3 bg-[#0D1526] border border-[#1E2D47] rounded-xl text-sm text-white focus:ring-2 focus:ring-[#00D4B4] outline-none">
              {['Inter', 'Georgia', 'monospace', 'Arial', 'Impact'].map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>

          <button onClick={randomize} className="w-full flex items-center justify-center gap-2 py-3 bg-purple-900/20 border border-purple-800/30 text-purple-400 rounded-xl text-xs font-bold hover:bg-purple-900/30 transition-all">
            <RefreshCw className="w-3.5 h-3.5" /> Randomize Colors
          </button>
        </div>

        {/* Preview */}
        <div className="space-y-6">
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Preview Sizes</label>
            <div className="flex items-end flex-wrap gap-4 p-6 bg-[#0D1526] border border-[#1E2D47] rounded-2xl">
              {FAVICON_SIZES.filter(s => s <= 192).map(size => (
                <button key={size} onClick={() => setActiveSize(size)} className="flex flex-col items-center gap-2 group">
                  <canvas 
                    width={size} 
                    height={size} 
                    className={`rounded border-2 transition-all ${activeSize === size ? 'border-[#00D4B4]' : 'border-transparent'}`}
                    style={{ width: Math.max(size, 16), height: Math.max(size, 16) }}
                    ref={el => { 
                      if (el) {
                        if (size === activeSize) {
                          // @ts-ignore
                          canvasRef.current = el
                        }
                        drawFavicon(el, size) 
                      }
                    }}
                  />
                  <span className="text-[9px] font-bold text-gray-500">{size}px</span>
                </button>
              ))}
            </div>
          </div>

          {/* Download */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Download</label>
            <div className="flex flex-wrap gap-2">
              {FAVICON_SIZES.map(size => (
                <button key={size} onClick={() => download(size)} className="flex items-center gap-1.5 px-3 py-2 bg-[#00D4B4]/10 border border-[#00D4B4]/30 text-[#00D4B4] rounded-xl text-xs font-bold hover:bg-[#00D4B4]/20 transition-all">
                  <Download className="w-3 h-3" /> {size}×{size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Manifest Snippet */}
      <div className="space-y-3">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">manifest.json Snippet</label>
        <pre className="w-full bg-[#0B1120] border border-[#1E2D47] rounded-2xl p-6 font-mono text-xs text-[#8A9BBE] whitespace-pre-wrap">
          {manifestSnippet}
        </pre>
      </div>
    </div>
  )
}
