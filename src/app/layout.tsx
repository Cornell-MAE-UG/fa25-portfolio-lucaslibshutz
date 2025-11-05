import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Header";
import AnimatedSurface from "./AnimatedSurface";
import { Analytics } from '@vercel/analytics/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "\u200B",
  description: "Portfolio of Lucas Libshutz - Mechanical Engineering Student at Cornell University",
  icons: {
    icon: [
      { url: '/site-icon.ico?v=3', sizes: '32x32', type: 'image/x-icon' },
      { url: '/site-icon-16x16.png?v=3', sizes: '16x16', type: 'image/png' },
      { url: '/site-icon.svg?v=3', type: 'image/svg+xml' },
    ],
    shortcut: [
      { url: '/site-icon.ico?v=3', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/site-icon.svg?v=3', type: 'image/svg+xml' },
      { url: '/site-icon-16x16.png?v=3', sizes: '16x16', type: 'image/png' },
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        url: '/site-icon.ico?v=3',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/site-icon-16x16.png?v=3',
      },
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
      <head>
        <link rel="icon" href="/site-icon.ico?v=3" />
        <link rel="icon" type="image/x-icon" href="/site-icon.ico?v=3" />
        <link rel="icon" type="image/png" sizes="16x16" href="/site-icon-16x16.png?v=3" />
        <link rel="icon" type="image/svg+xml" href="/site-icon.svg?v=3" />
        <link rel="shortcut icon" href="/site-icon.ico?v=3" />
        <link rel="apple-touch-icon" href="/site-icon.svg?v=3" />
        {/* KaTeX for HTML content */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" />
        <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
        <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js"></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Animated Surface Background - behind everything */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -2, pointerEvents: 'none' }}>
          <AnimatedSurface />
        </div>
        {/* Global Frosted Blur Overlay */}
        <div style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          zIndex: -1, pointerEvents: 'none',
          background: 'rgba(24,26,32,0.5)',
          backdropFilter: 'blur(var(--page-blur, 18px))',
          WebkitBackdropFilter: 'blur(var(--page-blur, 18px))'
        }} />
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
