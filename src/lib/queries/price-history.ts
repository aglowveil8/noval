import { db } from "@/lib/db";
import { priceHistory } from "@/lib/schema";
import { eq, asc } from "drizzle-orm";

export async function getPriceHistory(dealId: number) {
  return db
    .select()
    .from(priceHistory)
    .where(eq(priceHistory.dealId, dealId))
    .orderBy(asc(priceHistory.recordedAt));
}
