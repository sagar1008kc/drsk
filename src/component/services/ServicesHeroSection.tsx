'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import * as THREE from 'three';
import { SERVICE_AREAS } from '@/lib/service-areas';

const accentRing: Record<string, string> = {
  violet: 'hover:border-teal-500 text-teal-600 hover:shadow-[0_20px_40px_-10px_rgba(13,148,136,0.18)]',
  indigo: 'hover:border-cyan-500 text-cyan-600 hover:shadow-[0_20px_40px_-10px_rgba(6,182,212,0.18)]',
  emerald: 'hover:border-emerald-500 text-emerald-500 hover:shadow-[0_20px_40px_-10px_rgba(16,185,129,0.18)]',
  amber: 'hover:border-amber-500 text-amber-500 hover:shadow-[0_20px_40px_-10px_rgba(245,158,11,0.18)]',
};

const accentGlow: Record<string, string> = {
  violet: 'from-teal-50/70',
  indigo: 'from-cyan-50/70',
  emerald: 'from-emerald-50/70',
  amber: 'from-amber-50/70',
};

export default function ServicesHeroSection() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [waveOffset, setWaveOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsMounted(true);

    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfbfbfe, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 420;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const particleCount = 140;
    const positions = new Float32Array(particleCount * 3);
    const particlesData: { velocity: THREE.Vector3 }[] = [];
    const particleGeometry = new THREE.BufferGeometry();
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x0d9488,
      opacity: 0.55,
      size: 3,
      sizeAttenuation: true,
      transparent: true,
    });

    for (let i = 0; i < particleCount; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 1000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 780;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;
      particlesData.push({
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.7,
          (Math.random() - 0.5) * 0.7,
          (Math.random() - 0.5) * 0.7
        ),
      });
    }

    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage)
    );
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const linePositions = new Float32Array(particleCount * particleCount * 3);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage)
    );
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x0d9488,
      opacity: 0.13,
      transparent: true,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    let mouseX = 0;
    let mouseY = 0;
    let animationFrameId = 0;

    const handlePointerMove = (event: PointerEvent) => {
      mouseX = event.clientX - window.innerWidth / 2;
      mouseY = event.clientY - window.innerHeight / 2;
      setWaveOffset({
        x: (event.clientX / window.innerWidth - 0.5) * 34,
        y: (event.clientY / window.innerHeight - 0.5) * 24,
      });
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('resize', handleResize);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const positionAttribute = particleGeometry.attributes.position as THREE.BufferAttribute;
      const positionArray = positionAttribute.array as Float32Array;
      let vertexPosition = 0;
      let connected = 0;

      particles.rotation.y += 0.04 * (mouseX * 0.001 - particles.rotation.y) + 0.001;
      particles.rotation.x += 0.04 * (mouseY * 0.001 - particles.rotation.x);
      lines.rotation.copy(particles.rotation);

      for (let i = 0; i < particleCount; i += 1) {
        const velocity = particlesData[i].velocity;
        positionArray[i * 3] += velocity.x;
        positionArray[i * 3 + 1] += velocity.y;
        positionArray[i * 3 + 2] += velocity.z;

        if (Math.abs(positionArray[i * 3]) > 500) velocity.x *= -1;
        if (Math.abs(positionArray[i * 3 + 1]) > 390) velocity.y *= -1;
        if (Math.abs(positionArray[i * 3 + 2]) > 500) velocity.z *= -1;

        for (let j = i + 1; j < particleCount; j += 1) {
          const dx = positionArray[i * 3] - positionArray[j * 3];
          const dy = positionArray[i * 3 + 1] - positionArray[j * 3 + 1];
          const dz = positionArray[i * 3 + 2] - positionArray[j * 3 + 2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < 145) {
            linePositions[vertexPosition++] = positionArray[i * 3];
            linePositions[vertexPosition++] = positionArray[i * 3 + 1];
            linePositions[vertexPosition++] = positionArray[i * 3 + 2];
            linePositions[vertexPosition++] = positionArray[j * 3];
            linePositions[vertexPosition++] = positionArray[j * 3 + 1];
            linePositions[vertexPosition++] = positionArray[j * 3 + 2];
            connected += 1;
          }
        }
      }

      positionAttribute.needsUpdate = true;
      lineGeometry.setDrawRange(0, connected * 2);
      (lineGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative -mt-[3.75rem] flex min-h-[100dvh] flex-col overflow-hidden border-b border-teal-200/60 bg-[#f8fffd] pt-[3.75rem] text-zinc-900">
      <div
        ref={mountRef}
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-1000"
        style={{ opacity: isMounted ? 1 : 0 }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(at_50%_0%,rgba(204,251,241,0.95),transparent_54%),radial-gradient(at_10%_84%,rgba(209,250,229,0.65),transparent_42%),radial-gradient(at_92%_82%,rgba(207,250,254,0.7),transparent_44%)]" />
      <svg
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[38%] w-full text-teal-200/70"
        viewBox="0 0 1440 420"
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.path
          animate={{
            d: `M0 ${245 + waveOffset.y} C240 ${190 + waveOffset.x}, 420 ${315 - waveOffset.y}, 720 ${
              245 - waveOffset.x
            } C980 ${185 + waveOffset.y}, 1170 ${285 + waveOffset.x}, 1440 ${230 - waveOffset.y} L1440 420 L0 420 Z`,
          }}
          transition={{ type: 'spring', stiffness: 55, damping: 18 }}
          fill="currentColor"
        />
        <motion.path
          animate={{
            d: `M0 ${310 - waveOffset.y} C260 ${250 - waveOffset.x}, 460 ${365 + waveOffset.y}, 760 ${
              305 + waveOffset.x
            } C1030 ${245 - waveOffset.y}, 1210 ${330 - waveOffset.x}, 1440 ${292 + waveOffset.y}`,
          }}
          transition={{ type: 'spring', stiffness: 45, damping: 20 }}
          fill="none"
          stroke="rgba(13,148,136,0.28)"
          strokeWidth="3"
        />
      </svg>
      <div className="dot-pattern pointer-events-none absolute inset-0 opacity-20" />

      <div className="relative mx-auto flex w-full max-w-[92rem] flex-1 flex-col justify-center px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mx-auto w-full max-w-4xl text-center"
        >
          <div className="absolute left-1/2 top-8 h-72 w-72 -translate-x-1/2 rounded-full bg-teal-500 opacity-20 blur-[80px]" />
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mt-5 font-sans text-[clamp(3.75rem,10vw,7rem)] font-extrabold leading-none tracking-tight"
          >
            <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(13,148,136,0.25)]">
              Services
            </span>
          </motion.h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:mt-8 sm:text-lg">
            SK Creation helps professionals, creators, and small businesses move from confusion
            to clarity with practical AI integration, career strategy, digital solutions, book
            publishing guidance, business R&D strategy, and wellness education.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.12 }}
          className="mx-auto mt-8 grid w-full grid-cols-2 gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6"
        >
          {SERVICE_AREAS.map((area, i) => {
            const Icon = area.icon;
            return (
              <motion.a
                key={area.id}
                href={`#${area.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.18 + i * 0.06 }}
                className={`group relative flex min-h-[148px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/70 bg-white/60 p-3 text-center shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-2 sm:min-h-[170px] sm:rounded-3xl sm:p-5 ${accentRing[area.accent]}`}
              >
                <span
                  className={`absolute inset-0 bg-gradient-to-br ${accentGlow[area.accent]} to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  aria-hidden
                />
                <span className="relative z-10 mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-current shadow-sm transition-transform duration-300 group-hover:scale-110 sm:mb-5 sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5" strokeWidth={2.5} aria-hidden />
                </span>
                <span className="relative z-10 text-xs font-bold leading-snug text-zinc-800 sm:text-sm">
                  {area.navTitle}
                </span>
                <span className="relative z-10 mt-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-zinc-500 sm:mt-3 sm:text-[11px] sm:tracking-[0.2em]">
                  {area.navKicker}
                </span>
              </motion.a>
            );
          })}
        </motion.div>

        <motion.a
          href="#ai-integration"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -8, 0] }}
          transition={{
            opacity: { duration: 0.5, delay: 0.45 },
            y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="mx-auto mt-10 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-md transition hover:border-teal-400 hover:text-teal-700 hover:shadow-[0_8px_20px_rgba(13,148,136,0.15)]"
        >
          <Sparkles className="h-4 w-4" aria-hidden />
          Explore service paths
        </motion.a>
      </div>
    </section>
  );
}
