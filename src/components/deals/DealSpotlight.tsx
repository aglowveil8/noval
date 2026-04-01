"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { Deal } from "@/lib/schema";

export function DealSpotlight({ deal }: { deal: Deal }) {
  return (
    <Link
      href={`/deals/${deal.id}`}
      className="block rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent p-6 hover:border-emerald-500/50 transition-all"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded-full">
          DEAL OF THE DAY
        </span>
        <span className="text-xs text-zinc-500">{deal.store}</span>
      </div>
      <h3 className="text-lg font-bold text-white">{deal.title}</h3>
      <p className="text-sm text-zinc-400 mt-1">{deal.description}</p>
      <div className="flex items-baseline gap-3 mt-3">
        <span className="text-2xl font-bold text-white font-mono">
          {formatPrice(Number(deal.dealPrice))}
        </span>
        <span className="text-sm text-zinc-600 line-through font-mono">
          {formatPrice(Number(deal.originalPrice))}
        </span>
        <span className="text-sm font-bold text-emerald-400">
          Save {deal.discount}%
        </span>
      </div>
    </Link>
  );
}
