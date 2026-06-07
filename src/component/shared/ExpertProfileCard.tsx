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
          0% { transform: rotate(3deg); }
          50% { transform: rotate(-3deg); }
          100% { transform: rotate(3deg); }
        }
        @keyframes expert-barcode-wave {
          0%, 100% { background-color: #27272a; box-shadow: none; }
          20% { background-color: #4ade80; box-shadow: 0 0 8px #4ade80; }
          40% { background-color: #3b82f6; box-shadow: 0 0 8px #3b82f6; }
          60% { background-color: #1811e5; box-shadow: 0 0 8px #1811e5; }
        }
        .expert-card-swing {
          animation: expert-card-swing 6s ease-in-out infinite;
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

      <div className="expert-card-swing relative flex flex-col items-center">
        <div className="flex flex-col items-center">
          <div className="relative z-20 h-4 w-4 shrink-0 rounded-full border-2 border-zinc-300 bg-zinc-100 shadow-xl" />
          <div className="relative z-10 -mt-1 h-24 w-0.5 shrink-0 bg-zinc-400 sm:h-32" />
          <div className="relative z-20 -mt-0.5 flex h-4 w-16 shrink-0 items-center justify-center rounded-t-lg border border-zinc-300 bg-zinc-200 shadow-[0_2px_10px_rgba(0,0,0,0.15)]">
            <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-zinc-400" aria-hidden />
            <div className="relative h-2 w-2 rounded-full bg-zinc-400" />
            <div className="absolute ml-4 h-2 w-2 rounded-full bg-zinc-400" />
          </div>
        </div>

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
  );
}
