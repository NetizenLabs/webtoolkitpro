import React from 'react'
import type { Metadata } from 'next'
import ToolsClient from './ToolsClient'
import { getTools } from '@/lib/tools'

export const metadata: Metadata = {
  title: 'Developer Tools Directory | Secure Web Utilities | WebToolkit Pro',
  description: 'Browse our complete directory of 33+ professional developer tools. Secure, client-side utilities for JSON, SEO, Security, and Performance.',
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
  return <ToolsClient initialTools={tools} />
}
