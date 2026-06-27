'use client';

import { useState } from 'react';
import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Cpu,
  Database,
  Gauge,
  Layers,
  Lock,
  Network,
  Scale,
  Server,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Zap,
} from 'lucide-react';

type ProviderKey = 'openai' | 'anthropic' | 'google' | 'meta' | 'mistral' | 'cloud';

const llmLayers = [
  {
    title: 'Tokenization Layer',
    detail: 'Converts text, code, images, or structured input into tokens the model can process.',
  },
  {
    title: 'Embedding Layer',
    detail: 'Turns tokens into mathematical vectors that capture semantic meaning and relationships.',
  },
  {
    title: 'Transformer Blocks',
    detail: 'Attention and feed-forward layers reason over context, dependencies, and instructions.',
  },
  {
    title: 'Attention Mechanism',
    detail: 'Determines which tokens matter most for the current output decision.',
  },
  {
    title: 'Output Head',
    detail: 'Predicts the next token or structured response based on probability distribution.',
  },
  {
    title: 'Runtime Controls',
    detail: 'Temperature, max tokens, system prompts, safety settings, and tool schemas shape behavior.',
  },
];

const useCases = [
  ['Use an LLM', 'Natural language understanding, summarization, semantic search, reasoning, drafting, data extraction, and flexible decision support.'],
  ['Do not use an LLM alone', 'Exact calculations, critical financial transactions, deterministic rules, access control, or tasks needing guaranteed correctness.'],
  ['Use LLM + tools', 'When the model must read live data, update records, call APIs, search documents, or trigger workflows.'],
  ['Use smaller models', 'Classification, routing, extraction, simple support, batch processing, and cost-sensitive workloads.'],
];

const selectionCriteria = [
  'Task complexity and reasoning depth',
  'Context window size',
  'Latency and throughput requirements',
  'Cost per request and token volume',
  'Accuracy on your domain data',
  'Tool/function calling reliability',
  'Multimodal capability',
  'Data privacy and deployment constraints',
  'Evaluation results, not hype',
];

const providers: Record<
  ProviderKey,
  {
    name: string;
    bestFor: string;
    notes: string[];
    modelFamilies: {
      name: string;
      when: string;
      why: string;
    }[];
  }
> = {
  openai: {
    name: 'OpenAI',
    bestFor: 'General reasoning, coding, tool use, assistants, multimodal apps',
    notes: ['Strong ecosystem', 'Good tool/function calling', 'Common enterprise adoption path'],
    modelFamilies: [
      {
        name: 'GPT-4o / multimodal GPT models',
        when: 'Use for customer-facing assistants, image/text workflows, voice-style experiences, and general enterprise copilots.',
        why: 'Balanced quality, speed, multimodal support, and mature API patterns.',
      },
      {
        name: 'GPT-4.1-style coding/general models',
        when: 'Use for code generation, structured outputs, document reasoning, and app-level automation.',
        why: 'Strong instruction following and useful for developer productivity and tool workflows.',
      },
      {
        name: 'o-series reasoning models',
        when: 'Use for hard reasoning, planning, math, complex troubleshooting, and multi-step analysis.',
        why: 'Optimized for deeper deliberation, but usually higher latency/cost than fast chat models.',
      },
      {
        name: 'Small/mini models',
        when: 'Use for routing, classification, extraction, moderation pre-checks, and high-volume low-cost tasks.',
        why: 'Cheaper and faster for simple workloads that do not need premium reasoning.',
      },
    ],
  },
  anthropic: {
    name: 'Anthropic Claude',
    bestFor: 'Long-context reasoning, careful writing, analysis, safety-sensitive workflows',
    notes: ['Strong instruction following', 'Useful for review and synthesis', 'Good for complex documents'],
    modelFamilies: [
      {
        name: 'Claude Opus',
        when: 'Use for highest-quality reasoning, deep analysis, strategic synthesis, and complex document review.',
        why: 'Best fit when quality matters more than speed or cost.',
      },
      {
        name: 'Claude Sonnet',
        when: 'Use for enterprise copilots, coding support, analysis, writing, and balanced production workloads.',
        why: 'Strong quality-to-cost ratio and often the default choice for serious applications.',
      },
      {
        name: 'Claude Haiku',
        when: 'Use for fast support replies, extraction, classification, routing, and simple summaries.',
        why: 'Low latency and lower cost for high-volume operational tasks.',
      },
      {
        name: 'Long-context Claude variants',
        when: 'Use for contracts, manuals, policies, research packs, and large knowledge inputs.',
        why: 'Good for workflows where the model must reason across many pages at once.',
      },
    ],
  },
  google: {
    name: 'Google Gemini',
    bestFor: 'Multimodal reasoning, Google ecosystem integrations, long context experiments',
    notes: ['Strong multimodal direction', 'Useful for image/video/document workflows', 'Good cloud-native fit'],
    modelFamilies: [
      {
        name: 'Gemini Pro',
        when: 'Use for stronger reasoning, enterprise analysis, document-heavy workflows, and multimodal tasks.',
        why: 'Better fit when answer quality and cross-modal reasoning matter.',
      },
      {
        name: 'Gemini Flash',
        when: 'Use for fast chat, routing, extraction, lightweight agents, and interactive UI features.',
        why: 'Optimized for speed and cost efficiency.',
      },
      {
        name: 'Gemini multimodal models',
        when: 'Use for image, audio, video, PDF, or mixed media understanding.',
        why: 'Useful when the product experience is not text-only.',
      },
      {
        name: 'Vertex AI model access',
        when: 'Use when teams need Google Cloud IAM, logging, data controls, and enterprise governance.',
        why: 'Better operational fit for cloud-managed enterprise deployments.',
      },
    ],
  },
  meta: {
    name: 'Meta Llama',
    bestFor: 'Open-weight deployments, private hosting, customization, cost control',
    notes: ['Flexible deployment', 'Good for self-hosted architectures', 'Requires more ops ownership'],
    modelFamilies: [
      {
        name: 'Llama large models',
        when: 'Use for private reasoning workloads, internal copilots, and domain-specific customization.',
        why: 'Open-weight control with strong capability when hosted well.',
      },
      {
        name: 'Llama mid-size models',
        when: 'Use for private chat, summarization, extraction, and lower-cost enterprise tools.',
        why: 'Good balance when you need control but cannot afford large-model latency.',
      },
      {
        name: 'Fine-tuned Llama variants',
        when: 'Use for strict domain language, internal processes, or regulated private data workflows.',
        why: 'Customizable under your own deployment and evaluation process.',
      },
      {
        name: 'Quantized/edge variants',
        when: 'Use for local, offline, edge, or constrained hardware scenarios.',
        why: 'Improves privacy and cost, but with capability trade-offs.',
      },
    ],
  },
  mistral: {
    name: 'Mistral',
    bestFor: 'Efficient models, European deployments, open and commercial model options',
    notes: ['Good cost/performance options', 'Strong smaller-model choices', 'Useful for latency-sensitive paths'],
    modelFamilies: [
      {
        name: 'Mistral Large',
        when: 'Use for premium reasoning, enterprise assistants, synthesis, and tool-enabled workflows.',
        why: 'A strong commercial option with good enterprise positioning.',
      },
      {
        name: 'Mixtral / sparse expert models',
        when: 'Use for efficient throughput and workloads needing better cost/performance at scale.',
        why: 'Mixture-of-experts style routing can be efficient for broad tasks.',
      },
      {
        name: 'Small/medium Mistral models',
        when: 'Use for extraction, classification, routing, and latency-sensitive applications.',
        why: 'Fast and efficient for common operational AI tasks.',
      },
      {
        name: 'Open models',
        when: 'Use when teams need more deployment flexibility or private hosting options.',
        why: 'Better control for teams with infrastructure maturity.',
      },
    ],
  },
  cloud: {
    name: 'Cloud Model Platforms',
    bestFor: 'Enterprise governance through Azure AI, AWS Bedrock, Vertex AI, or private gateways',
    notes: ['Centralized access controls', 'Model choice under one platform', 'Useful for compliance and procurement'],
    modelFamilies: [
      {
        name: 'Azure OpenAI',
        when: 'Use when Microsoft enterprise identity, networking, compliance, and procurement matter.',
        why: 'Good fit for organizations already standardized on Azure.',
      },
      {
        name: 'AWS Bedrock models',
        when: 'Use when teams want multiple model providers behind AWS governance and networking.',
        why: 'Centralizes access to several model families with AWS controls.',
      },
      {
        name: 'Google Vertex AI',
        when: 'Use for Gemini, model garden access, multimodal workflows, and GCP-native governance.',
        why: 'Good fit for Google Cloud data and AI platform teams.',
      },
      {
        name: 'Private model gateway',
        when: 'Use when you need model routing, cost controls, audit logs, fallback models, and policy enforcement.',
        why: 'Lets architecture choose models dynamically without coupling the app to one vendor.',
      },
    ],
  },
};

const integrationPatterns = [
  {
    title: 'Prompt + Context',
    description: 'The app passes task instructions, user context, and constraints into the model.',
  },
  {
    title: 'RAG',
    description: 'Relevant documents are retrieved and inserted into the prompt to ground the answer.',
  },
  {
    title: 'Tool Calling',
    description: 'The model selects a function/API call, but the application executes it safely.',
  },
  {
    title: 'Structured Output',
    description: 'The model returns JSON that downstream systems can validate and consume.',
  },
  {
    title: 'Evaluation Loop',
    description: 'Outputs are tested for accuracy, groundedness, safety, latency, and cost.',
  },
  {
    title: 'Guardrail Layer',
    description: 'Policies, validators, permissions, and human review control model behavior.',
  },
];

const azureFoundryArchitecture = [
  ['Front-end layer', 'Azure App Service or Static Web Apps hosts the user portal for submitting automation requests and tracking progress.'],
  ['Orchestration layer', 'Azure Container Apps runs a custom orchestration API that decomposes tasks, selects agents, coordinates execution, and exposes REST/WebSocket APIs.'],
  ['AI model integration', 'Azure AI Foundry and Azure OpenAI provide model access, agent reasoning, tool orchestration, safety controls, and managed runtime options.'],
  ['Agent layer', 'Foundry Agent Service and Microsoft Agent Framework SDK define agent behavior, tools, collaboration patterns, and execution boundaries.'],
  ['Data layer', 'Azure Cosmos DB stores task state, plans, decisions, execution logs, and audit-friendly history; Blob Storage stores larger artifacts.'],
  ['Container management', 'Azure Container Registry stores versioned orchestration and custom-agent container images for rollback and controlled release.'],
];

const azureFoundryWorkflow = [
  'User submits request through App Service or Static Web Apps UI.',
  'Container Apps orchestration API validates the request and creates workflow state.',
  'Supervisor logic breaks down the task and assigns specialized agent roles.',
  'Agents collaborate through Foundry Agent Service or custom orchestration code.',
  'Tools call Azure OpenAI, AI Search, Azure Functions, Cosmos DB, or external APIs.',
  'Results, decisions, and traces are persisted to Cosmos DB and Log Analytics.',
  'Completion report streams back to the UI with status, evidence, and next actions.',
];

const azureSecurityPractices = [
  'Use Microsoft Entra ID for authentication and managed identities for service-to-service access.',
  'Apply RBAC and least privilege for Foundry, Cosmos DB, Container Apps, Key Vault, and storage.',
  'Store API keys, certificates, and connection strings in Azure Key Vault.',
  'Use VNET integration and private endpoints for Cosmos DB, Container Registry, Key Vault, and internal APIs.',
  'Enforce content safety, output validation, and human approval for high-risk tool actions.',
];

const azureCicdPipeline = [
  'Code and build: run linting, unit tests, and Docker builds for orchestration API/custom agents.',
  'Security scan: use Microsoft Defender for DevOps or image scanning before deployment.',
  'Push: publish versioned images to Azure Container Registry.',
  'Provision: apply Bicep or Terraform for Container Apps, Cosmos DB, Key Vault, AI services, networking, and monitoring.',
  'Deploy: release to staging with blue-green or canary rollout.',
  'Validate: run integration tests for agent orchestration, tool calls, approval paths, and failure recovery.',
  'Promote: use manual approval gates or automated production promotion after health checks.',
];

const azureProducts = [
  ['Azure AI Foundry', 'AI project hub, model access, evaluations, prompt/model tooling, and agent development experience.'],
  ['Azure OpenAI Service', 'Enterprise access to GPT-family models for reasoning, chat, extraction, and tool-enabled workflows.'],
  ['Foundry Agent Service', 'Managed runtime for agents, tool calls, identity integration, observability, and safety enforcement.'],
  ['Azure Container Apps', 'Serverless containers for orchestration APIs and custom agent logic with autoscaling.'],
  ['Azure Cosmos DB', 'State, task metadata, plans, decisions, audit events, and workflow history.'],
  ['Azure AI Search', 'Retrieval layer for RAG over enterprise documents and knowledge bases.'],
  ['Azure Key Vault', 'Secrets, keys, certificates, and secure configuration references.'],
  ['Azure Monitor + App Insights', 'Telemetry, distributed tracing, latency, logs, dashboards, and alerts.'],
];

const azureLlmMetrics = [
  'Intent classification accuracy',
  'Tool-call success and retry rate',
  'RAG retrieval hit rate',
  'Groundedness and citation accuracy',
  'Unsupported-claim / hallucination rate',
  'Human escalation rate',
  'End-to-end task completion rate',
  'Average latency by graph node',
  'Token cost per successful workflow',
  'Safety filter intervention rate',
];

export default function EnterpriseLlmGuide() {
  const [activeProvider, setActiveProvider] = useState<ProviderKey>('openai');
  const provider = providers[activeProvider];

  return (
    <main className="min-h-[calc(100dvh-3.75rem)] bg-slate-50 font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      <nav className="sticky top-14 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-16 flex-col gap-3 py-3 md:flex-row md:items-center md:justify-between md:py-0">
            <div className="flex items-center gap-2">
              <BrainCircuit className="h-8 w-8 text-teal-600" />
              <span className="text-xl font-bold tracking-tight">
                Enterprise<span className="text-teal-600">LLM</span> Guide
              </span>
            </div>
            <div className="flex gap-4 overflow-x-auto text-sm font-medium text-slate-600 md:gap-6">
              <a href="#what-is-llm" className="whitespace-nowrap transition hover:text-teal-700">What is LLM?</a>
              <a href="#how-it-works" className="whitespace-nowrap transition hover:text-teal-700">How it works</a>
              <a href="#llm-layers" className="whitespace-nowrap transition hover:text-teal-700">Layers</a>
              <a href="#choose-model" className="whitespace-nowrap transition hover:text-teal-700">Choose model</a>
              <a href="#integration" className="whitespace-nowrap transition hover:text-teal-700">Integration</a>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-slate-950 py-24 text-white sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(13,148,136,0.35),transparent_42%),radial-gradient(circle_at_15%_80%,rgba(6,182,212,0.18),transparent_36%)]" />
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal-400/20 bg-teal-500/10 px-4 py-2 text-sm font-medium text-teal-200">
            <Sparkles className="h-4 w-4" /> LLM fundamentals for solution architects
          </div>
          <h1 className="mx-auto mb-6 max-w-5xl text-4xl font-extrabold tracking-tight md:text-6xl">
            Large Language Models as the{' '}
            <span className="bg-gradient-to-r from-teal-300 via-cyan-300 to-emerald-300 bg-clip-text text-transparent">
              reasoning brain
            </span>{' '}
            of AI systems
          </h1>
          <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-slate-300 md:text-xl">
            A practical guide to what LLMs are, why they behave like a cognitive engine, how they
            process information, and how architects choose and integrate models safely.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a href="#how-it-works" className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-6 py-3 font-semibold text-white shadow-lg shadow-teal-500/25 transition hover:bg-teal-700">
              Start with mechanics <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a href="#choose-model" className="inline-flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900 px-6 py-3 font-semibold text-slate-200 transition hover:bg-slate-800">
              Compare model choices <Scale className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <section id="what-is-llm" className="scroll-mt-36 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
                Ground Level
              </p>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-slate-900">
                What is an LLM?
              </h2>
              <p className="mb-6 text-lg leading-relaxed text-slate-600">
                A Large Language Model is a neural network trained to predict and generate tokens.
                Because tokens can represent words, code, numbers, tool calls, and structured data,
                the model can interpret intent, reason over context, and produce useful outputs.
              </p>
              <div className="rounded-2xl border border-teal-100 bg-teal-50 p-5">
                <h3 className="font-bold text-teal-900">Why is it called the brain?</h3>
                <p className="mt-2 text-sm leading-relaxed text-teal-800">
                  In an AI application, the LLM is not the whole system. It is the reasoning layer
                  that interprets the task, decides what information is relevant, drafts plans, and
                  chooses whether a tool or workflow should be invoked. The application still needs
                  memory, tools, databases, permissions, validation, and monitoring around it.
                </p>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
              <div className="mb-6 flex items-center gap-3 border-b border-slate-100 pb-4">
                <Cpu className="h-6 w-6 text-teal-600" />
                <h3 className="font-bold text-slate-800">LLM in one picture</h3>
              </div>
              <div className="space-y-4">
                {[
                  ['Input', 'Prompt + context + instructions + optional tool schemas'],
                  ['Model reasoning', 'Attention over tokens, patterns, prior training, and current context'],
                  ['Output', 'Text, JSON, code, classification, tool call, or decision support'],
                ].map(([label, body], index) => (
                  <div key={label}>
                    <div className="rounded-lg border border-slate-100 bg-slate-50 p-4">
                      <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-teal-700">{label}</span>
                      <span className="text-sm text-slate-700">{body}</span>
                    </div>
                    {index < 2 ? <ArrowRight className="mx-auto my-2 h-5 w-5 rotate-90 text-slate-400" /> : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-36 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
              Mechanics
            </p>
            <h2 className="mb-4 text-3xl font-bold text-slate-900">How an LLM works</h2>
            <p className="text-slate-600">
              At runtime, the model does not “know” like a database. It calculates likely next
              tokens from the prompt, its learned parameters, and any context you provide.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-4">
            {[
              ['1. Tokenize', 'Break input into model-readable pieces.'],
              ['2. Embed', 'Convert tokens into vectors with semantic meaning.'],
              ['3. Attend', 'Use attention to weigh relevant context.'],
              ['4. Decode', 'Generate output token by token or as structured JSON.'],
            ].map(([title, detail]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="llm-layers" className="scroll-mt-36 bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-3xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-teal-300">
              High Level Architecture
            </p>
            <h2 className="mb-4 text-3xl font-bold">LLM layers inside an AI system</h2>
            <p className="text-slate-400">
              Architects should think beyond the model name. A useful LLM solution has model,
              context, control, integration, and evaluation layers.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {llmLayers.map((layer) => (
              <div key={layer.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/10 text-teal-300">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-white">{layer.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{layer.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="choose-model" className="scroll-mt-36 bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
                Model Selection
              </p>
              <h2 className="mb-4 text-3xl font-bold text-slate-900">When to use an LLM and how to choose one</h2>
              <div className="space-y-3">
                {useCases.map(([title, detail]) => (
                  <div key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <h3 className="font-semibold text-slate-900">{title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-slate-900">
                <SlidersHorizontal className="h-5 w-5 text-teal-700" />
                Selection checklist
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {selectionCriteria.map((item) => (
                  <div key={item} className="flex gap-2 rounded-xl border border-white bg-white p-3 text-sm text-slate-700 shadow-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700">Top LLM Providers</p>
                <h3 className="mt-1 text-2xl font-bold text-slate-900">Compare by use case, not brand hype</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(providers) as ProviderKey[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveProvider(key)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      activeProvider === key
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-teal-50 hover:text-teal-700'
                    }`}
                  >
                    {providers[key].name}
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-slate-950 p-6 text-white">
              <h4 className="text-xl font-bold">{provider.name}</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{provider.bestFor}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-3">
                {provider.notes.map((note) => (
                  <li key={note} className="rounded-xl border border-white/10 bg-white/[0.04] p-3 text-sm text-slate-300">
                    {note}
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-white/10 pt-5">
                <h5 className="text-sm font-bold uppercase tracking-[0.18em] text-teal-300">
                  Model families: when and why
                </h5>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {provider.modelFamilies.map((model) => (
                    <article
                      key={model.name}
                      className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                    >
                      <h6 className="font-bold text-white">{model.name}</h6>
                      <div className="mt-3 space-y-2 text-sm leading-relaxed">
                        <p className="text-slate-300">
                          <span className="font-semibold text-teal-300">When:</span> {model.when}
                        </p>
                        <p className="text-slate-400">
                          <span className="font-semibold text-cyan-300">Why:</span> {model.why}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
              {activeProvider === 'cloud' ? (
                <div className="mt-8 border-t border-white/10 pt-6">
                  <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
                    <div>
                      <h5 className="text-lg font-bold text-white">Azure AI Foundry enterprise blueprint</h5>
                      <p className="mt-1 text-sm leading-relaxed text-slate-400">
                        Use this when the LLM is part of a governed Azure-native agentic system with
                        identity, private networking, observability, deployment controls, and repeatable CI/CD.
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href="https://ai.azure.com/home"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-teal-400/30 bg-teal-500/10 px-3 py-1.5 text-xs font-semibold text-teal-200 transition hover:border-teal-300 hover:bg-teal-500/20"
                      >
                        Azure AI Foundry
                      </a>
                      <a
                        href="https://learn.microsoft.com/en-us/azure/architecture/ai-ml/idea/multiple-agent-workflow-automation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-semibold text-cyan-200 transition hover:border-cyan-300 hover:bg-cyan-500/20"
                      >
                        Reference architecture
                      </a>
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <h6 className="font-bold text-teal-200">Architecture overview</h6>
                      <div className="mt-3 space-y-3">
                        {azureFoundryArchitecture.map(([title, detail]) => (
                          <div key={title} className="rounded-xl bg-slate-900/80 p-3">
                            <p className="text-sm font-semibold text-white">{title}</p>
                            <p className="mt-1 text-xs leading-relaxed text-slate-400">{detail}</p>
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <h6 className="font-bold text-teal-200">Typical workflow</h6>
                      <ol className="mt-3 space-y-2">
                        {azureFoundryWorkflow.map((step, index) => (
                          <li key={step} className="flex gap-3 text-sm leading-relaxed text-slate-300">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-500/15 text-xs font-bold text-teal-200 ring-1 ring-teal-400/30">
                              {index + 1}
                            </span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </section>

                    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <h6 className="font-bold text-teal-200">Security and networking</h6>
                      <ul className="mt-3 space-y-2">
                        {azureSecurityPractices.map((item) => (
                          <li key={item} className="flex gap-2 text-sm leading-relaxed text-slate-300">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-300" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <h6 className="font-bold text-teal-200">CI/CD and deployment</h6>
                      <ul className="mt-3 space-y-2">
                        {azureCicdPipeline.map((item) => (
                          <li key={item} className="flex gap-2 text-sm leading-relaxed text-slate-300">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  </div>

                  <section className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <h6 className="font-bold text-teal-200">Azure products and responsibility map</h6>
                    <div className="mt-3 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                      {azureProducts.map(([product, detail]) => (
                        <div key={product} className="rounded-xl bg-slate-900/80 p-3">
                          <p className="text-sm font-semibold text-white">{product}</p>
                          <p className="mt-1 text-xs leading-relaxed text-slate-400">{detail}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="mt-4 rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-4">
                    <h6 className="font-bold text-cyan-100">LLM and agent evaluation metrics</h6>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {azureLlmMetrics.map((metric) => (
                        <span
                          key={metric}
                          className="rounded-full border border-cyan-300/20 bg-slate-950/50 px-3 py-1.5 text-xs font-semibold text-cyan-100"
                        >
                          {metric}
                        </span>
                      ))}
                    </div>
                  </section>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section id="integration" className="scroll-mt-36 bg-slate-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
              Implementation
            </p>
            <h2 className="mb-4 text-3xl font-bold text-slate-900">How LLMs are integrated in AI systems</h2>
            <p className="text-slate-600">
              The LLM should sit behind an application boundary where prompts, context, tools,
              policies, logs, and outputs can be controlled.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {integrationPatterns.map((pattern) => (
              <div key={pattern.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                  <Network className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900">{pattern.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{pattern.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-950 p-8 text-white">
            <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
              <ShieldCheck className="h-5 w-5 text-teal-300" />
              Architect rule of thumb
            </h3>
            <p className="leading-relaxed text-slate-300">
              Do not let the LLM directly control production systems. Put it behind an API layer,
              validate structured outputs, execute tools server-side, log every decision, and use
              human approval for high-risk actions.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {[
                ['Private boundary', Lock],
                ['Server-side calls', Server],
                ['Performance metrics', Gauge],
              ].map(([label, Icon]) => (
                <div key={label as string} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  <Icon className="mb-2 h-5 w-5 text-teal-300" />
                  <p className="font-semibold">{label as string}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 
