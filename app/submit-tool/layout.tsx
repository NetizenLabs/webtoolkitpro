import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Submit Your Utility Idea | WebToolkit Pro Lab',
  description: 'Suggest a new technical tool or developer utility to our research lab. Help build the future of the WebToolkit Pro ecosystem.',
  alternates: {
    canonical: 'https://wtkpro.site/submit-tool/',
  },
  openGraph: {
    title: 'Submit Your Utility Idea | WebToolkit Pro Lab',
    description: 'Suggest a new technical tool or developer utility to our research lab. Help build the future of the WebToolkit Pro ecosystem.',
    url: 'https://wtkpro.site/submit-tool/',
    siteName: 'WebToolkit Pro',
    type: 'website',
    images: [
      {
        url: 'https://wtkpro.site/submit-tool-og.png',
        width: 1200,
        height: 630,
        alt: 'Submit Your Utility Idea to WebToolkit Pro',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Submit Your Utility Idea | WebToolkit Pro Lab',
    description: 'Suggest a new technical tool or developer utility to our research lab. Help build the future of the WebToolkit Pro ecosystem.',
    images: ['https://wtkpro.site/submit-tool-og.png'],
  },
  other: {
    'article:published_time': '2026-05-06T00:00:00Z',
    'article:modified_time': new Date().toISOString(),
    'article:author': 'Abu Sufyan',
    'author': 'Abu Sufyan',
  }
}

export default function SubmitToolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
