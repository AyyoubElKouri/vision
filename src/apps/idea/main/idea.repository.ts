/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

/**
 * Repository for managing ideas in the SQLite database.
 */
import { asc, desc, eq, gt, lt, sql } from "drizzle-orm";
import type { Db } from "../../../database/database";
import { ideas } from "../../../database/schema/ideas";
import type {
	CreateIdeaDto,
	IdeaDto,
	UpdateIdeaDto,
} from "../contracts/idea.contract";
import type { Idea } from "./idea.model";

export class IdeaRepository {
	constructor(private readonly db: Db) {}

	create(number: number, input: CreateIdeaDto): IdeaDto {
		const result = this.db
			.insert(ideas)
			.values({
				number,
				title: input.title ?? "",
				description: input.description ?? "",
				createdAt: new Date().toISOString(),
			})
			.returning()
			.get();

		return result as IdeaDto;
	}

	find(): Idea[] {
		return this.db.select().from(ideas).orderBy(asc(ideas.number)).all();
	}

	findById(id: number): Idea | null {
		return this.db.select().from(ideas).where(eq(ideas.id, id)).get() ?? null;
	}

	update(input: UpdateIdeaDto): IdeaDto | null {
		const updateValues: {
			number?: number;
			title?: string;
			description?: string;
		} = {};

		if (input.number !== undefined) updateValues.number = input.number;
		if (input.title !== undefined) updateValues.title = input.title;
		if (input.description !== undefined)
			updateValues.description = input.description;

		this.db.update(ideas).set(updateValues).where(eq(ideas.id, input.id)).run();

		return this.findById(input.id) as IdeaDto | null;
	}

	deleteById(id: number): boolean {
		const res = this.db.delete(ideas).where(eq(ideas.id, id)).run();

		return res.changes > 0;
	}

	findIdeaWithMinNumberGreaterThan(number: number): Idea | null {
		return (
			this.db
				.select()
				.from(ideas)
				.where(gt(ideas.number, number))
				.orderBy(asc(ideas.number))
				.limit(1)
				.get() ?? null
		);
	}

	findIdeaWithMaxNumberLessThan(number: number): Idea | null {
		return (
			this.db
				.select()
				.from(ideas)
				.where(lt(ideas.number, number))
				.orderBy(desc(ideas.number))
				.limit(1)
				.get() ?? null
		);
	}

	swapNumbers(
		a: { id: number; number: number },
		b: { id: number; number: number },
	): void {
		this.db.transaction((tx) => {
			tx.update(ideas)
				.set({ number: b.number })
				.where(eq(ideas.id, a.id))
				.run();

			tx.update(ideas)
				.set({ number: a.number })
				.where(eq(ideas.id, b.id))
				.run();
		});
	}

	deleteAndReorder(id: number): boolean {
		return this.db.transaction((tx) => {
			const idea = tx.select().from(ideas).where(eq(ideas.id, id)).get();

			if (!idea) return false;

			tx.delete(ideas).where(eq(ideas.id, id)).run();

			tx.update(ideas)
				.set({ number: sql`${ideas.number} - 1` })
				.where(gt(ideas.number, idea.number))
				.run();

			return true;
		});
	}
}
