import Link from "next/link";
import { Suspense } from "react";
import AuditPanel from "../../components/AuditPanel";

function AuditPageInner({
  searchParams,
}: {
  searchParams: { session?: string };
}) {
  const sessionId = searchParams.session ?? "";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="border-b border-zinc-800 bg-zinc-950 px-6 py-4 flex items-center gap-4">
        <Link
          href="/"
          className="text-zinc-400 hover:text-indigo-400 transition-colors text-sm flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Chat
        </Link>
        <div className="w-px h-4 bg-zinc-700" />
        <div>
          <h1 className="text-white font-semibold text-sm">Audit Trail</h1>
          {sessionId && (
            <p className="text-zinc-500 text-xs font-mono">
              session: {sessionId}
            </p>
          )}
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-8">
        {!sessionId ? (
          <div className="text-zinc-500 text-sm text-center py-12 border border-zinc-800 bg-zinc-900">
            No session ID provided.{" "}
            <Link href="/" className="text-indigo-400 hover:underline">
              Start a chat
            </Link>{" "}
            first.
          </div>
        ) : (
          <AuditPanel sessionId={sessionId} />
        )}
      </div>
    </div>
  );
}

export default function AuditPage({
  searchParams,
}: {
  searchParams: { session?: string };
}) {
  return (
    <Suspense>
      <AuditPageInner searchParams={searchParams} />
    </Suspense>
  );
}
