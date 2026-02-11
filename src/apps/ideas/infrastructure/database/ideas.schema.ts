/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const ideas = sqliteTable("ideas", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	number: integer("number").notNull(),
	title: text("title").notNull(),
	description: text("description").notNull(),
	createdAt: text("created_at").notNull(),
});
