import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import ToolsClient from './ToolsClient'
import { getTools } from '@/lib/tools'

// ISR: cache this page at the edge for 1 hour
// Repeat visitors get ~50ms TTFB instead of a fresh server render
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Developer Tools Directory | WebToolkit Pro',
  description: 'Browse our complete directory of 150+ professional developer tools. Secure, client-side utilities for JSON, SEO, Security, and Performance.',
  keywords: 'developer tools directory, web utilities list, professional coding tools, secure online tools',
  alternates: {
    canonical: 'https://wtkpro.site/tools/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    }
  }
}

export default function ToolsPage() {
  const tools = getTools()
  return (
    <Suspense fallback={
      <div className="dynamic-padding max-w-[1400px] mx-auto min-h-screen animate-pulse">
        <div className="h-12 bg-muted/30 rounded-xl w-64 mx-auto mt-12 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-48 bg-muted/20 rounded-2xl border border-border" />
          ))}
        </div>
      </div>
    }>
      <ToolsClient initialTools={tools} />
    </Suspense>
  )
}
