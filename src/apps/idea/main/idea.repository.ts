/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import type { SqliteDb } from "../../../database/database";
import type { CreateIdeaDto, IdeaDto, UpdateIdeaDto } from "../contracts/idea.contract";
import type { Idea } from "./idea.model";

/**
 * Repository for managing ideas in the SQLite database.
 */
export class IdeaRepository {
	private readonly stmtInsert: ReturnType<SqliteDb["prepare"]>;
	private readonly stmtFindAll: ReturnType<SqliteDb["prepare"]>;
	private readonly stmtFindById: ReturnType<SqliteDb["prepare"]>;
	private readonly stmtFindMinNumberGreaterThan: ReturnType<SqliteDb["prepare"]>;
	private readonly stmtFindMaxNumberLessThan: ReturnType<SqliteDb["prepare"]>;
	private readonly stmtDeleteById: ReturnType<SqliteDb["prepare"]>;
  private readonly stmtSwapNumbers: ReturnType<SqliteDb["prepare"]>;
  private readonly stmtShiftNumbersDown: ReturnType<SqliteDb["prepare"]>;


	constructor(private readonly db: SqliteDb) {
		this.stmtInsert = this.db.prepare(
			"INSERT INTO ideas(number, title, description) VALUES (?, ?, ?)",
		);
		this.stmtFindAll = this.db.prepare(
			`SELECT
        id,
        number,
        title,
        description,
        created_at as createdAt
      FROM ideas
      ORDER BY number`,
		);
		this.stmtFindById = this.db.prepare(
			`SELECT
        id,
        number,
        title,
        description,
        created_at as createdAt
      FROM ideas
      WHERE id = ?`,
		);
		this.stmtFindMinNumberGreaterThan = this.db.prepare(
			`SELECT
        id,
        number,
        title,
        description,
        created_at as createdAt
      FROM ideas
      WHERE number > ?
      ORDER BY number ASC
      LIMIT 1`,
		);
		this.stmtFindMaxNumberLessThan = this.db.prepare(
			`SELECT
        id,
        number,
        title,
        description,
        created_at as createdAt
      FROM ideas
      WHERE number < ?
      ORDER BY number DESC
      LIMIT 1`,
		);
		this.stmtDeleteById = this.db.prepare("DELETE FROM ideas WHERE id = ?");
    this.stmtSwapNumbers = this.db.prepare(`
      UPDATE ideas
      SET number = CASE
        WHEN id = ? THEN ?
        WHEN id = ? THEN ?
        ELSE number
      END
      WHERE id IN (?, ?)
    `);
    this.stmtShiftNumbersDown = this.db.prepare(
      "UPDATE ideas SET number = number - 1 WHERE number > ?",
    );
	}

	create(number: number, input: CreateIdeaDto): IdeaDto {
		const result = this.stmtInsert.run([number, input.title, input.description]);
		const id = Number(result.lastInsertRowid);

		return this.stmtFindById.get(id) as IdeaDto;
	}

	find(): Idea[] {
		return this.stmtFindAll.all([]) as Idea[];
	}

	findById(id: number): Idea | null {
		return (this.stmtFindById.get(id) as Idea) ?? null;
	}

	update(input: UpdateIdeaDto): IdeaDto | null {
		const updates: string[] = [];
		const values: unknown[] = [];

    if (input.number !== undefined) {
      updates.push("number = ?");
      values.push(input.number);
    }

		if (input.title !== undefined) {
			updates.push("title = ?");
			values.push(input.title);
		}

		if (input.description !== undefined) {
			updates.push("description = ?");
			values.push(input.description);
		}

		if (updates.length > 0) {
			values.push(input.id);
			this.db.prepare(`UPDATE ideas SET ${updates.join(", ")} WHERE id = ?`).run(...values);
		}

		return (this.stmtFindById.get(input.id) as IdeaDto) ?? null;
	}

	deleteById(id: number): boolean {
		const result = this.stmtDeleteById.run(id);
		return result.changes > 0;
	}

	findIdeaWithMinNumberGreaterThan(number: number): Idea | null {
		return (this.stmtFindMinNumberGreaterThan.get(number) as Idea) ?? null;
	}

	findIdeaWithMaxNumberLessThan(number: number): Idea | null {
		return (this.stmtFindMaxNumberLessThan.get(number) as Idea) ?? null;
	}

  swapNumbers(a: { id: number; number: number }, b: { id: number; number: number }): void {
    const tx = this.db.transaction(() => {
      this.stmtSwapNumbers.run([a.id, b.number, b.id, a.number, a.id, b.id]);
    });

    tx();
  }

  deleteAndReorder(id: number): boolean {
    const tx = this.db.transaction(() => {
      const idea = this.findById(id);
      if (!idea) return false;

      const del = this.stmtDeleteById.run(id);
      if (del.changes === 0) return false;

      this.stmtShiftNumbersDown.run(idea.number);
      return true;
    });

    return tx();
  }

  
}
