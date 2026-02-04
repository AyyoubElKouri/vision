export type IdeaDto = {
	id: number;
	number: number;
	title: string;
	description: string;
	createdAt: string;
};

export type CreateIdeaDto = {
	number: number;
	title: string;
	description: string;
};

export type UpdateIdeaDto = Partial<CreateIdeaDto>;

export type SwapIdeaDto = {
	id: number;
	to: "up" | "down";
};
