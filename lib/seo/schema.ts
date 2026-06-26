import { ToolConfig } from '@/types/tool'

export const SITE_URL = 'https://wtkpro.site'
export const AUTHOR_URL = 'https://abusufyan.xyz'

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    'name': 'WebToolkit Pro',
    'url': SITE_URL,
    'logo': {
      '@type': 'ImageObject',
      'url': `${SITE_URL}/logo-optimized.webp`,
      'width': '512',
      'height': '512'
    },
    'sameAs': [
      'https://github.com/WebToolkit-Pro',
      'https://twitter.com/WebToolKitPro',
      'https://producthunt.com/products/webtoolkit-pro',
      'https://severancecalculator.xyz',
      'https://tradeconvert.pro',
      'https://abusufyan.xyz'
    ],
    'description': 'The global standard for secure, client-side developer utilities and technical engineering journals.',
    'contactPoint': {
      '@type': 'ContactPoint',
      'email': 'hello@wtkpro.site',
      'contactType': 'customer support'
    }
  }
}

export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    'url': SITE_URL,
    'name': 'WebToolkit Pro',
    'publisher': {
      '@id': `${SITE_URL}/#organization`
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': `${SITE_URL}/tools?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  }
}

export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${AUTHOR_URL}/#person`,
    'name': 'Abu Sufyan',
    'url': AUTHOR_URL,
    'jobTitle': 'Lead Systems Architect & Performance Engineer',
    'worksFor': {
      '@id': `${SITE_URL}/#organization`
    },
    'sameAs': [
      'https://pk.linkedin.com/in/abu-sufyan-b34571410',
      'https://github.com/abusufyan-netizen',
      'https://dev.to/abusufyan909'
    ],
    'knowsAbout': [
      'Edge Computing',
      'Technical SEO',
      'Software Architecture',
      'React',
      'Next.js',
      'Client-Side Security'
    ],
    'image': {
      '@type': 'ImageObject',
      'url': `${SITE_URL}/author-placeholder.png`
    }
  }
}

export function generateSoftwareSchema(tool: ToolConfig) {
  const url = `${SITE_URL}/tools/${tool.slug}/`
  
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${url}#software`,
    'name': tool.content?.title || tool.name,
    'description': tool.content?.description || `Free online ${tool.name} utility.`,
    'applicationCategory': tool.category,
    'operatingSystem': 'Web Browser',
    'url': url,
    'image': `${SITE_URL}/og-image.jpg`,
    'featureList': tool.content?.features?.join(', ') || 'Secure, fast, private',
    'isAccessibleForFree': true,
    'version': tool.releaseDate || '2026.01.01',
    'author': {
      '@id': `${AUTHOR_URL}/#person`
    },
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock'
    },
    'publisher': {
      '@id': `${SITE_URL}/#organization`
    }
  }
}

export function generateFAQSchema(questions: { question: string, answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': questions.map(q => ({
      '@type': 'Question',
      'name': q.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': q.answer
      }
    }))
  }
}
