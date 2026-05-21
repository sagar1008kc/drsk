'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import SectionShell from './SectionShell';
import { badgeClass, container, sectionDesc, sectionTitle } from './styles';

const customerSlides = ['/customer1.png', '/customer2.png', '/customer3.png', '/customer4.png'];

function CarouselCell({
  slideOffset,
  activeSlide,
  altIndex,
}: {
  slideOffset: number;
  activeSlide: number;
  altIndex: number;
}) {
  const activeIndex = (activeSlide + slideOffset) % customerSlides.length;

  return (
    <article className="relative min-h-[320px] overflow-hidden rounded-xl bg-[#0a0a12] ring-1 ring-white/10 sm:min-h-[380px] md:min-h-[480px] md:max-h-[520px]">
      {customerSlides.map((src, index) => {
        const isActive = index === activeIndex;
        return (
          <Image
            key={src}
            src={src}
            alt={`Collaboration highlight ${altIndex + 1}`}
            fill
            priority={index < 2}
            className={`drsk-fade-layer object-cover object-center transition-opacity duration-500 ease-in-out motion-reduce:transition-none ${
              isActive ? 'z-10 opacity-100' : 'z-0 opacity-0'
            }`}
            sizes="(max-width: 767px) 100vw, 50vw"
          />
        );
      })}
    </article>
  );
}

export default function HomeCollaborationsSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);

  const totalPages = customerSlides.length;

  const goToSlide = useCallback((index: number) => {
    setActiveSlide((index + customerSlides.length) % customerSlides.length);
  }, []);

  useEffect(() => {
    customerSlides.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % customerSlides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0]?.clientX ?? 0;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const endX = e.changedTouches[0]?.clientX ?? 0;
    const diff = touchStartX.current - endX;
    if (diff > 48) goToSlide(activeSlide + 1);
    else if (diff < -48) goToSlide(activeSlide - 1);
  }

  return (
    <SectionShell ariaLabelledBy="collab-heading">
      <div className={container}>
        <div className="mx-auto max-w-2xl text-center">
          <span className={badgeClass}>Collaborations</span>
          <h2 id="collab-heading" className={`${sectionTitle} mt-3`}>
            Collaborations & clients
          </h2>
          <p className={sectionDesc}>
            Supporting individuals and small businesses through practical guidance, digital
            solutions, and meaningful results.
          </p>
        </div>

        <div
          className="mx-auto mt-8 max-w-5xl sm:mt-10"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#12121a]/60 p-3 sm:p-5"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
              <CarouselCell
                slideOffset={0}
                activeSlide={activeSlide}
                altIndex={activeSlide % customerSlides.length}
              />
              <div className="hidden md:block">
                <CarouselCell
                  slideOffset={1}
                  activeSlide={activeSlide}
                  altIndex={(activeSlide + 1) % customerSlides.length}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => goToSlide(activeSlide - 1)}
              aria-label="Previous highlight"
              className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#020205]/90 text-lg text-zinc-200 transition active:scale-95 sm:left-3"
            >
              <span aria-hidden>←</span>
            </button>
            <button
              type="button"
              onClick={() => goToSlide(activeSlide + 1)}
              aria-label="Next highlight"
              className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-[#020205]/90 text-lg text-zinc-200 transition active:scale-95 sm:right-3"
            >
              <span aria-hidden>→</span>
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={`dot-${index}`}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === activeSlide ? 'true' : undefined}
                onClick={() => goToSlide(index)}
                className="min-h-[44px] min-w-[44px] rounded-full p-2 transition"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    index === activeSlide ? 'h-2.5 w-8 bg-violet-400' : 'h-2.5 w-2.5 bg-zinc-600'
                  }`}
                />
              </button>
            ))}
          </div>
          <p className="mt-2 text-center text-xs text-zinc-500 sm:hidden">
            Swipe left or right to browse
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
