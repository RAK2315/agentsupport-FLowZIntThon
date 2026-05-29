import Link from "next/link";
import { NavClient, TerminalClient, Reveal } from "../components/LandingInteractive";

const T1 = "rgba(255,255,255,0.90)";
const T2 = "rgba(255,255,255,0.52)";
const T3 = "rgba(255,255,255,0.28)";
const B  = "rgba(255,255,255,0.09)";

/* ─── Hero ──────────────────────────────────────────────────── */
function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "100svh", display: "flex", alignItems: "center", paddingTop: 96, paddingBottom: 80 }}
    >
      <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 lg:gap-12 items-center">

          {/* Left: headline + CTAs */}
          <div className="max-w-2xl">
            <h1
              className="hero-2 font-display mb-6"
              style={{
                fontSize: "clamp(52px, 7vw, 96px)",
                lineHeight: 0.92,
                letterSpacing: "-0.03em",
                color: T1,
              }}
            >
              The support
              <br />
              agent that
              <br />
              <em style={{ color: T2 }}>reasons.</em>
            </h1>

            <p
              className="hero-3 mb-10"
              style={{ fontSize: "clamp(16px, 1.2vw, 18px)", lineHeight: 1.65, color: T2, maxWidth: 440 }}
            >
              A multi-step AI agent that looks up orders, initiates refunds, creates
              tickets, and answers policy questions — all in one turn. Every decision
              logged, replayable, inspectable.
            </p>

            <div className="hero-4 flex items-center gap-4 flex-wrap">
              <Link
                href="/app"
                className="inline-flex items-center gap-2 font-mono font-semibold text-sm px-7 py-3.5 btn-press"
                style={{ background: T1, color: "#06060a", transition: "background 150ms cubic-bezier(0.16,1,0.3,1)" }}
              >
                Try the demo
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="https://github.com/RAK2315/agentsupport-FLowZIntThon"
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-sm px-7 py-3.5 btn-press"
                style={{ border: `1px solid ${B}`, color: T2, transition: "border-color 150ms, color 150ms" }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                View source
              </a>
            </div>
          </div>

          {/* Right: terminal */}
          <div className="hero-5 w-full" style={{ maxWidth: 500 }}>
            <TerminalClient />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Marquee ────────────────────────────────────────────────── */
const QUERIES = [
  "I received the wrong item for order ORD-003",
  "What's my refund status?",
  "My order ORD-002 has been delayed",
  "Does the warranty cover accidental damage?",
  "I need to return a purchase from last week",
  "Can I cancel order ORD-005?",
  "How long does a refund take?",
  "I want to escalate this issue",
];

function Marquee() {
  const items = [...QUERIES, ...QUERIES];
  return (
    <div
      className="overflow-hidden py-6"
      style={{ borderTop: `1px solid ${B}`, borderBottom: `1px solid ${B}`, background: "rgba(255,255,255,0.015)" }}
    >
      <div className="marquee-track flex gap-16 select-none">
        {items.map((q, i) => (
          <span
            key={i}
            className="font-mono text-sm whitespace-nowrap shrink-0"
            style={{ color: T3 }}
          >
            <span style={{ color: "rgba(255,255,255,0.18)" }}>›</span>{" "}
            {q}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Features (numbered list, giant numbers) ────────────────── */
const FEATURES = [
  {
    num: "01",
    title: "Multi-step reasoning",
    body: "LangGraph orchestrates up to 8 sequential tool calls in one turn. The agent plans the complete action sequence upfront — order lookup, refund initiation, ticket creation — then executes without needing follow-up prompts.",
  },
  {
    num: "02",
    title: "Full audit trail",
    body: "Every node visit, tool call, input payload, output, and reasoning string is timestamped and stored per session in memory. Navigate to /audit to inspect any step or hit Replay to animate the full sequence at 800ms intervals.",
  },
  {
    num: "03",
    title: "RAG policy lookup",
    body: "Return policies, warranty terms, and escalation procedures are embedded into ChromaDB at startup using sentence-transformers running on CPU. The agent retrieves by semantic similarity, not keyword, from your policy documents.",
  },
];

function Features() {
  return (
    <section className="max-w-6xl mx-auto px-8" style={{ paddingTop: 140, paddingBottom: 140 }}>
      <Reveal className="mb-20">
        <p
          className="font-mono text-xs uppercase tracking-widest mb-5"
          style={{ color: T3, letterSpacing: "0.14em" }}
        >
          How it works
        </p>
        <h2
          className="font-display"
          style={{
            fontSize: "clamp(40px, 5.5vw, 72px)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            color: T1,
          }}
        >
          Not a chatbot.
          <br />
          <em style={{ color: T2 }}>An agent.</em>
        </h2>
      </Reveal>

      <div>
        {FEATURES.map((f, i) => (
          <Reveal key={f.num} delay={i * 100}>
            <div
              className="feature-row flex items-start gap-10 py-10 px-0"
            >
              <span
                className="feature-num font-mono shrink-0 w-14 pt-1"
                style={{
                  fontSize: "clamp(28px, 3.5vw, 48px)",
                  color: "rgba(255,255,255,0.12)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  transition: "color 220ms",
                }}
              >
                {f.num}
              </span>
              <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:gap-12">
                <h3
                  className="font-display shrink-0 sm:w-56 mb-3 sm:mb-0"
                  style={{ fontSize: "clamp(18px, 1.8vw, 24px)", color: T1, lineHeight: 1.2 }}
                >
                  {f.title}
                </h3>
                <p style={{ fontSize: 16, color: T2, lineHeight: 1.7, maxWidth: 560 }}>
                  {f.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── Process — 3 step visual ────────────────────────────────── */
const PROCESS_STEPS = [
  {
    n: "1",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
      </svg>
    ),
    label: "Customer sends a message",
    note: "Natural language — no structured input required",
  },
  {
    n: "2",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      </svg>
    ),
    label: "Agent plans and executes",
    note: "Up to 8 tool calls in sequence, per LangGraph",
  },
  {
    n: "3",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
      </svg>
    ),
    label: "Full audit trail generated",
    note: "Every step logged, replayable at any time",
  },
];

function Process() {
  return (
    <section style={{ paddingTop: 0, paddingBottom: 140, background: "#06060a" }}>
      <div className="max-w-6xl mx-auto px-8">
        <Reveal>
          <div
            className="process-grid grid grid-cols-1 sm:grid-cols-3 gap-px"
            style={{ border: `1px solid ${B}` }}
          >
            {PROCESS_STEPS.map((s, i) => (
              <div
                key={s.n}
                className="process-card"
                style={{
                  background: "#0a0a0f",
                  borderRight: i < 2 ? `1px solid ${B}` : undefined,
                }}
              >
                <div className="p-10">
                  <div className="process-icon mb-6" style={{ color: "rgba(255,255,255,0.65)" }}>{s.icon}</div>
                  <div className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: T3, letterSpacing: "0.12em" }}>Step {s.n}</div>
                  <h3 className="font-display mb-3" style={{ fontSize: 22, color: T1, lineHeight: 1.2 }}>{s.label}</h3>
                  <p style={{ fontSize: 14, color: T2, lineHeight: 1.6 }}>{s.note}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Audit showcase ─────────────────────────────────────────── */
const STEPS = [
  { num:"01", node:"intent_router",  tool:null,               badge:`background:rgba(139,92,246,0.15);color:#a78bfa;border:1px solid rgba(139,92,246,0.3)`, note:"classified as wrong_item · planned 3 tools" },
  { num:"02", node:"audit_logger",   tool:"order_lookup()",   badge:`background:#0e0e14;color:rgba(255,255,255,0.40);border:1px solid rgba(255,255,255,0.08)`, note:"ORD-003 → wrong_item · $249.99" },
  { num:"03", node:"audit_logger",   tool:"refund_trigger()", badge:`background:#0e0e14;color:rgba(255,255,255,0.40);border:1px solid rgba(255,255,255,0.08)`, note:"refund_initiated · 5-7 business days" },
  { num:"04", node:"audit_logger",   tool:"ticket_create()",  badge:`background:#0e0e14;color:rgba(255,255,255,0.40);border:1px solid rgba(255,255,255,0.08)`, note:"TKT-389B3AB7 · priority:high" },
  { num:"05", node:"responder",      tool:null,               badge:`background:rgba(16,185,129,0.12);color:#6ee7b7;border:1px solid rgba(16,185,129,0.25)`, note:"customer-facing response generated" },
];

function AuditShowcase() {
  return (
    <section style={{ paddingTop: 140, paddingBottom: 140, background: "#09090e", borderTop: `1px solid ${B}`, borderBottom: `1px solid ${B}` }}>
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-20 items-start">
          <Reveal className="lg:sticky lg:top-28">
            <p className="font-mono text-xs uppercase tracking-widest mb-5" style={{ color: T3, letterSpacing: "0.14em" }}>
              Full transparency
            </p>
            <h2
              className="font-display mb-6"
              style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 0.95, letterSpacing: "-0.02em", color: T1 }}
            >
              Watch the agent
              <br />
              <em style={{ color: T2 }}>think out loud.</em>
            </h2>
            <p style={{ fontSize: 16, color: T2, lineHeight: 1.7, maxWidth: 340, marginBottom: 32 }}>
              Every session generates a timestamped audit trail. Inspect tool inputs, outputs,
              and reasoning at each step. Hit Replay to animate the sequence.
            </p>
            <Link
              href="/app"
              className="inline-flex items-center gap-2 font-mono text-sm px-5 py-3 btn-press"
              style={{
                border: `1px solid rgba(255,255,255,0.18)`,
                color: T2,
                transition: "border-color 150ms, color 150ms",
              }}
            >
              Run a live demo →
            </Link>
          </Reveal>

          <div>
            <div className="space-y-1">
              {STEPS.map((s, i) => (
                <Reveal key={s.num} delay={i * 100} className="audit-row-reveal">
                  <div
                    className="step-row flex items-center gap-3 px-4 py-3.5"
                    style={{ border: `1px solid ${B}`, background: "#0c0c13" }}
                  >
                    <span className="font-mono shrink-0 w-7" style={{ fontSize: 11, color: "rgba(255,255,255,0.18)" }}>
                      #{s.num}
                    </span>
                    <span
                      className="step-badge font-mono text-xs px-2.5 py-1 shrink-0"
                      style={{ ...Object.fromEntries(s.badge.split(";").filter(Boolean).map(x => { const [k,v]=x.split(":"); return [k.trim().replace(/-([a-z])/g,(_,c)=>c.toUpperCase()), v.trim()]; })) }}
                    >
                      {s.node}
                    </span>
                    {s.tool && (
                      <span className="step-badge font-mono text-xs px-2.5 py-1 shrink-0" style={{ background: "#0e0e14", color: "rgba(255,255,255,0.35)", border: `1px solid ${B}` }}>
                        {s.tool}
                      </span>
                    )}
                    <span className="step-note font-mono text-xs ml-auto hidden sm:block truncate" style={{ color: "rgba(255,255,255,0.20)" }}>
                      {s.note}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={320}>
              <div className="flex items-center gap-3 mt-4">
                <div
                  className="flex items-center gap-2 px-4 py-2.5 font-mono text-xs"
                  style={{ border: `1px solid rgba(255,255,255,0.14)`, color: T2 }}
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Replay Audit
                </div>
                <span className="font-mono text-xs" style={{ color: T3 }}>800ms per step · live in /audit</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Tech ───────────────────────────────────────────────────── */
const TECH = [
  { name: "Groq",      sub: "llama-3.3-70b-versatile" },
  { name: "LangGraph", sub: "5-node state graph"       },
  { name: "FastAPI",   sub: "async + CORS"             },
  { name: "ChromaDB",  sub: "local persistent"         },
  { name: "Next.js",   sub: "14 app router"            },
  { name: "Python",    sub: "3.10+"                    },
];

function Tech() {
  return (
    <section style={{ paddingTop: 100, paddingBottom: 100 }}>
      <div className="max-w-6xl mx-auto px-8">
        <Reveal>
          <p className="font-mono text-xs uppercase text-center mb-12" style={{ color: T3, letterSpacing: "0.14em" }}>
            Built with
          </p>
        </Reveal>
        <Reveal delay={60}>
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px"
            style={{ border: `1px solid ${B}` }}
          >
            {TECH.map((t, i) => (
              <div
                key={t.name}
                className="py-8 px-6 text-center"
                style={{
                  background: "#0a0a0f",
                  borderRight: i < TECH.length - 1 ? `1px solid ${B}` : undefined,
                }}
              >
                <div className="font-mono font-semibold mb-1.5" style={{ fontSize: 14, color: T1 }}>{t.name}</div>
                <div className="font-mono" style={{ fontSize: 10, color: T3, lineHeight: 1.4 }}>{t.sub}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────────────────── */
function CTA() {
  return (
    <section style={{ paddingTop: 160, paddingBottom: 160, borderTop: `1px solid ${B}` }}>
      <div className="max-w-4xl mx-auto px-8 text-center">
        <Reveal>
          <h2
            className="font-display mx-auto mb-8"
            style={{
              fontSize: "clamp(48px, 8vw, 96px)",
              lineHeight: 0.92,
              letterSpacing: "-0.025em",
              color: T1,
              maxWidth: 800,
            }}
          >
            Send it your
            <br />
            <em style={{ color: T2 }}>hardest query.</em>
          </h2>
          <p style={{ fontSize: 18, color: T2, marginBottom: 48, maxWidth: 440, margin: "0 auto 48px" }}>
            Wrong item, delayed order, policy question, refund request.
            Watch the agent reason through it step by step.
          </p>
          <Link
            href="/app"
            className="inline-flex items-center gap-3 font-mono font-semibold text-base px-10 py-5 btn-press"
            style={{
              background: "rgba(255,255,255,0.90)",
              color: "#06060a",
              transition: "background 150ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            Open AgentSupport
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <p className="font-mono mt-6" style={{ fontSize: 11, color: T3 }}>
            groq · langgraph · chromadb · no paid infra
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${B}`, paddingTop: 24, paddingBottom: 24 }}>
      <div className="max-w-6xl mx-auto px-8 flex items-center justify-between flex-wrap gap-4">
        <span className="font-mono text-xs" style={{ color: T3 }}>AgentSupport</span>
        <div className="flex items-center gap-8">
          <Link href="/app" className="font-mono text-xs" style={{ color: T3 }}>chat</Link>
          <a href="https://github.com/RAK2315/agentsupport-FLowZIntThon" target="_blank" rel="noopener noreferrer" className="font-mono text-xs" style={{ color: T3 }}>github</a>
          <span className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.14)" }}>MIT</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ───────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div style={{ background: "#060609", color: T1, minHeight: "100vh" }}>
      <NavClient />
      <Hero />
      <Marquee />
      <Features />
      <Process />
      <AuditShowcase />
      <Tech />
      <CTA />
      <Footer />
    </div>
  );
}
