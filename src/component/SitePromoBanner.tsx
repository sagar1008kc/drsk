export default function SitePromoBanner() {
  return (
    <div className="border-b border-white/10 bg-[#0a0a12]/90 px-4 py-3.5 sm:px-6 sm:py-4">
      <p className="mx-auto max-w-4xl text-center text-sm leading-relaxed text-zinc-300 sm:text-base">
        Struggling with stress, overthinking, or emotional ups and downs? Start with this
        practical guide.{' '}
        <a
          href="https://a.co/d/0b33CrJD"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-violet-300 underline underline-offset-4 transition hover:text-violet-200"
        >
          Read on Amazon
        </a>
      </p>
    </div>
  );
}
