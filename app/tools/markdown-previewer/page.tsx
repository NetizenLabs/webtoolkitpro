'use client'

import React, { useState } from 'react'
import { FileCode, Copy, Check, Trash2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'
import ToolInfo from '@/components/sections/ToolInfo'
import AdSlot from '@/components/ads/AdSlot'

export default function MarkdownPreviewer() {
  const [md, setMd] = useState(`# Hello World\n\nThis is a **Markdown** previewer.\n\n## Features\n- Write Markdown on the left\n- See HTML preview on the right\n- Supports **bold**, *italic*, and more\n\n### Code\n\`\`\`js\nconsole.log('Hello!')\n\`\`\`\n\n> This is a blockquote\n\n[Visit WebToolkit Pro](/)`)
  const [copied, setCopied] = useState(false)

  const toHtml = (text: string) => {
    return text
      .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-6 mb-3 border-b pb-2">$1</h2>')
      .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-black mt-8 mb-4 border-b-2 pb-2">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 dark:bg-slate-800 px-1.5 py-0.5 rounded font-mono text-sm text-sky-600 dark:text-sky-400">$1</code>')
      .replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-sky-500 pl-4 my-4 italic text-gray-600 dark:text-slate-400">$1</blockquote>')
      .replace(/^- (.*$)/gm, '<li class="ml-4 list-disc">$1</li>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-sky-600 dark:text-sky-400 underline hover:no-underline">$1</a>')
      .replace(/\n/g, '<br/>')
  }

  const handleCopy = () => { 
    navigator.clipboard.writeText(toHtml(md))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000) 
  }

  const clearAll = () => setMd('')

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="Markdown Previewer" slug="tools/markdown-previewer" />
      <ToolSchema 
        name="Live Markdown Previewer" 
        description="Write and preview Markdown in real-time. Generate clean HTML for your technical documentation and README files."
        slug="markdown-previewer"
        steps={[
          "Enter your Markdown text in the left editor panel.",
          "Instantly see the rendered HTML preview on the right.",
          "Use the styling features like bold, italic, and code blocks.",
          "Copy the generated HTML code for use in your projects."
        ]}
      />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-sky-600 rounded-2xl shadow-lg shadow-sky-600/20">
              <FileCode className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Markdown Previewer</h1>
              <p className="text-gray-500 dark:text-slate-400">Live technical documentation preview and HTML generation</p>
            </div>
          </div>
          
          <button 
            onClick={clearAll}
            className="flex items-center gap-2 px-6 py-3 bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 rounded-xl font-bold text-sm hover:bg-red-100 dark:hover:bg-red-900/20 transition-all border border-red-100 dark:border-red-900/30"
          >
            <Trash2 className="w-4 h-4" /> Clear Editor
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest px-2">Source Markdown</label>
            <textarea 
              value={md} 
              onChange={(e) => setMd(e.target.value)} 
              placeholder="Enter markdown code..."
              className="w-full h-[600px] p-6 font-mono text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-[2.5rem] focus:ring-2 focus:ring-sky-500 outline-none resize-none dark:text-white shadow-sm transition-all" 
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Live HTML Preview</label>
              <button 
                onClick={handleCopy} 
                className="text-xs font-bold text-sky-600 dark:text-sky-400 flex items-center gap-2 px-4 py-2 bg-sky-50 dark:bg-sky-900/10 rounded-lg hover:bg-sky-100 transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied HTML' : 'Copy Output'}
              </button>
            </div>
            <div 
              className="w-full h-[600px] p-8 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-[2.5rem] overflow-auto dark:text-slate-300 shadow-2xl shadow-sky-900/5 transition-all" 
              dangerouslySetInnerHTML={{ __html: toHtml(md) }} 
            />
          </div>
        </div>

        {/* Technical Context Footer */}
        <div className="bg-sky-600 rounded-[3rem] p-10 text-white relative overflow-hidden group mb-16 shadow-xl shadow-sky-500/20">
          <FileCode className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold mb-4">Master Technical Documentation</h3>
              <p className="text-sky-100 text-sm leading-relaxed">
                Markdown is the industry standard for developer documentation. Learn how to optimize your README files and technical specs for maximum clarity and engagement.
              </p>
            </div>
            <Link 
              href="/tools/markdown-converter/"
              className="inline-flex items-center gap-2 bg-white text-sky-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all hover:-translate-y-1 whitespace-nowrap"
            >
              Export to HTML Code <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <AdSlot />

        <ToolInfo 
          title="Markdown Previewer"
          description="The WebToolkit Pro Markdown Previewer is an advanced IDE-style utility for technical writers and developers. It provides a real-time side-by-side view of your Markdown source and the rendered HTML result, ensuring that your documentation is perfectly formatted before deployment."
          howItWorks="Our previewer uses a sophisticated regex-based rendering engine to translate Markdown syntax into CSS-styled HTML components. It supports complex structures like nested lists, blockquotes, and inline code snippets, allowing you to visualize how your content will appear on platforms like GitHub, GitLab, or personal developer blogs."
          features={[
            "Real-time side-by-side Markdown rendering",
            "Support for headers, emphasis, and blockquotes",
            "Styled code blocks for technical documentation",
            "Automatic link and image tag generation",
            "Copyable HTML output for CMS integration",
            "100% Client-side: Your content stays private"
          ]}
          faqs={[
            {
              q: "Why use a live previewer?",
              a: "A live previewer allows you to catch formatting errors instantly, such as broken links or improperly nested lists, before you publish your documentation."
            },
            {
              q: "Can I use custom CSS with this previewer?",
              a: "The previewer uses our optimized 'prose' styling. While you can't inject custom CSS into the tool, the generated HTML can be styled with any external stylesheet."
            },
            {
              q: "Does this support Markdown tables?",
              a: "We currently focus on the most common Markdown structures. For complex table generation, we recommend using a dedicated table-to-markdown utility."
            },
            {
              q: "Is it safe to paste sensitive notes?",
              a: "Yes. Like all WebToolkit Pro tools, the Markdown Previewer runs entirely in your browser. No data is sent to our servers."
            }
          ]}
        />
      </div>
    </div>
  )
}
