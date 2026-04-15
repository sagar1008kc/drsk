type ProfileSummaryCardProps = {
  fullName: string | null;
  username: string | null;
  email: string | null;
  role: string | null;
};

export default function ProfileSummaryCard({
  fullName,
  username,
  email,
  role,
}: ProfileSummaryCardProps) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-semibold text-zinc-900">Account summary</h2>
      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex items-center justify-between gap-3">
          <dt className="text-zinc-500">Name</dt>
          <dd className="font-medium text-zinc-800">{fullName || 'Not set'}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-zinc-500">Username</dt>
          <dd className="font-medium text-zinc-800">{username || 'Not set'}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-zinc-500">Email</dt>
          <dd className="font-medium text-zinc-800">{email || 'Not set'}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt className="text-zinc-500">Role</dt>
          <dd className="font-medium capitalize text-zinc-800">
            {role || 'customer'}
          </dd>
        </div>
      </dl>
    </section>
  );
}
