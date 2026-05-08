import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AdSense Revenue Estimator | WebToolkit Pro',
  description: 'Calculate potential earnings from Google AdSense based on traffic, CTR, and CPC. Analyze revenue impact across different niches.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/adsense-calculator/',
  },
}

export default function AdSenseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

