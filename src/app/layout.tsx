import type { Metadata } from 'next';
import { Gugi, Inter, Playfair_Display, Rubik_80s_Fade } from 'next/font/google';
import Link from 'next/link';
import Script from 'next/script';
import './globals.css';
import BotpressWebchat from '@/component/BotpressWebchat';
import HandbookSubscribeCTA from '@/component/HandbookSubscribeCTA';
import { SUBSCRIBE_DESCRIPTION, SUBSCRIBE_HEADING } from '@/lib/subscribe-copy';
import Navbar from '@/component/Navbar';
import PromoBannerSlot from '@/component/PromoBannerSlot';
import Providers from '@/component/Providers';
import { SITE_URL } from '@/lib/site-url';
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

const gugi = Gugi({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-gugi',
});

const rubik80sFade = Rubik_80s_Fade({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rubik-80s-fade',
});

const seoTitle = 'Dr. SK | AI Engineer';
const seoDescription =
  'Official website of Dr. SK - AI engineer & author';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [{ url: '/logo.png', type: 'image/png' }],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  title: {
    default: seoTitle,
    template: '%s | Dr. SK',
  },
  description: seoDescription,
  keywords: [
    'Dr. SK',
    'Dr SK',
    'Dr. SK Author',
    'Dr SK Author',
    'Dr. SK official website',
    'Sagar Khatri',
    'SK Creation',
    'AI Engineer',
  ],
  authors: [{ name: 'Dr. SK' }],
  creator: 'Dr. SK',
  publisher: 'SK Creation',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    title: seoTitle,
    description: seoDescription,
    siteName: 'Dr. SK Official',
    locale: 'en_US',
    images: [
      {
        url: '/drsk.png',
        width: 1200,
        height: 1200,
        alt: 'Dr. SK official profile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoTitle,
    description: seoDescription,
    images: ['/drsk.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Dr. SK',
    alternateName: ['Dr SK', 'Dr. SK Author', 'Sagar Khatri'],
    url: SITE_URL,
    image: `${SITE_URL}/drsk.png`,
    jobTitle: 'AI Engineer',
    sameAs: [
      'https://www.amazon.com/author/drsk1',
      'https://www.amazon.com/author/sagar2025',
      'https://medium.com/@drskauthor',
      'https://www.linkedin.com/in/drskofficial',
      'https://www.youtube.com/@drskauthor',
      'https://www.tiktok.com/@drskauthor',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Dr. SK Official Website',
    alternateName: ['Dr SK author', 'Dr. SK Author Website'],
    url: SITE_URL,
  };

  return (
    <html
      lang="en"
      className={`${inter.className} ${playfair.variable} ${gugi.variable} ${rubik80sFade.variable} scroll-smooth`}
    >
      <body className={`${inter.className} bg-[#F8F7FF] text-zinc-900 antialiased`}>
        <Providers />
        <Navbar />

        <div className="pt-14">
          <PromoBannerSlot />
          {children}
        </div>
        {/* Footer */}
        <footer className="relative overflow-hidden bg-[#FFFDF5] px-4 pb-10 pt-10 text-center text-sm text-zinc-700">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-10" aria-hidden>
            <svg
              viewBox="0 0 1440 80"
              preserveAspectRatio="none"
              className="h-full w-full"
            >
              <path
                d="M0,36 C250,70 462,58 712,34 C950,10 1165,62 1440,30"
                fill="none"
                stroke="#0d9488"
                strokeOpacity="0.26"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="relative mx-auto max-w-xl text-left sm:max-w-2xl">
            <HandbookSubscribeCTA
              variant="home"
              flushTop
              heading={SUBSCRIBE_HEADING}
              description={SUBSCRIBE_DESCRIPTION}
            />
          </div>
          <div className="relative mx-auto mt-10 max-w-3xl border-t border-stone-200 pt-6">
            <p className="relative text-zinc-600">
              SK Creation • © {new Date().getFullYear()} • All rights reserved.
            </p>
            <nav
              className="relative mx-auto mt-4 flex max-w-md flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-zinc-600 sm:text-sm"
              aria-label="Legal"
            >
              <Link
                href="/terms"
                className="font-medium text-teal-700 underline-offset-2 hover:text-teal-800 hover:underline"
              >
                Terms of Service
              </Link>
              <span className="text-stone-300" aria-hidden>
                |
              </span>
              <Link
                href="/privacy"
                className="font-medium text-teal-700 underline-offset-2 hover:text-teal-800 hover:underline"
              >
                Privacy Policy
              </Link>
              <span className="text-stone-300" aria-hidden>
                |
              </span>
              <Link
                href="/disclaimer"
                className="font-medium text-teal-700 underline-offset-2 hover:text-teal-800 hover:underline"
              >
                Session disclaimer
              </Link>
            </nav>
          </div>
        </footer>

        <BotpressWebchat />
        <Script
          id="schema-person"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </body>
    </html>
  );
}
