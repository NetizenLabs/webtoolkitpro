'use client'
import React, { useState, useRef, useEffect } from 'react'
import QRCode from 'qrcode'
import { QrCode, Download, Copy, Check, RefreshCw } from 'lucide-react'
import { triggerQuickSuccess } from '@/lib/effects'

export default function QrCodeGenerator() {
  const [text, setText] = useState('')
  const [qrUrl, setQrUrl] = useState('')
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (text) {
      generateQr()
    } else {
      setQrUrl('')
    }
  }, [text])

  const generateQr = async () => {
    try {
      const url = await QRCode.toDataURL(text, {
        width: 1000,
        margin: 2,
        color: {
          dark: '#0f172a',
          light: '#ffffff'
        }
      })
      setQrUrl(url)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDownload = () => {
    if (!qrUrl) return
    const link = document.createElement('a')
    link.href = qrUrl
    link.download = 'wtkpro-qr-code.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    triggerQuickSuccess()
  }

  const handleCopy = async () => {
    if (!qrUrl) return
    try {
      const response = await fetch(qrUrl)
      const blob = await response.blob()
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ])
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      triggerQuickSuccess()
    } catch (err) {
      console.error('Failed to copy image:', err)
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest flex items-center gap-2 px-2">
              <QrCode className="w-4 h-4 text-blue-500" /> Enter Content
            </h3>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter URL or text to generate QR code..."
              className="w-full h-[200px] p-6 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-slate-200 font-mono text-sm resize-none transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center space-y-6 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl shadow-blue-900/5 min-h-[400px]">
          {qrUrl ? (
            <>
              <div className="p-4 bg-white rounded-2xl shadow-lg border border-gray-100">
                <img src={qrUrl} alt="QR Code" className="w-64 h-64" />
              </div>
              <div className="flex gap-4 w-full max-w-xs">
                <button 
                  onClick={handleCopy}
                  className="flex-1 py-3 px-4 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-bold text-sm hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button 
                  onClick={handleDownload}
                  className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  <Download className="w-4 h-4" /> Download
                </button>
              </div>
            </>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gray-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto border-2 border-dashed border-gray-200 dark:border-slate-700">
                <QrCode className="w-8 h-8 text-gray-300 dark:text-slate-600" />
              </div>
              <p className="text-sm text-gray-400 dark:text-slate-500 font-medium italic">
                QR code will appear here...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
