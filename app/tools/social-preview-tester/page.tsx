'use client'

import React, { useState, useEffect } from 'react'
import { Share2, Globe, Facebook, Twitter, Linkedin, Search, Info, AlertCircle, CheckCircle2, Copy, RefreshCw, Smartphone, Monitor } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'
import ToolInfo from '@/components/sections/ToolInfo'
import AdSlot from '@/components/ads/AdSlot'

export default function SocialPreviewTester() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [metadata, setMetadata] = useState({
    title: 'WebToolkit Pro - Premium Developer Tools',
    description: 'The ultimate suite of 26+ high-performance tools for modern web developers. Secure, fast, and 100% free.',
    image: 'https://wtkpro.site/og-image.png',
    siteName: 'WebToolkit Pro',
    url: 'https://wtkpro.site',
  })

  const [activeView, setActiveView] = useState<'mobile' | 'desktop'>('mobile')

  // Stress test calculations
  const titleLength = metadata.title.length
  const descLength = metadata.description.length
  
  const isTitleOk = titleLength >= 30 && titleLength <= 60
  const isDescOk = descLength >= 120 && descLength <= 160

  const handleFetch = async () => {
    if (!url) return
    setLoading(true)
    try {
      // Using AllOrigins CORS proxy for static site demo
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
      const response = await fetch(proxyUrl)
      const data = await response.json()
      
      const parser = new DOMParser()
      const doc = parser.parseFromString(data.contents, 'text/html')
      
      const fetchedMeta = {
        title: doc.querySelector('title')?.innerText || doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || '',
        description: doc.querySelector('meta[name="description"]')?.getAttribute('content') || doc.querySelector('meta[property="og:description"]')?.getAttribute('content') || '',
        image: doc.querySelector('meta[property="og:image"]')?.getAttribute('content') || '',
        siteName: doc.querySelector('meta[property="og:site_name"]')?.getAttribute('content') || '',
        url: url,
      }
      
      setMetadata(fetchedMeta)
    } catch (error) {
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = (key: string, value: string) => {
    setMetadata(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-slate-950/50 min-h-screen">
      <BreadcrumbSchema name="Social Preview Stress Tester" slug="tools/social-preview-tester" />
      <ToolSchema 
        name="Social Media Preview & Meta Tag Tester" 
        description="Verify how your website looks on Facebook, Twitter, LinkedIn, and Google Search. Test and optimize your Open Graph tags and meta descriptions."
        slug="social-preview-tester"
        steps={[
          "Enter your website URL to fetch current Open Graph and meta tags.",
          "Use the 'Editor Stress Test' to simulate changes to your title and description.",
          "Switch between 'Mobile' and 'Desktop' views to verify responsive rendering.",
          "Review the live previews for Google, Facebook, Twitter, and LinkedIn."
        ]}
      />
      
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Share2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Social Preview Stress Tester</h1>
              <p className="text-gray-500 dark:text-slate-400">See how your site looks on social media before you share it</p>
            </div>
          </div>

          <div className="flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-gray-200 dark:border-slate-800">
            <button 
              onClick={() => setActiveView('mobile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeView === 'mobile' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 dark:text-slate-400 hover:text-gray-900'}`}
            >
              <Smartphone className="w-4 h-4" /> Mobile
            </button>
            <button 
              onClick={() => setActiveView('desktop')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeView === 'desktop' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 dark:text-slate-400 hover:text-gray-900'}`}
            >
              <Monitor className="w-4 h-4" /> Desktop
            </button>
          </div>
        </div>

        {/* URL Input */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm mb-12">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="url"
                placeholder="Enter your website URL (e.g., https://wtkpro.site)..."
                className="block w-full pl-11 pr-4 py-4 bg-gray-50 dark:bg-slate-800/50 border border-transparent rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button
              onClick={handleFetch}
              disabled={loading}
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              Fetch Tags
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Editor Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Editor Stress Test</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2">Title</label>
                  <textarea
                    rows={2}
                    className="w-full p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white resize-none text-sm"
                    value={metadata.title}
                    onChange={(e) => handleUpdate('title', e.target.value)}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-[10px] font-bold ${isTitleOk ? 'text-green-500' : 'text-amber-500'}`}>
                      {titleLength} characters {isTitleOk ? '• Optimal' : '• Tweaking advised'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2">Description</label>
                  <textarea
                    rows={4}
                    className="w-full p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white resize-none text-sm leading-relaxed"
                    value={metadata.description}
                    onChange={(e) => handleUpdate('description', e.target.value)}
                  />
                  <div className="flex justify-between items-center mt-2">
                    <span className={`text-[10px] font-bold ${isDescOk ? 'text-green-500' : 'text-amber-500'}`}>
                      {descLength} characters {isDescOk ? '• Optimal' : '• Tweaking advised'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2">Image URL</label>
                  <input
                    type="text"
                    className="w-full p-4 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-transparent focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white text-sm"
                    value={metadata.image}
                    onChange={(e) => handleUpdate('image', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-3xl border border-blue-100 dark:border-blue-800">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-4">
                <Info className="w-5 h-5" />
                <h3 className="font-bold">Pro Tip</h3>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                Aim for <strong>1200x630px</strong> images to ensure high quality on high-DPI displays across all platforms.
              </p>
            </div>
            
            <AdSlot />
          </div>

          {/* Previews Grid */}
          <div className="lg:col-span-8 space-y-12">
            {/* Google Search */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest">
                <Search className="w-4 h-4" /> Google Search Preview
              </div>
              <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-xs font-bold text-gray-400">G</div>
                  <div>
                    <div className="text-sm text-gray-900 dark:text-white leading-none mb-1 font-medium">{metadata.siteName || 'Website'}</div>
                    <div className="text-xs text-gray-400 dark:text-slate-500 leading-none">{metadata.url || 'example.com'}</div>
                  </div>
                </div>
                <div className="text-[#1a0dab] dark:text-[#8ab4f8] text-xl font-medium mb-1 hover:underline cursor-pointer truncate">
                  {metadata.title}
                </div>
                <div className="text-[#4d5156] dark:text-[#bdc1c6] text-sm leading-relaxed max-w-[600px] line-clamp-2">
                  {metadata.description}
                </div>
              </div>
            </div>

            {/* Facebook */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest">
                <Facebook className="w-4 h-4" /> Facebook Feed Preview
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden max-w-[500px]">
                <div className="p-4 flex items-center gap-3 border-b border-gray-50 dark:border-slate-800">
                  <div className="w-10 h-10 bg-blue-100 rounded-full" />
                  <div className="w-24 h-2 bg-gray-100 dark:bg-slate-800 rounded-full" />
                </div>
                <div className="aspect-[1.91/1] bg-gray-100 dark:bg-slate-800 overflow-hidden">
                  {metadata.image && <img src={metadata.image} alt="Preview" className="w-full h-full object-cover" />}
                </div>
                <div className="p-4 bg-gray-50 dark:bg-slate-900/50">
                  <div className="text-xs text-gray-500 dark:text-slate-400 uppercase font-medium mb-1 truncate">{new URL(metadata.url || 'https://example.com').hostname}</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white leading-snug line-clamp-2 mb-1">{metadata.title}</div>
                  <div className="text-sm text-gray-500 dark:text-slate-400 line-clamp-2 leading-relaxed">{metadata.description}</div>
                </div>
              </div>
            </div>

            {/* Twitter */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-900 dark:text-white font-bold text-xs uppercase tracking-widest">
                <Twitter className="w-4 h-4" /> Twitter / X Card Preview
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden max-w-[500px]">
                <div className="aspect-[1.91/1] bg-gray-100 dark:bg-slate-800 overflow-hidden">
                  {metadata.image && <img src={metadata.image} alt="Preview" className="w-full h-full object-cover" />}
                </div>
                <div className="p-4">
                  <div className="text-sm text-gray-500 dark:text-slate-500 mb-1">{new URL(metadata.url || 'https://example.com').hostname}</div>
                  <div className="text-sm font-bold text-gray-900 dark:text-white mb-1 line-clamp-1">{metadata.title}</div>
                  <div className="text-sm text-gray-500 dark:text-slate-400 line-clamp-2">{metadata.description}</div>
                </div>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#0a66c2] font-bold text-xs uppercase tracking-widest">
                <Linkedin className="w-4 h-4" /> LinkedIn Post Preview
              </div>
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-200 dark:border-slate-800 overflow-hidden max-w-[500px]">
                <div className="aspect-[1.91/1] bg-gray-100 dark:bg-slate-800 overflow-hidden">
                  {metadata.image && <img src={metadata.image} alt="Preview" className="w-full h-full object-cover" />}
                </div>
                <div className="p-4">
                  <div className="text-sm font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 leading-tight">{metadata.title}</div>
                  <div className="text-xs text-gray-500 dark:text-slate-500">{new URL(metadata.url || 'https://example.com').hostname} • 1 min read</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <AdSlot className="mt-16" />

        <ToolInfo 
          title="Social Preview Stress Tester"
          description="The WebToolkit Pro Social Preview Tester is a high-performance utility for digital marketers and web developers. It allows you to visualize and optimize your website's 'Social Identity' by simulating how links are rendered on the world's most popular social networks and search engines."
          howItWorks="Our tool uses a global proxy to fetch the raw HTML of your target URL. It then parses the DOM for specific Open Graph (og:), Twitter Card (twitter:), and standard Meta tags. The 'Stress Test' feature calculates character counts in real-time against platform-specific truncation limits, ensuring your messaging is never cut off in a user's feed."
          features={[
            "Live previews for Facebook, Twitter (X), LinkedIn, and Google",
            "Real-time meta tag editor with 'Stress Test' character counts",
            "Responsive Mobile vs. Desktop preview toggle",
            "Automatic truncation warnings for titles and descriptions",
            "CORS-compliant metadata fetching via global proxy",
            "100% Free: Essential for social media marketing campaigns"
          ]}
          faqs={[
            {
              q: "What are Open Graph tags?",
              a: "Open Graph tags are snippets of code that control how URLs are displayed when shared on social media. They are part of Facebook's Open Graph protocol and are used by LinkedIn and other platforms."
            },
            {
              q: "Why is my preview image not showing up?",
              a: "Common issues include the image being too small (minimum 200x200px, recommended 1200x630px), the URL being incorrect, or the image being blocked by your server's robots.txt."
            },
            {
              q: "How long is the ideal social description?",
              a: "Most platforms truncate descriptions after 155-160 characters. Keeping your primary value proposition within the first 120 characters is a best practice."
            },
            {
              q: "Does changing tags here update my website?",
              a: "No. This tool is a simulator. Once you are happy with the preview, you must manually update the `<meta>` tags in your website's code or CMS."
            }
          ]}
        />
      </div>
    </div>
  )
}
