import React from 'react'
import type { Metadata } from 'next'
import ToolsClient from './ToolsClient'

export const metadata: Metadata = {
  title: 'Professional Developer Tools & Secure Utilities | WebToolkit Pro',
  description: 'Access 65+ free, high-performance developer tools for modern web professionals. Secure, fast, and optimized for enterprise engineering.',
  keywords: 'professional developer tools, secure web utilities, enterprise coding tools, JSON formatter pro, secure password generator US',
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
  return <ToolsClient />
}