import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import DashboardHeader from '@/component/DashboardHeader';
import DashboardQuickStats from '@/component/DashboardQuickStats';
import EmptyState from '@/component/EmptyState';
import MotivationalSampleLibrary from '@/component/MotivationalSampleLibrary';
import ProfileSummaryCard from '@/component/ProfileSummaryCard';
import ResourceCard from '@/component/ResourceCard';
import FreeDownloadCard from '@/component/FreeDownloadCard';
import {
  getAccessibleResources,
  getAuthenticatedUser,
  getProfile,
} from '@/lib/dashboard/data';
import { getFirstName } from '@/lib/auth/validation';
import {
  ensureFreeSamplePdfResource,
} from '@/lib/resources/premium-resource';
import { motivationalSamples } from '@/lib/dashboard/motivational-samples';
import { ensureMotivationalCatalogResources } from '@/lib/resources/motivational-ebooks';

type DashboardPageProps = {
  searchParams?: {
    purchase?: string;
  };
};

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your private dashboard for resources, downloads, and member content.',
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const user = await getAuthenticatedUser();
  if (!user) redirect('/login');

  await ensureFreeSamplePdfResource().catch(() => null);
  await ensureMotivationalCatalogResources().catch(() => null);

  const [profile, resources] = await Promise.all([
    getProfile(user.id),
    getAccessibleResources(user.id),
  ]);
  const guidedCount = resources.filter(({ resource }) => {
    const text = `${resource.category || ''} ${resource.resource_type || ''}`.toLowerCase();
    return text.includes('guide') || text.includes('material') || text.includes('workbook');
  }).length;
  const premiumPdfCount = resources.filter(
    ({ access_type, resource }) =>
      access_type !== 'free_sample' &&
      (resource.resource_type || '').toLowerCase().includes('pdf')
  ).length;

  const greeting = getFirstName(
    profile?.full_name || null,
    profile?.username || user.email?.split('@')[0] || 'there'
  );
  const resourceIdBySlug = resources.reduce<Record<string, string>>((acc, item) => {
    acc[item.resource.slug] = item.resource.id;
    return acc;
  }, {});
  const unlockedSlugs = resources.map(({ resource }) => resource.slug);

  return (
    <main className="min-h-screen bg-[#F3F1EC] px-4 pb-16 pt-0">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <DashboardHeader greetingName={greeting} />

        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-8">
            <DashboardQuickStats
              unlockedTotal={resources.length}
              samplePreviewCount={motivationalSamples.length}
              premiumUnlocked={premiumPdfCount}
            />

            {searchParams?.purchase === 'success' ? (
              <div className="rounded-2xl border border-emerald-200/90 bg-emerald-50/90 px-4 py-3 text-sm text-emerald-800 shadow-sm">
                Payment successful. Your secure PDF access will appear shortly — refresh if the
                download doesn&apos;t show yet.
              </div>
            ) : null}
            {searchParams?.purchase === 'cancel' ? (
              <div className="rounded-2xl border border-amber-200/90 bg-amber-50/90 px-4 py-3 text-sm text-amber-900 shadow-sm">
                Checkout was cancelled. You can try again any time.
              </div>
            ) : null}

            <div className="space-y-4 rounded-2xl border border-zinc-200/80 bg-white/85 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.05)] backdrop-blur-sm">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
                Useful resources
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-zinc-600">
                Start with free previews and member downloads, then add{' '}
                <span className="font-semibold text-violet-800">premium PDFs</span> when you want
                depth. Filters and search below are built to scale as you publish more titles.
              </p>
              <p className="text-xs text-zinc-500">
                Tip: bookmark this page — new drops and session offers land here first.
              </p>
            </div>

            <div id="member-free">
              <FreeDownloadCard
                title="When Relationship Hurt & Heal"
                description="A free PDF guide by Dr. SK exploring how relationships can both wound and restore us — with practical insights for healing, rebuilding trust, and moving forward with clarity."
                coverImage="/relationship.png"
                downloadHref="/api/resources/public-download/relationship"
                fileName="When-Relationship-Hurt-and-Heal.pdf"
              />
            </div>

            <div id="sample-library">
              <MotivationalSampleLibrary
                resourceIdBySlug={resourceIdBySlug}
                unlockedSlugs={unlockedSlugs}
              />
            </div>

            {resources.length ? (
              <div className="space-y-3">
                <div className="flex flex-wrap items-end justify-between gap-2">
                  <h3 className="text-lg font-semibold text-zinc-900">Unlocked for your account</h3>
                  <p className="text-xs font-medium text-zinc-500">Downloads use your login session</p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {resources.map(({ access_type, expires_at, resource }) => {
                    const isLocked = Boolean(
                      expires_at && new Date(expires_at) < new Date()
                    );

                    return (
                      <ResourceCard
                        key={resource.id}
                        resource={resource}
                        accessType={access_type}
                        isLocked={isLocked}
                      />
                    );
                  })}
                </div>
              </div>
            ) : (
              <EmptyState
                title="Your purchased resources will list here"
                message="Browse the sample library above — when you buy a premium PDF or we assign materials to your account, secure download cards appear in this section."
              />
            )}

            {/* Book a Session CTA */}
            <section className="overflow-hidden rounded-2xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50 via-white to-violet-50/90 p-6 shadow-md sm:p-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="inline-flex items-center rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-indigo-800 shadow-sm">
                    Live sessions · revenue
                  </span>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-zinc-900">
                    Turn reading into lasting change
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-600">
                    Pair PDFs with a 1:1 or group session — the highest-leverage path for clients
                    ready to invest in outcomes, not only downloads.
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-2 sm:items-end">
                  <a
                    href="/services"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-700 px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-800"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    View services &amp; book
                  </a>
                  <a
                    href="/#contact"
                    className="text-center text-xs font-semibold text-indigo-700 underline-offset-2 hover:underline sm:text-right"
                  >
                    Request a custom quote
                  </a>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-6 lg:self-start">
            <ProfileSummaryCard
              fullName={profile?.full_name || null}
              username={profile?.username || null}
              email={profile?.email || user.email || null}
              role={profile?.role || 'customer'}
            />

            <section className="rounded-2xl border border-zinc-200/90 bg-white/90 p-5 shadow-sm backdrop-blur-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                Guided materials
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                Worksheets, journals, and exercises tied to your account.
              </p>
              <p className="mt-4 text-3xl font-semibold tabular-nums text-zinc-900">{guidedCount}</p>
              <p className="text-xs text-zinc-500">In your library now</p>
            </section>

            <section className="rounded-2xl border border-violet-200/90 bg-gradient-to-b from-violet-50/90 to-white p-5 shadow-sm backdrop-blur-sm">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-violet-800/90">
                Premium PDFs
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                Paid files stay download-only and user-locked after Stripe confirms payment.
              </p>
              <p className="mt-4 text-3xl font-semibold tabular-nums text-violet-950">{premiumPdfCount}</p>
              <p className="text-xs text-violet-900/70">Unlocked on this account</p>
            </section>

            <section className="rounded-2xl border border-zinc-200/90 bg-zinc-50/90 p-5 text-sm text-zinc-600 shadow-sm">
              <p className="font-semibold text-zinc-900">Publishing at scale</p>
              <p className="mt-2 leading-relaxed">
                The sample grid supports search + category chips — drop in 20–30 PDFs by extending
                the data file and replacing files under{' '}
                <code className="rounded bg-zinc-200/80 px-1 py-0.5 text-xs">public/samples</code>.
              </p>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}
