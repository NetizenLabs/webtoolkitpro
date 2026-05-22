'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { QrCode, Download, RefreshCcw, Copy, Check } from 'lucide-react'
import QRCode from 'qrcode'

export default function QrCodeGen() {
  const [text, setText] = useState('https://webtoolkit.pro')
  const [size, setSize] = useState(250)
  const [qrUrl, setQrUrl] = useState('')

  const generate = async () => {
    try {
      const url = await QRCode.toDataURL(text || 'https://webtoolkit.pro', { width: size, margin: 2 })
      setQrUrl(url)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    generate()
  }, [])

  const download = () => {
    if (!qrUrl) return
    const link = document.createElement('a')
    link.href = qrUrl
    link.download = 'qrcode.png'
    link.click()
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <QrCode className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">QR Code Generator</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Content (URL or Text)</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-32 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm outline-none"
              />
            </div>
            <button 
              onClick={generate}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all"
            >
              Generate QR Code
            </button>
          </div>

          <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0B1120] rounded-3xl p-8 border border-gray-100 dark:border-[#1E2D47]">
            <Image src={qrUrl} alt="QR Code" className="w-48 h-48 rounded-xl shadow-2xl mb-6" width={192} height={192} unoptimized />
            <button 
              onClick={download}
              className="px-8 py-3 bg-white dark:bg-white/10 text-gray-900 dark:text-white rounded-xl font-bold uppercase tracking-widest text-[9px] hover:bg-gray-100 transition-all flex items-center gap-2 border border-gray-100 dark:border-white/10"
            >
              <Download className="w-3 h-3" /> Download PNG
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
