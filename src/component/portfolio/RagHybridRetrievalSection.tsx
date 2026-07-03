'use client';

import Image from 'next/image';

const BM25_FORMULA = `score(D, Q) = Σ IDF(qi) · [f(qi, D) · (k1 + 1)] / [f(qi, D) + k1 · (1 - b + b · |D|/avgdl)]

IDF(qi) = log((N - df + 0.5) / (df + 0.5))`;

const RRF_FORMULA = `RRF_score(doc) = Σ_retrievers [ 1 / (k + rank(doc)) ]

k = 60  (dampens top-rank dominance)`;

const DECISION_FRAMEWORK = [
  {
    title: 'When to lean sparse',
    accent: 'border-slate-300 bg-slate-50',
    detail:
      'Your corpus has lots of domain-specific jargon, product codes, model numbers, or acronyms that an embedding model has not seen enough of to position well. Also useful when users are expert searchers who know exactly the terminology in the documents.',
  },
  {
    title: 'When to lean dense',
    accent: 'border-emerald-200 bg-emerald-50/80',
    detail:
      'Users ask questions in natural language that may not match document vocabulary. Cross-language retrieval. Conceptual questions ("what is the company\'s policy on X") rather than keyword lookups.',
  },
  {
    title: 'When to use hybrid',
    accent: 'border-amber-200 bg-amber-50/80',
    detail:
      'Almost always in production — unless you have a very specific reason not to. Tradeoffs are infrastructure complexity (two indexes) and latency (two parallel requests). Most systems accept this because hybrid consistently beats either approach alone on recall benchmarks.',
  },
];

export default function RagHybridRetrievalSection() {
  return (
    <section
      id="hybrid-retrieval"
      className="border-t border-slate-200 bg-white text-slate-900"
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto mb-12 max-w-3xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-teal-700">
            Retrieval deep dive
          </p>
          <h2 className="mb-4 text-3xl font-bold text-slate-900">The core insight</h2>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            Every retrieval method answers: &ldquo;how do I measure whether this chunk is relevant to
            this query?&rdquo; Sparse and dense methods use completely different notions of similarity,
            which is exactly why they complement each other.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
            <h3 className="text-xl font-bold text-slate-900">Sparse retrieval (BM25)</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Sparse retrieval represents both queries and documents as high-dimensional term-frequency
              vectors — &ldquo;sparse&rdquo; because almost all dimensions are zero (most terms do not
              appear in any given document). The classic algorithm is{' '}
              <strong className="text-slate-800">BM25 (Best Match 25)</strong>, which improves on raw
              TF-IDF by saturating term frequency and normalizing for document length.
            </p>
            <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">
              BM25 score for document D given query Q
            </p>
            <pre className="mt-2 overflow-x-auto rounded-xl border border-slate-200 bg-slate-950 p-4 font-mono text-[11px] leading-relaxed text-emerald-300">
              {BM25_FORMULA}
            </pre>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              f(qi, D) = term frequency · |D| = document length · avgdl = average doc length · k1
              (typically 1.2–2.0) and b (typically 0.75) are tuning parameters
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Mechanically: a BM25 index is an <strong>inverted index</strong> — a map from term →
              list of (doc_id, score) pairs. Lookup is O(number of query terms × posting list length),
              which is fast and exact.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                <p className="text-xs font-bold uppercase text-emerald-800">Where sparse excels</p>
                <p className="mt-2 text-sm leading-relaxed text-emerald-900/90">
                  Exact keyword matching, product codes (iPhone 15 Pro Max), model numbers, proper
                  nouns, technical identifiers — any case where user vocabulary precisely matches
                  document vocabulary. No semantic gap to cross.
                </p>
              </div>
              <div className="rounded-xl border border-rose-100 bg-rose-50/60 p-4">
                <p className="text-xs font-bold uppercase text-rose-800">Where it fails</p>
                <p className="mt-2 text-sm leading-relaxed text-rose-900/90">
                  Synonyms, paraphrases, and anything requiring conceptual understanding.
                  &ldquo;Canine dental care&rdquo; will not retrieve &ldquo;dog tooth health&rdquo; with
                  zero overlap.
                </p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8">
            <h3 className="text-xl font-bold text-slate-900">Dense retrieval (ANN)</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Dense retrieval encodes both query and documents as low-dimensional continuous vectors
              (768–3072 dimensions). Proximity in this space correlates with semantic similarity —
              &ldquo;canine dental care&rdquo; and &ldquo;dog tooth health&rdquo; land near each other
              even with no shared terms.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              The architecture is a <strong>bi-encoder</strong>: pass the query through an encoder to
              get q_vec, pass each document through the same encoder to get d_vec, and relevance is{' '}
              <code className="rounded bg-slate-200 px-1 py-0.5 text-xs">cosine_similarity(q_vec, d_vec)</code>{' '}
              or dot product. You cannot brute-force compare against millions of vectors per query —
              this is where <strong>ANN (Approximate Nearest Neighbor)</strong> indexing comes in.
            </p>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                <span>
                  <strong className="text-slate-800">HNSW</strong> (Hierarchical Navigable Small
                  World): multi-layer graph with greedy traversal from coarse to fine — like a skip
                  list. ~95–99% recall at ~1–5ms per query. Default for most RAG deployments.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                <span>
                  <strong className="text-slate-800">IVF</strong> (Inverted File): k-means clusters
                  vectors; query probes only nearest clusters. More memory efficient but generally lower
                  recall at the same speed.
                </span>
              </li>
            </ul>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-4">
                <p className="text-xs font-bold uppercase text-emerald-800">Where dense excels</p>
                <p className="mt-2 text-sm leading-relaxed text-emerald-900/90">
                  Semantic similarity, paraphrase, cross-lingual retrieval, conceptual questions.
                </p>
              </div>
              <div className="rounded-xl border border-rose-100 bg-rose-50/60 p-4">
                <p className="text-xs font-bold uppercase text-rose-800">Where it struggles</p>
                <p className="mt-2 text-sm leading-relaxed text-rose-900/90">
                  Rare technical terms, product codes, exact strings — the embedding model may map
                  them to similar-looking but meaningless positions in the space.
                </p>
              </div>
            </div>
          </article>
        </div>

        <div className="mt-14 rounded-2xl border border-amber-200/80 bg-amber-50/40 p-6 sm:p-8">
          <h3 className="text-xl font-bold text-slate-900">
            Hybrid search and Reciprocal Rank Fusion
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            BM25 and dense retrieval fail in different, mostly non-overlapping ways — so running both
            and merging is almost always better than either alone. The naive approach — normalize scores
            from both retrievers and add them — breaks down because BM25 scores (typically 0–30) and
            cosine similarity (0–1) are on completely different scales.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            <strong className="text-slate-800">Reciprocal Rank Fusion</strong> sidesteps this by
            ignoring raw scores and working only on rank positions:
          </p>
          <pre className="mt-4 overflow-x-auto rounded-xl border border-amber-200 bg-slate-950 p-4 font-mono text-[11px] leading-relaxed text-amber-200">
            {RRF_FORMULA}
          </pre>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Documents appearing in both lists accumulate scores from both retrievers. Documents in only
            one list still get credit for that single appearance.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
            <Image
              src="/hybrid_rrf_flow.svg"
              alt="Hybrid search flow — BM25 and dense ANN retrievers run in parallel, ranked lists fused by RRF, merged top-k sent to reranker"
              width={680}
              height={500}
              className="h-auto w-full rounded-xl"
            />
          </div>

          <div className="mt-6 rounded-xl border border-teal-200 bg-teal-50/80 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-teal-800">
              Concrete RRF example (from diagram)
            </p>
            <ul className="mt-3 space-y-2 font-mono text-xs leading-relaxed text-teal-900 sm:text-sm">
              <li>
                <strong>doc_A</strong>: rank 1 in BM25, rank 2 in dense → 1/(60+1) + 1/(60+2) ={' '}
                <strong>0.0325</strong>
              </li>
              <li>
                <strong>doc_B</strong>: rank 4 in BM25, rank 1 in dense → 1/(60+4) + 1/(60+1) ={' '}
                <strong>0.0320</strong>
              </li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed text-teal-900">
              Despite never topping either individual list, doc_A edges out as the hybrid winner. No
              learned parameters, no normalization — RRF just works, which is why it became the
              standard.
            </p>
          </div>
        </div>

        <div className="mt-14">
          <h3 className="mb-2 text-xl font-bold text-slate-900">
            The decision framework — which to use when
          </h3>
          <p className="mb-6 text-sm text-slate-600">
            How to reason through the choice in production system design:
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {DECISION_FRAMEWORK.map((item) => (
              <article
                key={item.title}
                className={`rounded-2xl border p-5 shadow-sm ${item.accent}`}
              >
                <h4 className="font-bold text-slate-900">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.detail}</p>
              </article>
            ))}
          </div>
          <p className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
            <strong className="text-slate-800">Practical benchmark:</strong> on BEIR, hybrid
            BM25+dense improves nDCG@10 over dense-only by 2–5 points on most datasets — meaningful but
            not transformative. Gains are largest on technical corpora (TREC-COVID, SciFact) where
            terminology matters.
          </p>
        </div>
      </div>
    </section>
  );
}
