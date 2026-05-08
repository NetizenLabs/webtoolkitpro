import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HTML Entity Encoder & Decoder | WebToolkit Pro',
  description: 'Convert special characters into secure HTML entities. Protect your code and ensure proper browser rendering for documentation and snippets.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/html-encoder/',
    languages: {
      'en-US': 'https://wtkpro.site/tools/html-encoder/',
      'x-default': 'https://wtkpro.site/tools/html-encoder/',
    },
  },
}

export default function HtmlEncoderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
