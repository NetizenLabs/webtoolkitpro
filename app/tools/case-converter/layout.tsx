import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Text Case Converter Pro | WebToolkit Pro',
  description: 'Instantly transform text into Uppercase, Lowercase, Title Case, Sentence Case, or camelCase. Clean and fast text manipulation tool.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/case-converter/',
  },
}

export default function CaseConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

