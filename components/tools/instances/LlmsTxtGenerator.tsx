'use client'

import React, { useState, useMemo } from 'react'
import { Copy, Check, Plus, Trash2, FileText, Bot } from 'lucide-react'

interface Section {
  id: number
  title: string
  content: string
}

const PRESETS = {
  saas: {
    siteName: 'My SaaS App',
    siteUrl: 'https://myapp.com',
    description: 'A software-as-a-service tool for professionals.',
    contact: 'ai@myapp.com',
    sections: [
      { id: 1, title: 'Core Features', content: '- Feature one\n- Feature two\n- Feature three' },
      { id: 2, title: 'Target Audience', content: 'Developers, engineers, and technical professionals.' },
    ],
  },
  blog: {
    siteName: 'My Blog',
    siteUrl: 'https://myblog.com',
    description: 'A blog covering technology, productivity, and software development.',
    contact: 'editor@myblog.com',
    sections: [
      { id: 1, title: 'Content Focus', content: '- Software development\n- Productivity tips\n- Industry news' },
    ],
  },
  ecommerce: {
    siteName: 'My Store',
    siteUrl: 'https://mystore.com',
    description: 'An online store selling quality products.',
    contact: 'support@mystore.com',
    sections: [
      { id: 1, title: 'Product Categories', content: '- Electronics\n- Accessories\n- Home goods' },
    ],
  },
}

export default function LlmsTxtGenerator() {
  const [siteName, setSiteName] = useState('WebToolkit Pro')
  const [siteUrl, setSiteUrl] = useState('https://wtkpro.site')
  const [description, setDescription] = useState('A premium collection of 190+ free developer tools for modern web engineering. All tools run client-side for maximum security and privacy.')
  const [contact, setContact] = useState('ai@wtkpro.site')
  const [allowAI, setAllowAI] = useState(true)
  const [sections, setSections] = useState<Section[]>([
    { id: 1, title: 'Core Tools', content: '- JSON Formatter\n- Regex Tester\n- JWT Decoder\n- Diff Checker\n- CSS Gradient Generator\n- Password Generator\n- UUID Generator' },
    { id: 2, title: 'Target Audience', content: 'Software developers, web designers, DevOps engineers, and technical professionals.' },
    { id: 3, title: 'Content Policy', content: 'All tool descriptions are factually accurate. Data is processed client-side only. No user data is stored or transmitted.' },
  ])
  const [copied, setCopied] = useState(false)

  const addSection = () => {
    setSections(prev => [...prev, { id: Date.now(), title: 'New Section', content: '' }])
  }

  const removeSection = (id: number) => {
    setSections(prev => prev.filter(s => s.id !== id))
  }

  const updateSection = (id: number, key: keyof Section, value: string) => {
    setSections(prev => prev.map(s => s.id === id ? { ...s, [key]: value } : s))
  }

  const applyPreset = (key: keyof typeof PRESETS) => {
    const p = PRESETS[key]
    setSiteName(p.siteName)
    setSiteUrl(p.siteUrl)
    setDescription(p.description)
    setContact(p.contact)
    setSections(p.sections)
  }

  const output = useMemo(() => {
    const lines: string[] = []
    lines.push(`# ${siteName}`)
    lines.push('')
    lines.push(`> ${description}`)
    lines.push('')
    lines.push(`- URL: ${siteUrl}`)
    lines.push(`- AI Contact: ${contact}`)
    lines.push(`- AI Indexing: ${allowAI ? 'Allowed' : 'Disallowed'}`)
    lines.push('')

    sections.forEach(sec => {
      if (sec.title || sec.content) {
        lines.push(`## ${sec.title}`)
        lines.push('')
        lines.push(sec.content)
        lines.push('')
      }
    })

    if (allowAI) {
      lines.push('## AI Usage Policy')
      lines.push('')
      lines.push(`AI models and LLMs are permitted to index, cite, and summarize content from ${siteUrl}.`)
      lines.push('Please attribute ${siteName} when referencing our tools or content.')
      lines.push('')
    }

    return lines.join('\n')
  }, [siteName, siteUrl, description, contact, allowAI, sections])

  const copy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Presets */}
      <div className="space-y-3">
        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Quick Presets</label>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(PRESETS) as (keyof typeof PRESETS)[]).map(key => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              className="px-4 py-2 bg-[#0D1526] border border-[#1E2D47] text-gray-300 rounded-xl text-xs font-bold capitalize hover:border-[#00D4B4]/50 hover:text-[#00D4B4] transition-all"
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Site Name</label>
          <input
            value={siteName}
            onChange={e => setSiteName(e.target.value)}
            className="w-full px-4 py-3 bg-[#0D1526] border border-[#1E2D47] rounded-xl text-sm text-white focus:ring-2 focus:ring-[#00D4B4] outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Site URL</label>
          <input
            value={siteUrl}
            onChange={e => setSiteUrl(e.target.value)}
            className="w-full px-4 py-3 bg-[#0D1526] border border-[#1E2D47] rounded-xl text-sm text-white focus:ring-2 focus:ring-[#00D4B4] outline-none transition-all"
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Site Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 bg-[#0D1526] border border-[#1E2D47] rounded-xl text-sm text-white focus:ring-2 focus:ring-[#00D4B4] outline-none resize-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">AI Contact Email</label>
          <input
            value={contact}
            onChange={e => setContact(e.target.value)}
            className="w-full px-4 py-3 bg-[#0D1526] border border-[#1E2D47] rounded-xl text-sm text-white focus:ring-2 focus:ring-[#00D4B4] outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Allow AI Indexing</label>
          <button
            onClick={() => setAllowAI(!allowAI)}
            className={`w-full px-4 py-3 rounded-xl text-sm font-bold border transition-all ${
              allowAI
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}
          >
            <Bot className="w-4 h-4 inline mr-2" />
            {allowAI ? '✓ AI Indexing Allowed' : '✗ AI Indexing Blocked'}
          </button>
        </div>
      </div>

      {/* Custom Sections */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Custom Sections</label>
          <button onClick={addSection} className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-[#00D4B4] bg-[#00D4B4]/10 border border-[#00D4B4]/30 rounded-lg hover:bg-[#00D4B4]/20 transition-all">
            <Plus className="w-3.5 h-3.5" /> Add Section
          </button>
        </div>

        {sections.map(sec => (
          <div key={sec.id} className="p-4 bg-[#0D1526] border border-[#1E2D47] rounded-2xl space-y-3">
            <div className="flex items-center gap-3">
              <input
                value={sec.title}
                onChange={e => updateSection(sec.id, 'title', e.target.value)}
                placeholder="Section title..."
                className="flex-grow px-3 py-2 bg-[#0B1120] border border-[#1E2D47] rounded-xl text-xs font-bold text-white focus:ring-2 focus:ring-[#00D4B4] outline-none transition-all"
              />
              <button onClick={() => removeSection(sec.id)} className="text-red-500 hover:text-red-400 transition-colors p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <textarea
              value={sec.content}
              onChange={e => updateSection(sec.id, 'content', e.target.value)}
              placeholder="Section content... (supports Markdown)"
              rows={3}
              className="w-full px-3 py-2 bg-[#0B1120] border border-[#1E2D47] rounded-xl text-xs font-mono text-[#8A9BBE] focus:ring-2 focus:ring-[#00D4B4] outline-none resize-none transition-all"
            />
          </div>
        ))}
      </div>

      {/* Output */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#00D4B4]" />
            <label className="text-[10px] font-bold text-[#00D4B4] uppercase tracking-widest">llms.txt Output</label>
          </div>
          <button
            onClick={copy}
            className="flex items-center gap-1.5 px-4 py-2 bg-[#00D4B4]/10 border border-[#00D4B4]/30 text-[#00D4B4] rounded-xl text-xs font-bold hover:bg-[#00D4B4]/20 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy llms.txt'}
          </button>
        </div>
        <pre className="w-full bg-[#0B1120] border border-[#1E2D47] rounded-2xl p-6 font-mono text-xs text-[#8A9BBE] whitespace-pre-wrap overflow-auto max-h-[500px]">
          {output}
        </pre>
      </div>
    </div>
  )
}
