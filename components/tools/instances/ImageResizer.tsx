'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Upload, Download, Maximize, FileImage, RefreshCw, Trash2, CheckCircle2, AlertCircle } from 'lucide-react'

export default function ImageResizer() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 })
  const [targetWidth, setTargetWidth] = useState<number>(0)
  const [targetHeight, setTargetHeight] = useState<number>(0)
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true)
  const [targetKB, setTargetKB] = useState<number>(0)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<{ url: string; size: number; width: number; height: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    if (!selectedFile.type.startsWith('image/')) {
      setError('Please select a valid image file.')
      return
    }

    setFile(selectedFile)
    setError(null)
    setResult(null)

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new window.Image()
      img.onload = () => {
        setOriginalDimensions({ width: img.width, height: img.height })
        setTargetWidth(img.width)
        setTargetHeight(img.height)
        setPreview(event.target?.result as string)
      }
      img.src = event.target?.result as string
    }
    reader.readAsDataURL(selectedFile)
  }

  const handleWidthChange = (val: number) => {
    setTargetWidth(val)
    if (maintainAspectRatio && originalDimensions.width > 0) {
      setTargetHeight(Math.round((val / originalDimensions.width) * originalDimensions.height))
    }
  }

  const handleHeightChange = (val: number) => {
    setTargetHeight(val)
    if (maintainAspectRatio && originalDimensions.height > 0) {
      setTargetWidth(Math.round((val / originalDimensions.height) * originalDimensions.width))
    }
  }

  const resizeImage = async () => {
    if (!preview || !canvasRef.current) return
    setIsProcessing(true)
    setError(null)

    try {
      const img = new window.Image()
      img.src = preview
      await new Promise((resolve) => { img.onload = resolve })

      const canvas = canvasRef.current
      canvas.width = targetWidth
      canvas.height = targetHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('Could not get canvas context')

      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

      let finalUrl = ''
      let finalSize = 0
      
      // Determine output format. If targetKB is set, we MUST use a format that supports quality (jpeg/webp).
      // PNG is lossless and will ignore the quality parameter.
      let outputMime = file?.type || 'image/jpeg'
      if (targetKB > 0 && outputMime === 'image/png') {
        outputMime = 'image/jpeg'
      }

      if (targetKB > 0) {
        // Binary search for optimal quality to hit target KB
        let minQuality = 0.01
        let maxQuality = 0.99
        let bestUrl = ''
        let bestSize = 0
        const targetBytes = targetKB * 1024

        for (let i = 0; i < 8; i++) {
          const currentQuality = (minQuality + maxQuality) / 2
          const dataUrl = canvas.toDataURL(outputMime, currentQuality)
          // Base64 size estimation: (stringLength - headerLength) * 3 / 4
          const base64Data = dataUrl.split(',')[1]
          const currentSize = Math.round((base64Data.length * 3) / 4)

          if (currentSize <= targetBytes) {
            bestUrl = dataUrl
            bestSize = currentSize
            minQuality = currentQuality // Try higher quality
          } else {
            maxQuality = currentQuality // Need lower quality
          }
        }
        
        // If we didn't find anything under targetBytes, use the lowest quality found
        if (!bestUrl) {
          bestUrl = canvas.toDataURL(outputMime, 0.01)
          const base64Data = bestUrl.split(',')[1]
          bestSize = Math.round((base64Data.length * 3) / 4)
        }
        
        finalUrl = bestUrl
        finalSize = bestSize
      } else {
        finalUrl = canvas.toDataURL(outputMime, 0.9)
        const base64Data = finalUrl.split(',')[1]
        finalSize = Math.round((base64Data.length * 3) / 4)
      }

      setResult({
        url: finalUrl,
        size: finalSize,
        width: targetWidth,
        height: targetHeight
      })
    } catch (err) {
      setError('An error occurred during resizing.')
      console.error(err)
    } finally {
      setIsProcessing(false)
    }
  }

  const downloadResult = () => {
    if (!result) return
    const link = document.createElement('a')
    link.href = result.url
    link.download = `resized-${file?.name || 'image.jpg'}`
    link.click()
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return (
    <div className="space-y-8">
      {/* File Upload Area */}
      {!file ? (
        <div className="relative group">
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className="border-2 border-dashed border-gray-200 dark:border-slate-800 rounded-[2.5rem] p-12 text-center group-hover:border-[#00D4B4] transition-all bg-gray-50 dark:bg-slate-900/50">
            <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
              <Upload className="w-8 h-8 text-[#00D4B4]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Upload Image to Resize</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 max-w-xs mx-auto">
              Drag & drop or click to select JPG, PNG, or WebP. 100% private, client-side processing.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Original & Controls */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-sm">
              <div className="p-4 bg-gray-50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <FileImage className="w-4 h-4" /> Original Preview
                </span>
                <button 
                  onClick={() => setFile(null)}
                  className="text-red-500 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 flex items-center justify-center bg-checkered min-h-[250px]">
                {preview ? (
                  <Image src={preview} alt="Original" className="max-h-64 object-contain shadow-lg rounded-lg" width={500} height={300} unoptimized />
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-4 border-[#00D4B4] border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm font-bold text-gray-500 dark:text-slate-400">Loading preview...</span>
                  </div>
                )}
              </div>
              <div className="p-4 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Dimensions</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">{originalDimensions.width} × {originalDimensions.height}</div>
                </div>
                <div className="text-center">
                  <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Original Size</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white">{formatSize(file.size)}</div>
                </div>
              </div>
            </div>

            {/* Resizing Options */}
            <div className="p-8 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2rem] space-y-6 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Resizing Options</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Width (px)</label>
                  <input
                    type="number"
                    value={targetWidth}
                    onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl px-4 py-3 font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#00D4B4]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Height (px)</label>
                  <input
                    type="number"
                    value={targetHeight}
                    onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                    className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl px-4 py-3 font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#00D4B4]"
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={maintainAspectRatio}
                  onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-[#00D4B4] focus:ring-[#00D4B4]"
                />
                <span className="text-sm font-medium text-gray-600 dark:text-slate-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  Maintain Aspect Ratio
                </span>
              </label>

              <div className="space-y-2 pt-4 border-t border-gray-100 dark:border-slate-800">
                <div className="flex justify-between">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Target File Size (KB)</label>
                  <span className="text-[10px] font-bold text-[#00D4B4] uppercase tracking-widest">Optional</span>
                </div>
                <input
                  type="number"
                  placeholder="e.g. 100"
                  value={targetKB || ''}
                  onChange={(e) => setTargetKB(parseInt(e.target.value) || 0)}
                  className="w-full bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl px-4 py-3 font-bold text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-[#00D4B4]"
                />
                <p className="text-[10px] text-gray-500 font-medium">Leave 0 to use standard quality (0.9)</p>
              </div>

              <button
                onClick={resizeImage}
                disabled={isProcessing}
                className="w-full py-4 bg-[#00D4B4] text-[#0B1120] rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-teal-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isProcessing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Maximize className="w-4 h-4" />}
                {isProcessing ? 'Processing...' : 'Apply Resizing'}
              </button>
            </div>
          </div>

          {/* Right: Result */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2rem] overflow-hidden shadow-xl min-h-full flex flex-col">
              <div className="p-4 bg-[#0D1526] border-b border-[#1E2D47] flex justify-between items-center">
                <span className="text-[10px] font-bold text-[#00D4B4] uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Result Preview
                </span>
                {result && (
                  <span className="text-[10px] font-bold text-white bg-green-500/20 px-2 py-0.5 rounded-full border border-green-500/30">
                    Ready
                  </span>
                )}
              </div>
              
              <div className="flex-grow flex items-center justify-center p-8 bg-checkered min-h-[300px]">
                {result ? (
                  <Image src={result.url} alt="Result" className="max-w-full shadow-2xl rounded-lg" width={800} height={600} unoptimized />
                ) : (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto opacity-50">
                      <FileImage className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-400 font-medium">Applied resizing will appear here</p>
                  </div>
                )}
              </div>

              {result && (
                <div className="p-6 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-100 dark:border-slate-800 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-700 text-center">
                      <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">New Dimensions</div>
                      <div className="text-sm font-bold text-gray-900 dark:text-white">{result.width} × {result.height}</div>
                    </div>
                    <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-700 text-center">
                      <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">New Size</div>
                      <div className="text-sm font-bold text-green-500">{formatSize(result.size)}</div>
                    </div>
                  </div>

                  <button
                    onClick={downloadResult}
                    className="w-full py-5 bg-gradient-to-r from-[#00D4B4] to-[#0094FF] text-[#0B1120] rounded-2xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-blue-500/10 transition-all"
                  >
                    <Download className="w-5 h-5" /> Download Resized Image
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400">
          <AlertCircle className="w-5 h-5" />
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      <style jsx>{`
        .bg-checkered {
          background-image: 
            linear-gradient(45deg, #f0f0f0 25%, transparent 25%), 
            linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #f0f0f0 75%), 
            linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }
        :global(.dark) .bg-checkered {
          background-image: 
            linear-gradient(45deg, #0f172a 25%, transparent 25%), 
            linear-gradient(-45deg, #0f172a 25%, transparent 25%), 
            linear-gradient(45deg, transparent 75%, #0f172a 75%), 
            linear-gradient(-45deg, transparent 75%, #0f172a 75%);
        }
      `}</style>
    </div>
  )
}
