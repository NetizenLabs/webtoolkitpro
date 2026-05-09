'use client'

import React from 'react'

interface AdSlotProps {
  className?: string
  id?: string
  minHeight?: string
}

const AdSlot: React.FC<AdSlotProps> = ({ className = '', id, minHeight = '90px' }) => {
  return (
    <div 
      className={`w-full overflow-hidden flex items-center justify-center transition-opacity duration-700 opacity-0 has-[.adsbygoogle]:opacity-100 has-[ins]:opacity-100 ${className}`}
      style={{ minHeight }}
      aria-hidden="true"
    >
      <div 
        id={id}
        className="ads-container w-full"
      >
        {/* AdSense will inject content here */}
      </div>
    </div>
  )
}

export default AdSlot
