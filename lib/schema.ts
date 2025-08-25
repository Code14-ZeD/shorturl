import {
  pgTable,
  varchar,
  timestamp,
  integer,
  serial,
} from "drizzle-orm/pg-core";

// Shortened URLs
export const shortUrls = pgTable("short_urls", {
  id: varchar("id", { length: 12 }).primaryKey(),
  original: varchar("original", { length: 2048 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  clickCount: integer("click_count").default(0).notNull(), // ✅ total clicks
});

// Click logs
export const clicks = pgTable("clicks", {
  id: serial("id").primaryKey(),
  shortUrlId: varchar("short_url_id", { length: 12 }).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  ip: varchar("ip", { length: 45 }), // ✅ supports IPv6
  userAgent: varchar("user_agent", { length: 512 }),
});
