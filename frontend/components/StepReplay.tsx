"use client";

import { useEffect, useRef, useState } from "react";

export interface AuditStep {
  step_num: number;
  node_name: string;
  tool_called: string | null;
  tool_input: Record<string, unknown> | null;
  tool_output: unknown;
  reasoning: string | null;
  timestamp: string;
}

interface StepReplayProps {
  steps: AuditStep[];
  highlightedStep: number | null;
  onHighlight: (stepNum: number | null) => void;
}

export default function StepReplay({ steps, highlightedStep, onHighlight }: StepReplayProps) {
  const [isReplaying, setIsReplaying] = useState(false);
  const [replayIndex, setReplayIndex] = useState(-1);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startReplay = () => {
    if (steps.length === 0) return;
    setIsReplaying(true);
    setReplayIndex(0);
    onHighlight(steps[0].step_num);
  };

  const stopReplay = () => {
    setIsReplaying(false);
    setReplayIndex(-1);
    onHighlight(null);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    if (!isReplaying || replayIndex < 0) return;

    if (replayIndex >= steps.length) {
      setIsReplaying(false);
      setReplayIndex(-1);
      onHighlight(null);
      return;
    }

    onHighlight(steps[replayIndex].step_num);

    timeoutRef.current = setTimeout(() => {
      setReplayIndex((prev) => prev + 1);
    }, 800);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isReplaying, replayIndex, steps, onHighlight]);

  return (
    <div className="flex items-center gap-3 mb-6">
      {!isReplaying ? (
        <button
          onClick={startReplay}
          disabled={steps.length === 0}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white text-sm font-medium transition-colors"
          style={{ borderRadius: 0 }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
          </svg>
          Replay Audit
        </button>
      ) : (
        <button
          onClick={stopReplay}
          className="flex items-center gap-2 px-4 py-2 bg-zinc-700 hover:bg-zinc-600 text-white text-sm font-medium transition-colors"
          style={{ borderRadius: 0 }}
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5.75 3a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75A.75.75 0 007.25 3h-1.5zm6.5 0a.75.75 0 00-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 00.75-.75V3.75a.75.75 0 00-.75-.75h-1.5z" />
          </svg>
          Stop
        </button>
      )}
      {isReplaying && (
        <span className="text-zinc-400 text-sm">
          Step {replayIndex + 1} / {steps.length}
        </span>
      )}
    </div>
  );
}
