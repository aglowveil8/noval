"use client";

import { useState } from "react";

const stores = [
  "Amazon",
  "Best Buy",
  "Dell",
  "Newegg",
  "B&H",
];

export function AdvancedFilters({
  onFiltersChange,
}: {
  onFiltersChange: (filters: {
    priceMin: number;
    priceMax: number;
    discountMin: number;
    stores: string[];
  }) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(3000);
  const [discountMin, setDiscountMin] = useState(0);
  const [selectedStores, setSelectedStores] = useState<string[]>([]);

  function toggleStore(store: string) {
    const next = selectedStores.includes(store)
      ? selectedStores.filter((s) => s !== store)
      : [...selectedStores, store];
    setSelectedStores(next);
    onFiltersChange({ priceMin, priceMax, discountMin, stores: next });
  }

  function handlePriceMinChange(val: number) {
    setPriceMin(val);
    onFiltersChange({ priceMin: val, priceMax, discountMin, stores: selectedStores });
  }

  function handlePriceMaxChange(val: number) {
    setPriceMax(val);
    onFiltersChange({ priceMin, priceMax: val, discountMin, stores: selectedStores });
  }

  function handleDiscountChange(val: number) {
    setDiscountMin(val);
    onFiltersChange({ priceMin, priceMax, discountMin: val, stores: selectedStores });
  }

  function resetFilters() {
    setPriceMin(0);
    setPriceMax(3000);
    setDiscountMin(0);
    setSelectedStores([]);
    onFiltersChange({ priceMin: 0, priceMax: 3000, discountMin: 0, stores: [] });
  }

  const hasActiveFilters =
    priceMin > 0 || priceMax < 3000 || discountMin > 0 || selectedStores.length > 0;

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
          hasActiveFilters
            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
            : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
        }`}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
        Filters
        {hasActiveFilters && (
          <span className="text-xs bg-emerald-500/20 px-1.5 py-0.5 rounded">
            Active
          </span>
        )}
      </button>

      {isOpen && (
        <div className="mt-3 p-4 rounded-xl border border-zinc-800 bg-zinc-900/60">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Price range */}
            <div>
              <label className="text-xs text-zinc-400 font-medium block mb-2">
                Price Range
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={priceMin}
                  onChange={(e) => handlePriceMinChange(Number(e.target.value))}
                  placeholder="Min"
                  className="w-20 h-8 rounded border border-zinc-800 bg-zinc-900 px-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-600"
                />
                <span className="text-zinc-600">—</span>
                <input
                  type="number"
                  value={priceMax}
                  onChange={(e) => handlePriceMaxChange(Number(e.target.value))}
                  placeholder="Max"
                  className="w-20 h-8 rounded border border-zinc-800 bg-zinc-900 px-2 text-xs text-zinc-100 focus:outline-none focus:border-zinc-600"
                />
              </div>
            </div>

            {/* Min discount */}
            <div>
              <label className="text-xs text-zinc-400 font-medium block mb-2">
                Min Discount: {discountMin}%
              </label>
              <input
                type="range"
                min={0}
                max={80}
                value={discountMin}
                onChange={(e) => handleDiscountChange(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>

            {/* Stores */}
            <div>
              <label className="text-xs text-zinc-400 font-medium block mb-2">
                Stores
              </label>
              <div className="flex flex-wrap gap-1.5">
                {stores.map((store) => (
                  <button
                    key={store}
                    onClick={() => toggleStore(store)}
                    className={`px-2 py-1 rounded text-xs transition-colors cursor-pointer ${
                      selectedStores.includes(store)
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-zinc-800 text-zinc-500 border border-zinc-700 hover:text-zinc-300"
                    }`}
                  >
                    {store}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="mt-3 text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
            >
              Reset filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
