'use client';

import type { ReactNode } from 'react';

type AuthCardProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export default function AuthCard({ title, subtitle, children }: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-3xl border border-zinc-200 bg-white p-6 shadow-[0_20px_70px_rgba(0,0,0,0.08)] sm:p-8">
      <div className="mb-6 space-y-2 text-center">
        <h1 className="text-2xl font-semibold text-zinc-900">{title}</h1>
        <p className="text-sm text-zinc-500">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}
