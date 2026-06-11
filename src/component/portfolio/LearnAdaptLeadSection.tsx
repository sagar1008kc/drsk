'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type WaveLine = {
  mesh: THREE.Line;
  baseZ: number;
};

function getWaveConfig() {
  if (typeof window === 'undefined') {
    return { linesCount: 60, pointsPerLine: 90, width: 1200, depth: 1200 };
  }
  const mobile = window.matchMedia('(max-width: 768px)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    return { linesCount: 28, pointsPerLine: 40, width: 900, depth: 900 };
  }
  if (mobile) {
    return { linesCount: 36, pointsPerLine: 48, width: 1000, depth: 1000 };
  }
  return { linesCount: 72, pointsPerLine: 100, width: 1200, depth: 1200 };
}

function LearnAdaptLeadWave() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const config = getWaveConfig();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020202);
    scene.fog = new THREE.FogExp2(0x020202, 0.0015);

    const camera = new THREE.PerspectiveCamera(60, 1, 1, 2000);
    camera.position.set(0, 250, 450);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const waveGroup = new THREE.Group();
    scene.add(waveGroup);

    const waveLines: WaveLine[] = [];
    const raycaster = new THREE.Raycaster();
    const virtualPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const intersectPoint = new THREE.Vector3(0, 0, 0);

    const cWhite = new THREE.Color(0xdddddd);
    const cBlue = new THREE.Color(0x3b82f6);
    const cGreen = new THREE.Color(0x10b981);

    const pointer = new THREE.Vector2(0, 0);
    const smoothedPointer = new THREE.Vector2(0, 0);

    for (let i = 0; i < config.linesCount; i++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(config.pointsPerLine * 3);
      const colors = new Float32Array(config.pointsPerLine * 3);
      const z = (i / config.linesCount - 0.5) * config.depth;

      for (let j = 0; j < config.pointsPerLine; j++) {
        const x = (j / config.pointsPerLine - 0.5) * config.width;
        positions[j * 3] = x;
        positions[j * 3 + 1] = 0;
        positions[j * 3 + 2] = z;

        const mixX = j / config.pointsPerLine;
        const mixZ = i / config.linesCount;
        const color = new THREE.Color();
        color.lerpColors(cWhite, cBlue, mixX);
        color.lerp(cGreen, mixZ * 0.8);
        colors[j * 3] = color.r;
        colors[j * 3 + 1] = color.g;
        colors[j * 3 + 2] = color.b;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const material = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const line = new THREE.Line(geometry, material);
      waveLines.push({ mesh: line, baseZ: z });
      waveGroup.add(line);
    }

    let visible = false;
    let animating = false;
    let animationFrameId = 0;

    const updatePointerFromEvent = (clientX: number, clientY: number) => {
      if (!visible) return;
      const rect = container.getBoundingClientRect();
      const inBounds =
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom;
      if (!inBounds) return;

      const x = clientX - rect.left;
      const y = clientY - rect.top;
      pointer.x = (x / rect.width) * 2 - 1;
      pointer.y = -(y / rect.height) * 2 + 1;
    };

    const onPointerMove = (e: PointerEvent) => {
      updatePointerFromEvent(e.clientX, e.clientY);
    };

    const renderFrame = () => {
      const time = performance.now() * 0.001;

      smoothedPointer.x += (pointer.x - smoothedPointer.x) * 0.05;
      smoothedPointer.y += (pointer.y - smoothedPointer.y) * 0.05;

      if (!reducedMotion) {
        camera.position.x = smoothedPointer.x * 120;
        camera.position.z = 450 + smoothedPointer.y * 60;
        camera.lookAt(0, 0, 0);

        raycaster.setFromCamera(smoothedPointer, camera);
        const intersection = raycaster.ray.intersectPlane(virtualPlane, new THREE.Vector3());
        if (intersection) {
          intersectPoint.lerp(intersection, 0.1);
        } else {
          intersectPoint.lerp(new THREE.Vector3(0, 0, 1000), 0.02);
        }

        waveLines.forEach((wave) => {
          const positions = wave.mesh.geometry.attributes.position.array as Float32Array;
          const baseZ = wave.baseZ;

          for (let j = 0; j < config.pointsPerLine; j++) {
            const x = (j / config.pointsPerLine - 0.5) * config.width;
            let y =
              Math.sin(x * 0.008 + time) * 15 +
              Math.cos(baseZ * 0.01 + time * 1.2) * 15 +
              Math.sin((x + baseZ) * 0.005 - time) * 10;

            const distX = x - intersectPoint.x;
            const distZ = baseZ - intersectPoint.z;
            const dist = Math.sqrt(distX * distX + distZ * distZ);
            const influenceRadius = 220;
            if (dist < influenceRadius) {
              const influence = 1 - dist / influenceRadius;
              y += Math.sin(dist * 0.04 - time * 6) * (30 * Math.pow(influence, 2));
            }

            positions[j * 3 + 1] = y;
          }

          wave.mesh.geometry.attributes.position.needsUpdate = true;
        });

        waveGroup.rotation.y = Math.sin(time * 0.1) * 0.05;
      }

      renderer.render(scene, camera);
    };

    const animate = () => {
      if (!visible) {
        animating = false;
        return;
      }
      animationFrameId = requestAnimationFrame(animate);
      renderFrame();
    };

    const startAnimation = () => {
      if (animating) return;
      animating = true;
      animate();
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          renderFrame();
          startAnimation();
        }
      },
      { threshold: 0.08 }
    );
    visibilityObserver.observe(container);

    const handleResize = () => {
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    document.addEventListener('pointermove', onPointerMove, { passive: true });

    renderFrame();

    return () => {
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(animationFrameId);

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      waveLines.forEach((w) => {
        w.mesh.geometry.dispose();
        (w.mesh.material as THREE.Material).dispose();
      });
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" aria-hidden />;
}

export default function LearnAdaptLeadSection() {
  return (
    <section
      id="learn-adapt-lead"
      aria-labelledby="learn-adapt-lead-heading"
      className="relative min-h-[100dvh] w-full overflow-hidden bg-[#020202] select-none"
    >
      <LearnAdaptLeadWave />

      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center p-5 sm:p-8">
        <h2
          id="learn-adapt-lead-heading"
          className="flex flex-col items-center gap-1 text-center text-[clamp(2.25rem,11vw,5.5rem)] font-black uppercase leading-[1.05] tracking-tight sm:gap-2 md:flex-row md:gap-6 lg:gap-8 lg:text-8xl xl:text-9xl"
        >
          <span className="drsk-learn-word drsk-learn-white">Learn.</span>
          <span className="drsk-learn-word drsk-learn-blue">Adapt.</span>
          <span className="drsk-learn-word drsk-learn-green">Lead.</span>
        </h2>

        <p className="drsk-learn-subtitle mt-6 max-w-4xl px-2 text-center text-[clamp(0.9rem,3.5vw,1.35rem)] font-light leading-relaxed tracking-wide text-white/70 sm:mt-8 sm:text-lg md:text-xl lg:text-2xl">
          Nobody is perfect — but growth begins when we stay curious, open-minded, and ready to{' '}
          <span className="font-medium text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">learn</span>,{' '}
          <span className="font-medium text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]">apply</span>, and{' '}
          <span className="font-medium text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]">lead</span>.
        </p>
      </div>
    </section>
  );
}
