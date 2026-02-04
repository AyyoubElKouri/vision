/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

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
