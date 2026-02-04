/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import type { CreateIdeaDto, IdeaDto } from "../contracts/idea.contract";

import type { IdeaRepository } from "./idea.repository";

export class IdeaService {
	constructor(private readonly repository: IdeaRepository) {}

	createIdea(createIdeaDto: CreateIdeaDto): void {
		this.repository.create(createIdeaDto);
	}

	getAllIdeas(): IdeaDto[] {
		return this.repository.getAll();
	}
}
