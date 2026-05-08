import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Professional JSON Formatter & Validator | WebToolkit Pro',
  description: 'Clean, format, and validate JSON data instantly. Enterprise-grade JSON beautifier with AST-aware syntax highlighting and error detection. Secure and fast.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/json-formatter/',
    languages: {
      'en-US': 'https://wtkpro.site/tools/json-formatter/',
      'x-default': 'https://wtkpro.site/tools/json-formatter/',
    },
  },
}

export default function JsonFormatterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
