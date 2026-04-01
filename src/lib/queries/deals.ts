import { db } from "@/lib/db";
import { deals } from "@/lib/schema";
import { desc, asc, eq, ilike, or, and, sql } from "drizzle-orm";

export type DealFilter = {
  category?: string;
  sort?: string;
  search?: string;
  includeExpired?: boolean;
};

export async function getDeals(filters: DealFilter = {}) {
  const conditions = [];

  if (!filters.includeExpired) {
    conditions.push(eq(deals.expired, false));
  }

  if (filters.category && filters.category !== "All") {
    conditions.push(eq(deals.category, filters.category));
  }

  if (filters.search?.trim()) {
    const q = `%${filters.search.trim()}%`;
    conditions.push(
      or(
        ilike(deals.title, q),
        ilike(deals.description, q),
        ilike(deals.store, q)
      )!
    );
  }

  let orderBy;
  switch (filters.sort) {
    case "discount":
      orderBy = desc(deals.discount);
      break;
    case "price-low":
      orderBy = asc(deals.dealPrice);
      break;
    case "price-high":
      orderBy = desc(deals.dealPrice);
      break;
    case "newest":
    default:
      orderBy = desc(deals.postedAt);
      break;
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  return db
    .select()
    .from(deals)
    .where(where)
    .orderBy(orderBy);
}

export async function getDealById(id: number) {
  const results = await db
    .select()
    .from(deals)
    .where(eq(deals.id, id))
    .limit(1);
  return results[0] ?? null;
}

export async function getFeaturedDeal() {
  const results = await db
    .select()
    .from(deals)
    .where(and(eq(deals.featured, true), eq(deals.expired, false)))
    .limit(1);
  return results[0] ?? null;
}

export async function upsertDeal(deal: {
  title: string;
  description: string;
  originalPrice: string;
  dealPrice: string;
  discount: number;
  store: string;
  category: string;
  url: string;
  postedAt?: string;
  hot?: boolean;
  productSlug?: string;
  featured?: boolean;
}) {
  // Check if deal already exists by title + store
  const existing = await db
    .select()
    .from(deals)
    .where(and(eq(deals.title, deal.title), eq(deals.store, deal.store)))
    .limit(1);

  if (existing.length > 0) {
    // Update existing deal
    const updated = await db
      .update(deals)
      .set({
        description: deal.description,
        originalPrice: deal.originalPrice,
        dealPrice: deal.dealPrice,
        discount: deal.discount,
        url: deal.url,
        hot: deal.hot ?? false,
        updatedAt: new Date(),
      })
      .where(eq(deals.id, existing[0].id))
      .returning();
    return updated[0];
  }

  // Insert new deal
  const result = await db
    .insert(deals)
    .values({
      title: deal.title,
      description: deal.description,
      originalPrice: deal.originalPrice,
      dealPrice: deal.dealPrice,
      discount: deal.discount,
      store: deal.store,
      category: deal.category,
      url: deal.url,
      postedAt: deal.postedAt ? new Date(deal.postedAt) : new Date(),
      hot: deal.hot ?? false,
      productSlug: deal.productSlug,
      featured: deal.featured ?? false,
    })
    .returning();
  return result[0];
}

export const categories = [
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
] as const;

export type Category = (typeof categories)[number];
