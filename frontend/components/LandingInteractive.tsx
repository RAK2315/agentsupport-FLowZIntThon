"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

/* ─── Nav with scroll-aware state ───────────────────────────── */
export function NavClient() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        borderBottom: scrolled
          ? "1px solid rgba(255,255,255,0.09)"
          : "1px solid rgba(255,255,255,0.05)",
        background: scrolled
          ? "rgba(7,7,10,0.97)"
          : "rgba(7,7,10,0.80)",
        backdropFilter: "blur(18px)",
        transition: "background 300ms cubic-bezier(0.16,1,0.3,1), border-color 300ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
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
            className="text-zinc-500 hover:text-zinc-300 text-sm flex items-center gap-1.5"
            style={{ transition: "color 200ms cubic-bezier(0.16,1,0.3,1)" }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
          <Link
            href="/app"
            className="flex items-center gap-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium btn-press"
            style={{ transition: "background-color 150ms cubic-bezier(0.16,1,0.3,1)" }}
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

/* ─── Terminal visual (stateless, key-able) ──────────────────── */
function TerminalInner() {
  return (
    <div className="relative border border-white/10 bg-[#0c0c12] overflow-hidden">
      {/* scanline sweep — runs after animations settle */}
      <div className="terminal-scanline pointer-events-none" />

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
            refund_initiated · <span className="text-emerald-400">$249.99</span> · 5-7 business days
          </div>
        </div>

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
            ticket: <span className="text-amber-400">TKT-389B3AB7</span> · ETA: 2-4 hours
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
              will follow up within 2-4 hours.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-white/5 bg-white/[0.015] flex items-center gap-3">
        <span className="text-[10px] font-mono text-zinc-600">groq llama-3.3-70b</span>
        <span className="text-zinc-800">·</span>
        <span className="text-[10px] font-mono text-zinc-600">langgraph</span>
        <span className="text-zinc-800">·</span>
        <span className="text-[10px] font-mono text-zinc-600">chromadb</span>
        <span className="ml-auto text-[10px] font-mono text-zinc-600">5 steps · 1.2s</span>
      </div>
    </div>
  );
}

/* ─── Terminal with loop + glow wrapper ─────────────────────── */
export function TerminalClient() {
  const [loopKey, setLoopKey] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Play time: last animation ends at ~5.6s. Hold 5.4s more. Total: ~11s.
    const CYCLE = 11000;
    const FADE = 350;

    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setLoopKey((k) => k + 1);
        setVisible(true);
      }, FADE);
    }, CYCLE);

    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative w-full max-w-[480px] animate-float"
      style={{ animationDelay: "0.3s", animationFillMode: "both" }}
    >
      {/* Glow */}
      <div className="absolute -inset-px bg-indigo-600/20 blur-xl pointer-events-none" />
      <div
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity ${FADE_MS}ms cubic-bezier(0.16,1,0.3,1)`,
        }}
      >
        <TerminalInner key={loopKey} />
      </div>
    </div>
  );
}
const FADE_MS = 350;

/* ─── Scroll reveal wrapper ──────────────────────────────────── */
export function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const timer = setTimeout(
            () => el.classList.add("reveal-visible"),
            delay
          );
          observer.unobserve(el);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
