export const AI_FRONT_DOOR_HREF = '/home/getauctionlist-ai-front-door';
export const GET_AUCTION_LIST_HREF = 'https://getauctionlist.com/';

export const AI_FRONT_DOOR_META = {
  title: 'AI Front Door',
  product: 'Get Auction List',
  domain: 'getauctionlist.com',
  status: 'As-built · 2026-07',
  repos: 'auction-lens-ai (Next.js BFF) · get-auction-list-api (FastAPI + LangGraph)',
  summary:
    'Authenticated assistant on getauctionlist.com that answers only from approved sources — policy RAG, auction SQL, and allowlisted county tools — with citation grounding and typed failure modes.',
} as const;

export const CAPABILITIES = [
  {
    intent: 'knowledge_policy',
    label: 'Policy / product terms',
    path: 'Hybrid RAG (chunks + embeddings)',
  },
  {
    intent: 'auction_search',
    label: 'Indexed auction filters',
    path: 'Deterministic SQL on ingested rows',
  },
  {
    intent: 'public_property_lookup',
    label: 'County schedule / WCAD',
    path: 'Allowlisted HTTPS tools (live)',
  },
  {
    intent: 'combined_research',
    label: 'Multi-source research',
    path: 'Parallel fan-out → correlate → synthesize',
  },
  {
    intent: 'unsupported_or_unsafe',
    label: 'Refusal',
    path: 'Guardrail short-circuit',
  },
] as const;

export const LAYERS = [
  {
    name: 'Presentation',
    components: 'AiFrontDoorLauncher / Dialog, dashboard, lib/ai',
    responsibility: 'Chat UX, SSE reduce, Zod shapes; dashboard parses Storage xlsx locally',
  },
  {
    name: 'Edge BFF',
    components: 'app/api/ai/{chat,chat/stream,feedback}',
    responsibility: 'Same-origin only; Supabase session → Bearer JWT; proxy to AGENT_SERVICE_URL',
  },
  {
    name: 'AI control plane',
    components: 'FastAPI :8000, JWKS auth, ControlledAgentGraph, OpenAI structured models',
    responsibility: 'Route, retrieve/tools, ground, synthesize, stream',
  },
  {
    name: 'Data & tools',
    components: 'Postgres + pgvector, Storage, PublicRecordsService / MCP, OpenAI',
    responsibility: 'Durable indexes, object bytes, allowlisted egress, LLM/embeddings',
  },
  {
    name: 'Worker',
    components: 'auction-ingestion-worker',
    responsibility: 'Offline policy + spreadsheet ingest into Postgres',
  },
] as const;

export const REQUEST_STEPS = [
  'Dialog POST /api/ai/chat/stream with message + optional thread_id',
  'BFF validates Supabase session and forwards Authorization: Bearer <access_token>',
  'API validates JWT via JWKS (same Supabase project), starts LangGraph run',
  'Graph: validate → route → extract → Send to RAG and/or SQL and/or public tools',
  'Correlate → ground → disclaimer → synthesize (LLM or deterministic fallback)',
  'SSE answer.delta / answer.completed → UI cards, sources, optional CTA',
] as const;

export const STACK = [
  { layer: 'UI', tech: 'Next.js 16, React 19, Tailwind 4, Base UI', role: 'Chat + dashboard' },
  { layer: 'Validation', tech: 'Zod (FE), Pydantic (BE)', role: 'Contract enforcement' },
  { layer: 'BFF', tech: 'Next Route Handlers', role: 'Session gate, SSE proxy, no browser secrets' },
  { layer: 'Auth', tech: 'Supabase Auth + JWKS', role: 'Same project FE↔BE' },
  { layer: 'Orchestration', tech: 'LangGraph (StateGraph, Send)', role: 'Bounded intents & budgets' },
  { layer: 'LLM', tech: 'OpenAI Responses API (gpt-4.1-mini)', role: 'Classify, extract, synthesize' },
  { layer: 'Embeddings', tech: 'text-embedding-3-small @ 1536 dims', role: 'Policy RAG only' },
  { layer: 'Primary DB', tech: 'Supabase PostgreSQL', role: 'Auth, auctions, RAG tables, jobs' },
  { layer: 'Vector / keyword', tech: 'pgvector + tsvector (english)', role: 'Hybrid retrieve' },
  { layer: 'Object store', tech: 'Supabase Storage auction_files', role: 'Monthly xlsx bytes' },
  { layer: 'Public tools', tech: 'FastMCP Streamable HTTP /mcp', role: 'Ops tooling; graph uses in-process service' },
  { layer: 'HTTP egress', tech: 'ApprovedHttpClient', role: 'Host allowlist, SSRF-safe' },
  { layer: 'Obs', tech: 'Prometheus /metrics, optional OTEL / Langfuse', role: 'No prompt/PII dump' },
] as const;

export const GRAPH_NODES = [
  { node: 'validation', responsibility: 'Length ≤ 4000; injection heuristic' },
  { node: 'routing', responsibility: 'Heuristics + optional OpenAIIntentClassifier' },
  { node: 'extraction', responsibility: 'Deterministic entities + optional OpenAIEntityExtractor' },
  { node: 'knowledge_rag', responsibility: 'Hybrid RAG — policy chunks only' },
  { node: 'sql_auction_search', responsibility: 'search_auction_records filters' },
  { node: 'mcp_public_tools', responsibility: 'County calendar / WCAD live tools' },
  { node: 'grounding_verification', responsibility: 'Drop uncited / ungrounded facts' },
  { node: 'compliance_disclaimer', responsibility: 'Auction/public intents' },
  { node: 'synthesis', responsibility: 'Grounded LLM or deterministic fallback' },
] as const;

export const DATA_PLANES = [
  {
    plane: 'Policy RAG',
    offline: 'Yes — ingest URLs',
    online: 'Hybrid retrieve + LLM',
    vector: true,
  },
  {
    plane: 'Auction index',
    offline: 'Yes — ingest xlsx',
    online: 'SQL filters (+ CTA to dashboard)',
    vector: false,
  },
  {
    plane: 'Public records',
    offline: 'Optional registry only',
    online: 'Live scrape each ask',
    vector: false,
  },
] as const;

export const SECURITY_POINTS = [
  'Trust boundary at BFF; API re-validates JWT (same Supabase project).',
  'Default role user: auction:read, document:read, tool:execute.',
  'Egress allowlist; MCP bearer for service callers only.',
  'Telemetry sanitizes secrets / PII; chat responses Cache-Control: no-store.',
  'Browser never holds service-role keys and never calls OpenAI, FastAPI, or /mcp for Front Door chat.',
] as const;

export const DECISIONS = [
  'One typed LangGraph orchestrator — not unconstrained ReAct or peer agents.',
  'SQL for auction filters; hybrid RAG only for unstructured policy.',
  'Live allowlisted tools for county/WCAD — no arbitrary browsing.',
  'Grounded synthesis + deterministic fallbacks.',
  'Expand/contract schema migrations; architecture docs stay with behavior changes.',
] as const;

export const RAG_OFFLINE_SOURCES = [
  {
    key: 'getauctionlist-privacy',
    url: 'https://getauctionlist.com/privacy',
    kind: 'policy_html',
    rag: true,
  },
  {
    key: 'getauctionlist-disclaimer',
    url: 'https://getauctionlist.com/disclaimer',
    kind: 'policy_html',
    rag: true,
  },
  {
    key: 'wilco-trustee-calendar',
    url: 'apps.wilco.org calendar',
    kind: 'public_html',
    rag: false,
  },
  {
    key: 'wilco-foreclosure-sales',
    url: 'wilcotx.gov landing',
    kind: 'public_html',
    rag: false,
  },
] as const;

export const RAG_CHUNK_STEPS = [
  { step: 'Validate', module: 'ingestion/validation.py', behavior: 'Max 10MB; HTML signature; SHA-256' },
  { step: 'Parse', module: 'parsers/html.py', behavior: 'Strip script/style/iframe/form; heading path' },
  { step: 'Chunk', module: 'ingestion/chunking.py', behavior: '500 tokens, 50 overlap; chunk SHA-256' },
  { step: 'Embed', module: 'OpenAIEmbeddingProvider', behavior: 'text-embedding-3-small, 1536d' },
  { step: 'Publish', module: 'ingestion/publisher.py', behavior: 'Upsert document; version; chunks + FTS' },
] as const;

export const RAG_ONLINE_KNOBS = [
  { knob: 'candidate_limit', value: '40' },
  { knob: 'context_limit', value: '8' },
  { knob: 'confidence_threshold', value: '0.015 (RRF space)' },
  { knob: 'token_budget / character_budget', value: '3000 / 12000' },
  { knob: 'RRF rank_constant', value: '60' },
  { knob: 'Vector dims', value: '1536 required' },
] as const;

export const RAG_GUARDRAILS = [
  { layer: 'Input', rule: 'Max 4000 chars; injection → refuse' },
  { layer: 'Evidence', rule: 'Scrub instruction-like lines; mark untrusted' },
  { layer: 'Synthesizer', rule: 'Answer only from evidence; citation_ids must be allowed' },
  { layer: 'Fallback', rule: 'Timeout/schema → deterministic excerpt / no-match' },
  { layer: 'Model', rule: 'gpt-4.1-mini, strict JSON GroundedAnswer' },
] as const;

export const DIAGRAMS = {
  overview: [
    {
      src: '/getauctionlist/ai-front-door-logical-architecture.png',
      alt: 'AI Front Door logical architecture — Presentation, BFF, AI control plane, and data/tools layers',
      caption: 'Logical architecture (frontend → backend)',
    },
    {
      src: '/getauctionlist/ai-front-door-request-path.png',
      alt: 'Authenticated chat request path from browser through BFF and FastAPI to LangGraph sources and SSE response',
      caption: 'Authenticated chat request path',
    },
    {
      src: '/getauctionlist/ai-front-door-control-plane.png',
      alt: 'ControlledAgentGraph control plane from validation through capability fan-out to grounded synthesis',
      caption: 'Control plane — agent graph',
    },
  ],
  rag: [
    {
      src: '/getauctionlist/rag-architecture-overview.png',
      alt: 'Policy RAG architecture — offline index build, Postgres store, online retrieve and generate',
      caption: 'Policy RAG architecture overview',
    },
    {
      src: '/getauctionlist/rag-end-to-end-flow.png',
      alt: 'RAG end-to-end: offline ingestion, document_chunks index, online hybrid query and synthesize',
      caption: 'End-to-end offline then online',
    },
    {
      src: '/getauctionlist/rag-online-hybrid-generate.png',
      alt: 'Online hybrid retrieve and grounded LLM generate',
      caption: 'Online hybrid retrieve + grounded generate',
    },
  ],
} as const;
