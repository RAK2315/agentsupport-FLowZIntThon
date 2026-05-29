"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

interface Message { role: "user" | "agent"; content: string; }

const SUGGESTIONS = [
  "I received the wrong item for order ORD-003",
  "What's the status of order ORD-002?",
  "What is your return policy?",
  "I want a refund for order ORD-001",
];

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3">
      <div className="w-6 h-6 bg-violet-600 flex items-center justify-center shrink-0 text-[9px] text-white font-mono font-bold">A</div>
      <div
        className="flex gap-1.5 items-center px-4 py-3 border"
        style={{ background: "#0f0f15", borderColor: "rgba(255,255,255,0.07)" }}
      >
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}

function Bubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex items-end gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`w-6 h-6 flex items-center justify-center shrink-0 text-[9px] font-mono font-bold ${
          isUser ? "bg-[#1e1e2e] text-[#52525e]" : "bg-violet-600 text-white"
        }`}
      >
        {isUser ? "U" : "A"}
      </div>
      <div
        className="max-w-[72%] px-4 py-3 text-sm leading-relaxed"
        style={
          isUser
            ? { background: "#1e1e2e", color: "#ededf0", border: "1px solid rgba(255,255,255,0.08)" }
            : { background: "#0f0f15", color: "#d4d4db", border: "1px solid rgba(255,255,255,0.06)" }
        }
      >
        {msg.content}
      </div>
    </div>
  );
}

export default function ChatWindow() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "agent", content: "Hello. I can look up orders, initiate refunds, create tickets, and answer policy questions. How can I help?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => { setSessionId(uuidv4()); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const send = async (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput("");
    setShowSuggestions(false);
    setMessages(prev => [...prev, { role: "user", content: msg }]);
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: msg }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMessages(prev => [...prev, { role: "agent", content: data.response }]);
    } catch {
      setMessages(prev => [...prev, { role: "agent", content: "Connection error. Make sure the backend is running on port 8000." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div className="flex flex-col h-screen" style={{ background: "#08080b" }}>
      {/* Header */}
      <div
        className="shrink-0 px-6 py-3.5 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "#0a0a0e" }}
      >
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-mono text-sm font-medium text-[#ededf0]">AgentSupport</span>
            <span
              className="text-[9px] font-mono px-1.5 py-0.5 border"
              style={{ background: "rgba(139,92,246,0.1)", borderColor: "rgba(139,92,246,0.25)", color: "#8b5cf6" }}
            >
              beta
            </span>
          </Link>
          <div className="w-px h-4" style={{ background: "rgba(255,255,255,0.08)" }} />
          <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#52525e]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-ring" />
            online
          </span>
        </div>

        <div className="flex items-center gap-3">
          {sessionId && (
            <span className="hidden sm:block text-[10px] font-mono text-[#2a2a35] truncate max-w-[180px]">
              {sessionId.slice(0, 8)}…
            </span>
          )}
          <button
            onClick={() => sessionId && router.push(`/audit?session=${sessionId}`)}
            className="text-[11px] font-mono px-3 py-1.5 btn-press"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#52525e",
              transition: "color 150ms, border-color 150ms",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#ededf0"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#52525e"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; }}
          >
            audit trail →
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-5">
        {messages.map((msg, i) => <Bubble key={i} msg={msg} />)}
        {loading && <TypingIndicator />}

        {/* Suggestions — shown until user sends first message */}
        {showSuggestions && messages.length === 1 && !loading && (
          <div className="pt-6">
            <p className="text-[10px] font-mono text-[#2a2a35] mb-3 uppercase tracking-widest">Try asking</p>
            <div className="flex flex-col gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-left text-xs font-mono px-3 py-2.5 btn-press"
                  style={{
                    border: "1px solid rgba(255,255,255,0.06)",
                    background: "#0f0f15",
                    color: "#52525e",
                    transition: "color 150ms, border-color 150ms, background 150ms",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "#ededf0"; el.style.borderColor = "rgba(255,255,255,0.12)"; el.style.background = "#141420";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "#52525e"; el.style.borderColor = "rgba(255,255,255,0.06)"; el.style.background = "#0f0f15";
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div
        className="shrink-0 px-6 py-4"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)", background: "#0a0a0e" }}
      >
        <div className="flex gap-2 items-end">
          <textarea
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Message AgentSupport… (Enter to send)"
            rows={1}
            disabled={loading}
            className="flex-1 text-sm font-mono resize-none focus:outline-none disabled:opacity-40"
            style={{
              background: "#0f0f15",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#ededf0",
              padding: "12px 14px",
              caretColor: "#8b5cf6",
              transition: "border-color 150ms",
            }}
            onFocus={e => (e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)")}
            onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
          />
          <button
            onClick={() => send()}
            disabled={loading || !input.trim()}
            className="shrink-0 w-10 h-10 flex items-center justify-center btn-press"
            style={{
              background: !input.trim() || loading ? "#0f0f15" : "#7c3aed",
              border: "1px solid",
              borderColor: !input.trim() || loading ? "rgba(255,255,255,0.08)" : "transparent",
              transition: "background 150ms, border-color 150ms",
            }}
          >
            {loading ? (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" style={{ color: !input.trim() ? "#2a2a35" : "white" }}>
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            )}
          </button>
        </div>
        <p className="mt-2 text-[9px] font-mono text-[#1e1e26]">
          shift+enter for new line · session: {sessionId ? sessionId.slice(0, 8) : "…"}
        </p>
      </div>
    </div>
  );
}
