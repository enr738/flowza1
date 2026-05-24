import type { Metadata } from 'next';
import { Inter, Cairo } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { LanguageProvider } from '@/context/LanguageContext';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: {
    default: 'Flowza — Freelance Marketplace for Teams & Individuals',
    template: '%s | Flowza',
  },
  description:
    'Flowza is a freelance marketplace connecting skilled freelancers with individuals and companies. Hire top talent or offer your services today.',
  keywords: ['freelance', 'marketplace', 'hire freelancers', 'flowza', 'remote work', 'company hiring'],
  authors: [{ name: 'Flowza' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://flowza-delta.vercel.app',
    siteName: 'Flowza',
    title: 'Flowza — Freelance Marketplace for Teams & Individuals',
    description: 'Hire world-class freelancers or offer your skills on Flowza.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Flowza Freelance Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flowza — Freelance Marketplace',
    description: 'Hire world-class freelancers or offer your skills on Flowza.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`dark ${inter.variable} ${cairo.variable} font-inter`} suppressHydrationWarning>
        <body>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              {children}
            </div>
          </LanguageProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
