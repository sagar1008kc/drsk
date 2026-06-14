'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import type { ProjectAccent } from '@/lib/projects';

const ACCENT_HEX: Record<ProjectAccent, [number, number]> = {
  violet: [0x8b5cf6, 0x6366f1],
  blue: [0x3b82f6, 0x2563eb],
  indigo: [0x6366f1, 0x4f46e5],
  emerald: [0x10b981, 0x06b6d4],
  amber: [0xf59e0b, 0xf97316],
  rose: [0xf43f5e, 0xec4899],
  cyan: [0x06b6d4, 0x0ea5e9],
};

type ThreeProjectCardCanvasProps = {
  accent: ProjectAccent;
  className?: string;
};

export default function ThreeProjectCardCanvas({ accent, className = '' }: ThreeProjectCardCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const [primary, secondary] = ACCENT_HEX[accent];
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.06);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const particleCount = 55;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    const c1 = new THREE.Color(primary);
    const c2 = new THREE.Color(secondary);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const mix = Math.random();
      const color = c1.clone().lerp(c2, mix);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      velocities.push({
        x: (Math.random() - 0.5) * 0.018,
        y: (Math.random() - 0.5) * 0.018,
        z: (Math.random() - 0.5) * 0.012,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: primary,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    const lineGeometry = new THREE.BufferGeometry();
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    const wireGeo = new THREE.IcosahedronGeometry(2.2, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: primary,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireMesh);

    let visible = true;
    let animationFrameId = 0;

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      if (clientWidth === 0 || clientHeight === 0) return;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!visible) return;

      const posArray = particles.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += velocities[i].x;
        posArray[i * 3 + 1] += velocities[i].y;
        posArray[i * 3 + 2] += velocities[i].z;

        if (Math.abs(posArray[i * 3]) > 7) velocities[i].x *= -1;
        if (Math.abs(posArray[i * 3 + 1]) > 5) velocities[i].y *= -1;
        if (Math.abs(posArray[i * 3 + 2]) > 4) velocities[i].z *= -1;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      const linePositions: number[] = [];
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          if (dx * dx + dy * dy + dz * dz < 8) {
            linePositions.push(
              posArray[i * 3],
              posArray[i * 3 + 1],
              posArray[i * 3 + 2],
              posArray[j * 3],
              posArray[j * 3 + 1],
              posArray[j * 3 + 2]
            );
          }
        }
      }
      lines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

      wireMesh.rotation.x += 0.003;
      wireMesh.rotation.y += 0.004;
      particles.rotation.y += 0.0015;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      renderer.dispose();
    };
  }, [accent]);

  return <div ref={mountRef} className={`absolute inset-0 ${className}`} aria-hidden />;
}
