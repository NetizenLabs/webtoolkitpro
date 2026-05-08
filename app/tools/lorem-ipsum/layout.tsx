import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Lorem Ipsum Generator | Professional Placeholder Text | WebToolkit Pro',
  description: 'Generate clean, randomized placeholder text for your designs and layouts. Customizable paragraph counts for professional mockups.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/lorem-ipsum/',
    languages: {
      'en-US': 'https://wtkpro.site/tools/lorem-ipsum/',
      'x-default': 'https://wtkpro.site/tools/lorem-ipsum/',
    },
  },
}

export default function LoremIpsumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
