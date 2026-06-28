'use client'

import React, { useState, useEffect } from 'react'
import { FileText, Shield, ArrowRight, Copy, Check, RotateCcw, Info } from 'lucide-react'

export default function HtaccessGenerator() {
  const [www, setWww] = useState(true)
  const [https, setHttps] = useState(true)
  const [caching, setCaching] = useState(true)
  const [blockBots, setBlockBots] = useState(false)
  const [noIndex, setNoIndex] = useState(false)
  const [hideExt, setHideExt] = useState(false)
  const [config, setConfig] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let conf = `RewriteEngine On\n\n`
    
    if (https) {
      conf += `# Redirect to HTTPS\n`
      conf += `RewriteCond %{HTTPS} off\n`
      conf += `RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\n\n`
    }

    if (www) {
      conf += `# Redirect to WWW\n`
      conf += `RewriteCond %{HTTP_HOST} !^www\\. [NC]\n`
      conf += `RewriteRule ^(.*)$ http://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]\n\n`
    }

    if (caching) {
      conf += `# Browser Caching\n`
      conf += `<IfModule mod_expires.c>\n`
      conf += `  ExpiresActive On\n`
      conf += `  ExpiresDefault "access plus 1 month"\n`
      conf += `  ExpiresByType image/jpg "access plus 1 year"\n`
      conf += `  ExpiresByType text/css "access plus 1 month"\n`
      conf += `</IfModule>\n\n`
    }

    if (blockBots) {
      conf += `# Block Bad Bots\n`
      conf += `RewriteCond %{HTTP_USER_AGENT} ^.*(AhrefsBot|SemrushBot|MJ12bot|DotBot) [NC]\n`
      conf += `RewriteRule .* - [F,L]\n\n`
    }

    if (noIndex) {
      conf += `# Prevent Directory Browsing\n`
      conf += `Options -Indexes\n\n`
    }

    if (hideExt) {
      conf += `# Remove .php and .html extensions\n`
      conf += `RewriteCond %{REQUEST_FILENAME} !-d\n`
      conf += `RewriteCond %{REQUEST_FILENAME}\\.html -f\n`
      conf += `RewriteRule ^(.*)$ $1.html [NC,L]\n\n`
    }

    conf += `# Security Headers\n`
    conf += `Header set X-Content-Type-Options "nosniff"\n`
    conf += `Header set X-Frame-Options "SAMEORIGIN"\n`
    
    setConfig(conf)
  }, [www, https, caching, blockBots, noIndex, hideExt])

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">.htaccess Generator</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Apache Server Rules</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div 
            onClick={() => setHttps(!https)}
            className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer hover:-translate-y-1 ${https ? 'bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'bg-gray-50 dark:bg-[#0B1120] border-gray-100 dark:border-[#1E2D47] hover:border-gray-300 dark:hover:border-gray-600'}`}
          >
            <Shield className={`w-6 h-6 mb-4 transition-colors ${https ? 'text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'text-gray-400'}`} />
            <h4 className="text-xs font-black uppercase tracking-widest mb-1.5 text-gray-900 dark:text-white">Force HTTPS</h4>
            <p className="text-[10px] text-gray-500 font-medium leading-relaxed">Automatic 301 redirection</p>
          </div>

          <div 
            onClick={() => setWww(!www)}
            className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer hover:-translate-y-1 ${www ? 'bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'bg-gray-50 dark:bg-[#0B1120] border-gray-100 dark:border-[#1E2D47] hover:border-gray-300 dark:hover:border-gray-600'}`}
          >
            <ArrowRight className={`w-6 h-6 mb-4 transition-colors ${www ? 'text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'text-gray-400'}`} />
            <h4 className="text-xs font-black uppercase tracking-widest mb-1.5 text-gray-900 dark:text-white">Force WWW</h4>
            <p className="text-[10px] text-gray-500 font-medium leading-relaxed">Standardize canonical URL</p>
          </div>

          <div 
            onClick={() => setCaching(!caching)}
            className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer hover:-translate-y-1 ${caching ? 'bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'bg-gray-50 dark:bg-[#0B1120] border-gray-100 dark:border-[#1E2D47] hover:border-gray-300 dark:hover:border-gray-600'}`}
          >
            <RotateCcw className={`w-6 h-6 mb-4 transition-colors ${caching ? 'text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'text-gray-400'}`} />
            <h4 className="text-xs font-black uppercase tracking-widest mb-1.5 text-gray-900 dark:text-white">Exp. Caching</h4>
            <p className="text-[10px] text-gray-500 font-medium leading-relaxed">Leverage browser caching</p>
          </div>
          
          <div 
            onClick={() => setBlockBots(!blockBots)}
            className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer hover:-translate-y-1 ${blockBots ? 'bg-gradient-to-br from-red-500/10 to-red-600/5 border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.1)]' : 'bg-gray-50 dark:bg-[#0B1120] border-gray-100 dark:border-[#1E2D47] hover:border-gray-300 dark:hover:border-gray-600'}`}
          >
            <Shield className={`w-6 h-6 mb-4 transition-colors ${blockBots ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'text-gray-400'}`} />
            <h4 className="text-xs font-black uppercase tracking-widest mb-1.5 text-gray-900 dark:text-white">Block Bots</h4>
            <p className="text-[10px] text-gray-500 font-medium leading-relaxed">Ban bad crawler user-agents</p>
          </div>

          <div 
            onClick={() => setNoIndex(!noIndex)}
            className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer hover:-translate-y-1 ${noIndex ? 'bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.1)]' : 'bg-gray-50 dark:bg-[#0B1120] border-gray-100 dark:border-[#1E2D47] hover:border-gray-300 dark:hover:border-gray-600'}`}
          >
            <Info className={`w-6 h-6 mb-4 transition-colors ${noIndex ? 'text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]' : 'text-gray-400'}`} />
            <h4 className="text-xs font-black uppercase tracking-widest mb-1.5 text-gray-900 dark:text-white">Hide Folders</h4>
            <p className="text-[10px] text-gray-500 font-medium leading-relaxed">Prevent directory browsing</p>
          </div>

          <div 
            onClick={() => setHideExt(!hideExt)}
            className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer hover:-translate-y-1 ${hideExt ? 'bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'bg-gray-50 dark:bg-[#0B1120] border-gray-100 dark:border-[#1E2D47] hover:border-gray-300 dark:hover:border-gray-600'}`}
          >
            <FileText className={`w-6 h-6 mb-4 transition-colors ${hideExt ? 'text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'text-gray-400'}`} />
            <h4 className="text-xs font-black uppercase tracking-widest mb-1.5 text-gray-900 dark:text-white">Clean URLs</h4>
            <p className="text-[10px] text-gray-500 font-medium leading-relaxed">Remove .html extensions</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">.htaccess</h3>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(config)
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
            className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
          >
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
        <div className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-2xl border border-gray-100 dark:border-[#1E2D47] overflow-x-auto">
          <pre className="text-xs font-mono text-blue-600 dark:text-[#00D4B4] leading-relaxed">{config}</pre>
        </div>
      </div>
    </div>
  )
}
