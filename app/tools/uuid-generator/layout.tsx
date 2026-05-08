import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Secure UUID Generator | Version 4 GUID Tool | WebToolkit Pro',
  description: 'Generate secure, random UUID v4 (GUID) identifiers instantly. High-entropy generation using Web Crypto API for distributed systems.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/uuid-generator/',
    languages: {
      'en-US': 'https://wtkpro.site/tools/uuid-generator/',
      'x-default': 'https://wtkpro.site/uuid-generator/',
    },
  },
}

export default function UuidGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
