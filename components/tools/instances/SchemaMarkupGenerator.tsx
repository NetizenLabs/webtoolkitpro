'use client'

import React, { useState } from 'react'
import { CheckCircle, AlertTriangle, Info, Copy, RefreshCw, Trash2, Database, Layers, ShieldCheck, FileJson } from 'lucide-react'

export default function SchemaMarkupGenerator() {
  const [activeTab, setActiveTab] = useState<'entity' | 'breadcrumb' | 'validate'>('entity')

  // --- Entity Generator State ---
  const [type, setType] = useState('Organization')
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')

  // --- Breadcrumb Generator State ---
  const [items, setItems] = useState([{ name: 'Home', url: 'https://example.com' }])

  // --- Validator State ---
  const [validateContent, setValidateContent] = useState('')
  const [results, setResults] = useState<{ type: 'error' | 'warning' | 'success'; message: string; field?: string }[]>([])
  
  const [copied, setCopied] = useState(false)

  const generateEntitySchema = () => {
    const schema = {
      '@context': 'https://schema.org',
      '@type': type,
      'name': name || undefined,
      'url': url || undefined,
      'description': description || undefined
    }
    return JSON.stringify(schema, null, 2)
  }

  const generateBreadcrumbSchema = () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "name": item.name || 'Untitled',
        "item": item.url || 'https://example.com'
      }))
    }
    return JSON.stringify(schema, null, 2)
  }

  const getActiveSchema = () => activeTab === 'entity' ? generateEntitySchema() : generateBreadcrumbSchema()

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getActiveSchema())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const validateSchema = () => {
    const findings: typeof results = []
    try {
      const data = JSON.parse(validateContent)
      if (data['@context'] !== 'https://schema.org') {
        findings.push({ type: 'warning', message: 'Missing or non-standard @context. Recommended: "https://schema.org"', field: '@context' })
      }
      if (!data['@type']) {
        findings.push({ type: 'error', message: 'Missing @type declaration. Search engines need to know what entity this describes.', field: '@type' })
      }
      const type = data['@type']
      if (type === 'Organization' && !data.name) {
        findings.push({ type: 'error', message: 'Organization must have a "name" property.', field: 'name' })
      }
      if (type === 'WebSite' && !data.url) {
        findings.push({ type: 'error', message: 'WebSite must have a "url" property.', field: 'url' })
      }
    } catch (e) {
      findings.push({ type: 'error', message: 'Invalid JSON format. Please ensure your schema is properly quoted and balanced.' })
    }
    if (findings.length === 0 && validateContent.trim()) {
      findings.push({ type: 'success', message: 'JSON-LD Schema is syntactically valid and contains core required fields.' })
    }
    setResults(findings)
  }

  return (
    <div className="space-y-8">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'entity', label: 'Entity Generator', icon: Database },
          { id: 'breadcrumb', label: 'Breadcrumbs', icon: Layers },
          { id: 'validate', label: 'Pro Validator', icon: ShieldCheck }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'bg-white dark:bg-[#0D1526] text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-[#1E2D47] hover:bg-gray-50 dark:hover:bg-[#1E2D47]'}`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'validate' ? (
        <div className="space-y-8">
          <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white mb-6">Structured Data Validator</h3>
            <textarea
              value={validateContent}
              onChange={(e) => setValidateContent(e.target.value)}
              placeholder='{\n  "@context": "https://schema.org",\n  "@type": "Organization"\n}'
              className="w-full h-64 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-mono outline-none dark:text-white"
            />
            <button onClick={validateSchema} className="w-full mt-6 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Validate Schema
            </button>
          </div>
          <div className="space-y-4">
            {results.map((res, i) => (
              <div key={i} className={`p-6 rounded-2xl border flex items-center gap-4 ${
                res.type === 'error' ? 'bg-red-500/5 border-red-500/10 text-red-600' :
                res.type === 'warning' ? 'bg-yellow-500/5 border-yellow-500/10 text-yellow-600' :
                'bg-green-500/5 border-green-500/10 text-green-600'
              }`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  res.type === 'error' ? 'bg-red-500/10' : res.type === 'warning' ? 'bg-yellow-500/10' : 'bg-green-500/10'
                }`}>
                  {res.type === 'error' ? <AlertTriangle className="w-5 h-5" /> : res.type === 'warning' ? <Info className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest mb-1">{res.type} {res.field && `in [${res.field}]`}</h4>
                  <p className="text-xs font-bold leading-relaxed">{res.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-[#0D1526] p-8 rounded-3xl border border-gray-100 dark:border-[#1E2D47] shadow-sm">
              <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8 flex items-center gap-2">
                <RefreshCw className="w-4 h-4" /> Parameters
              </h2>
              {activeTab === 'entity' ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-3">Type</label>
                    <select value={type} onChange={(e) => setType(e.target.value)} className="w-full px-5 py-4 bg-gray-50 dark:bg-[#0B1120] rounded-2xl outline-none dark:text-white font-bold border border-transparent dark:border-[#1E2D47]">
                      <option>Organization</option><option>WebSite</option><option>LocalBusiness</option><option>Person</option>
                    </select>
                  </div>
                  <div><label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-3">Name</label><input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., WebToolkit Pro" className="w-full px-5 py-4 bg-gray-50 dark:bg-[#0B1120] rounded-2xl outline-none dark:text-white border border-transparent dark:border-[#1E2D47]" /></div>
                  <div><label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-3">URL</label><input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" className="w-full px-5 py-4 bg-gray-50 dark:bg-[#0B1120] rounded-2xl outline-none dark:text-white border border-transparent dark:border-[#1E2D47]" /></div>
                  <div><label className="block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase mb-3">Description</label><textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Overview..." rows={3} className="w-full px-5 py-4 bg-gray-50 dark:bg-[#0B1120] rounded-2xl outline-none dark:text-white resize-none border border-transparent dark:border-[#1E2D47]" /></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item, i) => (
                    <div key={i} className="space-y-2 p-4 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-transparent dark:border-[#1E2D47]">
                      <div className="flex justify-between items-center"><span className="text-[10px] font-black text-gray-400">Level {i + 1}</span><button onClick={() => setItems(items.filter((_, idx) => idx !== i))} className="text-red-500 hover:text-red-600"><Trash2 className="w-4 h-4" /></button></div>
                      <input value={item.name} onChange={(e) => { const newItems = [...items]; newItems[i].name = e.target.value; setItems(newItems); }} placeholder="Page Name" className="w-full p-3 bg-white dark:bg-[#0D1526] rounded-lg text-xs font-bold outline-none border border-gray-100 dark:border-[#1E2D47] dark:text-white" />
                      <input value={item.url} onChange={(e) => { const newItems = [...items]; newItems[i].url = e.target.value; setItems(newItems); }} placeholder="URL" className="w-full p-3 bg-white dark:bg-[#0D1526] rounded-lg text-xs font-mono outline-none border border-gray-100 dark:border-[#1E2D47] dark:text-white" />
                    </div>
                  ))}
                  <button onClick={() => setItems([...items, { name: '', url: '' }])} className="w-full py-3 border-2 border-dashed border-gray-200 dark:border-[#1E2D47] rounded-xl text-[10px] font-black uppercase text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-all">Add Level</button>
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-7 flex flex-col">
            <div className="bg-white dark:bg-[#0D1526] rounded-3xl border border-gray-100 dark:border-[#1E2D47] shadow-xl p-8 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest"><FileJson className="inline w-3 h-3 mr-1" /> JSON-LD Output</h2>
                <button onClick={copyToClipboard} className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-xl font-bold text-xs hover:bg-blue-700 transition-all">
                  {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="flex-grow p-6 bg-gray-50 dark:bg-[#0B1120] rounded-2xl border border-gray-100 dark:border-[#1E2D47] text-xs font-mono text-blue-600 dark:text-[#00D4B4] overflow-auto">
                {getActiveSchema()}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
