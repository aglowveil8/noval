import {
  pgTable,
  serial,
  text,
  numeric,
  integer,
  boolean,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const deals = pgTable("deals", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  originalPrice: numeric("original_price", { precision: 10, scale: 2 }).notNull(),
  dealPrice: numeric("deal_price", { precision: 10, scale: 2 }).notNull(),
  discount: integer("discount").notNull(),
  store: text("store").notNull(),
  category: text("category").notNull(),
  url: text("url").notNull(),
  postedAt: timestamp("posted_at", { withTimezone: true }).notNull().defaultNow(),
  hot: boolean("hot").notNull().default(false),
  expired: boolean("expired").notNull().default(false),
  featured: boolean("featured").notNull().default(false),
  productSlug: text("product_slug"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const priceHistory = pgTable("price_history", {
  id: serial("id").primaryKey(),
  dealId: integer("deal_id")
    .notNull()
    .references(() => deals.id, { onDelete: "cascade" }),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  recordedAt: timestamp("recorded_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Deal = typeof deals.$inferSelect;
export type NewDeal = typeof deals.$inferInsert;
export type PriceHistory = typeof priceHistory.$inferSelect;
