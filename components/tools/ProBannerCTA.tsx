import React from 'react'
import Link from '@/components/ui/NativeLink'
import { Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react'

export default function ProBannerCTA() {
  return (
    <div className="relative overflow-hidden p-8 bg-[#0B1120] rounded-[24px] border border-[#1E2D47] shadow-2xl group">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#00D4B4]/20 to-[#0094FF]/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700 ease-out" />
      
      <div className="relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-[#00D4B4]/10 to-[#0094FF]/10 rounded-full border border-[#00D4B4]/20 text-[#00D4B4] text-[10px] font-black uppercase tracking-[0.2em] mb-6">
          <Sparkles className="w-3 h-3" /> WTK Pro
        </div>

        <h3 className="text-2xl font-black text-white tracking-tight mb-3 leading-tight">
          Upgrade your workflow.
        </h3>
        
        <p className="text-sm text-[#8A9BBE] leading-relaxed mb-6 font-medium">
          Get the standalone desktop app. 100% offline access, zero telemetry, and advanced local API testing.
        </p>

        <ul className="space-y-3 mb-8">
          <li className="flex items-center gap-2 text-xs font-bold text-[#E2E8F0]">
            <ShieldCheck className="w-4 h-4 text-[#00D4B4]" />
            Works Completely Offline
          </li>
          <li className="flex items-center gap-2 text-xs font-bold text-[#E2E8F0]">
            <Zap className="w-4 h-4 text-[#00D4B4]" />
            Unlimited Local Storage
          </li>
        </ul>

        <Link 
          href="/pricing/" 
          className="flex items-center justify-center gap-2 w-full py-4 bg-white text-[#0B1120] hover:bg-[#00D4B4] rounded-[16px] font-black text-sm uppercase tracking-widest transition-colors duration-300"
        >
          View Pro Plans <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
        </Link>
      </div>
    </div>
  )
}
