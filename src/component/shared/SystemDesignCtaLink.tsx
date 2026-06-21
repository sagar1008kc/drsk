import Link from 'next/link';

type SystemDesignCtaLinkProps = {
  className: string;
  shimmerClassName?: string;
  href?: string;
};

export default function SystemDesignCtaLink({
  className,
  shimmerClassName = 'absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-1000 ease-in-out group-hover:translate-x-[100%]',
  href = '/portfolio/agentic-ai-system-design',
}: SystemDesignCtaLinkProps) {
  return (
    <Link href={href} className={className}>
      <div className={shimmerClassName} aria-hidden />
      <span>View interactive system design</span>
      <svg
        className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </Link>
  );
}
