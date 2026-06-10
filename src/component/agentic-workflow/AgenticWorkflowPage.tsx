'use client';

import React from 'react';
import {
  MessageSquare,
  Fingerprint, 
  Shield, 
  Network, 
  Brain, 
  Wrench, 
  Users, 
  UserMinus, 
  Blocks, 
  Webhook, 
  ShieldAlert, 
  CheckCircle,
  UserCheck,
  Activity,
  Zap,
  Lock,
  RefreshCcw,
  Search,
  AlignLeft,
  Link,
  FileText,
  Cloud,
  Target,
  Database,
  Check,
  MessageCircle,
  Clock,
  ShieldCheck,
  Scale,
  Settings,
  TrendingUp,
  TerminalSquare,
  type LucideIcon,
} from 'lucide-react';

type ColorKey = 'purple' | 'blue' | 'pink' | 'cyan' | 'amber' | 'green' | 'red' | 'mint' | 'rose';

type SystemNodeProps = {
  title: string;
  description?: string;
  icon: LucideIcon;
  colorKey: ColorKey;
  compact?: boolean;
  micro?: boolean;
  className?: string;
};

type SubAgentColorKey = 'green' | 'amber' | 'blue' | 'rose';

type SubAgentBoxProps = {
  title: string;
  colorKey: SubAgentColorKey;
  children: React.ReactNode;
};

type ImpactColorKey = 'blue' | 'cyan' | 'amber' | 'green' | 'rose' | 'purple' | 'mint';

type ImpactCardProps = {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: ImpactColorKey;
};

const layerColors: Record<ColorKey, string> = {
  purple: "border-purple-500/30 bg-purple-500/10 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]",
  blue: "border-blue-500/30 bg-blue-500/10 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
  pink: "border-pink-500/30 bg-pink-500/10 text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.15)]",
  cyan: "border-cyan-500/40 bg-cyan-500/10 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]",
  amber: "border-amber-500/40 bg-amber-500/10 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]",
  green: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
  red: "border-rose-500/40 bg-rose-500/10 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.2)]",
  rose: "border-rose-500/40 bg-rose-500/10 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.2)]",
  mint: "border-teal-500/30 bg-teal-500/10 text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.15)]",
};

const SystemNode = ({
  title,
  description,
  icon: Icon,
  colorKey,
  compact = false,
  micro = false,
  className = '',
}: SystemNodeProps) => {
  const colorClass = layerColors[colorKey] || layerColors.cyan;
  
  if (micro) {
    return (
      <div className={`relative flex items-center border backdrop-blur-sm rounded-lg node-hover-effect p-2 w-full max-w-[200px] mx-auto gap-2 shadow-sm ${colorClass} ${className}`}>
        <Icon className="w-4 h-4 shrink-0" />
        <span className="font-medium text-xs truncate">{title}</span>
      </div>
    );
  }

  return (
    <div className={`relative flex flex-col items-center justify-center border backdrop-blur-sm rounded-xl node-hover-effect
      ${compact ? 'p-3 w-full max-w-xs' : 'p-4 w-full max-w-sm'} 
      ${colorClass} ${className} z-20`}
    >
      <div className="flex items-center gap-3 mb-1 w-full justify-center">
        <Icon className={`${compact ? 'w-5 h-5' : 'w-6 h-6'}`} />
        <h3 className={`font-semibold text-center ${compact ? 'text-sm' : 'text-base'}`}>{title}</h3>
      </div>
      {description && (
        <p className={`text-center opacity-80 ${compact ? 'text-[10px] leading-tight' : 'text-xs mt-1'}`}>
          {description}
        </p>
      )}
    </div>
  );
};

const FlowArrow = ({ length = "h-8", pulseColor = "text-slate-500/50" }) => (
  <div className={`flex justify-center w-full ${length} relative z-10`}>
    <svg width="2" height="100%" className={pulseColor} preserveAspectRatio="none">
      <line x1="1" y1="0" x2="1" y2="100%" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
    </svg>
  </div>
);

const FanOutArrow = () => (
  <div className="hidden lg:flex w-full flex-col items-center pt-2">
    <svg width="2" height="24" className="text-cyan-500/50">
      <line x1="1" y1="0" x2="1" y2="24" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="animate-dash" />
    </svg>
    <div className="w-[75%] h-[2px] bg-cyan-500/30 relative">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-500/50"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-500/50"></div>
    </div>
    <div className="w-[75%] flex justify-between h-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex flex-col items-center">
          <svg width="2" height="32" className="text-cyan-500/50">
            <line x1="1" y1="0" x2="1" y2="32" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="animate-dash" />
          </svg>
        </div>
      ))}
    </div>
  </div>
);

const MergeArrow = () => (
  <div className="hidden lg:flex w-full flex-col items-center pb-2">
    <div className="w-[75%] flex justify-between h-8">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex flex-col items-center">
          <svg width="2" height="32" className="text-amber-500/50">
            <line x1="1" y1="0" x2="1" y2="32" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="animate-dash" />
          </svg>
        </div>
      ))}
    </div>
    <div className="w-[75%] h-[2px] bg-amber-500/30 relative"></div>
    <svg width="2" height="24" className="text-amber-500/50">
      <line x1="1" y1="0" x2="1" y2="24" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="animate-dash" />
    </svg>
  </div>
);

const MiniArrow = ({ colorClass = "text-slate-500/50" }) => (
  <div className="flex justify-center w-full h-4">
    <svg width="2" height="100%" className={colorClass} preserveAspectRatio="none">
      <line x1="1" y1="0" x2="1" y2="100%" stroke="currentColor" strokeWidth="2" strokeDasharray="2 2" className="animate-dash" />
    </svg>
  </div>
);

const SubAgentBox = ({ title, colorKey, children }: SubAgentBoxProps) => {
  const borders: Record<SubAgentColorKey, string> = {
    green: "border-emerald-500/40 bg-emerald-950/10",
    amber: "border-amber-500/40 bg-amber-950/10",
    blue: "border-blue-500/40 bg-blue-950/10",
    rose: "border-rose-500/40 bg-rose-950/10",
  };
  const texts: Record<SubAgentColorKey, string> = {
    green: "text-emerald-400/70",
    amber: "text-amber-400/70",
    blue: "text-blue-400/70",
    rose: "text-rose-400/70",
  };
  
  return (
    <div className={`border border-dashed rounded-xl p-2.5 w-full max-w-[240px] mx-auto flex flex-col relative mt-4 z-20 ${borders[colorKey]}`}>
      <div className={`absolute -top-3 left-3 bg-[#030712] px-2 text-[10px] font-mono tracking-widest uppercase ${texts[colorKey]}`}>
        {title}
      </div>
      <div className="flex flex-col mt-2">
        {children}
      </div>
    </div>
  );
};

const BidirectionalConnection = () => (
  <div className="hidden lg:block absolute top-[50px] left-[12.5%] w-[50%] h-[60px] pointer-events-none z-10">
    <svg width="100%" height="100%" className="overflow-visible text-amber-400/60 drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]">
      <defs>
        <marker id="arrow-start" markerWidth="10" markerHeight="10" refX="2" refY="5" orient="auto-start-reverse">
          <path d="M 10 0 L 0 5 L 10 10 z" fill="currentColor" />
        </marker>
        <marker id="arrow-end" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
        </marker>
      </defs>
      <path 
        d="M 0 0 C 0 80, 100% 80, 100% 0" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeDasharray="6 6" 
        className="animate-dash" 
        markerStart="url(#arrow-start)" 
        markerEnd="url(#arrow-end)"
      />
    </svg>
  </div>
);

const AgentCluster = () => (
  <div className="w-full relative">
    <BidirectionalConnection />
    
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-4 w-full">
      {/* Column 1: Knowledge / RAG */}
      <div className="flex flex-col h-full items-center">
        <SystemNode 
          title="Knowledge Agent" 
          description="Vector RAG & docs" 
          icon={Brain} 
          colorKey="amber" 
          className="z-20 h-32 justify-center"
        />
        <FlowArrow length="h-6" pulseColor="text-amber-500/50" />
        <SubAgentBox title="RAG Pipeline" colorKey="amber">
           <SystemNode title="Query Rewrite" icon={RefreshCcw} colorKey="amber" micro />
           <MiniArrow colorClass="text-amber-500/50" />
           <SystemNode title="Retriever" icon={Search} colorKey="amber" micro />
           <MiniArrow colorClass="text-amber-500/50" />
           <SystemNode title="Rank Chunks" icon={AlignLeft} colorKey="amber" micro />
           <MiniArrow colorClass="text-amber-500/50" />
           <SystemNode title="Generate Answer" icon={MessageSquare} colorKey="amber" micro />
           <MiniArrow colorClass="text-amber-500/50" />
           <SystemNode title="Citations" icon={Link} colorKey="amber" micro />
        </SubAgentBox>
        <div className="hidden lg:block flex-1 w-px bg-amber-500/30 mt-2"></div>
      </div>

      {/* Column 2: Task Execution */}
      <div className="flex flex-col h-full items-center relative z-20">
        <SystemNode 
          title="Task Execution" 
          description="Action execution & writes" 
          icon={Wrench} 
          colorKey="amber" 
          className="h-32 justify-center"
        />
        <FlowArrow length="h-6" pulseColor="text-amber-500/50" />
        <SubAgentBox title="Tool Execution" colorKey="green">
           <SystemNode title="Plan Action" icon={Target} colorKey="green" micro />
           <MiniArrow colorClass="text-emerald-500/50" />
           <SystemNode title="Permission Check" icon={Lock} colorKey="green" micro />
           <MiniArrow colorClass="text-emerald-500/50" />
           <SystemNode title="MCP / API Call" icon={Webhook} colorKey="green" micro />
           <MiniArrow colorClass="text-emerald-500/50" />
           <SystemNode title="Result Normalization" icon={FileText} colorKey="green" micro />
        </SubAgentBox>
        <div className="hidden lg:block flex-1 w-px bg-emerald-500/30 mt-2"></div>
      </div>

      {/* Column 3: Account Manager */}
      <div className="flex flex-col h-full items-center z-20">
        <SystemNode 
          title="Account Manager" 
          description="Billing & seat limits" 
          icon={Users} 
          colorKey="amber" 
          className="h-32 justify-center"
        />
        <FlowArrow length="h-6" pulseColor="text-amber-500/50" />
        <SubAgentBox title="State & Entitlements" colorKey="blue">
           <SystemNode title="Billing & Seats" icon={Users} colorKey="blue" micro />
           <MiniArrow colorClass="text-blue-500/50" />
           <SystemNode title="Entitlements Check" icon={Shield} colorKey="blue" micro />
           <MiniArrow colorClass="text-blue-500/50" />
           <SystemNode title="Account State" icon={Database} colorKey="blue" micro />
        </SubAgentBox>
        <div className="hidden lg:block flex-1 w-px bg-amber-500/30 mt-2"></div>
      </div>

      {/* Column 4: Retention */}
      <div className="flex flex-col h-full items-center z-20">
        <SystemNode 
          title="Retention Agent" 
          description="Churn risk mitigation" 
          icon={UserMinus} 
          colorKey="amber" 
          className="h-32 justify-center"
        />
        <FlowArrow length="h-6" pulseColor="text-amber-500/50" />
        <SubAgentBox title="Escalation Route" colorKey="rose">
           <SystemNode title="Detect Churn Risk" icon={Activity} colorKey="rose" micro />
           <MiniArrow colorClass="text-rose-500/50" />
           <SystemNode title="Prepare Escalation" icon={UserCheck} colorKey="rose" micro />
        </SubAgentBox>
        <div className="hidden lg:block flex-1 w-px bg-amber-500/30 mt-2"></div>
      </div>
    </div>
  </div>
);

const DeliveryPaths = () => (
  <div className="w-full flex flex-col items-center">
    <div className="w-[50%] h-[2px] bg-rose-500/30 relative mt-4">
      <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-[#030712] px-3 text-xs text-rose-400 font-mono text-center whitespace-nowrap">
        Route by Source Agent & Risk Level
      </div>
    </div>
    
    <div className="w-[50%] flex justify-between h-8">
      <div className="flex flex-col items-center">
        <svg width="2" height="32" className="text-teal-500/50">
          <line x1="1" y1="0" x2="1" y2="32" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
        </svg>
      </div>
      <div className="flex flex-col items-center">
        <svg width="2" height="32" className="text-rose-500/50">
          <line x1="1" y1="0" x2="1" y2="32" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" className="animate-dash" />
        </svg>
      </div>
    </div>

    <div className="w-full max-w-3xl grid grid-cols-2 gap-8 mt-2">
      {/* Left Path: Direct */}
      <div className="flex flex-col items-center gap-4">
        <div className="p-3 flex flex-col items-center justify-center text-sm border border-dashed border-teal-900/50 rounded-lg w-full bg-teal-950/10">
          <span className="font-semibold text-teal-400 mb-1">Direct Path</span>
          <span className="text-xs text-slate-400 text-center">
            if <strong className="text-amber-200 font-normal">Knowledge / Account Agent</strong> → passes Safety Level
          </span>
        </div>
        <FlowArrow length="h-8" pulseColor="text-teal-500/50" />
        <SystemNode 
          title="User Response" 
          description="Instant resolution via UI" 
          icon={CheckCircle} 
          colorKey="mint" 
        />
      </div>

      {/* Right Path: Human in Loop */}
      <div className="flex flex-col items-center gap-4">
        <div className="p-3 flex flex-col items-center justify-center text-sm border border-dashed border-rose-900/50 rounded-lg w-full bg-rose-950/10">
          <span className="font-semibold text-rose-400 mb-1">Human Handoff Route</span>
          <span className="text-xs text-slate-400 text-center">
            if <strong className="text-amber-200 font-normal">Task Agent (MCP)</strong> → High Risk<br/>
            or <strong className="text-amber-200 font-normal">Retention Agent</strong> → Escalation
          </span>
        </div>
        <SystemNode 
          title="ServiceNow / Salesforce" 
          description="Human queue & CRM logging" 
          icon={Cloud} 
          colorKey="red" 
        />
        <FlowArrow length="h-8" pulseColor="text-rose-500/50" />
        <SystemNode 
          title="User Response" 
          description="Guided handoff / CTA" 
          icon={CheckCircle} 
          colorKey="mint" 
        />
      </div>
    </div>
  </div>
);

const AsyncLoggingLayer = () => (
  <div className="w-full max-w-4xl border-t border-dashed border-slate-700/50 mt-16 pt-8 flex flex-col items-center relative z-10">
    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#030712] px-4 text-xs text-slate-500 font-mono tracking-widest uppercase flex items-center gap-2">
      <Activity className="w-4 h-4" /> Continuous System Tracking
    </div>
    <div className="flex flex-col md:flex-row justify-center gap-4 w-full px-4">
      <div className="flex-1 border border-slate-800/60 bg-slate-900/20 rounded-lg p-3 flex items-center gap-3">
        <Activity className="w-5 h-5 text-purple-400" />
        <div>
          <div className="text-sm font-semibold text-slate-300">Observability</div>
          <div className="text-xs text-slate-500">Traces, Latency & Cost</div>
        </div>
      </div>
      <div className="flex-1 border border-slate-800/60 bg-slate-900/20 rounded-lg p-3 flex items-center gap-3">
        <Target className="w-5 h-5 text-mint-400" />
        <div>
          <div className="text-sm font-semibold text-slate-300">Evaluation</div>
          <div className="text-xs text-slate-500">Hallucination & Quality Checks</div>
        </div>
      </div>
      <div className="flex-1 border border-slate-800/60 bg-slate-900/20 rounded-lg p-3 flex items-center gap-3">
        <FileText className="w-5 h-5 text-blue-400" />
        <div>
          <div className="text-sm font-semibold text-slate-300">Auditability</div>
          <div className="text-xs text-slate-500">Action & Tool Execution Logs</div>
        </div>
      </div>
    </div>
  </div>
);

const ImpactCard = ({ icon: Icon, title, desc, color }: ImpactCardProps) => {
  const bgColors: Record<ImpactColorKey, string> = {
    blue: "bg-blue-500/10 text-blue-400",
    cyan: "bg-cyan-500/10 text-cyan-400",
    amber: "bg-amber-500/10 text-amber-400",
    green: "bg-emerald-500/10 text-emerald-400",
    rose: "bg-rose-500/10 text-rose-400",
    purple: "bg-purple-500/10 text-purple-400",
    mint: "bg-teal-500/10 text-teal-400",
  };
  
  return (
    <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors flex flex-col h-full">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 shrink-0 ${bgColors[color]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <h4 className="text-slate-200 font-semibold mb-2 text-sm">{title}</h4>
      <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
};

const ProductionImpactPanel = () => (
  <div className="w-full mt-24 pt-12 border-t border-slate-800">
    <div className="mb-10 text-center md:text-left">
      <h2 className="text-2xl md:text-3xl font-bold text-slate-200 mb-3">Why This Architecture Matters in Production</h2>
      <p className="text-slate-400 text-sm md:text-base max-w-2xl">
        Each layer reduces a real failure mode in enterprise AI agent deployments.
      </p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <ImpactCard 
        icon={Zap} 
        title="Trigger Layer" 
        desc="Handles user requests from web, Slack, API, webhook, or scheduled jobs. Examples: Next.js, Slack App, API Gateway, Event Grid, Kafka." 
        color="blue" 
      />
      <ImpactCard 
        icon={ShieldAlert} 
        title="Security Layer" 
        desc="Protects access, identity, tenant data, and risky actions. Examples: OAuth, RBAC/ABAC, Azure AD, Okta, policy engine, secrets manager." 
        color="rose" 
      />
      <ImpactCard 
        icon={Network} 
        title="Orchestration Layer" 
        desc="Controls routing, state transitions, retries, agent handoffs, and human approval. Examples: LangGraph, Semantic Kernel, AutoGen, custom state machine." 
        color="cyan" 
      />
      <ImpactCard 
        icon={Database} 
        title="Retrieval Layer" 
        desc="Brings trusted business context into the agent before answering. Examples: vector DB, Azure AI Search, OpenSearch, Pinecone, Databricks, Confluence, Glean." 
        color="amber" 
      />
      <ImpactCard 
        icon={Wrench} 
        title="Tools Layer" 
        desc="Executes approved actions through controlled tool interfaces. Examples: MCP servers, REST APIs, internal services, ServiceNow, Salesforce, Jira, Datadog." 
        color="green" 
      />
      <ImpactCard 
        icon={Blocks} 
        title="State & Memory Layer" 
        desc="Stores session state, graph checkpoints, tool results, user context, and approval status. Examples: LangGraph checkpointing, Redis, Postgres, Cosmos DB." 
        color="mint" 
      />
      <ImpactCard 
        icon={Activity} 
        title="Observability Layer" 
        desc="Tracks logs, traces, latency, cost, failures, and tool-call history for debugging and audits. Examples: LangSmith, Datadog, Grafana, CloudWatch, Azure Monitor." 
        color="purple" 
      />
      <ImpactCard 
        icon={Target} 
        title="Evaluation Layer" 
        desc="Measures answer quality, tool accuracy, hallucination risk, and workflow drift. Examples: LangSmith evals, Databricks MLflow, RAGAS, custom test sets, offline grading." 
        color="mint" 
      />
    </div>
  </div>
);

/* --- Docs Components --- */

const DocTable = ({ headers, rows }: { headers: string[]; rows: string[][] }) => (
  <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/30 mb-6">
    <table className="w-full text-left border-collapse min-w-[600px]">
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} className="bg-slate-800/50 p-4 text-xs uppercase tracking-wider text-slate-400 border-b border-slate-800 font-semibold">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-800/50">
        {rows.map((row, i) => (
          <tr key={i} className="hover:bg-slate-800/30 transition-colors">
            {row.map((cell, j) => (
              <td key={j} className={`p-4 text-sm ${j === 0 ? 'text-slate-200 font-medium' : 'text-slate-400'}`}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const DocCallout = ({ children }: { children: React.ReactNode }) => (
  <div className="border-l-4 border-indigo-500 bg-indigo-500/10 p-5 rounded-r-xl mb-6 relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-10">
      <MessageCircle className="w-16 h-16 text-indigo-400" />
    </div>
    <div className="relative z-10 text-slate-300 italic leading-relaxed text-sm">
      <span className="font-semibold text-indigo-300 not-italic block mb-2 text-xs tracking-wider uppercase">Note</span>
      &ldquo;{children}&rdquo;
    </div>
  </div>
);

const SystemDesignDocs = () => {
  return (
    <div className="w-full mt-32 pt-16 border-t border-slate-800/80 max-w-5xl mx-auto flex flex-col gap-16 pb-20">
      
      {/* Header */}
      <div className="text-center md:text-left border-b border-slate-800 pb-8">
        <div className="inline-flex items-center justify-center p-2 bg-indigo-500/10 text-indigo-400 rounded-lg mb-4 border border-indigo-500/20">
          <TerminalSquare className="w-5 h-5 mr-2" />
          <span className="text-sm font-mono tracking-widest uppercase">System Design Document</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-100 mb-4 tracking-tight">Enterprise Multi-Agent AI Assistant</h2>
        <p className="text-slate-400 text-lg max-w-3xl">Comprehensive requirements, architecture logic, and operational metrics gathered for production deployment.</p>
      </div>

      {/* Section 1 */}
      <section>
        <h3 className="text-2xl font-semibold text-slate-200 mb-4 flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700">1</span>
          Clarify the Problem
        </h3>
        <p className="text-slate-400 mb-6 leading-relaxed">
          We are designing an enterprise AI assistant for a web and mobile experience. The assistant helps users ask questions, retrieve trusted business knowledge, understand account or subscription details, perform approved actions, and escalate complex issues to human support when needed.
        </p>
        <p className="text-slate-400 mb-6 leading-relaxed">
          The system should support both self-service answers and action-oriented workflows, while keeping security, accuracy, permission checks, and auditability in place.
        </p>
        
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h4 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">Example User Requests</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Why was my billing seat limit exceeded?",
              "What does my subscription include?",
              "Can you explain this policy?",
              "Create a support case for this issue.",
              "Update my account preference.",
              "Cancel this subscription, but confirm before taking action.",
              "Show me the status of my recent support case."
            ].map((req, i) => (
              <div key={i} className="flex items-start gap-3 bg-slate-800/40 p-3 rounded-lg border border-slate-700/50">
                <MessageSquare className="w-4 h-4 mt-0.5 text-indigo-400 shrink-0" />
                <span className="text-sm text-slate-300 italic">&ldquo;{req}&rdquo;</span>
              </div>
            ))}
          </div>
        </div>
        <p className="text-slate-400 mt-6 leading-relaxed">
          <strong>The Goal:</strong> Design a secure, scalable, reliable, observable, and production-ready multi-agent AI assistant using web/mobile entry points, API gateway, authentication, LangGraph-style orchestration, RAG, MCP/tool execution, guardrails, and human-in-the-loop escalation.
        </p>
      </section>

      {/* Section 2 */}
      <section>
        <h3 className="text-2xl font-semibold text-slate-200 mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700">2</span>
          Define Functional Requirements
        </h3>
        <p className="text-slate-400 mb-6">Functional requirements describe what the system must do.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {[
            "Accept user requests from web app, mobile app, or API.",
            "Authenticate user and identify role, tenant, account, subscription, and session.",
            "Validate request using input guardrails.",
            "Detect unsafe prompts, prompt injection, unsupported scope, sensitive data, and unauthorized intent.",
            "Classify the user's intent.",
            "Route request to correct specialist agent.",
            "Support knowledge-based Q&A using trusted documents and RAG.",
            "Generate grounded answers with citations when using enterprise knowledge.",
            "Support account, billing, subscription, entitlement, and seat-limit questions.",
            "Execute approved actions through MCP tools, internal APIs, or enterprise services.",
            "Check permissions before every read or write action.",
            "Require user confirmation or human approval for risky write actions.",
            "Escalate unresolved, risky, or sensitive cases to human support or CRM.",
            "Return a final validated response to the user.",
            "Store session state, tool results, approval status, traces, and audit logs.",
            "Support feedback collection for quality improvement.",
            "Support web and mobile responsive behavior."
          ].map((req, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-sm text-slate-300">{req}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3 */}
      <section className="space-y-12">
        <div className="border-b border-slate-800 pb-4">
          <h3 className="text-2xl font-semibold text-slate-200 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700">3</span>
            Define Non-Functional Requirements
          </h3>
          <p className="text-slate-400 mt-2">Describing how well the system must work across performance, security, and scale.</p>
        </div>

        {/* 3.1 */}
        <div>
          <h4 className="text-xl font-medium text-slate-200 mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-blue-400" /> 3.1 Performance and Latency</h4>
          <p className="text-sm text-slate-400 mb-4">For a web/mobile AI assistant, we separate normal UI performance from AI workflow performance.</p>
          
          <h5 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider mt-6">Web & Mobile App Performance</h5>
          <DocTable 
            headers={["Area", "Ideal Target", "Acceptable Target", "Notes"]}
            rows={[
              ["Initial page/app shell load", "≤ 2.5 seconds LCP", "≤ 4 seconds", "Aligns with Core Web Vitals loading guidance."],
              ["Server response / TTFB", "≤ 800 ms", "≤ 1.8 seconds", "Good backend responsiveness target."],
              ["UI tap/click feedback", "≤ 100 ms", "≤ 200 ms", "User should feel the UI reacted immediately."],
              ["Interaction responsiveness", "≤ 200 ms INP", "≤ 500 ms", "Good Core Web Vitals responsiveness target."],
              ["Layout stability", "CLS ≤ 0.1", "CLS ≤ 0.25", "Avoid content jumping during load."],
              ["Cached/revisited page reload", "≤ 1 second", "≤ 2 seconds", "Use caching, CDN, and client-side hydration."],
              ["API read request", "300–800 ms", "≤ 1.5 seconds", "For normal account/profile/status reads."],
              ["API write request", "≤ 1.5 seconds", "≤ 3 seconds", "For preference updates or simple case creation."]
            ]}
          />

          <h5 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider mt-8">AI Assistant Response Performance</h5>
          <DocTable 
            headers={["Request Type", "Ideal Target", "Acceptable Target", "UX Behavior"]}
            rows={[
              ["Simple greeting/help prompt", "≤ 1 second", "≤ 2 seconds", "Return immediately."],
              ["Basic account/status answer", "2–4 seconds", "≤ 6 seconds", "Show loading state if needed."],
              ["RAG-based answer with citations", "4–7 seconds", "≤ 10 seconds", "Stream partial response or show progress."],
              ["Tool/MCP action workflow", "5–9 seconds", "≤ 15 seconds", "Show step status: checking permission, calling tool, validating result."],
              ["High-risk action requiring approval", "Depends on approval", "Not fully automated", "Ask user/human for confirmation."],
              ["Human escalation", "Case created ≤ 10s", "≤ 20 seconds", "Show ticket/case reference if available."]
            ]}
          />

          <DocCallout>
            For UI performance, I would target Core Web Vitals: LCP under 2.5 seconds, INP under 200 milliseconds, CLS under 0.1, and TTFB under 800 milliseconds. For AI workflows, I would separate simple answers from tool-heavy workflows. A simple answer should return within 1–2 seconds, RAG answers should ideally complete in 4–7 seconds, and tool-based workflows can take 5–9 seconds with progress indicators and streaming.
          </DocCallout>
        </div>

        {/* 3.2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-xl font-medium text-slate-200 mb-4 flex items-center gap-2"><Activity className="w-5 h-5 text-emerald-400" /> 3.2 Availability & Reliability</h4>
            <DocTable 
              headers={["Area", "Target"]}
              rows={[
                ["Web/mobile frontend", "99.9% or higher"],
                ["API/backend availability", "99.9% or higher"],
                ["Critical account/action services", "99.9% or higher"],
                ["AI model fallback path", "Required"],
                ["Tool/API retry support", "Required"],
                ["Graceful degradation", "Required"]
              ]}
            />
            <ul className="list-disc pl-5 text-sm text-slate-400 space-y-2 mt-4 marker:text-slate-600">
              <li>If the AI model fails, retry or use a fallback model.</li>
              <li>If RAG retrieval fails, return a safe fallback.</li>
              <li>If API fails, retry with backoff. If it still fails, escalate.</li>
              <li>If confidence is low, ask clarifying question.</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-medium text-slate-200 mb-4 flex items-center gap-2"><Scale className="w-5 h-5 text-amber-400" /> 3.3 Scalability</h4>
            <DocTable 
              headers={["Area", "Requirement"]}
              rows={[
                ["Users", "Support many concurrent web/mobile users."],
                ["Tenants/accounts", "Isolate data and scale per tenant."],
                ["RAG queries", "Scale vector/search independently."],
                ["Tool calls", "Use queueing, rate limits, and retries."],
                ["Traffic spikes", "Use autoscaling and CDN caching."]
              ]}
            />
            <div className="mt-4 border-l-4 border-indigo-500 bg-indigo-500/10 p-4 rounded-r-lg">
              <p className="text-xs text-indigo-300 italic">&ldquo;I would scale the frontend through CDN/edge caching, scale the API layer horizontally, scale RAG independently, and isolate long-running tool workflows through queues/async workers.&rdquo;</p>
            </div>
          </div>
        </div>

        {/* 3.4 & 3.5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-rose-950/20 border border-rose-900/50 p-6 rounded-xl">
            <h4 className="text-xl font-medium text-rose-200 mb-4 flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-rose-400" /> 3.4 Security Requirements</h4>
            <ul className="text-sm text-slate-300 space-y-2">
              {[
                "Use authentication for every user.",
                "Use RBAC/ABAC for authorization.",
                "Enforce tenant isolation.",
                "Permission checks before retrieval and tool execution.",
                "Never expose secrets to the model.",
                "Use a tool allowlist & detect prompt injection.",
                "Sanitize inputs/outputs and encrypt data."
              ].map((item, i) => <li key={i} className="flex gap-2"><Lock className="w-4 h-4 text-rose-400/70 shrink-0 mt-0.5"/> <span>{item}</span></li>)}
            </ul>
            <div className="mt-4 pt-4 border-t border-rose-900/30">
              <span className="text-xs text-rose-400 font-semibold uppercase tracking-wider block mb-2">Risky Actions (Require Approval):</span>
              <p className="text-xs text-slate-400">cancellation, refund, payment change, downgrade, entitlement change, ownership change, CRM escalation with sensitive data.</p>
            </div>
          </div>

          <div className="bg-cyan-950/20 border border-cyan-900/50 p-6 rounded-xl">
            <h4 className="text-xl font-medium text-cyan-200 mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-cyan-400" /> 3.5 Accuracy & Grounding</h4>
            <ul className="text-sm text-slate-300 space-y-2 mb-4">
              {[
                "Use RAG for policy, docs, and product answers.",
                "Retrieve only documents the user can access.",
                "Use reranking or top-chunk selection.",
                "Provide citations and validate answers.",
                "Detect hallucination risk and ask clarifying questions."
              ].map((item, i) => <li key={i} className="flex gap-2"><Check className="w-4 h-4 text-cyan-400/70 shrink-0 mt-0.5"/> <span>{item}</span></li>)}
            </ul>
            <DocTable 
              headers={["Metric", "Target"]}
              rows={[
                ["Citation coverage", "≥ 95%"],
                ["Unsupported answer rate", "< 2–5%"],
                ["Tool-call success rate", "≥ 95% for stable tools"],
                ["Human escalation accuracy", "≥ 90%"]
              ]}
            />
          </div>
        </div>

        {/* 3.6 - 3.9 grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-slate-800 bg-slate-900/20 p-5 rounded-xl">
            <h4 className="font-semibold text-slate-200 flex items-center gap-2 mb-3"><Activity className="w-4 h-4 text-purple-400" /> 3.6 Observability</h4>
            <p className="text-xs text-slate-400 mb-3">Track: Request ID, Intent, Agent route, Model/Retrieval/Tool latency, Cost, Errors, Feedback.</p>
            <p className="text-xs text-slate-500 font-mono">Tools: LangSmith, Datadog, CloudWatch, MLflow</p>
          </div>
          <div className="border border-slate-800 bg-slate-900/20 p-5 rounded-xl">
            <h4 className="font-semibold text-slate-200 flex items-center gap-2 mb-3"><FileText className="w-4 h-4 text-blue-400" /> 3.7 Auditability & Compliance</h4>
            <p className="text-xs text-slate-400 mb-3">Requirements: Log every tool call, write action, approval decision, user confirmation. Track citations. Support retention policies.</p>
          </div>
          <div className="border border-slate-800 bg-slate-900/20 p-5 rounded-xl">
            <h4 className="font-semibold text-slate-200 flex items-center gap-2 mb-3"><Settings className="w-4 h-4 text-slate-400" /> 3.8 Maintainability</h4>
            <p className="text-xs text-slate-400 mb-3">Modular architecture: Agents separated by responsibility, versioned prompts, registered tools, refreshable indexes.</p>
          </div>
          <div className="border border-slate-800 bg-slate-900/20 p-5 rounded-xl">
            <h4 className="font-semibold text-slate-200 flex items-center gap-2 mb-3"><TrendingUp className="w-4 h-4 text-emerald-400" /> 3.9 Cost Efficiency</h4>
            <p className="text-xs text-slate-400 mb-3">Use caching, route simple intents to smaller models, stream responses, track cost per workflow, set budget alerts.</p>
          </div>
        </div>
      </section>

      {/* Section 4 & 5 */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-semibold text-slate-200 mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700">4</span>
            Users & Entry Points
          </h3>
          <div className="flex gap-8">
            <div>
              <h5 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Users</h5>
              <ul className="text-sm text-slate-400 space-y-1 list-disc pl-4 marker:text-slate-600">
                <li>Customers & Employees</li>
                <li>Support agents</li>
                <li>Account managers</li>
                <li>Admin / Ops teams</li>
              </ul>
            </div>
            <div>
              <h5 className="text-sm font-semibold text-slate-300 mb-3 uppercase tracking-wider">Entry Points</h5>
              <ul className="text-sm text-slate-400 space-y-1 list-disc pl-4 marker:text-slate-600">
                <li>Web application</li>
                <li>Mobile application</li>
                <li>API Gateway</li>
                <li>Webhook / Event Job</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-2xl font-semibold text-slate-200 mb-6 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700">5</span>
            High-Level Architecture
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed mb-4">
            <em className="text-slate-300">See the interactive visual diagram at the top of this page.</em>
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            The main idea is that the system first validates the user and request, then uses a stateful orchestrator to route work to the right specialist agent. Knowledge requests go through RAG. Action requests go through MCP tools or internal APIs. Risky workflows require permission checks and human approval. The final response is validated before being returned, and all steps are logged.
          </p>
        </div>
      </section>

      {/* Section 6 */}
      <section>
        <h3 className="text-2xl font-semibold text-slate-200 mb-6 flex items-center gap-3">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-slate-300 text-sm border border-slate-700">6</span>
          End-to-End Request Flow
        </h3>
        <div className="bg-indigo-950/20 border border-indigo-900/50 p-4 rounded-xl mb-8 flex items-start gap-4">
          <MessageSquare className="w-5 h-5 text-indigo-400 mt-0.5 shrink-0" />
          <div>
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider block mb-1">Example Request Trigger</span>
            <p className="text-sm text-slate-200 italic">“Why was my billing seat limit exceeded, and can you create a support case?”</p>
          </div>
        </div>

        <div className="relative border-l-2 border-slate-800 ml-4 pl-8 space-y-6">
          {[
            { step: "User sends a message through the web or mobile app." },
            { step: "Request reaches the API Gateway." },
            { step: "Auth layer validates user identity, role, tenant, and account context." },
            { step: "Input Guardrail checks prompt injection, PII risk, unsafe content, and permission boundaries." },
            { step: "LangGraph StateGraph Supervisor receives the request." },
            { step: "Supervisor reads shared graph state, previous conversation context, and session metadata." },
            { step: "Supervisor classifies the intent as both an account question and a support action." },
            { step: "Account Manager Agent checks billing, subscription, seat usage, entitlement, and account state." },
            { step: "Knowledge Agent retrieves billing rules or product policy using RAG if needed." },
            { step: "Task Execution Agent prepares a plan to create a support case." },
            { step: "System performs permission checks before case creation." },
            { step: "If allowed and low risk, the MCP Client calls the approved CRM or case-management tool." },
            { step: "If risky, the system asks for confirmation or routes to human approval." },
            { step: "Tool result is normalized and returned to the supervisor." },
            { step: "Output Validation layer checks final answer for citations, hallucination risk, policy compliance, PII, and action confirmation." },
            { step: "User receives a final answer with the reason for the seat-limit issue and the support case status." },
            { step: "Logs, traces, tool calls, state updates, and evaluation data are stored." }
          ].map((item, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-indigo-500 z-10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed"><span className="text-slate-500 mr-2">{i+1}.</span>{item.step}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Summary Box */}
      <div className="mt-8 p-1 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-cyan-500/20 to-emerald-500/20">
        <div className="bg-[#030712] rounded-xl p-8 text-center border border-slate-800/50">
          <h4 className="text-xl font-bold text-slate-100 mb-4">Requirement Summary</h4>
          <p className="text-sm text-slate-400 max-w-3xl mx-auto leading-relaxed">
            For this system, I would first gather functional requirements around web/mobile user input, authentication, intent routing, RAG-based answers, tool execution, permission checks, human approval, escalation, and final response validation. 
            <br/><br/>
            For non-functional requirements, I would define clear targets: initial page load under 2.5s, TTFB under 800ms, interaction response under 200ms, simple AI answers in 1–2s, RAG answers in 4–7s, and tool workflows in 5–9s with progress indicators. I would also define availability, scalability, security, accuracy, observability, auditability, maintainability, and cost-efficiency requirements.
          </p>
        </div>
      </div>

    </div>
  );
};


export default function AgenticWorkflowPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden pb-32">
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-center">
        <div className="absolute top-0 w-[1000px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute top-[40%] w-[800px] h-[600px] bg-indigo-900/10 blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto py-16 flex flex-col items-center">
        
        {/* Header Text */}
        <div className="text-center mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span className="text-xs font-medium text-slate-300 tracking-wide uppercase">System Architecture</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-cyan-100 to-slate-300 mb-6 tracking-tight">
            Agentic Workflow System Design
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            A production-ready reference architecture for multi-agent applications. Features LangGraph stateful orchestration, conditional HITL routing, isolated tool execution, and unified safety constraints.
          </p>
        </div>

        {/* Diagram Canvas */}
        <div className="w-full flex flex-col items-center">
          {/* 1. Web & Mobile Experience */}
          <div className="flex gap-4">
            <SystemNode 
              title="Web App" 
              icon={MessageSquare} 
              colorKey="purple" 
              compact
            />
            <SystemNode 
              title="Mobile App" 
              icon={MessageSquare} 
              colorKey="purple" 
              compact
            />
          </div>
          <FlowArrow pulseColor="text-purple-500/50" />

          {/* 2. API Gateway & Auth */}
          <SystemNode 
            title="API Gateway & Auth" 
            description="Authentication & tenant context" 
            icon={Fingerprint} 
            colorKey="blue" 
          />
          <FlowArrow pulseColor="text-blue-500/50" />

          {/* 3. Input Guardrail */}
          <SystemNode 
            title="Input Guardrail" 
            description="Safety, PII, scope & permission checks" 
            icon={Shield} 
            colorKey="pink" 
          />
          <FlowArrow pulseColor="text-pink-500/50" />

          {/* 4. Supervisor + Shared State Sidecar */}
          <div className="relative flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-2xl">
            <div className="relative flex-1 flex justify-end">
              <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full"></div>
              <SystemNode 
                title="LangGraph Supervisor" 
                description="Reads graph state & routes intent" 
                icon={Network} 
                colorKey="cyan" 
                className="border-cyan-400/50 relative z-20 w-full max-w-[320px]"
              />
            </div>
            
            <div className="hidden md:block w-8 h-[2px] bg-cyan-500/30"></div>
            <div className="md:hidden h-8 w-[2px] bg-cyan-500/30"></div>
            
            <div className="flex-1 flex justify-start">
              <SystemNode 
                title="Shared Graph State" 
                description="Session state, context & tool results" 
                icon={Database} 
                colorKey="mint" 
                compact
                className="relative z-20"
              />
            </div>
          </div>
          
          {/* Fan-out down to Agents */}
          <div className="w-full max-w-5xl">
            <FanOutArrow />
          </div>

          {/* Mobile connector fallback (hidden on lg) */}
          <div className="flex lg:hidden flex-col items-center w-full">
            <FlowArrow length="h-8" pulseColor="text-cyan-500/50" />
          </div>

          {/* 5. Agent Cluster (Horizontal Row) */}
          <div className="w-full max-w-5xl mt-2 lg:mt-0 relative z-20">
             <AgentCluster />
          </div>

          {/* Merge arrows from 4 agents back to 1 central flow */}
          <div className="w-full max-w-5xl">
            <MergeArrow />
          </div>

           {/* Mobile connector fallback (hidden on lg) */}
           <div className="flex lg:hidden flex-col items-center w-full">
             <FlowArrow length="h-8" pulseColor="text-amber-500/50" />
          </div>

          {/* 6. Output Validation Layer */}
          <SystemNode 
            title="Output Validation & Guardrails" 
            description="Policy, hallucination, citation & PII checks" 
            icon={ShieldAlert} 
            colorKey="red" 
          />

          {/* 7. Delivery Split */}
          <DeliveryPaths />

          {/* 8. Continuous Logging & Audit */}
          <AsyncLoggingLayer />

        </div>

        {/* Bottom Production Impact Panel */}
        <ProductionImpactPanel />

        {/* Requirements Gathering Docs */}
        <SystemDesignDocs />

      </div>
      
      {/* Global styles for dashed animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to { stroke-dashoffset: -12; }
        }
        .animate-dash {
          animation: dash 1s linear infinite;
        }
        .node-hover-effect {
          transition: all 0.3s ease;
        }
        .node-hover-effect:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
          filter: brightness(1.1);
        }
      `}} />
    </div>
  );
}