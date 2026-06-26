import React from 'react'
import { Shield, Lock, ServerOff } from 'lucide-react'

export default function ToolSecurityBadge() {
  return (
    <div className="my-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 p-6 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-emerald-500/20 rounded-lg">
          <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Enterprise-Grade Security Guarantee</h3>
      </div>
      <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
        WebToolkit Pro is engineered for <strong>zero-trust environments</strong>. This utility processes your sensitive data entirely within your browser using Web Workers.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 font-medium">
          <ServerOff className="w-4 h-4 text-amber-500" />
          Zero server transmission
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-slate-400 font-medium">
          <Lock className="w-4 h-4 text-blue-500" />
          End-to-end client-side execution
        </div>
      </div>
    </div>
  )
}
