"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { PriceHistory } from "@/lib/schema";

export function PriceChart({ history }: { history: PriceHistory[] }) {
  if (history.length < 2) {
    return (
      <div className="text-sm text-zinc-500 text-center py-4">
        Not enough price data yet
      </div>
    );
  }

  const data = history.map((h) => ({
    date: new Date(h.recordedAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    price: Number(h.price),
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis
          dataKey="date"
          stroke="#52525b"
          fontSize={12}
          tickLine={false}
        />
        <YAxis
          stroke="#52525b"
          fontSize={12}
          tickLine={false}
          tickFormatter={(v) => `$${v}`}
        />
        <Tooltip
          contentStyle={{
            background: "#18181b",
            border: "1px solid #3f3f46",
            borderRadius: "8px",
            fontSize: "12px",
          }}
          formatter={(value) => [`$${Number(value).toFixed(2)}`, "Price"]}
        />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#10b981"
          strokeWidth={2}
          dot={{ fill: "#10b981", r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
