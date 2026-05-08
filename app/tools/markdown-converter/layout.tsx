import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Markdown to HTML Converter Pro | WebToolkit Pro',
  description: 'Transform Markdown text into clean, semantic HTML. Ideal for developers and content creators needing instant code generation.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/markdown-converter/',
    languages: {
      'en-US': 'https://wtkpro.site/tools/markdown-converter/',
      'x-default': 'https://wtkpro.site/tools/markdown-converter/',
    },
  },
}

export default function MarkdownConverterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
