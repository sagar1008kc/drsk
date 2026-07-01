'use client';

import { useState } from 'react';
import PortfolioBackLink from '@/component/portfolio/PortfolioBackLink';
import {
  Activity,
  ArrowRight,
  Braces,
  CheckCircle2,
  Code,
  Cpu,
  Database,
  Layers,
  Mail,
  Network,
  Play,
  Search,
  Settings,
  Terminal,
  Wrench,
  Zap,
} from 'lucide-react';

type Tab = 'definition' | 'architecture' | 'why' | 'sandbox';

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'definition', label: 'Definition', icon: <BookOpenIcon className="h-[18px] w-[18px]" /> },
  { id: 'architecture', label: 'Architecture', icon: <Network className="h-[18px] w-[18px]" /> },
  { id: 'why', label: 'Why Tools?', icon: <Zap className="h-[18px] w-[18px]" /> },
  { id: 'sandbox', label: 'Interactive Sandbox', icon: <Terminal className="h-[18px] w-[18px]" /> },
];

function BookOpenIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function DefinitionSection() {
  return (
    <div className="space-y-12">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-3xl font-bold text-white">What is an AI Tool?</h2>
          <p className="mb-6 leading-relaxed text-slate-300">
            In a multi-agentic workflow, a <strong>Tool</strong> is a defined capability granted to
            an AI model so it can interact with external systems, retrieve information, or perform
            state-changing actions.
          </p>
          <ul className="space-y-4">
            {[
              'It is an API endpoint, script, or function wrapped in a schema.',
              "The LLM decides when and how to call it based on the user's prompt.",
              "It breaks the LLM out of its knowledge-cutoff isolation.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-300">
                <CheckCircle2 className="mt-0.5 shrink-0 text-indigo-400" size={20} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <div className="absolute right-0 top-0 p-4 opacity-10">
            <Braces size={120} />
          </div>
          <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
            <Settings className="text-slate-400" size={20} /> Anatomy of a Tool
          </h3>
          <div className="relative z-10 space-y-4 font-mono text-sm">
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
              <span className="text-purple-400">"name"</span>: <span className="text-green-400">"get_weather"</span>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
              <span className="text-purple-400">"description"</span>: <span className="text-green-400">"Fetch current weather for a city."</span>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-4">
              <span className="text-purple-400">"parameters"</span>: {'{'}
              <div className="mt-2 space-y-2 border-l border-slate-700 pl-4">
                <div><span className="text-purple-400">"location"</span>: {'{'} type: "string" {'}'}</div>
                <div><span className="text-purple-400">"unit"</span>: {'{'} enum: ["celsius", "fahrenheit"] {'}'}</div>
              </div>
              {'}'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchitectureSection() {
  return (
    <div className="space-y-12">
      <div className="mx-auto mb-12 max-w-3xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-white">The Tool Execution Loop</h2>
        <p className="text-lg text-slate-400">
          How an agent reasons, selects the right tool, formats arguments, executes, and observes the result.
        </p>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 md:flex-row">
        {[
          {
            title: '1. Reason',
            desc: 'LLM analyzes prompt and decides a tool is needed.',
            icon: Activity,
            iconClass: 'bg-blue-500/20 text-blue-400 ring-blue-500/30',
          },
          {
            title: '2. Action',
            desc: 'LLM outputs a structured JSON tool call.',
            icon: Braces,
            iconClass: 'bg-indigo-500/20 text-indigo-400 ring-indigo-500/30',
          },
          {
            title: '3. Execution',
            desc: 'Application executes the real API or function.',
            icon: Cpu,
            iconClass: 'bg-emerald-500/20 text-emerald-400 ring-emerald-500/30',
          },
          {
            title: '4. Observation',
            desc: 'Result returns to the LLM for final response.',
            icon: Search,
            iconClass: 'bg-purple-500/20 text-purple-400 ring-purple-500/30',
          },
        ].map((step, index, arr) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="flex w-full items-center gap-4 md:w-auto">
              <div className="relative z-10 flex-1 rounded-2xl border border-slate-800 bg-slate-900 p-6 text-center">
                <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ring-1 ${step.iconClass}`}>
                  <Icon size={24} />
                </div>
                <h3 className="mb-2 font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-slate-400">{step.desc}</p>
              </div>
              {index < arr.length - 1 ? <ArrowRight className="hidden shrink-0 text-slate-600 md:block" size={24} /> : null}
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
        <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-white">
          <Layers className="text-indigo-400" /> Multi-Agent Collaboration
        </h3>
        <p className="leading-relaxed text-slate-300">
          In frameworks like LangGraph or AutoGen, tools are not only for one model. A router agent can hand work to a coder agent, research agent, or payment agent, each with its own tool scope and safety constraints.
        </p>
      </div>
    </div>
  );
}

function WhySection() {
  const reasons = [
    {
      icon: <Database className="text-blue-400" size={32} />,
      title: 'Eliminate Hallucinations',
      desc: 'Force the model to retrieve real data from a database or API instead of guessing.',
    },
    {
      icon: <Zap className="text-yellow-400" size={32} />,
      title: 'Deterministic Execution',
      desc: 'Tools let you inject predictable workflows like SQL queries, email sends, or payment calls.',
    },
    {
      icon: <GlobeIcon className="h-8 w-8 text-emerald-400" />,
      title: 'Overcome Knowledge Cutoffs',
      desc: 'Give the agent controlled access to current data and business systems.',
    },
    {
      icon: <Code className="text-purple-400" size={32} />,
      title: 'Write & Execute Code',
      desc: 'A code interpreter tool lets the agent run code, observe output, and repair mistakes.',
    },
  ];

  return (
    <div className="space-y-12">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="mb-4 text-3xl font-bold text-white">Why Do We Need Tools?</h2>
        <p className="text-lg text-slate-400">Tools are the hands and eyes that let LLMs actually do work.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {reasons.map((reason) => (
          <div key={reason.title} className="rounded-2xl border border-slate-800 bg-slate-900 p-8 transition hover:border-slate-700">
            <div className="mb-6">{reason.icon}</div>
            <h3 className="mb-3 text-xl font-bold text-white">{reason.title}</h3>
            <p className="leading-relaxed text-slate-400">{reason.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

type Log = { step: string; content: string; type: 'info' | 'tool' | 'result' | 'final' };

function SandboxSection() {
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);

  const mockTools = [
    { name: 'web_search', icon: <Search size={16} /> },
    { name: 'query_database', icon: <Database size={16} /> },
    { name: 'send_email', icon: <Mail size={16} /> },
    { name: 'calculator', icon: <Terminal size={16} /> },
  ];

  const handleSimulate = async () => {
    if (!input.trim()) return;
    setIsProcessing(true);
    setLogs([{ step: 'Reasoning', content: 'Analyzing user prompt...', type: 'info' }]);

    await new Promise((resolve) => setTimeout(resolve, 700));

    const lower = input.toLowerCase();
    let selectedTool = 'query_database';
    let args = JSON.stringify({ sql: "SELECT * FROM general_knowledge WHERE query = '?'" }, null, 2);
    let observation = 'Database returned 1 row.';
    let final = 'I queried the database and found the answer.';

    if (lower.includes('weather') || lower.includes('news') || lower.includes('who is')) {
      selectedTool = 'web_search';
      args = JSON.stringify({ query: input }, null, 2);
      observation = 'Found 3 relevant sources. Extracting summary...';
      final = 'Based on the web search, here is the information you requested.';
    } else if (lower.includes('email') || lower.includes('send') || lower.includes('message')) {
      selectedTool = 'send_email';
      args = JSON.stringify({ to: 'user@example.com', subject: 'Automated Message', body: input }, null, 2);
      observation = 'Email API returned status 200 OK.';
      final = 'I have successfully sent the email for you.';
    } else if (lower.includes('calculate') || lower.includes('+') || lower.includes('math')) {
      selectedTool = 'calculator';
      args = JSON.stringify({ expression: input.replace(/[^0-9+\-*/()]/g, '') || '0' }, null, 2);
      observation = 'Result: 42';
      final = 'The result of the calculation is 42.';
    }

    setLogs((prev) => [...prev, { step: 'Tool Selection', content: `Calling function: ${selectedTool}\nArguments:\n${args}`, type: 'tool' }]);
    await new Promise((resolve) => setTimeout(resolve, 900));
    setLogs((prev) => [...prev, { step: 'Environment Observation', content: observation, type: 'result' }]);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLogs((prev) => [...prev, { step: 'Final Response', content: final, type: 'final' }]);
    setIsProcessing(false);
  };

  const samplePrompts = [
    "What's the weather like in Tokyo today?",
    "Send an email to my boss saying I'll be late.",
    'Calculate 15% of 10450',
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="space-y-6">
        <div>
          <h2 className="mb-2 text-2xl font-bold text-white">Agent Sandbox</h2>
          <p className="text-slate-400">Type a prompt to see how an LLM selects and executes tools.</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">Available Tools</h3>
          <div className="flex flex-wrap gap-2">
            {mockTools.map((tool) => (
              <div key={tool.name} className="flex items-center gap-2 rounded-md border border-slate-800 bg-slate-950 px-3 py-1.5 text-sm text-slate-300">
                <span className="text-indigo-400">{tool.icon}</span>
                {tool.name}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <div className="mb-2 flex flex-wrap gap-2">
            {samplePrompts.map((prompt) => (
              <button key={prompt} type="button" onClick={() => setInput(prompt)} className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300 transition hover:bg-slate-700">
                {prompt}
              </button>
            ))}
          </div>
          <div className="relative">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="E.g., Send an email to Alice..."
              className="min-h-[120px] w-full resize-none rounded-xl border border-slate-700 bg-slate-900 p-4 text-white outline-none placeholder:text-slate-500 focus:border-transparent focus:ring-2 focus:ring-indigo-500"
            />
            <button type="button" onClick={handleSimulate} disabled={isProcessing || !input.trim()} className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50">
              {isProcessing ? <Activity className="animate-spin" size={18} /> : <Play size={18} />}
              {isProcessing ? 'Processing...' : 'Run Agent'}
            </button>
          </div>
        </div>
      </div>

      <div className="flex h-[500px] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#0D1117] p-6 font-mono text-sm">
        <div className="mb-4 flex items-center gap-2 border-b border-slate-800 pb-4">
          <Terminal size={18} className="text-slate-500" />
          <span className="font-semibold text-slate-300">Agent Execution Trace</span>
        </div>
        <div className="flex-1 space-y-4 overflow-y-auto">
          {logs.length === 0 ? (
            <div className="flex h-full items-center justify-center text-slate-600">Waiting for user prompt...</div>
          ) : null}
          {logs.map((log, index) => (
            <div key={`${log.step}-${index}`} className="animate-in fade-in slide-in-from-left-2 duration-300">
              <div className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-500">[{log.step}]</div>
              <div
                className={`whitespace-pre-wrap rounded-lg p-3 ${
                  log.type === 'tool' ? 'border border-indigo-900/50 bg-indigo-950/40 text-indigo-300' : ''
                } ${log.type === 'result' ? 'border border-emerald-900/50 bg-emerald-950/40 text-emerald-300' : ''} ${
                  log.type === 'info' ? 'text-slate-400' : ''
                } ${log.type === 'final' ? 'bg-slate-800 font-sans text-base text-white' : ''}`}
              >
                {log.content}
              </div>
            </div>
          ))}
          {isProcessing && logs.length > 0 && logs[logs.length - 1].type !== 'final' ? (
            <div className="mt-4 flex items-center gap-2 text-slate-500">
              <span className="h-2 w-2 animate-pulse rounded-full bg-slate-500" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-slate-500 [animation-delay:75ms]" />
              <span className="h-2 w-2 animate-pulse rounded-full bg-slate-500 [animation-delay:150ms]" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function AgenticToolsHub() {
  const [activeTab, setActiveTab] = useState<Tab>('definition');

  return (
    <main className="min-h-[calc(100dvh-3.75rem)] bg-slate-950 font-sans text-slate-200 selection:bg-indigo-500/30">
      <header className="relative overflow-hidden border-b border-slate-800/60 bg-slate-900/50 pb-16 pt-20">
        <div className="absolute left-4 top-4 z-20 sm:left-6 sm:top-6">
          <PortfolioBackLink className="border-slate-700 hover:border-indigo-500/50 hover:text-indigo-200" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.22),transparent_45%)]" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-400">
            <Wrench size={16} />
            <span>Agentic Workflows</span>
          </div>
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-white md:text-6xl">
            The Power of <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Tools</span> in AI
          </h1>
          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-slate-400">
            Tools bridge static language models and real-world execution, turning conversational agents into autonomous digital workers.
          </p>
        </div>
      </header>

      <div className="sticky top-14 z-40 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-6">
          <nav className="flex space-x-1 overflow-x-auto py-3" aria-label="Agentic tools sections">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-6 py-12">
        {activeTab === 'definition' ? <DefinitionSection /> : null}
        {activeTab === 'architecture' ? <ArchitectureSection /> : null}
        {activeTab === 'why' ? <WhySection /> : null}
        {activeTab === 'sandbox' ? <SandboxSection /> : null}
      </section>
    </main>
  );
}
