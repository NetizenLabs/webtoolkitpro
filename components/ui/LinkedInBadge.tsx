'use client'

import React, { useState, useEffect } from 'react'

interface LinkedInBadgeProps {
  vanity: string
  profileUrl: string
  displayName?: string
}

export default function LinkedInBadge({ vanity, profileUrl, displayName = 'Abu Sufyan' }: LinkedInBadgeProps) {
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const [renderKey, setRenderKey] = useState(0)

  useEffect(() => {
    setMounted(true)

    // Check initial dark mode state
    const checkTheme = () => {
      const isDarkMode = document.documentElement.classList.contains('dark')
      setIsDark(isDarkMode)
    }

    checkTheme()

    // Observe changes to the 'class' attribute of <html> to detect theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkTheme()
        }
      })
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  // When theme changes (or component mounts), re-render the badge wrapper to force refresh
  useEffect(() => {
    if (!mounted) return
    setRenderKey((prev) => prev + 1)
  }, [isDark, mounted])

  // Trigger the LinkedIn badge rendering logic after DOM update
  useEffect(() => {
    if (!mounted) return

    const loadLinkedInScript = () => {
      // Check if script is already present
      const existingScript = document.querySelector('script[src*="platform.linkedin.com/badges/js/profile.js"]')

      if (!existingScript) {
        const script = document.createElement('script')
        script.src = 'https://platform.linkedin.com/badges/js/profile.js'
        script.async = true
        script.defer = true
        script.type = 'text/javascript'
        script.onload = () => {
          if (typeof window !== 'undefined' && (window as any).LIRenderAll) {
            (window as any).LIRenderAll()
          }
        }
        document.body.appendChild(script)
      } else {
        // If script exists, trigger render
        if (typeof window !== 'undefined' && (window as any).LIRenderAll) {
          (window as any).LIRenderAll()
        } else {
          // In case the script is loading, wait and retry
          const interval = setInterval(() => {
            if ((window as any).LIRenderAll) {
              (window as any).LIRenderAll()
              clearInterval(interval)
            }
          }, 100)
          setTimeout(() => clearInterval(interval), 3000)
        }
      }
    }

    // Small delay to ensure the DOM is updated with the new key and classes before LIRenderAll is called
    const timer = setTimeout(() => {
      loadLinkedInScript()
    }, 150)

    return () => clearTimeout(timer)
  }, [renderKey, mounted])

  if (!mounted) {
    return (
      <div className="w-full h-[310px] rounded-[12px] bg-gray-50 dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] animate-pulse flex flex-col items-center justify-center p-6 text-center">
        <div className="w-10 h-10 bg-gray-200 dark:bg-[#1E2D47] rounded-full mb-3" />
        <div className="h-4 w-3/4 bg-gray-200 dark:bg-[#1E2D47] rounded mb-2" />
        <div className="h-3 w-1/2 bg-gray-200 dark:bg-[#1E2D47] rounded" />
      </div>
    )
  }

  return (
    <div
      key={renderKey}
      className="w-full bg-white dark:bg-[#0D1526] rounded-[12px] border border-gray-100 dark:border-[#1E2D47] shadow-sm hover:border-[#00D4B4]/40 hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col items-center justify-center p-4 min-h-[310px]"
    >
      <div
        className="badge-base LI-profile-badge max-w-full"
        data-locale="en_US"
        data-size="medium"
        data-theme={isDark ? 'dark' : 'light'}
        data-type="VERTICAL"
        data-vanity={vanity}
        data-version="v1"
      >
        <a
          className="badge-base__link LI-simple-link text-xs font-bold text-blue-600 dark:text-[#00D4B4] hover:underline"
          href={`${profileUrl}?trk=profile-badge`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {displayName}
        </a>
      </div>
    </div>
  )
}
