import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sitemap XML Validator | Technical SEO Health Check | WebToolkit Pro',
  description: 'Validate your XML sitemap for structure, accessibility, and SEO best practices. Ensure Googlebot can crawl your most valuable pages efficiently.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/sitemap-validator/',
  },
}

export default function SitemapValidatorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

