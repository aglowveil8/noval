"use client";

import { useState, useMemo } from "react";
import {
  getDeals,
  categories,
  formatPrice,
  timeAgo,
  type Deal,
} from "@/lib/deals";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "discount", label: "Biggest Discount" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

function DealCard({ deal, index }: { deal: Deal; index: number }) {
  return (
    <a
      href={deal.url}
      target="_blank"
      rel="noopener noreferrer"
      className="animate-fade-up group flex flex-col gap-4 rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 hover:border-zinc-600 hover:bg-zinc-900 transition-all"
      style={{ animationDelay: `${index * 30}ms`, opacity: 0 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {deal.hot && (
              <span className="shrink-0 inline-flex items-center gap-1 text-xs font-semibold text-orange-400 bg-orange-400/10 border border-orange-400/20 px-2 py-0.5 rounded-full">
                HOT
              </span>
            )}
            <span className="text-xs text-zinc-500 font-mono">
              {timeAgo(deal.postedAt)}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-zinc-100 group-hover:text-white leading-snug">
            {deal.title}
          </h3>
          <p className="text-xs text-zinc-500 mt-1 line-clamp-1">
            {deal.description}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <div className="inline-block bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold px-2 py-1 rounded-lg">
            -{deal.discount}%
          </div>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-white font-mono">
            {formatPrice(deal.dealPrice)}
          </span>
          <span className="text-sm text-zinc-600 line-through font-mono">
            {formatPrice(deal.originalPrice)}
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
  );
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");

  const filteredDeals = useMemo(() => {
    let results = getDeals(selectedCategory, sort);
    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.store.toLowerCase().includes(q)
      );
    }
    return results;
  }, [selectedCategory, sort, search]);

  const totalSaved = useMemo(
    () =>
      filteredDeals.reduce(
        (sum, d) => sum + (d.originalPrice - d.dealPrice),
        0
      ),
    [filteredDeals]
  );

  const maxDiscount = useMemo(
    () =>
      filteredDeals.length > 0
        ? Math.max(...filteredDeals.map((d) => d.discount))
        : 0,
    [filteredDeals]
  );

  return (
    <div className="flex flex-col flex-1">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-5xl flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold tracking-tight">
              <span className="text-emerald-400">N</span>oval
            </h1>
            <span className="hidden sm:inline text-xs text-zinc-600 border-l border-zinc-800 pl-3">
              Tech Deals, Curated Daily
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-500 font-mono">
              {filteredDeals.length} deals
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-6 py-8 flex flex-col gap-6">
        {/* Hero stats */}
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <div className="text-3xl font-bold tracking-tight">
              Today&apos;s Tech Deals
            </div>
            {filteredDeals.length > 0 && (
              <p className="text-sm text-zinc-500 mt-1">
                Up to {maxDiscount}% off &middot; Save up to{" "}
                {formatPrice(totalSaved)} total
              </p>
            )}
          </div>
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search deals..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 h-10 rounded-lg border border-zinc-800 bg-zinc-900 px-4 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-10 rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600 cursor-pointer"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-zinc-100 text-zinc-900"
                  : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Deals grid */}
        {filteredDeals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredDeals.map((deal, i) => (
              <DealCard key={deal.id} deal={deal} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-zinc-600">
            <p className="text-lg">No deals found</p>
            <p className="text-sm mt-1">
              Try a different category or search term
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-zinc-800 py-6">
        <div className="mx-auto max-w-5xl px-6 flex items-center justify-between text-xs text-zinc-600">
          <span>Noval — Tech deals, updated daily</span>
          <span>Prices may vary. Check retailer for latest.</span>
        </div>
      </footer>
    </div>
  );
}
