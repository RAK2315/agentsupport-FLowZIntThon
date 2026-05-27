import Link from "next/link";

/* ─── Nav ─────────────────────────────────────────────────── */
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#07070a]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 bg-indigo-600 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
          </div>
          <span className="text-white font-semibold text-sm tracking-tight">AgentSupport</span>
        </div>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/RAK2315/agentsupport-FLowZIntThon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-zinc-300 transition-colors text-sm flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
          <Link
            href="/app"
            className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
          >
            Try Demo
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ─── Agent Terminal (hero visual) ───────────────────────── */
function AgentTerminal() {
  return (
    <div className="relative w-full max-w-[480px] animate-fade-in" style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
      {/* Glow */}
      <div className="absolute -inset-px bg-indigo-600/20 blur-xl rounded-none pointer-events-none" />
      <div className="relative border border-white/10 bg-[#0c0c12] overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          <span className="ml-2 text-xs font-mono text-zinc-500">agentsupport · live session</span>
          <span className="ml-auto flex items-center gap-1 text-xs font-mono text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-ring inline-block" />
            online
          </span>
        </div>

        {/* User message */}
        <div className="px-4 pt-4 pb-3 step-1">
          <div className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-zinc-700 flex items-center justify-center shrink-0 mt-0.5">
              <span className="text-[9px] text-zinc-300 font-mono">U</span>
            </div>
            <div className="bg-indigo-600/20 border border-indigo-500/20 px-3 py-2 text-sm text-indigo-100 font-mono">
              I received the wrong item for order ORD-003
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="px-4 pb-1 space-y-3">
          {/* Step 1 */}
          <div className="step-2">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-1">
              <span className="text-violet-400">▸ intent_router</span>
              <div className="flex-1 h-px bg-zinc-800 relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-violet-500/60 progress-1" />
              </div>
              <span className="text-violet-300 text-[10px]">✓</span>
            </div>
            <div className="text-[11px] font-mono text-zinc-600 pl-4">
              intent: <span className="text-amber-400">wrong_item</span> · tools planned: <span className="text-zinc-400">3</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="step-3">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-1">
              <span className="text-blue-400">▸ order_lookup</span>
              <span className="text-zinc-700 text-[10px]">(ORD-003)</span>
              <div className="flex-1 h-px bg-zinc-800 relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-blue-500/60 progress-2" />
              </div>
              <span className="text-blue-300 text-[10px]">✓</span>
            </div>
            <div className="text-[11px] font-mono text-zinc-600 pl-4">
              status: <span className="text-red-400">wrong_item</span> · item: <span className="text-zinc-400">AirPods Pro</span> · $249.99
            </div>
          </div>

          {/* Step 3 */}
          <div className="step-4">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-1">
              <span className="text-emerald-400">▸ refund_trigger</span>
              <span className="text-zinc-700 text-[10px]">(ORD-003)</span>
              <div className="flex-1 h-px bg-zinc-800 relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-emerald-500/60 progress-3" />
              </div>
              <span className="text-emerald-300 text-[10px]">✓</span>
            </div>
            <div className="text-[11px] font-mono text-zinc-600 pl-4">
              refund_initiated · <span className="text-emerald-400">$249.99</span> · 5–7 business days
            </div>
          </div>

          {/* Step 4 */}
          <div className="step-5">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-1">
              <span className="text-amber-400">▸ ticket_create</span>
              <span className="text-zinc-700 text-[10px]">(priority:high)</span>
              <div className="flex-1 h-px bg-zinc-800 relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-amber-500/60 progress-4" />
              </div>
              <span className="text-amber-300 text-[10px]">✓</span>
            </div>
            <div className="text-[11px] font-mono text-zinc-600 pl-4">
              ticket: <span className="text-amber-400">TKT-389B3AB7</span> · ETA: 2–4 hours
            </div>
          </div>
        </div>

        {/* Agent response */}
        <div className="px-4 pt-3 pb-4 step-response">
          <div className="border-t border-white/5 pt-3">
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 bg-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[9px] text-white font-bold">A</span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Hi Priya, I&apos;ve initiated a refund of{" "}
                <span className="text-emerald-400 font-mono">$249.99</span> and created ticket{" "}
                <span className="text-amber-400 font-mono">TKT-389B3AB7</span>. A specialist
                will follow up within 2–4 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Footer bar */}
        <div className="px-4 py-2 border-t border-white/5 bg-white/[0.015] flex items-center gap-3">
          <span className="text-[10px] font-mono text-zinc-600">groq llama-3.3-70b</span>
          <span className="text-zinc-800">·</span>
          <span className="text-[10px] font-mono text-zinc-600">langgraph</span>
          <span className="text-zinc-800">·</span>
          <span className="text-[10px] font-mono text-zinc-600">chromadb</span>
          <span className="ml-auto text-[10px] font-mono text-zinc-600">5 steps · 1.2s</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Hero ───────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-14 overflow-hidden">
      {/* dot grid */}
      <div className="absolute inset-0 bg-dot-grid opacity-100 pointer-events-none" />
      {/* radial fade edges */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, transparent 40%, #07070a 100%)" }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 80% at 100% 50%, rgba(99,102,241,0.03) 0%, transparent 60%)" }} />

      <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-16 items-center">
          {/* Left: text */}
          <div className="max-w-2xl">
            <div className="hero-1 inline-flex items-center gap-2 px-3 py-1 border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-mono mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              LangGraph · Groq · ChromaDB · RAG
            </div>

            <h1 className="hero-2 font-display text-5xl sm:text-6xl lg:text-7xl text-white leading-[0.95] tracking-tight mb-6">
              Customer support
              <br />
              <em className="text-indigo-400 not-italic">that thinks</em>
              <br />
              for itself.
            </h1>

            <p className="hero-3 text-zinc-400 text-lg leading-relaxed mb-10 max-w-lg">
              A multi-step AI agent that looks up orders, initiates refunds, creates tickets,
              and answers policy questions — all in one turn. Every decision fully auditable.
            </p>

            <div className="hero-4 flex items-center gap-4 flex-wrap">
              <Link
                href="/app"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors text-sm group"
              >
                Open the demo
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <a
                href="https://github.com/RAK2315/agentsupport-FLowZIntThon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white font-medium transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                View source
              </a>
            </div>
          </div>

          {/* Right: terminal */}
          <AgentTerminal />
        </div>
      </div>
    </section>
  );
}

/* ─── Stats bar ──────────────────────────────────────────── */
function StatsBar() {
  const stats = [
    { value: "4", label: "AI tools" },
    { value: "8", label: "max steps" },
    { value: "RAG", label: "policy lookup" },
    { value: "100%", label: "auditable" },
    { value: "0", label: "paid infra" },
  ];
  return (
    <div className="border-y border-white/5 bg-white/[0.015]">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {stats.map((s, i) => (
            <div key={i} className="flex items-baseline gap-2">
              <span className="font-mono text-xl font-medium stat-shimmer">{s.value}</span>
              <span className="text-zinc-600 text-sm">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Features ───────────────────────────────────────────── */
function Features() {
  const features = [
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: "text-violet-400 bg-violet-500/10 border-violet-500/20",
      title: "Multi-step reasoning",
      body: "LangGraph orchestrates up to 8 sequential tool calls per turn. The agent plans the full action sequence before executing — order lookup, refund, ticket — in one shot.",
      tag: "LangGraph",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      title: "Full audit trail",
      body: "Every decision, tool call, input, output, and timestamp is logged per session. Replay any conversation step-by-step to understand exactly what the agent did and why.",
      tag: "Transparency",
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      title: "RAG policy lookup",
      body: "Return policies, warranty terms, escalation procedures — all embedded into ChromaDB at startup with sentence-transformers. The agent retrieves the right chunk semantically, not by keyword.",
      tag: "ChromaDB · all-MiniLM-L6",
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <p className="text-indigo-400 font-mono text-xs tracking-widest uppercase mb-3">How it works</p>
          <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight">
            Not a chatbot.
            <br />
            <em className="text-zinc-400">An agent.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className={`card-${i + 1} border border-white/6 bg-[#0f0f14] p-6 hover:border-white/10 transition-colors group`}
            >
              <div className={`w-9 h-9 border flex items-center justify-center mb-5 ${f.color}`}>
                {f.icon}
              </div>
              <h3 className="text-white font-semibold text-base mb-3">{f.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-5">{f.body}</p>
              <span className="inline-block text-[10px] font-mono text-zinc-600 border border-white/5 px-2 py-0.5">
                {f.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Audit showcase ─────────────────────────────────────── */
function AuditShowcase() {
  const steps = [
    { num: "01", node: "intent_router", tool: null, color: "bg-violet-900/40 text-violet-300 border-violet-700/40", reasoning: "Classified as wrong_item · planned 3 tools" },
    { num: "02", node: "audit_logger", tool: "order_lookup()", color: "bg-zinc-800/60 text-zinc-400 border-zinc-700/40", reasoning: "order_id: ORD-003 → status: wrong_item · $249.99" },
    { num: "03", node: "audit_logger", tool: "refund_trigger()", color: "bg-zinc-800/60 text-zinc-400 border-zinc-700/40", reasoning: "refund_initiated · timeline: 5–7 business days" },
    { num: "04", node: "audit_logger", tool: "ticket_create()", color: "bg-zinc-800/60 text-zinc-400 border-zinc-700/40", reasoning: "TKT-389B3AB7 · priority: high · ETA: 2–4 hours" },
    { num: "05", node: "responder", tool: null, color: "bg-emerald-900/40 text-emerald-300 border-emerald-700/40", reasoning: "Generated customer-facing resolution message" },
  ];

  return (
    <section className="py-24 bg-[#0a0a0f] border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-16 items-start">
          {/* Left: copy */}
          <div className="lg:sticky lg:top-28">
            <p className="text-amber-400 font-mono text-xs tracking-widest uppercase mb-3">Full transparency</p>
            <h2 className="font-display text-4xl lg:text-5xl text-white leading-tight mb-6">
              Watch the agent
              <br />
              <em className="text-zinc-400">think out loud.</em>
            </h2>
            <p className="text-zinc-500 text-base leading-relaxed mb-8">
              Every session generates a timestamped audit trail. Click any step to inspect
              the exact tool input, tool output, and reasoning. Hit Replay to watch it
              animate step-by-step.
            </p>
            <Link
              href="/app"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 transition-colors text-sm font-medium"
            >
              Try it live →
            </Link>
          </div>

          {/* Right: step cards */}
          <div className="space-y-2">
            {steps.map((s) => (
              <div
                key={s.num}
                className="border border-white/6 bg-[#0c0c12] px-4 py-3 flex items-center gap-3 group hover:border-white/10 transition-colors"
              >
                <span className="font-mono text-zinc-600 text-xs w-7 shrink-0">#{s.num}</span>
                <span className={`text-xs font-mono px-2 py-0.5 border shrink-0 ${s.color}`}>
                  {s.node}
                </span>
                {s.tool && (
                  <span className="text-xs font-mono text-zinc-500 bg-zinc-800/60 border border-zinc-700/40 px-2 py-0.5 shrink-0">
                    {s.tool}
                  </span>
                )}
                <span className="text-xs text-zinc-600 truncate ml-auto hidden sm:block">
                  {s.reasoning}
                </span>
                <svg className="w-3.5 h-3.5 text-zinc-700 group-hover:text-zinc-500 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            ))}
            {/* Replay pill */}
            <div className="pt-2 flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                Replay Audit
              </div>
              <span className="text-zinc-700 text-xs font-mono">800ms per step · live in /audit</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Tech stack ─────────────────────────────────────────── */
function TechStack() {
  const items = [
    { name: "Groq", sub: "llama-3.3-70b-versatile", color: "border-orange-500/20 bg-orange-500/5" },
    { name: "LangGraph", sub: "state graph · 5 nodes", color: "border-violet-500/20 bg-violet-500/5" },
    { name: "FastAPI", sub: "async · CORS · lifespan", color: "border-teal-500/20 bg-teal-500/5" },
    { name: "ChromaDB", sub: "persistent · CPU embed", color: "border-blue-500/20 bg-blue-500/5" },
    { name: "Next.js 14", sub: "app router · TypeScript", color: "border-white/10 bg-white/[0.02]" },
    { name: "Tailwind CSS", sub: "dark theme · animations", color: "border-sky-500/20 bg-sky-500/5" },
  ];
  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-zinc-600 font-mono text-xs tracking-widest uppercase mb-8 text-center">Built with</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {items.map((t, i) => (
            <div key={i} className={`border px-3 py-4 text-center ${t.color}`}>
              <div className="text-white text-sm font-semibold mb-1">{t.name}</div>
              <div className="text-zinc-600 text-[10px] font-mono leading-tight">{t.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA ────────────────────────────────────────────────── */
function CTA() {
  return (
    <section className="py-24 border-t border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-60 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(99,102,241,0.06) 0%, transparent 70%)" }} />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-5xl lg:text-6xl text-white leading-tight mb-6">
          See it handle
          <br />
          <em className="text-indigo-400">your hardest query.</em>
        </h2>
        <p className="text-zinc-500 text-lg mb-10 max-w-xl mx-auto">
          Try the wrong-item demo, ask about your return policy, or request a refund.
          The full audit trail is one click away.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href="/app"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-base transition-colors group"
          >
            Open AgentSupport
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <p className="text-zinc-700 text-xs font-mono mt-6">
          groq · langgraph · chromadb · no paid infra
        </p>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-white/5 py-6">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-indigo-600 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
            </svg>
          </div>
          <span className="text-zinc-600 text-xs font-mono">AgentSupport</span>
        </div>
        <div className="flex items-center gap-5">
          <Link href="/app" className="text-zinc-600 hover:text-zinc-400 text-xs font-mono transition-colors">chat</Link>
          <a
            href="https://github.com/RAK2315/agentsupport-FLowZIntThon"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-400 text-xs font-mono transition-colors"
          >
            github
          </a>
          <span className="text-zinc-700 text-xs font-mono">MIT license</span>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page ───────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#07070a] text-white">
      <Nav />
      <Hero />
      <StatsBar />
      <Features />
      <AuditShowcase />
      <TechStack />
      <CTA />
      <Footer />
    </div>
  );
}
