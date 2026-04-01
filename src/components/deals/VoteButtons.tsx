"use client";

import { voteDeal } from "@/app/actions/votes";
import { useSession } from "next-auth/react";
import { useTransition } from "react";

export function VoteButtons({
  dealId,
  score,
  userVote,
}: {
  dealId: number;
  score: number;
  userVote: number | null;
}) {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();

  function handleVote(value: 1 | -1) {
    if (!session?.user) return;
    startTransition(() => {
      voteDeal(dealId, value);
    });
  }

  return (
    <div className="flex flex-col items-center gap-0.5">
      <button
        onClick={(e) => {
          e.preventDefault();
          handleVote(1);
        }}
        disabled={isPending || !session?.user}
        className={`p-1 rounded transition-colors cursor-pointer disabled:cursor-default ${
          userVote === 1
            ? "text-emerald-400"
            : "text-zinc-600 hover:text-zinc-300"
        }`}
        title={session?.user ? "Upvote" : "Sign in to vote"}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
      <span className={`text-xs font-bold font-mono ${score > 0 ? "text-emerald-400" : score < 0 ? "text-red-400" : "text-zinc-500"}`}>
        {score}
      </span>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleVote(-1);
        }}
        disabled={isPending || !session?.user}
        className={`p-1 rounded transition-colors cursor-pointer disabled:cursor-default ${
          userVote === -1
            ? "text-red-400"
            : "text-zinc-600 hover:text-zinc-300"
        }`}
        title={session?.user ? "Downvote" : "Sign in to vote"}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>
  );
}
