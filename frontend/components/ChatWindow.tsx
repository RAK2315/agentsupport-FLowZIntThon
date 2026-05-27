"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

interface Message {
  role: "user" | "agent";
  content: string;
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 bg-indigo-600 flex items-center justify-center shrink-0 text-white text-xs font-bold">
        A
      </div>
      <div className="bg-zinc-900 border border-zinc-800 px-4 py-3 flex gap-1.5 items-center">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`w-7 h-7 flex items-center justify-center shrink-0 text-xs font-bold ${
          isUser
            ? "bg-zinc-700 text-zinc-200"
            : "bg-indigo-600 text-white"
        }`}
      >
        {isUser ? "U" : "A"}
      </div>
      <div
        className={`max-w-[75%] px-4 py-3 text-sm leading-relaxed ${
          isUser
            ? "bg-indigo-600 text-white"
            : "bg-zinc-900 border border-zinc-800 text-zinc-200"
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
}

export default function ChatWindow() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string>("");
  useEffect(() => { setSessionId(uuidv4()); }, []);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "agent",
      content:
        "Hello! I'm your AgentSupport assistant. How can I help you today? You can ask about your order status, request a refund, or ask about our return policy.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: text }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "agent", content: data.response },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "agent",
          content: "Sorry, I encountered an error. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between bg-zinc-950">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
          </div>
          <div>
            <h1 className="text-white font-semibold text-sm">AgentSupport</h1>
            <p className="text-zinc-500 text-xs">AI Customer Support</p>
          </div>
        </div>
        <button
          onClick={() => router.push(`/audit?session=${sessionId}`)}
          className="text-xs text-zinc-400 hover:text-indigo-400 border border-zinc-700 hover:border-indigo-600 px-3 py-1.5 transition-colors font-mono"
        >
          View Audit Trail →
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.map((msg, i) => (
          <MessageBubble key={i} msg={msg} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Session ID */}
      <div className="px-6 py-1 border-t border-zinc-900">
        <p className="text-zinc-700 text-xs font-mono">
          session: {sessionId}
        </p>
      </div>

      {/* Input */}
      <div className="border-t border-zinc-800 px-6 py-4 bg-zinc-950">
        <div className="flex gap-3">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Type your message... (Enter to send)"
            rows={1}
            disabled={loading}
            className="flex-1 bg-zinc-900 border border-zinc-700 focus:border-indigo-500 focus:outline-none text-zinc-200 placeholder-zinc-600 px-4 py-3 text-sm resize-none transition-colors disabled:opacity-50"
            style={{ borderRadius: 0 }}
          />
          <button
            onClick={send}
            disabled={loading || !input.trim()}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-medium text-sm transition-colors shrink-0"
            style={{ borderRadius: 0 }}
          >
            {loading ? (
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
