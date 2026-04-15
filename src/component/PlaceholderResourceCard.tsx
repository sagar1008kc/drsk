type PlaceholderResourceCardProps = {
  title: string;
  description: string;
  category: string;
  resourceType: string;
};

export default function PlaceholderResourceCard({
  title,
  description,
  category,
  resourceType,
}: PlaceholderResourceCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-4">
      <div className="mb-4 flex items-start gap-4">
        <div className="flex h-20 w-16 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-white text-[11px] font-medium text-zinc-500">
          Preview
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-zinc-900">{title}</h3>
          <p className="mt-1 text-sm text-zinc-600">{description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full border border-zinc-300 bg-white px-2 py-1 font-medium text-zinc-600">
              {resourceType}
            </span>
            <span className="rounded-full border border-zinc-300 bg-white px-2 py-1 font-medium text-zinc-600">
              {category}
            </span>
            <span className="rounded-full border border-sky-300 bg-sky-50 px-2 py-1 font-medium text-sky-700">
              Placeholder
            </span>
          </div>
        </div>
      </div>
      <button
        type="button"
        disabled
        className="h-10 w-full rounded-xl border border-zinc-300 bg-white text-sm font-medium text-zinc-500"
      >
        Coming soon
      </button>
    </article>
  );
}
