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
