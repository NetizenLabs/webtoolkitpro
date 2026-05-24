import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import ToolsClient from './ToolsClient'
import { getTools } from '@/lib/tools'



export const metadata: Metadata = {
  title: 'Developer Tools Directory | WebToolkit Pro',
  description: 'Browse our complete directory of 150+ professional developer tools. Secure, client-side utilities for JSON, SEO, Security, and Performance.',
  keywords: 'developer tools directory, web utilities list, professional coding tools, secure online tools',
  alternates: {
    canonical: 'https://wtkpro.site/tools/',
  },
  openGraph: {
    title: 'Developer Tools Directory | WebToolkit Pro',
    description: 'Browse our complete directory of 150+ professional developer tools. Secure, client-side utilities for JSON, SEO, Security, and Performance.',
    url: 'https://wtkpro.site/tools/',
    siteName: 'WebToolkit Pro',
    images: [
      {
        url: 'https://wtkpro.site/og-image.png?v=4',
        width: 1200,
        height: 630,
        alt: 'WebToolkit Pro - 150+ Professional Developer Tools',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Developer Tools Directory | WebToolkit Pro',
    description: 'Browse our complete directory of 150+ professional developer tools. Secure, client-side utilities for JSON, SEO, Security, and Performance.',
    images: ['https://wtkpro.site/og-image.png?v=4'],
    site: '@WebToolkitPro',
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
