/*--------------------------------------------------------------------------------------------------
 *                     Copyright (c) 2026 Ayyoub EL Kouri. All rights reserved.
 *     Becoming an expert won't happen overnight, but with a bit of patience, you'll get there
 *------------------------------------------------------------------------------------------------*/

import { ipcMain } from "electron";

import type { AppCore } from "../../../composition-root";
import type {
	CreateIdeaDto,
	SwapIdeaDto,
	UpdateIdeaDto,
} from "../contracts/idea.contract";

export function registerIdeasIpc(core: AppCore) {
	ipcMain.handle("ideas:getAll", () => core.ideas.getAllIdeas());
	ipcMain.handle("ideas:create", (_event, input: CreateIdeaDto) =>
		core.ideas.createIdea(input),
	);
	ipcMain.handle("ideas:update", (_event, input: UpdateIdeaDto) =>
		core.ideas.updateIdea(input),
	);
	ipcMain.handle("ideas:delete", (_event, id: number) =>
		core.ideas.deleteIdea(id),
	);
	ipcMain.handle("ideas:swap", (_event, input: SwapIdeaDto) =>
		core.ideas.swapIdea(input),
	);
}
