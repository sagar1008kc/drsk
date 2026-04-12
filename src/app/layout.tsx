import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/component/Navbar';
import ContactForm from '@/component/Contact';
import Providers from '@/component/Providers';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.skcreation.org'),
  title: {
    default: 'Dr. SK',
    template: '%s | Dr. SK',
  },
  description: 'Official website of Dr. SK — author, technologist, and creator.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} antialiased bg-[#F8F7F4] text-zinc-900`}
      >
        <Providers />
        <Navbar />

        <div className="pt-[4.5rem] md:pt-24">{children}</div>

        {/* Contact Section */}
        <section className="border-t border-zinc-200 bg-white py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <span className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Contact
              </span>
              <h2 className="mt-4 text-3xl font-bold text-zinc-900 md:text-4xl">
                Get In Touch
              </h2>
              <p className="mt-3 text-base text-zinc-500">
                admin@skcreation.org
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white pb-16 px-4">
          <div className="mx-auto w-full max-w-2xl">
            <ContactForm />
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-zinc-900 py-10 text-center text-sm text-zinc-400">
          <p className="font-medium text-white">Dr. SK</p>
          <p className="mt-1 text-zinc-500">
            Official website • © {new Date().getFullYear()} • All rights reserved.
          </p>
          <p className="mt-2 text-xs text-zinc-600">
            admin@skcreation.org
          </p>
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
      </body>
    </html>
  );
}
