'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { PROFILE_HERO_HEADLINE } from '@/lib/profile-hero';

const barcodeWidths = [3, 1, 2, 4, 1, 1, 3, 2, 1, 3, 4, 1, 2, 2, 1, 3, 1, 2, 3];

function ZapIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
    </svg>
  );
}

/** Push pin flush on the wall — head on surface, shaft toward viewer. */
function WallThumbtack() {
  return (
    <div className="relative flex h-[36px] w-[36px] items-center justify-center" aria-hidden>
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 34% 30%, #fecaca 0%, #f87171 22%, #ef4444 48%, #b91c1c 78%, #7f1d1d 100%)',
          boxShadow:
            'inset 2px 3px 5px rgba(255,255,255,0.55), inset -3px -4px 7px rgba(80,0,0,0.45), 0 2px 6px rgba(0,0,0,0.15)',
        }}
      />
      <div className="absolute left-[24%] top-[19%] h-[6px] w-[8px] -rotate-[28deg] rounded-full bg-white/50 blur-[0.5px]" />
      <div
        className="relative z-10 h-[11px] w-[11px] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 38% 32%, #ffffff 0%, #e4e4e7 28%, #a1a1aa 58%, #52525b 88%)',
          boxShadow:
            '0 0 0 1px rgba(63,63,70,0.35), inset 0 1px 2px rgba(255,255,255,0.95), 0 4px 8px rgba(0,0,0,0.3)',
        }}
      />
    </div>
  );
}

export default function ExpertProfileCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-6 sm:py-8">
      <style>{`
        @keyframes expert-card-swing {
          0% { transform: rotate(2.5deg); }
          50% { transform: rotate(-2.5deg); }
          100% { transform: rotate(2.5deg); }
        }
        @keyframes expert-barcode-wave {
          0%, 100% { background-color: #27272a; box-shadow: none; }
          20% { background-color: #4ade80; box-shadow: 0 0 8px #4ade80; }
          40% { background-color: #3b82f6; box-shadow: 0 0 8px #3b82f6; }
          60% { background-color: #1811e5; box-shadow: 0 0 8px #1811e5; }
        }
        .expert-card-swing {
          animation: expert-card-swing 5.5s ease-in-out infinite;
          transform-origin: top center;
        }
        .expert-barcode-bar {
          background-color: #27272a;
          animation: expert-barcode-wave 3s infinite ease-in-out;
        }
        .expert-card-grid {
          background-image:
            linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>

      <div className="relative flex w-[min(360px,92vw)] flex-col items-center">
        <div className="relative z-30 flex justify-center">
          <WallThumbtack />
        </div>

        <div className="expert-card-swing relative z-20 flex flex-col items-center">
          <div
            className="h-24 w-[2px] rounded-full bg-gradient-to-b from-zinc-500 to-zinc-300 sm:h-28"
            aria-hidden
          />

        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
            transition: isHovered ? 'none' : 'transform 0.5s ease-out',
          }}
          className="group relative h-[480px] w-[min(340px,88vw)] overflow-hidden rounded-[24px] bg-[#FAFAFA] shadow-[0_30px_60px_rgba(139,92,246,0.25),0_0_0_1px_rgba(255,255,255,0.8)] sm:h-[520px]"
        >
          <div
            className="pointer-events-none absolute inset-0 z-50 rounded-[24px] transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}) 0%, transparent 60%)`,
            }}
          />
          <div className="expert-card-grid pointer-events-none absolute inset-0 z-0 opacity-80" />

          <div className="relative z-10 flex h-full flex-col">
            <div className="flex items-center justify-between rounded-t-[22px] bg-[#0d9488] px-3 text-white">
              <Image
                src="/logo.png"
                alt="Dr. SK"
                width={40}
                height={40}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#4ade80]" />
                <span className="text-xs tracking-[0.1em] text-black">ACTIVE</span>
              </div>
            </div>

            <div className="mt-10 flex flex-col items-center">
              <div className="relative flex h-32 w-32 items-center justify-center overflow-visible rounded-full border-[6px] border-white bg-zinc-200 shadow-xl">
                <div className="relative h-full w-full overflow-hidden rounded-full bg-[#e0dfdc]">
                  <Image
                    src="/drsk.png"
                    alt="Dr. SK"
                    fill
                    className="object-cover object-top"
                    sizes="128px"
                    priority
                  />
                </div>
                <div className="absolute -right-2 bottom-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-[#0d9488] shadow-lg">
                  <ZapIcon className="h-[18px] w-[18px] text-white" />
                </div>
              </div>

              <div className="mt-6 space-y-1 text-center">
                <h2 className="flex items-center justify-center gap-2 text-3xl font-bold tracking-tight text-zinc-900">
                  Dr. SK <span aria-hidden>🇺🇸</span>
                </h2>
                <p className="text-[11px] font-medium font-mono tracking-[0.15em] text-zinc-500">
                  {PROFILE_HERO_HEADLINE.highlight.toUpperCase()}
                </p>
              </div>
            </div>

            <div className="mt-8 px-6">
              <div className="relative flex items-center rounded-[20px] border border-zinc-100 bg-white p-4 shadow-sm">
                <div className="flex-1 text-center">
                  <h3 className="text-xl font-bold text-zinc-900">10+</h3>
                  <p className="mt-1 text-[10px] font-medium tracking-[0.15em] text-zinc-400">YEARS</p>
                </div>
                <div className="h-10 w-px bg-zinc-100" />
                <div className="flex-1 text-center">
                  <h3 className="mt-1 text-[15px] font-bold text-zinc-900">Tech +</h3>
                  <p className="mt-1 text-[10px] font-medium tracking-[0.15em] text-zinc-400">Leadership</p>
                </div>
              </div>
            </div>

            <div className="flex-grow" />

            <div className="flex flex-col gap-3 px-8 pb-8">
              <div className="flex h-10 w-full items-end justify-between opacity-90">
                {barcodeWidths.map((width, index) => (
                  <div
                    key={index}
                    className="expert-barcode-bar rounded-[1px]"
                    style={{
                      width: `${width * 2}px`,
                      height: index % 4 === 0 ? '100%' : '80%',
                      animationDelay: `${index * 0.1}s`,
                    }}
                  />
                ))}
              </div>
              <div className="mt-1 flex items-center justify-end">
                <span className="text-[11px] font-medium font-mono tracking-[0.15em] text-zinc-400">
                  SK-AI-2026
                </span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
