'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type ParticleWaveVariant = 'light-interactive' | 'monochrome' | 'colorful' | 'brand';

type ParticleWaveBackgroundProps = {
  variant: ParticleWaveVariant;
  className?: string;
};

type VariantConfig = {
  bg: number;
  fog: number;
  separation: number;
  particleSize: number;
  particleOpacity: number;
  cameraY: number;
  cameraBaseY: number;
  mouseScale: number;
  waveAmplitude: number;
  waveSpeed: number;
  rotationSpeed: number;
  interactive: boolean;
  additiveBlend: boolean;
  colored: boolean;
  hueBase?: number;
  hueSpreadX?: number;
  hueSpreadY?: number;
  saturation?: number;
  lightness?: number;
  solidColor?: number;
  palette?: number[];
};

const VARIANTS: Record<ParticleWaveVariant, VariantConfig> = {
  'light-interactive': {
    bg: 0xf8fafc,
    fog: 0.025,
    separation: 1.6,
    particleSize: 0.35,
    particleOpacity: 0.8,
    cameraY: 18,
    cameraBaseY: 18,
    mouseScale: 0.05,
    waveAmplitude: 2,
    waveSpeed: 0.05,
    rotationSpeed: 0.0005,
    interactive: true,
    additiveBlend: false,
    colored: true,
    hueBase: 0.35,
    hueSpreadX: 0.15,
    hueSpreadY: 0.15,
    saturation: 0.85,
    lightness: 0.4,
  },
  monochrome: {
    bg: 0x0a0a0c,
    fog: 0.025,
    separation: 1.2,
    particleSize: 0.15,
    particleOpacity: 0.8,
    cameraY: 15,
    cameraBaseY: 15,
    mouseScale: 0.05,
    waveAmplitude: 2,
    waveSpeed: 0.05,
    rotationSpeed: 0,
    interactive: false,
    additiveBlend: false,
    colored: false,
    solidColor: 0xaaaaaa,
  },
  colorful: {
    bg: 0x050508,
    fog: 0.02,
    separation: 1.5,
    particleSize: 0.25,
    particleOpacity: 0.9,
    cameraY: 15,
    cameraBaseY: 12,
    mouseScale: 0.08,
    waveAmplitude: 3,
    waveSpeed: 0.04,
    rotationSpeed: 0.001,
    interactive: false,
    additiveBlend: true,
    colored: true,
    hueBase: 0.5,
    hueSpreadX: 0.3,
    hueSpreadY: 0.2,
    saturation: 0.9,
    lightness: 0.6,
  },
  brand: {
    bg: 0x050810,
    fog: 0.02,
    separation: 1.5,
    particleSize: 0.25,
    particleOpacity: 0.85,
    cameraY: 15,
    cameraBaseY: 12,
    mouseScale: 0.08,
    waveAmplitude: 3,
    waveSpeed: 0.04,
    rotationSpeed: 0.001,
    interactive: false,
    additiveBlend: true,
    colored: true,
    palette: [0x0d9488, 0x14b8a6, 0x0f766e, 0x2dd4bf, 0x06b6d4],
  },
};

function getGridSize() {
  if (typeof window === 'undefined') return 100;
  const mobile = window.matchMedia('(max-width: 768px)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return 60;
  return mobile ? 72 : 100;
}

export default function ParticleWaveBackground({
  variant,
  className = 'pointer-events-none absolute inset-0 z-0',
}: ParticleWaveBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const config = VARIANTS[variant];
    const amountX = getGridSize();
    const amountY = getGridSize();
    const numParticles = amountX * amountY;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const bgColor = new THREE.Color(config.bg);
    scene.background = bgColor;
    scene.fog = new THREE.FogExp2(bgColor, config.fog);

    const camera = new THREE.PerspectiveCamera(75, 1, 1, 500);
    camera.position.set(0, config.cameraY, 30);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(numParticles * 3);
    const colors = config.colored ? new Float32Array(numParticles * 3) : null;
    const color = new THREE.Color();

    let i = 0;
    for (let ix = 0; ix < amountX; ix++) {
      for (let iy = 0; iy < amountY; iy++) {
        positions[i] = ix * config.separation - (amountX * config.separation) / 2;
        positions[i + 1] = 0;
        positions[i + 2] = iy * config.separation - (amountY * config.separation) / 2;

        if (colors) {
          if (config.palette?.length) {
            color.setHex(config.palette[(ix + iy) % config.palette.length]);
          } else {
            const hue =
              (config.hueBase ?? 0) +
              (ix / amountX) * (config.hueSpreadX ?? 0) +
              (iy / amountY) * (config.hueSpreadY ?? 0);
            color.setHSL(hue, config.saturation ?? 0.8, config.lightness ?? 0.5);
          }
          colors[i] = color.r;
          colors[i + 1] = color.g;
          colors[i + 2] = color.b;
        }

        i += 3;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    if (colors) {
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    }

    const material = new THREE.PointsMaterial({
      size: config.particleSize,
      vertexColors: config.colored,
      color: config.colored ? undefined : config.solidColor,
      transparent: true,
      opacity: config.particleOpacity,
      blending: config.additiveBlend ? THREE.AdditiveBlending : THREE.NormalBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);
    const targetPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const intersectionPoint = new THREE.Vector3();

    let mouseX = 0;
    let mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    let count = 0;
    let visible = false;
    let animating = false;
    let animationFrameId = 0;

    const onPointerMove = (event: PointerEvent) => {
      if (!visible) return;

      const rect = container.getBoundingClientRect();
      const inBounds =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;

      if (config.interactive && inBounds) {
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        mouse.x = (x / rect.width) * 2 - 1;
        mouse.y = -(y / rect.height) * 2 + 1;
      }

      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * config.mouseScale;
      mouseY = (event.clientY - windowHalfY) * config.mouseScale;
    };

    const updateWave = () => {
      const positionsAttr = particles.geometry.attributes.position;
      const positionsArr = positionsAttr.array as Float32Array;

      if (config.interactive) {
        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.intersectPlane(targetPlane, intersectionPoint);
      }

      let idx = 0;
      for (let ix = 0; ix < amountX; ix++) {
        for (let iy = 0; iy < amountY; iy++) {
          const px = positionsArr[idx];
          const pz = positionsArr[idx + 2];

          let yPos =
            Math.sin((ix + count) * 0.3) * config.waveAmplitude +
            Math.sin((iy + count) * 0.5) * config.waveAmplitude;

          if (config.interactive) {
            const dx = px - intersectionPoint.x;
            const dz = pz - intersectionPoint.z;
            const distance = Math.sqrt(dx * dx + dz * dz);
            if (distance < 12) {
              yPos += Math.pow(1 - distance / 12, 2) * 6;
            }
          }

          positionsArr[idx + 1] = yPos;
          idx += 3;
        }
      }
      positionsAttr.needsUpdate = true;
    };

    const renderFrame = () => {
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY + config.cameraBaseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      if (!reducedMotion) {
        updateWave();
        if (config.rotationSpeed) {
          particles.rotation.y += config.rotationSpeed;
        }
        count += config.waveSpeed;
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

    document.addEventListener('pointermove', onPointerMove, { passive: true });

    const handleResize = () => {
      const { clientWidth, clientHeight } = container;
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    renderFrame();
    if (visible) startAnimation();

    return () => {
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      document.removeEventListener('pointermove', onPointerMove);
      cancelAnimationFrame(animationFrameId);

      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [variant]);

  return <div ref={mountRef} className={className} aria-hidden />;
}
