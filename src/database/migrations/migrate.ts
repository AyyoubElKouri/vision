/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import type { SqliteDb } from "../database";

const modules = import.meta.glob("./*.sql", { eager: true, as: "raw" });

const migrations = Object.entries(modules)
	.map(([filePath, sql]) => {
		const filename = filePath.split("/").pop() ?? filePath;
		return { filename, sql: String(sql) };
	})
	.sort((a, b) => a.filename.localeCompare(b.filename));

/**
 * Runs pending database migrations located in the same directory as this file.
 * Migrations are SQL files named with a leading timestamp (e.g., `20230915_add_users_table.sql`).
 * Applied migrations are tracked in the `schema_migrations` table.
 *
 * @param {SqliteDb} database - The SQLite database instance.
 */
export function runMigrations(database: SqliteDb): void {
	database.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL UNIQUE,
      applied_at TEXT NOT NULL
    );
  `);

	database.exec("BEGIN");
	try {
		for (const m of migrations) {
			const already = database
				.prepare("SELECT 1 FROM schema_migrations WHERE filename = ?")
				.get(m.filename);

			if (already) continue;

			database.exec(m.sql);

			database
				.prepare(
					"INSERT INTO schema_migrations(filename, applied_at) VALUES (?, datetime('now'))",
				)
				.run(m.filename);
		}

		database.exec("COMMIT");
	} catch (e) {
		database.exec("ROLLBACK");
		throw e;
	}
}
