'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Delay showing for a better UX
      const timer = setTimeout(() => setVisible(true), 1500)
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
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
      style={{ animation: 'fadeInUp 0.4s ease-out' }}
    >
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
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
        <div className="flex gap-3 shrink-0">
          <button
            onClick={decline}
            className="px-5 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
            id="cookie-decline-btn"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors shadow-sm"
            id="cookie-accept-btn"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  )
}
