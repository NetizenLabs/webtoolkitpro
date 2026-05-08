import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Unix Timestamp Converter | Epoch Time Tool | WebToolkit Pro',
  description: 'Convert Unix timestamps to human-readable dates and vice versa. Support for seconds and milliseconds Epoch time.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/timestamp-converter/',
  },
}

export default function TimestampConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

