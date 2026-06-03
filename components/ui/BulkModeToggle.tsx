'use client'

import React, { useState } from 'react'
import { Zap, Lock } from 'lucide-react'
import { useEnterpriseTier } from '@/hooks/useEnterpriseTier'
import PremiumFeatureModal from './PremiumFeatureModal'

interface BulkModeToggleProps {
  isBulkMode: boolean
  setIsBulkMode: (val: boolean) => void
  featureName?: string
}

export default function BulkModeToggle({ isBulkMode, setIsBulkMode, featureName = "Bulk Operations" }: BulkModeToggleProps) {
  const { isEnterprise } = useEnterpriseTier()
  const [showModal, setShowModal] = useState(false)

  const handleToggle = () => {
    if (!isEnterprise) {
      setShowModal(true)
      return
    }
    setIsBulkMode(!isBulkMode)
  }

  return (
    <>
      <button
        onClick={handleToggle}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-bold transition-all ${
          isBulkMode 
            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25' 
            : 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-500/20'
        }`}
      >
        {isEnterprise ? (
          <Zap className={`w-4 h-4 ${isBulkMode ? 'text-yellow-300' : ''}`} />
        ) : (
          <Lock className="w-4 h-4 opacity-70" />
        )}
        Bulk Mode
      </button>

      <PremiumFeatureModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        featureName={featureName}
      />
    </>
  )
}
