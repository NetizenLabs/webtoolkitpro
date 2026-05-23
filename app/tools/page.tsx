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
    <Suspense>
      <ToolsClient initialTools={tools} />
    </Suspense>
  )
}
