/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import type { Idea } from "./ideas.entity";

// Input types for the repository methods
export type CreateIdeaInput = Pick<Idea, "title" | "description" | "number">;
export type UpdateIdeaInput = Partial<Pick<Idea, "title" | "description" | "number">> & { id: number };
export type DeleteIdeaInput = number;
export type FindIdeaByIdInput = number;
export type SwapTwoIdeasInput = { id1: number; id2: number };

/**
 * @interface IdeasRepository
 *
 * This interface defines the contract for the ideas repository,
 * it will be implemented by the infrastructure layer to interact with the database,
 */
export interface IdeasRepository {
	/**
	 * Creates a new idea with the given input data.
	 * @param input The data needed to create a new idea
	 * @return A promise that resolves to the created idea
	 *
	 * @throws {DatabaseException} If there is an error while saving the idea to the database
	 */
	create(input: CreateIdeaInput): Promise<Idea>;

	/**
	 * Updates an existing idea with the given input data.
	 * @param input The data needed to update the idea, including the ID of the idea to update
	 * @return A promise that resolves to the updated idea
	 *
	 * @throws {DatabaseException} If there is an error while updating the idea in the database
	 * @throws {NotFoundException} If no idea with the given ID exists
	 */
	update(input: UpdateIdeaInput): Promise<Idea>;

	/**
	 * Deletes an existing idea with the given ID.
	 * @param input The ID of the idea to delete
	 * @return A promise that resolves when the idea has been deleted
	 *
	 * @throws {DatabaseException} If there is an error while deleting the idea from the database
	 * @throws {NotFoundException} If no idea with the given ID exists
	 */
	delete(input: DeleteIdeaInput): Promise<void>;

	/**
	 * Retrieves all ideas from the database.
	 * @return A promise that resolves to an array of all ideas
	 *
	 * @throws {DatabaseException} If there is an error while retrieving the ideas from the database
	 */
	findAll(): Promise<Idea[]>;

	/**
	 * Retrieves an idea by its ID.
	 * @param input The ID of the idea to retrieve
	 * @return A promise that resolves to the idea if found.
	 *
	 * @throws {DatabaseException} If there is an error while retrieving the idea from the database
	 * @throws {NotFoundException} If no idea with the given ID exists
	 */
	findById(input: FindIdeaByIdInput): Promise<Idea>;

	/**
	 * Swaps the position of two ideas based on the number property.
	 * @param input An object containing the IDs of the two ideas to swap
	 * @return A promise that resolves when the ideas have been swapped
	 *
	 * @throws {DatabaseException} If there is an error while updating the ideas in the database
	 * @throws {NotFoundException} If no idea with either of the given IDs exists
	 */
	swapTwoIdeas(input: SwapTwoIdeasInput): Promise<void>;
}
