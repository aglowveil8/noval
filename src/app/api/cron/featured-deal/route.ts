import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { deals, votes } from "@/lib/schema";
import { eq, and, sql, desc } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Clear current featured deal
  await db.update(deals).set({ featured: false }).where(eq(deals.featured, true));

  // Select the non-expired deal with highest vote score + discount combo
  const topDeal = await db
    .select({
      id: deals.id,
      title: deals.title,
      score: sql<number>`coalesce(sum(${votes.value}), 0)::int + ${deals.discount}`,
    })
    .from(deals)
    .leftJoin(votes, eq(deals.id, votes.dealId))
    .where(eq(deals.expired, false))
    .groupBy(deals.id)
    .orderBy(desc(sql`coalesce(sum(${votes.value}), 0)::int + ${deals.discount}`))
    .limit(1);

  if (topDeal.length > 0) {
    await db
      .update(deals)
      .set({ featured: true })
      .where(eq(deals.id, topDeal[0].id));
  }

  return NextResponse.json({
    featured: topDeal[0] ?? null,
  });
}
