'use client'

import React, { useState, useEffect } from 'react'
import { Layout, Smartphone, Copy, Check, Info } from 'lucide-react'

export default function PwaManifest() {
  const [name, setName] = useState('My PWA App')
  const [shortName, setShortName] = useState('MyPWA')
  const [description, setDescription] = useState('A professional Progressive Web App')
  const [startUrl, setStartUrl] = useState('/')
  const [themeColor, setThemeColor] = useState('#00D4B4')
  const [bgColor, setBgColor] = useState('#ffffff')
  const [display, setDisplay] = useState('standalone')
  const [manifest, setManifest] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const json = {
      name,
      short_name: shortName,
      description,
      start_url: startUrl,
      display,
      background_color: bgColor,
      theme_color: themeColor,
      icons: [
        { src: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
        { src: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" }
      ]
    }
    setManifest(JSON.stringify(json, null, 2))
  }, [name, shortName, description, startUrl, themeColor, bgColor, display])

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">PWA Manifest Builder</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Web App Manifest (manifest.json)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">App Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-medium text-gray-800 dark:text-[#F0F6FF] outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Short Name</label>
              <input
                type="text"
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
                className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-medium text-gray-800 dark:text-[#F0F6FF] outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Theme Color</label>
              <input
                type="color"
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
                className="w-full h-12 p-1 bg-transparent border border-gray-100 dark:border-white/5 rounded-2xl cursor-pointer"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Background Color</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full h-12 p-1 bg-transparent border border-gray-100 dark:border-white/5 rounded-2xl cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">manifest.json</h3>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(manifest)
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
            className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
          >
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-2xl border border-gray-100 dark:border-[#1E2D47] overflow-x-auto">
          <pre className="text-xs font-mono text-blue-600 dark:text-[#00D4B4] leading-relaxed">{manifest}</pre>
        </div>
      </div>
    </div>
  )
}
