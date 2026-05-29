import Link from "next/link";
import { NavClient, TerminalClient, Reveal } from "../components/LandingInteractive";

/* ─── Hero ──────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden bg-noise">
      {/* Ambient glow behind terminal */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[60%] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 110%, rgba(139,92,246,0.08) 0%, transparent 70%)" }}
      />
      {/* Faint top fade */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-48 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #08080b 0%, transparent 100%)" }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
        {/* Label */}
        <div className="hero-1 flex items-center gap-2 mb-8 px-3 py-1.5 border border-white/8 bg-white/[0.03] font-mono text-[11px] text-[#52525e] tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-ring" />
          LangGraph · Groq · ChromaDB
        </div>

        {/* Headline */}
        <h1 className="hero-2 font-display leading-[0.92] tracking-tight mb-6">
          <span className="block text-6xl sm:text-7xl lg:text-8xl text-[#ededf0]">The support agent</span>
          <span className="block text-6xl sm:text-7xl lg:text-8xl text-[#ededf0]/25 italic">that reasons</span>
          <span className="block text-6xl sm:text-7xl lg:text-8xl text-[#ededf0]">out loud.</span>
        </h1>

        {/* Sub */}
        <p className="hero-3 text-base text-[#52525e] leading-relaxed mb-10 max-w-md">
          Multi-step AI agent. Looks up orders, initiates refunds, creates tickets.
          Every decision logged, replayable, inspectable.
        </p>

        {/* CTAs */}
        <div className="hero-4 flex items-center gap-3 mb-14 flex-wrap justify-center">
          <Link
            href="/app"
            className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white text-sm font-mono btn-press"
            style={{ transition: "background 150ms cubic-bezier(0.16,1,0.3,1)" }}
          >
            Try the demo
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <a
            href="https://github.com/RAK2315/agentsupport-FLowZIntThon"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-white/12 text-[#52525e] hover:text-[#ededf0] hover:border-white/25 text-sm font-mono btn-press"
            style={{ transition: "color 150ms, border-color 150ms" }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            Source
          </a>
        </div>

        {/* Terminal — the product */}
        <div className="hero-5 w-full max-w-lg mx-auto">
          <TerminalClient />
        </div>
      </div>
    </section>
  );
}

/* ─── Features (numbered horizontal list) ───────────────────── */
const FEATURES = [
  {
    num: "01",
    title: "Multi-step reasoning",
    body: "LangGraph orchestrates up to 8 tool calls per turn. The agent plans the complete action sequence upfront — order lookup, refund, ticket — then executes in order without needing follow-up prompts.",
    accent: "#8b5cf6",
  },
  {
    num: "02",
    title: "Full audit trail",
    body: "Every node visit, tool call, input payload, output, and reasoning string is timestamped and stored per session. Replay any conversation step-by-step at 800ms intervals.",
    accent: "#f59e0b",
  },
  {
    num: "03",
    title: "RAG policy lookup",
    body: "Return policies, warranty terms, and escalation procedures are embedded into ChromaDB at startup using sentence-transformers on CPU. The agent retrieves by semantic similarity, not keyword.",
    accent: "#10b981",
  },
];

function Features() {
  return (
    <section className="py-24 max-w-5xl mx-auto px-6">
      <Reveal className="mb-14">
        <p className="font-mono text-[11px] text-[#52525e] tracking-widest uppercase mb-4">How it works</p>
        <h2 className="font-display text-4xl lg:text-5xl text-[#ededf0] leading-tight">
          Not a chatbot.
          <br />
          <em className="text-[#ededf0]/30">An agent.</em>
        </h2>
      </Reveal>

      <div>
        {FEATURES.map((f, i) => (
          <Reveal key={f.num} delay={i * 80}>
            <div className="feature-row flex items-start gap-8 py-8 px-0 cursor-default">
              <span className="row-num font-mono text-2xl text-[#2a2a35] shrink-0 w-10 pt-0.5">{f.num}</span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-8">
                  <h3
                    className="font-display text-xl text-[#ededf0] shrink-0 sm:w-52 mb-2 sm:mb-0"
                    style={{ color: undefined }}
                  >
                    {f.title}
                  </h3>
                  <p className="text-sm text-[#52525e] leading-relaxed">{f.body}</p>
                </div>
              </div>
              <div
                className="hidden sm:block w-1 h-1 rounded-full mt-2.5 shrink-0"
                style={{ background: f.accent, opacity: 0.6 }}
              />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── Audit showcase ─────────────────────────────────────────── */
const STEPS = [
  { num: "01", node: "intent_router",  tool: null,              badge: "bg-violet-900/50 text-violet-300 border-violet-700/40", note: "classified as wrong_item · planned 3 tools" },
  { num: "02", node: "audit_logger",   tool: "order_lookup()",  badge: "bg-[#0f0f15] text-[#52525e] border-white/6",           note: "ORD-003 → wrong_item · $249.99" },
  { num: "03", node: "audit_logger",   tool: "refund_trigger()",badge: "bg-[#0f0f15] text-[#52525e] border-white/6",           note: "refund_initiated · 5-7 business days" },
  { num: "04", node: "audit_logger",   tool: "ticket_create()", badge: "bg-[#0f0f15] text-[#52525e] border-white/6",           note: "TKT-389B3AB7 · priority:high" },
  { num: "05", node: "responder",      tool: null,              badge: "bg-emerald-900/50 text-emerald-300 border-emerald-700/40", note: "customer-facing response generated" },
];

function AuditShowcase() {
  return (
    <section
      className="py-24 border-y"
      style={{ borderColor: "rgba(255,255,255,0.06)", background: "#0a0a0e" }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <Reveal className="lg:sticky lg:top-24">
            <p className="font-mono text-[11px] text-amber-500/70 tracking-widest uppercase mb-4">Transparent by design</p>
            <h2 className="font-display text-4xl lg:text-5xl text-[#ededf0] leading-tight mb-6">
              Watch it
              <br />
              <em className="text-[#ededf0]/30">think.</em>
            </h2>
            <p className="text-sm text-[#52525e] leading-relaxed mb-8 max-w-xs">
              Every session produces a full audit trail. Inspect tool inputs, outputs,
              and reasoning at each step. Hit Replay to animate the sequence.
            </p>
            <Link
              href="/app"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-amber-500/25 bg-amber-500/8 text-amber-400 hover:bg-amber-500/15 text-xs font-mono btn-press"
              style={{ transition: "background 150ms cubic-bezier(0.16,1,0.3,1)" }}
            >
              Run the demo →
            </Link>
          </Reveal>

          {/* Step cards */}
          <div className="space-y-1">
            {STEPS.map((s, i) => (
              <Reveal key={s.num} delay={i * 60}>
                <div className="audit-step flex items-center gap-3 px-4 py-3 border group" style={{ borderColor: "rgba(255,255,255,0.06)", background: "#0c0c12" }}>
                  <span className="font-mono text-[11px] text-[#2a2a35] w-6 shrink-0">#{s.num}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 border shrink-0 ${s.badge}`}>{s.node}</span>
                  {s.tool && (
                    <span className="text-[10px] font-mono text-[#52525e] border border-white/6 bg-white/[0.02] px-2 py-0.5 shrink-0">
                      {s.tool}
                    </span>
                  )}
                  <span className="text-[10px] font-mono text-[#2a2a35] truncate ml-auto hidden sm:block">{s.note}</span>
                </div>
              </Reveal>
            ))}

            <Reveal delay={350}>
              <div className="pt-3 flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-2 border border-violet-500/25 bg-violet-500/8 text-violet-400 text-[10px] font-mono">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Replay Audit
                </div>
                <span className="text-[10px] font-mono text-[#2a2a35]">800ms per step · live in /audit</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Tech ───────────────────────────────────────────────────── */
function Tech() {
  const stack = [
    { name: "Groq", note: "llama-3.3-70b-versatile", color: "#f59e0b" },
    { name: "LangGraph", note: "5-node state graph", color: "#8b5cf6" },
    { name: "FastAPI", note: "async + CORS", color: "#10b981" },
    { name: "ChromaDB", note: "local persistent", color: "#60a5fa" },
    { name: "Next.js 14", note: "app router + TS", color: "#ededf0" },
    { name: "Tailwind", note: "no UI library", color: "#38bdf8" },
  ];

  return (
    <section className="py-20 max-w-5xl mx-auto px-6">
      <Reveal>
        <p className="font-mono text-[11px] text-[#2a2a35] tracking-widest uppercase mb-10 text-center">Built with</p>
      </Reveal>
      <Reveal delay={80}>
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {stack.map((t) => (
            <div key={t.name} className="flex items-baseline gap-2">
              <span className="font-mono text-sm font-medium" style={{ color: t.color }}>{t.name}</span>
              <span className="font-mono text-[10px] text-[#2a2a35]">{t.note}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section className="py-32 px-6 text-center bg-noise relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(139,92,246,0.05) 0%, transparent 70%)" }}
      />
      <div className="relative z-10 max-w-3xl mx-auto">
        <Reveal>
          <h2 className="font-display text-5xl sm:text-6xl lg:text-7xl text-[#ededf0] leading-[0.92] mb-8">
            Send it your
            <br />
            <em className="text-[#ededf0]/25">hardest query.</em>
          </h2>
          <p className="text-sm text-[#52525e] mb-10 max-w-sm mx-auto leading-relaxed">
            Wrong item, delayed order, refund request, policy question.
            Watch the audit trail build in real time.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#ededf0] text-[#08080b] text-sm font-mono font-medium hover:bg-white btn-press"
            style={{ transition: "background 150ms cubic-bezier(0.16,1,0.3,1)" }}
          >
            Open AgentSupport
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <p className="mt-6 text-[10px] font-mono text-[#2a2a35]">groq · langgraph · chromadb · no paid infra</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t py-6 px-6" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-4">
        <span className="font-mono text-[10px] text-[#2a2a35]">AgentSupport</span>
        <div className="flex items-center gap-6">
          <Link href="/app" className="font-mono text-[10px] text-[#2a2a35] hover:text-[#52525e]" style={{ transition: "color 150ms" }}>chat</Link>
          <a href="https://github.com/RAK2315/agentsupport-FLowZIntThon" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-[#2a2a35] hover:text-[#52525e]" style={{ transition: "color 150ms" }}>github</a>
          <span className="font-mono text-[10px] text-[#1e1e26]">MIT</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen text-[#ededf0]" style={{ background: "#08080b" }}>
      <NavClient />
      <Hero />
      <Features />
      <AuditShowcase />
      <Tech />
      <CTA />
      <Footer />
    </div>
  );
}
