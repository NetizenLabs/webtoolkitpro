import React from 'react'
import type { Metadata } from 'next'


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
