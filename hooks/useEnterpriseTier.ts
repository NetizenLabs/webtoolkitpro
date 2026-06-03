'use client'

import { useState, useEffect } from 'react'

export function useEnterpriseTier() {
  const [isEnterprise, setIsEnterprise] = useState(false)
  const [tier, setTier] = useState<string | null>(null)

  useEffect(() => {
    // Check if running in Tauri desktop environment
    const isTauri = typeof window !== 'undefined' && '__TAURI_INTERNALS__' in window
    
    // Check localStorage for activated license
    const storedTier = localStorage.getItem('wtk_enterprise_tier')
    const isValid = localStorage.getItem('wtk_enterprise_license_valid') === 'true'

    if (isTauri && isValid && storedTier === 'enterprise') {
      setIsEnterprise(true)
      setTier(storedTier)
    } else {
      setIsEnterprise(false)
      setTier(storedTier)
    }
  }, [])

  return { isEnterprise, tier }
}
