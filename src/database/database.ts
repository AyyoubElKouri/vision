/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import path from "node:path";
import Database from "better-sqlite3";
import { app } from "electron";

export type SqliteDb = Database.Database;

/**
 * Opens a connection to the SQLite database located in the user's app data directory.
 * If the database file does not exist, it will be created.
 *
 * @returns {SqliteDb} The opened SQLite database instance.
 */
export function openDatabase(): SqliteDb {
	const dbPath = path.join(app.getPath("userData"), "vision.db");
	const db = new Database(dbPath);

	// Enable Write-Ahead Logging (WAL) and enforce foreign key constraints
	db.pragma("journal_mode = WAL");
	db.pragma("foreign_keys = ON");

	return db;
}
