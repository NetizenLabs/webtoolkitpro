import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'JSON-LD Schema Generator | Structured Data Tool | WebToolkit Pro',
  description: 'Generate professional JSON-LD schema markup for Articles, FAQs, Tools, and more. Boost your search engine visibility with structured data.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/schema-generator/',
    languages: {
      'en-US': 'https://wtkpro.site/tools/schema-generator/',
      'x-default': 'https://wtkpro.site/tools/schema-generator/',
    },
  },
}

export default function SchemaGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
