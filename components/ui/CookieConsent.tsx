'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Check if consent was already given
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Small delay to ensure smooth hydration and visibility
      const timer = setTimeout(() => setVisible(true), 500)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[200] p-4 sm:p-6 transition-all duration-500 transform translate-y-0"
      style={{ animation: 'fadeIn 0.5s ease-out' }}
    >
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 ring-1 ring-black/5">
        <div className="flex-1">
          <p className="text-sm text-gray-600 leading-relaxed">
            <span className="font-bold text-gray-900">🍪 Cookie Notice: </span>
            We use cookies to enhance your experience and serve relevant ads through Google AdSense. 
            By clicking &quot;Accept&quot;, you consent to the use of cookies. 
            Read our{' '}
            <Link href="/privacy/" className="text-blue-600 font-semibold underline hover:text-blue-800">
              Privacy Policy
            </Link>{' '}
            for more information.
          </p>
        </div>
        <div className="flex gap-3 shrink-0 w-full sm:w-auto">
          <button
            onClick={decline}
            className="flex-1 sm:flex-none px-6 py-3 text-sm font-bold text-gray-600 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="flex-1 sm:flex-none px-6 py-3 text-sm font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}
