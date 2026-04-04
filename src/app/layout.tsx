import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/component/Navbar';
import ContactForm from '@/component/Contact';

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
      <body className={`${inter.className} antialiased bg-black text-white`}>
        <Navbar />

        <div>
          {children}
        </div>
        <section className="py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white md:text-4xl">Get In Touch</h2>
              <p className="mt-3 text-base text-gray-400">info.drsk0@gmail.com</p>
            </div>
    <ContactForm />
  </div>
</section>

          <footer className="py-10 text-center text-gray-500 text-sm">
            Official website of Dr. SK • © {new Date().getFullYear()} • All rights reserved.
          </footer>
      </body>
    </html>
  );
}