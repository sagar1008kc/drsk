'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type ThreeParticleBackgroundProps = {
  isLive?: boolean;
  className?: string;
};

export default function ThreeParticleBackground({
  isLive = false,
  className = 'absolute inset-0 z-0 pointer-events-none opacity-95',
}: ThreeParticleBackgroundProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf8f7ff, 0.028);

    const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 1000);
    camera.position.z = 14;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const particleCount = 200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];
    const palette = [
      new THREE.Color(0x8b5cf6),
      new THREE.Color(0x6366f1),
      new THREE.Color(0x06b6d4),
      new THREE.Color(0xf43f5e),
      new THREE.Color(0x4f46e5),
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 45;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 45;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 22;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      velocities.push({
        x: (Math.random() - 0.5) * 0.022,
        y: (Math.random() - 0.5) * 0.022,
        z: (Math.random() - 0.5) * 0.014,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particles = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        size: 0.16,
        vertexColors: true,
        transparent: true,
        opacity: 0.88,
        blending: THREE.NormalBlending,
      })
    );
    scene.add(particles);

    const lines = new THREE.LineSegments(
      new THREE.BufferGeometry(),
      new THREE.LineBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.14 })
    );
    scene.add(lines);

    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(2.8, 0.55, 100, 16),
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true, transparent: true, opacity: 0.07 })
    );
    scene.add(knot);

    const resize = () => {
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const speed = isLive ? 2.2 : 1;
      const pos = particles.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        pos[i * 3] += velocities[i].x * speed;
        pos[i * 3 + 1] += velocities[i].y * speed;
        pos[i * 3 + 2] += velocities[i].z * speed;
        if (Math.abs(pos[i * 3]) > 22) velocities[i].x *= -1;
        if (Math.abs(pos[i * 3 + 1]) > 22) velocities[i].y *= -1;
        if (Math.abs(pos[i * 3 + 2]) > 11) velocities[i].z *= -1;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      const linePos: number[] = [];
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = pos[i * 3] - pos[j * 3];
          const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
          const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
          if (dx * dx + dy * dy + dz * dz < 14) {
            linePos.push(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2], pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]);
          }
        }
      }
      lines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));

      knot.rotation.x += 0.002 * speed;
      knot.rotation.y += 0.003 * speed;
      scene.rotation.y += 0.0008 * speed;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      ro.disconnect();
      cancelAnimationFrame(frameId);
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement);
      geometry.dispose();
      particles.material.dispose();
      lines.geometry.dispose();
      lines.material.dispose();
      knot.geometry.dispose();
      (knot.material as THREE.Material).dispose();
      renderer.dispose();
    };
  }, [isLive]);

  return <div ref={mountRef} className={className} aria-hidden />;
}
