import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Robots.txt Generator | Crawl Budget Optimization | WebToolkit Pro',
  description: 'Control search engine crawler access and optimize your website\'s crawl budget with a perfectly formatted robots.txt file. Secure your site index.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/robots-generator/',
  },
}

export default function RobotsGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

