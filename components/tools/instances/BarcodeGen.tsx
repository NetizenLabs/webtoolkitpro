'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Barcode, Download, RefreshCcw } from 'lucide-react'
import JsBarcode from 'jsbarcode'

export default function BarcodeGen() {
  const [text, setText] = useState('1234567890')
  const [type, setType] = useState('CODE128')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const generate = () => {
    if (!canvasRef.current || !text) return
    try {
      JsBarcode(canvasRef.current, text, {
        format: type,
        displayValue: true,
        background: '#ffffff',
        lineColor: '#000000',
        margin: 10
      })
    } catch (e) {
      console.error('Invalid barcode data')
    }
  }

  useEffect(() => {
    generate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Initial generation

  const download = () => {
    if (!canvasRef.current) return
    const url = canvasRef.current.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = url
    link.download = `barcode-${type}.png`
    link.click()
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Barcode className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Barcode Generator</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Barcode Value</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2 block ml-1">Symbology</label>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-bold outline-none appearance-none"
              >
                <option value="CODE128">Code 128</option>
                <option value="EAN13">EAN-13</option>
                <option value="UPC">UPC</option>
                <option value="CODE39">Code 39</option>
              </select>
            </div>
            <button 
              onClick={generate}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all"
            >
              Generate Barcode
            </button>
          </div>

          <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0B1120] rounded-3xl p-8 border border-gray-100 dark:border-[#1E2D47]">
            <div className="bg-white p-4 rounded-xl shadow-xl mb-6">
              <canvas ref={canvasRef} className="max-w-full h-auto" />
            </div>
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
