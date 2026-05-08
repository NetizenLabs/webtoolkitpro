import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '2026 Developer Report: The 10 Most Common JSON Syntax Errors',
  description: 'A comprehensive data study on why JSON fails and how modern developers can avoid common syntax pitfalls. Analysis of 1.2M payloads.',
  alternates: {
    canonical: 'https://wtkpro.site/blog/json-syntax-errors-study/',
    languages: {
      'en-US': 'https://wtkpro.site/blog/json-syntax-errors-study/',
      'x-default': 'https://wtkpro.site/blog/json-syntax-errors-study/',
    },
  },
}

export default function JsonStudyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
