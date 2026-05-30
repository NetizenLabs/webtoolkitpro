import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'WebToolkit Pro',
    short_name: 'WTK Pro',
    description: '190+ Free Premium Online Developer Tools',
    start_url: '/',
    display: 'standalone',
    background_color: '#0B1120',
    theme_color: '#00D4B4',
    icons: [
      {
        src: '/icon.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: '/icon.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
    ],
  }
}
