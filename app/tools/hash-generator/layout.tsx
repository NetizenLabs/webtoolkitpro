import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Secure Hash Generator | MD5, SHA-256, SHA-512 | WebToolkit Pro',
  description: 'Generate secure cryptographic hashes for data integrity verification. Supports MD5, SHA-1, SHA-256, and SHA-512. 100% client-side security.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/hash-generator/',
    languages: {
      'en-US': 'https://wtkpro.site/tools/hash-generator/',
      'x-default': 'https://wtkpro.site/tools/hash-generator/',
    },
  },
}

export default function HashGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
