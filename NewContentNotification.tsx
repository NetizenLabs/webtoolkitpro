'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Sparkles, X, ArrowRight, Zap } from 'lucide-react'

interface NewContentNotificationProps {
  latestItem: {
    name: string
    slug: string
    type: 'tool' | 'blog'
    date: string
  } | null
}

export default function NewContentNotification({ latestItem }: NewContentNotificationProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!latestItem) return

    const storageKey = 'wtk_last_seen_update'
    const lastSeen = localStorage.getItem(storageKey)
    
    // Only show if the user hasn't seen this specific update yet
    if (lastSeen !== latestItem.slug) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 2000) // Show after 2 seconds for better UX
      
      return () => clearTimeout(timer)
    }
  }, [latestItem])

  const dismiss = () => {
    localStorage.setItem('wtk_last_seen_update', latestItem.slug)
    setIsVisible(false)
  }

  if (!isVisible) return null

  const href = latestItem.type === 'tool' ? `/tools/${latestItem.slug}/` : `/blog/${latestItem.slug}/`

  return (
    <div className="fixed bottom-6 left-6 z-[100] animate-in slide-in-from-left-12 fade-in duration-700">
      <div className="bg-[#0B1120] border border-[#1E2D47] shadow-2xl shadow-[#00D4B4]/20 rounded-[20px] p-1 pr-6 max-w-sm group overflow-hidden relative">
        {/* Progress bar background */}
        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-[#00D4B4] to-[#0094FF] w-full" />
        
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#00D4B4] to-[#0094FF] rounded-[16px] flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/10 m-1">
            <Zap className="w-6 h-6 text-[#0B1120]" />
          </div>
          
          <div className="flex-grow py-3">
            <div className="flex items-center gap-1.5 mb-0.5">
              <Sparkles className="w-3 h-3 text-[#00D4B4]" />
              <span className="text-[10px] font-bold text-[#00D4B4] uppercase tracking-widest font-mono">
                New {latestItem.type} Released
              </span>
            </div>
            <h4 className="text-sm font-bold text-white line-clamp-1 mb-2">
              {latestItem.name}
            </h4>
            <Link 
              href={href}
              onClick={dismiss}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-white transition-colors"
            >
              Launch Now <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <button 
            onClick={dismiss}
            className="p-1 hover:bg-[#1E2D47] rounded-full text-gray-500 hover:text-white transition-all ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
