"use client";

import { useCallback, useEffect, useState } from "react";
import StepReplay, { AuditStep } from "./StepReplay";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

function NodeBadge({ name }: { name: string }) {
  const colors: Record<string, string> = {
    intent_router: "bg-violet-900 text-violet-300 border-violet-700",
    tool_executor: "bg-blue-900 text-blue-300 border-blue-700",
    action_validator: "bg-yellow-900 text-yellow-300 border-yellow-700",
    audit_logger: "bg-zinc-800 text-zinc-400 border-zinc-600",
    responder: "bg-emerald-900 text-emerald-300 border-emerald-700",
  };
  const cls = colors[name] ?? "bg-zinc-800 text-zinc-300 border-zinc-600";
  return (
    <span className={`text-xs font-mono px-2 py-0.5 border ${cls}`}>
      {name}
    </span>
  );
}

function StepCard({
  step,
  isHighlighted,
}: {
  step: AuditStep;
  isHighlighted: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`border transition-all duration-300 ${
        isHighlighted
          ? "border-indigo-500 shadow-lg shadow-indigo-900/30"
          : "border-zinc-800"
      } bg-zinc-900`}
    >
      <button
        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-zinc-800 transition-colors"
        onClick={() => setExpanded((v) => !v)}
      >
        <span className="text-zinc-500 font-mono text-sm w-8">
          #{step.step_num.toString().padStart(2, "0")}
        </span>
        <NodeBadge name={step.node_name} />
        {step.tool_called && (
          <span className="text-zinc-300 font-mono text-xs bg-zinc-800 border border-zinc-700 px-2 py-0.5">
            {step.tool_called}()
          </span>
        )}
        <span className="text-zinc-500 text-xs ml-auto shrink-0">
          {new Date(step.timestamp).toLocaleTimeString()}
        </span>
        <svg
          className={`w-4 h-4 text-zinc-500 shrink-0 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-3 border-t border-zinc-800">
          {step.reasoning && (
            <div>
              <p className="text-zinc-500 text-xs font-mono mb-1">REASONING</p>
              <p className="text-zinc-300 text-sm">{step.reasoning}</p>
            </div>
          )}
          {step.tool_input !== null && (
            <div>
              <p className="text-zinc-500 text-xs font-mono mb-1">TOOL INPUT</p>
              <pre className="text-xs font-mono text-green-400 bg-zinc-950 border border-zinc-800 p-3 overflow-auto">
                {JSON.stringify(step.tool_input, null, 2)}
              </pre>
            </div>
          )}
          {step.tool_output !== null && (
            <div>
              <p className="text-zinc-500 text-xs font-mono mb-1">TOOL OUTPUT</p>
              <pre className="text-xs font-mono text-blue-300 bg-zinc-950 border border-zinc-800 p-3 overflow-auto">
                {JSON.stringify(step.tool_output, null, 2)}
              </pre>
            </div>
          )}
          <div>
            <p className="text-zinc-500 text-xs font-mono mb-1">TIMESTAMP</p>
            <p className="text-zinc-400 text-xs font-mono">{step.timestamp}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AuditPanel({ sessionId }: { sessionId: string }) {
  const [steps, setSteps] = useState<AuditStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [highlightedStep, setHighlightedStep] = useState<number | null>(null);

  useEffect(() => {
    if (!sessionId) return;
    setLoading(true);
    fetch(`${API_URL}/audit/${sessionId}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: AuditStep[]) => {
        setSteps(data);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, [sessionId]);

  const handleHighlight = useCallback((stepNum: number | null) => {
    setHighlightedStep(stepNum);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-red-800 bg-red-950/30 p-4 text-red-400 text-sm font-mono">
        Error loading audit trail: {error}
      </div>
    );
  }

  if (steps.length === 0) {
    return (
      <div className="text-zinc-500 text-sm text-center py-12 border border-zinc-800 bg-zinc-900">
        No audit steps found for session{" "}
        <span className="font-mono text-zinc-400">{sessionId}</span>
      </div>
    );
  }

  return (
    <div>
      <StepReplay
        steps={steps}
        highlightedStep={highlightedStep}
        onHighlight={handleHighlight}
      />
      <div className="space-y-2">
        {steps.map((step) => (
          <StepCard
            key={step.step_num}
            step={step}
            isHighlighted={highlightedStep === step.step_num}
          />
        ))}
      </div>
    </div>
  );
}
