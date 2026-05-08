import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Professional Robots.txt Templates | WebToolkit Pro',
  description: 'Clean, optimized robots.txt templates for WordPress, Next.js, and static sites. Control how search engine bots crawl your website.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/robots-txt-templates/',
    languages: {
      'en-US': 'https://wtkpro.site/tools/robots-txt-templates/',
      'x-default': 'https://wtkpro.site/tools/robots-txt-templates/',
    },
  },
}

export default function RobotsTemplatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
