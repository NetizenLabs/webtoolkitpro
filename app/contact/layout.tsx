import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Our Engineering Team | WebToolkit Pro Support',
  description: 'Reach out to the WebToolkit Pro technical team for support, feature requests, or collaboration inquiries. We usually respond within 24 hours.',
  alternates: {
    canonical: 'https://wtkpro.site/contact/',
  },
  openGraph: {
    title: 'Contact Our Engineering Team | WebToolkit Pro Support',
    description: 'Reach out to the WebToolkit Pro technical team for support, feature requests, or collaboration inquiries. We usually respond within 24 hours.',
    url: 'https://wtkpro.site/contact/',
    siteName: 'WebToolkit Pro',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Our Engineering Team | WebToolkit Pro Support',
    description: 'Reach out to the WebToolkit Pro technical team for support, feature requests, or collaboration inquiries. We usually respond within 24 hours.',
  }
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
