import {
  pgTable,
  serial,
  text,
  numeric,
  integer,
  boolean,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";
import type { AdapterAccountType } from "@auth/core/adapters";

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

// Auth tables (Auth.js v5 / Drizzle adapter)
export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
});

export const accounts = pgTable(
  "account",
  {
    userId: text("userId")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").$type<AdapterAccountType>().notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
  },
  (account) => ({
    compositePk: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
);

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = pgTable(
  "verificationToken",
  {
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
);

// Social tables
export const favorites = pgTable("favorites", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  dealId: integer("deal_id")
    .notNull()
    .references(() => deals.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const votes = pgTable("votes", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  dealId: integer("deal_id")
    .notNull()
    .references(() => deals.id, { onDelete: "cascade" }),
  value: integer("value").notNull(), // 1 or -1
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  dealId: integer("deal_id")
    .notNull()
    .references(() => deals.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// Push notification tables
export const pushSubscriptions = pgTable("push_subscriptions", {
  id: serial("id").primaryKey(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  endpoint: text("endpoint").notNull().unique(),
  keysP256dh: text("keys_p256dh").notNull(),
  keysAuth: text("keys_auth").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const alertSubscriptions = pgTable("alert_subscriptions", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // 'category', 'keyword', 'store'
  value: text("value").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Deal = typeof deals.$inferSelect;
export type NewDeal = typeof deals.$inferInsert;
export type PriceHistory = typeof priceHistory.$inferSelect;
export type User = typeof users.$inferSelect;
export type Comment = typeof comments.$inferSelect;
