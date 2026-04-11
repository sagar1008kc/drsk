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
        className={`${inter.className} antialiased bg-[#0a0a0a] text-white`}
      >
        <Providers />
        <Navbar />

        <div className="pt-[4.5rem] md:pt-24">{children}</div>

        <section className="border-t border-white/10 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white md:text-4xl">
                Get In Touch
              </h2>
              <p className="mt-3 text-base text-zinc-400">
                info.drsk0@gmail.com
              </p>
            </div>
          </div>
        </section>

        <section className="flex justify-center px-4 pb-8">
          <div className="w-full max-w-3xl md:w-1/2 md:min-w-[320px]">
            <ContactForm />
          </div>
        </section>

        <footer className="border-t border-white/10 py-10 text-center text-sm text-zinc-500">
          Official website of Dr. SK • © {new Date().getFullYear()} • All
          rights reserved.
        </footer>

        {/* Dr. SK Live (Botpress) — inject first, then bot config (same order as original embed) */}
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
