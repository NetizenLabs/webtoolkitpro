'use client'

import React, { useState } from 'react'
import { User, RefreshCcw, Copy, Check, Mail, Phone, MapPin } from 'lucide-react'

export default function RandomUserGen() {
  const [user, setUser] = useState<any>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 0123',
    location: 'New York, USA',
    avatar: 'https://i.pravatar.cc/150?u=john'
  })
  const [copied, setCopied] = useState(false)

  const generate = () => {
    const names = ['Alice Smith', 'Bob Johnson', 'Charlie Brown', 'Diana Prince', 'Ethan Hunt']
    const cities = ['London, UK', 'Tokyo, Japan', 'Berlin, Germany', 'Paris, France', 'Sydney, Australia']
    const random = Math.floor(Math.random() * 5)
    
    setUser({
      name: names[random],
      email: `${names[random].toLowerCase().replace(' ', '.')}@example.com`,
      phone: `+${Math.floor(Math.random() * 90) + 10} (555) ${Math.floor(Math.random() * 9000) + 1000}`,
      location: cities[random],
      avatar: `https://i.pravatar.cc/150?u=${random + Date.now()}`
    })
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
              <User className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Mock Identity Generator</h3>
          </div>
          <button 
            onClick={generate}
            className="p-3 bg-gray-50 dark:bg-white/5 rounded-xl hover:rotate-180 transition-all duration-500 text-blue-600"
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col items-center text-center">
          <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-blue-500/20 mb-4" />
          <h4 className="text-2xl font-black text-gray-900 dark:text-white mb-6">{user.name}</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {[
              { icon: Mail, label: 'Email', val: user.email },
              { icon: Phone, label: 'Phone', val: user.phone },
              { icon: MapPin, label: 'Location', val: user.location },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl flex flex-col items-center gap-1">
                <item.icon className="w-4 h-4 text-gray-400 mb-1" />
                <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{item.label}</span>
                <span className="text-[11px] font-bold text-gray-900 dark:text-white truncate w-full">{item.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button 
        onClick={() => { navigator.clipboard.writeText(JSON.stringify(user, null, 2)); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
        className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] shadow-xl shadow-blue-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        Copy JSON Identity
      </button>
    </div>
  )
}
