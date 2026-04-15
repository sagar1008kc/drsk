type EmptyStateProps = {
  title: string;
  message: string;
};

export default function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 p-8 text-center">
      <h3 className="text-base font-semibold text-zinc-800">{title}</h3>
      <p className="mt-2 text-sm text-zinc-600">{message}</p>
    </div>
  );
}
