import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type PortfolioBackLinkProps = {
  className?: string;
  variant?: 'dark' | 'light';
};

export default function PortfolioBackLink({
  className = '',
  variant = 'dark',
}: PortfolioBackLinkProps) {
  const variantClass =
    variant === 'dark'
      ? 'border-slate-700/80 text-slate-400 hover:border-blue-500/50 hover:text-white'
      : 'border-slate-300 text-slate-600 hover:border-teal-500/50 hover:text-slate-900';

  return (
    <Link
      href="/portfolio"
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border bg-black/20 backdrop-blur-sm transition ${variantClass} ${className}`}
      aria-label="Back to portfolio"
    >
      <ArrowLeft className="h-4 w-4" aria-hidden />
    </Link>
  );
}
