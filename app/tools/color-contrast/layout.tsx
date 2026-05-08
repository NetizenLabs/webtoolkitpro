import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WCAG Color Contrast Checker | WebToolkit Pro',
  description: 'Verify accessibility compliance for your web designs. Check contrast ratios between foreground and background colors based on WCAG standards.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/color-contrast/',
    languages: {
      'en-US': 'https://wtkpro.site/tools/color-contrast/',
      'x-default': 'https://wtkpro.site/tools/color-contrast/',
    },
  },
}

export default function ColorContrastLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
