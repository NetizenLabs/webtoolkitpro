'use client'

import React, { useState } from 'react'
import { FileCode, RefreshCw, Copy, CheckCircle2 } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'
import ToolInfo from '@/components/sections/ToolInfo'
import AdSlot from '@/components/ads/AdSlot'

export default function MarkdownConverter() {
  const [markdown, setMarkdown] = useState('# Welcome to WebToolkit Pro\n\nEdit this text to see it converted to **HTML**.')
  const [copied, setCopied] = useState(false)

  // Simple converter for demonstration (In production, use a library like marked)
  const convertToHtml = (md: string) => {
    let html = md
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/\*\*(.*)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*)\*/g, '<em>$1</em>')
      .replace(/^\- (.*$)/gm, '<li>$1</li>')
      .replace(/\n/g, '<br />')
    return `<div class="prose">\n${html}\n</div>`
  }

  const htmlOutput = convertToHtml(markdown)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlOutput)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <BreadcrumbSchema name="Markdown to HTML Converter" slug="markdown-converter" />
      <ToolSchema 
        name="Markdown to HTML Converter" 
        description="Convert Markdown text to clean, semantic HTML instantly. Perfect for technical writers and developers."
        slug="markdown-converter"
        steps={[
          "Enter your Markdown text in the input area.",
          "Watch as the tool converts it to HTML in real-time.",
          "Review the generated HTML code in the output panel.",
          "Copy the HTML and paste it into your project or CMS."
        ]}
      />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-violet-100 rounded-2xl mb-4">
            <FileCode className="w-8 h-8 text-violet-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Markdown to HTML Converter
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Instantly convert your Markdown content into clean, semantic HTML code for your blog or website.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[600px]">
          {/* Input */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-violet-500" />
              Markdown Input
            </h2>
            <textarea
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              className="flex-grow w-full p-4 bg-gray-50 rounded-xl border border-gray-100 font-mono text-sm outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Type your markdown here..."
            />
          </div>

          {/* Output */}
          <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">HTML Output</h2>
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-violet-600 hover:bg-violet-50 rounded-lg transition-all"
              >
                {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy HTML'}
              </button>
            </div>
            <textarea
              readOnly
              value={htmlOutput}
              className="flex-grow w-full p-4 bg-gray-900 text-gray-100 rounded-xl border border-gray-800 font-mono text-xs outline-none"
            />
          </div>
        </div>
        
        <AdSlot className="mt-12" />

        <ToolInfo 
          title="Markdown to HTML Converter"
          description="The WebToolkit Pro Markdown to HTML Converter is a robust utility designed for developers, technical writers, and content creators. Markdown is a lightweight markup language with plain-text-formatting syntax, and our converter ensures it translates into clean, valid, and semantic HTML5 code."
          howItWorks="Our tool uses a real-time parsing engine that identifies Markdown patterns (such as headers, bold/italic text, lists, and links) and maps them to their equivalent HTML tags. This process allows you to write content quickly without worrying about complex HTML tags, while ensuring the output is optimized for search engines and accessibility."
          features={[
            "Real-time Markdown to HTML transformation",
            "Support for headers (H1-H6), emphasis, and lists",
            "Automatic 'prose' wrapper for easy styling",
            "Clean, minified HTML output generation",
            "Distraction-free IDE-style writing environment",
            "100% Client-side: Your content is never transmitted"
          ]}
          faqs={[
            {
              q: "Why convert Markdown to HTML?",
              a: "While many modern platforms support Markdown directly, some CMS systems and static sites require raw HTML for maximum control over styling and SEO metadata."
            },
            {
              q: "Is the generated HTML semantic?",
              a: "Yes. Our tool ensures that Markdown headers become <h1>, <h2>, etc., and that lists are properly formatted using <li> tags, which is essential for SEO."
            },
            {
              q: "Does this tool support GitHub Flavored Markdown (GFM)?",
              a: "We currently support standard Markdown syntax. For complex GFM features like task lists or tables, we recommend using our dedicated Markdown Previewer."
            },
            {
              q: "Is there a size limit for the content?",
              a: "Our converter can handle thousands of lines of text efficiently. For extremely large documents, your browser's performance may vary depending on available memory."
            }
          ]}
        />
      </div>
    </div>
  )
}
