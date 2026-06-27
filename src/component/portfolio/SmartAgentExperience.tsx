'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Particle = {
  x: number;
  y: number;
  char: string;
  speed: number;
  opacity: number;
  fontSize: number;
};

type Message = {
  role: 'user' | 'agent';
  text: string;
};

type AgentProfile = {
  codename: string;
  clearance: string;
  specialty: string;
  backstory: string;
};

type BountyData = {
  title: string;
  threatLevel: string;
  stack: string;
  brief: string;
};

function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = 0;
    let particles: Particle[] = [];
    const digits = '0123456789';

    const initParticles = () => {
      particles = [];
      const vw = canvas.width / 100;
      const padding = canvas.width < 768 ? 15 * vw : 35 * vw;
      const minX = padding;
      const maxX = canvas.width - padding;
      const activeArea = Math.max(1, (maxX - minX) * canvas.height);
      const count = Math.max(32, Math.floor(activeArea / 3000));

      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: minX + Math.random() * (maxX - minX),
          y: Math.random() * canvas.height,
          char: digits[Math.floor(Math.random() * digits.length)],
          speed: Math.random() * 1.5 + 0.2,
          opacity: Math.random() * 0.4 + 0.1,
          fontSize: Math.floor(Math.random() * 12) + 10,
        });
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const vw = canvas.width / 100;
      const padding = canvas.width < 768 ? 15 * vw : 35 * vw;
      const minX = padding;
      const maxX = canvas.width - padding;

      particles.forEach((particle) => {
        particle.x += particle.speed;
        particle.y += particle.speed;

        if (particle.x > maxX || particle.y > canvas.height) {
          if (Math.random() > 0.5) {
            particle.x = minX + Math.random() * (maxX - minX);
            particle.y = -20;
          } else {
            particle.x = minX - 20;
            particle.y = Math.random() * canvas.height;
          }
          particle.char = digits[Math.floor(Math.random() * digits.length)];
        }

        let currentOpacity = particle.opacity;
        const edgeDistance = 40;
        if (particle.x < minX + edgeDistance) {
          currentOpacity = particle.opacity * Math.max(0, (particle.x - minX) / edgeDistance);
        } else if (particle.x > maxX - edgeDistance) {
          currentOpacity = particle.opacity * Math.max(0, (maxX - particle.x) / edgeDistance);
        }

        ctx.font = `${particle.fontSize}px monospace`;
        ctx.fillStyle = `rgba(180, 200, 220, ${currentOpacity})`;
        ctx.fillText(particle.char, particle.x, particle.y);
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0 opacity-50" />;
}

function SponsorHeader() {
  return (
    <div className="z-10 flex w-full flex-col items-center space-y-6 px-4 pt-10">
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 text-sm text-gray-300 sm:text-base">
        <div className="text-xl font-bold tracking-tight text-white">AI Modal</div>
        <div className="font-mono text-lg tracking-widest text-white">&gt;commit</div>
        <div className="font-bold tracking-widest text-white">Gemini 2.5 Flash</div>
      </div>
      <div className="font-semibold text-white">SK Creation</div>
      <div className="mt-4 text-[0.65rem] tracking-[0.2em] text-gray-400">PRESENT</div>
    </div>
  );
}

function SmartAgentChat({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'agent',
      text:
        'SYSTEM ONLINE. I am the Smart Agent demo host. Ask about agents, workflow orchestration, tools, or how this production-safe demo works.',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (event?: React.FormEvent) => {
    event?.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text }]);
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 650));
    setMessages((prev) => [
      ...prev,
      {
        role: 'agent',
        text:
          'ACK. This local Smart Agent demo avoids exposing client-side API keys. In production, LLM calls should route through a server API with auth, rate limits, prompt logging, and safety controls.',
      },
    ]);
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="flex h-[70vh] max-h-[600px] w-full max-w-2xl flex-col rounded border border-teal-500/40 bg-[#0a0f12] font-mono shadow-[0_0_30px_rgba(45,212,191,0.15)]">
        <div className="flex items-center justify-between border-b border-teal-500/40 bg-teal-900/20 px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-teal-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-teal-400" />
            SMART_AGENT_TERMINAL
          </div>
          <button type="button" onClick={onClose} className="text-gray-400 transition hover:text-white">
            [X]
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4 text-sm">
          {messages.map((message, index) => (
            <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded border p-3 ${
                  message.role === 'user'
                    ? 'border-gray-700 bg-gray-800 text-gray-200'
                    : 'border-teal-900/50 bg-teal-950/40 text-teal-300'
                }`}
              >
                <div className="mb-1 text-xs opacity-50">{message.role === 'user' ? 'GUEST' : 'SYSTEM'}</div>
                <div className="whitespace-pre-wrap">{message.text}</div>
              </div>
            </div>
          ))}
          {isLoading ? (
            <div className="flex justify-start">
              <div className="rounded border border-teal-900/50 bg-teal-950/40 p-3 text-teal-300">
                <div className="flex h-4 items-center gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal-400" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal-400 [animation-delay:0.1s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal-400 [animation-delay:0.2s]" />
                </div>
              </div>
            </div>
          ) : null}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="flex gap-2 border-t border-teal-500/40 bg-black p-3">
          <span className="ml-2 font-bold text-teal-500">&gt;</span>
          <input
            type="text"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Query the system..."
            className="flex-1 bg-transparent text-sm text-teal-100 outline-none placeholder:text-teal-800"
            autoFocus
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="rounded border border-teal-800 px-3 py-1 text-xs text-teal-400 transition hover:bg-teal-900/30 disabled:opacity-50"
          >
            SEND
          </button>
        </form>
      </div>
    </div>
  );
}

function AgentIdGenerator({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [profile, setProfile] = useState<AgentProfile | null>(null);

  const profileSeed = `${name.trim()} ${role.trim()}`.trim();

  const handleGenerate = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !role.trim()) return;
    setProfile({
      codename: `${name.trim().split(/\s+/)[0] || 'Cipher'}-Node`,
      clearance: 'LEVEL 4',
      specialty: `${role.trim()} / Agentic Systems`,
      backstory: `${profileSeed} has been assigned to the SK Creation agent network. Their mission is to translate practical work into reliable AI-enabled workflows.`,
    });
  };

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
      <div className="w-full max-w-md overflow-hidden rounded border border-purple-500/40 bg-[#0a0f12] font-mono shadow-[0_0_30px_rgba(168,85,247,0.15)]">
        <div className="flex items-center justify-between border-b border-purple-500/40 bg-purple-900/20 px-4 py-2 text-sm text-purple-400">
          <span>// IDENTITY_EXTRACTION_PROTOCOLS</span>
          <button type="button" onClick={onClose} className="transition hover:text-white">[X]</button>
        </div>
        <div className="p-6">
          {!profile ? (
            <form onSubmit={handleGenerate} className="flex flex-col gap-4">
              <p className="text-sm text-gray-400">Enter credentials to extract your Smart Agent ID.</p>
              <input
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="border border-purple-900/50 bg-black/50 p-2 text-purple-100 outline-none transition focus:border-purple-500"
                placeholder="Known alias"
              />
              <input
                required
                value={role}
                onChange={(event) => setRole(event.target.value)}
                className="border border-purple-900/50 bg-black/50 p-2 text-purple-100 outline-none transition focus:border-purple-500"
                placeholder="Current directive / role"
              />
              <button type="submit" className="mt-2 border border-purple-500/50 bg-purple-900/40 px-4 py-2 text-purple-300 transition hover:bg-purple-600/40">
                INITIATE EXTRACTION
              </button>
            </form>
          ) : (
            <div className="rounded border border-purple-500/30 bg-purple-950/20 p-5">
              <div className="mb-1 text-[0.65rem] tracking-[0.2em] text-purple-500">CODENAME</div>
              <div className="mb-4 text-2xl font-black uppercase tracking-wider text-white">{profile.codename}</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-[0.6rem] tracking-[0.1em] text-purple-500">CLEARANCE</div>
                  <div className="text-purple-200">{profile.clearance}</div>
                </div>
                <div>
                  <div className="text-[0.6rem] tracking-[0.1em] text-purple-500">SPECIALTY</div>
                  <div className="text-purple-200">{profile.specialty}</div>
                </div>
              </div>
              <p className="mt-4 border-l-2 border-purple-500/50 pl-2 text-xs italic leading-relaxed text-gray-400">
                {profile.backstory}
              </p>
              <button type="button" onClick={() => setProfile(null)} className="mt-4 w-full text-center text-xs text-purple-400 transition hover:text-white">
                [ GENERATE NEW ID ]
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BountyGenerator({ onClose }: { onClose: () => void }) {
  const [idea, setIdea] = useState('');
  const [bounty, setBounty] = useState<BountyData | null>(null);

  const handleGenerate = (event: React.FormEvent) => {
    event.preventDefault();
    if (!idea.trim()) return;
    setBounty({
      title: 'Operation Practical Signal',
      threatLevel: 'HIGH VALUE',
      stack: 'Next.js / Agent API / Vector Search / Observability',
      brief: `Transform "${idea.trim()}" into a scoped AI workflow with clear tools, state, fallbacks, and measurable outcomes.`,
    });
  };

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
      <div className="w-full max-w-md overflow-hidden rounded border border-amber-500/40 bg-[#120a0a] font-mono shadow-[0_0_30px_rgba(245,158,11,0.15)]">
        <div className="flex items-center justify-between border-b border-amber-500/40 bg-amber-900/20 px-4 py-2 text-sm text-amber-400">
          <span>// BOUNTY_BOARD_UPLINK</span>
          <button type="button" onClick={onClose} className="transition hover:text-white">[X]</button>
        </div>
        <div className="p-6">
          {!bounty ? (
            <form onSubmit={handleGenerate} className="flex flex-col gap-4">
              <p className="text-sm text-gray-400">Upload a project idea to generate a workflow bounty.</p>
              <textarea
                required
                value={idea}
                onChange={(event) => setIdea(event.target.value)}
                className="h-24 resize-none border border-amber-900/50 bg-black/50 p-2 text-amber-100 outline-none transition focus:border-amber-500"
                placeholder="Describe your app or automation idea..."
              />
              <button type="submit" className="mt-2 border border-amber-500/50 bg-amber-900/40 px-4 py-2 text-amber-300 transition hover:bg-amber-600/40">
                TRANSMIT TO NETWORK
              </button>
            </form>
          ) : (
            <div className="rounded border border-amber-500/30 bg-amber-950/20 p-5">
              <div className="mb-1 text-[0.65rem] tracking-[0.2em] text-amber-500">OPERATION</div>
              <div className="mb-4 text-2xl font-black uppercase tracking-wider text-white">{bounty.title}</div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-[0.6rem] tracking-[0.1em] text-amber-500">THREAT LEVEL</div>
                  <div className="font-bold text-red-400">{bounty.threatLevel}</div>
                </div>
                <div>
                  <div className="text-[0.6rem] tracking-[0.1em] text-amber-500">REQ. STACK</div>
                  <div className="text-amber-200">{bounty.stack}</div>
                </div>
              </div>
              <p className="mt-4 border-l-2 border-amber-500/50 pl-2 text-xs italic leading-relaxed text-gray-400">
                {bounty.brief}
              </p>
              <button type="button" onClick={() => setBounty(null)} className="mt-4 w-full text-center text-xs text-amber-400 transition hover:text-white">
                [ TRANSMIT ANOTHER IDEA ]
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MainTitle({
  onOpenChat,
  onOpenIdGen,
  onOpenBounty,
}: {
  onOpenChat: () => void;
  onOpenIdGen: () => void;
  onOpenBounty: () => void;
}) {
  return (
    <div className="z-10 my-auto flex w-full flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-5xl font-black leading-[0.9] tracking-tighter text-white sm:text-7xl md:text-8xl lg:text-[7rem]">
        SMART
        <br />
        AGENT
      </h1>
      <h2 className="mb-8 mt-2 font-mono text-4xl lowercase tracking-wider text-teal-300 drop-shadow-[0_0_22px_rgba(45,212,191,0.45)] sm:text-5xl md:text-6xl">
        &lt;open source /&gt;
      </h2>
      <div className="mb-12 text-sm font-medium tracking-[0.3em] text-gray-300 md:text-base">Try Now</div>
      <div className="flex max-w-3xl flex-wrap justify-center gap-4">
        <button type="button" onClick={onOpenChat} className="rounded border border-teal-500/40 bg-teal-900/20 px-6 py-3 font-mono text-teal-300 shadow-[0_0_15px_rgba(45,212,191,0.2)] backdrop-blur-sm transition hover:border-teal-300 hover:bg-teal-500/30 hover:shadow-[0_0_25px_rgba(45,212,191,0.4)]">
          [ INITIATE CHAT ]
        </button>
        <button type="button" onClick={onOpenIdGen} className="rounded border border-purple-500/40 bg-purple-900/20 px-6 py-3 font-mono text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)] backdrop-blur-sm transition hover:border-purple-300 hover:bg-purple-500/30 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)]">
          [ EXTRACT AGENT ID ]
        </button>
        <button type="button" onClick={onOpenBounty} className="rounded border border-amber-500/40 bg-amber-900/20 px-6 py-3 font-mono text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.2)] backdrop-blur-sm transition hover:border-amber-300 hover:bg-amber-500/30 hover:shadow-[0_0_25px_rgba(245,158,11,0.4)]">
          [ UPLOAD BOUNTY ]
        </button>
      </div>
    </div>
  );
}

export default function SmartAgentExperience() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isIdGenOpen, setIsIdGenOpen] = useState(false);
  const [isBountyOpen, setIsBountyOpen] = useState(false);

  const modals = useMemo(
    () => ({
      chat: isChatOpen,
      id: isIdGenOpen,
      bounty: isBountyOpen,
    }),
    [isChatOpen, isIdGenOpen, isBountyOpen]
  );

  return (
    <main className="relative flex min-h-[calc(100dvh-3.75rem)] flex-col overflow-hidden bg-[#050505] font-sans text-white selection:bg-teal-500 selection:text-white">
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-black/80 via-transparent to-black/80" />
      <BackgroundAnimation />
      <div className="relative z-10 mx-auto flex min-h-[calc(100dvh-3.75rem)] h-full w-full max-w-7xl flex-col justify-between">
        <SponsorHeader />
        <MainTitle
          onOpenChat={() => setIsChatOpen(true)}
          onOpenIdGen={() => setIsIdGenOpen(true)}
          onOpenBounty={() => setIsBountyOpen(true)}
        />
      </div>
      {modals.chat ? <SmartAgentChat onClose={() => setIsChatOpen(false)} /> : null}
      {modals.id ? <AgentIdGenerator onClose={() => setIsIdGenOpen(false)} /> : null}
      {modals.bounty ? <BountyGenerator onClose={() => setIsBountyOpen(false)} /> : null}
    </main>
  );
}
