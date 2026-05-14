'use client'

import React from 'react'

interface ToolSchemaProps {
  name: string
  description: string
  slug: string
  steps?: string[]
  features?: string[]
}

export default function ToolSchema({ name, description, slug, steps = [], features = [] }: ToolSchemaProps) {
  const url = `https://wtkpro.site/tools/${slug}/`

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': name,
    'description': description,
    'applicationCategory': 'DeveloperApplication',
    'operatingSystem': 'Any',
    'url': url,
    'image': `https://wtkpro.site/blog/cat-tutorial.png`, // Fallback to tutorial category image
    'featureList': features.length > 0 ? features.join(', ') : 'Free, Secure, Professional Developer Utility',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'WebToolkit Pro',
      'url': 'https://wtkpro.site'
    }
  }

  const howToSchema = steps.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': `How to use ${name}`,
    'description': `Follow these simple steps to use the ${name} efficiently.`,
    'step': steps.map((step, index) => ({
      '@type': 'HowToStep',
      'position': index + 1,
      'text': step
    }))
  } : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
    </>
  )
}
