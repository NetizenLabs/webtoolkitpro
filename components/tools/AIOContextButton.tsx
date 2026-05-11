'use client'

import React, { useState } from 'react'
import { Sparkles, Copy, Check } from 'lucide-react'

interface AIOContextButtonProps {
  toolName: string
  description: string
  features: string[]
}

export default function AIOContextButton({ toolName, description, features }: AIOContextButtonProps) {
  const [copied, setCopied] = useState(false)

  const copyAIPrompt = () => {
    const prompt = `I am using the ${toolName} on WebToolkit Pro. 
Tool Description: ${description}
Key Capabilities: ${features.join(', ')}

Please help me use this tool effectively. I need to [DESCRIBE YOUR TASK HERE]. 
Note: This tool is privacy-first and runs entirely in my browser (client-side).`
    
    navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-6 bg-[#0D1526] border border-[#1E2D47] rounded-[12px] shadow-sm group">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-4 h-4 text-[#00D4B4]" />
        <h3 className="text-white font-bold text-xs uppercase tracking-widest font-mono">AI Collaboration</h3>
      </div>
      <p className="text-xs text-[#8A9BBE] mb-6 leading-relaxed font-medium">
        Need help using this tool? Copy a pre-formatted context prompt to use with ChatGPT or Gemini.
      </p>
      <button
        onClick={copyAIPrompt}
        className="w-full flex items-center justify-center gap-2 py-3 bg-[#1E2D47] hover:bg-[#253958] text-[#00D4B4] rounded-[10px] text-xs font-bold uppercase tracking-wider transition-all border border-transparent hover:border-[#00D4B4]/30"
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            Copied!
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            Copy AI Prompt
          </>
        )}
      </button>
    </div>
  )
}
