import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/component/Navbar';
import ContactForm from '@/component/Contact';
import Providers from '@/component/Providers';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const siteUrl = 'https://www.skcreation.org';
const seoTitle = 'Dr. SK | Official Site of Dr. SK Author';
const seoDescription =
  'Official website of Dr. SK (also known as Dr SK and Dr. SK Author) - author, technologist, and founder of SK Creation.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    'Author and technologist',
  ],
  authors: [{ name: 'Dr. SK' }],
  creator: 'Dr. SK',
  publisher: 'SK Creation',
  alternates: {
    canonical: '/',
  },
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
    url: siteUrl,
    title: seoTitle,
    description: seoDescription,
    siteName: 'Dr. SK Official',
    locale: 'en_US',
    images: [
      {
        url: '/drsk.png',
        width: 1200,
        height: 1200,
        alt: 'Dr. SK official profile image',
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
    url: siteUrl,
    image: `${siteUrl}/drsk.png`,
    jobTitle: 'Author and Technologist',
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
    url: siteUrl,
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} antialiased bg-[#F8F7F4] text-zinc-900`}
      >
        <Providers />
        <Navbar />

        <div className="pt-[4.5rem] md:pt-24">{children}</div>

        {/* Contact Section */}
        <section className="border-t border-white/10 bg-gradient-to-b from-[#0A0B12] via-[#0c0d14] to-zinc-950 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <span className="inline-flex items-center rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-violet-200/90">
                Contact
              </span>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
                Get In Touch
              </h2>
              <p className="mt-3 text-base text-zinc-400">
                admin@skcreation.org
              </p>
            </div>
          </div>
        </section>

        <section className="bg-zinc-950 px-4 pb-16 pt-2">
          <div className="mx-auto w-full max-w-2xl">
            <ContactForm />
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-zinc-900 px-4 py-10 text-center text-sm text-zinc-400">
          <p className="mt-1 text-zinc-500">
            SK Creation • © {new Date().getFullYear()} • All rights reserved.
          </p>
          <nav
            className="mx-auto mt-6 flex max-w-md flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-zinc-500 sm:text-sm"
            aria-label="Legal"
          >
            <Link
              href="/terms"
              className="text-zinc-400 underline-offset-2 hover:text-white hover:underline"
            >
              Terms of Service
            </Link>
            <span className="text-zinc-700" aria-hidden>
              |
            </span>
            <Link
              href="/privacy"
              className="text-zinc-400 underline-offset-2 hover:text-white hover:underline"
            >
              Privacy Policy
            </Link>
            <span className="text-zinc-700" aria-hidden>
              |
            </span>
            <Link
              href="/disclaimer"
              className="text-zinc-400 underline-offset-2 hover:text-white hover:underline"
            >
              Session disclaimer
            </Link>
          </nav>
        </footer>

        {/* Botpress Webchat */}
        <Script
          id="botpress-webchat-inject"
          src="https://cdn.botpress.cloud/webchat/v3.6/inject.js"
          strategy="afterInteractive"
        />
        <Script
          id="botpress-webchat-config"
          src="https://files.bpcontent.cloud/2026/04/05/14/20260405144045-G1PSKHY7.js"
          strategy="afterInteractive"
        />
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
