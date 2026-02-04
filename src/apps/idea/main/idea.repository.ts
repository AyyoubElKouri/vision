/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import type { SqliteDb } from "../../../database/database";
import type { CreateIdeaDto } from "../contracts/idea.contract";
import type { Idea } from "./idea.model";

/**
 * Repository for managing ideas in the SQLite database.
 */
export class IdeaRepository {
	constructor(private readonly db: SqliteDb) {}

	getAll(): Idea[] {
		return this.db
			.prepare(
				`SELECT
          id,
          number,
          title,
          description,
          created_at as createdAt
        FROM ideas
        ORDER BY number`,
			)
			.all() as Idea[];
	}

	create(input: CreateIdeaDto): { id: number } {
		const result = this.db
			.prepare("INSERT INTO ideas(number, title, description) VALUES (?, ?, ?)")
			.run(input.number, input.title, input.description);

		return { id: Number(result.lastInsertRowid) };
	}
}
