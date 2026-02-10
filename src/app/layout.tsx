import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.skcreation.org'),
  title: {
    default: 'Dr. SK — Author & Technologist',
    template: '%s | Dr. SK',
  },
  description:
    'Official website of Dr. SK—author and technologist. Books, articles, and profiles on emotional balance, productivity, modern life, and technology.',
  authors: [{ name: 'Dr. SK' }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    url: 'https://www.skcreation.org',
    title: 'Dr. SK — Author & Technologist',
    description:
      'Books, articles, and official links by Dr. SK—writing on emotional resilience, productivity, modern life, and technology.',
    images: [
      {
        url: '/drsk.png',
        width: 1200,
        height: 630,
        alt: 'Dr. SK — Author & Technologist',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. SK — Author & Technologist',
    description:
      'Books, articles, and official links by Dr. SK—writing on emotional resilience, productivity, modern life, and technology.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
