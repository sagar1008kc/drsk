type DashboardHeaderProps = {
  greetingName: string;
};

export default function DashboardHeader({ greetingName }: DashboardHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-6 shadow-[0_2px_24px_rgba(0,0,0,0.04)] sm:p-8">
      <div
        className="pointer-events-none absolute -right-20 -top-24 h-48 w-48 rounded-full bg-gradient-to-br from-violet-200/50 to-transparent blur-2xl"
        aria-hidden
      />
      <div className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
          Private resource center
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl">
          Welcome, {greetingName}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-[15px]">
          Explore free previews, unlock premium PDFs with secure checkout, and book live sessions when
          you&apos;re ready for tailored support.
        </p>
      </div>
    </header>
  );
}
