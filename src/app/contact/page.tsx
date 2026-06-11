import type { Metadata } from 'next';
import ContactPageContent from '@/component/contact/ContactPageContent';
import { createPageMetadata } from '@/lib/site-url';

export const metadata: Metadata = createPageMetadata({
  path: '/contact',
  title: 'Contact',
  description:
    'Contact Dr. SK and SK Creation — questions about services, projects, books, or resources.',
});

export default function ContactPage() {
  return <ContactPageContent />;
}
