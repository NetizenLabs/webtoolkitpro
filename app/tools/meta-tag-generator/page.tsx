'use client'
import React, { useState } from 'react'
import { Globe, Copy, Check } from 'lucide-react'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'
import ToolInfo from '@/components/sections/ToolInfo'
import AdSlot from '@/components/ads/AdSlot'

export default function MetaTagGenerator() {
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [keywords, setKeywords] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [copied, setCopied] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [fetchUrl, setFetchUrl] = useState('')

  const handleFetch = async () => {
    if (!fetchUrl) return
    setFetching(true)
    try {
      const target = fetchUrl.startsWith('http') ? fetchUrl : `https://${fetchUrl}`
      const res = await fetch(`/api/fetch-meta?url=${encodeURIComponent(target)}`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      
      setTitle(data.title || '')
      setDesc(data.description || '')
      setKeywords(data.keywords || '')
      setAuthor(data.author || '')
      setUrl(data.url || '')
    } catch (e: any) {
      alert('Failed to fetch meta tags: ' + e.message)
    } finally {
      setFetching(false)
    }
  }

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
      <ToolSchema 
        name="SEO Meta Tag Generator" 
        description="Create SEO-optimized meta tags, Open Graph tags, and Twitter Cards to improve your search visibility and social media appearance."
        slug="meta-tag-generator"
        steps={[
          "Enter your website URL to fetch existing tags or type them manually.",
          "Optimize your title (50-60 characters) and description (150-160 characters).",
          "Include your site URL and author information.",
          "Copy the generated HTML tags and paste them into the <head> section of your website."
        ]}
      />
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

        <div className="mb-10 p-6 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row gap-4">
          <input 
            type="text" 
            placeholder="Enter website URL to fetch tags (e.g., wtkpro.site)..." 
            value={fetchUrl}
            onChange={(e) => setFetchUrl(e.target.value)}
            className="flex-grow p-4 bg-gray-50 dark:bg-slate-800/50 border border-transparent rounded-2xl focus:ring-2 focus:ring-rose-500 outline-none dark:text-white font-medium"
          />
          <button 
            onClick={handleFetch}
            disabled={fetching}
            className="px-8 py-4 bg-rose-600 text-white font-bold rounded-2xl hover:bg-rose-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {fetching ? 'Fetching...' : 'Fetch Existing Tags'}
          </button>
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

        <AdSlot className="mt-8" />

        <ToolInfo 
          title="Meta Tag Generator"
          description="The WebToolkit Pro Meta Tag Generator is a professional utility designed to help web developers and SEO specialists create perfectly formatted meta tags. These tags are the backbone of search engine optimization, providing search engines like Google and Bing with essential information about your content."
          howItWorks="Our tool generates a comprehensive set of meta tags, including Primary SEO tags (Title, Description, Keywords), Open Graph (OG) tags for Facebook and LinkedIn, and Twitter Cards. These tags ensure that your content looks professional and engaging when shared across all platforms."
          features={[
            "Optimized Primary Meta Tags (Title & Description)",
            "Open Graph Protocol support for social media",
            "Twitter Card integration for rich media sharing",
            "Real-time code generation and formatting",
            "Compliance with Google search snippet standards",
            "Lightweight and 100% browser-based"
          ]}
          faqs={[
            {
              q: "What are meta tags?",
              a: "Meta tags are snippets of text that describe a page's content; they don't appear on the page itself, but only in the page's source code. They tell search engines what the page is about."
            },
            {
              q: "Why is the Meta Description important?",
              a: "The meta description is the short paragraph of text that appears under your URL in search results. A well-written description can significantly increase your Click-Through Rate (CTR)."
            },
            {
              q: "What is Open Graph?",
              a: "Open Graph is a protocol created by Facebook that allows web pages to become rich objects in social graphs. It controls how your site appears when shared on platforms like Facebook, WhatsApp, and LinkedIn."
            },
            {
              q: "How many keywords should I include?",
              a: "Modern SEO focuses more on content relevance than the meta keywords tag, which Google largely ignores. However, it's still good practice to include 3-5 high-relevance keywords for other search engines."
            }
          ]}
        />
      </div>
    </div>
  )
}
