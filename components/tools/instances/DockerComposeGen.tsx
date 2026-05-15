'use client'

import React, { useState, useEffect } from 'react'
import { Box, Settings, Copy, Check, Plus, Trash2 } from 'lucide-react'

export default function DockerComposeGen() {
  const [services, setServices] = useState<{ name: string; image: string; ports: string[] }[]>([
    { name: 'app', image: 'node:18-alpine', ports: ['3000:3000'] },
    { name: 'db', image: 'postgres:15-alpine', ports: ['5432:5432'] },
  ])
  const [config, setConfig] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let conf = `version: '3.8'\n\nservices:\n`
    services.forEach(s => {
      conf += `  ${s.name}:\n`
      conf += `    image: ${s.image}\n`
      if (s.ports.length > 0) {
        conf += `    ports:\n`
        s.ports.forEach(p => {
          conf += `      - "${p}"\n`
        })
      }
      conf += `    restart: always\n`
    })
    setConfig(conf)
  }, [services])

  const addService = () => {
    setServices([...services, { name: 'new-service', image: 'alpine', ports: [] }])
  }

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
              <Box className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Docker Compose Builder</h3>
          </div>
          <button 
            onClick={addService}
            className="px-4 py-2 bg-blue-500/10 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500/20 transition-all flex items-center gap-2"
          >
            <Plus className="w-3 h-3" /> Add Service
          </button>
        </div>

        <div className="space-y-4">
          {services.map((s, i) => (
            <div key={i} className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-2xl border border-gray-100 dark:border-[#1E2D47] flex items-center gap-4">
              <div className="flex-1 grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={s.name}
                  onChange={(e) => {
                    const next = [...services]
                    next[i].name = e.target.value
                    setServices(next)
                  }}
                  className="p-3 bg-white dark:bg-[#1E2D47] border border-gray-100 dark:border-white/5 rounded-xl text-xs font-mono outline-none"
                  placeholder="Service Name"
                />
                <input
                  type="text"
                  value={s.image}
                  onChange={(e) => {
                    const next = [...services]
                    next[i].image = e.target.value
                    setServices(next)
                  }}
                  className="p-3 bg-white dark:bg-[#1E2D47] border border-gray-100 dark:border-white/5 rounded-xl text-xs font-mono outline-none"
                  placeholder="Docker Image"
                />
              </div>
              <button onClick={() => removeService(i)} className="text-gray-400 hover:text-red-500 p-2">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">docker-compose.yml</h3>
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
