'use client';

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Bot,
  User,
  GitMerge,
  BrainCircuit,
  Briefcase,
  Home,
  ToyBrick,
  CalendarCheck,
  Database,
  CheckCircle2,
  Sparkles,
  Loader2,
  ExternalLink,
  type LucideIcon,
} from 'lucide-react';

type Message = {
  id: string;
  role: 'user' | 'agent' | 'system';
  content: string;
  agentId?: AgentType;
  cta?: { text: string; url: string };
  isFallback?: boolean;
};

type AgentType = 'router' | 'career' | 'realestate' | 'kids' | 'services' | null;
type FlowStep = 'idle' | 'analyzing' | 'routing' | 'retrieving' | 'generating' | 'complete';

type AgentKnowledge = {
  id: Exclude<AgentType, 'router' | null>;
  name: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
  borderColor: string;
  platform: string;
  keywords: string[];
  responses: string[];
  cta: { text: string; url: string };
};

const AGENT_KNOWLEDGE: Record<Exclude<AgentType, 'router' | null>, AgentKnowledge> = {
  career: {
    id: 'career',
    name: 'Career & Interview Agent',
    icon: Briefcase,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/50',
    platform: 'PilotMyCareer.com',
    keywords: ['career', 'interview', 'job', 'resume', 'pilot my career'],
    responses: [
      "I've accessed the PilotMyCareer database. For interview preparation, I recommend structuring your answers using the STAR method. Would you like me to pull up specific behavioral questions from our guide?",
      'Based on your career goals, I can provide a custom interview prep checklist from PilotMyCareer.com. Are you preparing for a technical or leadership role?',
    ],
    cta: { text: 'Visit PilotMyCareer', url: 'https://www.pilotmycareer.com/' },
  },
  realestate: {
    id: 'realestate',
    name: 'Real Estate Analyst',
    icon: Home,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/20',
    borderColor: 'border-emerald-500/50',
    platform: 'GetAuctionList.com',
    keywords: ['auction', 'foreclosure', 'texas', 'house', 'real estate'],
    responses: [
      "I've connected to GetAuctionList.com. Currently, there are multiple active foreclosure listings in the Texas region. Would you like me to filter these by specific counties like Travis or Harris?",
      "Retrieving Texas foreclosure data... I can guide you through the auction process. It's important to have proof of funds ready. Should I fetch the latest auction schedule?",
    ],
    cta: { text: 'View Texas Foreclosures', url: 'https://getauctionlist.com/' },
  },
  kids: {
    id: 'kids',
    name: 'Aviana Guide',
    icon: ToyBrick,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/50',
    platform: 'Aviana.com',
    keywords: ['kids', 'game', 'aviana', 'children', 'kids book'],
    responses: [
      "Navigating to Aviana.com! I found several interactive kids' books and educational games. Are you looking for a specific age group or learning topic?",
      "I've pulled up the latest interactive games and stories from Aviana. They are great for cognitive development! Would you like a link to our most popular children's book?",
    ],
    cta: { text: 'Explore Aviana Catalog', url: 'https://www.avianaa.com/' },
  },
  services: {
    id: 'services',
    name: 'SK Concierge',
    icon: CalendarCheck,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/20',
    borderColor: 'border-amber-500/50',
    platform: 'SK Creation Platform',
    keywords: ['book', 'session', '1:1', 'service', 'help', 'human', 'sk creation'],
    responses: [
      'I can certainly help you with that. For deeper guidance, I highly recommend booking a 1:1 session through our SK Creation Services page. Would you like me to check available calendar slots?',
      "I've retrieved our shared book links and service offerings. If you'd like a personalized deep-dive, I can route you to human-in-the-loop support or help you book a 1:1 session right now.",
    ],
    cta: { text: 'Book 1:1 Session', url: '/services' },
  },
};

const FALLBACK_REPLY =
  "I don't have an agent to work for this. Try something from the suggestions below.";

function resolveAgent(text: string): keyof typeof AGENT_KNOWLEDGE | null {
  const lowerText = text.toLowerCase();

  if (AGENT_KNOWLEDGE.career.keywords.some((k) => lowerText.includes(k))) return 'career';
  if (AGENT_KNOWLEDGE.realestate.keywords.some((k) => lowerText.includes(k))) return 'realestate';
  if (AGENT_KNOWLEDGE.services.keywords.some((k) => lowerText.includes(k))) return 'services';
  if (AGENT_KNOWLEDGE.kids.keywords.some((k) => lowerText.includes(k))) return 'kids';

  return null;
}

const ThreeBackground = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0f172a, 0.05);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const particleCount = 150;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 40;
      positions[i + 1] = (Math.random() - 0.5) * 40;
      positions[i + 2] = (Math.random() - 0.5) * 20;
      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.15,
      color: 0x00ffcc,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00ffcc,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    let animationFrameId = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const posArray = particles.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        posArray[i * 3] += velocities[i].x;
        posArray[i * 3 + 1] += velocities[i].y;
        posArray[i * 3 + 2] += velocities[i].z;

        if (Math.abs(posArray[i * 3]) > 20) velocities[i].x *= -1;
        if (Math.abs(posArray[i * 3 + 1]) > 20) velocities[i].y *= -1;
        if (Math.abs(posArray[i * 3 + 2]) > 10) velocities[i].z *= -1;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      const linePositions: number[] = [];
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < 15) {
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

      scene.rotation.y += 0.001;
      scene.rotation.x += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-60 mix-blend-screen"
      aria-hidden
    />
  );
};

export default function MultiAgentChatbotSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'system',
      content:
        'Welcome to the SK Creation Platform Multi-Agent Hub. How can I assist you today? You can ask about career coaching, Texas real estate auctions, kids books/games, or booking a 1:1 session.',
      agentId: 'router',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [flowStep, setFlowStep] = useState<FlowStep>('idle');
  const [activeAgent, setActiveAgent] = useState<AgentType>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [messages, isTyping]);

  const processMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const newUserMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages((prev) => [...prev, newUserMsg]);
    setInput('');
    setIsTyping(true);
    setFlowStep('analyzing');
    setActiveAgent('router');

    const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

    await delay(1200);
    setFlowStep('routing');

    const selectedAgent = resolveAgent(text);

    if (!selectedAgent) {
      await delay(800);
      setFlowStep('generating');
      await delay(1000);

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'agent',
          content: FALLBACK_REPLY,
          agentId: 'router',
          isFallback: true,
        },
      ]);
      setFlowStep('complete');
      setIsTyping(false);

      await delay(2000);
      setFlowStep('idle');
      setActiveAgent(null);
      return;
    }

    await delay(800);
    setActiveAgent(selectedAgent);
    setFlowStep('retrieving');

    await delay(1500);
    setFlowStep('generating');

    await delay(1000);

    const agentData = AGENT_KNOWLEDGE[selectedAgent];
    const randomResponse = agentData.responses[Math.floor(Math.random() * agentData.responses.length)];

    const newAgentMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'agent',
      content: randomResponse,
      agentId: selectedAgent,
      cta: agentData.cta,
    };

    setMessages((prev) => [...prev, newAgentMsg]);
    setFlowStep('complete');
    setIsTyping(false);

    await delay(2000);
    setFlowStep('idle');
    setActiveAgent(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    processMessage(input);
  };

  const suggestions = [
    'I need interview prep tips.',
    'Show me Texas foreclosures.',
    'Looking for kids games.',
    'Book a 1:1 session.',
  ];

  const showSuggestions =
    !isTyping &&
    (messages.length < 3 || messages.some((m) => m.isFallback));

  return (
    <section
      id="multi-agent-platform"
      aria-labelledby="multi-agent-platform-heading"
      className="relative -mt-[3.75rem] min-h-[100dvh] w-full bg-[#050B14] pt-[3.75rem] text-white font-sans overflow-hidden scroll-mt-[3.75rem]"
    >
      <h2 id="multi-agent-platform-heading" className="sr-only">
        SK Creation Multi-Agent Hub
      </h2>

      <ThreeBackground />

      <div className="relative z-10 mx-auto flex h-[calc(100dvh-3.75rem)] max-w-7xl flex-col gap-4 px-4 py-4 md:flex-row md:gap-6 md:py-6">
        <div className="hidden min-h-0 w-full flex-col gap-4 md:flex md:w-1/3 md:flex-1">
          <div className="flex h-full min-h-0 flex-col rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
                <BrainCircuit className="w-6 h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                  Agentic Orchestration Layer
                </h3>
                <p className="text-xs text-slate-400">Live Agentic Flow</p>
              </div>
            </div>

            <div className="flex-1 relative flex flex-col gap-6 pt-4">
              <FlowCard
                icon={User}
                title="User Input"
                isActive={flowStep !== 'idle'}
                status={flowStep === 'idle' ? 'waiting' : 'done'}
              />

              <div className="absolute left-6 top-14 bottom-14 w-0.5 bg-slate-800 -z-10" />
              <motion.div
                className="absolute left-6 top-14 w-0.5 bg-gradient-to-b from-indigo-500 to-cyan-500 -z-10"
                initial={{ height: 0 }}
                animate={{ height: flowStep !== 'idle' ? '100%' : 0 }}
                transition={{ duration: 0.5 }}
              />

              <FlowCard
                icon={GitMerge}
                title="Router Agent (Hub)"
                desc="Analyzing Intent & Semantic Search"
                isActive={activeAgent === 'router'}
                status={
                  flowStep === 'analyzing'
                    ? 'active'
                    : flowStep !== 'idle'
                      ? 'done'
                      : 'waiting'
                }
                isPulsing={flowStep === 'analyzing'}
              />

              <div className="relative pl-8">
                <div className="absolute left-0 top-1/2 w-8 h-0.5 bg-slate-800 -z-10" />
                <motion.div
                  className="absolute left-0 top-1/2 h-0.5 bg-cyan-500 -z-10"
                  initial={{ width: 0 }}
                  animate={{
                    width: ['routing', 'retrieving', 'generating', 'complete'].includes(flowStep)
                      ? 32
                      : 0,
                  }}
                />

                <div className="bg-slate-800/40 border border-slate-700/50 rounded-xl p-4">
                  <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider font-semibold">
                    Specialized Workforce
                  </p>
                  <div className="flex flex-col gap-2">
                    {Object.values(AGENT_KNOWLEDGE).map((agent) => (
                      <AgentBadge key={agent.id} agent={agent} isActive={activeAgent === agent.id} />
                    ))}
                  </div>
                </div>
              </div>

              <FlowCard
                icon={Database}
                title="Enterprise RAG"
                desc="Querying Databases & APIs"
                isActive={flowStep === 'retrieving'}
                status={
                  flowStep === 'retrieving'
                    ? 'active'
                    : ['generating', 'complete'].includes(flowStep)
                      ? 'done'
                      : 'waiting'
                }
                isPulsing={flowStep === 'retrieving'}
              />

              <FlowCard
                icon={Bot}
                title="Synthesize Output"
                isActive={flowStep === 'generating' || flowStep === 'complete'}
                status={
                  flowStep === 'generating' ? 'active' : flowStep === 'complete' ? 'done' : 'waiting'
                }
                isPulsing={flowStep === 'generating'}
              />
            </div>

            <div className="mt-auto pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Systems Operational
              </span>
              <span>SK Creation Platform v2.0</span>
            </div>
          </div>
        </div>

        <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/60 shadow-2xl backdrop-blur-xl md:w-2/3 md:flex-[2]">
          <div className="bg-slate-800/50 border-b border-slate-700/50 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-slate-900 rounded-full" />
              </div>
              <div>
                <p className="font-semibold text-lg">SK Multi-Agent</p>
                <p className="text-xs text-slate-400">Powered by LangGraph</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                    <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                  </div>
                  <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-2">
                    <span
                      className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    />
                    <span
                      className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    />
                    <span
                      className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 bg-slate-900/80 border-t border-slate-700/50 backdrop-blur-md">
            {showSuggestions && (
              <div className="flex flex-wrap gap-2 mb-4">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => processMessage(suggestion)}
                    className="text-xs px-3 py-1.5 bg-slate-800 hover:bg-indigo-500/20 text-slate-300 hover:text-indigo-300 border border-slate-700 hover:border-indigo-500/30 rounded-full transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about careers, auctions, kids games, or book a session..."
                className="w-full bg-slate-950/50 border-2 border-white rounded-xl pl-4 pr-12 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all placeholder:text-slate-500"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `,
        }}
      />
    </section>
  );
}

type FlowStatus = 'waiting' | 'active' | 'done';

function FlowCard({
  icon: Icon,
  title,
  desc,
  isActive,
  status,
  isPulsing,
}: {
  icon: LucideIcon;
  title: string;
  desc?: string;
  isActive: boolean;
  status: FlowStatus;
  isPulsing?: boolean;
}) {
  return (
    <div
      className={`relative flex items-center gap-4 p-3 rounded-xl transition-all duration-500 ${
        isActive
          ? 'bg-slate-800/80 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
          : 'opacity-60'
      }`}
    >
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border relative z-10 bg-slate-900 ${
          status === 'done'
            ? 'border-emerald-500 text-emerald-400'
            : status === 'active'
              ? 'border-cyan-500 text-cyan-400'
              : 'border-slate-700 text-slate-500'
        }`}
      >
        {status === 'done' ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
        {isPulsing && (
          <span className="absolute inset-0 rounded-full border border-cyan-400 animate-ping opacity-75" />
        )}
      </div>
      <div>
        <h4 className={`font-medium text-sm ${isActive ? 'text-white' : 'text-slate-400'}`}>{title}</h4>
        {desc && <p className="text-xs text-slate-500 mt-0.5">{desc}</p>}
      </div>
    </div>
  );
}

function AgentBadge({ agent, isActive }: { agent: AgentKnowledge; isActive: boolean }) {
  const Icon = agent.icon;
  return (
    <div
      className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300 ${
        isActive
          ? `${agent.bgColor} border ${agent.borderColor} ${agent.color} shadow-lg scale-105`
          : 'hover:bg-slate-800 text-slate-400 border border-transparent'
      }`}
    >
      <Icon className={`w-4 h-4 ${isActive ? '' : 'text-slate-500'}`} />
      <div className="flex-1">
        <p className="text-xs font-semibold">{agent.name}</p>
        <p className="text-[10px] opacity-70">{agent.platform}</p>
      </div>
      {isActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-2 h-2 rounded-full bg-current animate-pulse"
        />
      )}
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  let agentTheme: AgentKnowledge | null = null;
  if (message.agentId && message.agentId !== 'router') {
    agentTheme = AGENT_KNOWLEDGE[message.agentId as keyof typeof AGENT_KNOWLEDGE];
  }

  const AgentIcon = agentTheme?.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={`flex items-start gap-3 w-full ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border ${
          isUser
            ? 'bg-indigo-600 border-indigo-500 text-white'
            : agentTheme
              ? `${agentTheme.bgColor} ${agentTheme.borderColor} ${agentTheme.color}`
              : 'bg-slate-800 border-slate-700 text-cyan-400'
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4" />
        ) : AgentIcon ? (
          <AgentIcon className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      <div className={`flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        {!isUser && agentTheme && (
          <span
            className={`text-[10px] mb-1 font-medium ${agentTheme.color} uppercase tracking-wider`}
          >
            {agentTheme.platform}
          </span>
        )}
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
            isUser
              ? 'bg-indigo-600 text-white rounded-tr-sm'
              : 'bg-slate-800/80 border border-slate-700/50 text-slate-200 rounded-tl-sm'
          }`}
        >
          {message.content}
          {!isUser && message.cta && agentTheme && (
            <a
              href={message.cta.url}
              target={message.cta.url.startsWith('/') ? undefined : '_blank'}
              rel={message.cta.url.startsWith('/') ? undefined : 'noopener noreferrer'}
              className={`mt-3 inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 group ${agentTheme.bgColor} ${agentTheme.borderColor} ${agentTheme.color} hover:brightness-125`}
            >
              {message.cta.text}
              <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
