import Image from 'next/image';
import DownloadButton from '@/component/DownloadButton';

type ResourceCardProps = {
  resource: {
    id: string;
    title: string;
    description: string | null;
    thumbnail_url: string | null;
    category: string | null;
    resource_type: string | null;
  };
  accessType: string;
  isLocked: boolean;
};

export default function ResourceCard({
  resource,
  accessType,
  isLocked,
}: ResourceCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-start gap-4">
        <div className="flex h-20 w-16 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 text-[11px] font-medium text-zinc-500">
          {resource.thumbnail_url ? (
            <Image
              src={resource.thumbnail_url}
              alt={resource.title}
              width={64}
              height={80}
              className="h-full w-full rounded-xl object-cover"
            />
          ) : (
            'No Cover'
          )}
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-zinc-900">{resource.title}</h3>
          <p className="mt-1 text-sm text-zinc-600">
            {resource.description || 'Premium member resource.'}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full border border-zinc-300 bg-zinc-50 px-2 py-1 font-medium text-zinc-600">
              {resource.resource_type || 'Resource'}
            </span>
            {resource.category ? (
              <span className="rounded-full border border-zinc-300 bg-zinc-50 px-2 py-1 font-medium text-zinc-600">
                {resource.category}
              </span>
            ) : null}
            <span
              className={`rounded-full px-2 py-1 font-medium ${
                isLocked
                  ? 'border border-amber-300 bg-amber-50 text-amber-700'
                  : 'border border-emerald-300 bg-emerald-50 text-emerald-700'
              }`}
            >
              {isLocked ? 'Locked' : `Access: ${accessType}`}
            </span>
          </div>
        </div>
      </div>
      <DownloadButton resourceId={resource.id} disabled={isLocked} />
    </article>
  );
}
