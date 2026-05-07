'use client'
import React, { useState } from 'react'
import { Globe, Copy, Check } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'

export default function MetaTagGenerator() {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [keywords, setKeywords] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [copied, setCopied] = useState(false)

  const output = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}" />
<meta name="description" content="${desc}" />
<meta name="keywords" content="${keywords}" />
<meta name="author" content="${author}" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content="${url}" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content="${url}" />
<meta property="twitter:title" content="${title}" />
<meta property="twitter:description" content="${desc}" />`

  const handleCopy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false),2000) }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="Meta Tag Generator" slug="meta-tag-generator" />
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <div className="p-4 bg-gradient-to-br from-rose-500 to-rose-700 rounded-2xl shadow-lg shadow-rose-500/20">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Meta Tag Generator</h1>
            <p className="text-gray-500 dark:text-slate-400">Generate SEO-optimized meta tags for your website</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {[{l:'Page Title',v:title,s:setTitle,p:'My Awesome Website'},{l:'Description',v:desc,s:setDesc,p:'A brief description of your page...'},{l:'Keywords',v:keywords,s:setKeywords,p:'keyword1, keyword2, keyword3'},{l:'URL',v:url,s:setUrl,p:'https://example.com'},{l:'Author',v:author,s:setAuthor,p:'John Doe'}].map(f=>(
              <div key={f.l}>
                <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2 block">{f.l}</label>
                <input 
                  value={f.v} 
                  onChange={(e)=>f.s(e.target.value)} 
                  placeholder={f.p} 
                  className="w-full p-4 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-rose-500 outline-none dark:text-white transition-all shadow-sm" 
                />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">Generated HTML Output</label>
              <button 
                onClick={handleCopy} 
                className="text-sm font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 flex items-center gap-2 px-4 py-2 bg-rose-50 dark:bg-rose-900/10 rounded-xl transition-all"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy Code'}</span>
              </button>
            </div>
            <textarea 
              readOnly 
              value={output} 
              className="w-full h-[480px] p-6 font-mono text-xs bg-gray-900 dark:bg-slate-900 text-emerald-400 border border-gray-800 dark:border-slate-800 rounded-3xl shadow-2xl outline-none resize-none" 
            />
          </div>
        </div>

        <div className="mt-12 h-[90px] bg-gray-50 dark:bg-slate-900/50 rounded-2xl border border-dashed border-gray-200 dark:border-slate-800 flex items-center justify-center">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Ad Placement</span>
        </div>
      </div>
    </div>
  )
}
