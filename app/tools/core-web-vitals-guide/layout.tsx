import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Core Web Vitals Expert Guide | LCP, FID, CLS | WebToolkit Pro',
  description: 'Master the metrics Google uses to rank websites. Comprehensive guide on optimizing Largest Contentful Paint, First Input Delay, and Cumulative Layout Shift.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/core-web-vitals-guide/',
    languages: {
      'en-US': 'https://wtkpro.site/tools/core-web-vitals-guide/',
      'x-default': 'https://wtkpro.site/tools/core-web-vitals-guide/',
    },
  },
}

export default function CoreWebVitalsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
