/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import type { Idea } from "../domain/ideas.entity";

export type NewIdea = Partial<Pick<Idea, "title" | "description">>;
export type UpdateIdea = Partial<Pick<Idea, "id" | "title" | "description">>;
export type DeleteIdea = number;
export type SwapIdeas = { id1: number; id2: number };

/**
 * @interface IdeasAPI
 * IdeasAPI defines the interface for the ideas application layer.
 * 
 * @throws {Exceptions} if any of the operations fail.
 */
export interface IdeasAPI {
  /**
   * Creates a new idea with the given input.
   * @param input for creating a new idea, only title and description are required.
   * @returns the newly created idea.
   */
	newIdea: (input: NewIdea) => Promise<Idea>;

  /**
   * Updates an existing idea with the given input.
   * @param input for updating an existing idea.
   * @returns the updated idea.
   */
	updateIdea: (input: UpdateIdea) => Promise<Idea>;

  /**
   * Deletes an existing idea with the given ID.
   * @param id of the idea to delete.
   */
	deleteIdea: (id: DeleteIdea) => Promise<void>;

  /**
   * Retrieves all ideas.
   * @returns an array of all ideas.
   */
	getAllIdeas: () => Promise<Idea[]>;

  /**
   * Swaps the positions of two ideas.
   * @param input containing the IDs of the two ideas to swap.
   */
	swapIdeas: (input: SwapIdeas) => Promise<void>;
}
