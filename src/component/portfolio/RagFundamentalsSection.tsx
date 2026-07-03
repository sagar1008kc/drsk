'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';
import RagHybridRetrievalSection from '@/component/portfolio/RagHybridRetrievalSection';

type RagComponentId =
  | 'ingestion'
  | 'chunking'
  | 'embedding'
  | 'vector_store'
  | 'query_transform'
  | 'retrieval'
  | 'reranking'
  | 'context'
  | 'generation';

type Hotspot = { left: number; top: number; width: number; height: number };

type RagComponent = {
  id: RagComponentId;
  step: number;
  phase: 'offline' | 'online';
  diagramLabel: string;
  title: string;
  summary: string;
  body: string;
  bullets?: string[];
  hotspot: Hotspot;
};

const RAG_COMPONENTS: RagComponent[] = [
  {
    id: 'ingestion',
    step: 1,
    phase: 'offline',
    diagramLabel: 'Documents',
    title: 'Document ingestion',
    summary: 'Raw sources enter through connectors that parse, normalize, and prepare text for chunking.',
    body: 'You ingest raw sources: PDFs, web pages, SQL tables, markdown docs, APIs. Each source needs a connector that handles parsing (stripping HTML, OCR on scans, handling tables) and normalization into clean text.',
    hotspot: { left: 5.8, top: 9.7, width: 17.3, height: 8.4 },
  },
  {
    id: 'chunking',
    step: 2,
    phase: 'offline',
    diagramLabel: 'Chunking',
    title: 'Chunking',
    summary: 'The chunk is the unit of retrieval — it must balance self-contained meaning with precise query matching.',
    body: 'This is one of the most consequential design decisions. The chunk is the unit of retrieval, so it must be large enough to be self-contained and meaningful, but small enough that a query can match it precisely.',
    bullets: [
      'Fixed-size (e.g. 512 tokens, 50-token overlap): simple but semantically arbitrary',
      'Recursive character splitting: splits on \\n\\n, then \\n, then spaces — respects natural structure',
      'Semantic chunking: embed sentences, split where cosine similarity drops — maintains coherent ideas',
      'Hierarchical / parent-child: store small chunks for retrieval, return the parent chunk to the LLM for context',
      'Chunk size vs. overlap is a hyperparameter you tune empirically — typically 256–1024 tokens for chunks, 10–20% overlap',
    ],
    hotspot: { left: 27.7, top: 9.7, width: 17.3, height: 8.4 },
  },
  {
    id: 'embedding',
    step: 3,
    phase: 'offline',
    diagramLabel: 'Embed',
    title: 'Embedding',
    summary: 'Each chunk is encoded into a dense vector so semantically similar passages cluster in vector space.',
    body: 'Each chunk is encoded into a dense vector using a bi-encoder model (e.g. text-embedding-3-large, bge-large, e5-mistral). The vector encodes semantic meaning so similar-meaning chunks land near each other in vector space.',
    bullets: [
      'Model must be the same at index time and query time',
      'Embedding dimension (768, 1536, 3072) trades cost vs. recall',
      'Some pipelines also compute sparse vectors (BM25-style) for hybrid retrieval',
    ],
    hotspot: { left: 49.6, top: 9.7, width: 18.7, height: 8.4 },
  },
  {
    id: 'vector_store',
    step: 4,
    phase: 'offline',
    diagramLabel: 'Vector store',
    title: 'Vector store',
    summary: 'Vectors are indexed for approximate nearest-neighbor search with parallel metadata for filtering.',
    body: 'Vectors are stored in an ANN (Approximate Nearest Neighbor) index — typically HNSW (Hierarchical Navigable Small World graph) or IVF (Inverted File). Options include Pinecone, Weaviate, Qdrant, pgvector, Chroma, and Elasticsearch with kNN. You also store metadata (source URL, timestamp, section heading, doc ID) in a parallel store for filtering.',
    hotspot: { left: 72.9, top: 9.7, width: 19.3, height: 8.4 },
  },
  {
    id: 'query_transform',
    step: 5,
    phase: 'online',
    diagramLabel: 'Query transform',
    title: 'Query transformation',
    summary: 'Raw user queries are often poor retrieval signals — transform them before hitting the index.',
    body: 'Before hitting the index, you transform the query to improve recall and relevance.',
    bullets: [
      'HyDE (Hypothetical Document Embedding): use the LLM to generate a fake ideal answer, then embed that — it lives closer to real answers in vector space than the question alone',
      'Multi-query generation: rephrase the query 3–5 ways, retrieve for each, deduplicate and merge',
      'Step-back prompting: rewrite a specific question into a more abstract one to catch broader context',
      'Sub-question decomposition: for complex queries, break into atomic sub-questions, retrieve for each, then synthesize',
    ],
    hotspot: { left: 27.7, top: 52.4, width: 17.3, height: 8.4 },
  },
  {
    id: 'retrieval',
    step: 6,
    phase: 'online',
    diagramLabel: 'Retriever',
    title: 'Retrieval (ANN search)',
    summary: 'The transformed query is embedded and searched against the vector store; hybrid fusion improves recall.',
    body: 'The transformed query is embedded with the same model used at index time, then searched against the vector store using ANN. You fetch the top-k candidates (often k=20–100) — larger k improves recall but increases reranker latency. Hybrid retrieval runs both sparse (BM25) and dense (ANN) search in parallel, then fuses the ranked lists using Reciprocal Rank Fusion (RRF): each document gets a score of 1 / (rank + 60), summed across retrievers. No learned parameters needed — surprisingly effective.',
    hotspot: { left: 49.6, top: 52.4, width: 18.7, height: 8.4 },
  },
  {
    id: 'reranking',
    step: 7,
    phase: 'online',
    diagramLabel: 'Reranker',
    title: 'Reranking',
    summary: 'A cross-encoder scores query–chunk pairs jointly for precision before context assembly.',
    body: 'The top-k candidates from retrieval are coarsely ranked by vector similarity, but a cross-encoder reranker reads the query and each chunk together and scores their relevance. This is much more accurate than the bi-encoder (which encoded query and document independently) but too slow to run over the full index. Cross-encoders like Cohere Rerank, bge-reranker-large, or a fine-tuned BERT model reduce top-k=50 down to top-k=5 with high precision. The latency tradeoff is real: cross-encoding 50 pairs takes 200–500ms. You tune this based on SLA requirements.',
    hotspot: { left: 72.9, top: 52.4, width: 19.3, height: 8.4 },
  },
  {
    id: 'context',
    step: 8,
    phase: 'online',
    diagramLabel: 'Context builder',
    title: 'Context building',
    summary: 'Final chunks are ordered, compressed, and fitted into the model context window.',
    body: 'The final chunks are assembled into a prompt with explicit token budgeting.',
    bullets: [
      'Ordering matters: the "lost in the middle" problem — LLMs attend better to the beginning and end of context. Put the most relevant chunks first and last.',
      'Context compression: use an LLM to summarize or extract only the relevant sentences from each chunk before inserting them (reduces token cost)',
      'Context window budget: you have a finite window — typically 4k–128k tokens depending on the model. Track token counts explicitly.',
    ],
    hotspot: { left: 27.7, top: 71, width: 41.5, height: 8.4 },
  },
  {
    id: 'generation',
    step: 9,
    phase: 'online',
    diagramLabel: 'LLM generator',
    title: 'Generation',
    summary: 'The LLM reasons over supplied evidence and cites sources; post-processing verifies grounding.',
    body: 'The LLM receives the system prompt, retrieved context, and user question. It is prompted to answer strictly from the provided context and to cite sources. Post-processing may extract citations, verify claims against retrieved chunks, or run a second-pass hallucination checker.',
    hotspot: { left: 27.7, top: 85.8, width: 41.5, height: 8.4 },
  },
];

const FAILURE_MODES = [
  {
    title: 'Semantic gap',
    detail: 'Query and document do not share vocabulary — dense retrieval misses them.',
  },
  {
    title: 'Context poisoning',
    detail: 'A retrieved chunk contains misleading information that steers the answer wrong.',
  },
  {
    title: 'Lost-in-the-middle',
    detail: 'Relevant chunk sits in the middle of a long context and the LLM ignores it.',
  },
  {
    title: 'Retrieval-generation mismatch',
    detail: 'Retrieved chunks are relevant but the LLM ignores them in favor of parametric knowledge.',
  },
];

const DESIGN_DECISIONS = [
  {
    title: 'Chunk size vs. retrieval granularity',
    detail:
      'Small chunks retrieve precisely but lose context. Large chunks are self-contained but match queries poorly. Parent-child chunking is the standard production solution: embed small child chunks, retrieve parent chunks for the LLM.',
  },
  {
    title: 'Embedding model selection',
    detail:
      'Domain-specific models (e.g. medical, legal, code) dramatically outperform general models on in-domain tasks. Always benchmark on your actual data distribution, not MTEB leaderboards alone.',
  },
  {
    title: 'Retrieval metrics',
    detail:
      'Measure recall@k (does the right chunk appear in top-k?), MRR (how highly is it ranked?), and NDCG. Downstream, measure answer faithfulness (is the answer grounded in context?) and answer relevance (does it address the question?). Tools like RAGAS automate this evaluation.',
  },
];

export default function RagFundamentalsSection() {
  const [activeId, setActiveId] = useState<RagComponentId>('ingestion');
  const detailRef = useRef<HTMLDivElement>(null);

  const active = RAG_COMPONENTS.find((c) => c.id === activeId) ?? RAG_COMPONENTS[0];
  const offlineSteps = RAG_COMPONENTS.filter((c) => c.phase === 'offline');
  const onlineSteps = RAG_COMPONENTS.filter((c) => c.phase === 'online');

  const selectComponent = useCallback((id: RagComponentId) => {
    setActiveId(id);
    window.requestAnimationFrame(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }, []);

  return (
    <section
      id="rag-fundamentals"
      className="scroll-mt-16 border-t border-slate-200 bg-slate-50 text-slate-900"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
            RAG fundamentals
          </p>
          <h2 className="mb-4 text-3xl font-bold text-slate-900">
            What is RAG and why does it exist?
          </h2>
          <p className="text-left text-sm leading-relaxed text-slate-600 sm:text-base">
            RAG (Retrieval-Augmented Generation) solves the fundamental limitations of LLMs: they have
            a fixed knowledge cutoff, cannot access private data, and hallucinate when forced to recall
            specific facts. The core idea: instead of asking the model to memorize everything, you
            retrieve relevant documents at query time and inject them as context. The model becomes a
            reasoning engine over supplied evidence, not a knowledge store.
          </p>
        </div>

        <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h3 className="text-xl font-bold text-slate-900">The two halves of RAG</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            The pipeline splits cleanly into an <strong>offline indexing phase</strong> (run once, or
            incrementally) and an <strong>online query phase</strong> (runs per request). Click any box
            in the diagram to drill deeper into a component.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
              <Image
                src="/rag_pipeline_overview.svg"
                alt="RAG pipeline overview — offline indexing and online query phases"
                width={694}
                height={620}
                className="h-auto w-full"
                priority={false}
              />
              {RAG_COMPONENTS.map((component) => (
                <button
                  key={component.id}
                  type="button"
                  aria-label={`${component.diagramLabel}: ${component.title}`}
                  title={component.diagramLabel}
                  onClick={() => selectComponent(component.id)}
                  className={`absolute rounded-lg border-2 transition ${
                    activeId === component.id
                      ? 'border-teal-500 bg-teal-500/15 shadow-[0_0_0_1px_rgba(13,148,136,0.4)]'
                      : 'border-transparent bg-teal-500/0 hover:border-teal-400/40 hover:bg-teal-500/10'
                  }`}
                  style={{
                    left: `${component.hotspot.left}%`,
                    top: `${component.hotspot.top}%`,
                    width: `${component.hotspot.width}%`,
                    height: `${component.hotspot.height}%`,
                  }}
                />
              ))}
            </div>
            <p className="mt-3 text-center text-xs text-slate-500">
              Offline indexing (top) · Online query pipeline (bottom) · Dashed line = index lookup
            </p>
          </div>

          <div ref={detailRef} className="lg:col-span-5">
            <article className="sticky top-20 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    active.phase === 'offline'
                      ? 'bg-violet-100 text-violet-800'
                      : 'bg-cyan-100 text-cyan-800'
                  }`}
                >
                  {active.phase === 'offline' ? 'Phase 1 — Offline' : 'Phase 2 — Online'}
                </span>
                <span className="text-xs font-medium text-slate-500">Step {active.step}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900">{active.title}</h3>
              <p className="mt-2 text-sm font-medium text-teal-800">{active.summary}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{active.body}</p>
              {active.bullets?.length ? (
                <ul className="mt-4 space-y-2">
                  {active.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-slate-600">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 text-lg font-bold text-slate-900">Phase 1 — Offline indexing</h3>
            <ol className="space-y-4">
              {offlineSteps.map((step) => (
                <li key={step.id}>
                  <button
                    type="button"
                    onClick={() => selectComponent(step.id)}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      activeId === step.id
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-slate-200 bg-white hover:border-teal-200'
                    }`}
                  >
                    <p className="text-xs font-bold text-slate-500">
                      {step.step}. {step.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">{step.summary}</p>
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold text-slate-900">Phase 2 — Online query pipeline</h3>
            <ol className="space-y-4">
              {onlineSteps.map((step) => (
                <li key={step.id}>
                  <button
                    type="button"
                    onClick={() => selectComponent(step.id)}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      activeId === step.id
                        ? 'border-teal-500 bg-teal-50'
                        : 'border-slate-200 bg-white hover:border-teal-200'
                    }`}
                  >
                    <p className="text-xs font-bold text-slate-500">
                      {step.step}. {step.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">{step.summary}</p>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="mb-2 text-lg font-bold text-slate-900">Retrieval & query strategies</h3>
          <p className="mb-4 text-sm text-slate-600">
            Sparse BM25, dense ANN, and hybrid RRF fusion — plus query transforms (HyDE, multi-query,
            decomposition) applied before the retriever.
          </p>
          <Image
            src="/rag_retrieval_strategies.svg"
            alt="RAG retrieval strategies — sparse BM25, dense ANN, hybrid RRF, and query transforms"
            width={680}
            height={360}
            className="h-auto w-full rounded-xl"
          />
        </div>
      </div>

      <RagHybridRetrievalSection />

      <div className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
        <div className="mt-14">
          <h3 className="mb-6 text-xl font-bold text-slate-900">Critical design decisions</h3>
          <div className="grid gap-5 md:grid-cols-3">
            {DESIGN_DECISIONS.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h4 className="font-bold text-slate-900">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="mb-4 text-xl font-bold text-slate-900">Failure modes to know</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {FAILURE_MODES.map((mode) => (
              <article
                key={mode.title}
                className="rounded-xl border border-rose-100 bg-rose-50/60 p-4"
              >
                <h4 className="font-semibold text-rose-900">{mode.title}</h4>
                <p className="mt-1 text-sm leading-relaxed text-rose-800/90">{mode.detail}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white sm:p-8">
          <h3 className="text-lg font-bold text-teal-200">Advanced architectures</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            <strong className="text-white">Agentic RAG</strong> adds a routing step where the LLM
            decides which retrieval strategy to use (or whether to retrieve at all).{' '}
            <strong className="text-white">FLARE</strong> and <strong className="text-white">Self-RAG</strong>{' '}
            have the model generate in passes, retrieving mid-generation when confidence is low.{' '}
            <strong className="text-white">GraphRAG</strong> builds a knowledge graph over the corpus
            to handle multi-hop reasoning that flat retrieval misses.
          </p>
        </div>
      </div>
    </section>
  );
}
