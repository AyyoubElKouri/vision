import { ipcRenderer } from "electron";

import type {
	CreateIdeaDto,
	IdeaDto,
} from "../../apps/idea/contracts/idea.contract";

export const ideasApi = {
	getAll: (): Promise<IdeaDto[]> => ipcRenderer.invoke("ideas:getAll"),
	create: (input: CreateIdeaDto): Promise<{ id: number }> =>
		ipcRenderer.invoke("ideas:create", input),
} as const;
