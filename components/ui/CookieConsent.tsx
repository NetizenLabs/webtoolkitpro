'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Shield } from 'lucide-react'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  const updateConsent = (isAccepted: boolean) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'ad_storage': isAccepted ? 'granted' : 'denied',
        'ad_user_data': isAccepted ? 'granted' : 'denied',
        'ad_personalization': isAccepted ? 'granted' : 'denied',
        'analytics_storage': isAccepted ? 'granted' : 'denied'
      })
    }
  }

  useEffect(() => {
    // Check if consent was already given
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Small delay to ensure smooth hydration and visibility
      const timer = setTimeout(() => setVisible(true), 4000)
      return () => clearTimeout(timer)
    } else {
      // Re-apply consent if already given
      updateConsent(consent === 'accepted')
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    updateConsent(true)
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    updateConsent(false)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-6 left-6 right-6 sm:left-auto sm:max-w-sm z-[200] transition-all duration-500 transform translate-y-0"
      style={{ animation: 'fadeIn 0.5s ease-out' }}
    >
      <div className="bg-[#0D1526] border border-[#1E2D47] rounded-[12px] shadow-2xl p-8 flex flex-col gap-6 ring-1 ring-[#00D4B4]/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#00D4B4]/10 rounded-full flex items-center justify-center shrink-0">
             <Shield className="w-5 h-5 text-[#00D4B4]" strokeWidth={1.5} />
          </div>
          <h3 className="font-bold text-white text-xs uppercase tracking-[0.15em]">Privacy Preferences</h3>
        </div>
        <p className="text-sm text-[#8A9BBE] leading-relaxed">
          We use cookies to enhance your experience. Read our <Link href="/privacy" className="text-[#00D4B4] font-bold hover:underline">Privacy Policy</Link>.
        </p>
        <div className="flex gap-3 pt-2">
          <button
            onClick={decline}
            className="flex-1 px-4 py-3 text-xs font-bold text-[#8A9BBE] bg-[#0B1120] border border-[#1E2D47] rounded-[12px] hover:bg-[#152035] transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="flex-1 px-4 py-3 text-xs font-bold text-[#0B1120] bg-gradient-to-r from-[#00D4B4] to-[#0094FF] rounded-[12px] hover:scale-[1.02] transition-all shadow-xl shadow-blue-500/10 active:scale-95"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}

