const fs = require('fs');
const path = require('path');

// 1. Fix WhoisLookup.tsx
const whoisCode = `'use client'
import React, { useState } from 'react'
import { Globe, User, Calendar, Shield, Search, Activity, FileText } from 'lucide-react'

export default function WhoisLookup() {
  const [domain, setDomain] = useState('')
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLookup = async () => {
    if (!domain) return
    setLoading(true)
    setData(null)
    setError('')

    try {
      const res = await fetch(\`/api/whois?domain=\${encodeURIComponent(domain)}\`)
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      
      const statusList = json.status ? (Array.isArray(json.status) ? json.status.join(', ') : json.status) : 'Active'
      const nameservers = json.nameservers || []
      
      setData({
        domain: domain,
        registrar: json.registrar || 'Unknown',
        registered: json.creation_date ? new Date(json.creation_date).toLocaleDateString() : 'Unknown',
        expires: json.expiration_date ? new Date(json.expiration_date).toLocaleDateString() : 'Unknown',
        status: statusList,
        nameservers: nameservers,
        registrant: json.registrant || 'REDACTED FOR PRIVACY',
        raw: JSON.stringify(json, null, 2)
      })
    } catch (err: any) {
      setError(err.message || 'Failed to lookup domain')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Domain WHOIS Lookup</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="example.com"
            className="flex-1 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold outline-none"
          />
          <button 
            onClick={handleLookup}
            disabled={loading}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-50"
          >
            {loading ? <Activity className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />} Run Lookup
          </button>
        </div>
        {error && <div className="mt-4 text-red-500 text-sm font-bold">{error}</div>}
      </div>

      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                <Shield className="w-3 h-3" /> Registration Summary
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { label: 'Registrar', value: data.registrar, icon: Shield },
                  { label: 'Created', value: data.registered, icon: Calendar },
                  { label: 'Expires', value: data.expires, icon: Calendar },
                  { label: 'Status', value: data.status, icon: Activity },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-black/5">
                    <div className="flex items-center gap-2 mb-1">
                      <item.icon className="w-3 h-3 text-gray-400" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">{item.label}</span>
                    </div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white truncate" title={item.value}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 flex items-center gap-2">
                <FileText className="w-3 h-3" /> Raw Data Output
              </h4>
              <div className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-xl font-mono text-[10px] text-blue-600 dark:text-[#00D4B4] leading-relaxed overflow-auto max-h-64 whitespace-pre-wrap border border-black/5">
                {data.raw}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
              <Globe className="w-3 h-3" /> Name Servers
            </h4>
            <div className="space-y-3">
              {data.nameservers.length > 0 ? data.nameservers.map((ns: string, i: number) => (
                <div key={i} className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-xs font-mono font-bold text-blue-600 dark:text-[#00D4B4]">{ns}</span>
                </div>
              )) : <div className="text-sm text-gray-400">No nameservers found</div>}
            </div>
            <div className="mt-8 p-6 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-[#1E2D47]">
              <div className="flex items-center gap-2 mb-2 text-gray-400">
                <User className="w-3 h-3" />
                <span className="text-[10px] font-black uppercase tracking-widest">Registrant</span>
              </div>
              <div className="text-xs font-bold text-red-500 italic">{data.registrant}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
`;
fs.writeFileSync('components/tools/instances/WhoisLookup.tsx', whoisCode, 'utf8');

// 2. Fix PingTest.tsx
const pingCode = `'use client'
import React, { useState, useEffect } from 'react'
import { Activity, Search, Trash2, Zap, Server, Globe } from 'lucide-react'

export default function PingTest() {
  const [host, setHost] = useState('')
  const [isPinging, setIsPinging] = useState(false)
  const [history, setHistory] = useState<{ time: number; status: 'ok' | 'timeout' | 'error'; ms: number }[]>([])

  useEffect(() => {
    let interval: any
    let active = true
    if (isPinging) {
      if (!host) {
        setIsPinging(false)
        return
      }
      const target = host.startsWith('http') ? host : \`https://\${host}\`
      
      const ping = async () => {
        if (!active) return
        const start = performance.now()
        try {
          await fetch(target, { mode: 'no-cors', cache: 'no-store' })
          const ms = Math.round(performance.now() - start)
          setHistory((prev) => [{ time: Date.now(), status: 'ok', ms }, ...prev].slice(0, 50))
        } catch (e) {
          setHistory((prev) => [{ time: Date.now(), status: 'error', ms: 0 }, ...prev].slice(0, 50))
        }
      }
      
      ping()
      interval = setInterval(ping, 2000)
    }
    return () => {
      active = false
      clearInterval(interval)
    }
  }, [isPinging, host])

  const validHistory = history.filter(h => h.status === 'ok')
  const avgPing = validHistory.length > 0 ? Math.round(validHistory.reduce((a, b) => a + b.ms, 0) / validHistory.length) : 0
  const packetLoss = history.length > 0 ? ((history.filter(h => h.status !== 'ok').length / history.length) * 100).toFixed(1) : '0.0'

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">HTTP Latency Tester</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={host}
            onChange={(e) => setHost(e.target.value)}
            disabled={isPinging}
            placeholder="google.com"
            className="flex-1 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold outline-none font-mono disabled:opacity-50"
          />
          <button 
            onClick={() => setIsPinging(!isPinging)}
            className={\`px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 \${isPinging ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'}\`}
          >
            {isPinging ? 'Stop Ping' : 'Start Ping'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Average Latency', value: \`\${avgPing}ms\`, icon: Zap, color: 'text-blue-500' },
          { label: 'Requests Sent', value: history.length, icon: Server, color: 'text-gray-400' },
          { label: 'Request Loss', value: \`\${packetLoss}%\`, icon: Globe, color: 'text-green-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className={\`w-3 h-3 \${stat.color}\`} />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</span>
            </div>
            <div className="text-2xl font-black text-gray-900 dark:text-white">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Response Terminal</h3>
          <button onClick={() => setHistory([])} className="text-[10px] font-bold text-gray-400 hover:text-red-500 flex items-center gap-1 uppercase tracking-widest">
            <Trash2 className="w-3 h-3" /> Clear
          </button>
        </div>
        <div className="h-64 bg-gray-50 dark:bg-[#0B1120] rounded-2xl p-6 font-mono text-[10px] overflow-auto space-y-1">
          {history.length > 0 ? history.map((h, i) => (
            <div key={i} className={\`flex items-center gap-4 \${h.status === 'ok' ? 'text-blue-600 dark:text-[#00D4B4]' : 'text-red-500'}\`}>
              <span className="text-gray-400 w-16">[{new Date(h.time).toLocaleTimeString([], { hour12: false })}]</span>
              <span className="font-bold">
                {h.status === 'ok' ? \`HTTP Request to \${host}: seq=\${history.length - i} time=\${h.ms}ms\` : \`Request to \${host} failed or timed out\`}
              </span>
            </div>
          )) : (
            <div className="text-gray-400 italic">Waiting for request sequence...</div>
          )}
        </div>
      </div>
    </div>
  )
}
`;
fs.writeFileSync('components/tools/instances/PingTest.tsx', pingCode, 'utf8');

// 3. Fix DnsPropagation.tsx
const dnsCode = `'use client'
import React, { useState } from 'react'
import { Globe, Check, Search, MapPin, Activity, X } from 'lucide-react'

const PROVIDERS = [
  { id: 1, name: 'Google DNS', url: 'https://dns.google/resolve' },
  { id: 2, name: 'Cloudflare DNS', url: 'https://cloudflare-dns.com/dns-query' }
]

export default function DnsPropagation() {
  const [domain, setDomain] = useState('')
  const [type, setType] = useState('A')
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const checkDns = async () => {
    if (!domain) return
    setLoading(true)
    setResults([])
    
    try {
      const fetchPromises = PROVIDERS.map(async (provider) => {
        try {
          const res = await fetch(\`\${provider.url}?name=\${encodeURIComponent(domain)}&type=\${type}\`, {
            headers: { 'Accept': 'application/dns-json' }
          })
          const json = await res.json()
          let answer = 'No records found'
          if (json.Answer && json.Answer.length > 0) {
            answer = json.Answer.map((a: any) => a.data).join(', ')
          }
          return { provider: provider.name, status: 'success', value: answer }
        } catch (e) {
          return { provider: provider.name, status: 'error', value: 'Resolution failed' }
        }
      })
      
      const resolved = await Promise.all(fetchPromises)
      setResults(resolved)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">DNS Resolver</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="example.com"
            className="flex-1 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold outline-none"
          />
          <select 
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full md:w-32 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-bold outline-none appearance-none"
          >
            <option value="A">A</option>
            <option value="AAAA">AAAA</option>
            <option value="CNAME">CNAME</option>
            <option value="MX">MX</option>
            <option value="TXT">TXT</option>
          </select>
          <button 
            onClick={checkDns}
            disabled={loading}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? <Activity className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />} Check Status
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((loc, i) => (
          <div key={i} className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Server className="w-4 h-4 text-gray-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-white">{loc.provider}</span>
              </div>
              <div className={\`w-6 h-6 rounded-full flex items-center justify-center \${loc.status === 'success' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}\`}>
                {loc.status === 'success' ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
              </div>
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl text-xs font-mono text-blue-600 dark:text-[#00D4B4] border border-black/5 dark:border-white/5 break-all">
                {loc.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
`;
fs.writeFileSync('components/tools/instances/DnsPropagation.tsx', dnsCode, 'utf8');

// 4. Create API for PortScanner
const apiPath = 'app/api/port-scan';
if (!fs.existsSync(apiPath)) fs.mkdirSync(apiPath, { recursive: true });
const portScanApiCode = `import { NextResponse } from 'next/server';
import net from 'net';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const target = searchParams.get('target');
  
  if (!target) {
    return NextResponse.json({ error: 'Target is required' }, { status: 400 });
  }

  const commonPorts = [
    { port: 80, service: 'HTTP' },
    { port: 443, service: 'HTTPS' },
    { port: 21, service: 'FTP' },
    { port: 22, service: 'SSH' },
    { port: 25, service: 'SMTP' },
    { port: 3306, service: 'MySQL' }
  ];

  const scanPort = (port: number): Promise<string> => {
    return new Promise((resolve) => {
      const socket = new net.Socket();
      socket.setTimeout(2000);
      
      socket.on('connect', () => {
        socket.destroy();
        resolve('Open');
      });
      
      socket.on('timeout', () => {
        socket.destroy();
        resolve('Timeout');
      });
      
      socket.on('error', () => {
        socket.destroy();
        resolve('Closed');
      });
      
      socket.connect(port, target);
    });
  };

  const results = await Promise.all(
    commonPorts.map(async (p) => {
      const status = await scanPort(p.port);
      return { ...p, status };
    })
  );

  return NextResponse.json({ results });
}
`;
fs.writeFileSync(path.join(apiPath, 'route.ts'), portScanApiCode, 'utf8');

// 5. Fix PortScanner.tsx
const portScannerCode = `'use client'
import React, { useState } from 'react'
import { Terminal, Zap, AlertTriangle, Activity } from 'lucide-react'

export default function PortScanner() {
  const [target, setTarget] = useState('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [error, setError] = useState('')

  const scanPorts = async () => {
    if (!target) return
    setLoading(true)
    setResults([])
    setError('')
    
    try {
      const res = await fetch(\`/api/port-scan?target=\${encodeURIComponent(target)}\`)
      const data = await res.json()
      if (data.error) throw new Error(data.error)
      setResults(data.results)
    } catch (e: any) {
      setError(e.message || 'Scan failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group">
        <div className="flex flex-col sm:flex-row gap-4 mb-10 relative z-10">
          <input 
            type="text"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            placeholder="example.com or 127.0.0.1"
            className="flex-grow px-8 py-6 rounded-3xl bg-gray-50 dark:bg-slate-950 border border-transparent focus:ring-2 focus:ring-red-500 outline-none dark:text-white font-mono text-lg shadow-inner transition-all"
          />
          <button 
            onClick={scanPorts}
            disabled={loading}
            className="px-12 py-6 bg-red-600 text-white font-black rounded-3xl shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs disabled:opacity-50"
          >
            {loading ? <Activity className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
            {loading ? 'Scanning...' : 'Scan Target'}
          </button>
        </div>

        {error && <div className="text-red-500 font-bold mb-4">{error}</div>}

        {results.length > 0 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-500">
            <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-2">Common Port Audit</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((r, i) => (
                <div key={i} className="p-6 bg-[#0B1120] border border-[#1E2D47] rounded-2xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-red-400 font-bold">Port {r.port}</span>
                    <p className="text-[10px] text-gray-500 font-bold uppercase">{r.service}</p>
                  </div>
                  <span className={\`px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-full \${r.status === 'Open' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-gray-800 text-gray-400 border-gray-700'}\`}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-8 bg-red-50 dark:bg-red-900/5 border border-red-100 dark:border-red-900/20 rounded-3xl flex items-start gap-6">
        <AlertTriangle className="w-8 h-8 text-red-500 shrink-0" />
        <div>
          <h5 className="text-lg font-bold text-red-900 dark:text-red-400 mb-2 tracking-tight">Security Notice</h5>
          <p className="text-sm text-red-800/70 dark:text-red-500/70 leading-relaxed font-medium">
            This tool performs a real TCP connection attempt from our server to the target IP address. Scanning external servers may trigger firewall alerts on the target infrastructure.
          </p>
        </div>
      </div>
    </div>
  )
}
`;
fs.writeFileSync('components/tools/instances/PortScanner.tsx', portScannerCode, 'utf8');

console.log("Replaced mock tools with real API-based tools.");
