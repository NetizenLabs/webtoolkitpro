import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Universal URL Encoder & Decoder | WebToolkit Pro',
  description: 'Safely encode and decode strings for URI compatibility and security. Ensure all special characters are converted to their percent-encoded equivalents.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/url-encoder/',
  },
}

export default function UrlEncoderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

