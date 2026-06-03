'use client';

import React from 'react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Lock, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

interface ProGateProps {
  children: React.ReactNode;
  toolName?: string;
}

export default function ProGate({ children, toolName = 'This feature' }: ProGateProps) {
  const { isPro } = useSubscription();

  // If the user has a Team Pro pass, render the premium tool.
  if (isPro) {
    return <>{children}</>;
  }

  // Otherwise, render the paywall overlay
  return (
    <div className="relative overflow-hidden rounded-3xl border border-gray-100 dark:border-[#1E2D47] bg-white dark:bg-[#0D1526] shadow-sm group">
      
      {/* Blurred / Obscured Preview of the Tool (Mocked) */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] pointer-events-none select-none filter blur-[2px]">
        <div className="p-8 space-y-4">
          <div className="w-1/3 h-8 bg-black rounded"></div>
          <div className="w-full h-12 bg-black rounded"></div>
          <div className="grid grid-cols-3 gap-4 pt-8">
            <div className="w-full h-32 bg-black rounded-xl"></div>
            <div className="w-full h-32 bg-black rounded-xl"></div>
            <div className="w-full h-32 bg-black rounded-xl"></div>
          </div>
        </div>
      </div>

      {/* Paywall Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[500px] p-8 text-center bg-gradient-to-b from-transparent via-white/80 to-white dark:via-[#0D1526]/80 dark:to-[#0D1526]">
        
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-blue-500/20 transform group-hover:scale-110 transition-transform duration-300">
          <Lock className="w-8 h-8" />
        </div>

        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
          {toolName} is Locked
        </h2>
        
        <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8 leading-relaxed">
          This is an advanced beta utility reserved for <strong className="text-gray-900 dark:text-white">Team Pro</strong> subscribers. Upgrade your workspace to unlock all premium API limits, automated compliance logging, and priority beta access.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <a
            href="https://whop.com/webtoolkit-pro/team-pro/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20"
          >
            <Zap className="w-4 h-4" />
            Upgrade to Pro
          </a>
          <Link
            href="/pricing"
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 dark:bg-[#1E2D47] hover:bg-gray-200 dark:hover:bg-[#2A3F61] text-gray-900 dark:text-white rounded-xl font-bold transition-all"
          >
            View Pricing
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4" />
          Secured by Whop
        </div>
      </div>
    </div>
  );
}
