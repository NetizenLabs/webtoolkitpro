import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'CDN & Edge Readiness Tester | WebToolkit Pro',
  description: 'Inspect HTTP headers and CDN delivery performance. Verify Cache-Control, ETag, and Edge Runtime headers for optimal content delivery.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/cdn-readiness-tester/',
    languages: {
      'en-US': 'https://wtkpro.site/tools/cdn-readiness-tester/',
      'x-default': 'https://wtkpro.site/tools/cdn-readiness-tester/',
    },
  },
}

export default function CdnReadinessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
