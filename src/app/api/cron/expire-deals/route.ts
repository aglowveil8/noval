import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { deals } from "@/lib/schema";
import { eq, and, lt, sql } from "drizzle-orm";

export async function GET(request: NextRequest) {
  // Verify cron secret (Vercel sets this automatically for cron jobs)
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Mark deals older than 48 hours as expired
  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);

  const result = await db
    .update(deals)
    .set({ expired: true })
    .where(
      and(
        eq(deals.expired, false),
        lt(deals.postedAt, cutoff)
      )
    )
    .returning({ id: deals.id });

  return NextResponse.json({
    expired: result.length,
    message: `Marked ${result.length} deals as expired`,
  });
}
