import { db } from "@/lib/db";
import { deals } from "@/lib/schema";
import { sql, eq, and } from "drizzle-orm";

export async function getStores() {
  return db
    .select({
      store: deals.store,
      count: sql<number>`count(*)::int`,
    })
    .from(deals)
    .where(eq(deals.expired, false))
    .groupBy(deals.store)
    .orderBy(sql`count(*) desc`);
}

export async function getDealsByStore(store: string) {
  return db
    .select()
    .from(deals)
    .where(and(eq(deals.store, store), eq(deals.expired, false)))
    .orderBy(sql`${deals.postedAt} desc`);
}
