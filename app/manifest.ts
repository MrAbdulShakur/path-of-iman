
import type { MetadataRoute } from 'next'


export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Path of Iman",
    short_name: "Path of Iman",
    description: "Navigate life's challenges with the wisdom of the Qur'an. Strengthen your faith, one verse at a time.",
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFBEB',
    theme_color: '#009965',
    icons: [
    {
      "src": "icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  screenshots: [
    {
      "src": "/seo/desktop-screenshot.webp",
      "sizes": "1596x1351",
      "type": "image/webp",
      "form_factor": "wide"
    },
    {
      "src": "/seo/mobile-screenshot.webp",
      "sizes": "734x1349",
      "type": "image/webp"
    }
  ],
  }
}