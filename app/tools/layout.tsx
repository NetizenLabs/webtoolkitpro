import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Professional Developer Tools & Secure Utilities | WebToolkit Pro',
  description: 'Access a suite of professional, secure, and high-performance developer tools. From JSON formatting to secure password generation.',
  keywords: 'professional developer tools, secure web utilities, enterprise coding tools, JSON formatter pro, secure password generator US',
}

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Breadcrumb Schema for Tools Section */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [{
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': 'https://wtkpro.site'
            }, {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Tools',
              'item': 'https://wtkpro.site/tools/'
            }]
          }),
        }}
      />
      {children}
    </>
  )
}
