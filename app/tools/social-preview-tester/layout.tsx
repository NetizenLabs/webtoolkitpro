import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Social Preview Stress Tester | OG & Twitter Card Preview | WebToolkit Pro',
  description: 'Test and optimize your Open Graph tags and Twitter cards. Real-time simulation of how your content appears on social media platforms.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/social-preview-tester/',
  },
}

export default function SocialPreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

