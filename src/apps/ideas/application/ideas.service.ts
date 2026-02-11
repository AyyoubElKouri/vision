/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import type { Idea } from "../domain/ideas.entity";
import type { IdeasRepository } from "../domain/ideas.repository";
import type { DeleteIdea, IdeasAPI, NewIdea, SwapIdeas, UpdateIdea } from "./ideas.api";
import { DatabaseException } from "@/exceptions/infrastructure/database.exception";
import { NotFoundException } from "@/exceptions/infrastructure/not-found.exception";

/**
 * @class IdeasService
 *
 * Application service that orchestrates idea operations.
 * Delegates persistence to the injected repository.
 */
export class IdeasService implements IdeasAPI {
	constructor(private readonly repository: IdeasRepository) {}

	async newIdea(input: NewIdea): Promise<Idea> {
		try {
			// Get the next idea number.
			const allIdeas = await this.repository.findAll();
			const nextNumber =
				allIdeas.length > 0 ? Math.max(...allIdeas.map((idea) => idea.number)) + 1 : 1;

			// Create new idea (with default values if not provided).
			return await this.repository.create({
				title: input.title ?? "Default Title",
				description: input.description ?? "Default Description",
				number: nextNumber,
			});
		} catch (error) {
			if (error instanceof DatabaseException) throw error;
			throw new DatabaseException("Failed to create a new idea", error as Error);
		}
	}

	async updateIdea(input: UpdateIdea): Promise<Idea> {
		if (input.id === undefined) {
			throw new NotFoundException("Idea", input.id);
		}

		try {
			return await this.repository.update({
				id: input.id,
				title: input.title,
				description: input.description,
			});
		} catch (error) {
			if (error instanceof NotFoundException) throw error;
			if (error instanceof DatabaseException) throw error;
			throw new DatabaseException("Failed to update idea", error as Error);
		}
	}

	async deleteIdea(id: DeleteIdea): Promise<void> {
		try {
			await this.repository.delete(id);
		} catch (error) {
			if (error instanceof NotFoundException) throw error;
			if (error instanceof DatabaseException) throw error;
			throw new DatabaseException("Failed to delete idea", error as Error);
		}
	}

	async getAllIdeas(): Promise<Idea[]> {
		try {
			return await this.repository.findAll();
		} catch (error) {
			if (error instanceof DatabaseException) throw error;
			throw new DatabaseException("Failed to retrieve ideas", error as Error);
		}
	}

	async swapIdeas(input: SwapIdeas): Promise<void> {
		try {
			await this.repository.swapTwoIdeas(input);
		} catch (error) {
			if (error instanceof NotFoundException) throw error;
			if (error instanceof DatabaseException) throw error;
			throw new DatabaseException("Failed to swap ideas", error as Error);
		}
	}
}
