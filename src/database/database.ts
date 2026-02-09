/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import path from "node:path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { app } from "electron";

let sqlite: Database.Database | null = null;
let orm: ReturnType<typeof drizzle> | null = null;

export type SqliteDriver = Database.Database;
export type Db = ReturnType<typeof drizzle>;

/**
 * Opens the raw SQLite driver (better-sqlite3).
 * This layer is low-level and should NOT be used directly by repositories.
 */
export function getSqliteDriver(): SqliteDriver {
	if (!sqlite) {
		const dbPath = path.join(app.getPath("userData"), "vision.db");
		sqlite = new Database(dbPath);

		sqlite.pragma("journal_mode = WAL");
		sqlite.pragma("foreign_keys = ON");
	}

	return sqlite;
}

/**
 * Opens a Drizzle ORM instance on top of better-sqlite3.
 * This is the ONLY database object repositories should depend on.
 */
export function getDatabase(): Db {
	if (!orm) {
		orm = drizzle(getSqliteDriver());
	}
	return orm;
}
