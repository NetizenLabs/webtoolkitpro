import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Advanced Web Color Picker | HEX, RGB, HSL | WebToolkit Pro',
  description: 'Select and fine-tune colors for your web projects. Generate HEX, RGB, and HSL codes with real-time preview and palette generation.',
  alternates: {
    canonical: 'https://wtkpro.site/tools/color-picker/',
    languages: {
      'en-US': 'https://wtkpro.site/tools/color-picker/',
      'x-default': 'https://wtkpro.site/tools/color-picker/',
    },
  },
}

export default function ColorPickerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
