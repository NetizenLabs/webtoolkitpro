import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UUID v7 Generator | Time-Ordered Identifiers | WebToolkit Pro',
  description: 'Generate RFC 9562 compliant UUID version 7. Lexicographically sortable IDs for optimized database indexing and performance.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/uuid-v7-generator/',
    languages: {
      'en-US': 'https://wtkpro.site/tools/uuid-v7-generator/',
      'x-default': 'https://wtkpro.site/tools/uuid-v7-generator/',
    },
  },
}

export default function UuidV7GeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
