"use client";

import { useState, useMemo } from "react";
import { DealCard } from "./DealCard";
import { formatPrice } from "@/lib/utils";
import type { Deal } from "@/lib/schema";

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "discount", label: "Biggest Discount" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
];

const categories = [
  "All",
  "Laptops",
  "Headphones",
  "Tablets",
  "Monitors",
  "Phones",
  "Storage",
  "Smart Home",
  "Gaming",
  "Audio",
  "Wearables",
  "Networking",
];

export function DealGrid({ deals }: { deals: Deal[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");

  const filteredDeals = useMemo(() => {
    let results = [...deals];

    if (selectedCategory !== "All") {
      results = results.filter((d) => d.category === selectedCategory);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.store.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case "discount":
        results.sort((a, b) => b.discount - a.discount);
        break;
      case "price-low":
        results.sort((a, b) => Number(a.dealPrice) - Number(b.dealPrice));
        break;
      case "price-high":
        results.sort((a, b) => Number(b.dealPrice) - Number(a.dealPrice));
        break;
      case "newest":
      default:
        results.sort(
          (a, b) =>
            new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
        );
        break;
    }

    return results;
  }, [deals, selectedCategory, sort, search]);

  const totalSaved = useMemo(
    () =>
      filteredDeals.reduce(
        (sum, d) => sum + (Number(d.originalPrice) - Number(d.dealPrice)),
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
    <>
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
    </>
  );
}
