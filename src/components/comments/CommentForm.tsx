"use client";

import { addComment } from "@/app/actions/comments";
import { useSession } from "next-auth/react";
import { useState, useTransition } from "react";

export function CommentForm({ dealId }: { dealId: number }) {
  const { data: session } = useSession();
  const [body, setBody] = useState("");
  const [isPending, startTransition] = useTransition();

  if (!session?.user) {
    return (
      <p className="text-sm text-zinc-500">Sign in to leave a comment</p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!body.trim()) return;
        startTransition(async () => {
          await addComment(dealId, body);
          setBody("");
        });
      }}
      className="flex gap-2"
    >
      <input
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Share a coupon code, confirm the deal, or add a tip..."
        className="flex-1 h-10 rounded-lg border border-zinc-800 bg-zinc-900 px-4 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
      />
      <button
        type="submit"
        disabled={isPending || !body.trim()}
        className="px-4 h-10 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-400 disabled:opacity-50 transition-colors cursor-pointer disabled:cursor-default"
      >
        Post
      </button>
    </form>
  );
}
