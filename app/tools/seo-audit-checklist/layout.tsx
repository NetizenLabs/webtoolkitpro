import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Technical SEO Audit Checklist 2026 | WebToolkit Pro',
  description: 'Comprehensive 2026 technical SEO audit checklist for webmasters and developers. Verify crawlability, indexability, and Core Web Vitals.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/seo-audit-checklist/',
    languages: {
      'en-US': 'https://wtkpro.site/tools/seo-audit-checklist/',
      'x-default': 'https://wtkpro.site/tools/seo-audit-checklist/',
    },
  },
}

export default function SeoAuditLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
