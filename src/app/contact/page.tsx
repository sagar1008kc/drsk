import type { Metadata } from 'next';
import ContactPageContent from '@/component/contact/ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Dr. SK and SK Creation — questions about services, projects, books, or resources.',
};

export default function ContactPage() {
  return <ContactPageContent />;
}
