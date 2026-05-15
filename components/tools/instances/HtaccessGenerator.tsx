'use client'

import React, { useState, useEffect } from 'react'
import { FileText, Shield, ArrowRight, Copy, Check, RotateCcw, Info } from 'lucide-react'

export default function HtaccessGenerator() {
  const [www, setWww] = useState(true)
  const [https, setHttps] = useState(true)
  const [caching, setCaching] = useState(true)
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

    conf += `# Security Headers\n`
    conf += `Header set X-Content-Type-Options "nosniff"\n`
    conf += `Header set X-Frame-Options "SAMEORIGIN"\n`
    
    setConfig(conf)
  }, [www, https, caching])

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div 
            onClick={() => setHttps(!https)}
            className={`p-6 rounded-2xl border transition-all cursor-pointer ${https ? 'bg-blue-500/5 border-blue-500/20 shadow-sm' : 'bg-gray-50 dark:bg-[#0B1120] border-gray-100 dark:border-[#1E2D47]'}`}
          >
            <Shield className={`w-5 h-5 mb-4 ${https ? 'text-blue-600' : 'text-gray-400'}`} />
            <h4 className="text-[11px] font-black uppercase tracking-widest mb-1 text-gray-900 dark:text-white">Force HTTPS</h4>
            <p className="text-[9px] text-gray-400 font-medium">Automatic 301 redirection</p>
          </div>

          <div 
            onClick={() => setWww(!www)}
            className={`p-6 rounded-2xl border transition-all cursor-pointer ${www ? 'bg-blue-500/5 border-blue-500/20 shadow-sm' : 'bg-gray-50 dark:bg-[#0B1120] border-gray-100 dark:border-[#1E2D47]'}`}
          >
            <ArrowRight className={`w-5 h-5 mb-4 ${www ? 'text-blue-600' : 'text-gray-400'}`} />
            <h4 className="text-[11px] font-black uppercase tracking-widest mb-1 text-gray-900 dark:text-white">Force WWW</h4>
            <p className="text-[9px] text-gray-400 font-medium">Standardize canonical URL</p>
          </div>

          <div 
            onClick={() => setCaching(!caching)}
            className={`p-6 rounded-2xl border transition-all cursor-pointer ${caching ? 'bg-blue-500/5 border-blue-500/20 shadow-sm' : 'bg-gray-50 dark:bg-[#0B1120] border-gray-100 dark:border-[#1E2D47]'}`}
          >
            <RotateCcw className={`w-5 h-5 mb-4 ${caching ? 'text-blue-600' : 'text-gray-400'}`} />
            <h4 className="text-[11px] font-black uppercase tracking-widest mb-1 text-gray-900 dark:text-white">Exp. Caching</h4>
            <p className="text-[9px] text-gray-400 font-medium">Leverage browser caching</p>
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
