'use client'

import React from 'react'
import { Lock, X, ShieldCheck, Download } from 'lucide-react'

interface PremiumFeatureModalProps {
  isOpen: boolean
  onClose: () => void
  featureName?: string
}

export default function PremiumFeatureModal({ isOpen, onClose, featureName = "This feature" }: PremiumFeatureModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0D1526] rounded-3xl border border-gray-100 dark:border-[#1E2D47] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Background */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10" />
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <div className="relative pt-12 px-8 pb-8 text-center">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25 mb-6 rotate-3">
            <Lock className="w-10 h-10 text-white -rotate-3" />
          </div>

          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight mb-3">
            Enterprise Exclusive
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            <span className="font-semibold text-gray-900 dark:text-gray-200">{featureName}</span> is available exclusively on the <strong className="text-blue-500">Air-Gapped Enterprise Desktop Edition</strong>. Process massive datasets locally with zero limits.
          </p>

          <div className="space-y-4">
            <a 
              href="https://whop.com/webtoolkit-pro/" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <ShieldCheck className="w-5 h-5" />
              Upgrade to Enterprise
            </a>
            <button 
              onClick={onClose}
              className="w-full py-3 text-sm font-semibold text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
