'use client';

import { useState } from 'react';

type DashboardHeaderProps = {
  greetingName: string;
};

export default function DashboardHeader({ greetingName }: DashboardHeaderProps) {
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    if (loading) return;
    setLoading(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } finally {
      window.location.href = '/login';
    }
  }

  return (
    <header className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-500">Private Resource Center</p>
          <h1 className="mt-1 text-2xl font-semibold text-zinc-900 sm:text-3xl">
            Welcome, {greetingName}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-600 sm:text-base">
            Access your downloadable books, guided materials, and premium PDFs in one
            secure place.
          </p>
        </div>
        <button
          onClick={handleLogout}
          disabled={loading}
          className="h-10 rounded-xl border border-zinc-300 px-4 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </header>
  );
}
