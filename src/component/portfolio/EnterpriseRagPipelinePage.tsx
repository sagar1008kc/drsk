'use client';

import { useState, useEffect, useRef, useCallback, type CSSProperties } from 'react';
import PortfolioBackLink from '@/component/portfolio/PortfolioBackLink';
import RagFundamentalsSection from '@/component/portfolio/RagFundamentalsSection';

type PipelineStage = {
  id: string;
  label: string;
  sublabel: string;
  icon: string;
  color: string;
  group: string;
  isParallel?: boolean;
};

type StageMetric = { k: string; v: string };

type StageDetail = {
  title: string;
  description: string;
  metrics: StageMetric[];
  code: string;
  payload: string;
  tags: string[];
};

type PipelineResponse = {
  answer: string;
  citations: { title: string; source: string; confidence: number }[];
  metrics: Record<string, string | number>;
  followUps: string[];
};

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "user_interface",
    label: "User Interface",
    sublabel: "React · Teams · Slack",
    icon: "◈",
    color: "#818CF8",
    group: "ingress",
  },
  {
    id: "api_gateway",
    label: "API Gateway",
    sublabel: "Auth · Rate Limit · Logs",
    icon: "⬡",
    color: "#38BDF8",
    group: "ingress",
  },
  {
    id: "query_understanding",
    label: "Query Understanding",
    sublabel: "Intent · Rewrite · Route",
    icon: "◎",
    color: "#34D399",
    group: "processing",
  },
  {
    id: "retrieval",
    label: "Hybrid Retrieval",
    sublabel: "Vector · BM25 · Tools",
    icon: "⊕",
    color: "#FB923C",
    group: "retrieval",
    isParallel: true,
  },
  {
    id: "permission_filter",
    label: "Permission Filter",
    sublabel: "RBAC · ABAC · ACL",
    icon: "⊛",
    color: "#F472B6",
    group: "security",
  },
  {
    id: "reranking",
    label: "Reranking Layer",
    sublabel: "Cohere · Cross-encoder",
    icon: "⟁",
    color: "#A78BFA",
    group: "processing",
  },
  {
    id: "context_builder",
    label: "Context Builder",
    sublabel: "Compress · Cite · Trim",
    icon: "⬡",
    color: "#2DD4BF",
    group: "processing",
  },
  {
    id: "llm_generation",
    label: "LLM Generation",
    sublabel: "Azure OpenAI · Claude",
    icon: "✦",
    color: "#FBBF24",
    group: "generation",
  },
  {
    id: "validation",
    label: "Validation Layer",
    sublabel: "Grounding · Policy",
    icon: "◉",
    color: "#F87171",
    group: "security",
  },
  {
    id: "final_response",
    label: "Final Response",
    sublabel: "Answer + Citations",
    icon: "◈",
    color: "#34D399",
    group: "egress",
  },
];

const RETRIEVAL_CHANNELS = [
  { id: "vector", label: "Vector Search", sublabel: "Embeddings · ANN", icon: "◎", color: "#818CF8" },
  { id: "keyword", label: "Keyword Search", sublabel: "BM25 · Filters", icon: "⟁", color: "#38BDF8" },
  { id: "tool", label: "Tool / API Search", sublabel: "CRM · ERP · APIs", icon: "⬡", color: "#34D399" },
];

const STAGE_DETAILS: Record<string, StageDetail> = {
  user_interface: {
    title: "User / Application Interface",
    description: "Multi-channel ingress layer accepting queries from enterprise frontends. Handles session management, conversation history, and streaming response delivery.",
    metrics: [{ k: "Channels", v: "React, Teams, Slack, REST" }, { k: "Protocol", v: "WebSocket + SSE" }, { k: "Session TTL", v: "30 min" }, { k: "Concurrency", v: "10k simultaneous" }],
    code: `// Streaming query submission
const sendQuery = async (query, sessionId) => {
  const stream = await fetch('/api/v2/query', {
    method: 'POST',
    headers: { 
      'Authorization': \`Bearer \${token}\`,
      'X-Session-ID': sessionId,
      'Accept': 'text/event-stream'
    },
    body: JSON.stringify({ 
      query, context: history, stream: true 
    })
  });
  return readEventStream(stream);
};`,
    payload: `{
  "event": "INBOUND_WEBSOCKET_MESSAGE",
  "channel": "slack_integration",
  "payload": {
    "user_id": "U987654321",
    "raw_text": "What is our Q3 procurement policy?",
    "session_id": "sess_8f92a1b",
    "client_timestamp": "1698248102391"
  }
}`,
    tags: ["WebSocket", "SSE", "React 18", "Teams SDK", "Slack Bolt"],
  },
  api_gateway: {
    title: "API Gateway / Backend",
    description: "Enterprise-grade ingress controller. Enforces JWT/OAuth2 authentication, tenant-scoped rate limiting, distributed tracing via OpenTelemetry, and structured audit logging to SIEM.",
    metrics: [{ k: "Auth", v: "JWT / OAuth2 / SAML" }, { k: "Rate Limit", v: "500 req/min/tenant" }, { k: "Latency P99", v: "12ms overhead" }, { k: "Tracing", v: "OpenTelemetry" }],
    code: `# FastAPI gateway with rate limiting
@app.middleware("http")
async def auth_middleware(request: Request, call_next):
    token = extract_bearer(request)
    claims = await verify_jwt(token)
    tenant = claims["tenant_id"]
    
    await rate_limiter.check(tenant)
    await audit_log.record(request, claims)
    
    request.state.user = claims
    return await call_next(request)`,
    payload: `{
  "action": "GATEWAY_MIDDLEWARE_EXECUTION",
  "steps": [
    "[SUCCESS] JWT Signature Validated",
    "[INFO] Tenant Extracted: acme-corp",
    "[INFO] Role Asserted: enterprise_viewer",
    "[SUCCESS] Rate Limit Check: 42/500 limits remaining",
    "[INFO] Trace ID injected: span_928374a"
  ],
  "forwarding_to": "service:query_understanding"
}`,
    tags: ["FastAPI", "Redis", "JWT", "OpenTelemetry", "SIEM"],
  },
  query_understanding: {
    title: "Query Understanding Engine",
    description: "Classifies intent, detects language, rewrites ambiguous queries, and routes to the appropriate retrieval strategy. Handles multi-turn context injection and sensitive query flagging.",
    metrics: [{ k: "Intent Classes", v: "24 enterprise types" }, { k: "Rewrite Model", v: "GPT-4o-mini" }, { k: "Accuracy", v: "94.2% intent F1" }, { k: "Latency", v: "~180ms" }],
    code: `class QueryUnderstanding:
    async def process(self, query: str, history: list):
        intent = await self.classifier.predict(query)
        rewritten = await self.rewriter.rewrite(
            query, history, intent
        )
        strategy = self.router.decide({
            "intent": intent,
            "has_filters": detect_filters(query),
            "needs_live_data": intent in LIVE_INTENTS
        })
        return QueryPlan(rewritten, intent, strategy)`,
    payload: `{
  "action": "QUERY_ANALYSIS_COMPLETE",
  "analysis": {
    "original": "What is our Q3 procurement policy?",
    "rewritten": "Acme Corp procurement policy software licenses Q3 2024",
    "intent": "POLICY_LOOKUP",
    "entities": {
      "timeframe": "Q3 2024",
      "department": "Procurement"
    },
    "routing_strategy": "HYBRID_BROAD_SEARCH",
    "pii_detected": false
  }
}`,
    tags: ["Intent Classification", "Query Rewriting", "PII Detection", "Routing"],
  },
  retrieval: {
    title: "Hybrid Retrieval Layer",
    description:
      "Parallel retrieval across vector, BM25, and tool channels. Each channel applies a similarity floor (≥70%) before Reciprocal Rank Fusion so low-confidence chunks never enter the pipeline.",
    metrics: [
      { k: "Vector Store", v: "Pinecone / Weaviate" },
      { k: "Similarity Floor", v: "≥ 70%" },
      { k: "Keyword Engine", v: "Elasticsearch BM25" },
      { k: "Fusion", v: "RRF k=60" },
    ],
    code: `MIN_VECTOR_SCORE = 0.70
MIN_BM25_SCORE = 0.65

async def hybrid_retrieve(plan: QueryPlan):
    vector_task = vector_search(
        plan.rewritten,
        embed(plan.rewritten),
        top_k=20,
        min_score=MIN_VECTOR_SCORE,
    )
    bm25_task = keyword_search(
        plan.rewritten, plan.filters, top_k=20, min_score=MIN_BM25_SCORE
    )
    tool_task = tool_search(plan.intent, resolve_tools(plan))

    results = await asyncio.gather(vector_task, bm25_task, tool_task)
    fused = reciprocal_rank_fusion(results, k=60)

    # Drop fused candidates below retrieval confidence floor
    return [c for c in fused if c.confidence >= 0.70]`,
    payload: `{
  "action": "PARALLEL_RETRIEVAL_FUSION",
  "thresholds": {
    "min_vector_similarity": 0.70,
    "min_bm25_normalized": 0.65,
    "post_fusion_confidence_floor": 0.70
  },
  "channels": {
    "vector_pinecone": { "status": "OK", "chunks_found": 20, "above_threshold": 14, "latency_ms": 42 },
    "bm25_elastic": { "status": "OK", "chunks_found": 15, "above_threshold": 11, "latency_ms": 18 },
    "tool_sharepoint": { "status": "OK", "docs_found": 2, "above_threshold": 2, "latency_ms": 310 }
  },
  "fusion_result": {
    "method": "Reciprocal Rank Fusion (k=60)",
    "total_unique_chunks": 34,
    "passed_confidence_gate": 23,
    "top_source": "doc_id: 88472 (Procurement Policy v3.2, confidence: 0.84)"
  }
}`,
    tags: ["Pinecone", "Elasticsearch", "RRF", "Confidence Floor", "Tool Calling"],
  },
  permission_filter: {
    title: "Permission Filtering",
    description: "Post-retrieval security enforcement. Evaluates every retrieved chunk against the user's RBAC roles, ABAC attribute policies, and document-level ACLs. Redacts or removes unauthorized content before it reaches the LLM.",
    metrics: [{ k: "Policy Engine", v: "OPA (Rego)" }, { k: "RBAC Roles", v: "148 enterprise roles" }, { k: "ABAC Attrs", v: "Dept, Clearance, Region" }, { k: "Filter Latency", v: "<5ms per chunk" }],
    code: `class PermissionFilter:
    async def filter(self, chunks, user):
        allowed = []
        for chunk in chunks:
            decision = await self.opa.evaluate(
                policy="rag/doc_access",
                input={
                    "user": user.roles,
                    "resource": chunk.metadata["acl"]
                }
            )
            if decision.allow:
                allowed.append(chunk)
        return allowed`,
    payload: `{
  "action": "OPA_POLICY_EVALUATION",
  "input_chunks": 34,
  "user_context": {
    "roles": ["employee", "engineering_team"],
    "clearance": "standard"
  },
  "evaluation_results": {
    "allowed": 28,
    "denied": 6,
    "denial_reasons": [
      "[doc_991]: Requires 'finance_admin' role",
      "[doc_421]: Requires 'executive' clearance"
    ]
  },
  "output_chunks": 28
}`,
    tags: ["OPA", "RBAC", "ABAC", "ACL", "Rego", "Zero Trust"],
  },
  reranking: {
    title: "Reranking Layer",
    description:
      "Cross-encoder reranking scores every candidate chunk, then enforces a confidence gate (≥70%) before context assembly. This is the primary quality filter after raw retrieval.",
    metrics: [
      { k: "Model", v: "Cohere rerank-v3" },
      { k: "Confidence Gate", v: "≥ 70%" },
      { k: "Input Chunks", v: "up to 150" },
      { k: "NDCG@10", v: "0.847" },
    ],
    code: `MIN_CHUNK_CONFIDENCE = 0.70

async def rerank(query: str, chunks: list):
    ce_scores = await cohere_rerank(
        query=query,
        documents=[c.text for c in chunks],
        top_n=30,
    )

    scored = []
    for chunk, ce_score in zip(chunks, ce_scores):
        final = 0.7 * ce_score + 0.3 * authority_score(chunk)
        scored.append(ScoredChunk(chunk, final))

    ranked = sorted(scored, key=lambda x: x.score, reverse=True)
    return [s for s in ranked if s.score >= MIN_CHUNK_CONFIDENCE]`,
    payload: `{
  "action": "CROSS_ENCODER_RERANK",
  "model": "cohere-rerank-english-v3.0",
  "confidence_gate": 0.70,
  "chunks_processed": 28,
  "top_results": [
    { "id": "doc_88472", "score": 0.984, "confidence": "98%", "shift": "+4 positions" },
    { "id": "doc_11293", "score": 0.941, "confidence": "94%", "shift": "-1 position" },
    { "id": "doc_99812", "score": 0.892, "confidence": "89%", "shift": "+12 positions" }
  ],
  "dropped_below_threshold": 18,
  "retained_chunks": 10
}`,
    tags: ["Cohere Rerank", "Confidence Gate", "Cross-Encoder", "NDCG"],
  },
  context_builder: {
    title: "Context Builder",
    description: "Assembles the final LLM prompt from reranked chunks. Compresses verbose sources, injects citation markers, enforces token budget, and adds structured system instructions for the generation model.",
    metrics: [{ k: "Compression", v: "LLMLingua-2" }, { k: "Token Budget", v: "12k context window" }, { k: "Citation Style", v: "APA + doc IDs" }, { k: "Overflow Policy", v: "Trim by score" }],
    code: `class ContextBuilder:
    async def build(self, query: str, chunks: list):
        compressed = await llmlingua.compress_batch(chunks)
        
        context_parts = []
        for i, text in enumerate(compressed):
            if tokens(context_parts) > MAX_TOKENS: break
            context_parts.append(f"[DOC_{i+1}] {text}")
        
        return Prompt(
            system=SYS_PROMPT,
            context="\\n".join(context_parts),
            query=query
        )`,
    payload: `{
  "action": "PROMPT_ASSEMBLY",
  "compression": {
    "engine": "LLMLingua-2",
    "original_tokens": 8450,
    "compressed_tokens": 3120,
    "ratio": "2.7x compression"
  },
  "injection": [
    "Mapped doc_88472 to [DOC_1]",
    "Mapped doc_11293 to [DOC_2]",
    "Mapped doc_99812 to [DOC_3]"
  ],
  "final_prompt_size": "3,480 tokens (Budget: 12,000)"
}`,
    tags: ["LLMLingua-2", "Token Budget", "Citation Injection", "Prompt Engineering"],
  },
  llm_generation: {
    title: "LLM Generation",
    description: "Generates the grounded answer using Azure OpenAI (GPT-4o) or Claude claude-sonnet-4-6. Streams output tokens, enforces response formatting, and handles fallback between providers on error or quota exceeded.",
    metrics: [{ k: "Primary", v: "Azure OpenAI GPT-4o" }, { k: "Fallback", v: "Claude claude-sonnet-4-6" }, { k: "Temperature", v: "0.2 (factual)" }, { k: "P50 Latency", v: "1.4s TTFT" }],
    code: `class LLMRouter:
    async def generate(self, prompt: Prompt):
        for provider in [azure_gpt4o, claude_sonnet]:
            try:
                async for token in provider.stream(
                    messages=[{"role": "user", "content": prompt}]
                ):
                    yield token
                return
            except (RateLimitError, QuotaError):
                continue
        raise AllProvidersFailedError()`,
    payload: `{
  "action": "LLM_STREAMING_INITIATED",
  "provider": "Azure OpenAI",
  "deployment": "gpt-4o-global-standard",
  "parameters": {
    "temperature": 0.1,
    "max_tokens": 1024,
    "presence_penalty": 0.0
  },
  "metrics": {
    "time_to_first_token": "842ms",
    "stream_status": "active_yielding_chunks"
  }
}`,
    tags: ["Azure OpenAI", "Claude claude-sonnet-4-6", "Streaming", "Fallback", "Multi-provider"],
  },
  validation: {
    title: "Validation Layer",
    description:
      "Post-generation quality gate — distinct from retrieval confidence. Checks answer grounding (every claim traceable to a cited chunk), policy compliance, and PII before delivery.",
    metrics: [{ k: "Grounding Check", v: "NLI-based attribution" }, { k: "PII Scan", v: "Microsoft Presidio" }, { k: "Policy Rules", v: "312 enterprise rules" }, { k: "Rejection Rate", v: "1.8% of queries" }],
    code: `class ValidationLayer:
    async def validate(self, response: str, prompt: Prompt):
        checks = await asyncio.gather(
            self.groundedness_check(response, prompt.context),
            self.pii_scanner.scan(response),
            self.policy_engine.evaluate(response)
        )
        
        grounding, pii, policy = checks
        if not grounding.passed:
            return ValidationResult.REJECT("Ungrounded")
        
        if pii.detected:
            response = self.redactor.redact(response, pii.spans)
            
        return ValidationResult.PASS(response)`,
    payload: `{
  "action": "POST_GENERATION_VALIDATION",
  "checks": {
    "grounding_nli": {
      "status": "PASS",
      "score": 0.992,
      "unsupported_claims": 0
    },
    "pii_presidio": {
      "status": "PASS",
      "entities_found": 0,
      "redactions_applied": 0
    },
    "enterprise_policy": {
      "status": "PASS",
      "flagged_terms": []
    }
  },
  "final_decision": "APPROVED_FOR_EGRESS"
}`,
    tags: ["NLI Grounding", "Presidio PII", "OPA Policy", "Hallucination Detection"],
  },
  final_response: {
    title: "Final Response",
    description: "Structured response delivery with inline citations, confidence scores, source metadata, and suggested follow-up questions. Streamed to the client with full audit trail logged.",
    metrics: [{ k: "Format", v: "Markdown + JSON citations" }, { k: "Avg Latency", v: "2.1s end-to-end" }, { k: "Audit Log", v: "100% coverage" }, { k: "Follow-ups", v: "3 suggested per answer" }],
    code: `// Final JSON payload emitted to client
{
  "query_id": "q_01HX...",
  "answer": "The Q3 procurement policy requires...",
  "citations": [
    {
      "id": "DOC_1",
      "title": "Procurement Policy 2024 v3.2",
      "source": "SharePoint",
      "confidence": 0.97
    }
  ],
  "follow_up_suggestions": [
    "What are the exceptions to this policy?"
  ]
}`,
    payload: `{
  "action": "EGRESS_DELIVERY",
  "payload_size": "4.2KB",
  "client_ack": "RECEIVED",
  "audit_trail": {
    "log_id": "audit_88192a",
    "destination": "Splunk_SIEM",
    "status": "COMMITTED"
  },
  "session": {
    "id": "sess_8f92a1b",
    "turn_count": 4,
    "context_updated": true
  }
}`,
    tags: ["Structured Output", "Citation Mapping", "Audit Trail", "Follow-ups"],
  },
};

const LIVE_METRICS = [
  { label: "Queries/min", value: 847, unit: "", delta: "+12%" },
  { label: "P95 Latency", value: 2.3, unit: "s", delta: "-8%" },
  { label: "Grounding", value: 98.2, unit: "%", delta: "+0.4%" },
  { label: "Cache Hit", value: 34.7, unit: "%", delta: "+5%" },
];

function useAnimatedCounter(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(parseFloat((eased * target).toFixed(1)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return value;
}

function MetricCard({
  label,
  value,
  unit,
  delta,
}: {
  label: string;
  value: number;
  unit: string;
  delta: string;
}) {
  const animated = useAnimatedCounter(value);
  const isPositive = delta.startsWith("+");
  return (
    <div className="min-w-[120px] flex-1 rounded-[10px] border border-[#1E3A5F] bg-gradient-to-br from-[#0F172A] to-[#1E293B] px-3 py-3 sm:px-4 sm:py-3.5">
      <div className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-slate-500 sm:text-[11px]">{label}</div>
      <div className="font-mono text-lg font-bold text-slate-50 sm:text-[22px]">
        {animated}{unit}
      </div>
      <div className={`mt-1 font-mono text-[10px] sm:text-[11px] ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
        {delta} vs last hour
      </div>
    </div>
  );
}

function PipelineNode({
  stage,
  isActive,
  isProcessing,
  onClick,
  animOffset = 0,
  compact = false,
}: {
  stage: PipelineStage;
  isActive: boolean;
  isProcessing: boolean;
  onClick: () => void;
  animOffset?: number;
  compact?: boolean;
}) {
  const pulseStyle: CSSProperties | undefined = isProcessing
    ? { animation: `rag-pulse 1.5s ease-in-out ${animOffset}s infinite` }
    : undefined;

  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        borderColor: isActive ? `${stage.color}80` : '#1E3A5F',
        background: isActive
          ? `linear-gradient(135deg, ${stage.color}18 0%, ${stage.color}08 100%)`
          : 'transparent',
        ...pulseStyle,
      }}
      className={`relative flex shrink-0 items-center gap-2 rounded-lg border px-3 py-2 text-left transition-all sm:gap-2.5 sm:px-3.5 sm:py-2.5 ${
        compact ? 'min-w-[148px] snap-start' : 'w-full'
      }`}
    >
      <span className="text-sm sm:text-base" style={{ color: stage.color }}>{stage.icon}</span>
      <div className="min-w-0">
        <div className={`truncate text-[11px] font-semibold sm:text-xs ${isActive ? 'text-slate-50' : 'text-slate-400'}`}>
          {stage.label}
        </div>
        {!compact && (
          <div className="truncate font-mono text-[9px] text-slate-600 sm:text-[10px]">{stage.sublabel}</div>
        )}
      </div>
      {isProcessing && (
        <span
          className="absolute right-2.5 h-1.5 w-1.5 animate-pulse rounded-full sm:right-3"
          style={{ background: stage.color, boxShadow: `0 0 8px ${stage.color}` }}
        />
      )}
    </button>
  );
}

function FlowConnector({ color = '#1E3A5F', isActive }: { color?: string; isActive: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "3px 0", position: "relative" }}>
      <div style={{
        width: 1,
        height: 16,
        background: isActive
          ? `linear-gradient(to bottom, ${color}, ${color}40)`
          : "#1E3A5F",
        transition: "background 0.4s ease",
      }} />
      {isActive && (
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: 4, height: 4, borderRadius: "50%", background: color,
          boxShadow: `0 0 6px ${color}`,
          animation: 'rag-slideDown 1.2s ease-in-out infinite',
        }} />
      )}
    </div>
  );
}

function CodeBlock({
  code,
  title = 'Configuration / Code',
  icon = ['#F87171', '#FBBF24', '#34D399'],
}: {
  code: string;
  title?: string;
  icon?: string | string[];
}) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="relative flex-1 overflow-hidden rounded-lg border border-[#1E3A5F]">
      <div className="flex items-center justify-between border-b border-[#1E3A5F] bg-[#0A0F1E] px-3 py-2 sm:px-3.5">
        <div className="flex items-center gap-2 sm:gap-2.5">
          {Array.isArray(icon) ? (
            <div className="flex gap-1.5">
              {icon.map((c) => (
                <div key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />
              ))}
            </div>
          ) : (
            <span className="text-xs">{icon}</span>
          )}
          <span className="font-mono text-[9px] uppercase text-slate-500 sm:text-[10px]">{title}</span>
        </div>
        <button
          type="button"
          onClick={copy}
          className="rounded border border-[#1E3A5F] px-2 py-0.5 font-mono text-[9px] text-slate-500 transition hover:text-slate-300 sm:text-[10px]"
        >
          {copied ? 'copied' : 'copy'}
        </button>
      </div>
      <pre className="max-h-48 overflow-x-auto overflow-y-auto whitespace-pre-wrap break-words bg-[#060B14] p-3 font-mono text-[10px] leading-relaxed text-slate-400 sm:max-h-60 sm:p-3.5 sm:text-[11px]">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function QuerySimulator({ onQuery }: { onQuery: (query: string) => Promise<void> }) {
  const SAMPLE_QUERIES = [
    "What is our Q3 procurement policy for software licenses?",
    "Show me all open Jira tickets assigned to the infrastructure team",
    "What were the key decisions from last week's board meeting?",
    "Summarize the latest SOC 2 audit findings for compliance review",
  ];
  const [query, setQuery] = useState("");
  const [running, setRunning] = useState(false);

  const run = async (q: string) => {
    if (running) return;
    setRunning(true);
    setQuery(q);
    await onQuery(q);
    setRunning(false);
  };

  return (
    <div className="rounded-[10px] border border-[#1E3A5F] bg-gradient-to-br from-[#0F172A] to-[#0A0F1E] p-4">
      <div className="mb-2.5 font-mono text-[10px] uppercase tracking-wider text-slate-500 sm:text-[11px]">
        Query Simulator
      </div>
      <div className="mb-2.5 flex flex-col gap-2 sm:flex-row sm:gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter enterprise query..."
          className="min-h-[44px] flex-1 rounded-md border border-[#1E3A5F] bg-[#060B14] px-3 py-2 font-mono text-xs text-slate-50 outline-none focus:border-blue-500 sm:text-sm"
        />
        <button
          type="button"
          onClick={() => query.trim() && run(query.trim())}
          disabled={running || !query.trim()}
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-blue-600 to-blue-800 px-4 font-mono text-[11px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
        >
          {running ? 'Running…' : '▶ Run'}
        </button>
      </div>
      <div className="flex flex-wrap gap-1.5 sm:gap-2">
        {SAMPLE_QUERIES.map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => run(q)}
            disabled={running}
            className="rounded-full border border-[#1E3A5F] bg-[#0A0F1E] px-2.5 py-1 font-mono text-[9px] text-slate-500 transition hover:border-blue-600 hover:text-slate-300 disabled:cursor-not-allowed sm:px-2.5 sm:text-[10px]"
          >
            {q.length > 42 ? `${q.slice(0, 42)}…` : q}
          </button>
        ))}
      </div>
    </div>
  );
}

function ResponsePanel({
  response,
  isStreaming,
}: {
  response: PipelineResponse | null;
  isStreaming: boolean;
}) {
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [response]);

  if (!response && !isStreaming) return null;

  return (
    <div className="mt-4 rounded-[10px] border border-[#1E3A5F] bg-gradient-to-br from-[#0A1628] to-[#060B14] p-4">
      <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-emerald-400 sm:text-[11px]">
        <span>⬡</span> Pipeline Response
        {isStreaming && <span className="animate-pulse text-amber-400">● streaming</span>}
      </div>

      {response?.answer && (
        <p className="mb-3.5 text-sm leading-relaxed text-slate-200 sm:text-[13px]">
          {response.answer}
          {isStreaming && <span className="animate-pulse text-blue-500">▌</span>}
        </p>
      )}

      {response?.citations && (
        <div className="mb-3.5">
          <p className="mb-2 font-mono text-[9px] uppercase text-slate-600 sm:text-[10px]">Sources</p>
          <div className="space-y-1.5">
            {response.citations.map((c, i) => (
              <div
                key={c.title}
                className="flex flex-col gap-1 rounded-md border border-[#1E3A5F] bg-[#0F172A] px-3 py-2 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <span className="font-mono text-[10px] text-blue-500">[DOC_{i + 1}]</span>
                  <span className="ml-2 text-[11px] text-slate-400">{c.title}</span>
                  <span className="ml-1 text-[10px] text-slate-600">· {c.source}</span>
                </div>
                <span
                  className={`shrink-0 self-start rounded px-2 py-0.5 font-mono text-[10px] sm:self-auto ${
                    c.confidence > 0.9 ? 'text-emerald-400' : 'text-amber-400'
                  }`}
                >
                  {Math.round(c.confidence * 100)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {response?.metrics && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(response.metrics).map(([k, v]) => (
            <div
              key={k}
              className="rounded-md border border-[#1E3A5F] bg-[#0A0F1E] px-2.5 py-1 font-mono text-[10px] text-slate-500"
            >
              {k}: <span className="text-slate-400">{v}</span>
            </div>
          ))}
        </div>
      )}

      {response?.followUps && (
        <div className="mt-3.5">
          <p className="mb-1.5 font-mono text-[9px] uppercase text-slate-600 sm:text-[10px]">Suggested Follow-ups</p>
          <div className="flex flex-wrap gap-1.5">
            {response.followUps.map((q) => (
              <span
                key={q}
                className="rounded-full border border-blue-500/25 bg-[#0A0F1E] px-3 py-1 text-[11px] text-slate-400"
              >
                {q}
              </span>
            ))}
          </div>
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
}

export default function EnterpriseRagPipelinePage() {
  const [activeStage, setActiveStage] = useState('query_understanding');
  const [processingStage, setProcessingStage] = useState<string | null>(null);
  const [processedStages, setProcessedStages] = useState<string[]>([]);
  const [response, setResponse] = useState<PipelineResponse | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [llmResponse, setLlmResponse] = useState('');
  const stageDetail = STAGE_DETAILS[activeStage];

  const simulatePipeline = useCallback(async (query: string) => {
    setResponse(null);
    setProcessedStages([]);
    setLlmResponse('');

    const delays = [400, 350, 500, 700, 300, 500, 400, 0, 350, 300];

    for (let i = 0; i < PIPELINE_STAGES.length; i++) {
      const stage = PIPELINE_STAGES[i];
      setProcessingStage(stage.id);
      setActiveStage(stage.id);

      if (stage.id === "llm_generation") {
        setIsStreaming(true);
        const fullAnswer = "Based on the retrieved documentation, the Q3 procurement policy for software licenses requires department head approval for licenses under $10,000, with CFO sign-off for anything exceeding $50,000. All SaaS subscriptions must be registered in the enterprise license registry within 30 days of activation. Volume licensing agreements negotiated by IT Procurement receive a 15–40% discount bracket and should be used where available. [DOC_1] [DOC_2]";
        for (let j = 0; j < fullAnswer.length; j++) {
          await new Promise(r => setTimeout(r, 18));
          setLlmResponse(prev => prev + fullAnswer[j]);
        }
        setIsStreaming(false);
      }

      await new Promise(r => setTimeout(r, delays[i] || 400));
      setProcessedStages(prev => [...prev, stage.id]);
    }

    setProcessingStage(null);
    setResponse({
      answer: "Based on the retrieved documentation, the Q3 procurement policy for software licenses requires department head approval for licenses under $10,000, with CFO sign-off for anything exceeding $50,000. All SaaS subscriptions must be registered in the enterprise license registry within 30 days of activation. Volume licensing agreements negotiated by IT Procurement receive a 15–40% discount bracket and should be used where available. [DOC_1] [DOC_2]",
      citations: [
        { title: "Procurement Policy 2024 v3.2", source: "SharePoint/Policies", confidence: 0.97 },
        { title: "Finance Approval Matrix", source: "Confluence", confidence: 0.91 },
        { title: "IT Software Registry Guidelines", source: "Intranet", confidence: 0.84 },
      ],
      metrics: {
        "Total Latency": "2.1s",
        "Tokens Used": "1,847",
        "Grounding Score": "98%",
        "Chunks Retrieved": 23,
        "Chunks Used": 3,
      },
      followUps: [
        "What are the exceptions to this policy?",
        "Who are the approved software vendors?",
        "How do I submit a purchase request?",
      ],
    });
  }, []);

  const activeStageMeta = PIPELINE_STAGES.find((s) => s.id === activeStage);
  const stageIdx = PIPELINE_STAGES.findIndex((s) => s.id === activeStage);

  const renderPipelineNav = (compact: boolean) =>
    PIPELINE_STAGES.map((stage, i) => {
      const isActive = activeStage === stage.id;
      const isProcessing = processingStage === stage.id;
      const isDone = processedStages.includes(stage.id);

      return (
        <div key={stage.id} className={compact ? 'contents' : 'block'}>
          {!compact && i > 0 && i !== 3 && (
            <FlowConnector color={PIPELINE_STAGES[i - 1].color} isActive={isDone || isProcessing} />
          )}
          {!compact && i === 3 && (
            <div className="mb-1 pl-1">
              <p className="mb-1 font-mono text-[9px] uppercase tracking-wider text-slate-600">
                ⫶ Parallel Retrieval
              </p>
              <div className="mb-1 flex gap-1">
                {RETRIEVAL_CHANNELS.map((ch) => (
                  <div
                    key={ch.id}
                    className="flex-1 rounded-md border bg-[#0A0F1E] px-1 py-1 text-center"
                    style={{
                      borderColor: isProcessing || isDone ? `${ch.color}60` : '#1E3A5F',
                    }}
                  >
                    <div className="text-[10px]" style={{ color: ch.color }}>{ch.icon}</div>
                    <div className="truncate font-mono text-[8px] text-slate-600">{ch.id}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="relative">
            {isDone && !isProcessing && !compact && (
              <span className="absolute -right-0.5 top-1/2 z-[1] flex h-3.5 w-3.5 -translate-y-1/2 items-center justify-center rounded-full bg-emerald-400 text-[8px] font-bold text-[#060B14]">
                ✓
              </span>
            )}
            <PipelineNode
              stage={stage}
              isActive={isActive}
              isProcessing={isProcessing}
              onClick={() => setActiveStage(stage.id)}
              animOffset={i * 0.1}
              compact={compact}
            />
          </div>
        </div>
      );
    });

  return (
    <>
    <div className="flex min-h-[100dvh] flex-col bg-[#060B14] font-sans text-slate-50">
      <style>{`
        @keyframes rag-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }
        @keyframes rag-blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes rag-slideDown {
          0% { top: 0; opacity: 0; }
          40% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .rag-scroll::-webkit-scrollbar { height: 4px; width: 4px; }
        .rag-scroll::-webkit-scrollbar-thumb { background: #1E3A5F; border-radius: 2px; }
      `}</style>

      <header className="sticky top-0 z-30 border-b border-[#1E3A5F] bg-[#060B14]/95 backdrop-blur-md">
        <div className="flex items-center gap-3 px-4 py-3 sm:px-5 lg:px-6">
          <PortfolioBackLink className="border-[#1E3A5F] hover:border-blue-500/50" />
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-bold">
            ⊕
          </div>
          <h1 className="truncate text-sm font-bold tracking-tight sm:text-base">
            SK Enterprise RAG Pipeline
          </h1>
          <a
            href="#rag-fundamentals"
            className="ml-auto hidden shrink-0 rounded-lg border border-[#1E3A5F] px-3 py-1.5 font-mono text-[10px] text-slate-400 transition hover:border-teal-500/40 hover:text-teal-300 sm:inline-block"
          >
            RAG fundamentals ↓
          </a>
          <a
            href="#hybrid-retrieval"
            className="hidden shrink-0 rounded-lg border border-[#1E3A5F] px-3 py-1.5 font-mono text-[10px] text-slate-400 transition hover:border-amber-500/40 hover:text-amber-300 md:inline-block"
          >
            Hybrid RRF ↓
          </a>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-2 border-b border-[#0F172A] px-3 py-3 sm:grid-cols-4 sm:gap-2.5 sm:px-5 lg:px-6">
        {LIVE_METRICS.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      <div className="border-b border-[#1E3A5F] bg-[#060B14] px-3 py-3 lg:hidden">
        <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-slate-600">
          Pipeline Stages
        </p>
        <div className="rag-scroll flex snap-x snap-mandatory gap-2 overflow-x-auto pb-1">
          {renderPipelineNav(true)}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <aside className="hidden w-[250px] shrink-0 overflow-y-auto border-r border-[#1E3A5F] bg-[#060B14] px-3 py-4 lg:block">
          <p className="mb-2.5 pl-1 font-mono text-[10px] uppercase tracking-wider text-slate-600">
            Pipeline Stages
          </p>
          {renderPipelineNav(false)}
        </aside>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5 lg:px-7">
            {stageDetail && (
              <section className="mb-5">
                <div className="mb-3 flex flex-wrap items-start gap-2 sm:items-center sm:gap-3">
                  <span className="text-xl sm:text-2xl" style={{ color: activeStageMeta?.color }}>
                    {activeStageMeta?.icon}
                  </span>
                  <h2 className="text-lg font-bold tracking-tight sm:text-xl lg:text-[22px]">
                    {stageDetail.title}
                  </h2>
                  <span className="rounded-full border border-[#1E3A5F] bg-[#0F172A] px-2 py-0.5 font-mono text-[10px] text-slate-600">
                    stage {stageIdx + 1} / {PIPELINE_STAGES.length}
                  </span>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-slate-400 sm:text-[14px]">
                  {stageDetail.description}
                </p>

                <div className="mb-4 flex flex-wrap gap-1.5 sm:gap-2">
                  {stageDetail.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#1E3A5F] bg-[#0F172A] px-2.5 py-1 font-mono text-[10px] text-slate-500 sm:px-3 sm:text-[11px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,220px)_1fr]">
                    <div className="rounded-[10px] border border-[#1E3A5F] bg-[#0A0F1E] p-3.5 sm:p-4">
                      <p className="mb-2.5 font-mono text-[10px] uppercase tracking-wider text-slate-600">
                        Stage Config
                      </p>
                      {stageDetail.metrics.map((m) => (
                        <div
                          key={m.k}
                          className="flex justify-between gap-3 border-b border-[#0F172A] py-1.5 last:border-0"
                        >
                          <span className="font-mono text-[11px] text-slate-600">{m.k}</span>
                          <span className="max-w-[120px] text-right font-mono text-[11px] text-slate-400">
                            {m.v}
                          </span>
                        </div>
                      ))}
                    </div>
                    <CodeBlock code={stageDetail.code} />
                  </div>
                  <CodeBlock code={stageDetail.payload} title="Live Data / Action Payload" icon="⚡" />
                </div>
              </section>
            )}

            {activeStage === 'retrieval' && (
              <section className="mb-5">
                <p className="mb-2.5 font-mono text-[10px] uppercase tracking-wider text-slate-500 sm:text-[11px]">
                  Retrieval Channels
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {RETRIEVAL_CHANNELS.map((ch) => (
                    <div
                      key={ch.id}
                      className="rounded-[10px] border bg-[#0A0F1E] p-3.5 sm:p-4"
                      style={{ borderColor: `${ch.color}40` }}
                    >
                      <div className="mb-1.5 text-base" style={{ color: ch.color }}>{ch.icon}</div>
                      <p className="text-sm font-semibold">{ch.label}</p>
                      <p className="mb-2.5 font-mono text-[10px] text-slate-600">{ch.sublabel}</p>
                      <div className="h-[3px] w-full rounded bg-[#0F172A]">
                        <div
                          className="h-full rounded"
                          style={{
                            width: ch.id === 'vector' ? '78%' : ch.id === 'keyword' ? '62%' : '45%',
                            background: ch.color,
                          }}
                        />
                      </div>
                      <p className="mt-1 font-mono text-[10px] text-slate-600">
                        {ch.id === 'vector'
                          ? '≥70% similarity floor'
                          : ch.id === 'keyword'
                            ? '≥65% BM25 floor'
                            : 'tool hit rate 45%'}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="my-6 h-px bg-[#1E3A5F]" />

            <QuerySimulator onQuery={simulatePipeline} />

            {isStreaming && (
              <div className="mt-4 rounded-[10px] border border-[#1E3A5F] bg-[#0A1628] p-4">
                <p className="mb-2.5 flex items-center gap-2 font-mono text-[11px] text-amber-400">
                  <span className="animate-pulse">●</span> LLM Streaming
                </p>
                <p className="text-sm leading-relaxed text-slate-200">
                  {llmResponse}
                  <span className="animate-pulse text-blue-500">▌</span>
                </p>
              </div>
            )}

            {!isStreaming && response && (
              <ResponsePanel response={response} isStreaming={false} />
            )}
          </div>

          <div className="shrink-0 border-t border-[#1E3A5F] bg-[#03060B] px-4 py-4 sm:px-5 lg:flex lg:gap-8 lg:px-6">
            <div className="min-w-0 flex-1">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-slate-600">
                Platform Services Health
              </p>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(170px,1fr))]">
                {[
                  { label: 'Vector Store', status: 'healthy', latency: '23ms' },
                  { label: 'Elasticsearch', status: 'healthy', latency: '18ms' },
                  { label: 'Azure OpenAI', status: 'healthy', latency: '1.1s' },
                  { label: 'Cohere Rerank', status: 'healthy', latency: '210ms' },
                  { label: 'OPA Policy Engine', status: 'healthy', latency: '4ms' },
                  { label: 'Salesforce CRM', status: 'degraded', latency: '940ms' },
                  { label: 'SAP ERP', status: 'healthy', latency: '380ms' },
                  { label: 'Redis Cache', status: 'healthy', latency: '1ms' },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center justify-between rounded-md border border-[#1E3A5F] bg-[#0A0F1E] px-2.5 py-1.5"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{
                          background: s.status === 'healthy' ? '#34D399' : '#FBBF24',
                          boxShadow: `0 0 6px ${s.status === 'healthy' ? '#34D399' : '#FBBF24'}`,
                        }}
                      />
                      <span className="truncate text-[11px] text-slate-400">{s.label}</span>
                    </div>
                    <span className="ml-2 shrink-0 font-mono text-[10px] text-slate-600">{s.latency}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 border-t border-[#1E3A5F] pt-4 lg:mt-0 lg:w-[min(100%,350px)] lg:shrink-0 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-slate-600">
                Global Pipeline Stats (24h)
              </p>
              <div className="grid grid-cols-2 gap-3 sm:gap-x-6">
                {[
                  { k: 'Total Queries', v: '12,847' },
                  { k: 'Avg Latency', v: '2.1s' },
                  { k: 'Cache Hits', v: '34.7%' },
                  { k: 'Grounding Pass', v: '98.2%' },
                  { k: 'Rejection Rate', v: '1.8%' },
                  { k: 'Tokens Gen', v: '4.2M' },
                ].map((item) => (
                  <div key={item.k}>
                    <span className="font-mono text-[9px] text-slate-600">{item.k}</span>
                    <p className="font-mono text-sm font-semibold text-slate-50">{item.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <RagFundamentalsSection />
    </>
  );
}