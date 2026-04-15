'use client';

import { useState } from 'react';

type DownloadButtonProps = {
  resourceId: string;
  disabled?: boolean;
};

export default function DownloadButton({
  resourceId,
  disabled = false,
}: DownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function downloadResource() {
    if (disabled || loading) return;
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/resources/${resourceId}/download`);
      if (!response.ok) {
        const result = (await response.json()) as { error?: string };
        setError(result.error || 'Unable to download.');
        return;
      }

      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = objectUrl;
      anchor.download = '';
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      setError('Download failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={downloadResource}
        disabled={disabled || loading}
        className="h-10 w-full rounded-xl bg-zinc-900 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
      >
        {loading ? 'Preparing download...' : 'Download'}
      </button>
      {error ? <p className="text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}
