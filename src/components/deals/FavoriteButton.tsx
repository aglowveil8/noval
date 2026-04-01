"use client";

import { toggleFavorite } from "@/app/actions/favorites";
import { useSession } from "next-auth/react";
import { useTransition } from "react";

export function FavoriteButton({
  dealId,
  isFavorited,
}: {
  dealId: number;
  isFavorited: boolean;
}) {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (!session?.user) return;
        startTransition(() => {
          toggleFavorite(dealId);
        });
      }}
      disabled={isPending || !session?.user}
      className={`p-1.5 rounded-lg transition-colors cursor-pointer disabled:cursor-default ${
        isFavorited
          ? "text-red-400 bg-red-400/10"
          : "text-zinc-600 hover:text-zinc-300 hover:bg-zinc-800"
      }`}
      title={session?.user ? (isFavorited ? "Remove from favorites" : "Save to favorites") : "Sign in to save"}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={isFavorited ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  );
}
