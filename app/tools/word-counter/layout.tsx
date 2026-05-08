import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Word & Character Counter | Real-time Text Analysis | WebToolkit Pro',
  description: 'Count words, characters, and sentences in real-time. Calculate reading time and check character limits for social media and metadata.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/word-counter/',
  },
}

export default function WordCounterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

