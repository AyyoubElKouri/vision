/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import type {
	CreateIdeaDto,
	IdeaDto,
	SwapIdeaDto,
	UpdateIdeaDto,
} from "../contracts/idea.contract";

import type { IdeaRepository } from "./idea.repository";

export class IdeaService {
	constructor(private readonly repository: IdeaRepository) {}

	createIdea(createIdeaDto: CreateIdeaDto): IdeaDto {
    const { title, description } = createIdeaDto;

    // Determine the next number
    const allIdeas = this.repository.find();
    const nextNumber = allIdeas.length > 0
      ? Math.max(...allIdeas.map(idea => idea.number)) + 1
      : 1;

    // Default title and description if not provided
    if (!title) {
      createIdeaDto.title = `Default title for idea ${nextNumber}`;
    }

    if (!description) {
      createIdeaDto.description = `Default description for idea ${nextNumber}`;
    }

		return this.repository.create(nextNumber, createIdeaDto);
	}

	updateIdea(updateIdeaDto: UpdateIdeaDto): IdeaDto {
		const updatedIdea = this.repository.update(updateIdeaDto);
    if (!updatedIdea) {
      throw new Error(`Idea with id ${updateIdeaDto.id} not found`);
    }

    return updatedIdea;
	}

	deleteIdea(id: number): void {
    const ok = this.repository.deleteAndReorder(id);
    if (!ok) {
      throw new Error(`Idea with id ${id} not found`);
    }
  }

  swapIdea(swapIdeaDto: SwapIdeaDto): void {
    const { id, to } = swapIdeaDto;

    const idea = this.repository.findById(id);
    if (!idea) {
      throw new Error(`Idea with id ${id} not found`);
    }

    const swapWithIdea =
      to === "up"
        ? this.repository.findIdeaWithMaxNumberLessThan(idea.number)
        : this.repository.findIdeaWithMinNumberGreaterThan(idea.number);

    if (!swapWithIdea) {
      if (to === "up") {
        throw new Error(`Idea with id ${id} is already at the top`);
      }
      throw new Error(`Idea with id ${id} is already at the bottom`);
    }

    this.repository.swapNumbers(
      { id: idea.id, number: idea.number },
      { id: swapWithIdea.id, number: swapWithIdea.number },
    );
  }

	getAllIdeas(): IdeaDto[] {
		return this.repository.find() as IdeaDto[];
	}
}
