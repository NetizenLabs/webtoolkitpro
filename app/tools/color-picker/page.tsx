'use client'

import React, { useState } from 'react'
import { Palette, Copy, Check } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'
import ToolInfo from '@/components/sections/ToolInfo'
import AdSlot from '@/components/ads/AdSlot'

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
      <ToolSchema 
        name="Universal Color Picker & Space Converter" 
        description="Pick colors and instantly get their HEX, RGB, and HSL values. A lightweight, browser-native tool for designers and developers."
        slug="color-picker"
        steps={[
          "Use the visual color picker or system palette to select a color.",
          "Observe the real-time background preview update.",
          "View the automatically generated HEX, RGB, and HSL values.",
          "Click the copy icon to save any value to your clipboard."
        ]}
      />
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
        
        <AdSlot className="mt-8" />

        <ToolInfo 
          title="Universal Color Picker & Space Converter"
          description="The WebToolkit Pro Color Picker is a high-precision design utility that bridges the gap between different color representation systems. Whether you're working on a CSS stylesheet, a Photoshop design, or a mobile app interface, our tool provides the exact color values you need in the most common web formats."
          howItWorks="Our tool utilizes the browser's native `<input type='color'>` for a high-performance picking experience. It then applies mathematical transforms to convert the raw hex output into RGB (Red, Green, Blue) and HSL (Hue, Saturation, Lightness) coordinate spaces. This allows developers to choose the representation that best suits their code's logic, such as using HSL for dynamic theme adjustments."
          features={[
            "Native system color picker integration",
            "Real-time HEX, RGB, and HSL conversions",
            "High-contrast color preview window",
            "One-click copy to clipboard functionality",
            "Mobile-responsive layout for on-the-go design",
            "100% Client-side: Your color selections are private"
          ]}
          faqs={[
            {
              q: "Why should I use HSL instead of HEX?",
              a: "HSL is often preferred by designers because it's more intuitive. For example, to make a color darker, you only need to decrease the 'Lightness' value, whereas with HEX, you have to recalculate the entire string."
            },
            {
              q: "Is HEX case-sensitive in CSS?",
              a: "No. CSS hex codes like #3B82F6 and #3b82f6 are treated identically by all modern browsers."
            },
            {
              q: "What is the range of RGB values?",
              a: "Each channel (Red, Green, Blue) in the standard RGB model ranges from 0 to 255, representing the intensity of that specific light component."
            },
            {
              q: "Does this tool support CMYK?",
              a: "CMYK is primarily used for print. This tool focuses on web-standard color spaces (sRGB) used in digital displays."
            }
          ]}
        />
      </div>
    </div>
  )
}
