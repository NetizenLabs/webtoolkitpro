import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Secure Base64 Encoder & Decoder | WebToolkit Pro',
  description: 'Instant Base64 encoding and decoding for data strings and files. Secure, client-side processing for developers and privacy-conscious users.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/base64-encoder/',
    languages: {
      'en-US': 'https://wtkpro.site/tools/base64-encoder/',
      'x-default': 'https://wtkpro.site/tools/base64-encoder/',
    },
  },
}

export default function Base64EncoderLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
