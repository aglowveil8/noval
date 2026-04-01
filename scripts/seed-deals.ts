import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { deals, priceHistory } from "../src/lib/schema";
import { deals as seedDeals } from "../src/lib/deals";

async function seed() {
  const sql = neon(process.env.POSTGRES_URL!);
  const db = drizzle(sql);

  console.log("Seeding deals...");

  for (const deal of seedDeals) {
    const [inserted] = await db
      .insert(deals)
      .values({
        title: deal.title,
        description: deal.description,
        originalPrice: deal.originalPrice.toString(),
        dealPrice: deal.dealPrice.toString(),
        discount: deal.discount,
        store: deal.store,
        category: deal.category,
        url: deal.url,
        postedAt: new Date(deal.postedAt),
        hot: deal.hot ?? false,
      })
      .returning();

    // Record initial price history entry
    await db.insert(priceHistory).values({
      dealId: inserted.id,
      price: deal.dealPrice.toString(),
      recordedAt: new Date(deal.postedAt),
    });

    console.log(`  Seeded: ${deal.title}`);
  }

  console.log(`\nDone! Seeded ${seedDeals.length} deals.`);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
