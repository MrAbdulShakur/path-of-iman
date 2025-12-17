import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: '#009965',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: "Path of Iman",
  description: "Navigate life's challenges with the wisdom of the Qur'an. Strengthen your faith, one verse at a time.",
  authors: [{ name: "Abdul Shakur Abbas Sakhr" }],
  creator: 'Abdul Shakur Abbas Sakhr',
  publisher: 'Abdul Shakur Abbas Sakhr',
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_APP_URL}`),
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_APP_URL}`,
  },
  icons: {
    icon: "logos/favicon.ico",
    shortcut: "logos/favicon-32x32.png",
    apple: "logos/apple-touch-icon.png",
  },
  other: {
    "apple-mobile-web-app-title": "Path of Iman",
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true, // allow indexing
    follow: true, // allow link following
    nocache: false, // allow caching
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": 'large',
      "max-video-preview": -1,
    },
  },
  appleWebApp: {
    title: "Path of Iman",
    statusBarStyle: "black-translucent",
    startupImage: [
      'logos/apple-touch-icon.png',
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
