'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function SpaceForGrowth() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030303, 0.012);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const mount = mountRef.current;
    if (mount) {
      mount.appendChild(renderer.domElement);
    }

    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x050505,
      roughness: 0.1,
      metalness: 0.5,
    });
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.8,
      metalness: 0.2,
    });
    const doorMaterial = new THREE.MeshStandardMaterial({
      color: 0x151515,
      roughness: 0.7,
      metalness: 0.3,
    });

    const floorGeo = new THREE.PlaneGeometry(100, 300);
    const floor = new THREE.Mesh(floorGeo, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0;
    floor.receiveShadow = true;
    scene.add(floor);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.05);
    scene.add(ambientLight);

    const frontLight = new THREE.PointLight(0xffffff, 0.3, 20);
    frontLight.position.set(0, 5, 5);
    scene.add(frontLight);

    function createDoorway(x: number, z: number, isOpen: boolean, glowColorStr: number | null) {
      const group = new THREE.Group();
      group.position.set(x, 0, z);

      const doorWidth = 3;
      const doorHeight = 5.5;
      const frameDepth = 0.5;
      const frameThickness = 0.3;

      const leftFrameGeo = new THREE.BoxGeometry(frameThickness, doorHeight, frameDepth);
      const leftFrame = new THREE.Mesh(leftFrameGeo, frameMaterial);
      leftFrame.position.set(-doorWidth / 2 - frameThickness / 2, doorHeight / 2, 0);
      leftFrame.castShadow = true;
      leftFrame.receiveShadow = true;
      group.add(leftFrame);

      const rightFrameGeo = new THREE.BoxGeometry(frameThickness, doorHeight, frameDepth);
      const rightFrame = new THREE.Mesh(rightFrameGeo, frameMaterial);
      rightFrame.position.set(doorWidth / 2 + frameThickness / 2, doorHeight / 2, 0);
      rightFrame.castShadow = true;
      rightFrame.receiveShadow = true;
      group.add(rightFrame);

      const topFrameGeo = new THREE.BoxGeometry(doorWidth + frameThickness * 2, frameThickness, frameDepth);
      const topFrame = new THREE.Mesh(topFrameGeo, frameMaterial);
      topFrame.position.set(0, doorHeight + frameThickness / 2, 0);
      topFrame.castShadow = true;
      topFrame.receiveShadow = true;
      group.add(topFrame);

      const doorGeo = new THREE.BoxGeometry(doorWidth, doorHeight, 0.1);
      const doorPivot = new THREE.Group();
      doorPivot.position.set(-doorWidth / 2, doorHeight / 2, 0);

      const doorMesh = new THREE.Mesh(doorGeo, doorMaterial);
      doorMesh.position.set(doorWidth / 2, 0, 0);
      doorMesh.castShadow = true;
      doorMesh.receiveShadow = true;

      doorPivot.add(doorMesh);
      group.add(doorPivot);

      if (isOpen && glowColorStr !== null) {
        doorPivot.rotation.y = -Math.PI * 0.45;
        const glowColor = new THREE.Color(glowColorStr);
        const glowGeo = new THREE.PlaneGeometry(doorWidth, doorHeight);
        const glowMat = new THREE.MeshBasicMaterial({ color: glowColor });
        const glowMesh = new THREE.Mesh(glowGeo, glowMat);
        glowMesh.position.set(0, doorHeight / 2, -0.5);
        group.add(glowMesh);

        const roomLight = new THREE.PointLight(glowColor, 2, 40);
        roomLight.position.set(0, doorHeight / 2, -2);
        roomLight.castShadow = true;
        roomLight.shadow.bias = -0.001;
        group.add(roomLight);
      } else {
        const spotlight = new THREE.SpotLight(0xffffff, 0.4);
        spotlight.position.set(0, doorHeight, 3);
        spotlight.target = doorPivot;
        spotlight.angle = Math.PI / 4;
        spotlight.penumbra = 0.5;
        spotlight.castShadow = true;
        group.add(spotlight);
      }

      scene.add(group);
      return group;
    }

    createDoorway(-2, -2, false, null);
    createDoorway(3, -25, true, 0x4488ff);
    createDoorway(-4, -45, true, 0xffaa44);
    createDoorway(5, -65, true, 0x44ff88);
    createDoorway(-3, -85, true, 0xaa44ff);
    createDoorway(4, -110, true, 0x88ccff);
    createDoorway(-5, -140, true, 0xffbb88);

    function createHUDText() {
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        throw new Error('Could not get 2D canvas context');
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.textBaseline = 'middle';

      ctx.textAlign = 'center';
      ctx.font = '600 32px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#5599ff';
      ctx.shadowColor = 'rgba(85, 153, 255, 0.8)';
      ctx.shadowBlur = 15;
      ctx.fillText('FEELING STUCK OR NOT GETTING WHAT YOU DESERVE?', 1024, 250);

      ctx.font = '400 52px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
      ctx.shadowBlur = 20;
      ctx.fillText('Your next opportunity should do more than open a door—', 1024, 400);
      ctx.fillText('it should create space for', 1024, 500);

      ctx.font = '800 60px system-ui, -apple-system, sans-serif';

      const words = [
        { text: 'GROWTH', color: '#4488ff' },
        { text: '  •  ', color: '#ffffff' },
        { text: 'CONFIDENCE', color: '#44ff88' },
        { text: '  •  ', color: '#ffffff' },
        { text: 'PURPOSE', color: '#ffaa44' },
        { text: '  •  ', color: '#ffffff' },
        { text: 'IMPACT', color: '#aa44ff' },
      ];

      let totalWidth = 0;
      words.forEach((w) => {
        totalWidth += ctx.measureText(w.text).width;
      });

      let startX = 1024 - totalWidth / 2;
      ctx.textAlign = 'left';

      words.forEach((w) => {
        ctx.fillStyle = w.color;
        ctx.shadowColor = w.color;
        ctx.shadowBlur = w.text.trim() === '•' ? 0 : 30;
        ctx.fillText(w.text, startX, 680);
        startX += ctx.measureText(w.text).width;
      });

      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      const material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 1,
        depthTest: false,
        blending: THREE.AdditiveBlending,
      });

      const geometry = new THREE.PlaneGeometry(14, 7);
      const mesh = new THREE.Mesh(geometry, material);

      mesh.position.set(0, 0.2, -6);
      camera.add(mesh);

      return mesh;
    }

    const textMesh = createHUDText();

    const particleCount = 1500;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 40;
      particlePos[i + 1] = Math.random() * 10;
      particlePos[i + 2] = (Math.random() - 1) * 150;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.05,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 3;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        mouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
      }
    };

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('resize', onWindowResize);

    const clock = new THREE.Clock();
    let animationFrameId = 0;

    const SCENE_DURATION = 5.0;
    const START_Z = 12;
    const END_Z = -5;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      let progress = Math.min(elapsedTime / SCENE_DURATION, 1.0);
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      camera.position.z = START_Z - (START_Z - END_Z) * easeProgress;

      targetX = mouseX * 1.5;
      targetY = 3 + mouseY * 0.5;
      camera.position.x += (targetX - camera.position.x) * 0.02;
      camera.position.y += (targetY - camera.position.y) * 0.02;
      camera.lookAt(camera.position.x, 3, camera.position.z - 10);

      const aspect = camera.aspect;
      const responsiveMultiplier = aspect < 1 ? aspect * 1.15 : 0.85;
      const introScale = 0.75 + easeProgress * 0.25;
      const breathingPulse = Math.sin(elapsedTime * 2.5) * 0.015;
      const finalScale = (introScale + breathingPulse) * responsiveMultiplier;
      textMesh.scale.set(finalScale, finalScale, finalScale);
      textMesh.position.y = 0.2 + Math.sin(elapsedTime * 1.5) * 0.05;

      const positions = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += Math.sin(elapsedTime * 0.5 + positions[i - 1]) * 0.002;
        if (positions[i] > 10) positions[i] = 0;
        if (positions[i + 1] > camera.position.z + 10) positions[i + 1] -= 150;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onWindowResize);
      cancelAnimationFrame(animationFrameId);

      if (mount && renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }

      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#030303]">
      <div ref={mountRef} className="absolute inset-0 z-0 cursor-move" />
    </div>
  );
}
