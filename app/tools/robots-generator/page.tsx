'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { FileText, Copy, Download, RefreshCw, CheckCircle2, ArrowRight, Shield } from 'lucide-react'

export default function RobotsGenerator() {
  const [allowAll, setAllowAll] = useState(true)
  const [sitemap, setSitemap] = useState('')
  const [customRules, setCustomRules] = useState('')
  const [generated, setGenerated] = useState('')
  const [copied, setCopied] = useState(false)

  const generateRobots = () => {
    let content = 'User-agent: *\n'
    content += allowAll ? 'Allow: /\n' : 'Disallow: /\n'
    
    if (sitemap) {
      content += `Sitemap: ${sitemap.startsWith('http') ? sitemap : 'https://' + sitemap}\n`
    }
    
    if (customRules) {
      content += customRules + '\n'
    }

    setGenerated(content)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generated)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadFile = () => {
    const element = document.createElement('a')
    const file = new Blob([generated], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'robots.txt'
    document.body.appendChild(element)
    element.click()
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-2xl mb-4">
            <FileText className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Robots.txt Generator
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Create professional, SEO-friendly robots.txt files to control how search engines crawl your US-based website.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-orange-500" />
              Configure Rules
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Default Access</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setAllowAll(true)}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${allowAll ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-100 text-gray-500 hover:border-gray-200'}`}
                  >
                    Allow All
                  </button>
                  <button
                    onClick={() => setAllowAll(false)}
                    className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${!allowAll ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-100 text-gray-500 hover:border-gray-200'}`}
                  >
                    Disallow All
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sitemap URL (Recommended)</label>
                <input
                  type="text"
                  value={sitemap}
                  onChange={(e) => setSitemap(e.target.value)}
                  placeholder="https://example.com/sitemap.xml"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Custom Rules (One per line)</label>
                <textarea
                  value={customRules}
                  onChange={(e) => setCustomRules(e.target.value)}
                  placeholder="Disallow: /admin/"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all font-mono text-sm"
                />
              </div>

              <button
                onClick={generateRobots}
                className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-200 transition-all flex items-center justify-center gap-2"
              >
                Generate Robots.txt
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Result</h2>
              <div className="flex gap-2">
                <button
                  onClick={copyToClipboard}
                  disabled={!generated}
                  className="p-2.5 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all disabled:opacity-50"
                  title="Copy to clipboard"
                >
                  {copied ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
                <button
                  onClick={downloadFile}
                  disabled={!generated}
                  className="p-2.5 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all disabled:opacity-50"
                  title="Download .txt"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-grow">
              <textarea
                readOnly
                value={generated}
                placeholder="# Your generated robots.txt will appear here..."
                className="w-full h-full min-h-[300px] px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 outline-none font-mono text-sm text-gray-700"
              />
            </div>
          </div>
        </div>

        {/* Expert Templates CTA */}
        <div className="mt-8 bg-orange-600 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-orange-500/20 group">
          <Shield className="absolute -bottom-10 -right-10 w-40 h-40 opacity-10 group-hover:scale-110 transition-transform" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h3 className="text-xl font-bold mb-2">Need a Battle-Tested robots.txt?</h3>
              <p className="text-orange-100 text-sm leading-relaxed max-w-xl">
                Don't start from scratch. Use our pre-configured, enterprise-grade templates for Next.js, WordPress, and E-commerce platforms.
              </p>
            </div>
            <Link 
              href="/tools/robots-txt-templates/"
              className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg transition-all hover:-translate-y-0.5 whitespace-nowrap"
            >
              View Expert Templates <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* SEO Content Section */}
        <div className="mt-16 bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why is Robots.txt important for US SEO?</h2>
          <div className="prose prose-gray max-w-none">
            <p>
              For professional websites in the US market, a correctly configured robots.txt file is essential for technical SEO. It acts as a guide for search engine crawlers (like Googlebot and Bingbot), telling them which parts of your site should be indexed and which should be ignored.
            </p>
            <h3>Key Benefits:</h3>
            <ul>
              <li><strong>Crawl Budget Optimization</strong>: Prevent bots from wasting time on admin pages or duplicate content.</li>
              <li><strong>Security</strong>: Disallow access to private directories or sensitive development files.</li>
              <li><strong>Sitemap Discovery</strong>: Explicitly link your sitemap to help Google find all your high-value pages instantly.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
