'use client'

import React from 'react'

interface BreadcrumbSchemaProps {
  name: string
  slug: string
}

export default function BreadcrumbSchema({ name, slug }: BreadcrumbSchemaProps) {
  const cleanSlug = slug.replace(/^tools\//, '').replace(/\/$/, '')
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://wtkpro.site'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Tools',
        'item': 'https://wtkpro.site/tools'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': name,
        'item': `https://wtkpro.site/tools/${cleanSlug}/`
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
