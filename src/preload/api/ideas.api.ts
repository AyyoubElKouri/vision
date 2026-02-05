/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import { ipcRenderer } from "electron";

import type {
	CreateIdeaDto,
	IdeaDto,
	SwapIdeaDto,
	UpdateIdeaDto,
} from "../../apps/idea/contracts/idea.contract";

export const ideasApi = {
	getAll: (): Promise<IdeaDto[]> => ipcRenderer.invoke("ideas:getAll"),
	create: (input: CreateIdeaDto): Promise<void> =>
		ipcRenderer.invoke("ideas:create", input),
	update: (input: UpdateIdeaDto): Promise<IdeaDto> =>
		ipcRenderer.invoke("ideas:update", input),
	delete: (id: number): Promise<void> => ipcRenderer.invoke("ideas:delete", id),
	swap: (input: SwapIdeaDto): Promise<void> =>
		ipcRenderer.invoke("ideas:swap", input),
} as const;
