import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Live Markdown Previewer | Real-time Rendering | WebToolkit Pro',
  description: 'Write and preview Markdown in real-time. GitHub-flavored Markdown support with clean, professional HTML rendering.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/markdown-previewer/',
    languages: {
      'en-US': 'https://wtkpro.site/tools/markdown-previewer/',
      'x-default': 'https://wtkpro.site/tools/markdown-previewer/',
    },
  },
}

export default function MarkdownPreviewerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
