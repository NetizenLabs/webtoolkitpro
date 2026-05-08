import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Latency Cost Calculator | WebToolkit Pro',
  description: 'Analyze the financial impact of network latency on your business revenue. Calculate conversion drops and ROI of performance optimization.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/api-latency-calculator/',
  },
}

export default function ApiLatencyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

