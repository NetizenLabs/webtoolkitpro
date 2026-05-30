'use client'

import React, { useState } from 'react'
import { FileText, CheckCircle2, Copy, ShieldAlert, FileCode2, Play } from 'lucide-react'

export default function RobotsTxtToolkit() {
  const [activeTab, setActiveTab] = useState<'generate' | 'validate' | 'templates'>('generate')

  // Generate State
  const [userAgent, setUserAgent] = useState('*')
  const [allow, setAllow] = useState('/')
  const [disallow, setDisallow] = useState('/admin/\\n/private/')
  const [sitemap, setSitemap] = useState('https://example.com/sitemap.xml')

  const generatedRobots = `User-agent: ${userAgent}
${allow.split('\\n').filter(Boolean).map(a => `Allow: ${a}`).join('\\n')}
${disallow.split('\\n').filter(Boolean).map(d => `Disallow: ${d}`).join('\\n')}
${sitemap ? `\\nSitemap: ${sitemap}` : ''}`

  // Validate State
  const [validateInput, setValidateInput] = useState('')
  const [validationResult, setValidationResult] = useState<any>(null)

  const handleValidate = () => {
    if (!validateInput.trim()) return
    const lines = validateInput.split('\\n')
    let errors = []
    let warnings = []
    let sitemapCount = 0

    lines.forEach((line, i) => {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) return
      if (!/^(User-agent|Allow|Disallow|Sitemap|Crawl-delay|Host):/i.test(trimmed)) {
        errors.push(`Line ${i + 1}: Unrecognized directive "${trimmed}"`)
      }
      if (/^Sitemap:/i.test(trimmed)) sitemapCount++
    })

    if (sitemapCount === 0) warnings.push('No Sitemap directive found. It is highly recommended to declare your XML sitemap.')

    setValidationResult({ errors, warnings, ok: errors.length === 0 })
  }

  // Templates State
  const templates = [
    { name: 'Standard Allow All', code: 'User-agent: *\\nAllow: /\\n\\nSitemap: https://yoursite.com/sitemap.xml' },
    { name: 'Block All Crawlers', code: 'User-agent: *\\nDisallow: /' },
    { name: 'WordPress Default', code: 'User-agent: *\\nDisallow: /wp-admin/\\nAllow: /wp-admin/admin-ajax.php\\n\\nSitemap: https://yoursite.com/sitemap.xml' },
    { name: 'Block AI Crawlers', code: 'User-agent: GPTBot\\nDisallow: /\\n\\nUser-agent: ChatGPT-User\\nDisallow: /\\n\\nUser-agent: Google-Extended\\nDisallow: /' }
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <div className="flex border-b border-gray-100 dark:border-[#1E2D47] overflow-x-auto">
        <button onClick={() => setActiveTab('generate')} className={`px-6 py-4 flex items-center gap-2 text-sm font-semibold whitespace-nowrap transition-colors ${activeTab === 'generate' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}>
          <FileCode2 className="w-4 h-4" /> Generate
        </button>
        <button onClick={() => setActiveTab('validate')} className={`px-6 py-4 flex items-center gap-2 text-sm font-semibold whitespace-nowrap transition-colors ${activeTab === 'validate' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}>
          <CheckCircle2 className="w-4 h-4" /> Validate
        </button>
        <button onClick={() => setActiveTab('templates')} className={`px-6 py-4 flex items-center gap-2 text-sm font-semibold whitespace-nowrap transition-colors ${activeTab === 'templates' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}>
          <FileText className="w-4 h-4" /> Templates
        </button>
      </div>

      {activeTab === 'generate' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
          <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-6 shadow-sm overflow-y-auto space-y-4">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white mb-4">Configuration</h3>
            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">User-agent</label>
              <input type="text" value={userAgent} onChange={(e) => setUserAgent(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-[#0B1120] border border-transparent rounded-xl text-sm outline-none dark:text-white mt-1" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Allow (one per line)</label>
              <textarea value={allow} onChange={(e) => setAllow(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-[#0B1120] border border-transparent rounded-xl text-sm outline-none dark:text-white mt-1 h-20 resize-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Disallow (one per line)</label>
              <textarea value={disallow} onChange={(e) => setDisallow(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-[#0B1120] border border-transparent rounded-xl text-sm outline-none dark:text-white mt-1 h-20 resize-none" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">Sitemap URL</label>
              <input type="text" value={sitemap} onChange={(e) => setSitemap(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-[#0B1120] border border-transparent rounded-xl text-sm outline-none dark:text-white mt-1" />
            </div>
          </div>
          <div className="bg-gray-900 rounded-3xl p-6 shadow-sm relative flex flex-col">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-4">Output</h3>
            <button onClick={() => copyToClipboard(generatedRobots)} className="absolute top-6 right-6 text-gray-400 hover:text-white">
              <Copy className="w-4 h-4" />
            </button>
            <textarea readOnly value={generatedRobots} className="w-full flex-grow p-4 bg-[#0B1120] text-emerald-400 border border-gray-800 rounded-2xl text-sm font-mono outline-none resize-none" />
          </div>
        </div>
      )}

      {activeTab === 'validate' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[500px]">
          <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-6 shadow-sm flex flex-col">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white mb-4">Paste robots.txt</h3>
            <textarea
              value={validateInput}
              onChange={(e) => setValidateInput(e.target.value)}
              className="flex-grow w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-transparent focus:border-blue-500/30 rounded-2xl text-sm font-mono outline-none dark:text-gray-300 resize-none mb-4"
              placeholder="User-agent: *\\nDisallow: /private/..."
            />
            <button onClick={handleValidate} className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
              <Play className="w-4 h-4" /> Run Validation
            </button>
          </div>
          <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-6 shadow-sm flex flex-col overflow-y-auto">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white mb-4">Validation Report</h3>
            {!validationResult ? (
              <div className="flex-grow flex items-center justify-center text-gray-400 text-sm">Waiting for input...</div>
            ) : (
              <div className="space-y-4">
                {validationResult.ok ? (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center gap-2 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" /> Syntax is valid!
                  </div>
                ) : (
                  <div className="p-4 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl flex items-start gap-2 font-bold text-sm flex-col">
                    <div className="flex items-center gap-2"><ShieldAlert className="w-5 h-5" /> Errors found:</div>
                    <ul className="list-disc list-inside text-xs font-mono font-medium mt-2">
                      {validationResult.errors.map((e: string, i: number) => <li key={i}>{e}</li>)}
                    </ul>
                  </div>
                )}
                {validationResult.warnings.length > 0 && (
                  <div className="p-4 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl flex items-start gap-2 font-bold text-sm flex-col mt-4">
                    <div className="flex items-center gap-2"><ShieldAlert className="w-5 h-5" /> Warnings:</div>
                    <ul className="list-disc list-inside text-xs font-medium mt-2">
                      {validationResult.warnings.map((w: string, i: number) => <li key={i}>{w}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {templates.map((tpl, i) => (
            <div key={i} className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-6 shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">{tpl.name}</h3>
                <button onClick={() => copyToClipboard(tpl.code)} className="text-gray-400 hover:text-blue-500 transition-colors">
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <pre className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-transparent rounded-2xl text-xs font-mono text-gray-600 dark:text-gray-400 overflow-x-auto">
                {tpl.code}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
