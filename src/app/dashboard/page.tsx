import { redirect } from 'next/navigation';
import DashboardHeader from '@/component/DashboardHeader';
import EmptyState from '@/component/EmptyState';
import PlaceholderResourceCard from '@/component/PlaceholderResourceCard';
import ProfileSummaryCard from '@/component/ProfileSummaryCard';
import ResourceCard from '@/component/ResourceCard';
import FreeDownloadCard from '@/component/FreeDownloadCard';
import {
  getAccessibleResources,
  getAuthenticatedUser,
  getProfile,
} from '@/lib/dashboard/data';
import { getFirstName } from '@/lib/auth/validation';
import PremiumPdfPurchaseCard from '@/component/PremiumPdfPurchaseCard';
import {
  ensureFreeSamplePdfResource,
  getPremiumPdfPriceCents,
  premiumPdfConfig,
} from '@/lib/resources/premium-resource';

type DashboardPageProps = {
  searchParams?: {
    purchase?: string;
  };
};

const placeholderResources = [
  {
    title: 'Emotional Balance Workbook',
    description: 'A practical self-help workbook with calming and reflection exercises.',
    category: 'Book',
    resourceType: 'PDF',
  },
  {
    title: 'Inner Clarity Journal',
    description: 'A guided journal for daily reflection, stress release, and grounding.',
    category: 'Guided Journal',
    resourceType: 'PDF',
  },
  {
    title: 'Healing Through Writing Journal',
    description: 'Weekly prompts for emotional healing, gratitude, and self-awareness.',
    category: 'Guided Journal',
    resourceType: 'PDF',
  },
  {
    title: 'Mindful Growth Playbook',
    description: 'Structured prompts and action plans to build healthy habits.',
    category: 'Book',
    resourceType: 'PDF',
  },
];

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const user = await getAuthenticatedUser();
  if (!user) redirect('/login');

  await ensureFreeSamplePdfResource().catch(() => null);

  const [profile, resources] = await Promise.all([
    getProfile(user.id),
    getAccessibleResources(user.id),
  ]);
  const premiumPdfSlug = premiumPdfConfig.slug;
  const hasPremiumPdf = resources.some(
    ({ resource }) => resource.slug === premiumPdfSlug
  );
  const priceLabel = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: premiumPdfConfig.currency.toUpperCase(),
  }).format(getPremiumPdfPriceCents() / 100);
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

  return (
    <main className="min-h-screen bg-[#F8F7F4] px-4 pb-14 pt-6 sm:pt-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <DashboardHeader greetingName={greeting} />

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-6">
            {searchParams?.purchase === 'success' ? (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                Payment successful. Your secure PDF access will appear shortly.
              </div>
            ) : null}
            {searchParams?.purchase === 'cancel' ? (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                Checkout was cancelled. You can try again any time.
              </div>
            ) : null}

            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h2 className="text-xl font-bold text-zinc-900">My Resources</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Your growth starts here. Grab your{' '}
                <span className="font-semibold text-emerald-700">free download</span> below —
                no strings attached. When you&apos;re ready to go deeper, our{' '}
                <span className="font-semibold text-violet-700">premium PDFs</span> are packed
                with practical tools, exercises, and insights designed to help you move forward
                with clarity and confidence.{' '}
                <span className="font-medium text-zinc-800">
                  Small steps, big transformation — it all starts with one download.
                </span>
              </p>
            </div>

            {!hasPremiumPdf ? (
              <PremiumPdfPurchaseCard
                title={premiumPdfConfig.title}
                description={premiumPdfConfig.description}
                coverImage="/stop-overthinking.png"
                priceLabel={priceLabel}
              />
            ) : null}

            {/* Free download — always visible, no DB required */}
            <FreeDownloadCard
              title="When Relationship Hurt & Heal"
              description="A free PDF guide by Dr. SK exploring how relationships can both wound and restore us — with practical insights for healing, rebuilding trust, and moving forward with clarity."
              coverImage="/relationship.png"
              downloadHref="/api/resources/public-download/relationship"
              fileName="When-Relationship-Hurt-and-Heal.pdf"
            />

            {resources.length ? (
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
            ) : (
              <div className="space-y-4">
                <EmptyState
                  title="No resources yet"
                  message="Once resources are assigned to your account, your download buttons will appear here."
                />
                <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
                  <h3 className="text-base font-semibold text-zinc-900">
                    Starter Library Preview
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600">
                    Placeholder examples for books and guided journal PDF files.
                  </p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {placeholderResources.map((resource) => (
                      <PlaceholderResourceCard
                        key={resource.title}
                        title={resource.title}
                        description={resource.description}
                        category={resource.category}
                        resourceType={resource.resourceType}
                      />
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* Book a Session CTA */}
            <section className="rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-violet-50 p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                    Virtual Sessions
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-zinc-900">
                    Ready to go further? Book a live session.
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600">
                    Get personalized guidance from Dr. SK — business, career, mental wellness, or group sessions. Available in English, Nepali, and Hindi.
                  </p>
                </div>
                <a
                  href="/services"
                  className="inline-flex shrink-0 items-center gap-2 rounded-full bg-indigo-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-800"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Book a Session
                </a>
              </div>
            </section>
          </div>

          <div className="space-y-4">
            <ProfileSummaryCard
              fullName={profile?.full_name || null}
              username={profile?.username || null}
              email={profile?.email || user.email || null}
              role={profile?.role || 'customer'}
            />

            <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-zinc-900">Guided Materials</h2>
              <p className="mt-2 text-sm text-zinc-600">
                Curated worksheets, guides, and premium PDFs are delivered here for
                secure download access.
              </p>
              <p className="mt-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
                Available now: {guidedCount}
              </p>
            </section>

            <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-zinc-900">Premium PDFs</h2>
              <p className="mt-2 text-sm text-zinc-600">
                PDF-only premium files stay tied to your account for secure, download-only
                access.
              </p>
              <p className="mt-3 text-xs font-medium uppercase tracking-wide text-zinc-500">
                Available now: {premiumPdfCount}
              </p>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
