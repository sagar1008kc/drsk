'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import {
  Bell,
  Bot,
  Brain,
  CheckCircle2,
  Database,
  DollarSign,
  GitMerge,
  PieChart,
  Play,
  UserCheck,
  Wrench,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';
import AgenticDataFlipbookModal from '@/component/portfolio/AgenticDataFlipbookModal';
import HitlBookShowcaseModal from '@/component/portfolio/HitlBookShowcaseModal';

function getWaveGridSize() {
  if (typeof window === 'undefined') return { width: 50, depth: 50 };
  const mobile = window.matchMedia('(max-width: 768px)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return { width: 32, depth: 32 };
  if (mobile) return { width: 40, depth: 40 };
  return { width: 60, depth: 60 };
}

const BRAND_WAVE_PALETTE = [
  new THREE.Color(0x0d9488),
  new THREE.Color(0x14b8a6),
  new THREE.Color(0x0f766e),
  new THREE.Color(0x2dd4bf),
];

function AgenticWaveBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const { width, depth } = getWaveGridSize();
    const count = width * depth;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    let i = 0;
    for (let ix = 0; ix < width; ix++) {
      for (let iz = 0; iz < depth; iz++) {
        positions[i * 3] = ix * 0.5 - (width * 0.5) / 2;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = iz * 0.5 - (depth * 0.5) / 2;
        scales[i] = 1;

        const waveColor = BRAND_WAVE_PALETTE[(ix + iz) % BRAND_WAVE_PALETTE.length];
        colors[i * 3] = waveColor.r;
        colors[i * 3 + 1] = waveColor.g;
        colors[i * 3 + 2] = waveColor.b;
        i++;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      vertexColors: true,
      size: 0.14,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.y = 8;
    camera.position.z = 15;
    camera.rotation.x = -0.4;

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    let time = 0;
    let visible = false;
    let animating = false;
    let animationFrameId = 0;

    const onPointerMove = (event: PointerEvent) => {
      if (!visible) return;
      mouseX = event.clientX - windowHalfX;
      mouseY = event.clientY - windowHalfY;
    };

    const renderFrame = () => {
      if (!reducedMotion) {
        targetX = mouseX * 0.003;
        targetY = mouseY * 0.003;
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (-targetY + 8 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        time += 0.05;
        const posArray = particles.geometry.attributes.position.array as Float32Array;
        let index = 0;
        for (let ix = 0; ix < width; ix++) {
          for (let iz = 0; iz < depth; iz++) {
            posArray[index * 3 + 1] =
              Math.sin((ix + time) * 0.2) * 1.5 + Math.cos((iz + time) * 0.2) * 1.5;
            index++;
          }
        }
        particles.geometry.attributes.position.needsUpdate = true;
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
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
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
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-85"
      aria-hidden
    />
  );
}

function FloatingPanel({
  children,
  title,
  summary,
  href,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  title: string;
  summary?: string;
  href?: string;
  delay?: number;
  className?: string;
}) {
  const body = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, backgroundColor: 'rgba(15, 23, 42, 0.8)' }}
      className="h-full rounded-xl border border-cyan-500/20 bg-slate-900/60 p-3 shadow-[0_0_15px_rgba(6,182,212,0.1)] backdrop-blur-md transition-colors hover:border-cyan-400/50 sm:p-4"
    >
      <div className="mb-2 flex items-center justify-between gap-2 sm:mb-3">
        <h3 className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400 sm:text-xs">
          {title}
        </h3>
        {href ? (
          <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-500">
            Deep dive →
          </span>
        ) : null}
      </div>
      {children}
      {summary ? (
        <p className="mt-2 text-[10px] leading-relaxed text-slate-400 sm:text-[11px]">{summary}</p>
      ) : null}
    </motion.div>
  );

  if (!href) {
    return <div className={className}>{body}</div>;
  }

  return (
    <Link
      href={href}
      className={`block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050810] ${className}`}
      aria-label={`${title} — open operations deep dive`}
    >
      {body}
    </Link>
  );
}

function NavIcon({
  icon: Icon,
  label,
  delay,
  href,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  delay: number;
  href?: string;
  onClick?: () => void;
}) {
  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={`group flex shrink-0 flex-col items-center gap-1 sm:gap-2 ${href || onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 transition-all duration-300 group-hover:border-blue-400 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] sm:h-12 sm:w-12">
        <Icon className="h-3.5 w-3.5 text-slate-300 transition-colors group-hover:text-blue-400 sm:h-5 sm:w-5" />
      </div>
      <span className="text-[8px] font-medium uppercase tracking-widest text-slate-400 transition-colors group-hover:text-blue-300 sm:text-xs">
        {label}
      </span>
    </motion.div>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`Open ${label} deep dive`}
        className="shrink-0 rounded-full border-0 bg-transparent p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050810]"
      >
        {content}
      </button>
    );
  }

  if (!href) return content;

  const isInternal = href.startsWith('/');

  if (isInternal) {
    return (
      <Link
        href={href}
        aria-label={`Open ${label}`}
        className="shrink-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050810]"
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${label} demo in a new tab`}
      className="shrink-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050810]"
    >
      {content}
    </a>
  );
}

const SMART_AGENT_HREF = '/home/smart-agent';
const AGENTIC_TOOLS_HUB_HREF = '/home/agentic-tools-hub';
const ENTERPRISE_LLM_GUIDE_HREF = '/home/enterprise-llm-guide';

const TOP_NAV: Array<{
  icon: LucideIcon;
  label: string;
  delay: number;
  href?: string;
  action?: 'data-flipbook' | 'hitl-showcase';
}> = [
  { icon: Bot, label: 'Agents', delay: 0.1, href: SMART_AGENT_HREF },
  { icon: Wrench, label: 'Tools', delay: 0.2, href: AGENTIC_TOOLS_HUB_HREF },
  { icon: Brain, label: 'LLMs', delay: 0.3, href: ENTERPRISE_LLM_GUIDE_HREF },
  { icon: Database, label: 'Data', delay: 0.4, action: 'data-flipbook' },
  { icon: UserCheck, label: 'HITL', delay: 0.5, action: 'hitl-showcase' },
];

const MULTI_AGENT_WORKFLOW_MAP_HREF = '/home/multi-agent-workflow-map';
const RESOURCES_HREF = '/home/resources';
const OPERATIONS_HREF = '/home/agentic-operations';
const SYSTEM_DESIGN_HREF = '/home/agentic-ai-system-design';
const LIVE_PROJECTS_HREF = '/portfolio#live-projects';

export function AgenticWorkflowSystemDesign() {
  const [dataFlipbookOpen, setDataFlipbookOpen] = useState(false);
  const [hitlShowcaseOpen, setHitlShowcaseOpen] = useState(false);

  return (
    <section
      id="agentic-workflow-system-design"
      aria-labelledby="agentic-workflow-system-design-heading"
      className="relative flex min-h-[100dvh] scroll-mt-[3.75rem] flex-col justify-start gap-5 overflow-x-hidden bg-[#050810] px-3 pb-12 pt-5 font-sans text-slate-200 sm:gap-6 sm:px-6 sm:pb-14 sm:pt-8 lg:justify-between lg:gap-8 lg:px-8 lg:pb-10 lg:pt-10"
    >
      <AgenticWaveBackground />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(13,148,136,0.12)_0%,rgba(5,8,16,0.75)_80%)]" />

      {/* Top nav — centered on all breakpoints */}
      <div className="relative z-10 mx-auto w-full max-w-7xl shrink-0">
        <div className="hidden md:flex md:items-center md:gap-4">
          <div className="flex-1 border-t border-dashed border-slate-700/50" />
        </div>
        <div className="flex w-full items-start justify-center gap-3 px-1 sm:gap-8 md:gap-12">
          {TOP_NAV.map((item) => (
            <NavIcon
              key={item.label}
              icon={item.icon}
              label={item.label}
              delay={item.delay}
              href={item.href}
              onClick={
                item.action === 'data-flipbook'
                  ? () => setDataFlipbookOpen(true)
                  : item.action === 'hitl-showcase'
                    ? () => setHitlShowcaseOpen(true)
                    : undefined
              }
            />
          ))}
        </div>
        <div className="hidden md:mt-4 md:flex md:items-center md:gap-4">
          <div className="flex-1 border-t border-dashed border-slate-700/50" />
        </div>
      </div>

      {/* Main grid — center first on mobile; title block nudged up */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-grow grid-cols-1 items-start gap-3 sm:gap-6 lg:grid-cols-[1fr_2.5fr_1fr] lg:items-center">
        {/* Center hero — first on mobile */}
        <div className="order-1 flex flex-col items-center justify-start py-1 text-center sm:py-4 lg:order-2 lg:justify-center lg:py-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="z-20 -mt-1 flex flex-col items-center sm:-mt-2 lg:-mt-4"
          >
            <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.35em] text-cyan-400 sm:mb-2 sm:text-sm md:text-base md:tracking-[0.4em]">
              Learn. Adopt. Lead
            </p>
            <h2
              id="agentic-workflow-system-design-heading"
              className="mb-2 bg-gradient-to-b from-cyan-300 via-blue-500 to-blue-700 bg-clip-text text-[clamp(2.35rem,11vw,4.5rem)] font-black leading-[0.95] tracking-tighter text-transparent drop-shadow-[0_0_30px_rgba(59,130,246,0.4)] sm:mb-3 lg:text-7xl"
            >
              AGENTIC
              <br />
              WORKFLOWS
            </h2>
            <p className="mb-3 max-w-md text-xs leading-relaxed text-slate-400 sm:mb-4 sm:text-sm">
              Production agents need a control plane — observability, tracing, evaluation,
              monitoring, alerts, and cost — not just orchestration.
            </p>

            <div className="mb-3 flex flex-col items-center gap-2.5 sm:mb-4 sm:flex-row sm:flex-wrap sm:justify-center">
              <Link
                href={SYSTEM_DESIGN_HREF}
                className="group flex min-h-[44px] items-center gap-2 rounded-full border border-blue-400/50 bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-[0_0_15px_rgba(59,130,246,0.6)] transition hover:scale-105 hover:from-blue-500 hover:to-cyan-400 active:scale-95 sm:min-h-[48px] sm:px-8 sm:py-3 sm:text-sm"
              >
                <Play className="h-4 w-4 fill-white" aria-hidden />
                <span>View system design</span>
              </Link>
              <Link
                href={LIVE_PROJECTS_HREF}
                className="group flex min-h-[44px] items-center gap-2 rounded-full border border-teal-400/50 bg-teal-500/15 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-teal-100 shadow-[0_0_15px_rgba(13,148,136,0.28)] transition hover:scale-105 hover:border-teal-300/70 hover:bg-teal-500/25 hover:text-white active:scale-95 sm:min-h-[48px] sm:px-8 sm:py-3 sm:text-sm"
              >
                <span>Live projects</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </div>
          </motion.div>

          <div className="relative mx-auto mt-2 flex h-28 w-full max-w-md items-end justify-center sm:mt-4 sm:h-48">
            <motion.div
              initial={{ opacity: 0, x: -20, y: 10 }}
              whileInView={{ opacity: 1, x: 0, y: [0, -5, 0] }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 3, repeat: Infinity, repeatType: 'reverse' }}
              className="absolute bottom-14 left-0 max-w-[110px] rounded-2xl rounded-br-none border border-slate-600 bg-slate-800/80 p-2 text-left text-[10px] text-slate-200 shadow-lg backdrop-blur sm:bottom-24 sm:max-w-[150px] sm:p-3 sm:text-sm"
            >
              How can I help you lead today?
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20, y: -10 }}
              whileInView={{ opacity: 1, x: 0, y: [0, 5, 0] }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 3, repeat: Infinity, repeatType: 'reverse' }}
              className="absolute bottom-8 right-0 flex max-w-[110px] items-center gap-2 rounded-2xl rounded-bl-none border border-emerald-500/30 bg-emerald-900/40 p-2 text-left text-[10px] text-emerald-100 shadow-lg backdrop-blur sm:bottom-16 sm:max-w-[150px] sm:p-3 sm:text-sm"
            >
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400 sm:h-4 sm:w-4" aria-hidden />
              <span>Strategy optimized perfectly.</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="h-16 w-16 rounded-3xl bg-gradient-to-b from-blue-400 to-indigo-600 p-1 shadow-[0_0_40px_rgba(59,130,246,0.5)] sm:h-24 sm:w-24">
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-slate-900">
                  <div className="flex gap-2 sm:gap-3">
                    <motion.div
                      animate={{ scaleY: [1, 0.1, 1] }}
                      transition={{ repeat: Infinity, duration: 3, times: [0, 0.05, 0.1] }}
                      className="h-2 w-2.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,1)] sm:h-3 sm:w-4"
                    />
                    <motion.div
                      animate={{ scaleY: [1, 0.1, 1] }}
                      transition={{ repeat: Infinity, duration: 3, times: [0, 0.05, 0.1] }}
                      className="h-2 w-2.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,1)] sm:h-3 sm:w-4"
                    />
                  </div>
                  <div className="absolute bottom-1.5 h-1 w-5 rounded-full bg-blue-500/50 sm:bottom-3 sm:w-8" />
                </div>
              </div>
              <div className="relative mt-1 h-1.5 w-20 overflow-hidden rounded-t-lg bg-slate-400 sm:mt-2 sm:h-2 sm:w-32">
                <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-blue-400/0 via-blue-400/50 to-blue-400/0" />
              </div>
              <div className="flex h-2 w-28 justify-center rounded-b-xl border-t border-slate-500 bg-slate-700 shadow-2xl sm:h-3 sm:w-40">
                <div className="h-1 w-5 rounded-b-md bg-slate-900 sm:w-6" />
              </div>
            </motion.div>
          </div>
          <Link
            href={MULTI_AGENT_WORKFLOW_MAP_HREF}
            className="group mt-3 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-teal-400/45 bg-teal-500/10 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.18em] text-teal-100 shadow-[0_0_18px_rgba(13,148,136,0.22)] transition hover:scale-105 hover:border-teal-300/70 hover:bg-teal-500/20 hover:text-white sm:mt-4 sm:text-sm"
          >
            <Play className="h-4 w-4 fill-current" aria-hidden />
            <span>Visual Demo</span>
          </Link>
        </div>

        {/* Ops pillars — high-level signals; click through to operations deep dive */}
        <div className="order-2 hidden grid-cols-2 gap-3 sm:grid lg:order-1 lg:flex lg:flex-col lg:gap-4">
          <FloatingPanel
            title="Observability"
            delay={0.35}
            href={OPERATIONS_HREF}
            summary="Correlate every run: intent → agent → model → tools → outcome."
          >
            <div className="flex h-16 w-full items-end gap-1 sm:h-20">
              {[40, 70, 45, 90, 65, 85, 50, 100, 75].map((h, idx) => (
                <motion.div
                  key={idx}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + idx * 0.08, duration: 0.45 }}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-blue-600 to-cyan-400 opacity-80"
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between font-mono text-[10px] text-slate-400">
              <span>Trace coverage</span>
              <span className="text-cyan-300">100%</span>
            </div>
          </FloatingPanel>

          <FloatingPanel
            title="Tracing"
            delay={0.45}
            href={`${OPERATIONS_HREF}#tracing`}
            summary="Find the bottleneck: retrieval, TTFT, tool, or HITL wait."
            className="hidden sm:block"
          >
            <div className="flex items-center justify-center py-1">
              <GitMerge className="h-10 w-10 text-emerald-400 opacity-90 sm:h-12 sm:w-12" />
            </div>
            <div className="mt-1 flex justify-between font-mono text-[10px] text-slate-400">
              <span>Req #4492</span>
              <span className="text-emerald-400">0.45s · 4 hops</span>
            </div>
          </FloatingPanel>

          <FloatingPanel
            title="Evaluation"
            delay={0.55}
            href={`${OPERATIONS_HREF}#evaluation`}
            summary="Gate every prompt/model change with groundedness & safety scores."
            className="col-span-2 sm:col-span-1"
          >
            <div className="space-y-2">
              {[
                { label: 'Task success', width: '96%' },
                { label: 'Groundedness', width: '94%' },
                { label: 'Safety', width: '99%' },
              ].map((row, idx) => (
                <div key={row.label} className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-cyan-400" aria-hidden />
                  <div className="min-w-0 flex-1">
                    <div className="mb-0.5 flex justify-between text-[9px] text-slate-400">
                      <span>{row.label}</span>
                      <span className="font-mono text-cyan-300">{row.width}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded bg-slate-700">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: row.width }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + idx * 0.15 }}
                        className="h-full bg-cyan-400"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </FloatingPanel>
        </div>

        <div className="order-3 hidden grid-cols-2 gap-3 sm:grid lg:flex lg:flex-col lg:gap-4">
          <FloatingPanel
            title="Monitoring"
            delay={0.35}
            href={`${OPERATIONS_HREF}#monitoring`}
            summary="Live SLOs, queue depth, and provider health."
          >
            <div className="flex items-center gap-3 py-1">
              <PieChart className="h-9 w-9 text-blue-400 sm:h-10 sm:w-10" aria-hidden />
              <div className="flex-1 space-y-2">
                <div>
                  <div className="mb-0.5 flex justify-between text-[9px] text-slate-400">
                    <span>Uptime</span>
                    <span className="font-mono text-blue-300">99.95%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-700">
                    <div className="h-full w-[96%] rounded-full bg-blue-400" />
                  </div>
                </div>
                <div>
                  <div className="mb-0.5 flex justify-between text-[9px] text-slate-400">
                    <span>SLO burn</span>
                    <span className="font-mono text-cyan-300">Healthy</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-slate-700">
                    <div className="h-full w-[40%] rounded-full bg-cyan-400" />
                  </div>
                </div>
              </div>
            </div>
          </FloatingPanel>

          <FloatingPanel
            title="Alerts"
            delay={0.45}
            href={`${OPERATIONS_HREF}#alerts`}
            summary="Page on policy breaks, tool failures, and quality drops."
          >
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-rose-500/20 p-2">
                <Bell className="h-5 w-5 text-rose-400" aria-hidden />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-medium text-slate-200">Tool timeout spike</p>
                <p className="text-[10px] text-slate-500">Severity · page · MTTA 4m</p>
              </div>
              <div className="flex flex-col gap-1">
                <span className="h-2 w-2 animate-pulse rounded-full bg-rose-500" />
                <span className="h-2 w-2 rounded-full bg-amber-500" />
              </div>
            </div>
          </FloatingPanel>

          <FloatingPanel
            title="Cost Management"
            delay={0.55}
            href={`${OPERATIONS_HREF}#cost-management`}
            summary="Route, cache, and budget so every token earns its keep."
            className="col-span-2 sm:col-span-1"
          >
            <div className="flex h-12 items-end gap-2 sm:h-14">
              <div className="h-[40%] flex-1 rounded-t bg-slate-700" />
              <div className="h-[60%] flex-1 rounded-t bg-slate-600" />
              <div className="flex h-[90%] flex-1 items-start justify-center rounded-t bg-emerald-500 pt-1 shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                <DollarSign className="h-3 w-3 text-emerald-900" aria-hidden />
              </div>
              <div className="h-[50%] flex-1 rounded-t bg-slate-700" />
            </div>
            <div className="mt-2 flex justify-between font-mono text-[10px] text-slate-400">
              <span>$ / successful task</span>
              <span className="text-emerald-300">$0.018</span>
            </div>
          </FloatingPanel>
        </div>
      </div>

      {/* CTA → AI engineering resources — kept fully in-view on mobile */}
      <div className="relative z-10 mx-auto mt-6 flex w-full max-w-7xl shrink-0 flex-col items-center px-1 pb-2 sm:mt-8 sm:pb-0 lg:mt-auto">
        <Link
          href={RESOURCES_HREF}
          className="group inline-flex w-full max-w-lg flex-col items-center gap-2.5 rounded-2xl border border-teal-500/40 bg-[#06060f]/85 px-4 py-4 text-center shadow-[0_0_28px_rgba(13,148,136,0.18)] backdrop-blur-md transition hover:border-teal-400/55 hover:bg-teal-500/10 hover:shadow-[0_0_40px_-12px_rgba(13,148,136,0.55)] sm:max-w-full sm:gap-3 sm:px-8 sm:py-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-500/40 bg-teal-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-widest text-teal-300 sm:text-xs">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal-400" aria-hidden />
            Engineering Focus
          </span>
          <span className="text-xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
            AI-Native &amp;{' '}
            <span className="bg-gradient-to-r from-teal-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Agentic Engineering
            </span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-400/90 transition group-hover:text-teal-300 sm:text-sm">
            Explore resources →
          </span>
        </Link>
      </div>

      <AgenticDataFlipbookModal
        open={dataFlipbookOpen}
        onClose={() => setDataFlipbookOpen(false)}
      />
      <HitlBookShowcaseModal
        open={hitlShowcaseOpen}
        onClose={() => setHitlShowcaseOpen(false)}
      />
    </section>
  );
}
