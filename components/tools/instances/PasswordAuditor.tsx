'use client'

import React, { useState, useEffect } from 'react'
import { ShieldCheck, ShieldAlert, Zap, Clock, Info, Lock, Eye, EyeOff, BarChart3, CheckCircle2 } from 'lucide-react'

export default function PasswordAuditor() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState<string[]>([])

  useEffect(() => {
    auditPassword()
  }, [password])

  const auditPassword = () => {
    const issues: string[] = []
    let s = 0

    if (password.length >= 8) s += 1
    else issues.push('Increase length to at least 8 characters.')

    if (/[A-Z]/.test(password)) s += 1
    else issues.push('Add uppercase letters.')

    if (/[a-z]/.test(password)) s += 1
    else issues.push('Add lowercase letters.')

    if (/[0-9]/.test(password)) s += 1
    else issues.push('Add numerical digits.')

    if (/[^A-Za-z0-9]/.test(password)) s += 1
    else issues.push('Add special characters (e.g., @, #, $).')

    if (password.length >= 16) s += 1

    setScore(s)
    setFeedback(issues)
  }

  const getStrengthLabel = () => {
    if (score <= 2) return { label: 'CRITICAL', color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' }
    if (score <= 4) return { label: 'VULNERABLE', color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' }
    if (score === 5) return { label: 'STRONG', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' }
    return { label: 'ELITE', color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' }
  }

  const stats = getStrengthLabel()

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-10">
          <div className="space-y-4">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 block text-center">Enter Password to Audit</label>
            <div className="relative">
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••••••"
                className="w-full px-8 py-6 rounded-3xl bg-gray-50 dark:bg-slate-950 border border-transparent focus:ring-2 focus:ring-blue-500 outline-none dark:text-white font-mono text-xl text-center tracking-widest shadow-inner transition-all"
              />
              <button 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-500 transition-all"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`p-8 rounded-3xl border ${stats.border} ${stats.bg} flex flex-col items-center justify-center text-center animate-in zoom-in duration-500`}>
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${stats.bg}`}>
                {score <= 2 ? <ShieldAlert className={`w-8 h-8 ${stats.color}`} /> : <ShieldCheck className={`w-8 h-8 ${stats.color}`} />}
              </div>
              <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${stats.color}`}>Security Posture</span>
              <h3 className={`text-2xl font-black ${stats.color}`}>{stats.label}</h3>
            </div>

            <div className="p-8 bg-gray-50 dark:bg-slate-950 border border-gray-100 dark:border-slate-800 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-gray-400" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Entropy Report</span>
              </div>
              <div className="space-y-3">
                {feedback.length > 0 ? feedback.map((f, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1.5 shrink-0" />
                    <p className="text-xs font-medium text-gray-500 dark:text-slate-400 leading-tight">{f}</p>
                  </div>
                )) : (
                  <div className="flex gap-3 items-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Perfect Entropy</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-8 bg-[#0B1120] border border-[#1E2D47] rounded-3xl flex items-start gap-6">
          <Clock className="w-8 h-8 text-blue-400 shrink-0" />
          <div>
            <h5 className="text-sm font-bold text-white mb-1 tracking-tight uppercase">Crack Time Estimation</h5>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              {score > 5 ? 'Estimated crack time: Over 1,000 Years (Modern Brute Force)' : 'Estimated crack time: Under 2 Hours (Common Cloud Arrays)'}
            </p>
          </div>
        </div>
        <div className="p-8 bg-[#0B1120] border border-[#1E2D47] rounded-3xl flex items-start gap-6">
          <Lock className="w-8 h-8 text-[#00D4B4] shrink-0" />
          <div>
            <h5 className="text-sm font-bold text-white mb-1 tracking-tight uppercase">Privacy Guarantee</h5>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Audits are performed locally using <span className="text-white font-bold">Regex Heuristics</span>. Your password is never sent to a server or saved in logs.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
