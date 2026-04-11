'use client';

import { Toaster } from 'sonner';

export default function Providers() {
  return (
    <Toaster
      theme="dark"
      position="top-center"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            'bg-zinc-900 border border-white/10 text-white shadow-xl rounded-2xl',
          title: 'text-white font-semibold',
          description: 'text-zinc-300',
        },
      }}
    />
  );
}
