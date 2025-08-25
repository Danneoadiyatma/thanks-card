import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const letters = pgTable("letters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  author: text("author").notNull(),
  content: text("content").notNull(),
  preview: text("preview").notNull(),
  date: timestamp("date").notNull(),
  imageUrl: text("image_url"),
  isFavorite: boolean("is_favorite").default(false),
});

export const insertLetterSchema = createInsertSchema(letters, {
  date: z.coerce.date(),
}).omit({
  id: true,
});

export type InsertLetter = z.infer<typeof insertLetterSchema>;
export type Letter = typeof letters.$inferSelect;
