import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import LoginPageClient from '@/app/login/page.client';
import { getAuthenticatedUser } from '@/lib/dashboard/data';

type LoginPageProps = {
  searchParams?: {
    next?: string;
    error?: string;
  };
};

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to access your member dashboard and premium resources.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const user = await getAuthenticatedUser();
  if (user) {
    redirect('/dashboard');
  }

  const nextPath =
    searchParams?.next && searchParams.next.startsWith('/')
      ? searchParams.next
      : '/dashboard';

  return (
    <main className="min-h-[calc(100vh-7rem)] bg-[#F8F7F4] px-4 py-10 sm:py-16">
      <div className="mx-auto flex max-w-5xl items-center justify-center">
        <LoginPageClient nextPath={nextPath} oauthError={searchParams?.error} />
      </div>
    </main>
  );
}
