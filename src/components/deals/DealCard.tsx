"use client";

import { formatPrice, timeAgo } from "@/lib/utils";
import { VoteButtons } from "./VoteButtons";
import { FavoriteButton } from "./FavoriteButton";
import type { Deal } from "@/lib/schema";

export function DealCard({
  deal,
  index,
  score,
  userVote,
  isFavorited,
}: {
  deal: Deal;
  index: number;
  score: number;
  userVote: number | null;
  isFavorited: boolean;
}) {
  return (
    <div
      className="animate-fade-up flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 hover:border-zinc-600 hover:bg-zinc-900 transition-all"
      style={{ animationDelay: `${index * 30}ms`, opacity: 0 }}
    >
      <VoteButtons dealId={deal.id} score={score} userVote={userVote} />
      <a
        href={deal.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex-1 flex flex-col gap-4 min-w-0"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {deal.expired && (
                <span className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-red-400 bg-red-400/10 border border-red-400/20 px-2 py-0.5 rounded-full">
                  EXPIRED
                </span>
              )}
              {deal.hot && !deal.expired && (
                <span className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-orange-400 bg-orange-400/10 border border-orange-400/20 px-2 py-0.5 rounded-full">
                  HOT
                </span>
              )}
              <span className="text-xs text-zinc-500 font-mono">
                {timeAgo(deal.postedAt.toISOString())}
              </span>
            </div>
            <h3
              className={`text-sm font-semibold leading-snug ${
                deal.expired
                  ? "text-zinc-500"
                  : "text-zinc-100 group-hover:text-white"
              }`}
            >
              {deal.title}
            </h3>
            <p className="text-xs text-zinc-500 mt-1 line-clamp-1">
              {deal.description}
            </p>
          </div>
          <div className="shrink-0 flex flex-col items-end gap-2">
            <div
              className={`inline-block text-xs font-bold px-2 py-1 rounded-lg ${
                deal.expired
                  ? "bg-zinc-800 border border-zinc-700 text-zinc-500"
                  : "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
              }`}
            >
              -{deal.discount}%
            </div>
            <FavoriteButton dealId={deal.id} isFavorited={isFavorited} />
          </div>
        </div>
        <div className="flex items-end justify-between">
          <div className="flex items-baseline gap-2">
            <span
              className={`text-xl font-bold font-mono ${
                deal.expired ? "text-zinc-500" : "text-white"
              }`}
            >
              {formatPrice(Number(deal.dealPrice))}
            </span>
            <span className="text-sm text-zinc-600 line-through font-mono">
              {formatPrice(Number(deal.originalPrice))}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
              {deal.category}
            </span>
            <span className="text-xs font-medium text-zinc-400">
              {deal.store}
            </span>
          </div>
        </div>
      </a>
    </div>
  );
}
