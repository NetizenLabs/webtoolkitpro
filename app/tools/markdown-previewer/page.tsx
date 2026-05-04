'use client'
import React, { useState } from 'react'
import { FileCode, Copy, Check } from 'lucide-react'

export default function MarkdownPreviewer() {
  const [md, setMd] = useState(`# Hello World\n\nThis is a **Markdown** previewer.\n\n## Features\n- Write Markdown on the left\n- See HTML preview on the right\n- Supports **bold**, *italic*, and more\n\n### Code\n\`\`\`js\nconsole.log('Hello!')\n\`\`\`\n\n> This is a blockquote\n\n[Visit WebToolkit Pro](/)`)
  const [copied, setCopied] = useState(false)

  const toHtml = (text: string) => {
    return text
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code style="background:#f3f4f6;padding:2px 6px;border-radius:4px;font-size:0.875em">$1</code>')
      .replace(/^> (.*$)/gm, '<blockquote style="border-left:4px solid #d1d5db;padding-left:16px;color:#6b7280;margin:8px 0">$1</blockquote>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:#2563eb;text-decoration:underline">$1</a>')
      .replace(/\n/g, '<br/>')
  }

  const handleCopy = () => { navigator.clipboard.writeText(toHtml(md)); setCopied(true); setTimeout(()=>setCopied(false),2000) }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-sky-500 to-sky-700 rounded-xl"><FileCode className="w-8 h-8 text-white" /></div>
          <div><h1 className="text-3xl font-bold text-gray-900">Markdown Previewer</h1><p className="text-gray-500">Write Markdown and see live HTML preview side by side</p></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div><div className="flex justify-between mb-2"><label className="text-sm font-semibold text-gray-700">Markdown</label></div>
            <textarea value={md} onChange={(e)=>setMd(e.target.value)} className="w-full h-[500px] p-4 font-mono text-sm bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-sky-500 outline-none resize-none" /></div>
          <div><div className="flex justify-between mb-2"><label className="text-sm font-semibold text-gray-700">Preview</label>
            <button onClick={handleCopy} className="text-sm text-sky-600 flex items-center gap-1">{copied?<Check className="w-4 h-4"/>:<Copy className="w-4 h-4"/>}{copied?'Copied HTML':'Copy HTML'}</button></div>
            <div className="w-full h-[500px] p-6 bg-white border border-gray-200 rounded-2xl overflow-auto prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: toHtml(md) }} /></div>
        </div>
        <div className="mt-8 h-[90px] bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">Ad Space</div>
      </div>
    </div>
  )
}
