import { redirect } from 'next/navigation';
import DashboardHeader from '@/component/DashboardHeader';
import EmptyState from '@/component/EmptyState';
import PlaceholderResourceCard from '@/component/PlaceholderResourceCard';
import ProfileSummaryCard from '@/component/ProfileSummaryCard';
import ResourceCard from '@/component/ResourceCard';
import {
  getAccessibleResources,
  getAuthenticatedUser,
  getProfile,
} from '@/lib/dashboard/data';
import { getFirstName } from '@/lib/auth/validation';
import PremiumPdfPurchaseCard from '@/component/PremiumPdfPurchaseCard';
import {
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
  const premiumPdfCount = resources.filter(({ resource }) =>
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
              <h2 className="text-lg font-semibold text-zinc-900">My Downloads / My Resources</h2>
              <p className="mt-1 text-sm text-zinc-500">
                Download-only access for your assigned books, guided materials, and
                premium PDFs.
              </p>
            </div>

            {!hasPremiumPdf ? (
              <PremiumPdfPurchaseCard
                title={premiumPdfConfig.title}
                description={premiumPdfConfig.description}
                coverImage="/eb.png"
                priceLabel={priceLabel}
              />
            ) : null}

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
