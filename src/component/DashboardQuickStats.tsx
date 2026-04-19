type DashboardQuickStatsProps = {
  unlockedTotal: number;
  samplePreviewCount: number;
  premiumUnlocked: number;
};

export default function DashboardQuickStats({
  unlockedTotal,
  samplePreviewCount,
  premiumUnlocked,
}: DashboardQuickStatsProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="rounded-xl border border-zinc-200/90 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm">
        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Your library</p>
        <p className="mt-1 text-2xl font-semibold tabular-nums text-zinc-900">{unlockedTotal}</p>
        <p className="text-xs text-zinc-500">Unlocked resources</p>
      </div>
      <div className="rounded-xl border border-zinc-200/90 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm">
        <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">Previews</p>
        <p className="mt-1 text-2xl font-semibold tabular-nums text-zinc-900">{samplePreviewCount}</p>
        <p className="text-xs text-zinc-500">Sample PDFs to explore</p>
      </div>
      <div className="rounded-xl border border-violet-200/90 bg-gradient-to-br from-violet-50/80 to-white px-4 py-3 shadow-sm backdrop-blur-sm">
        <p className="text-[10px] font-bold uppercase tracking-wider text-violet-600/90">Premium</p>
        <p className="mt-1 text-2xl font-semibold tabular-nums text-violet-950">{premiumUnlocked}</p>
        <p className="text-xs text-violet-800/80">Purchased PDFs</p>
      </div>
    </div>
  );
}
