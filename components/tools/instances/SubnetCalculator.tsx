'use client'

import React, { useState } from 'react'
import { Network, Search, CheckCircle2, Info, Trash2, ShieldCheck, Zap, Server } from 'lucide-react'

export default function SubnetCalculator() {
  const [ip, setIp] = useState('192.168.1.1')
  const [cidr, setCidr] = useState(24)
  const [results, setResults] = useState<any>(null)

  const calculateSubnet = () => {
    try {
      const parts = ip.split('.').map(Number)
      if (parts.length !== 4 || parts.some(p => p < 0 || p > 255)) throw new Error('Invalid IP')

      const mask = (0xffffffff << (32 - cidr)) >>> 0
      const netAddress = (ipToLong(ip) & mask) >>> 0
      const broadcast = (netAddress | (~mask >>> 0)) >>> 0
      const firstHost = netAddress + 1
      const lastHost = broadcast - 1
      const numHosts = Math.max(0, broadcast - netAddress - 1)

      setResults({
        network: longToIp(netAddress),
        broadcast: longToIp(broadcast),
        mask: longToIp(mask),
        firstHost: longToIp(firstHost),
        lastHost: longToIp(lastHost),
        numHosts: numHosts.toLocaleString(),
        cidr: `/${cidr}`
      })
    } catch (e) {
      alert('Please enter a valid IP address')
    }
  }

  const ipToLong = (ip: string) => {
    return ip.split('.').reduce((acc, part) => (acc << 8) + parseInt(part, 10), 0) >>> 0
  }

  const longToIp = (long: number) => {
    return [
      (long >>> 24) & 0xff,
      (long >>> 16) & 0xff,
      (long >>> 8) & 0xff,
      long & 0xff
    ].join('.')
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden group">
        <div className="flex flex-col md:flex-row gap-6 mb-10 relative z-10">
          <div className="flex-grow">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 mb-2 block">IP Address</label>
            <input 
              type="text"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              className="w-full px-6 py-5 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-transparent focus:ring-2 focus:ring-blue-500 outline-none dark:text-white font-mono text-sm"
            />
          </div>
          <div className="w-full md:w-32">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 mb-2 block">CIDR</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">/</div>
              <input 
                type="number"
                min="0"
                max="32"
                value={cidr}
                onChange={(e) => setCidr(parseInt(e.target.value))}
                className="w-full pl-8 pr-4 py-5 rounded-2xl bg-gray-50 dark:bg-slate-800 border border-transparent focus:ring-2 focus:ring-blue-500 outline-none dark:text-white font-mono text-sm"
              />
            </div>
          </div>
          <button 
            onClick={calculateSubnet}
            className="md:self-end px-10 py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-500/20 transition-all hover:scale-105 uppercase tracking-widest text-xs flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" /> Calculate
          </button>
        </div>

        {results && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {[
              { label: 'Network Address', value: results.network, icon: Network },
              { label: 'Broadcast Address', value: results.broadcast, icon: Server },
              { label: 'Subnet Mask', value: results.mask, icon: ShieldCheck },
              { label: 'First Usable Host', value: results.firstHost, icon: CheckCircle2 },
              { label: 'Last Usable Host', value: results.lastHost, icon: CheckCircle2 },
              { label: 'Total Usable Hosts', value: results.numHosts, icon: Info },
            ].map((res, i) => (
              <div key={i} className="p-6 bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-2xl group hover:border-blue-500/30 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <res.icon className="w-4 h-4 text-blue-500" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{res.label}</span>
                </div>
                <div className="text-sm font-mono font-bold dark:text-white truncate">{res.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-8 bg-[#0B1120] border border-[#1E2D47] rounded-3xl flex items-start gap-6">
        <div className="p-4 bg-blue-500/10 rounded-2xl shrink-0">
          <Network className="w-8 h-8 text-blue-400" />
        </div>
        <div>
          <h5 className="text-lg font-bold text-white mb-2 tracking-tight">IPv4 Subnetting Professional</h5>
          <p className="text-sm text-slate-400 leading-relaxed font-medium">
            Essential for network engineers and system administrators. Quickly determine network boundaries, usable host ranges, and broadcast domains for any CIDR notation.
          </p>
        </div>
      </div>
    </div>
  )
}
