import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/tailwind.css';
import { Toaster } from 'sonner';

const geist = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Mitch Robinhood App — Discover the Next 100x on Robinhood Chain',
  description: 'Mitch Robinhood App is the premier token discovery platform for Robinhood Chain — find trending tokens, get pre-launch alerts, and never miss a 100x again.',
  icons: {
    icon: [{ url: '/assets/images/images_-_2026-08-28T174432.362-1787935498414.jpeg', type: 'image/jpeg' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body className={geist.className}>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'var(--card)',
              border: '1px solid var(--border)',
              color: 'var(--foreground)',
            },
          }}
        />

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Ffomochain6243back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.20" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></body>
    </html>
  );
}