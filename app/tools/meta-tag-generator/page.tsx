'use client'
import React, { useState } from 'react'
import { Globe, Copy, Check } from 'lucide-react'

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
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-gradient-to-br from-rose-500 to-rose-700 rounded-xl"><Globe className="w-8 h-8 text-white" /></div>
          <div><h1 className="text-3xl font-bold text-gray-900">Meta Tag Generator</h1><p className="text-gray-500">Generate SEO-optimized meta tags for your website</p></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            {[{l:'Page Title',v:title,s:setTitle,p:'My Awesome Website'},{l:'Description',v:desc,s:setDesc,p:'A brief description of your page...'},{l:'Keywords',v:keywords,s:setKeywords,p:'keyword1, keyword2, keyword3'},{l:'URL',v:url,s:setUrl,p:'https://example.com'},{l:'Author',v:author,s:setAuthor,p:'John Doe'}].map(f=>(
              <div key={f.l}><label className="text-sm font-semibold text-gray-700 mb-1 block">{f.l}</label>
                <input value={f.v} onChange={(e)=>f.s(e.target.value)} placeholder={f.p} className="w-full p-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-500 outline-none" /></div>
            ))}
          </div>
          <div><div className="flex justify-between mb-2"><label className="text-sm font-semibold text-gray-700">Generated Meta Tags</label>
            <button onClick={handleCopy} className="text-sm text-rose-600 flex items-center gap-1">{copied?<Check className="w-4 h-4"/>:<Copy className="w-4 h-4"/>}{copied?'Copied':'Copy'}</button></div>
            <textarea readOnly value={output} className="w-full h-[380px] p-4 font-mono text-xs bg-gray-900 text-gray-100 rounded-2xl outline-none resize-none" /></div>
        </div>
        <div className="mt-8 h-[90px] bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm">Ad Space</div>
      </div>
    </div>
  )
}
