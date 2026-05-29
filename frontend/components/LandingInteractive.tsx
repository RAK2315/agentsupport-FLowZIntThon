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
        background: scrolled ? "rgba(8,8,11,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "background 350ms cubic-bezier(0.16,1,0.3,1), border-color 350ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm font-medium text-white tracking-tight">AgentSupport</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 bg-violet-500/15 text-violet-400 border border-violet-500/25">beta</span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/RAK2315/agentsupport-FLowZIntThon"
            target="_blank" rel="noopener noreferrer"
            className="text-xs font-mono text-[#52525e] hover:text-[#ededf0] btn-press"
            style={{ transition: "color 180ms cubic-bezier(0.16,1,0.3,1)" }}
          >
            GitHub
          </a>
          <Link
            href="/app"
            className="text-xs font-mono px-4 py-2 border border-[rgba(255,255,255,0.15)] text-[#ededf0] hover:border-[rgba(255,255,255,0.35)] hover:bg-white/5 btn-press"
            style={{ transition: "border-color 180ms cubic-bezier(0.16,1,0.3,1), background 180ms cubic-bezier(0.16,1,0.3,1)" }}
          >
            Open demo →
          </Link>
        </div>
      </div>
    </nav>
  );
}

/* ─── Terminal visual (stateless) ─────────────────────────── */
function TerminalInner() {
  return (
    <div className="relative border border-white/10 bg-[#0c0c12] overflow-hidden shadow-2xl shadow-black/60">
      <div className="terminal-scanline pointer-events-none" />
      {/* Titlebar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
        <span className="ml-2 text-xs font-mono text-[#52525e]">agentsupport · live session</span>
        <span className="ml-auto flex items-center gap-1.5 text-xs font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-ring inline-block" />
          online
        </span>
      </div>
      {/* User msg */}
      <div className="px-4 pt-4 pb-3 step-1">
        <div className="flex items-start gap-2.5">
          <div className="w-5 h-5 rounded-full bg-zinc-700 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-[9px] text-zinc-300 font-mono">U</span>
          </div>
          <div className="bg-violet-600/20 border border-violet-500/25 px-3 py-2 text-sm text-violet-100 font-mono">
            I received the wrong item for order ORD-003
          </div>
        </div>
      </div>
      {/* Steps */}
      <div className="px-4 pb-1 space-y-3">
        {[
          { cls: "step-2", pcls: "progress-1", color: "text-violet-400", bg: "bg-violet-500/60", label: "intent_router", args: null, sub: <>intent: <span className="text-amber-400">wrong_item</span> · tools planned: <span className="text-[#ededf0]/70">3</span></> },
          { cls: "step-3", pcls: "progress-2", color: "text-blue-400", bg: "bg-blue-500/60", label: "order_lookup", args: "(ORD-003)", sub: <>status: <span className="text-red-400">wrong_item</span> · item: <span className="text-[#ededf0]/70">AirPods Pro</span> · $249.99</> },
          { cls: "step-4", pcls: "progress-3", color: "text-emerald-400", bg: "bg-emerald-500/60", label: "refund_trigger", args: "(ORD-003)", sub: <>refund_initiated · <span className="text-emerald-400">$249.99</span> · 5-7 business days</> },
          { cls: "step-5", pcls: "progress-4", color: "text-amber-400", bg: "bg-amber-500/60", label: "ticket_create", args: "(priority:high)", sub: <>ticket: <span className="text-amber-400">TKT-389B3AB7</span> · ETA: 2-4 hours</> },
        ].map((s) => (
          <div key={s.label} className={s.cls}>
            <div className="flex items-center gap-2 text-xs font-mono text-[#52525e] mb-1">
              <span className={s.color}>▸ {s.label}</span>
              {s.args && <span className="text-[#3a3a4e] text-[10px]">{s.args}</span>}
              <div className="flex-1 h-px bg-white/5 relative overflow-hidden">
                <div className={`absolute inset-y-0 left-0 ${s.bg} ${s.pcls}`} />
              </div>
              <span className={`${s.color} text-[10px]`}>✓</span>
            </div>
            <div className="text-[11px] font-mono text-[#3a3a4e] pl-4">{s.sub}</div>
          </div>
        ))}
      </div>
      {/* Response */}
      <div className="px-4 pt-3 pb-4 step-response">
        <div className="border-t border-white/5 pt-3 flex items-start gap-2.5">
          <div className="w-5 h-5 bg-violet-600 flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-[9px] text-white font-bold">A</span>
          </div>
          <p className="text-sm text-[#ededf0]/90 leading-relaxed">
            Hi Priya, I&apos;ve initiated a refund of{" "}
            <span className="text-emerald-400 font-mono">$249.99</span> and created ticket{" "}
            <span className="text-amber-400 font-mono">TKT-389B3AB7</span>. A specialist will follow up within 2-4 hours.
          </p>
        </div>
      </div>
      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-white/5 bg-white/[0.015] flex items-center gap-3">
        <span className="text-[10px] font-mono text-[#3a3a4e]">groq llama-3.3-70b</span>
        <span className="text-white/10">·</span>
        <span className="text-[10px] font-mono text-[#3a3a4e]">langgraph</span>
        <span className="text-white/10">·</span>
        <span className="text-[10px] font-mono text-[#3a3a4e]">chromadb</span>
        <span className="ml-auto text-[10px] font-mono text-[#3a3a4e]">5 steps · 1.2s</span>
      </div>
    </div>
  );
}

/* ─── Terminal with loop + float ──────────────────────────── */
export function TerminalClient() {
  const [loopKey, setLoopKey] = useState(0);
  const [visible, setVisible] = useState(true);
  const FADE = 320;

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setLoopKey(k => k + 1); setVisible(true); }, FADE);
    }, 11000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="animate-float"
      style={{ opacity: visible ? 1 : 0, transition: `opacity ${FADE}ms cubic-bezier(0.16,1,0.3,1)` }}
    >
      <TerminalInner key={loopKey} />
    </div>
  );
}

/* ─── Scroll reveal ───────────────────────────────────────── */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setTimeout(() => el.classList.add("visible"), delay);
        obs.unobserve(el);
      }
    }, { threshold: 0.1, rootMargin: "0px 0px -28px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}
