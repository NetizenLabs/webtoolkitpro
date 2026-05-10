import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Submit Your Utility Idea | WebToolkit Pro Lab',
  description: 'Suggest a new technical tool or developer utility to our research lab. Help build the future of the WebToolkit Pro ecosystem.',
  alternates: {
    canonical: 'https://wtkpro.site/submit-tool/',
  },
}

export default function SubmitToolLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
