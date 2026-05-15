'use client'

import React, { useState } from 'react'
import { Shield, Eye, EyeOff, Info } from 'lucide-react'

export default function PasswordTester() {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  const getStrength = () => {
    if (!password) return 0
    let score = 0
    if (password.length >= 8) score += 25
    if (password.length >= 12) score += 15
    if (/[A-Z]/.test(password)) score += 15
    if (/[0-9]/.test(password)) score += 15
    if (/[^A-Za-z0-9]/.test(password)) score += 30
    return Math.min(score, 100)
  }

  const strength = getStrength()
  const getColor = () => {
    if (strength < 40) return 'bg-red-500'
    if (strength < 70) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Security Strength Tester</h3>
        </div>

        <div className="relative mb-6">
          <input
            type={show ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password to analyze..."
            className="w-full p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-lg font-bold outline-none pr-16"
          />
          <button 
            onClick={() => setShow(!show)}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-500"
          >
            {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-400">
            <span>Entropy Level</span>
            <span className={strength < 40 ? 'text-red-500' : strength < 70 ? 'text-yellow-500' : 'text-green-500'}>
              {strength < 40 ? 'Weak' : strength < 70 ? 'Medium' : 'Very Secure'}
            </span>
          </div>
          <div className="h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
            <div className={`h-full transition-all duration-500 ${getColor()}`} style={{ width: `${strength}%` }} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Minimum 8 Characters', met: password.length >= 8 },
          { label: 'Uppercase Letters', met: /[A-Z]/.test(password) },
          { label: 'Numeric Digits', met: /[0-9]/.test(password) },
          { label: 'Special Characters', met: /[^A-Za-z0-9]/.test(password) },
        ].map((rule, i) => (
          <div key={i} className={`p-4 rounded-xl border flex items-center gap-3 ${rule.met ? 'bg-green-500/5 border-green-500/10 text-green-600' : 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-[#1E2D47] text-gray-400'}`}>
            <div className={`w-2 h-2 rounded-full ${rule.met ? 'bg-green-500' : 'bg-gray-300'}`} />
            <span className="text-[10px] font-black uppercase tracking-widest">{rule.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
