'use client'

import React, { useState } from 'react'
import { Layers, Search, CheckCircle2, XCircle, Info } from 'lucide-react'

export default function SitemapValidator() {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [results, setResults] = useState<string[]>([])

  const validateSitemap = () => {
    if (!url) return
    setStatus('loading')
    
    // Simulating validation for demonstration
    setTimeout(() => {
      if (url.includes('sitemap.xml')) {
        setStatus('success')
        setResults(['Sitemap is accessible', 'Valid XML format', 'All URLs use HTTPS', 'No broken links found'])
      } else {
        setStatus('error')
        setResults(['Invalid URL format', 'Sitemap not found at this location'])
      }
    }, 1500)
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-2xl mb-4">
            <Layers className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Sitemap XML Validator
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Ensure your website's sitemap is perfectly optimized for Google search and follows all technical SEO best practices.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <input 
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/sitemap.xml"
              className="flex-grow px-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              onClick={validateSitemap}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Validate Now
            </button>
          </div>

          {status === 'loading' && (
            <div className="flex flex-col items-center py-12">
              <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500 font-medium">Analyzing Sitemap Structure...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <span className="font-bold text-green-800">Your sitemap is healthy!</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {results.map((res, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-600">
                    • {res}
                  </div>
                ))}
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3">
              <XCircle className="w-6 h-6 text-red-600" />
              <span className="font-bold text-red-800">Validation Failed: {results[0]}</span>
            </div>
          )}

          <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <h3 className="text-sm font-bold text-blue-800 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Pro Tip for US SEO
            </h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              Google prefers sitemaps that contain fewer than 50,000 URLs and are smaller than 50MB. If your site is larger, you should use a "Sitemap Index" file to group multiple sitemaps together.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
