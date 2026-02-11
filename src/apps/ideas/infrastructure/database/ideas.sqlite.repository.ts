/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import { asc, eq } from "drizzle-orm";

import type { Idea } from "@/apps/ideas/domain/ideas.entity";
import type { Db } from "@/database/database";
import { ideas } from "./ideas.schema";
import { DatabaseException } from "@/exceptions/infrastructure/database.exception";
import { NotFoundException } from "@/exceptions/infrastructure/not-found.exception";

import type {
	CreateIdeaInput,
	DeleteIdeaInput,
	FindIdeaByIdInput,
	IdeasRepository,
	SwapTwoIdeasInput,
	UpdateIdeaInput,
} from "@/apps/ideas/domain/ideas.repository";

export class IdeasSqliteRepository implements IdeasRepository {
	constructor(private readonly db: Db) {}

	async create(input: CreateIdeaInput): Promise<Idea> {
		try {
			const row = this.db
				.insert(ideas)
				.values({
					number: input.number,
					title: input.title,
					description: input.description,
					createdAt: new Date().toISOString(),
				})
				.returning()
				.get();

			return this.toEntity(row);
		} catch (error) {
			throw new DatabaseException("Failed to create idea", error as Error);
		}
	}

	async update(input: UpdateIdeaInput): Promise<Idea> {
		const existing = this.db.select().from(ideas).where(eq(ideas.id, input.id)).get();

		if (!existing) {
			throw new NotFoundException("Idea", input.id);
		}

		try {
			const updateValues: { number?: number; title?: string; description?: string } = {};

			if (input.number !== undefined) updateValues.number = input.number;
			if (input.title !== undefined) updateValues.title = input.title;
			if (input.description !== undefined) updateValues.description = input.description;

			this.db.update(ideas).set(updateValues).where(eq(ideas.id, input.id)).run();

			const updated = this.db.select().from(ideas).where(eq(ideas.id, input.id)).get();

			if (!updated) {
				throw new NotFoundException("Idea", input.id);
			}

			return this.toEntity(updated);
		} catch (error) {
			if (error instanceof NotFoundException) throw error;
			throw new DatabaseException("Failed to update idea", error as Error);
		}
	}

	async delete(input: DeleteIdeaInput): Promise<void> {
		const existing = this.db.select().from(ideas).where(eq(ideas.id, input)).get();

		if (!existing) {
			throw new NotFoundException("Idea", input);
		}

		try {
			this.db.delete(ideas).where(eq(ideas.id, input)).run();
		} catch (error) {
			throw new DatabaseException("Failed to delete idea", error as Error);
		}
	}

	async findAll(): Promise<Idea[]> {
		try {
			const rows = this.db.select().from(ideas).orderBy(asc(ideas.number)).all();
			return rows.map((row) => this.toEntity(row));
		} catch (error) {
			throw new DatabaseException("Failed to retrieve ideas", error as Error);
		}
	}

	async findById(input: FindIdeaByIdInput): Promise<Idea> {
		try {
			const row = this.db.select().from(ideas).where(eq(ideas.id, input)).get();

			if (!row) {
				throw new NotFoundException("Idea", input);
			}

			return this.toEntity(row);
		} catch (error) {
			if (error instanceof NotFoundException) throw error;
			throw new DatabaseException("Failed to retrieve idea", error as Error);
		}
	}

	async swapTwoIdeas(input: SwapTwoIdeasInput): Promise<void> {
		const idea1 = this.db.select().from(ideas).where(eq(ideas.id, input.id1)).get();
		const idea2 = this.db.select().from(ideas).where(eq(ideas.id, input.id2)).get();

		if (!idea1) {
			throw new NotFoundException("Idea", input.id1);
		}
		if (!idea2) {
			throw new NotFoundException("Idea", input.id2);
		}

		try {
			this.db.update(ideas).set({ number: idea2.number }).where(eq(ideas.id, input.id1)).run();
			this.db.update(ideas).set({ number: idea1.number }).where(eq(ideas.id, input.id2)).run();
		} catch (error) {
			throw new DatabaseException("Failed to swap ideas", error as Error);
		}
	}

	/**
	 * Maps a raw database row to the domain Idea entity.
	 */
	private toEntity(row: typeof ideas.$inferSelect): Idea {
		return {
			id: row.id,
			title: row.title,
			description: row.description,
			number: row.number,
			createdAt: new Date(row.createdAt),
		};
	}
}
