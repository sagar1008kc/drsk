type DashboardHeaderProps = {
  greetingName: string;
};

export default function DashboardHeader({ greetingName }: DashboardHeaderProps) {
  return (
    <header className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
      <div>
        <p className="text-sm font-medium text-zinc-500">Private Resource Center</p>
        <h1 className="mt-1 text-2xl font-semibold text-zinc-900 sm:text-3xl">
          Welcome, {greetingName}
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-zinc-600 sm:text-base">
          Buy premium PDFs securely with Stripe, then download instantly from your
          dashboard after payment confirmation.
        </p>
      </div>
    </header>
  );
}
