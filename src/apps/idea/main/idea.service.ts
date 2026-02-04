import { CreateIdeaDto, IdeaDto, UpdateIdeaDto } from "../contracts/idea.contract";

import { IdeaRepository } from "./idea.repository";

export class IdeaService {
  constructor(private readonly repository: IdeaRepository) {}

  createIdea(createIdeaDto: CreateIdeaDto): void {
    this.repository.create(createIdeaDto);
  }

  updateIdea(updateIdeaDto: UpdateIdeaDto)  {
    
  }

  getAllIdeas(): IdeaDto[] {
    return this.repository.getAll();
  }
}
