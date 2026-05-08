import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SEO Meta Tag Generator | Open Graph & Twitter Cards | WebToolkit Pro',
  description: 'Create Google-ready meta tags, Open Graph tags, and Twitter Cards to improve your search visibility and social media appearance. Optimize for higher CTR.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/meta-tag-generator/',
    languages: {
      'en-US': 'https://wtkpro.site/tools/meta-tag-generator/',
      'x-default': 'https://wtkpro.site/tools/meta-tag-generator/',
    },
  },
}

export default function MetaTagGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
