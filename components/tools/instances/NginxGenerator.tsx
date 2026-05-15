'use client'

import React, { useState, useEffect } from 'react'
import { Server, Settings, Copy, Check, Info, FileCode } from 'lucide-react'

export default function NginxGenerator() {
  const [domain, setDomain] = useState('example.com')
  const [port, setPort] = useState('80')
  const [proxyPort, setProxyPort] = useState('3000')
  const [ssl, setSsl] = useState(true)
  const [php, setPhp] = useState(false)
  const [config, setConfig] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let conf = `server {\n`
    conf += `    listen ${port};\n`
    if (ssl && port === '80') {
        conf = `server {\n    listen 80;\n    server_name ${domain} www.${domain};\n    return 301 https://$server_name$request_uri;\n}\n\nserver {\n    listen 443 ssl http2;\n`
    }
    conf += `    server_name ${domain} www.${domain};\n\n`
    
    if (ssl) {
        conf += `    ssl_certificate /etc/letsencrypt/live/${domain}/fullchain.pem;\n`
        conf += `    ssl_certificate_key /etc/letsencrypt/live/${domain}/privkey.pem;\n\n`
    }

    conf += `    location / {\n`
    conf += `        proxy_pass http://localhost:${proxyPort};\n`
    conf += `        proxy_http_version 1.1;\n`
    conf += `        proxy_set_header Upgrade $http_upgrade;\n`
    conf += `        proxy_set_header Connection 'upgrade';\n`
    conf += `        proxy_set_header Host $host;\n`
    conf += `        proxy_cache_bypass $http_upgrade;\n`
    conf += `    }\n`

    if (php) {
        conf += `\n    location ~ \\.php$ {\n`
        conf += `        include snippets/fastcgi-php.conf;\n`
        conf += `        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;\n`
        conf += `    }\n`
    }

    conf += `}`
    setConfig(conf)
  }, [domain, port, proxyPort, ssl, php])

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Nginx Config Generator</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Reverse Proxy & SSL Scaffolding</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 block ml-1">Domain Name</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-medium text-gray-800 dark:text-[#F0F6FF] outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2 block ml-1">Proxy Pass Port</label>
              <input
                type="text"
                value={proxyPort}
                onChange={(e) => setProxyPort(e.target.value)}
                className="w-full p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-medium text-gray-800 dark:text-[#F0F6FF] outline-none"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0B1120] rounded-2xl border border-gray-100 dark:border-[#1E2D47]">
              <span className="text-[11px] font-black uppercase tracking-widest text-gray-600 dark:text-[#8A9BBE]">Enable SSL (Certbot)</span>
              <button 
                onClick={() => setSsl(!ssl)}
                className={`w-12 h-6 rounded-full transition-all relative ${ssl ? 'bg-blue-600' : 'bg-gray-300 dark:bg-white/10'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${ssl ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0B1120] rounded-2xl border border-gray-100 dark:border-[#1E2D47]">
              <span className="text-[11px] font-black uppercase tracking-widest text-gray-600 dark:text-[#8A9BBE]">PHP-FPM Support</span>
              <button 
                onClick={() => setPhp(!php)}
                className={`w-12 h-6 rounded-full transition-all relative ${php ? 'bg-blue-600' : 'bg-gray-300 dark:bg-white/10'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${php ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">nginx.conf</h3>
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
