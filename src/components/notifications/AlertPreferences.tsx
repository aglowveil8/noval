"use client";

import { useState, useTransition } from "react";
import { updateAlertPreferences } from "@/app/actions/notifications";

const categoryOptions = [
  "Laptops", "Headphones", "Tablets", "Monitors", "Phones",
  "Storage", "Smart Home", "Gaming", "Audio", "Wearables", "Networking",
];

const storeOptions = ["Amazon", "Best Buy", "Dell", "Newegg", "B&H"];

type Alert = { type: string; value: string };

export function AlertPreferences({
  currentAlerts,
}: {
  currentAlerts: { type: string; value: string }[];
}) {
  const [alerts, setAlerts] = useState<Alert[]>(
    currentAlerts.map((a) => ({ type: a.type, value: a.value }))
  );
  const [keyword, setKeyword] = useState("");
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function toggleAlert(type: string, value: string) {
    const exists = alerts.some((a) => a.type === type && a.value === value);
    if (exists) {
      setAlerts(alerts.filter((a) => !(a.type === type && a.value === value)));
    } else {
      setAlerts([...alerts, { type, value }]);
    }
    setSaved(false);
  }

  function addKeyword() {
    if (!keyword.trim()) return;
    if (!alerts.some((a) => a.type === "keyword" && a.value === keyword.trim())) {
      setAlerts([...alerts, { type: "keyword", value: keyword.trim() }]);
    }
    setKeyword("");
    setSaved(false);
  }

  function removeKeyword(value: string) {
    setAlerts(alerts.filter((a) => !(a.type === "keyword" && a.value === value)));
    setSaved(false);
  }

  function handleSave() {
    startTransition(async () => {
      await updateAlertPreferences(alerts);
      setSaved(true);
    });
  }

  const isActive = (type: string, value: string) =>
    alerts.some((a) => a.type === type && a.value === value);

  const keywordAlerts = alerts.filter((a) => a.type === "keyword");

  return (
    <div className="flex flex-col gap-6">
      {/* Categories */}
      <div>
        <label className="text-sm text-zinc-400 font-medium block mb-3">
          Categories
        </label>
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleAlert("category", cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                isActive("category", cat)
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-zinc-800 text-zinc-500 border border-zinc-700 hover:text-zinc-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stores */}
      <div>
        <label className="text-sm text-zinc-400 font-medium block mb-3">
          Stores
        </label>
        <div className="flex flex-wrap gap-2">
          {storeOptions.map((store) => (
            <button
              key={store}
              onClick={() => toggleAlert("store", store)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                isActive("store", store)
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-zinc-800 text-zinc-500 border border-zinc-700 hover:text-zinc-300"
              }`}
            >
              {store}
            </button>
          ))}
        </div>
      </div>

      {/* Keywords */}
      <div>
        <label className="text-sm text-zinc-400 font-medium block mb-3">
          Keywords
        </label>
        <div className="flex gap-2 mb-2">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addKeyword())}
            placeholder="e.g. AirPods, RTX, MacBook"
            className="flex-1 h-9 rounded-lg border border-zinc-800 bg-zinc-900 px-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
          />
          <button
            onClick={addKeyword}
            className="px-3 h-9 rounded-lg bg-zinc-800 text-zinc-300 text-sm hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            Add
          </button>
        </div>
        {keywordAlerts.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {keywordAlerts.map((a) => (
              <span
                key={a.value}
                className="inline-flex items-center gap-1 px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-xs border border-emerald-500/30"
              >
                {a.value}
                <button
                  onClick={() => removeKeyword(a.value)}
                  className="hover:text-white cursor-pointer"
                >
                  x
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={handleSave}
        disabled={isPending}
        className="h-10 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-400 disabled:opacity-50 transition-colors cursor-pointer"
      >
        {isPending ? "Saving..." : saved ? "Saved!" : "Save Preferences"}
      </button>
    </div>
  );
}
