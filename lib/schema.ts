import { pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

export const shortUrls = pgTable("short_urls", {
  id: varchar("id", { length: 12 }).primaryKey(),
  original: varchar("original", { length: 2048 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
