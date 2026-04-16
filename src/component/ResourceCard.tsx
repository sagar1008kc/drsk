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
  const badgeClassName = isLocked
    ? 'border-amber-300 bg-amber-50 text-amber-700'
    : 'border-emerald-300 bg-emerald-50 text-emerald-700';
  const accessLabel = isLocked
    ? 'Locked'
    : accessType === 'free_sample'
      ? 'Free sample'
      : `Access: ${accessType}`;

  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-100">
        {resource.thumbnail_url ? (
          <Image
            src={resource.thumbnail_url}
            alt={resource.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs font-medium text-zinc-500">
            No Cover
          </div>
        )}
      </div>

      <div className="space-y-4 p-4">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full border border-zinc-300 bg-zinc-50 px-2 py-1 font-medium text-zinc-600">
              {resource.resource_type || 'Resource'}
            </span>
            {resource.category ? (
              <span className="rounded-full border border-zinc-300 bg-zinc-50 px-2 py-1 font-medium text-zinc-600">
                {resource.category}
              </span>
            ) : null}
            <span className={`rounded-full border px-2 py-1 font-medium ${badgeClassName}`}>
              {accessLabel}
            </span>
          </div>
          <h3 className="text-base font-semibold text-zinc-900">{resource.title}</h3>
          <p className="mt-1 text-sm text-zinc-600">
            {resource.description || 'Premium member resource.'}
          </p>
        </div>
        <div className="space-y-1">
          <DownloadButton resourceId={resource.id} disabled={isLocked} />
          <p className="text-xs text-zinc-500">
            {isLocked
              ? 'Purchase required to unlock this download.'
              : 'Click Download to get your secure file link.'}
          </p>
        </div>
      </div>
    </article>
  );
}
