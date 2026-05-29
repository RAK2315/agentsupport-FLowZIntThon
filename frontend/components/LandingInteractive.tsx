"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ─── Nav ─────────────────────────────────────────────────── */
export function NavClient() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
        background: scrolled ? "rgba(6,6,9,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "background 350ms cubic-bezier(0.16,1,0.3,1), border-color 350ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
        <span className="font-mono text-sm font-medium" style={{ color: "rgba(255,255,255,0.90)" }}>
          AgentSupport
        </span>
        <div className="flex items-center gap-8">
          <a
            href="https://github.com/RAK2315/agentsupport-FLowZIntThon"
            target="_blank" rel="noopener noreferrer"
            className="font-mono text-xs btn-press"
            style={{ color: "rgba(255,255,255,0.40)", transition: "color 180ms" }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.40)")}
          >
            GitHub
          </a>
          <Link
            href="/app"
            className="font-mono text-xs px-5 py-2.5 btn-press"
            style={{
              background: "rgba(255,255,255,0.90)",
              color: "#06060a",
              fontWeight: 600,
              transition: "background 150ms cubic-bezier(0.16,1,0.3,1)",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.90)")}
          >
            Open Demo →
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ─── Terminal visual — exact Image #3 appearance ────────── */
function TerminalInner() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: "#0c0c12",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      <div className="terminal-scanline pointer-events-none" />

      {/* Titlebar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.02)" }}
      >
        <div className="w-3 h-3 rounded-full" style={{ background: "rgba(255,95,86,0.85)" }} />
        <div className="w-3 h-3 rounded-full" style={{ background: "rgba(255,189,46,0.85)" }} />
        <div className="w-3 h-3 rounded-full" style={{ background: "rgba(39,201,63,0.85)" }} />
        <span className="ml-3 font-mono text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>agentsupport · live session</span>
        <span className="ml-auto flex items-center gap-1.5 font-mono text-xs" style={{ color: "#10b981" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-ring inline-block" />
          online
        </span>
      </div>

      {/* User message */}
      <div className="px-5 pt-4 pb-3 step-1">
        <div className="flex items-start gap-3">
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-mono font-bold"
            style={{ background: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.50)", fontSize: "9px" }}
          >U</div>
          <div
            className="px-4 py-2.5 font-mono text-sm"
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.90)",
              letterSpacing: "0.01em",
            }}
          >
            I received the wrong item for order ORD-003
          </div>
        </div>
      </div>

      {/* Agent steps */}
      <div className="px-5 pb-2 space-y-3.5">
        {[
          { cls:"step-2", pcls:"progress-1", color:"#8b5cf6", bg:"bg-violet-500/50", label:"intent_router", args:null,          sub:<>intent: <span style={{color:"#f59e0b"}}>wrong_item</span> · tools planned: <span style={{color:"rgba(255,255,255,0.60)"}}>3</span></> },
          { cls:"step-3", pcls:"progress-2", color:"#60a5fa", bg:"bg-blue-500/50",   label:"order_lookup",  args:"(ORD-003)", sub:<>status: <span style={{color:"#ef4444"}}>wrong_item</span> · item: <span style={{color:"rgba(255,255,255,0.60)"}}>AirPods Pro</span> · $249.99</> },
          { cls:"step-4", pcls:"progress-3", color:"#10b981", bg:"bg-emerald-500/50",label:"refund_trigger", args:"(ORD-003)", sub:<>refund_initiated · <span style={{color:"#10b981"}}>$249.99</span> · 5-7 business days</> },
          { cls:"step-5", pcls:"progress-4", color:"#f59e0b", bg:"bg-amber-500/50",  label:"ticket_create",  args:"(priority:high)", sub:<>ticket: <span style={{color:"#f59e0b"}}>TKT-389B3AB7</span> · ETA: 2-4 hours</> },
        ].map(s => (
          <div key={s.label} className={s.cls}>
            <div className="flex items-center gap-2 font-mono text-xs mb-1" style={{ color: "rgba(255,255,255,0.35)" }}>
              <span style={{ color: s.color }}>▸ {s.label}</span>
              {s.args && <span style={{ color: "rgba(255,255,255,0.20)", fontSize: "10px" }}>{s.args}</span>}
              <div className="flex-1 relative overflow-hidden" style={{ height: "1px", background: "rgba(255,255,255,0.08)" }}>
                <div className={`absolute inset-y-0 left-0 ${s.bg} ${s.pcls}`} style={{ height: "100%" }} />
              </div>
              <span style={{ color: s.color, fontSize: "10px" }}>✓</span>
            </div>
            <div className="font-mono pl-4" style={{ fontSize: "11px", color: "rgba(255,255,255,0.30)" }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Agent response */}
      <div className="px-5 pt-3 pb-5 step-response">
        <div className="pt-3 flex items-start gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div
            className="w-6 h-6 flex items-center justify-center shrink-0 mt-0.5 font-mono font-bold"
            style={{ background: "#4f46e5", color: "white", fontSize: "9px" }}
          >A</div>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.85)" }}>
            Hi Priya, I&apos;ve initiated a refund of{" "}
            <span className="font-mono" style={{ color: "#10b981" }}>$249.99</span> and created ticket{" "}
            <span className="font-mono" style={{ color: "#f59e0b" }}>TKT-389B3AB7</span>. A specialist will follow up within 2-4 hours.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-2.5 flex items-center gap-3" style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(255,255,255,0.01)" }}>
        <span className="font-mono" style={{ fontSize: "10px", color: "rgba(255,255,255,0.22)" }}>groq llama-3.3-70b</span>
        <span style={{ color: "rgba(255,255,255,0.10)" }}>·</span>
        <span className="font-mono" style={{ fontSize: "10px", color: "rgba(255,255,255,0.22)" }}>langgraph</span>
        <span style={{ color: "rgba(255,255,255,0.10)" }}>·</span>
        <span className="font-mono" style={{ fontSize: "10px", color: "rgba(255,255,255,0.22)" }}>chromadb</span>
        <span className="ml-auto font-mono" style={{ fontSize: "10px", color: "rgba(255,255,255,0.22)" }}>5 steps · 1.2s</span>
      </div>
    </div>
  );
}

/* ─── Terminal client: loop + float ──────────────────────── */
export function TerminalClient() {
  const [loopKey, setLoopKey] = useState(0);
  const [visible, setVisible] = useState(true);
  const FADE = 300;

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setLoopKey(k => k + 1); setVisible(true); }, FADE);
    }, 11500);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="animate-float w-full"
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity ${FADE}ms cubic-bezier(0.16,1,0.3,1)`,
        maxWidth: 520,
        margin: "0 auto",
      }}
    >
      <TerminalInner key={loopKey} />
    </div>
  );
}

/* ─── Scroll reveal ──────────────────────────────────────── */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("visible"), delay);
          obs.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -24px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}
